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
import SanityLandingContent from "@/components/SanityLandingContent";
import { fetchSanity } from "@/src/sanity/client";
import { getLandingPageParams, landingPageBySlugQuery } from "@/src/sanity/queries";
import { mapLandingPageToComponentProps } from "@/src/sanity/contentMapper";

function portableTextToPlainText(blocks: unknown[]): string {
  if (!Array.isArray(blocks)) return "";

  return blocks
    .filter((block) => block && typeof block === "object" && "children" in block)
    .map((block) => {
      const children = (block as { children?: unknown[] }).children;
      if (!Array.isArray(children)) return "";
      return children
        .filter((child) => child && typeof child === "object" && "text" in child)
        .map((child) => (child as { text?: string }).text || "")
        .join("");
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export default async function Home() {
  let cmsLanding: ReturnType<typeof mapLandingPageToComponentProps> | null = null;

  try {
    const landingData = await fetchSanity(landingPageBySlugQuery, getLandingPageParams("home"));
    if (landingData) {
      cmsLanding = mapLandingPageToComponentProps(landingData);
    }
  } catch {
    cmsLanding = null;
  }

  const heroTitle = cmsLanding?.hero?.title || undefined;
  const heroImage = cmsLanding?.hero?.image?.src || undefined;
  const heroSubtitle = cmsLanding?.bodyText
    ? portableTextToPlainText(cmsLanding.bodyText).slice(0, 220) || undefined
    : undefined;

  return (
    <>
      <NavBar />

      <HeroSection
        titleOverride={heroTitle}
        subtitleOverride={heroSubtitle}
        backgroundImageOverride={heroImage}
      />

      {cmsLanding ? (
        <SanityLandingContent bodyText={cmsLanding.bodyText} features={cmsLanding.features} />
      ) : null}

      <CollectionsScroll />

      <WhyHeritage />

      <AudienceSplit />

      <FeaturedProjects />

      <Testimonials />

      <ShowroomExp />

      <LeadCapture />

      <SiteFooter />
    </>
  );
}
