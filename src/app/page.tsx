import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import TryIt from "@/components/landing/TryIt";
import Path from "@/components/landing/Path";
import LocalProjects from "@/components/landing/LocalProjects";
import Free from "@/components/landing/Free";
import PhotoBand from "@/components/landing/PhotoBand";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <TryIt />
        <HowItWorks />
        <PhotoBand />
        <Path />
        <LocalProjects />
        <Free />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
