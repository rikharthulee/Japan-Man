import Link from "next/link";
import destinations from "@/data/destinations";

export default function Destinations() {
  return (
    <section id="destinations" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl md:text-4xl font-medium">Destinations</h2>
        <Link href="/destinations" className="underline">
          View all
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {destinations.map((d) => (
          <Link
            key={d.slug}
            href={`/destinations/${d.slug}`}
            className="group relative overflow-hidden rounded-xl"
          >
            <img
              src={d.image}
              alt=""
              className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 " />
            <div className="absolute bottom-3 left-3 text-white text-lg font-medium">
              {d.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
