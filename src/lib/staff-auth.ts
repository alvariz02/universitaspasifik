import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { SESSION_COOKIE, verifySession } from '@/lib/session'
import { canManage } from '@/lib/permissions'
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCallback)
export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const hash = await scrypt(password, salt, 64) as Buffer
  return `scrypt:${salt}:${hash.toString('hex')}`
}
export async function verifyPassword(password: string, stored: string) {
  const [format, salt, value] = stored.split(':')
  if (format !== 'scrypt' || !salt || !value) return false
  const hash = await scrypt(password, salt, 64) as Buffer
  const expected = Buffer.from(value, 'hex')
  return hash.length === expected.length && timingSafeEqual(hash, expected)
}
export async function currentStaff() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  const session = token ? await verifySession(token) : null
  if (!session) return null
  if (session.user.id === 'admin') return session.user
  const account = await db.adminUser.findUnique({ where: { id: Number(session.user.id) } })
  if (!account?.isActive || account.sessionVersion !== session.user.sessionVersion) return null
  return { id: String(account.id), email: account.email, name: account.name, role: account.role, sessionVersion: account.sessionVersion }
}
export async function requireStaff(resource: string) {
  const user = await currentStaff()
  if (!user) throw new Error('UNAUTHORIZED')
  if (!canManage(user.role, resource)) throw new Error('FORBIDDEN')
  return user
}
