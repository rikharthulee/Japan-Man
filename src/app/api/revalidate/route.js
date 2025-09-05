import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req) {
  const secret = process.env.REVALIDATE_SECRET;
  const url = new URL(req.url);
  const qpSecret = url.searchParams.get("secret");

  let allowed = false;
  // Allow if secret matches
  if (secret && qpSecret === secret) allowed = true;
  // Or allow if an authenticated admin/editor calls it
  if (!allowed) {
    try {
      const cookieStore = await cookies();
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: prof } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();
        if (prof && ["admin", "editor"].includes(prof.role)) allowed = true;
      }
    } catch {}
  }

  if (!allowed && secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let payload = {};
  try {
    payload = await req.json();
  } catch {}

  // Accept either an explicit tag(s) or infer from Supabase webhook payload
  const tags = new Set();

  const bodyTags = Array.isArray(payload.tags)
    ? payload.tags
    : payload.tag
    ? [payload.tag]
    : [];
  bodyTags.forEach((t) => t && tags.add(String(t)));

  const table = payload.table || payload?.record?.table || payload?.table_id;
  const record = payload.record || payload?.new || payload?.old || {};
  const slug = record.slug;

  if (table === "locations") {
    tags.add("locations");
    if (slug) tags.add(`locations:${slug}`);
  }
  if (table === "accommodations") {
    tags.add("accommodations");
    if (slug) tags.add(`accommodation:${slug}`);
  }

  // Revalidate all collected tags
  tags.forEach((t) => revalidateTag(t));

  return NextResponse.json({ ok: true, revalidated: Array.from(tags) });
}
