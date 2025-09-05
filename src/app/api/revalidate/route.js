import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req) {
  const secret = process.env.REVALIDATE_SECRET;
  const url = new URL(req.url);
  const qpSecret = url.searchParams.get("secret");

  if (secret && qpSecret !== secret) {
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
