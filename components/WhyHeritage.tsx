"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    num: "01",
    title: "Design + Sourcing, Together",
    body: "One team specifies the space and pulls every material. No coordination gaps between your designer, your fabricator, and your installer.",
  },
  {
    num: "02",
    title: "A Remodeler's Instinct",
    body: "We came from the build side. Every selection is vetted for durability, lead time, and how it will actually install, not just how it photographs.",
  },
  {
    num: "03",
    title: "Contractor-Grade, Homeowner-Friendly",
    body: "Trade pricing depth and homeowner-facing warmth. The same showroom serves the builder spec'ing forty units and the couple designing one forever kitchen.",
  },
  {
    num: "04",
    title: "Built for Builders & Contractors",
    body: "We handle design and supply so you can stay focused on what you do best, building. Bring your clients to the showroom and we take it from specification to delivery.",
  },
];

export default function WhyHeritage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (ScrollTrigger.isTouch === 1) {
      gsap.set(el.querySelectorAll(".why-head, .why-item"), { opacity: 1, y: 0, x: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector(".why-head"),
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el.querySelector(".why-head"), start: "top 80%", once: true } }
      );
      gsap.fromTo(
        el.querySelectorAll(".why-item"),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el.querySelector(".why-item"), start: "top 82%", once: true } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="why border-t border-[var(--gold-border)]" id="why" ref={sectionRef}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Column: Sticky Head Info */}
        <div className="lg:col-span-5 why-head lg:sticky lg:top-[140px] mb-0">
          <span className="eyebrow block mb-4">Why Heritage</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-[var(--text)] leading-tight mb-6">
            Not a Cabinet Dealer.<br />
            <span className="italic text-[var(--gold)] font-light font-serif">A Design House.</span>
          </h2>
          <p className="text-[var(--text-dim)] text-base md:text-lg font-light leading-relaxed max-w-sm">
            Most showrooms sell materials. We design with them. Whether you&apos;re a homeowner with a vision or a contractor who needs a reliable design and supply partner, Heritage gives you the expertise, the products, and the process to get it done right.
          </p>
        </div>

        {/* Right Column: List of items */}
        <div className="lg:col-span-7 flex flex-col gap-2">
          {items.map(({ num, title, body }) => (
            <div
              key={num}
              className="why-item border-b border-[var(--gold-border)] py-8 md:py-10 flex gap-6 md:gap-8 items-start hover:translate-x-2 transition-transform duration-300 ease-out"
              style={{ display: "flex", borderBottom: "1px solid var(--gold-border)" }}
            >
              <span className="font-display italic text-2xl md:text-3xl text-[var(--gold)] font-medium leading-none shrink-0">
                {num}
              </span>
              <div className="flex-1">
                <h3 className="font-display text-lg md:text-xl text-[var(--text)] mb-3 font-semibold">
                  {title}
                </h3>
                <p className="text-[var(--text-dim)] font-light text-sm md:text-base leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
