import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow access to static files and public routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('manifest.json') ||
    pathname.includes('favicon.ico') ||
    pathname.startsWith('/uploads') ||
    pathname === '/' ||
    pathname === '/login'
  ) {
    return NextResponse.next()
  }

  // Check if trying to access admin routes
  if (pathname.startsWith('/admin')) {
    // Get auth token from cookies or headers
    const authToken = request.cookies.get('up_admin_auth')?.value

    // If no auth token, redirect to login
    if (!authToken) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login']
}
