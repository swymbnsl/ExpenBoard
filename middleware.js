import { NextResponse } from "next/server"

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/shared"

  let token = ""
  if (request.cookies.has("token")) {
    token = request.cookies.get("token").value
  }

  //Temporarily not letting anyone access "/" route

  if (path === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|favicon.ico|shared).*)",
  ],
}
