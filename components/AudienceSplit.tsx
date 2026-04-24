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
        <h2>Designing Your Dream Space?</h2>
        <p>
          Imagine the kitchen or bath you&apos;ve always pictured. We&apos;ll help you find every material, every finish, every cabinet that makes it real — with expert design guidance included at no additional charge.
        </p>
        <a className="link-arrow" href={SCHEDULE_URL} target="_blank" rel="noopener">
          Book a Free Consultation <span className="arrow">→</span>
        </a>
      </div>
      <div className="divider" />
      <div className="audience-col ac-trade">
        <div className="num">02</div>
        <h2>Build With a Partner Who Gets It.</h2>
        <p>
          We work the way you work. Trade pricing, reliable lead times, dedicated project support, and the material depth to spec any job from first draft to final install.
        </p>
        <a className="link-arrow" href={SCHEDULE_URL} target="_blank" rel="noopener">
          Apply for Trade Access <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}
