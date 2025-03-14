import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Get the hostname from the request
  const hostname = request.headers.get('host') || '';
  
  // Check authentication from cookies
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';

  // Must be authenticated to access /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      const redirectUrl = new URL('/login', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // If logged in, can't access /login
  if (request.nextUrl.pathname === '/login') {
    if (isAuthenticated) {
      const redirectUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Set cookie attributes
  const cookieOptions = {
    secure: true,
    sameSite: 'lax' as const,
    path: '/',
    domain: hostname
  };

  // Set cookie headers
  response.headers.set(
    'Set-Cookie',
    `isAuthenticated=${isAuthenticated}; Path=${cookieOptions.path}; Domain=${cookieOptions.domain}; SameSite=${cookieOptions.sameSite}${cookieOptions.secure ? '; Secure' : ''}`
  );

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
};
