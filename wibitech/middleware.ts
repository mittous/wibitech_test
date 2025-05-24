import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // If the request is for the root path
  if (request.nextUrl.pathname === '/') {
    // Redirect to the login page
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

// Configure middleware to run only on the home route
export const config = {
  matcher: '/',
}; 