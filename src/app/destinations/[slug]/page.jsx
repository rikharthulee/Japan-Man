import destinations from "@/data/destinations";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export default function DestinationPage({ params }) {
  const destination = destinations.find((d) => d.slug === params.slug);

  if (!destination) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-medium">{destination.title}</h1>
      <img
        src={destination.image}
        alt=""
        className="mt-6 w-full rounded-xl object-cover"
      />
      {destination.details &&
        (Array.isArray(destination.details) ? (
          destination.details.map((para, i) => (
            <p
              key={i}
              className={`text-lg leading-relaxed ${i === 0 ? "mt-4" : "mt-2"}`}
            >
              {para}
            </p>
          ))
        ) : (
          <p className="mt-4 text-lg leading-relaxed">{destination.details}</p>
        ))}
    </main>
  );
}
