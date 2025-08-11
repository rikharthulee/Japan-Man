import "./globals.css";

export const metadata = {
  title: "Travel Co.",
  description: "Tailor-made journeys",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-neutral-900">{children}</body>
    </html>
  );
}
