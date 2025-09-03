import Link from "next/link";
import Image from "next/image";
import accommodationData from "@/data/accommodation";

export default function Accommodation({ items }) {
  const source = Array.isArray(items) && items.length > 0 ? items : accommodationData;
  const sorted = [...source].sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name));

  return (
    <section id="accommodation" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl md:text-4xl font-medium">Accommodation</h2>
        <Link href="/accommodation" className="underline">
          View all
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {sorted.map((item) => (
          <Link
            key={item.slug}
            href={`/accommodation/${item.slug}`}
            className="group relative overflow-hidden rounded-xl"
          >
            <div className="relative h-64 w-full">
              <Image
                src={
                  (Array.isArray(item.images) && item.images.length > 0
                    ? item.images[0]
                    : item.image || item.hero_image) || "/images/destinations/tokyo/tokyo1.jpg"
                }
                alt={`${item.title || item.name}`}
                fill
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 " />
            <div className="absolute bottom-3 left-3 text-white text-lg font-medium">
              {item.title || item.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
