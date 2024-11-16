import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define protected routes
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

// Define public routes including SSO callback
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sso-callback(.*)'  // Add SSO callback route as public
]);

export default clerkMiddleware(async (auth, req) => {
  // For protected routes, ensure the user is authenticated
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  // Allow public routes to be accessed without authentication
  if (isPublicRoute(req)) {
    return;
  }
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    '/(api|trpc)(.*)'
  ],
};
