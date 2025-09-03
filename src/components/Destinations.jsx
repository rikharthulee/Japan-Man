import Link from "next/link";
import Image from "next/image";
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
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {sortedDestinations.map((d) => (
          <Link
            key={d.slug}
            href={`/destinations/${d.slug}`}
            className="group relative overflow-hidden rounded-xl"
          >
            <div className="relative h-64 w-full">
              <Image
                src={
                  (Array.isArray(d.images) && d.images.length > 0
                    ? d.images[0]
                    : d.image || d.thumbnail_image || d.hero_image) ||
                  "/images/destinations/tokyo/tokyo1.jpg"
                }
                alt={`${d.title || d.name}`}
                fill
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-300 group-hover:scale-105"
                priority={false}
              />
            </div>
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
