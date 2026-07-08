"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import SanityLandingContent from "@/components/SanityLandingContent";
import { fetchSanity } from "@/src/sanity/client";
import { getLandingPageParams, landingPageBySlugQuery } from "@/src/sanity/queries";
import { mapLandingPageToComponentProps } from "@/src/sanity/contentMapper";
import { portableTextToPlainText } from "@/src/sanity/plainText";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";

const photoSlots = [
  { id: 1, label: "Showroom Floor", wide: false, src: "/project-heritage-woods.png", alt: "Heritage showroom floor display" },
  { id: 2, label: "Cabinetry Wall", wide: false, src: "/gallery-whistler-frost.jpg", alt: "Cabinetry wall with sample finishes" },
  { id: 3, label: "Stone Library", wide: false, src: "/gallery-quartz-backsplash.jpg", alt: "Stone and countertop material selections" },
  { id: 4, label: "Design Studio", wide: true, src: "/project-university-place.png", alt: "Design studio consultation area" },
  { id: 5, label: "Tile Display", wide: false, src: "/gallery-bath-view2.jpg", alt: "Tile and bath display wall" },
  { id: 6, label: "Hardware Collection", wide: false, src: "/gallery-metropolitan-walnut.jpg", alt: "Cabinet hardware and fixture collection" },
];

