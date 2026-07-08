"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import SanityLandingContent from "@/components/SanityLandingContent";
import { fetchSanity } from "@/src/sanity/client";
import { getLandingPageParams, landingPageBySlugQuery } from "@/src/sanity/queries";
import { mapLandingPageToComponentProps } from "@/src/sanity/contentMapper";
import { portableTextToPlainText } from "@/src/sanity/plainText";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";

type Filter = "all" | "kitchen" | "bath";

const projects = [
  {
    type: "kitchen" as const,
    title: "Transitional White Kitchen",
    src: "/project-university-place.png",
  },
  {
    type: "kitchen" as const,
    title: "Slab Backsplash Kitchen",
    src: "/gallery-quartz-backsplash.jpg",
  },
  {
    type: "bath" as const,
    title: "Dark Marble Retreat",
    src: "/gallery-luxury-bath.png",
  },
  {
    type: "kitchen" as const,
    title: "Contemporary Island",
    src: "/project-forest-kitchen.jpg",
  },
  {
    type: "kitchen" as const,
    title: "Modern Open Kitchen",
    src: "/gallery-whistler-frost.jpg",
  },
  {
    type: "bath" as const,
    title: "Spa Master Bath",
    src: "/gallery-essential-white-bath.jpg",
  },
  {
    type: "kitchen" as const,
    title: "Craftsman Transitional",
    src: "/project-midnight-blue.jpg",
  },
  {
    type: "bath" as const,
    title: "Wet Room Suite",
    src: "/gallery-oslo-white-bath.jpg",
  },
  {
    type: "kitchen" as const,
    title: "Transitional Chef Kitchen",
    src: "/project-coastal-calm.jpg",
  },
];

const BENTO_PATTERN = ["bento-xl", "bento-tall", "bento-wide", "bento-square", "bento-square", "bento-wide", "bento-tall", "bento-square", "bento-wide"] as const;

export default function GalleryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [cmsLanding, setCmsLanding] = useState<ReturnType<typeof mapLandingPageToComponentProps> | null>(null);

  const visible = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".h-item"),
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.13, duration: 1, ease: "power3.out", delay: 0.3 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const items = grid.querySelectorAll<HTMLElement>(".gallery-item");
    gsap.fromTo(
      items,
      { y: 28, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.07, duration: 0.7, ease: "power3.out" }
    );
  }, [filter]);

  useEffect(() => {
    let isMounted = true;

    const loadCms = async () => {
      try {
        const landingData = await fetchSanity(landingPageBySlugQuery, getLandingPageParams("gallery"));
        if (!isMounted) return;
        setCmsLanding(landingData ? mapLandingPageToComponentProps(landingData) : null);
      } catch {
        if (isMounted) {
          setCmsLanding(null);
        }
      }
    };

    loadCms();
    return () => {
      isMounted = false;
    };
  }, []);

  const heroTitle = cmsLanding?.hero?.title || "";
  const heroSubtitle = cmsLanding?.bodyText
    ? portableTextToPlainText(cmsLanding.bodyText).slice(0, 220)
    : "";
  const heroBackground = "/Gemini_Generated_Image_qci0g7qci0g7qci0.png";

  return (
    <>
      <NavBar />

      {/* Hero */}
      <section className="page-hero">
        <div
          className="page-hero-bg"
          style={{ backgroundImage: `url('${heroBackground}')` }}
        />
        <div className="page-hero-overlay gallery-hero-overlay" aria-hidden="true" />
        <div className="page-hero-inner" ref={heroRef}>
          <span className="eyebrow h-item" style={{ opacity: 0 }}>Past Projects</span>
          <h1 style={{ opacity: 0 }} className="h-item">
            {heroTitle || (
              <>
                Our<br />
                <em>Work</em>
              </>
            )}
          </h1>
          <p className="page-hero-sub h-item" style={{ opacity: 0 }}>
            {heroSubtitle || "Every project starts with a conversation and ends with a space the client loves. Browse a selection of kitchens and baths we've designed and supplied."}
          </p>
        </div>
      </section>

      {cmsLanding ? (
        <SanityLandingContent bodyText={cmsLanding.bodyText} features={cmsLanding.features} />
      ) : null}

      {/* Gallery */}
      <section style={{ background: "var(--bg)", padding: "clamp(72px, 10vw, 120px) var(--pad)" }}>
        <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>

          {/* Filter tabs */}
          <div className="gallery-filter">
            {(["all", "kitchen", "bath"] as Filter[]).map((f) => (
              <button
                key={f}
                className={`gallery-filter-btn${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "All Projects" : f === "kitchen" ? "Kitchens" : "Baths"}
              </button>
            ))}
            <span className="gallery-filter-count" style={{ marginLeft: "auto", alignSelf: "center", fontSize: "13px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-dim)", fontWeight: 500, paddingBottom: "2px" }}>
              {visible.length} {visible.length === 1 ? "project" : "projects"}
            </span>
          </div>

          {/* Grid */}
          <div className="gallery-grid gallery-bento-grid" ref={gridRef}>
            {visible.map(({ type, title, src }, i) => (
              <div key={title} className={`gallery-item gallery-bento ${BENTO_PATTERN[i % BENTO_PATTERN.length]}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={title} loading="lazy" />
                <div className="gallery-item-overlay" />
                <div className="gallery-item-meta">
                  <span className="gi-cat">{type === "kitchen" ? "Kitchen" : "Bath"}</span>
                  <h3>{title}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="page-cta-section">
        <div className="page-cta-watermark" aria-hidden="true">Gallery</div>
        <div className="page-cta-content">
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: 20 }}>Start Your Project</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.03em", color: "var(--white)", margin: "0 0 28px" }}>
              Love What You See?<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Let&apos;s Build Yours.</em>
            </h2>
            <p style={{ color: "var(--white-dim)", fontSize: 18, lineHeight: 1.75, fontWeight: 400, maxWidth: 460, margin: 0 }}>
              Book a free consultation and bring your project to the showroom. We&apos;ll handle the design and supply every material.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 220 }}>
            <a className="btn btn-solid pulse-shimmer-btn" href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
