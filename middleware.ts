import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Create a response to modify
  const res = NextResponse.next();

  // Create a Supabase client
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession();

  // Get the current pathname
  const path = req.nextUrl.pathname;

  // Define public and protected paths
  const isPublicPath = path === '/login';
  const isProtectedPath = path === '/dashboard' || path === '/admin';

  if (isProtectedPath && !session) {
    // Redirect to login if trying to access protected route without session
    const redirectUrl = new URL('/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (isPublicPath && session) {
    // Redirect to dashboard if trying to access login with session
    const redirectUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    '/login',
    '/dashboard',
    '/admin',
    '/dashboard/:path*',
    '/admin/:path*'
  ]
};