export default function ShowroomPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [cmsLanding, setCmsLanding] = useState<ReturnType<typeof mapLandingPageToComponentProps> | null>(null);

  useEffect(() => {
    if (ScrollTrigger.isTouch === 1) {
      gsap.set(".h-item, .a-item, .showroom-photo-slot, .showroom-video-slot, .showroom-info-item", { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".h-item"),
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.13, duration: 1, ease: "power3.out", delay: 0.3 }
        );
      }
      if (aboutRef.current) {
        gsap.fromTo(
          aboutRef.current.querySelectorAll(".a-item"),
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: aboutRef.current, start: "top 78%" } }
        );
      }
      if (photosRef.current) {
        photosRef.current.querySelectorAll(".showroom-photo-slot").forEach((slot, i) => {
          gsap.fromTo(slot,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
              scrollTrigger: { trigger: photosRef.current, start: "top 80%" },
              delay: i * 0.07 }
          );
        });
        gsap.fromTo(
          photosRef.current.querySelector(".showroom-video-slot"),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: photosRef.current, start: "top 70%" }, delay: 0.5 }
        );
      }
      if (infoRef.current) {
        infoRef.current.querySelectorAll(".showroom-info-item").forEach((item, i) => {
          gsap.fromTo(item,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: infoRef.current, start: "top 82%" },
              delay: i * 0.1 }
          );
        });
      }
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadCms = async () => {
      try {
        const landingData = await fetchSanity(landingPageBySlugQuery, getLandingPageParams("showroom"));
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
    ? portableTextToPlainText(cmsLanding.bodyText).slice(0, 240)
    : "";
  const heroBackground = cmsLanding?.hero?.image?.src || "/hero-bathroom-custom.png";

  return (
    <>
      <NavBar />

      {/* Hero */}
      <section className="page-hero">
        <div
          className="page-hero-bg"
          style={{ backgroundImage: `url('${heroBackground}')` }}
        />
        <div className="page-hero-overlay" aria-hidden="true" />
        <div className="page-hero-inner" ref={heroRef}>
          <span className="eyebrow h-item" style={{ opacity: 0 }}>Lacey, Washington</span>
          <h1 style={{ opacity: 0 }} className="h-item">
            {heroTitle || (
              <>
                Our<br />
                <em>Showroom</em>
              </>
            )}
          </h1>
          <p className="page-hero-sub h-item" style={{ opacity: 0 }}>
            {heroSubtitle || "A dedicated design space where every material we carry is on display: cabinetry, stone, tile, and hardware. All under one roof so you can see and touch your choices before you commit."}
          </p>
        </div>
      </section>

      {cmsLanding ? (
        <SanityLandingContent bodyText={cmsLanding.bodyText} features={cmsLanding.features} />
      ) : null}

      {/* About */}
      <section style={{ background: "var(--bg)", padding: "clamp(80px, 10vw, 128px) var(--pad)", borderBottom: "1px solid var(--gold-border)" }}>
        <div ref={aboutRef} className="showroom-about-grid" style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
          <div>
            <div className="section-eyebrow-row a-item" style={{ opacity: 0 }}>
              <div className="section-rule" />
              <span className="eyebrow">About the Space</span>
            </div>
            <h2 className="a-item" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 500, lineHeight: 1.08, marginBottom: "24px", opacity: 0 }}>
              Design, Supply &amp;<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>All Under One Roof.</em>
            </h2>
            <p className="a-item" style={{ color: "var(--text-dim)", fontSize: "17px", lineHeight: 1.8, fontWeight: 300, margin: "0 0 20px", opacity: 0 }}>
              Heritage Design Center is a kitchen and bath design showroom located at 8695 Martin Way E in Lacey, Washington. We built this space specifically to give homeowners and builders a place where design decisions feel easy, because everything they need is right in front of them.
            </p>
            <p className="a-item" style={{ color: "var(--text-dim)", fontSize: "17px", lineHeight: 1.8, fontWeight: 300, margin: "0 0 36px", opacity: 0 }}>
              From the moment you walk in, you&apos;re surrounded by real material samples: full cabinet displays, stone slabs, tile walls, and hardware in every finish. Our designers are on-site to walk you through the options and help you build a cohesive vision for your project.
            </p>
            <div className="a-item" style={{ opacity: 0 }}>
              <a className="btn btn-solid" href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                Book an Appointment
              </a>
            </div>
          </div>

          <div>
            <div className="a-item" style={{ opacity: 0 }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--gold-border)" }}>
                {[
                  { label: "Cabinetry", desc: "Full-size cabinet displays in multiple styles and finishes", href: "/collections#cabinetry" },
                  { label: "Countertops", desc: "Stone slabs, quartz samples, and butcher block swatches", href: "/collections#countertops" },
                  { label: "Tile & Stone", desc: "Backsplash, floor, and wall tile across every category", href: "/collections#tile" },
                  { label: "Fixtures & Hardware", desc: "Faucets, pulls, and knobs in every available finish", href: "/collections#hardware" },
                  { label: "Design Consultation", desc: "Sit with a designer and map out your entire project", href: "/process" },
                ].map(({ label, desc, href }, i) => (
                  <li key={label} style={{
                    borderBottom: i < 4 ? "1px solid var(--gold-border)" : "none",
                  }}>
                    <Link href={href} style={{
                      display: "grid",
                      gridTemplateColumns: "28px 1fr",
                      gap: "16px",
                      alignItems: "start",
                      padding: "24px 28px",
                      textDecoration: "none",
                      color: "inherit"
                    }} className="showroom-list-link">
                      <span style={{ color: "var(--gold)", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "18px", paddingTop: "2px" }}>✓</span>
                      <div>
                        <strong style={{ display: "block", fontSize: "14px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text)", fontWeight: 500, marginBottom: "6px", transition: "color 0.25s ease" }} className="showroom-list-label">{label}</strong>
                        <span style={{ color: "var(--text-dim)", fontSize: "15px", fontWeight: 300, lineHeight: 1.6 }}>{desc}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Photo & Video placeholders */}
      <section style={{ background: "var(--bg-surface)", padding: "clamp(80px, 10vw, 128px) var(--pad)", borderBottom: "1px solid var(--gold-border)" }}>
        <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
          <div className="section-eyebrow-row">
            <div className="section-rule" />
            <span className="eyebrow">Inside the Showroom</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 500, marginBottom: "12px" }}>
            A Space Built for{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>Discovery.</em>
          </h2>
          <p style={{ color: "var(--text-dim)", fontSize: "17px", lineHeight: 1.75, fontWeight: 300, maxWidth: "480px", marginBottom: "0" }}>
            Explore a preview of our real showroom spaces below, then visit in person for the full material experience.
          </p>

          {/* Photo grid */}
          <div className="showroom-photo-grid" ref={photosRef}>
            {photoSlots.map(({ id, label, wide, src, alt }) => (
              <div key={id} className={`showroom-photo-slot${wide ? " wide" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt} loading="lazy" className="showroom-photo-img" />
                <span className="slot-label">{label}</span>
              </div>
            ))}
          </div>

          {/* Video placeholder */}
          <div className="showroom-video-slot">
            <div className="play-ring">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="eyebrow">Showroom Tour · Video Coming Soon</span>
          </div>
        </div>
      </section>

      {/* Info: Address, Hours, Contact */}
      <section style={{ background: "var(--bg)", padding: "clamp(80px, 10vw, 128px) var(--pad)", borderBottom: "1px solid var(--gold-border)" }}>
        <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
          <div className="section-eyebrow-row">
            <div className="section-rule" />
            <span className="eyebrow">Find Us</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 500, marginBottom: "48px" }}>
            Visit Us <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>in Lacey.</em>
          </h2>

          <div className="showroom-info-grid" ref={infoRef}>
            <div className="showroom-info-item">
              <span className="si-label">Address</span>
              <p>
                <a href="https://maps.google.com/?q=8695+Martin+Way+E+Lacey+WA" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit", borderBottom: "none" }}>
                  8695 Martin Way E #101<br />
                  Lacey, WA 98516
                </a>
                <br /><br />
                <a href="https://maps.google.com/?q=8695+Martin+Way+E+Lacey+WA" target="_blank" rel="noopener noreferrer">
                  Get Directions ↗
                </a>
              </p>
            </div>
            <div className="showroom-info-item">
              <span className="si-label">Hours</span>
              <p>
                Mon – Fri: 9:00am – 5:30pm<br />
                Saturday: By appointment<br />
                Sunday: Closed
              </p>
            </div>
            <div className="showroom-info-item">
              <span className="si-label">Contact</span>
              <p>
                <a href="tel:3605573441">(360) 557-3441</a><br /><br />
                <a href="mailto:showroom@heritagedesignctr.com">
                  showroom@heritagedesignctr.com
                </a>
              </p>
            </div>
          </div>

          {/* Map */}
          <div style={{ marginTop: "48px", position: "relative", overflow: "hidden", border: "1px solid var(--gold-border)", aspectRatio: "21/7" }}>
            <iframe
              title="Heritage Design Center – 8695 Martin Way E, Lacey, WA"
              src="https://www.google.com/maps?q=8695+Martin+Way+E+STE+101,+Lacey,+WA+98516&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, filter: "grayscale(35%) contrast(1.02) brightness(0.88)" }}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta-section">
        <div className="page-cta-watermark" aria-hidden="true">Showroom</div>
        <div className="page-cta-content">
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: 20 }}>Ready to Visit?</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.03em", color: "var(--white)", margin: "0 0 28px" }}>
              Book Your<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Free Appointment.</em>
            </h2>
            <p style={{ color: "var(--white-dim)", fontSize: 18, lineHeight: 1.75, fontWeight: 400, maxWidth: 460, margin: 0 }}>
              Schedule a design appointment and come see the showroom. We&apos;ll walk you through every material and start building your vision together.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 220 }}>
            <a className="btn btn-solid pulse-shimmer-btn" href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              Book an Appointment
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
