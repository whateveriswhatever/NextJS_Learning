import { NextResponse, NextRequest } from "next/server";

// this function can be marked async if using await inner

export const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const token = req.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
