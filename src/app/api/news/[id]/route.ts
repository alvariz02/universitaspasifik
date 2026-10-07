import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { publishedNews } from '@/lib/content'
import { currentStaff } from '@/lib/staff-auth'
import { canManage } from '@/lib/permissions'
import { apiError } from '@/lib/api-access'
import { PATCH as adminUpdate, DELETE as adminArchive } from '@/app/api/admin/[resource]/route'
type Context = { params: Promise<{ id: string }> }
export async function GET(request: Request, { params }: Context) {
  try {
    const { id } = await params
    const user = await currentStaff()
    const news = await db.news.findFirst({ where: { id: Number(id), ...(user && canManage(user.role, 'news') ? { deletedAt: null } : publishedNews()) } })
    if (!news) throw new Error('NOT_FOUND')
    return NextResponse.json(news, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) { return apiError(error) }
}
async function forward(request: Request, context: Context, archive = false) {
  const { id } = await context.params
  const body = archive ? {} : await request.json().catch(() => ({}))
  const forwarded = new Request(request.url, { method: archive ? 'DELETE' : 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, id: Number(id) }) })
  return (archive ? adminArchive : adminUpdate)(forwarded, { params: Promise.resolve({ resource: 'news' }) })
}
export async function PUT(request: Request, context: Context) { return forward(request, context) }
export async function DELETE(request: Request, context: Context) { return forward(request, context, true) }
