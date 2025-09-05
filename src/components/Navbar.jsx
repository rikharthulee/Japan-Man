"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import CallNowButton from "./CallNowButton";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // Keep banner height consistent between image size and padding space
  const bannerH = 120; // px

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/locations", label: "Locations" },
    { href: "/accommodation", label: "Accommodation" },
    { href: "/experiences", label: "Experiences" },
    { href: "/blog", label: "Blog" },
    { href: "/fooddrink", label: "Food & Drink" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <nav className="mx-auto max-w-6xl px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Burger (mobile only) */}

            <button
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 ring-1 ring-black/10"
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
          {/* WhatsApp on mobile bar (right side) */}

          {/* <CallNowButton variant="light" className="lg:hidden" /> */}
        </div>
      </nav>

      {/* Desktop banner perched on black link bar */}
      {/* Wrapper reserves space above the bar so the banner isn't clipped */}
      <div
        className="hidden lg:block relative"
        style={{ paddingTop: `${bannerH}px` }}
      >
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
                {/* <CallNowButton
                  variant="dark"
                  className="hidden lg:inline-flex"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <div
        className={`lg:hidden transition-[max-height,opacity] duration-300 ${
          open
            ? "max-h-screen opacity-100 overflow-y-auto"
            : "max-h-0 opacity-0 overflow-hidden"
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
        </div>
      </div>
    </header>
  );
}
