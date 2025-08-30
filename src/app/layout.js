import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "JapanMan",
  description: "Tailor-made Japan travel experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="antialiased bg-white text-neutral-900">{children}</div>
      </body>
    </html>
  );
}
