"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollAnimations — global scroll-reveal pass for elements that aren't
 * animated by their own component. Runs once after mount (400 ms delay
 * so all client components have rendered).
 *
 * Uses gsap.context() so cleanup is scoped to only the triggers this
 * component creates — other components' triggers are left untouched.
 */
export default function ScrollAnimations() {
  useEffect(() => {
    if (ScrollTrigger.isTouch === 1) return;

    let ctx: ReturnType<typeof gsap.context>;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {

        // ── Gold horizontal rules — draw in from left ─────────────────
        document.querySelectorAll<HTMLElement>(".section-rule").forEach((rule) => {
          gsap.fromTo(rule,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.9, ease: "power3.out",
              scrollTrigger: { trigger: rule, start: "top 88%", once: true } }
          );
        });

        // ── Eyebrow + heading combos ───────────────────────────────────
        document.querySelectorAll<HTMLElement>(".section-eyebrow-row").forEach((row) => {
          const eyebrow = row.querySelector(".eyebrow");
          if (eyebrow) {
            gsap.fromTo(eyebrow,
              { y: 16, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
                scrollTrigger: { trigger: row, start: "top 88%", once: true } }
            );
          }
        });

        // ── Showcase sections ─────────────────────────────────────────
        document.querySelectorAll<HTMLElement>(".showcase").forEach((el, i) => {
          const dir = i % 2 === 0 ? -40 : 40;
          gsap.fromTo(
            el.querySelector(".showcase-img"),
            { x: dir, opacity: 0, scale: 1.04 },
            { x: 0, opacity: 1, scale: 1, duration: 1.15, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 82%", once: true } }
          );
          gsap.fromTo(
            el.querySelectorAll(".showcase-content .eyebrow, .showcase-content h2, .showcase-content p, .pill-row, .link-arrow"),
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: "power3.out", delay: 0.18,
              scrollTrigger: { trigger: el, start: "top 82%", once: true } }
          );
        });

        // ── Why Heritage grid ─────────────────────────────────────────
        document.querySelectorAll<HTMLElement>(".why-item").forEach((item, i) => {
          gsap.fromTo(item,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 86%", once: true },
              delay: (i % 2) * 0.08,
            }
          );
        });

        // ── Process timeline (homepage) ───────────────────────────────
        document.querySelectorAll<HTMLElement>(".process-step").forEach((step, i) => {
          gsap.fromTo(step,
            { y: 32, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
              scrollTrigger: { trigger: ".process-timeline", start: "top 80%", once: true } }
          );
        });

        // ── Visit / map section ───────────────────────────────────────
        const visit = document.querySelector(".visit");
        if (visit) {
          gsap.fromTo(
            visit.querySelectorAll("h2, .visit-details"),
            { x: -28, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: visit, start: "top 80%", once: true } }
          );
          gsap.fromTo(
            visit.querySelector(".visit-map"),
            { x: 28, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: visit, start: "top 80%", once: true } }
          );
        }

        // ── Brand marquee eyebrow ─────────────────────────────────────
        gsap.fromTo(
          ".marquee-section .eyebrow",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: ".marquee-section", start: "top 88%", once: true } }
        );

        // ── CTA / lead-capture section ────────────────────────────────
        gsap.fromTo(
          ".cta-eyebrow, .cta-headline, .cta-sub, .cta-card",
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.14, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: ".lc-section", start: "top 80%", once: true } }
        );

        // ── Page-level CTA sections (collections, process, showroom…) ─
        document.querySelectorAll<HTMLElement>(".page-cta-section").forEach((section) => {
          gsap.fromTo(
            section.querySelectorAll(".eyebrow, h2, p, .btn"),
            { y: 32, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.12, duration: 0.95, ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 82%", once: true } }
          );
        });

      });
    }, 400);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return null;
}
