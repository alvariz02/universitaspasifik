import { NextResponse } from 'next/server'
import { requireStaff } from '@/lib/staff-auth'
import { db } from '@/lib/db'

export function apiError(error: unknown) {
  const message = error instanceof Error ? error.message : ''
  if (message === 'UNAUTHORIZED') return NextResponse.json({ error: 'Silakan login kembali' }, { status: 401 })
  if (message === 'FORBIDDEN') return NextResponse.json({ error: 'Anda tidak memiliki izin' }, { status: 403 })
  if (message === 'NOT_FOUND') return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 })
  if ((error as { code?: string })?.code === 'P2002') return NextResponse.json({ error: 'Email, slug, atau URL sudah digunakan' }, { status: 409 })
  console.error('Admin API error:', error)
  return NextResponse.json({ error: 'Data belum dapat diproses. Silakan coba lagi.' }, { status: 500 })
}

export function withStaffAccess<T extends (...args: any[]) => Promise<Response>>(resource: string, handler: T): T {
  return (async (...args: Parameters<T>) => {
    try {
      const user = await requireStaff(resource)
      const response = await handler(...args)
      if (response.ok && args[0].method !== 'GET') {
        await db.activityLog.create({ data: { actorEmail: user.email, resource, action: args[0].method, summary: `${args[0].method} ${new URL(args[0].url).pathname}` } }).catch(error => console.error('Activity log unavailable:', error))
      }
      return response
    } catch (error) { return apiError(error) }
  }) as T
}
