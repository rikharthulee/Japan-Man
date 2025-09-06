"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ImageUpload from "./ImageUpload";
import MultiImageUpload from "./MultiImageUpload";
import ParagraphEditor from "./ParagraphEditor";

function slugify(s) {
  return (s || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AccommodationForm({ initial, onSaved, onCancel }) {
  const supabase = createClientComponentClient();
  const [name, setName] = useState(initial?.name || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [slugTouched, setSlugTouched] = useState(!!initial?.id);
  const [summary, setSummary] = useState(initial?.summary || "");
  const [body, setBody] = useState(initial?.description || null);
  const [hero, setHero] = useState(initial?.hero_image || "");
  const [thumb, setThumb] = useState(initial?.thumbnail_image || "");
  const [images, setImages] = useState(Array.isArray(initial?.images) ? initial.images : []);
  const [status, setStatus] = useState(initial?.status || "draft");
  const [credit, setCredit] = useState(initial?.credit || "");
  const [saving, setSaving] = useState(false);
  const isEditing = !!initial?.id;

  useEffect(() => {
    setName(initial?.name || "");
    setSlug(initial?.slug || "");
    setSlugTouched(!!initial?.id);
    setSummary(initial?.summary || "");
    setBody(initial?.description || null);
    setHero(initial?.hero_image || "");
    setThumb(initial?.thumbnail_image || "");
    setImages(Array.isArray(initial?.images) ? initial.images : []);
    setStatus(initial?.status || "draft");
    setCredit(initial?.credit || "");
  }, [initial]);

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(name));
  }, [name, slugTouched]);

  function onSlugInput(e) {
    const raw = e.target.value;
    const v = slugify(raw);
    setSlug(v);
    setSlugTouched(raw.length > 0);
  }

  async function save() {
    setSaving(true);
    try {
      const payload = {
        name,
        slug: slug || slugify(name),
        summary,
        description: body,
        hero_image: hero || null,
        thumbnail_image: thumb || null,
        images: Array.isArray(images) ? images : [],
        status,
        credit: credit || null,
      };
      let savedSlug = payload.slug;
      let res, json;
      if (isEditing) {
        res = await fetch(`/api/admin/accommodation/${initial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        json = await res.json();
        if (!res.ok) throw new Error(json?.error || `Save failed (${res.status})`);
        savedSlug = json.slug || savedSlug;
      } else {
        res = await fetch(`/api/admin/accommodation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        json = await res.json();
        if (!res.ok) throw new Error(json?.error || `Save failed (${res.status})`);
        savedSlug = json.slug || savedSlug;
      }
      try {
        await fetch(`/api/revalidate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tags: ["accommodation", `accommodation:${savedSlug}`] }),
        });
      } catch {}
      onSaved?.();
    } catch (e) {
      console.error(e);
      alert(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!isEditing) return;
    if (!confirm("Delete this accommodation? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/accommodation/${initial.id}`, { method: "DELETE" });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      alert(json?.error || `Delete failed (${res.status})`);
      return;
    }
    try {
      await fetch(`/api/revalidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags: ["accommodation", `accommodation:${slug || initial.slug}`] }),
      });
    } catch {}
    onSaved?.();
  }

  return (
    <div className="space-y-4 border rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="w-full rounded border p-2" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input className="w-full rounded border p-2" value={slug} onChange={onSlugInput} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Summary</label>
          <textarea className="w-full rounded border p-2" rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} />
        </div>
        <div>
          <ImageUpload label="Hero image" value={hero} onChange={setHero} prefix="accommodation" />
        </div>
        <div>
          <ImageUpload label="Thumbnail image" value={thumb} onChange={setThumb} prefix="accommodation" />
        </div>
        <div className="md:col-span-2">
          <MultiImageUpload
            label="Gallery images"
            value={images}
            onChange={setImages}
            prefix="accommodation"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select className="w-full rounded border p-2" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Credit</label>
          <input className="w-full rounded border p-2" value={credit} onChange={(e) => setCredit(e.target.value)} />
        </div>
      </div>

      <ParagraphEditor value={body} onChange={setBody} label="Details (paragraphs)" />

      <div className="flex items-center gap-3">
        <button onClick={save} disabled={saving} className="rounded bg-black text-white px-4 py-2 disabled:opacity-60">
          {saving ? "Saving…" : "Save"}
        </button>
        <button onClick={onCancel} className="rounded border px-4 py-2">Cancel</button>
        {isEditing ? (
          <button onClick={handleDelete} className="ml-auto rounded bg-red-600 text-white px-4 py-2">Delete</button>
        ) : null}
      </div>
    </div>
  );
}
