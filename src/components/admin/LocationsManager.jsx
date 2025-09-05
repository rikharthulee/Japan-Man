"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LocationForm from "./LocationForm";

export default function LocationsManager() {
  const supabase = createClientComponentClient();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null=new form closed; {}=new; obj=edit
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/locations", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
      setItems(json.items || []);
    } catch (e) {
      console.error("Failed to load locations", e);
      setError(e?.message || "Failed to load locations");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const t = setTimeout(() => {
      if (loading) {
        setError(
          "Request timed out. Check RLS policies on public.locations and your Supabase URL/key."
        );
        setLoading(false);
      }
    }, 10000);
    load().finally(() => clearTimeout(t));
    // Realtime optional: could subscribe to changes here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Locations</h2>
        <button
          className="rounded bg-black text-white px-3 py-2"
          onClick={() => setEditing({})}
        >
          + New Location
        </button>
      </div>

      {editing ? (
        <LocationForm
          initial={editing.id ? editing : null}
          onSaved={() => {
            setEditing(null);
            load();
          }}
          onCancel={() => setEditing(null)}
        />
      ) : null}

      <div className="overflow-auto rounded border">
        <table className="min-w-full text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="text-left px-3 py-2">Name</th>
              <th className="text-left px-3 py-2">Slug</th>
              <th className="text-left px-3 py-2">Status</th>
              <th className="text-left px-3 py-2">Summary</th>
              <th className="text-right px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-3 py-3" colSpan={5}>
                  Loading…
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className="px-3 py-3 text-red-700" colSpan={5}>
                  {error}
                  <button
                    className="ml-3 rounded border px-2 py-1"
                    onClick={load}
                  >
                    Retry
                  </button>
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td className="px-3 py-3" colSpan={5}>
                  No locations. Click “New Location” to create your first one.
                </td>
              </tr>
            ) : (
              items.map((it) => (
                <tr key={it.id} className="border-t">
                  <td className="px-3 py-2">{it.name}</td>
                  <td className="px-3 py-2">{it.slug}</td>
                  <td className="px-3 py-2">{it.status}</td>
                  <td className="px-3 py-2 truncate max-w-[32rem]">{it.summary}</td>
                  <td className="px-3 py-2 text-right">
                    <button
                      className="rounded border px-2 py-1 mr-2"
                      onClick={() => setEditing(it)}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded border px-2 py-1"
                      onClick={async () => {
                        if (!confirm("Delete this location?")) return;
                        try {
                          const res = await fetch(`/api/admin/locations/${it.id}`, { method: "DELETE" });
                          if (!res.ok) {
                            const json = await res.json().catch(() => ({}));
                            alert(json?.error || `Delete failed (${res.status})`);
                            return;
                          }
                          try {
                            await fetch(`/api/revalidate`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ tags: ["locations", `locations:${it.slug}`] }),
                            });
                          } catch {}
                          load();
                        } catch (e) {
                          alert(e?.message || "Delete failed");
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
