import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('auth') || request.headers.get('authorization');
  
  // Protect dashboard route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Prevent authenticated users from accessing login page
  if (request.nextUrl.pathname.startsWith('/login')) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// Only run middleware on these paths
export const config = {
  matcher: ['/dashboard/:path*', '/login']
};
