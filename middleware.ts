import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import useSWR from "swr";

import storage from "@/lib/utils/storage";
import checkLogin from "@/lib/utils/checkLogin";

export function middleware(request: NextRequest) {
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);

  const { pathname } = request.nextUrl;

  const protectedPaths = ['/article/add', '/article/', '/article/[pid]/edit', 'user/settings'];

  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path.replace('[pid]', ''))
  );

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
