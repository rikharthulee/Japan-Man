export default function CTA() {
  return (
    <section id="plan" className="py-16">
      <div className="mx-auto max-w-6xl rounded-2xl bg-neutral-900 px-6 py-12 text-white">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-medium">
              Plan your tailor‑made journey
            </h3>
            <p className="mt-2 text-white/80">
              Speak to a specialist to craft an itinerary around you.
            </p>
          </div>
          <div className="md:text-right">
            <a
              href="#contact"
              className="inline-block rounded-full bg-white text-black px-6 py-3"
            >
              Speak to an Expert
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
