export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[520px]">
      <img
        src="https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 h-full flex flex-col items-start justify-center">
        <h1 className="text-white text-4xl md:text-6xl font-medium leading-tight">
          Tailor‑made journeys, crafted by experts
        </h1>
        <p className="mt-4 text-white/90 max-w-2xl">
          Bespoke itineraries to the world’s most extraordinary places.
        </p>
        <div className="mt-8 flex gap-3">
          <a
            href="#destinations"
            className="rounded-full bg-white text-black px-5 py-3"
          >
            Explore Destinations
          </a>
          <a
            href="#plan"
            className="rounded-full border border-white/70 text-white px-5 py-3"
          >
            Plan with an Expert
          </a>
        </div>
      </div>
    </section>
  );
}
