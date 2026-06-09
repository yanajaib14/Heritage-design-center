"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseProps {
  reverse?: boolean;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  pills?: string[];
  brands?: { label: string; href: string }[];
  cta: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  id?: string;
}

export default function Showcase({
  reverse, eyebrow, title, body, pills, brands: brandList, cta, ctaHref, image, imageAlt, id,
}: ShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (ScrollTrigger.isTouch === 1) {
      gsap.set(el.querySelectorAll(".showcase-img, .showcase-content, .showcase-content .eyebrow, .showcase-content h2, .showcase-content p, .showcase-content .pill-row, .showcase-content .link-arrow"), { opacity: 1, y: 0, clipPath: "none", scale: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      const imgWrap = el.querySelector(".showcase-img");
      const content = el.querySelector(".showcase-content");
      if (imgWrap) {
        gsap.fromTo(imgWrap,
          { clipPath: "inset(100% 0 0 0)", scale: 1.08 },
          { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.3, ease: "power4.inOut",
            scrollTrigger: { trigger: el, start: "top 78%", once: true } }
        );
      }
      if (content) {
        gsap.fromTo(content.querySelectorAll(".eyebrow, h2, p, .pill-row, .link-arrow"),
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 78%", once: true }, delay: 0.2 }
        );
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`showcase${reverse ? " reverse" : ""}`} id={id} ref={sectionRef}>
      <div className="showcase-grid">
        <div className="showcase-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt} loading="lazy" />
        </div>
        <div className="showcase-content">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{body}</p>
          {pills && (
            <div className="pill-row">
              {pills.map((p) => <span key={p} className="pill">{p}</span>)}
            </div>
          )}
          {brandList && (
            <div className="pill-row brands">
              {brandList.map((b) => (
                <a key={b.label} className="pill brand" href={b.href} target="_blank" rel="noopener noreferrer">
                  {b.label}
                </a>
              ))}
            </div>
          )}
          <a className="link-arrow" href={ctaHref} target="_blank" rel="noopener noreferrer">
            {cta} <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
