export default function ExamplesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="border-t-2 border-black/10 pt-4">
        <h1 className="text-3xl md:text-4xl font-medium">
          Example Itineraries
        </h1>
        <div className="border-b-2 border-black/10 mt-3" />
      </div>

      <section className="mt-8 space-y-8">
        <article className="p-5 rounded-xl ring-1 ring-black/10">
          <h2 className="text-xl font-semibold">
            Classic 7-Day: Tokyo & Kyoto
          </h2>
          <p className="mt-2 text-gray-700">
            Perfect first trip covering modern buzz and timeless tradition.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Days 1–3: Tokyo neighborhoods, food, and skyline views</li>
            <li>Day 4: Shinkansen to Kyoto, Gion evening walk</li>
            <li>Days 5–6: Temples, tea, Arashiyama, and Nara side trip</li>
            <li>Day 7: Return to Tokyo or depart from Kansai</li>
          </ul>
        </article>

        <article className="p-5 rounded-xl ring-1 ring-black/10">
          <h2 className="text-xl font-semibold">
            10-Day Highlights: Tokyo, Hakone, Kyoto, Osaka
          </h2>
          <p className="mt-2 text-gray-700">
            A well-paced route with onsen, views of Fuji, and foodie Osaka.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Days 1–3: Tokyo sights and museums</li>
            <li>Days 4–5: Hakone onsen, Fuji views, ropeway</li>
            <li>Days 6–8: Kyoto culture, bamboo grove, Fushimi Inari</li>
            <li>Days 9–10: Osaka street food, Dotonbori nightlife</li>
          </ul>
        </article>

        <article className="p-5 rounded-xl ring-1 ring-black/10">
          <h2 className="text-xl font-semibold">
            14-Day Explorer: Tokyo to Hiroshima
          </h2>
          <p className="mt-2 text-gray-700">
            Adds Kanazawa, Miyajima, and extra depth to the Kansai region.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>
              Tokyo → Kanazawa → Kyoto → Nara → Hiroshima → Miyajima → Osaka
            </li>
            <li>Balanced mix of city, gardens, history, and coastal scenery</li>
          </ul>
        </article>

        <p className="text-gray-600">
          Want a tailored plan? Get in touch and I’ll build a custom itinerary
          around your dates, interests, and pace.
        </p>
      </section>
    </main>
  );
}
