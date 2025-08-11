import "./globals.css";

export const metadata = {
  title: "JapanMan",
  description: "Tailor-made Japan travel experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-neutral-900">{children}</body>
    </html>
  );
}
