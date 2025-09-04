import CallNowButton from "@/components/CallNowButton";

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
            Day Excursion to Tsuwano & Ruriko-ji
          </h2>
          <p className="mt-2 text-gray-700">
            Rurikoji is a picturesque 15th-century pagoda complex nestled in the
            countryside of Western Honshu a bus ride from the small city of
            Yamaguchi. It sits at the heart of Kozan park amongst various
            original buildings including Chinryutei building where defectors
            secretly congregated to plot the overthrow of the Shogunate and
            restore the Emperor to usher in the Meiji Era in 1868.
          </p>
          <br></br>
          <p className="mt-2 text-gray-700">
            Nestled in the western hills of Shimane Prefecture, Tsuwano is a
            picturesque town often called the “Little Kyoto of San’in.”
            Strolling through its historic streets, visitors are greeted by rows
            of old samurai residences with white walls, red-tiled roofs, and
            latticed windows that evoke the charm of centuries past. A clear
            canal runs alongside the main street, where vibrant koi carp glide
            gracefully, adding color and life to the scene. Overlooking the town
            is the Taikodani Inari Shrine with its striking red torii gates
            displaying its relation to the more famous Fushimi Inari shrine in
            Kyoto. A Catholic Church and the Maria Seido Chapel that have been
            built in honour of the Christian converts who risked their lives
            defying the Shogunate 17th-century Japan.
          </p>
        </article>

        <article className="p-5 rounded-xl ring-1 ring-black/10">
          <h2 className="text-xl font-semibold">Sightseeing</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Takodani Inari Shrine</li>
            <li>Old Town</li>
            <li>Maria Seido Chapel</li>
            <li>Tsuwano Castle Ruins</li>
            <li>Yomei-ji temple</li>
          </ul>
        </article>

        <article className="p-5 rounded-xl ring-1 ring-black/10">
          <h2 className="text-xl font-semibold">Getting there and around</h2>
          <p className="mt-2 text-gray-700">
            There are limited connections on this route so we advise the
            following train schedule. Catch the 07:58 Sakura 541 bullet train
            from Hiroshima arriving into Shin-Yamaguchi at 08:28. then catch the
            Super Oki 2 Limited Express train departing Shin-Yamaguchi at 08:57
            and arriving into Yamaguchi at 09:13. If you'd like to skip Rurikoji
            then just stay on the train which reaches Tsuwano at 10:02.
          </p>
          <p>
            {" "}
            Rurikoji stands about 2.5 kilometers north of Yamaguchi Station and
            can be reached on foot (40 minutes) or by rental bicycles, which are
            available outside the station (300 yen for two hours or 700 yen for
            the whole day).
          </p>
          <p>
            {" "}
            Alternatively, take a bus from the station bound for Yamaguchi
            Daigaku (山口大学) or Nakaoguchi (中尾口) and stop at Kenchomae
            (県庁前) bus stop (6 minutes, 170 yen, 2-3 departures per hour).
            From the bus stop it takes ten minutes to walk to Rurikoji Temple.
          </p>
          <p>
            {" "}
            Retrace your steps to Yamaguchi station in good time to catch the
            13:08 Super Oki 4 Limited Express which arrives into Tsuwano at
            13:57. The town is small enough to be explored on foot, or there's a
            bicycle rental shop outside the station (500 yen for the day, shop
            generally closes at 17.00).
          </p>
          <p>
            {" "}
            Return on the Super Oki 5 Limited Express leaving Tsuwano at 18:11
            and reaching Shin-Yamaguchi at 19:14. Catch the Sakura 570 bullet
            train leaving Shin-Yamaguchi at 19:21 and arriving back into
            Hiroshima at 19:51.
          </p>
        </article>

        <p className="text-gray-600">
          Want a tailored plan? Get in touch and I'll build a custom itinerary
          around your dates, interests, and pace.
        </p>
        <CallNowButton></CallNowButton>
      </section>
    </main>
  );
}
