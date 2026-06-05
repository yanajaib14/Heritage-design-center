"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";

type Filter = "all" | "kitchen" | "bath";

const projects = [
  {
    type: "kitchen" as const,
    title: "Transitional White Kitchen",
    src: "https://showplacecabinetry.com/wp-content/uploads/2025/12/New-England-Transitional-with-Beachy-Island-20.jpg",
    tall: true,
  },
  {
    type: "kitchen" as const,
    title: "Slab Backsplash Kitchen",
    src: "https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/d7463ac6-a87c-4cd2-877a-304026df15ea/kitchen+with+slab+backsplash.jpg",
    tall: false,
  },
  {
    type: "bath" as const,
    title: "Dark Marble Retreat",
    src: "https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/9e6294ff-bc6d-4a8e-a04d-11ac6bd6aa6c/Dark+Marble+Opulence.png",
    tall: true,
  },
  {
    type: "kitchen" as const,
    title: "Contemporary Island",
    src: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=85",
    tall: false,
  },
  {
    type: "kitchen" as const,
    title: "Modern Open Kitchen",
    src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=85",
    tall: false,
  },
  {
    type: "bath" as const,
    title: "Spa Master Bath",
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=85",
    tall: false,
  },
  {
    type: "kitchen" as const,
    title: "Craftsman Transitional",
    src: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=85",
    tall: true,
  },
  {
    type: "bath" as const,
    title: "Wet Room Suite",
    src: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=900&q=85",
    tall: false,
  },
  {
    type: "kitchen" as const,
    title: "Transitional Chef Kitchen",
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85",
    tall: false,
  },
];

export default function GalleryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("all");

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

  return (
    <>
      <NavBar />

      {/* Hero */}
      <section className="page-hero">
        <div
          className="page-hero-bg"
          style={{ backgroundImage: "url('https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/e2edde19-4fb4-4a28-920e-207d0ee8b444/ChatGPT+Image+Apr+2%2C+2026%2C+10_37_53+AM.png?content-type=image%2Fpng')" }}
        />
        <div className="page-hero-overlay" aria-hidden="true" />
        <div className="page-hero-inner" ref={heroRef}>
          <span className="eyebrow h-item" style={{ opacity: 0 }}>Past Projects</span>
          <h1 style={{ opacity: 0 }} className="h-item">
            Our<br />
            <em>Work</em>
          </h1>
          <p className="page-hero-sub h-item" style={{ opacity: 0 }}>
            Every project starts with a conversation and ends with a space the client loves. Browse a selection of kitchens and baths we&apos;ve designed and supplied.
          </p>
        </div>
      </section>

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
            <span style={{ marginLeft: "auto", alignSelf: "center", fontSize: "13px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-dim)", fontWeight: 500, paddingBottom: "2px" }}>
              {visible.length} {visible.length === 1 ? "project" : "projects"}
            </span>
          </div>

          {/* Grid */}
          <div className="gallery-grid" ref={gridRef}>
            {visible.map(({ type, title, src, tall }) => (
              <div key={title} className={`gallery-item${tall ? " tall" : " wide"}`}>
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
      <section style={{ background: "var(--bg-dark)", position: "relative", overflow: "hidden", padding: "clamp(100px, 13vw, 160px) var(--pad)" }}>
        <div aria-hidden="true" style={{ position: "absolute", bottom: -40, right: -20, fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(160px, 20vw, 300px)", fontWeight: 500, color: "rgba(197,160,89,0.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none", zIndex: 0, whiteSpace: "nowrap" }}>Gallery</div>
        <div style={{ maxWidth: "var(--max)", margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(40px, 6vw, 80px)", alignItems: "center" }}>
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
          <div style={{ minWidth: 220 }}>
            <a className="btn btn-solid pulse-shimmer-btn" href={SCHEDULE_URL} target="_blank" rel="noopener">
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
