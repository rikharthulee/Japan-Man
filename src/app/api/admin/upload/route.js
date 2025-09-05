import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
    const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE;
    if (!bucket || !url) {
      return NextResponse.json(
        { error: "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_BUCKET" },
        { status: 500 }
      );
    }

    // Require admin/editor
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { data: prof } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    if (!prof || !["admin", "editor"].includes(prof.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const form = await request.formData();
    const file = form.get("file");
    const prefix = String(form.get("prefix") || "locations");
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!serviceKey) {
      return NextResponse.json(
        { error: "Missing SUPABASE_SERVICE_ROLE on server for upload" },
        { status: 500 }
      );
    }

    const svc = createClient(url, serviceKey);
    const origName = file.name || "upload.bin";
    const ext = origName.includes(".") ? origName.split(".").pop() : "bin";
    const base = origName.replace(/\.[^.]+$/, "");
    const safeBase = base.toLowerCase().replace(/[^a-z0-9-_]+/g, "-").slice(0, 48);
    const key = `${prefix}/${Date.now()}-${safeBase}.${ext}`;

    // Convert to ArrayBuffer to avoid any runtime/env Blob issues
    const ab = await file.arrayBuffer();
    const bytes = new Uint8Array(ab);
    const { error } = await svc.storage.from(bucket).upload(key, bytes, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "application/octet-stream",
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    const publicUrl = `${url}/storage/v1/object/public/${bucket}/${key}`;
    return NextResponse.json({ ok: true, key, url: publicUrl });
  } catch (e) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
