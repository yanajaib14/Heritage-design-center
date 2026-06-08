"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";
const TRADE_URL = "https://10daykitchens.hbportal.co/public/69f50cd056cf56fd0dd4c172/1-form";

export default function AudienceSplit() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (ScrollTrigger.isTouch === 1) {
      gsap.set(el.querySelectorAll(".audience-col"), { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      el.querySelectorAll(".audience-col").forEach((col, i) => {
        gsap.fromTo(col,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 78%" }, delay: i * 0.18,
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="audience" ref={sectionRef}>

      {/* Homeowners */}
      <div className="audience-col ac-home">
        <div className="audience-top-bar" />
        <div className="num">01</div>
        <h2>Homeowners &amp;<br />Renovators</h2>
        <p>
          Whether you&apos;re tackling it yourself or working with a contractor, we handle every design decision and source every material — so your project starts with a clear plan and the right products in hand.
        </p>
        <div className="audience-tags">
          {["Free Consultation", "Design Included", "All Materials Sourced"].map((tag) => (
            <span key={tag} className="audience-tag">{tag}</span>
          ))}
        </div>
        <a className="btn btn-solid audience-btn" href={SCHEDULE_URL} target="_blank" rel="noopener">
          Book a Free Consultation
        </a>
      </div>

      <div className="divider" />

      {/* Builders */}
      <div className="audience-col ac-trade">
        <div className="audience-top-bar" />
        <div className="num">02</div>
        <h2>Builders &amp;<br />Contractors</h2>
        <p>
          Bring your clients to our showroom. We handle the design, specification, and material supply — you stay focused on the build. Trade pricing, reliable lead times, and a team that speaks your language.
        </p>
        <div className="audience-tags">
          {["Trade Pricing", "Fast Lead Times", "Dedicated Rep"].map((tag) => (
            <span key={tag} className="audience-tag">{tag}</span>
          ))}
        </div>
        <a className="btn btn-outline-gold audience-btn" href={TRADE_URL} target="_blank" rel="noopener">
          Partner with Us
        </a>
      </div>

    </section>
  );
}
