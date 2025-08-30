import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import Editorial from "@/components/Editorial";
import QuoteBand from "@/components/QuoteBand";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <Editorial />
        <QuoteBand />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
