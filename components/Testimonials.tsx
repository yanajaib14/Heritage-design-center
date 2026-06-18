"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Heritage walked us through every material decision for our kitchen remodel. From cabinetry selection to the final countertop slab, every choice felt deliberate. The result is exactly what we envisioned.",
    author: "Sarah & Mark T.",
    project: "Kitchen Remodel · Lacey, WA",
  },
  {
    quote: "We were completely overwhelmed before we visited the showroom. Within a single appointment our designer had a complete layout and material plan ready. The whole process was surprisingly smooth.",
    author: "Jennifer R.",
    project: "Master Bath Renovation · Olympia, WA",
  },
  {
    quote: "As a contractor I bring all my clients to Heritage. The team knows their product lines inside and out, turnaround is fast, and the quality never disappoints. My go-to supplier for every project.",
    author: "David P.",
    project: "General Contractor · Thurston County",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (ScrollTrigger.isTouch === 1) {
      gsap.set(section.querySelectorAll(".testi-reveal"), { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".testi-reveal"),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const switchTo = (index: number) => {
    if (index === active) return;
    const q = quoteRef.current;
    const a = authorRef.current;
    if (!q || !a) return;
    gsap.to([q, a], {
      y: -14, opacity: 0, duration: 0.28, ease: "power2.in",
      onComplete: () => {
        setActive(index);
        gsap.fromTo(
          [q, a],
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.48, ease: "power3.out" }
        );
      },
    });
  };

  const t = testimonials[active];

  return (
    <section ref={sectionRef} className="testi-section">
      <style>{`
        .testi-section {
          padding: clamp(64px, 8vw, 96px) var(--pad) !important;
        }
        .testi-quote {
          font-size: clamp(18px, 2.2vw, 24px) !important;
          margin-bottom: 24px !important;
        }
        .testi-mark {
          font-size: clamp(48px, 6vw, 72px) !important;
          margin-bottom: 4px !important;
        }
        .testi-grid {
          gap: clamp(32px, 5vw, 64px) !important;
        }
      `}</style>

      <div className="testi-inner">
        <div className="testi-grid">

          {/* Left: header + navigation */}
          <div>
            <div className="section-eyebrow-row testi-reveal" style={{ opacity: 0 }}>
              <div className="section-rule" />
              <span className="eyebrow">Client Stories</span>
            </div>
            <h2
              className="testi-reveal"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px, 3.5vw, 40px)",
                fontWeight: 500,
                lineHeight: 1.08,
                marginBottom: "30px",
                opacity: 0,
              }}
            >
              Trusted by<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>Our Clients.</em>
            </h2>
            <div className="testi-dots testi-reveal" style={{ opacity: 0 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => switchTo(i)}
                  className={`testi-dot${i === active ? " active" : ""}`}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>
            <p
              className="testi-reveal"
              style={{
                marginTop: "28px",
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-faint)",
                fontWeight: 300,
                opacity: 0,
              }}
            >
              {active + 1} &nbsp;/&nbsp; {testimonials.length}
            </p>
          </div>

          {/* Right: quote */}
          <div className="testi-right">
            <div className="testi-mark testi-reveal" style={{ opacity: 0 }}>&ldquo;</div>
            <blockquote ref={quoteRef} className="testi-quote">
              {t.quote}
            </blockquote>
            <div ref={authorRef} className="testi-author-wrap">
              <p className="testi-author">{t.author}</p>
              <p className="testi-project">{t.project}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
