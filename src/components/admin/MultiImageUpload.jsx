"use client";
import { useCallback, useMemo, useState } from "react";
import { resolveImageUrl } from "@/lib/imageUrl";

export default function MultiImageUpload({ label, value = [], onChange, prefix = "accommodation" }) {
  const [uploading, setUploading] = useState(false);
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;

  const previews = useMemo(() => (Array.isArray(value) ? value.map((v) => ({ key: v, url: resolveImageUrl(v) })) : []), [value]);

  const handleFiles = useCallback(async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    if (!bucket) {
      alert("Missing NEXT_PUBLIC_SUPABASE_BUCKET env var");
      return;
    }
    setUploading(true);
    try {
      const uploadedKeys = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("prefix", prefix);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd, credentials: "same-origin" });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.error || `Upload failed (${res.status})`);
        if (json?.key) uploadedKeys.push(json.key);
      }
      const next = [...(Array.isArray(value) ? value : []), ...uploadedKeys];
      onChange?.(next);
    } catch (err) {
      console.error("Upload failed", err);
      alert(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }, [bucket, onChange, value, prefix]);

  function removeAt(idx) {
    const next = (Array.isArray(value) ? value : []).filter((_, i) => i !== idx);
    onChange?.(next);
  }

  function move(idx, delta) {
    const arr = Array.isArray(value) ? [...value] : [];
    const newIdx = idx + delta;
    if (newIdx < 0 || newIdx >= arr.length) return;
    const [spliced] = arr.splice(idx, 1);
    arr.splice(newIdx, 0, spliced);
    onChange?.(arr);
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <div className="flex items-center gap-3">
        <input type="file" accept="image/*" multiple onChange={handleFiles} />
        {uploading ? <span className="text-sm">Uploading…</span> : null}
      </div>
      {previews.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {previews.map((p, idx) => (
            <li key={`${p.key}-${idx}`} className="border rounded p-2 space-y-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.url ? (
                <img src={p.url} alt={`Gallery ${idx + 1}`} className="h-28 w-full object-cover rounded" />
              ) : null}
              <div className="flex items-center justify-between gap-2">
                <div className="text-[10px] text-neutral-600 truncate" title={p.key}>{p.key}</div>
                <div className="flex items-center gap-1">
                  <button type="button" className="rounded border px-2 py-0.5 text-xs" onClick={() => move(idx, -1)} disabled={idx === 0}>
                    ↑
                  </button>
                  <button type="button" className="rounded border px-2 py-0.5 text-xs" onClick={() => move(idx, 1)} disabled={idx === previews.length - 1}>
                    ↓
                  </button>
                  <button type="button" className="rounded border px-2 py-0.5 text-xs text-red-700" onClick={() => removeAt(idx)}>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-xs text-neutral-500">No gallery images</div>
      )}
    </div>
  );
}
