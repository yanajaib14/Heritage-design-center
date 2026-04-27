"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01 — Discover",
    title: "Begin with a conversation.",
    body: "We listen first. A design appointment in the showroom to understand how you live, cook, and gather — and what you want the space to feel like.",
  },
  {
    num: "02 — Curate",
    title: "Touch every material.",
    body: "Cabinetry, stone, tile, and hardware — side by side, in the light they will live in. Curated selections narrowed to the pieces that belong together.",
  },
  {
    num: "03 — Design",
    title: "See it before you commit.",
    body: "Layouts, elevations, and full material specifications. Every detail resolved on paper before a single cabinet is ordered.",
  },
  {
    num: "04 — Build",
    title: "Execute without surprises.",
    body: "From final specification to material delivery, every detail is coordinated and documented — so your builder or contractor can execute without surprises.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        el.querySelectorAll(".process-head > *"),
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el.querySelector(".process-head"), start: "top 80%" } }
      );

      // Steps slide + dot fill
      el.querySelectorAll(".process-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 82%" },
            delay: i * 0.07 }
        );
        gsap.to(step.querySelector(".process-dot"), {
          backgroundColor: "var(--gold)",
          boxShadow: "0 0 0 6px rgba(201,168,76,0.08)",
          duration: 0.5,
          scrollTrigger: { trigger: step, start: "top 75%" },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="process" id="process" ref={sectionRef}>
      <div className="process-head">
        <div>
          <span className="eyebrow" style={{ display: "block", marginBottom: "20px" }}>
            The Heritage Experience
          </span>
          <h2>
            From First Visit to{" "}
            <em>Final Detail.</em>
          </h2>
          <p style={{ marginTop: "24px" }}>
            Four chapters, one throughline. Our designers guide every decision — from the first sketch to the last piece of hardware — so your project moves forward with clarity.
          </p>
        </div>
        <div className="process-head-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/561695ba-8683-4348-93fb-4067502ac4e9/Design+Review+Meeting.png?content-type=image%2Fpng"
            alt="Design review meeting"
            loading="lazy"
          />
        </div>
      </div>

      <div className="process-timeline">
        {steps.map((s) => (
          <div className="process-step" key={s.num}>
            <div className="process-dot" />
            <div className="num">{s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
