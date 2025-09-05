import Locations from "@/components/Locations";
import { fetchLocations } from "@/lib/supabaseRest";
import { resolveImageUrl } from "@/lib/imageUrl";

export default async function LocationsPage() {
  let items = [];
  try {
    const rows = await fetchLocations();
    items = rows.map((r) => ({
      slug: r.slug,
      title: r.name,
      image: resolveImageUrl(r.thumbnail_image || r.hero_image),
      credit: r.credit || null,
    }));
  } catch (e) {
    // ignore; fallback to local data inside component
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Locations items={items} />
    </main>
  );
}
export const revalidate = 300;
