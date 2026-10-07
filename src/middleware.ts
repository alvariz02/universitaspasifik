import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySession } from '@/lib/session'
import { canManage } from '@/lib/permissions'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminPage = pathname.startsWith('/admin')
  const isApiRequest = pathname.startsWith('/api/')
  const isAuthEndpoint = pathname === '/api/auth/login' || pathname === '/api/auth/logout'
  const isPublicSubmission = request.method === 'POST' && ['/api/contact', '/api/applicants'].includes(pathname)
  const isPublicAdmissionsFeed =
    request.method === 'GET' &&
    pathname === '/api/admissions' &&
    request.nextUrl.searchParams.get('active') === 'true'
  const isPrivateRead =
    request.method === 'GET' &&
    (pathname.startsWith('/api/admin/') || pathname.startsWith('/api/auth/session') || pathname.startsWith('/api/contact') || (pathname === '/api/admissions' && !isPublicAdmissionsFeed))
  const isApiMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)
  const requiresApiSession =
    isApiRequest && !isAuthEndpoint && (isPrivateRead || (isApiMutation && !isPublicSubmission))

  if (!isAdminPage && !requiresApiSession) {
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value
  const session = token ? await verifySession(token) : null
  if (session) {
    const resource = pathname.startsWith('/api/admin/') ? pathname.split('/')[3] : pathname.split('/')[2]
    if (isApiMutation && !isAuthEndpoint && !canManage(session.user.role, resource)) {
      return NextResponse.json({ error: 'Anda tidak memiliki izin untuk tindakan ini' }, { status: 403 })
    }
    return NextResponse.next()
  }

  if (isAdminPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*']
}
