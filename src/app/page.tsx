import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Missions from "@/components/landing/Missions";
import LocalProjects from "@/components/landing/LocalProjects";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Missions />
        <LocalProjects />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
