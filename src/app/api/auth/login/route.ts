import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/session'

function matchesSecret(value: string, expected: string) {
  const providedBytes = Buffer.from(value)
  const expectedBytes = Buffer.from(expected)
  return providedBytes.length === expectedBytes.length && timingSafeEqual(providedBytes, expectedBytes)
}

export async function POST(request: Request) {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const sessionSecret = process.env.SESSION_SECRET

  if (!email || !password || !sessionSecret || sessionSecret.length < 32) {
    return NextResponse.json({ error: 'Autentikasi belum dikonfigurasi' }, { status: 503 })
  }

  const body = await request.json().catch(() => null) as { email?: unknown; password?: unknown } | null
  if (
    !body ||
    typeof body.email !== 'string' ||
    typeof body.password !== 'string' ||
    !matchesSecret(body.email.trim().toLowerCase(), email.trim().toLowerCase()) ||
    !matchesSecret(body.password, password)
  ) {
    return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 })
  }

  const user = {
    id: 'admin',
    email: email.trim().toLowerCase(),
    name: 'Administrator',
    role: 'admin' as const,
  }
  const token = await createSessionToken({ user })
  if (!token) {
    return NextResponse.json({ error: 'Autentikasi belum dikonfigurasi' }, { status: 503 })
  }

  const response = NextResponse.json({ user })
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
  return response
}