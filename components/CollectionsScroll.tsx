"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE = "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";

const cards = [
  {
    category: "Cabinetry",
    description: "From stock to fully custom: plywood construction, soft-close hardware, and hundreds of door styles.",
    image: "https://showplacecabinetry.com/wp-content/uploads/2025/12/New-England-Transitional-with-Beachy-Island-20.jpg",
    bg: "#1c1812",
    light: true,
    href: "/collections",
  },
  {
    category: "Countertops",
    description: "Quartz, marble, quartzite, granite, and butcher block from the industry's most trusted names.",
    image: "https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/b662f8dd-f7f8-490d-8cce-bbb2eefbc8b8/whitendale.webp",
    bg: "#f0ebe3",
    light: false,
    href: "/collections",
  },
  {
    category: "Tile & Stone",
    description: "Floor, wall, backsplash, and shower tile in every style from classic subway to bold statement.",
    image: "/tile-blue.jpg.png",
    bg: "#0d1a2e",
    light: true,
    href: "/collections",
  },
  {
    category: "Bath Collection",
    description: "Vanities, tubs, showers, and fixtures for a complete bathroom renovation.",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
    bg: "#2c1f16",
    light: true,
    href: "/collections",
  },
  {
    category: "Hardware & Fixtures",
    description: "Pulls, knobs, faucets, and lighting. The finishing details that define the design.",
    image: "/hardware.jpg.jpg",
    bg: "#2a1f14",
    light: true,
    href: "/collections",
  },
  {
    category: "Design Services",
    description: "Expert guidance from concept to installation. Our designers handle every detail.",
    image: "/design.jpn.png",
    bg: "#1a1f18",
    light: true,
    href: "/showroom",
  },
];

// To use real brand logos:
// 1. Save each brand's logo image to /public/assets/brands/ (e.g. msi.png, cambria.png)
// 2. Set the logo path below (e.g. "/assets/brands/msi.png")
// 3. Leave logo as null for brands where you don't have a file — they'll show as text
const brands: { label: string; logo: string | null }[] = [
  { label: "KCD Kitchen Cabinet Distributors", logo: "/kcd.png" },
  { label: "Lectus Cabinetry",                  logo: "/luctus.png" },
  { label: "Merit Cabinetry",                   logo: "/Merit logo.png" },
  { label: "Showplace Cabinetry",               logo: "/showplce logo.jpg" },
  { label: "MSI Surfaces",                      logo: "/MSI logo.png" },
  { label: "Cambria",                           logo: "/CAMBRIA logo.png" },
  { label: "Caesarstone",                       logo: "/CAESARSTONE logo.png" },
  { label: "Vicostone",                         logo: "/VICOSTONE logo.png" },
  { label: "Jaaron Wood Countertops",           logo: "/J-Aaron-Logo1.png" },
  { label: "Top Knobs",                         logo: null },
  { label: "Jeffrey Alexander Hardware",        logo: "/JEFFREY ALEXANDER logo.png" },
];

