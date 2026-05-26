import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

function isApi(pathname: string) {
  return pathname.startsWith("/api/");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const needsAuth =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    (pathname.startsWith("/api/exams/") && pathname.endsWith("/submit"));

  if (!needsAuth) return NextResponse.next();

  if (!token) {
    if (isApi(pathname)) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  const role = (token as any).role as "STUDENT" | "ADMIN" | undefined;

  // حماية مسارات الإدارة
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard/admin")) {
    if (role !== "ADMIN") {
      if (isApi(pathname)) {
        return NextResponse.json({ error: "ممنوع" }, { status: 403 });
      }
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard/student";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/exams/:path*/submit"],
};

