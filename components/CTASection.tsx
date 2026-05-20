"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".cta-item"),
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      // Parallax
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const img = imageRef.current?.querySelector("img");
          if (img) gsap.set(img, { yPercent: -15 * self.progress });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-40 px-8 md:px-16 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="cta-item text-label text-stone mb-5 opacity-0">Begin Your Journey</p>
            <h2 className="cta-item font-display text-display-md text-charcoal mb-6 opacity-0">
              Ready to Create<br />
              <em>Something</em><br />
              Extraordinary?
            </h2>
            <p className="cta-item text-stone leading-relaxed max-w-md mb-10 opacity-0">
              Every exceptional space begins with a conversation. Share your vision with us and let Heritage guide you from inspiration through installation.
            </p>
            <div className="cta-item flex flex-col sm:flex-row gap-4 opacity-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-charcoal text-warm-white px-8 py-4 text-label hover:bg-gold hover:text-warm-white transition-all duration-500 magnetic-btn"
              >
                Schedule a Consultation
                <span className="text-xs">→</span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-3 border border-charcoal text-charcoal px-8 py-4 text-label hover:bg-charcoal hover:text-warm-white transition-all duration-500 magnetic-btn"
              >
                Our Story
              </Link>
              <Link
                href="tel:1234567890"
                className="inline-flex items-center justify-center gap-3 bg-gold text-charcoal px-8 py-4 text-label hover:bg-charcoal hover:text-warm-white transition-all duration-500 magnetic-btn"
              >
                Call Us: (123) 456-7890
              </Link>
            </div>

            {/* Small detail */}
            <div className="cta-item mt-12 pt-10 border-t border-light-stone opacity-0">
              <p className="text-label text-stone/60 mb-3">Studio Hours</p>
              <p className="text-stone text-sm">Monday – Friday, 9:00am – 6:00pm</p>
              <p className="text-stone text-sm">Saturday by appointment</p>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative h-[500px] md:h-[600px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=85"
              alt="Heritage Design Center studio"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Award badge */}
            <div className="absolute top-8 right-8 bg-charcoal text-warm-white p-5 text-center">
              <p className="font-display text-3xl text-gold">14</p>
              <p className="text-label text-stone/70 mt-1 text-[10px]">NKBA Awards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
