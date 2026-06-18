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
          border-radius: 10px !important;
          overflow: hidden !important;
        }
      `}</style>

      <div className="fp-inner">
        <div className="fp-grid grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-6xl mx-auto" style={{ display: "grid", marginBottom: "64px" }}>
          
          {/* Card 1: Top Left */}
          <Link 
            href="/gallery" 
            className="fp-card relative group md:col-span-2 md:row-span-1 h-[250px] md:h-[320px] rounded-lg overflow-hidden border border-[var(--gold-border)] bg-black"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={projects[0].src} alt={projects[0].title} className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500 opacity-70 group-hover:opacity-85" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="inline-block px-2 py-0.5 mb-1.5 text-[9px] tracking-[0.2em] uppercase text-[var(--gold)] border border-[var(--gold-border)] bg-black/50 backdrop-blur-sm">{projects[0].cat}</span>
              <h3 className="font-display text-base md:text-lg text-white font-medium">{projects[0].title}</h3>
            </div>
            {/* Expand Icon */}
            <div className="absolute bottom-5 right-5 w-9 h-9 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10">
              <svg className="w-4 h-4 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" /></svg>
            </div>
          </Link>

          {/* Heading Block: Top Right */}
          <div className="md:col-span-2 md:row-span-1 flex flex-col justify-center items-start text-left p-6 md:p-8">
            <span className="eyebrow mb-2">Our Work</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 500, lineHeight: 1.15, margin: 0 }}>
              Projects We&apos;re <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>Proud Of.</em>
            </h2>
            <p className="text-sm text-[var(--text-dim)] mt-4 max-w-md leading-relaxed">
              A visual collection of our most recent works — each piece crafted with intention, dedication, and timeless style.
            </p>
          </div>

          {/* Card 2: Bottom Left */}
          <Link 
            href="/gallery" 
            className="fp-card relative group md:col-span-1 md:row-span-2 h-[300px] md:h-auto rounded-lg overflow-hidden border border-[var(--gold-border)] bg-black"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={projects[1].src} alt={projects[1].title} className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500 opacity-70 group-hover:opacity-85" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="inline-block px-2 py-0.5 mb-1.5 text-[9px] tracking-[0.2em] uppercase text-[var(--gold)] border border-[var(--gold-border)] bg-black/50 backdrop-blur-sm">{projects[1].cat}</span>
              <h3 className="font-display text-base md:text-lg text-white font-medium">{projects[1].title}</h3>
            </div>
            <div className="absolute bottom-5 right-5 w-9 h-9 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10">
              <svg className="w-4 h-4 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" /></svg>
            </div>
          </Link>

          {/* Card 3: Bottom Middle-Left */}
          <Link 
            href="/gallery" 
            className="fp-card relative group md:col-span-1 md:row-span-2 h-[300px] md:h-auto rounded-lg overflow-hidden border border-[var(--gold-border)] bg-black"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={projects[2].src} alt={projects[2].title} className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500 opacity-70 group-hover:opacity-85" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="inline-block px-2 py-0.5 mb-1.5 text-[9px] tracking-[0.2em] uppercase text-[var(--gold)] border border-[var(--gold-border)] bg-black/50 backdrop-blur-sm">{projects[2].cat}</span>
              <h3 className="font-display text-base md:text-lg text-white font-medium">{projects[2].title}</h3>
            </div>
            <div className="absolute bottom-5 right-5 w-9 h-9 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10">
              <svg className="w-4 h-4 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" /></svg>
            </div>
          </Link>

          {/* Card 4: Middle Right */}
          <Link 
            href="/gallery" 
            className="fp-card relative group md:col-span-2 md:row-span-1 h-[230px] md:h-[240px] rounded-lg overflow-hidden border border-[var(--gold-border)] bg-black"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={projects[3].src} alt={projects[3].title} className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500 opacity-70 group-hover:opacity-85" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="inline-block px-2 py-0.5 mb-1.5 text-[9px] tracking-[0.2em] uppercase text-[var(--gold)] border border-[var(--gold-border)] bg-black/50 backdrop-blur-sm">{projects[3].cat}</span>
              <h3 className="font-display text-base md:text-lg text-white font-medium">{projects[3].title}</h3>
            </div>
            <div className="absolute bottom-5 right-5 w-9 h-9 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10">
              <svg className="w-4 h-4 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" /></svg>
            </div>
          </Link>

          {/* Card 5: Bottom Middle-Right */}
          <Link 
            href="/gallery" 
            className="fp-card relative group md:col-span-1 md:row-span-1 h-[170px] md:h-[180px] rounded-lg overflow-hidden border border-[var(--gold-border)] bg-black"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={projects[4].src} alt={projects[4].title} className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500 opacity-70 group-hover:opacity-85" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="inline-block px-2 py-0.5 mb-1.5 text-[9px] tracking-[0.2em] uppercase text-[var(--gold)] border border-[var(--gold-border)] bg-black/50 backdrop-blur-sm">{projects[4].cat}</span>
              <h3 className="font-display text-[13px] md:text-[15px] text-white font-medium">{projects[4].title}</h3>
            </div>
            <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10">
              <svg className="w-3.5 h-3.5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" /></svg>
            </div>
          </Link>

          {/* Card 6: Bottom Right */}
          <Link 
            href="/gallery" 
            className="fp-card relative group md:col-span-1 md:row-span-1 h-[170px] md:h-[180px] rounded-lg overflow-hidden border border-[var(--gold-border)] bg-black"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={projects[5].src} alt={projects[5].title} className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500 opacity-70 group-hover:opacity-85" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="inline-block px-2 py-0.5 mb-1.5 text-[9px] tracking-[0.2em] uppercase text-[var(--gold)] border border-[var(--gold-border)] bg-black/50 backdrop-blur-sm">{projects[5].cat}</span>
              <h3 className="font-display text-[13px] md:text-[15px] text-white font-medium">{projects[5].title}</h3>
            </div>
            <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10">
              <svg className="w-3.5 h-3.5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" /></svg>
            </div>
          </Link>

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
