import { NextResponse } from "next/server"

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail"

  let token = ""
  if (request.cookies.has("token")) {
    token = request.cookies.get("token").value
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }
}

export const config = {
  matcher: ["/", "/account", "/login", "/signup", "/verifyemail"],
}
