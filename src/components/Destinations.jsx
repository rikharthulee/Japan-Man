import Link from "next/link";
import destinationsData from "@/data/destinations";

export default function Destinations({ items }) {
  const source = Array.isArray(items) && items.length > 0 ? items : destinationsData;
  // Sort alphabetically
  const sortedDestinations = [...source].sort((a, b) =>
    (a.title || a.name).localeCompare(b.title || b.name)
  );

  return (
    <section id="destinations" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl md:text-4xl font-medium">Destinations</h2>
        <Link href="/destinations" className="underline">
          View all
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {sortedDestinations.map((d) => (
          <Link
            key={d.slug}
            href={`/destinations/${d.slug}`}
            className="group relative overflow-hidden rounded-xl"
          >
            <img
              src={
                (Array.isArray(d.images) && d.images.length > 0
                  ? d.images[0]
                  : d.image || d.thumbnail_image || d.hero_image) ||
                "/images/destinations/tokyo/tokyo1.jpg"
              }
              alt={`${d.title || d.name}`}
              className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 " />
            <div className="absolute bottom-3 left-3 text-white text-lg font-medium">
              {d.title || d.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
