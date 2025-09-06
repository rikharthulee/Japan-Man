import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code) {
    // Exchange the one-time code from the email link for a session
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // After login, send the user to /admin
  return NextResponse.redirect(new URL("/admin", url.origin));
}

// Sync client auth events to server cookies (for SSR/admin checks)
export async function POST(request) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { event, session } = await request.json().catch(() => ({}));

  try {
    if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
      if (session?.access_token && session?.refresh_token) {
        await supabase.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        });
      }
    } else if (event === "SIGNED_OUT") {
      await supabase.auth.signOut();
    }
  } catch (_) {}

  return NextResponse.json({ ok: true });
}
