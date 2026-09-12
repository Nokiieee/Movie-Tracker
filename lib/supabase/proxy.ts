import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/signup"];

export async function updateSession(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  // Only routes that actually branch on auth state need to ask Supabase.
  // Everything else (home, /signup/check-email, /auth/confirm, etc.) skips
  // the network round trip entirely instead of paying for an unused check.
  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  let supabaseResponse = NextResponse.next({
    request: { headers: requestHeaders },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request: { headers: requestHeaders },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session if expired. Required for Server Components,
  // which can't set cookies themselves.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Hand the already-verified user down to Server Components and Server
  // Actions via a trusted request header, so they don't have to make a
  // second round trip to Supabase Auth just to re-check who's signed in.
  // `.set` always overwrites, so a client can't spoof this by sending its
  // own `x-user-id` header — only this verified value ever reaches them.
  requestHeaders.set("x-user-id", user?.id ?? "");
  requestHeaders.set("x-user-email", user?.email ?? "");
  requestHeaders.set(
    "x-user-name",
    encodeURIComponent(user?.user_metadata?.full_name ?? "")
  );
  const cookiesToCarry = supabaseResponse.cookies.getAll();
  supabaseResponse = NextResponse.next({
    request: { headers: requestHeaders },
  });
  cookiesToCarry.forEach((cookie) => supabaseResponse.cookies.set(cookie));

  return supabaseResponse;
}
