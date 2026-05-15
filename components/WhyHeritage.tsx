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
          Most showrooms sell materials. We design with them. Whether you&apos;re a homeowner with a vision or a contractor who needs a reliable design and supply partner, Heritage gives you the expertise, the products, and the process to get it done right.
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
