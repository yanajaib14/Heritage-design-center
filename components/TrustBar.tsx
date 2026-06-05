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
        el.querySelectorAll(".trust-stat, .trust-quote"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-[var(--bg)] border-b border-[var(--gold-border)]">
      <div className="max-w-[var(--max)] mx-auto px-[var(--pad)]">
        
        {/* Center quote */}
        <div className="trust-quote text-center font-display italic text-xl md:text-2xl lg:text-3xl text-[var(--text)] mb-10 leading-relaxed max-w-2xl mx-auto">
          &ldquo;Every space tells a story. We help you write yours.&rdquo;
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[var(--gold-border)] bg-[var(--bg-surface)] shadow-sm rounded-none overflow-hidden max-w-3xl mx-auto">
          
          <div className="trust-stat text-center flex flex-col items-center justify-center p-6 md:p-8 hover:bg-[rgba(201,168,76,0.02)] transition-colors duration-300">
            <div className="font-display italic text-3xl md:text-4xl lg:text-5xl text-[var(--gold)] mb-2.5 leading-none font-medium">
              35+
            </div>
            <div className="text-[var(--text-dim)] font-body text-[13px] tracking-[0.2em] uppercase font-medium">
              Years Combined Experience
            </div>
          </div>

          <div className="trust-stat text-center flex flex-col items-center justify-center p-6 md:p-8 border-y md:border-y-0 md:border-x border-[var(--gold-border)] hover:bg-[rgba(201,168,76,0.02)] transition-colors duration-300">
            <div className="font-display italic text-3xl md:text-4xl lg:text-5xl text-[var(--gold)] mb-2.5 leading-none font-medium">
              Curated
            </div>
            <div className="text-[var(--text-dim)] font-body text-[13px] tracking-[0.2em] uppercase font-medium">
              Pro-Grade Selection
            </div>
          </div>

          <div className="trust-stat text-center flex flex-col items-center justify-center p-6 md:p-8 hover:bg-[rgba(201,168,76,0.02)] transition-colors duration-300">
            <div className="font-display italic text-3xl md:text-4xl lg:text-5xl text-[var(--gold)] mb-2.5 leading-none font-medium">
              100%
            </div>
            <div className="text-[var(--text-dim)] font-body text-[13px] tracking-[0.2em] uppercase font-medium">
              Design-First Approach
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
