"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Image reveal from bottom
      tl.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)", scale: 1.15 },
        { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.6, ease: "power4.inOut" }
      );

      // Overlay fade
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      // Tagline
      tl.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      );

      // Headline — split into words
      const headlineEl = headlineRef.current;
      if (headlineEl) {
        const text = headlineEl.textContent || "";
        const words = text.split(" ");
        headlineEl.innerHTML = words
          .map((w) => `<span class="split-word"><span class="split-inner">${w}</span></span>`)
          .join(" ");

        tl.fromTo(
          headlineEl.querySelectorAll(".split-inner"),
          { y: "110%", rotateX: -15 },
          {
            y: "0%",
            rotateX: 0,
            stagger: 0.07,
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.4"
        );
      }

      // Sub text
      tl.fromTo(
        subRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );

      // Scroll indicator
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );

      // Scroll indicator pulse
      const scrollLine = scrollRef.current?.querySelector(".scroll-line");
      if (scrollLine) {
        gsap.to(scrollLine, {
          scaleY: 1.8,
          duration: 1.2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          transformOrigin: "top",
        });
      }

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(imageRef.current, {
            yPercent: self.progress * 20,
          });
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[700px] flex items-end overflow-hidden bg-charcoal"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1800&q=85"
          alt="Luxury kitchen design"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 w-full px-8 md:px-16 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto">
          <p
            ref={taglineRef}
            className="text-label text-gold mb-6 tracking-[0.3em]"
          >
            Est. 1987 · Chicago
          </p>

          <h1
            ref={headlineRef}
            className="text-display-xl text-warm-white mb-6 max-w-4xl"
            style={{ perspective: "800px" }}
          >
            Design That Endures
          </h1>

          <p
            ref={subRef}
            className="text-warm-white/70 text-base md:text-lg max-w-md mb-10 font-light leading-relaxed"
          >
            Premium kitchen and bath design for the discerning homeowner. Where heritage craftsmanship meets contemporary vision.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/kitchens"
              className="inline-flex items-center gap-3 bg-warm-white text-charcoal px-8 py-4 text-label hover:bg-gold hover:text-warm-white transition-all duration-500 magnetic-btn"
            >
              View Our Work
              <span className="text-xs">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-warm-white/40 text-warm-white px-8 py-4 text-label hover:border-warm-white hover:bg-warm-white/10 transition-all duration-500 magnetic-btn"
            >
              Begin Your Project
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 right-10 md:right-16 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-label text-warm-white/50 text-[10px] tracking-[0.3em] -rotate-90 mb-2">
          Scroll
        </span>
        <div className="scroll-line w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
