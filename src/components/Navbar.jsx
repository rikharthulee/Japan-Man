"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // Keep banner height consistent between image size and padding space
  const bannerH = 80; // px

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "#accommodation", label: "Accommodation" },
    { href: "#examples", label: "Examples" },
    { href: "#blog", label: "Blog" },
    { href: "#about", label: "About" },
    { href: "#faq", label: "FAQ" },
    { href: "#toolkit", label: "Toolkit" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm">
      <nav className="mx-auto max-w-6xl px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Burger (mobile only) */}

            <button
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 ring-1 ring-black/10"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {/* Icon swaps between burger and close */}
              <svg
                className={`h-5 w-5 transition ${open ? "hidden" : "block"}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
              <svg
                className={`h-5 w-5 transition ${open ? "block" : "hidden"}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop banner perched on black link bar */}
      {/* Wrapper reserves space above the bar so the banner isn't clipped */}
      <div className="hidden md:block relative" style={{ paddingTop: `${bannerH}px` }}>
        {/* Skyline glued to top of the bar */}
        <img
          src="/banner.svg"
          alt="Banner"
          className="absolute left-1/2 -translate-x-1/2 top-0 w-auto pointer-events-none select-none z-10"
          style={{ height: `${bannerH}px` }}
        />
        {/* Black link bar (normal height) */}
        <div className="bg-black">
          <div className="mx-auto max-w-6xl py-2">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center">
              <div />
              <ul className="flex justify-center items-center gap-6 text-white">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link className="hover:opacity-80" href={l.href}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end pr-4">
                <a
                  href="https://wa.me/447786992190"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-2 bg-green-500 text-white rounded-full px-4 py-2 shadow hover:bg-green-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.46.03.15 5.34.18 11.94c.01 2.11.56 4.14 1.56 5.95L0 24l6.29-1.69a11.83 11.83 0 0 0 5.77 1.49h.05c6.6-.03 11.91-5.34 11.94-11.94a11.9 11.9 0 0 0-3.53-8.38ZM12.1 21.3h-.05a9.75 9.75 0 0 1-4.98-1.37l-.36-.21-3.73.99 1-3.64-.23-.38A9.73 9.73 0 0 1 2.03 12C2 6.5 6.5 2 12.05 2c2.61 0 5.06 1.02 6.9 2.86A9.73 9.73 0 0 1 22.1 12c-.03 5.5-4.53 9.3-10 9.3Zm5.01-6.98c-.27-.14-1.58-.78-1.82-.86-.24-.09-.42-.14-.6.13-.18.27-.69.86-.83 1.04-.15.18-.31.2-.58.07-.27-.14-1.12-.41-2.14-1.31-.79-.7-1.33-1.56-1.49-1.82-.15-.27-.02-.42.11-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.6-1.43-.82-1.96-.22-.53-.44-.46-.6-.46-.16 0-.34-.02-.52-.02s-.48.07-.73.34c-.25.27-.96..94-.96 2.29 0 1.35.99 2.66 1.13 2.84.14.18 1.96 2.98 4.75 4.17.66.29 1.18.47 1.58.6.66.21 1.27.18 1.75.11.53-.08 1.58-.65 1.8-1.28.22-.63.22-1.17.15-1.28-.07-.11-.25-.18-.52-.32Z" />
                  </svg>
                  <span className="whitespace-nowrap">+44 7786 992190</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4">
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  className="block rounded-lg px-3 py-2 hover:bg-black/5"
                  href={l.href}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#plan"
            className="mt-3 inline-block w-full rounded-full px-4 py-2 border text-center hover:bg-black hover:text-white transition"
            onClick={() => setOpen(false)}
          >
            Plan a Trip
          </Link>
        </div>
      </div>
    </header>
  );
}
