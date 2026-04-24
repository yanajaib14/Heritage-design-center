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
    body: "We came from the build side. Every selection is vetted for durability, lead time, and how it will actually install — not just how it photographs.",
  },
  {
    num: "03",
    title: "Contractor-Grade, Homeowner-Friendly",
    body: "Trade pricing depth and homeowner-facing warmth. The same showroom serves the builder spec'ing forty units and the couple designing one forever kitchen.",
  },
  {
    num: "04",
    title: "The 10 Day Kitchens Advantage",
    body: "Installation through our sister company means ten-business-day kitchen turnarounds — premium design at a pace no one else in the region can match.",
  },
];

export default function WhyHeritage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector(".why-head"),
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el.querySelector(".why-head"), start: "top 80%" } }
      );
      el.querySelectorAll(".why-item").forEach((item, i) => {
        const fromX = i % 2 === 0 ? -20 : 20;
        gsap.fromTo(item,
          { x: fromX, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 82%" } }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="why" id="why" ref={sectionRef}>
      <div className="why-head">
        <span className="eyebrow">Why Heritage</span>
        <h2>Not a Cabinet Dealer. <em>A Design House.</em></h2>
        <p>
          Most showrooms sell materials. We design with them. The combination of an installation team, a curated material library, and designers who work across both is rare in the South Sound — and it&apos;s the reason projects finish on time and look the way they were promised.
        </p>
      </div>
      <div className="why-grid">
        {items.map(({ num, title, body }) => (
          <div key={num} className="why-item">
            <div className="why-num">{num}</div>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
