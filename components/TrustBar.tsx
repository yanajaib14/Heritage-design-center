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
    if (ScrollTrigger.isTouch === 1) {
      gsap.set(el.querySelectorAll(".trust-stat, .trust-quote"), { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trust-quote",
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
      gsap.fromTo(
        el.querySelectorAll(".trust-stat"),
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.13, duration: 0.9, ease: "power3.out", delay: 0.25,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[var(--bg-surface)] border-b border-[var(--gold-border)]">

      {/* Quote */}
      <div className="trust-quote relative overflow-hidden max-w-[var(--max)] mx-auto px-[var(--pad)] pt-18 pb-16 text-center">
        {/* Giant decorative open-quote behind text */}
        <span
          aria-hidden
          className="pointer-events-none select-none absolute -top-4 left-1/2 -translate-x-1/2 font-display text-[180px] leading-none text-[var(--gold)] opacity-[0.07]"
          style={{ fontStyle: "italic" }}
        >
          &ldquo;
        </span>

        {/* Thin gold rule above */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-[var(--gold)] opacity-60" />
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] opacity-60" />
          <div className="h-px w-12 bg-[var(--gold)] opacity-60" />
        </div>

        <p className="relative font-display italic text-2xl md:text-3xl lg:text-[2.6rem] text-[var(--text)] leading-[1.35] max-w-3xl mx-auto">
          Every space tells a story.{" "}
          <em className="not-italic text-[var(--gold-deep)]">We help you write yours.</em>
        </p>
      </div>

      {/* Divider */}
      <div className="max-w-[var(--max)] mx-auto px-[var(--pad)]">
        <div className="h-px bg-[var(--gold-border)]" />
      </div>

      {/* Stats */}
      <div className="max-w-[var(--max)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">

          <div className="trust-stat group relative flex flex-col items-center justify-center py-14 px-10 text-center">
            {/* Expanding gold accent line */}
            <div className="mb-5 h-px w-8 bg-[var(--gold)] transition-all duration-500 ease-out group-hover:w-14" />
            <div className="font-display italic text-[3.5rem] md:text-[4rem] leading-none text-[var(--gold)] mb-3 font-medium tracking-tight">
              35+
            </div>
            <div className="font-body text-[10.5px] tracking-[0.28em] uppercase text-[var(--text-dim)] font-semibold">
              Years Combined Experience
            </div>
            {/* Vertical divider (desktop) */}
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-20 w-px bg-[var(--gold-border)]" />
          </div>

          <div className="trust-stat group relative flex flex-col items-center justify-center py-14 px-10 text-center border-y md:border-y-0 border-[var(--gold-border)]">
            <div className="mb-5 h-px w-8 bg-[var(--gold)] transition-all duration-500 ease-out group-hover:w-14" />
            <div className="font-display italic text-[3.5rem] md:text-[4rem] leading-none text-[var(--gold)] mb-3 font-medium tracking-tight">
              Curated
            </div>
            <div className="font-body text-[10.5px] tracking-[0.28em] uppercase text-[var(--text-dim)] font-semibold">
              Pro-Grade Selection
            </div>
            {/* Vertical divider (desktop) */}
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-20 w-px bg-[var(--gold-border)]" />
          </div>

          <div className="trust-stat group relative flex flex-col items-center justify-center py-14 px-10 text-center">
            <div className="mb-5 h-px w-8 bg-[var(--gold)] transition-all duration-500 ease-out group-hover:w-14" />
            <div className="font-display italic text-[3.5rem] md:text-[4rem] leading-none text-[var(--gold)] mb-3 font-medium tracking-tight">
              100%
            </div>
            <div className="font-body text-[10.5px] tracking-[0.28em] uppercase text-[var(--text-dim)] font-semibold">
              Design-First Approach
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
