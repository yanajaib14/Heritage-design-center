"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";

const projects = [
  {
    src: "https://showplacecabinetry.com/wp-content/uploads/2025/12/New-England-Transitional-with-Beachy-Island-20.jpg",
    title: "Transitional Kitchen",
    cat: "Kitchen",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/d7463ac6-a87c-4cd2-877a-304026df15ea/kitchen+with+slab+backsplash.jpg",
    title: "Slab Backsplash Kitchen",
    cat: "Kitchen",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/9e6294ff-bc6d-4a8e-a04d-11ac6bd6aa6c/Dark+Marble+Opulence.png",
    title: "Dark Marble Bath",
    cat: "Bath",
  },
  {
    src: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=85",
    title: "Contemporary Island",
    cat: "Kitchen",
  },
  {
    src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=85",
    title: "Modern Open Kitchen",
    cat: "Kitchen",
  },
  {
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=85",
    title: "Spa Master Bath",
    cat: "Bath",
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (ScrollTrigger.isTouch === 1) {
      gsap.set(el.querySelectorAll(".fp-head > *, .fp-card, .fp-cta > *"), { opacity: 1, y: 0, clipPath: "none", scale: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".fp-head > *"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" } }
      );
      el.querySelectorAll<HTMLElement>(".fp-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(100% 0 0 0)", scale: 1.06 },
          {
            clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.1, ease: "power4.inOut",
            scrollTrigger: { trigger: el.querySelector(".fp-grid"), start: "top 82%" },
            delay: i * 0.12,
          }
        );
      });
      gsap.fromTo(
        el.querySelectorAll(".fp-cta > *"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el.querySelector(".fp-cta"), start: "top 85%" } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="fp-section">
      <style>{`
        .fp-grid .fp-card {
          aspect-ratio: auto !important;
          flex: 1 1 0% !important;
          transition: flex-grow 750ms cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        @media (min-width: 768px) {
          .fp-grid .fp-card:hover {
            flex-grow: 4 !important;
          }
        }
      `}</style>

      <div className="fp-inner">
        <div className="fp-head" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "48px" }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: "12px" }}>Our Work</span>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 48px)", fontWeight: 500, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
            Projects We&apos;re <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>Proud Of.</em>
          </h2>
          <p className="text-sm text-[var(--text-dim)] max-w-lg mx-auto leading-relaxed">
            A visual collection of our most recent works — each piece crafted with intention, dedication, and timeless style.
          </p>
        </div>

        <div className="fp-grid flex flex-col md:flex-row items-center gap-3 w-full max-w-5xl mt-10 mx-auto h-auto md:h-[450px]" style={{ display: "flex", gridTemplateColumns: "none", marginBottom: "64px" }}>
          {projects.map(({ src, title, cat }) => (
            <Link 
              key={title} 
              href="/gallery" 
              className="fp-card relative group w-full h-[240px] md:h-full rounded-xl overflow-hidden border border-[var(--gold-border)] bg-black"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={src} 
                alt={title} 
                className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" 
                draggable={false} 
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent transition-opacity duration-500 opacity-70 group-hover:opacity-90" />
              
              {/* Project Details */}
              <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                <span className="inline-block px-2.5 py-1 mb-2 text-[10px] tracking-[0.2em] uppercase text-[var(--gold)] border border-[var(--gold-border)] bg-black/50 backdrop-blur-sm">
                  {cat}
                </span>
                <h3 className="font-display text-lg md:text-xl text-white font-medium">
                  {title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="fp-cta">
          <p style={{ color: "var(--text-dim)", fontSize: "17px", fontWeight: 400, margin: "0 0 24px" }}>
            Ready to start your own project?
          </p>
          <a className="btn btn-solid pulse-shimmer-btn" href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
            Book a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
