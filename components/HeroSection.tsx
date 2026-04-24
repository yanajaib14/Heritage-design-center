"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/schedule/698386a7bad8ce0037d6fb1c";

const tabContent: Record<string, { title: string; cta: string }> = {
  kitchens:  { title: "Book your free design session", cta: "Start with kitchens" },
  bathrooms: { title: "Design a bath that exhales.", cta: "Start with bathrooms" },
  trade:     { title: "Partner with our trade team.", cta: "Open trade access" },
};

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("kitchens");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Parallax bg
    gsap.to(bgRef.current, {
      yPercent: 25,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });

    tl.fromTo(pillRef.current,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.5)
      .fromTo(h1Ref.current,     { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.7)
      .fromTo(subRef.current,    { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.95)
      .fromTo(ctasRef.current,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.1)
      .fromTo(bottomRef.current?.querySelectorAll(".hero-bottom-item") ?? [],
        { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.7 }, 1.3);

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const switchTab = (key: string) => {
    if (key === activeTab || !titleRef.current || !ctaTextRef.current) return;
    gsap.to([titleRef.current, ctaTextRef.current], {
      opacity: 0, y: -8, duration: 0.18, ease: "power2.in",
      onComplete: () => {
        setActiveTab(key);
        gsap.fromTo([titleRef.current, ctaTextRef.current],
          { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
      },
    });
  };

  return (
    <section className="hero" id="top">
      <div
        ref={bgRef}
        className="hero-bg"
        style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}
        aria-hidden="true"
      />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-inner">
        <div ref={pillRef} style={{ opacity: 0 }}>
          <span className="hero-pill">Based in Lacey, Washington</span>
        </div>

        <h1 ref={h1Ref} style={{ opacity: 0 }}>
          Design, Materials &amp; Showroom<br />
          <em>All Under One Roof.</em>
        </h1>

        <p ref={subRef} className="hero-sub" style={{ opacity: 0 }}>
          Whether you&apos;re a homeowner planning a project or a builder managing one, we provide expert design support and curated materials to move your project forward.
        </p>

        <div ref={ctasRef} className="hero-ctas" style={{ opacity: 0 }}>
          <a className="btn btn-solid" href={SCHEDULE_URL} target="_blank" rel="noopener">
            Get Started
          </a>
          <a className="btn btn-ghost" href="#cabinetry">
            Explore the Showroom ↓
          </a>
        </div>
      </div>

      <div ref={bottomRef} className="hero-bottom">
        <div className="hero-bottom-item frosted-pill" style={{ opacity: 0 }}>
          <span className="dot-live" />
          Showroom Coming Soon! — 8695 Martin Way E #101, Lacey WA
        </div>

        <div className="hero-bottom-item hero-card" style={{ opacity: 0 }}>
          <div className="hero-card-tabs" role="tablist">
            {(["kitchens", "bathrooms", "trade"] as const).map((key) => (
              <button
                key={key}
                role="tab"
                className={activeTab === key ? "active" : ""}
                onClick={() => switchTab(key)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
          <h4 ref={titleRef}>{tabContent[activeTab].title}</h4>
          <a className="link-arrow" href={SCHEDULE_URL} target="_blank" rel="noopener">
            <span ref={ctaTextRef}>{tabContent[activeTab].cta}</span>
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
