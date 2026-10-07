import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { publishedNews } from '@/lib/content'
import { requireStaff } from '@/lib/staff-auth'
import { apiError } from '@/lib/api-access'
import { POST as adminCreate } from '@/app/api/admin/[resource]/route'

export async function GET(request: Request) {
  try {
    const query = new URL(request.url).searchParams
    const limit = Math.min(100, Math.max(1, Number(query.get('limit')) || 10))
    const offset = Math.max(0, Number(query.get('offset')) || 0)
    let where: any = publishedNews()
    if (query.get('admin') === 'true') { await requireStaff('news'); where = { deletedAt: null } }
    if (query.get('category')) where.category = query.get('category')
    if (query.get('featured') === 'true') where.isFeatured = true
    const [news, total] = await db.$transaction([db.news.findMany({ where, orderBy: [{ publishedDate: 'desc' }, { id: 'desc' }], take: limit, skip: offset }), db.news.count({ where })])
    return NextResponse.json({ news, total, limit, offset }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) { return apiError(error) }
}
export async function POST(request: Request) { return adminCreate(request, { params: Promise.resolve({ resource: 'news' }) }) }
