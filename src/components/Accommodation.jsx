import Link from "next/link";
import accommodation from "@/data/accommodation";

export default function Accommodation() {
  const sorted = [...accommodation].sort((a, b) => a.title.localeCompare(b.title));

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
            <img
              src={
                (Array.isArray(item.images) && item.images.length > 0
                  ? item.images[0]
                  : item.image) || "/images/destinations/tokyo/tokyo1.jpg"
              }
              alt={`${item.title}`}
              className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 " />
            <div className="absolute bottom-3 left-3 text-white text-lg font-medium">
              {item.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
