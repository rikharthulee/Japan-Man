const posts = [
  {
    title: "A Culinary Journey Through Kyoto",
    img: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200",
  },
  {
    title: "Hidden Islands of Vietnam",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200",
  },
  {
    title: "How to Pack Like a Pro",
    img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200",
  },
];

export default function Editorial() {
  return (
    <section id="inspiration" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl md:text-4xl font-medium">Inspiration</h2>
        <a href="#" className="underline">
          View journal
        </a>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <article key={p.title} className="group">
            <a href="#" className="block overflow-hidden rounded-xl">
              <img
                src={p.img}
                alt=""
                className="h-56 w-full object-cover transition group-hover:scale-105"
              />
            </a>
            <h3 className="mt-3 text-lg font-medium">{p.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
