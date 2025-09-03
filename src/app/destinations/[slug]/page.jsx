import destinations from "@/data/destinations";
import { notFound } from "next/navigation";
import EmblaCarousel from "@/components/EmblaCarousel";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export default function DestinationPage({ params }) {
  const destination = destinations.find((d) => d.slug === params.slug);

  if (!destination) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Title with black lines above and below */}
      <div className="border-t-2 border-black pt-4">
        <h1 className="text-3xl md:text-4xl font-medium text-center md:text-left">
          {destination.title}
        </h1>
        <div className="border-b-2 border-black mt-3" />
      </div>

      {/* Responsive layout: image first on mobile, text underneath; text left & image right on desktop */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
        {/* Image: order first on mobile, second on desktop (so it sits on the right on larger screens) */}
        <div className="order-1 md:order-2">
          {Array.isArray(destination.images) &&
          destination.images.length > 0 ? (
            <EmblaCarousel
              images={destination.images}
              options={{ loop: true, align: "start" }}
              className="rounded-xl overflow-hidden"
              slideClass="h-[48vh] min-h-[320px]"
            />
          ) : (
            <img
              src={destination.image}
              alt={destination.title}
              className="w-full rounded-xl object-cover"
            />
          )}
        </div>

        {/* Text: order second on mobile (under image), first on desktop (left of image) */}
        <div className="order-2 md:order-1">
          {destination.details &&
            (Array.isArray(destination.details) ? (
              destination.details.map((para, i) => (
                <p
                  key={i}
                  className={`text-lg leading-relaxed ${
                    i === 0 ? "mt-0" : "mt-3"
                  }`}
                >
                  {para}
                </p>
              ))
            ) : (
              <p className="text-lg leading-relaxed">{destination.details}</p>
            ))}
        </div>
      </section>
    </main>
  );
}
