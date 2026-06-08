import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import CollectionsScroll from "@/components/CollectionsScroll";
import WhyHeritage from "@/components/WhyHeritage";
import Testimonials from "@/components/Testimonials";
import AudienceSplit from "@/components/AudienceSplit";
import FeaturedProjects from "@/components/FeaturedProjects";
import ShowroomExp from "@/components/ShowroomExp";
import LeadCapture from "@/components/LeadCapture";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <NavBar />

      <HeroSection />

      <CollectionsScroll />

      <WhyHeritage />

      <Testimonials />

      <AudienceSplit />

      <FeaturedProjects />

      <ShowroomExp />

      <LeadCapture />

      <SiteFooter />
    </>
  );
}
