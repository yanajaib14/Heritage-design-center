"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
    if (ScrollTrigger.isTouch === 1) {
      return;
    }
    const timer = setTimeout(() => {
      // ── Showcase sections ──────────────────────────────────────────
      document.querySelectorAll(".showcase").forEach((el, i) => {
        const dir = i % 2 === 0 ? -40 : 40;
        gsap.fromTo(
          el.querySelector(".showcase-img"),
          { x: dir, opacity: 0, scale: 1.04 },
          { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true } }
        );
        gsap.fromTo(
          el.querySelectorAll(".showcase-content .eyebrow, .showcase-content h2, .showcase-content p, .pill-row, .link-arrow"),
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: "power3.out", delay: 0.15,
            scrollTrigger: { trigger: el, start: "top 82%", once: true } }
        );
      });

      // ── Why Heritage grid ──────────────────────────────────────────
      const whyItems = document.querySelectorAll(".why-item");
      if (whyItems.length) {
        whyItems.forEach((item, i) => {
          const fromX = i % 2 === 0 ? -20 : 20;
          gsap.fromTo(
            item,
            { x: fromX, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 82%", once: true } }
          );
        });
      }

      // ── Brand Statement / Marquee ──────────────────────────────────
      gsap.fromTo(
        ".marquee-section .eyebrow",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".marquee-section", start: "top 88%", once: true } }
      );

      // ── Process timeline (homepage) ────────────────────────────────
      document.querySelectorAll(".process-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
            scrollTrigger: { trigger: ".process-timeline", start: "top 80%", once: true } }
        );
      });

      // ── Visit section ─────────────────────────────────────────────
      gsap.fromTo(
        ".visit h2, .visit-details",
        { x: -32, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".visit", start: "top 80%", once: true } }
      );
      gsap.fromTo(
        ".visit-map",
        { x: 32, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".visit", start: "top 80%", once: true } }
      );

      // ── CTA section ───────────────────────────────────────────────
      gsap.fromTo(
        ".cta-eyebrow, .cta-headline, .cta-sub, .cta-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".lc-section", start: "top 80%", once: true } }
      );

    }, 400);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
