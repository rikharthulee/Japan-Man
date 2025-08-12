"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const links = [
    { href: "#destinations", label: "Destinations" },
    { href: "#inspiration", label: "Inspiration" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-sm">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="JapanMan Logo"
            className="h-[32px] w-auto" // controlled logo height
          />
        </a>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a className="hover:opacity-70" href={l.href}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#plan"
            className="hidden md:inline-block rounded-full px-4 py-2 border hover:bg-black hover:text-white transition"
          >
            Plan a Trip
          </a>

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
      </nav>

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
                <a
                  className="block rounded-lg px-3 py-2 hover:bg-black/5"
                  href={l.href}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#plan"
            className="mt-3 inline-block w-full rounded-full px-4 py-2 border text-center hover:bg-black hover:text-white transition"
            onClick={() => setOpen(false)}
          >
            Plan a Trip
          </a>
        </div>
      </div>
    </header>
  );
}