export default function CollectionsScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const didDrag = useRef(false);

  // Mouse drag-to-scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      didDrag.current = false;
      el.style.cursor = "grabbing";
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onMouseLeave = () => { isDragging.current = false; el.style.cursor = "grab"; };
    const onMouseUp = () => { isDragging.current = false; el.style.cursor = "grab"; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.4;
      if (Math.abs(walk) > 5) didDrag.current = true;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mousemove", onMouseMove);
    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // GSAP scroll entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cscroll-head",
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        ".cscroll-card",
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.09, duration: 0.85, ease: "power3.out", delay: 0.18,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[var(--bg)] border-b border-[var(--gold-border)] overflow-hidden">

      {/* Heading row */}
      <div className="cscroll-head max-w-[var(--max)] mx-auto px-[var(--pad)] pt-12 md:pt-20 pb-6 md:pb-10 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <span className="eyebrow block mb-4">What We Offer</span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4.5vw, 54px)",
              fontWeight: 500,
              lineHeight: 1.12,
              color: "var(--text)",
              margin: 0,
              maxWidth: "22ch",
            }}
          >
            Every material, every detail —{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold-deep)", fontWeight: 400 }}>
              all under one roof.
            </em>
          </h2>
        </div>
        <a href="/collections" className="link-arrow shrink-0 hidden md:flex items-center gap-3">
          Explore All Collections <span className="arrow">→</span>
        </a>
      </div>

      <style>{`
        .cscroll-track .cscroll-card {
          width: 100% !important;
          max-width: none !important;
          aspect-ratio: auto !important;
          flex: 1 1 0% !important;
          transition: flex-grow 750ms cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        @media (min-width: 768px) {
          .cscroll-track .cscroll-card {
            height: 450px !important;
          }
          .cscroll-track .cscroll-card:hover {
            flex-grow: 3.5 !important;
          }
        }
      `}</style>

      {/* Scrollable cards transformed to accordion */}
      <div
        ref={trackRef}
        className="cscroll-track flex flex-col md:flex-row gap-3 w-full max-w-[var(--max)] mx-auto px-[var(--pad)] pb-14 select-none"
        style={{ cursor: "default" }}
      >
        {cards.map((card) => (
          <div
            key={card.category}
            className="cscroll-card relative overflow-hidden flex flex-col justify-between group h-[240px] md:h-[450px] rounded-xl border border-[var(--gold-border)]"
            style={{ background: card.bg, cursor: "pointer" }}
            onClick={() => { window.location.href = card.href; }}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") window.location.href = card.href; }}
          >
            {/* Hover: top gold bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--gold)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-20" />

            {/* Shimmer sweep on hover */}
            <div className="cscroll-shimmer" aria-hidden="true" />

            {/* Dark tint on hover — improves text contrast */}
            <div
              className="absolute inset-0 z-[9] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "rgba(0,0,0,0.32)" }}
            />

            {/* Description — hidden by default, revealed on hover */}
            <p
              className="relative z-10 m-0 p-6 pb-0 font-body text-[15px] md:text-[17px] leading-[1.6] max-w-[280px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ color: card.light ? "rgba(250,250,248,0.95)" : "rgba(255,255,255,0.95)", fontWeight: 400 }}
            >
              {card.description}
            </p>

            {/* Photo — full card, two separate fades to avoid midpoint line */}
            <div className="absolute inset-0">
              <img
                src={card.image}
                alt={card.category}
                draggable={false}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-[1.04] transition-all duration-700 ease-out"
              />
              {/* Top fade — covers text area */}
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to bottom, ${card.bg} 0%, transparent 60%)` }}
              />
              {/* Bottom fade — covers label area */}
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${card.bg} 0%, transparent 38%)` }}
              />
            </div>

            {/* Category label */}
            <div className="relative z-10 p-5 pt-0">
              <span
                className="inline-block font-body text-[13px] tracking-[0.22em] uppercase font-bold px-4 py-[10px]"
                style={{ background: "var(--gold)", color: "#1a1208" }}
              >
                {card.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Brand marquee */}
      <div className="border-t border-[var(--gold-border)] overflow-hidden">
        <div className="marquee-section" style={{ padding: "64px 0 72px" }}>

          {/* Decorated heading */}
          <div className="flex items-center justify-center gap-5 mb-3 px-[var(--pad)]">
            <div className="h-px flex-1 max-w-[100px] bg-[var(--gold-border)]" />
            <div className="h-[5px] w-[5px] rounded-full bg-[var(--gold)] opacity-80" />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>Our Trusted Partners</span>
            <div className="h-[5px] w-[5px] rounded-full bg-[var(--gold)] opacity-80" />
            <div className="h-px flex-1 max-w-[100px] bg-[var(--gold-border)]" />
          </div>
          <p className="text-center font-body text-[15px] text-[var(--text-dim)] tracking-[0.06em] mb-12">
            Curated brands we stand behind, on display in our showroom.
          </p>

          <div className="marquee-row" style={{ marginBottom: 0 }}>
            <div className="marquee-track">
              {(() => {
                const logoBrands = brands.filter((b) => b.logo !== null);
                return [...logoBrands, ...logoBrands, ...logoBrands].map((b, i) => (
                  <div key={i} className="brand-logo-wrap">
                    <img src={b.logo!} alt={b.label} className="brand-logo-img" draggable={false} />
                  </div>
                ));
              })()}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
