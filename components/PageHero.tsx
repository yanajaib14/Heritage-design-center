"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PageHeroProps {
  label: string;
  title: string;
  titleItalic?: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
}

export default function PageHero({
  label,
  title,
  titleItalic,
  subtitle,
  image,
  imageAlt,
}: PageHeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        hero.querySelector(".page-hero-image"),
        { clipPath: "inset(100% 0 0 0)", scale: 1.12 },
        { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.4, ease: "power4.inOut" }
      );

      tl.fromTo(
        hero.querySelectorAll(".page-hero-item"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
        "-=0.6"
      );
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-24 pb-0 overflow-hidden bg-charcoal">
      {/* Text Content */}
      <div className="relative z-10 px-8 md:px-16 pt-16 pb-12 max-w-7xl mx-auto">
        <p className="page-hero-item text-label text-gold mb-4 opacity-0">{label}</p>
        <h1 className="page-hero-item font-display text-display-lg text-warm-white mb-5 opacity-0">
          {title}
          {titleItalic && (
            <>
              <br />
              <em>{titleItalic}</em>
            </>
          )}
        </h1>
        {subtitle && (
          <p className="page-hero-item text-stone max-w-md leading-relaxed opacity-0">
            {subtitle}
          </p>
        )}
      </div>

      {/* Full-width image */}
      <div className="page-hero-image overflow-hidden h-[50vh] md:h-[60vh]">
        <Image
          src={image}
          alt={imageAlt}
          width={1800}
          height={900}
          priority
          className="w-full h-full object-cover object-center"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
