import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Middleware function to protect routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get user data from cookies/headers (in a real app, you'd decode JWT tokens)
  // For this demo, we'll check if user data exists in session storage via headers
  const userAgent = request.headers.get('user-agent') || '';
  
  // Define protected routes
  const adminRoutes = ['/admin'];
  const userRoutes = ['/dashboard'];
  const publicRoutes = ['/', '/features', '/pricing', '/contact', '/signin', '/signup'];

  // Check if current path is an admin route
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  
  // Check if current path is a user dashboard route
  const isUserRoute = userRoutes.some(route => pathname.startsWith(route));

  // Check if current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith('/signup/step-')
  );

  // For now, we'll allow access since we're using sessionStorage for auth
  // In a production app, you would verify JWT tokens here
  
  // If accessing admin routes, ensure they're coming from a proper sign-in flow
  if (isAdminRoute) {
    // In a real app, check for admin JWT token here
    // For demo purposes, we'll rely on client-side checks
    return NextResponse.next();
  }

  // If accessing user dashboard routes, ensure they're authenticated
  if (isUserRoute) {
    // In a real app, check for valid JWT token here
    // For demo purposes, we'll rely on client-side checks
    return NextResponse.next();
  }

  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For any other routes, allow access
  return NextResponse.next();
}

// Configure which routes this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
