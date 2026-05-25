// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useAuthGuardStore } from './store/auth-guard-store';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authStore = useAuthGuardStore.getState();
  const { role, isAuthenticated, authguard } = authStore;

  try {
    if (!isAuthenticated || !role) {
      await authguard();
      return NextResponse.redirect(new URL('/', request.url));
    }
    else {
      // Protected routes
      if (pathname.startsWith('/admin')) {
        if (!isAuthenticated || role !== 'admin') {
          return NextResponse.redirect(new URL('/auth/login', request.url))
        }
      }

      if (
        pathname.startsWith('/profile') ||
        pathname.startsWith('/address') ||
        pathname.startsWith('/orders') ||
        pathname.startsWith('/checkout')
      ) {
        if (!isAuthenticated) {
          return NextResponse.redirect(new URL('/auth/login', request.url))
        }
      }
    }

  } catch (error) {
    console.error(error)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/profile/:path*',
    '/address/:path*',
    '/orders/:path*',
    '/checkout/:path*',
  ],
}