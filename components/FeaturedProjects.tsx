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
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
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
      <div className="fp-inner">
        <div className="fp-head">
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: "16px" }}>Our Work</span>
            <h2>
              Projects We&apos;re{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>Proud Of.</em>
            </h2>
          </div>
          <Link href="/gallery" className="link-arrow" style={{ whiteSpace: "nowrap" }}>
            View All Projects <span className="arrow">→</span>
          </Link>
        </div>

        <div className="fp-grid">
          {projects.map(({ src, title, cat }) => (
            <Link key={title} href="/gallery" className="fp-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={title} loading="lazy" className="fp-card-img" />
              <div className="fp-card-overlay" />
              <div className="fp-card-info">
                <span className="fp-cat">{cat}</span>
                <p className="fp-title">{title}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="fp-cta">
          <p style={{ color: "var(--white-dim)", fontSize: "17px", fontWeight: 300, margin: "0 0 24px" }}>
            Ready to start your own project?
          </p>
          <a className="btn btn-solid" href={SCHEDULE_URL} target="_blank" rel="noopener">
            Book a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
