import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/shared/WhatsAppFab";
import Hero from "@/components/home/Hero";
import OurWay from "@/components/home/OurWay";
import FourPaths from "@/components/home/FourPaths";
import Teachers from "@/components/home/Teachers";
import Testimonials from "@/components/home/Testimonials";
import Gallery from "@/components/home/Gallery";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <OurWay />
        <FourPaths />
        <Teachers />
        <Testimonials />
        <Gallery />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
