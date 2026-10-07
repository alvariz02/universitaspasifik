import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyPassword } from '@/lib/staff-auth'
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/session'

function matches(value: string, expected: string) {
  const a = Buffer.from(value), b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}
export async function POST(request: Request) {
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
    return NextResponse.json({ error: 'Autentikasi belum dikonfigurasi' }, { status: 503 })
  }
  const body = await request.json().catch(() => null)
  if (typeof body?.email !== 'string' || typeof body?.password !== 'string' || body.password.length > 256) {
    return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 })
  }
  const email = body.email.trim().toLowerCase()
  let user
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && matches(email, process.env.ADMIN_EMAIL.trim().toLowerCase()) && matches(body.password, process.env.ADMIN_PASSWORD)) {
    user = { id: 'admin', email, name: 'Administrator', role: 'admin' as const }
  } else {
    try {
      const account = await db.adminUser.findUnique({ where: { email } })
      if (account?.isActive && await verifyPassword(body.password, account.passwordHash)) {
        user = { id: String(account.id), email, name: account.name, role: account.role as 'admin' | 'humas' | 'editor', sessionVersion: account.sessionVersion }
      }
    } catch {
      return NextResponse.json({ error: 'Layanan akun belum tersedia' }, { status: 503 })
    }
  }
  if (!user) return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 })
  const token = await createSessionToken({ user })
  if (!token) return NextResponse.json({ error: 'Autentikasi belum dikonfigurasi' }, { status: 503 })
  const response = NextResponse.json({ user })
  response.cookies.set(SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: SESSION_MAX_AGE })
  return response
}
