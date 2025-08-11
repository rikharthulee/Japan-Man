const items = [
  { title: "Tokyo", img: "https://picsum.photos/seed/tokyo/1200/800" },
  { title: "Kyoto", img: "https://picsum.photos/seed/kyoto/1200/800" },
  {
    title: "Hakone / Mt Fuji",
    img: "https://picsum.photos/seed/fuji/1200/800",
  },
  { title: "Miyajima", img: "https://picsum.photos/seed/miyajima/1200/800" },
  { title: "Nara", img: "https://picsum.photos/seed/nara/1200/800" },
  { title: "Kanazawa", img: "https://picsum.photos/seed/kanazawa/1200/800" },
];

export default function Destinations() {
  return (
    <section id="destinations" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl md:text-4xl font-medium">Destinations</h2>
        <a href="#" className="underline">
          View all
        </a>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((d) => (
          <a
            key={d.title}
            href="#"
            className="group relative overflow-hidden rounded-xl"
          >
            <img
              src={d.img}
              alt=""
              className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
            <div className="absolute bottom-3 left-3 text-white text-lg font-medium">
              {d.title}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
