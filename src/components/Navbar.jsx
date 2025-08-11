"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled ? "bg-white/95 shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
        <a href="/" className="font-semibold tracking-wide">
          JapanMan
        </a>
        <ul className="hidden md:flex gap-6">
          <li>
            <a className="hover:opacity-70" href="#destinations">
              Destinations
            </a>
          </li>
          <li>
            <a className="hover:opacity-70" href="#inspiration">
              Inspiration
            </a>
          </li>
          <li>
            <a className="hover:opacity-70" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="hover:opacity-70" href="#contact">
              Contact
            </a>
          </li>
        </ul>
        <a
          href="#plan"
          className="rounded-full px-4 py-2 border hover:bg-black hover:text-white transition"
        >
          Plan a Trip
        </a>
      </nav>
    </header>
  );
}
