import Accommodation from "@/components/Accommodation";
import { fetchAccommodations } from "@/lib/supabaseRest";

export default async function AccommodationPage() {
  let items = [];
  try {
    const rows = await fetchAccommodations();
    items = rows.map((r) => ({ slug: r.slug, title: r.name, image: r.hero_image }));
  } catch {}
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Accommodation items={items} />
    </main>
  );
}
export const revalidate = 900;
