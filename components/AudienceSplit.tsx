"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/schedule/698386a7bad8ce0037d6fb1c";

export default function AudienceSplit() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll(".audience-col").forEach((col, i) => {
        gsap.fromTo(col,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 78%" }, delay: i * 0.15 }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="audience" ref={sectionRef}>
      <div className="audience-col ac-home">
        <div className="num">01</div>
        <h2>Homeowners &amp; DIY Renovators</h2>
        <p>
          Whether you&apos;re tackling it yourself or working with a contractor, we handle every design decision and source every material — so your project starts with a clear plan and the right products in hand.
        </p>
        <a className="link-arrow" href={SCHEDULE_URL} target="_blank" rel="noopener">
          Book a Free Consultation <span className="arrow">→</span>
        </a>
      </div>
      <div className="divider" />
      <div className="audience-col ac-trade">
        <div className="num">02</div>
        <h2>Builders &amp; Contractors</h2>
        <p>
          Bring your clients to our showroom. We handle the design, specification, and material supply — you stay focused on the build. Trade pricing, reliable lead times, and a dedicated team that speaks your language.
        </p>
        <a className="link-arrow" href={SCHEDULE_URL} target="_blank" rel="noopener">
          Set Up a Trade Account <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}
