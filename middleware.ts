import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  const { isBot } = userAgent(req);
  let ua = userAgent(req);
  if (isBot) {
    // console.log(ua);
    return NextResponse.rewrite(new URL("/enter", req.url));
  }
  let cookie = req.cookies.get("carrotsession");
  // console.log(cookie);
  // console.log(req.cookies.get("carrotsession"));
  if (!req.nextUrl.pathname.startsWith("/api")) {
    if (!req.nextUrl.pathname.startsWith("/enter")) {
      if (!cookie) {
        req.nextUrl.pathname = "/enter";
        return NextResponse.redirect(req.nextUrl);
      }
    }
  }
};
export const config = {
  matcher: [
    "/",
    "/enter",
    "/products/:path*",
    "/streams/:path*",
    "/profile/:path*",
  ],
};
