"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Heritage transformed our kitchen into the heart of our home. The attention to detail, from the custom millwork to the stone selection, is extraordinary. We cook together every evening now.",
    author: "Catherine & James Mercer",
    project: "Lincoln Park Residence · Kitchen Design",
    year: "2024",
  },
  {
    quote:
      "Working with Heritage was an education in what is possible. Our master bath feels like a private spa — every material was sourced to create something truly singular.",
    author: "Eleanor Whitmore",
    project: "Gold Coast Penthouse · Bath Design",
    year: "2024",
  },
  {
    quote:
      "The team understood our vision immediately and elevated it beyond what we imagined. The project management was flawless. Not a single surprise.",
    author: "Robert & Diane Hartwell",
    project: "Evanston Estate · Full Kitchen & Bath",
    year: "2023",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".testimonial-header"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );

      gsap.fromTo(
        section.querySelector(".testimonial-line"),
        { width: 0 },
        {
          width: "3rem",
          duration: 0.8,
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );

      gsap.fromTo(
        [quoteRef.current, authorRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
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
      y: -15,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActive(index);
        gsap.fromTo(
          [q, a],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out" }
        );
      },
    });
  };

  const t = testimonials[active];

  return (
    <section ref={sectionRef} className="py-28 md:py-40 px-8 md:px-16 bg-warm-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-16 items-start">
          {/* Left */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-4 mb-5">
              <div className="testimonial-line h-[1px] bg-gold" />
              <p className="testimonial-header text-label text-stone opacity-0">Client Stories</p>
            </div>
            <h2 className="testimonial-header font-display text-display-md text-charcoal mb-8 opacity-0">
              Trusted by<br />
              <em>Discerning</em><br />
              Homeowners
            </h2>

            {/* Navigation dots */}
            <div className="flex gap-3 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => switchTo(i)}
                  className={`h-[1px] transition-all duration-500 ease-out-expo ${
                    i === active ? "w-10 bg-gold" : "w-4 bg-light-stone hover:bg-stone"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Quote */}
          <div className="md:col-span-8 md:pl-12 md:border-l md:border-light-stone">
            <div className="font-display text-7xl text-gold/20 leading-none mb-4 select-none">
              "
            </div>
            <blockquote
              ref={quoteRef}
              className="font-display text-2xl md:text-3xl text-charcoal leading-snug mb-10 opacity-0"
            >
              {t.quote}
            </blockquote>

            <div ref={authorRef} className="opacity-0">
              <p className="text-charcoal font-medium text-sm">{t.author}</p>
              <p className="text-stone text-label mt-1">{t.project}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
