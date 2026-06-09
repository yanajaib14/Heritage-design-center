"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GET_STARTED_URL = "https://10daykitchens.hbportal.co/public/69936e5e0e854c002ad50a5f";
const TRADE_CONTACT_URL = "https://10daykitchens.hbportal.co/public/69f50cd056cf56fd0dd4c172/1-form";

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const soonRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Parallax bg
    if (ScrollTrigger.isTouch !== 1) {
      gsap.to(bgRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    }

    tl.fromTo(pillRef.current,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.5)
      .fromTo(h1Ref.current,     { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.7)
      .fromTo(subRef.current,    { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.95)
      .fromTo(ctasRef.current,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.1)
      .fromTo(soonRef.current,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.25)
      .fromTo(bottomRef.current?.querySelectorAll(".hero-bottom-item") ?? [],
        { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.7 }, 1.45);

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section className="hero" id="top">
      <div
        ref={bgRef}
        className="hero-bg"
        style={{ backgroundImage: "url('https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/e2edde19-4fb4-4a28-920e-207d0ee8b444/ChatGPT+Image+Apr+2%2C+2026%2C+10_37_53+AM.png?content-type=image%2Fpng')" }}
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
          We design it, we source it, we deliver it. Whether you&apos;re a homeowner with a vision or a builder who needs a trusted design and supply partner, Heritage is where projects come together.
        </p>

        <div ref={ctasRef} className="hero-ctas" style={{ opacity: 0 }}>
          <a className="btn btn-solid" href={GET_STARTED_URL} target="_blank" rel="noopener noreferrer">
            Get Started
          </a>
          <a className="btn btn-ghost" href="tel:3605573441">
            Call Us (360) 557-3441
          </a>
        </div>

        <div ref={soonRef} className="mt-8 flex" style={{ opacity: 0 }}>
          <div className="frosted-pill">
            <span className="dot-live" />
            Now Open · 8695 Martin Way E #101, Lacey WA
          </div>
        </div>
      </div>

      <div ref={bottomRef} className="hero-bottom">
        <div /> {/* Dummy element to keep space-between pushing card to the right */}
        <div className="hero-bottom-item hero-card" style={{ opacity: 0 }}>
          <h4>Builders &amp; Contractors</h4>
          <p className="hero-card-sub">Design and supply support for the modern builder.</p>
          <a className="link-arrow" href={TRADE_CONTACT_URL} target="_blank" rel="noopener noreferrer">
            <span>BECOME A PARTNER WITH US</span>
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
