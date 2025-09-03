import accommodation from "@/data/accommodation";
import { notFound } from "next/navigation";
import EmblaCarousel from "@/components/EmblaCarousel";
import Image from "next/image";
import { fetchAccommodations, fetchAccommodationBySlug } from "@/lib/supabaseRest";
import { resolveImageUrl } from "@/lib/imageUrl";

export async function generateStaticParams() {
  try {
    const rows = await fetchAccommodations();
    return rows.map((a) => ({ slug: a.slug }));
  } catch {
    return accommodation.map((a) => ({ slug: a.slug }));
  }
}

export default async function AccommodationDetailPage({ params }) {
  const { slug } = await params;
  let item = null;
  try {
    const row = await fetchAccommodationBySlug(slug);
    if (row) {
      item = {
        title: row.name,
        image: resolveImageUrl(row.hero_image),
        details: row.description || row.summary,
      };
    }
  } catch {}
  if (!item) {
    item = accommodation.find((a) => a.slug === slug);
  }

  if (!item) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-8xl px-4 py-10">
      <div className="border-t-2 border-black pt-4">
        <h1 className="text-3xl md:text-4xl font-medium text-center md:text-left">
          {item.title}
        </h1>
        <div className="border-b-2 border-black mt-3" />
      </div>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
        <div className="order-1 md:order-2">
          {Array.isArray(item.images) && item.images.length > 0 ? (
            <EmblaCarousel
              images={item.images}
              options={{ loop: true, align: "start" }}
              className="rounded-xl overflow-hidden"
              slideClass="h-[48vh] min-h-[320px]"
            />
          ) : (
            <Image
              src={item.image}
              alt={item.title}
              width={1200}
              height={800}
              className="w-full h-auto rounded-xl object-cover"
            />
          )}
        </div>

        <div className="order-2 md:order-1">
          {item.details &&
            (Array.isArray(item.details) ? (
              item.details.map((para, i) => (
                <p
                  key={i}
                  className={`text-lg leading-relaxed ${i === 0 ? "mt-0" : "mt-3"}`}
                >
                  {para}
                </p>
              ))
            ) : (
              <p className="text-lg leading-relaxed">{item.details}</p>
            ))}
        </div>
      </section>
    </main>
  );
}
export const revalidate = 900;
