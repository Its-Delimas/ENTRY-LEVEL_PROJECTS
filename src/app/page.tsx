import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Missions from "@/components/landing/Missions";
import TracksDashboard from "@/components/landing/TracksDashboard";
import LocalProjects from "@/components/landing/LocalProjects";
import BuiltForAfrica from "@/components/landing/BuiltForAfrica";
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
        <TracksDashboard />
        <LocalProjects />
        <BuiltForAfrica />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
