import Link from "next/link";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import BrandMarquee from "@/components/BrandMarquee";
import Showcase from "@/components/Showcase";
import WhyHeritage from "@/components/WhyHeritage";
import Testimonials from "@/components/Testimonials";
import AudienceSplit from "@/components/AudienceSplit";
import FeaturedProjects from "@/components/FeaturedProjects";
import ShowroomExp from "@/components/ShowroomExp";
import LeadCapture from "@/components/LeadCapture";
import SiteFooter from "@/components/SiteFooter";

const SCHEDULE = "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";

export default function Home() {
  return (
    <>
      <NavBar />

      <HeroSection />

      <TrustBar />

      <BrandMarquee />

      {/* Cabinetry */}
      <Showcase
        id="cabinetry"
        eyebrow="Cabinetry"
        title={<>Crafted to Last <em>a Lifetime.</em></>}
        body="From stock to fully custom — KCD, Lectus, Merit, and Showplace Cabinetry. Plywood boxes, soft-close hardware, hundreds of door styles."
        brands={[
          { label: "KCD", href: "https://www.kcdus.com/" },
          { label: "Lectus", href: "https://www.lectuscabinets.com/" },
          { label: "Merit", href: "https://www.merit-kitchens.com/custom-kitchen-cabinetry/" },
          { label: "Showplace", href: "https://showplacecabinetry.com/" },
        ]}
        cta="Book a Consultation"
        ctaHref={SCHEDULE}
        image="https://showplacecabinetry.com/wp-content/uploads/2025/12/New-England-Transitional-with-Beachy-Island-20.jpg"
        imageAlt="Showplace transitional cabinetry"
      />

      {/* Countertops */}
      <Showcase
        reverse
        eyebrow="Countertops"
        title={<>Surfaces You&apos;ll Love, <em>Built to Last.</em></>}
        body="Quartz, marble, quartzite, granite, and butcher block from the industry's most trusted names."
        pills={["Quartz", "Marble", "Granite", "Butcher Block"]}
        brands={[
          { label: "MSI Surfaces", href: "https://www.msisurfaces.com/" },
          { label: "Cambria", href: "https://www.cambriausa.com/" },
          { label: "Caesarstone", href: "https://www.caesarstoneus.com" },
          { label: "Vicostone", href: "https://us.vicostone.com/" },
          { label: "Jaaron Wood", href: "https://www.jaaronwoodcountertops.com/" },
        ]}
        cta="Request Stone Samples"
        ctaHref={SCHEDULE}
        image="https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/b662f8dd-f7f8-490d-8cce-bbb2eefbc8b8/whitendale.webp"
        imageAlt="Quartz slab – Whitendale"
      />

      {/* Collections bridge */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--gold-border)", borderBottom: "1px solid var(--gold-border)" }}>
        <div style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "48px var(--pad)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
          <p style={{ color: "var(--white-dim)", fontSize: "17px", fontWeight: 300, margin: 0, lineHeight: 1.6 }}>
            We also carry tile &amp; stone, fixtures, hardware, and a full bath collection —
            <span style={{ color: "var(--white)" }}> all on display in our showroom.</span>
          </p>
          <Link
            href="/collections"
            style={{ color: "var(--gold)", fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 300, whiteSpace: "nowrap", borderBottom: "1px solid var(--gold-border)", paddingBottom: "2px", textDecoration: "none", transition: "border-color 200ms" }}
          >
            View All Collections ↗
          </Link>
        </div>
      </section>

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
