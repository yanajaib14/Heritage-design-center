"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TrustBar() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".trust-stat, .trust-quote"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <section className="trust">
        <hr className="rule-gold" />
        <div className="trust-stats">
          <div className="trust-stat">
            <div className="num">35+</div>
            <div className="label">Years Combined Experience</div>
          </div>
          <div className="trust-stat">
            <div className="num" style={{ fontSize: "clamp(28px,3.5vw,40px)" }}>Curated<br/>Selection</div>
            <div className="label">Pro-Grade Materials</div>
          </div>
          <div className="trust-stat">
            <div className="num">100%</div>
            <div className="label">Design-First Approach</div>
          </div>
        </div>
        <div className="trust-quote">Every space tells a story. We help you write yours.</div>
        <hr className="rule-gold" style={{ marginTop: "56px" }} />
      </section>
    </div>
  );
}
