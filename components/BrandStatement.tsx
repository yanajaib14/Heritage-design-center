"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words = [
  "Every",
  "space",
  "we",
  "create",
  "carries",
  "the",
  "weight",
  "of",
  "intention",
  "—",
  "where",
  "material",
  "choices",
  "speak",
  "quietly",
  "and",
  "craftsmanship",
  "endures",
  "for",
  "generations.",
];

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const quote = quoteRef.current;
    if (!section || !quote) return;

    // Build the word spans
    quote.innerHTML = words
      .map(
        (w) =>
          `<span class="inline-block opacity-10 mr-[0.22em] last:mr-0" style="will-change:opacity">${w}</span>`
      )
      .join("");

    const ctx = gsap.context(() => {
      const spans = quote.querySelectorAll("span");

      // Each word lights up as it scrolls into view
      spans.forEach((span, i) => {
        gsap.to(span, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: `top+=${i * 22} 65%`,
            end: `top+=${i * 22 + 40} 65%`,
            scrub: 0.8,
          },
        });
      });

      // Gold line
      gsap.fromTo(
        section.querySelector(".brand-line"),
        { width: 0 },
        {
          width: "4rem",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );

      // Label
      gsap.fromTo(
        section.querySelector(".brand-label"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );

      // Attributes
      gsap.fromTo(
        section.querySelectorAll(".brand-attr"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector(".brand-attrs"),
            start: "top 80%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-charcoal py-32 md:py-48 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="brand-line h-[1px] bg-gold" />
          <p className="brand-label text-label text-gold opacity-0">Our Philosophy</p>
        </div>

        <p
          ref={quoteRef}
          className="font-display text-display-md text-warm-white leading-tight max-w-4xl mb-20"
        />

        {/* Attributes */}
        <div className="brand-attrs grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-warm-white/10">
          {[
            { number: "37", suffix: "+", label: "Years in Business" },
            { number: "600", suffix: "+", label: "Projects Completed" },
            { number: "14", suffix: "", label: "National Awards" },
            { number: "100", suffix: "%", label: "Client Satisfaction" },
          ].map(({ number, suffix, label }) => (
            <div key={label} className="brand-attr opacity-0">
              <p className="font-display text-5xl md:text-6xl text-warm-white font-light mb-2">
                {number}
                <span className="text-gold">{suffix}</span>
              </p>
              <p className="text-label text-stone">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
