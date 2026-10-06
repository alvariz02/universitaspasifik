export const SESSION_COOKIE = 'up_admin_auth'
export const SESSION_MAX_AGE = 60 * 60 * 8

interface AdminSession {
  user: {
    id: string
    email: string
    name: string
    role: 'admin'
  }
  exp: number
}

function encodeBase64Url(value: Uint8Array) {
  let binary = ''
  for (const byte of value) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(base64 + '='.repeat((4 - (base64.length % 4)) % 4))
  return Uint8Array.from(binary, (character) => character.charCodeAt(0))
}

async function getSigningKey(usage: KeyUsage[]) {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) return null

  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    usage
  )
}

export async function createSessionToken(session: Omit<AdminSession, 'exp'>) {
  const key = await getSigningKey(['sign'])
  if (!key) return null

  const payload = encodeBase64Url(
    new TextEncoder().encode(JSON.stringify({ ...session, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE }))
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return `${payload}.${encodeBase64Url(new Uint8Array(signature))}`
}

export async function verifySession(token: string): Promise<AdminSession | null> {
  try {
    const [payload, signature, extra] = token.split('.')
    if (!payload || !signature || extra) return null

    const key = await getSigningKey(['verify'])
    if (!key) return null

    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      decodeBase64Url(signature),
      new TextEncoder().encode(payload)
    )
    if (!valid) return null

    const session = JSON.parse(new TextDecoder().decode(decodeBase64Url(payload))) as AdminSession
    if (session.user?.role !== 'admin' || session.exp <= Math.floor(Date.now() / 1000)) return null
    return session
  } catch {
    return null
  }
}