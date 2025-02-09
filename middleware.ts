import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Check if user is authenticated
  const isAuthenticated = req.cookies.get('isAuthenticated')?.value === 'true';

  // Protect dashboard routes
  if (path.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Prevent accessing login if already authenticated
  if (path === '/login') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
}

// Only run middleware on these paths
export const config = {
  matcher: ['/login', '/dashboard', '/dashboard/:path*']
};
