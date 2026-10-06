import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySession } from '@/lib/session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminPage = pathname.startsWith('/admin')
  const isApiRequest = pathname.startsWith('/api/')
  const isAuthEndpoint = pathname === '/api/auth/login' || pathname === '/api/auth/logout'
  const isPublicSubmission = request.method === 'POST' && pathname === '/api/contact'
  const isPublicAdmissionsFeed =
    request.method === 'GET' &&
    pathname === '/api/admissions' &&
    request.nextUrl.searchParams.get('active') === 'true'
  const isPrivateRead =
    request.method === 'GET' &&
    (pathname === '/api/contact' || (pathname === '/api/admissions' && !isPublicAdmissionsFeed))
  const isApiMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)
  const requiresApiSession =
    isApiRequest && !isAuthEndpoint && (isPrivateRead || (isApiMutation && !isPublicSubmission))

  if (!isAdminPage && !requiresApiSession) {
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value
  if (token && await verifySession(token)) {
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
