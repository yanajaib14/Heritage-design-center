"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { cls: "mat-a", src: "https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/b662f8dd-f7f8-490d-8cce-bbb2eefbc8b8/whitendale.webp", tag: "Quartz · MSI", alt: "Quartz slab" },
  { cls: "mat-b", src: "https://showplacecabinetry.com/wp-content/uploads/2025/12/New-England-Transitional-with-Beachy-Island-20.jpg", tag: "Door · Showplace", alt: "Cabinet door" },
  { cls: "mat-c", src: "https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/74c2935e-ca5e-46b2-af5f-408e8b5c2837/43.png?content-type=image%2Fpng", tag: "Hardware · Top Knobs", alt: "Hardware" },
  { cls: "mat-d", src: "https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/5cbd15c4-dad8-4add-9312-4991168d9b42/Screenshot+2026-03-16+161014.png?format=500w", tag: "Zellige", alt: "Zellige tile" },
  { cls: "mat-e", src: "https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/935a950b-c2d5-4a2f-b112-5a025057f946/image-asset.jpeg", tag: "Marble · MSI", alt: "Marble" },
];

export default function MaterialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector(".materials-head"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" } }
      );
      el.querySelectorAll(".mat-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el.querySelector(".materials-collage"), start: "top 80%" },
            delay: i * 0.1 }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="materials" id="materials" ref={sectionRef}>
      <div className="materials-inner">
        <div className="materials-head">
          <span className="eyebrow">The Materials Library</span>
          <h2>An Archive <em>You Can Touch.</em></h2>
          <p>
            Stone slabs, cabinet doors, tile samples, and metal finishes — laid out together, the way they&apos;ll actually live in your space. No guesswork, no catalog browsing.
          </p>
        </div>
        <div className="materials-collage">
          {cards.map(({ cls, src, tag, alt }) => (
            <div key={cls} className={`mat-card ${cls}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} loading="lazy" />
              <span className="tag">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
