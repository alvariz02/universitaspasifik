import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStaff, hashPassword } from '@/lib/staff-auth'
import { apiError } from '@/lib/api-access'
import { delegates, editableData, isResource, safeRecord } from '@/lib/admin-resources'
import { canManage } from '@/lib/permissions'
import { csvCell } from '@/lib/csv'

type Context = { params: Promise<{ resource: string }> }
export async function GET(request: Request, { params }: Context) {
  try {
    const { resource } = await params
    const user = await requireStaff(resource)
    const query = new URL(request.url).searchParams
    const page = Math.max(1, Number(query.get('page')) || 1)
    if (resource === 'history') {
      const target = query.get('resource') || ''
      const recordId = Number(query.get('id'))
      if (query.get('revisions') === 'true') {
        if (!isResource(target) || !canManage(user.role, target)) throw new Error('FORBIDDEN')
        return NextResponse.json(await db.contentRevision.findMany({ where: { resource: target, ...(recordId ? { recordId } : {}) }, orderBy: { createdAt: 'desc' }, take: 100 }))
      }
      const where = user.role === 'admin' ? {} : { resource: { in: Object.keys(delegates).filter(r => canManage(user.role, r)) } }
      const [items, total] = await Promise.all([db.activityLog.findMany({ where, orderBy: { createdAt: 'desc' }, take: 25, skip: (page - 1) * 25 }), db.activityLog.count({ where })])
      return NextResponse.json({ items, total, page, pageSize: 25 })
    }
    if (!isResource(resource)) throw new Error('NOT_FOUND')
    const model = (db as any)[delegates[resource]]
    const where: any = resource === 'users' ? {} : { deletedAt: query.get('trash') === 'true' ? { not: null } : null }
    const search = (query.get('q') || '').trim().slice(0, 200)
    const searchFields = resource === 'users' ? ['name', 'email'] : resource === 'applicants' ? ['fullName', 'email', 'major'] : resource === 'media' ? ['name', 'altText'] : ['title', 'slug']
    if (search) where.OR = searchFields.map(field => ({ [field]: { contains: search, mode: 'insensitive' } }))
    if (resource === 'applicants' && query.get('status')) where.status = query.get('status')
    if (resource === 'news' && query.get('status')) where.status = query.get('status')
    const id = Number(query.get('id'))
    if (id) {
      const record = await model.findFirst({ where: { ...where, id } })
      if (!record) throw new Error('NOT_FOUND')
      return NextResponse.json(safeRecord(record))
    }
    if (resource === 'applicants' && query.get('export') === 'csv') {
      const rows = await model.findMany({ where, orderBy: { createdAt: 'desc' }, take: 10000 })
      const fields = ['id', 'fullName', 'email', 'phone', 'admissionPath', 'highSchool', 'major', 'gpa', 'address', 'motivation', 'status', 'notes', 'createdAt']
      const csv = '\uFEFF' + [fields.map(csvCell).join(','), ...rows.map((row: any) => fields.map(f => csvCell(row[f] instanceof Date ? row[f].toISOString() : row[f])).join(','))].join('\r\n')
      return new Response(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="pendaftar.csv"', 'Cache-Control': 'no-store' } })
    }
    const [items, total] = await Promise.all([model.findMany({ where, orderBy: { createdAt: 'desc' }, take: 25, skip: (page - 1) * 25 }), model.count({ where })])
    return NextResponse.json({ items: items.map(safeRecord), total, page, pageSize: 25 }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) { return apiError(error) }
}

async function mutate(request: Request, { params }: Context) {
  try {
    const { resource } = await params
    if (!isResource(resource)) throw new Error('NOT_FOUND')
    const actor = await requireStaff(resource)
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Data tidak valid' }, { status: 400 })
    const id = Number(body.id)
    const creating = request.method === 'POST'
    if (!creating && (!Number.isSafeInteger(id) || id < 1)) return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
    const deleting = request.method === 'DELETE'
    if (resource === 'users' && deleting) return NextResponse.json({ error: 'Nonaktifkan akun melalui form edit' }, { status: 400 })
    const parsed = deleting || body.action === 'restore' || body.action === 'revert' ? { data: {} } : editableData(resource, body)
    if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 })
    const data: any = parsed.data
    if (resource === 'news' && actor.role === 'editor' && data.status === 'published') return NextResponse.json({ error: 'Editor harus mengirim berita untuk ditinjau humas atau admin' }, { status: 403 })
    if (resource === 'users') {
      if (creating && !data.password) return NextResponse.json({ error: 'Password minimal 12 karakter wajib diisi' }, { status: 400 })
      if (data.email === process.env.ADMIN_EMAIL?.trim().toLowerCase()) return NextResponse.json({ error: 'Email ini digunakan akun administrator awal' }, { status: 409 })
      if (data.password) data.passwordHash = await hashPassword(data.password)
      delete data.password
    }
    const result = await db.$transaction(async tx => {
      const model = (tx as any)[delegates[resource]]
      const previous = creating ? (resource === 'media' ? await model.findUnique({ where: { url: data.url } }) : null) : await model.findUnique({ where: { id } })
      if (!creating && !previous) throw new Error('NOT_FOUND')
      if (resource === 'users' && actor.id === String(id) && (data.isActive === false || data.role !== actor.role)) throw new Error('FORBIDDEN')
      let action = creating && !previous ? 'create' : deleting ? 'archive' : body.action || 'update'
      let changes = deleting ? { deletedAt: new Date() } : { ...data }
      if (body.action === 'restore') changes = { deletedAt: null }
      if (body.action === 'revert') {
        if (resource === 'users') throw new Error('FORBIDDEN')
        const revision = await tx.contentRevision.findFirst({ where: { id: Number(body.revisionId), resource, recordId: id } })
        if (!revision) throw new Error('NOT_FOUND')
        const restored = editableData(resource, revision.snapshot)
        if ('error' in restored) throw new Error('NOT_FOUND')
        changes = restored.data
      }
      if (resource === 'news' && actor.role === 'editor' && (body.action === 'restore' || body.action === 'revert')) changes.status = 'draft'
      if (resource === 'users' && !creating) changes.sessionVersion = { increment: 1 }
      if (previous && resource !== 'users') await tx.contentRevision.create({ data: { resource, recordId: previous.id, action, actorEmail: actor.email, snapshot: JSON.parse(JSON.stringify(previous)) } })
      const record = creating && !previous ? await model.create({ data: changes }) : await model.update({ where: { id: previous.id }, data: changes })
      await tx.activityLog.create({ data: { resource, recordId: record.id, action, actorEmail: actor.email, summary: record.title || record.fullName || record.name || `#${record.id}` } })
      return safeRecord(record)
    })
    return NextResponse.json(result, { status: creating ? 201 : 200 })
  } catch (error) { return apiError(error) }
}
export const POST = mutate
export const PATCH = mutate
export const DELETE = mutate
