import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Allow access to the home page and API routes
    if (req.nextUrl.pathname === "/" || req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.next()
    }

    // Redirect unauthenticated users to the home page for all other routes
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // The home page and API routes are always authorized
        if (req.nextUrl.pathname === "/" || req.nextUrl.pathname.startsWith("/api")) {
          return true
        }
        // All other routes require authentication
        return !!token
      },
    },
  }
)

export const config = { matcher: ["/((?!_next/static|favicon.ico).*)"] }