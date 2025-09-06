import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function supabaseServer() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          const value = cookieStore.get(name)?.value;
          // Normalize empty string to undefined so SSR client won't attempt refresh with ""
          return value ? value : undefined;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          // Explicitly expire the cookie to fully remove it
          cookieStore.set({ name, value: "", ...options, maxAge: 0, path: "/" });
        },
      },
    }
  );
}
