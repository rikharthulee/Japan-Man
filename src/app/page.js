import Hero from "@/components/Hero";
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
