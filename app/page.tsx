import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ProcessSection from "@/components/ProcessSection";
import BrandMarquee from "@/components/BrandMarquee";
import Showcase from "@/components/Showcase";
import MaterialsSection from "@/components/MaterialsSection";
import WhyHeritage from "@/components/WhyHeritage";
import AudienceSplit from "@/components/AudienceSplit";
import LeadCapture from "@/components/LeadCapture";
import ShowroomExp from "@/components/ShowroomExp";
import VisitSection from "@/components/VisitSection";
import SiteFooter from "@/components/SiteFooter";

const SCHEDULE = "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";

export default function Home() {
  return (
    <>
      <NavBar />

      <HeroSection />

      <TrustBar />

      <ProcessSection />

      <BrandMarquee />

      {/* Cabinetry */}
      <Showcase
        id="cabinetry"
        eyebrow="Cabinetry"
        title={<>Crafted to Last <em>a Lifetime.</em></>}
        body="From stock to fully custom, KCD, Lectus Cabinetry, and Showplace Cabinetry. Plywood boxes, soft-close hardware, hundreds of door styles."
        brands={[
          { label: "KCD", href: "https://www.kcdus.com/" },
          { label: "Lectus", href: "https://www.lectuscabinets.com/" },
          { label: "Merit", href: "https://www.merit-kitchens.com/custom-kitchen-cabinetry/" },
          { label: "Showplace", href: "https://showplacecabinetry.com/" },
        ]}
        cta="Explore Cabinetry"
        ctaHref={SCHEDULE}
        image="https://showplacecabinetry.com/wp-content/uploads/2025/12/New-England-Transitional-with-Beachy-Island-20.jpg"
        imageAlt="Showplace transitional cabinetry"
      />

      {/* Countertops */}
      <Showcase
        reverse
        eyebrow="Countertops"
        title={<>Surfaces You&apos;ll Love, <em>Built for Everyday Function.</em></>}
        body="Quartz, marble, quartzite, granite, and butcher block from MSI Surfaces and Cambria."
        pills={["Quartz", "Marble", "Granite", "Butcher Block"]}
        brands={[
          { label: "MSI Surfaces", href: "https://www.msisurfaces.com/" },
          { label: "Cambria", href: "https://www.cambriausa.com/" },
        ]}
        cta="Request Stone Samples"
        ctaHref={SCHEDULE}
        image="https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/b662f8dd-f7f8-490d-8cce-bbb2eefbc8b8/whitendale.webp"
        imageAlt="Quartz slab – Whitendale"
      />

      <MaterialsSection />

      {/* Tile & Stone */}
      <Showcase
        eyebrow="Tile & Stone"
        title={<>Texture, Pattern, <em>Character.</em></>}
        body="Backsplash, floor, wall, and mosaic from MSI Surfaces, Zellige, subway, geometric, and stone slab."
        pills={["Zellige", "Subway", "Geometric", "Stone Slab"]}
        brands={[{ label: "MSI Surfaces", href: "https://www.msisurfaces.com/" }]}
        cta="Browse the Tile Library"
        ctaHref={SCHEDULE}
        image="https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/0c09e194-781a-4b95-8986-697488e320d0/ChatGPT+Image+Apr+3%2C+2026%2C+12_06_18+PM.png?content-type=image%2Fpng"
        imageAlt="Tile and stone selection"
      />

      {/* Fixtures & Hardware */}
      <Showcase
        reverse
        eyebrow="Fixtures & Hardware"
        title={<>The Details That Define <em>the Space.</em></>}
        body="Premium faucets, fixtures, and cabinet hardware in every finish."
        pills={["Brushed Gold", "Matte Black", "Polished Chrome"]}
        brands={[{ label: "Top Knobs", href: "https://www.topknobs.com/" }]}
        cta="See the Finish Collection"
        ctaHref={SCHEDULE}
        image="https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/74c2935e-ca5e-46b2-af5f-408e8b5c2837/43.png?content-type=image%2Fpng"
        imageAlt="Fixtures and hardware"
      />

      {/* Shower & Bath */}
      <Showcase
        eyebrow="Shower & Bath"
        title={<>Your Personal Retreat, <em>Designed Right.</em></>}
        body="Shower systems, soaking tubs, bath fixtures, and surround tile."
        pills={["Shower Systems", "Soaking Tubs", "Surround Tile"]}
        cta="Design Your Retreat"
        ctaHref={SCHEDULE}
        image="https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/9e6294ff-bc6d-4a8e-a04d-11ac6bd6aa6c/Dark+Marble+Opulence.png?format=500w"
        imageAlt="Dark marble bath"
      />

      <WhyHeritage />

      <AudienceSplit />

      <LeadCapture />

      <ShowroomExp />

      <VisitSection />

      <SiteFooter />
    </>
  );
}
