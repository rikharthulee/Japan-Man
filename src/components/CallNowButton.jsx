import React from "react";

export default function CallNowButton({
  label = "Call Now",
  variant = "light", // "light" for light backgrounds, "dark" for dark backgrounds
  className = "",
  ariaLabel = "Chat on WhatsApp",
}) {
  const base =
    variant === "dark"
      ? "inline-flex items-center rounded-full px-4 py-2 text-white border border-white/20 hover:bg-white/10 transition"
      : "inline-flex items-center rounded-full px-3 py-2 text-sm border border-black/10 hover:bg-black/5 transition";

  return (
    <a
      href="https://wa.me/447786992190"
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${className}`}
      aria-label={ariaLabel}
    >
      <span className="whitespace-nowrap">{label}</span>
    </a>
  );
}

