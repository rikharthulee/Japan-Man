import "./globals.css";
import Navbar from "../components/Navbar";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata = {
  title: "JapanMan",
  description: "Tailor-made Japan travel experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={playfair.className}>
        <Navbar />
        <div className="antialiased bg-white text-neutral-900">{children}</div>
      </body>
    </html>
  );
}
