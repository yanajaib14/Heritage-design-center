"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Kitchen Design",
    description:
      "From concept through installation, we craft kitchens that balance beauty with precision — spaces made for living, made to last.",
    href: "/kitchens",
  },
  {
    number: "02",
    title: "Bath Design",
    description:
      "Sanctuary spaces where every material is considered. Stone, light, and proportion come together in perfect harmony.",
    href: "/baths",
  },
  {
    number: "03",
    title: "Space Planning",
    description:
      "We optimize every square foot, creating spatial flow that feels effortless and purposeful at every turn.",
    href: "/contact",
  },
  {
    number: "04",
    title: "Material Curation",
    description:
      "Access to the world's finest materials — natural stone, custom millwork, bespoke hardware and artisan finishes.",
    href: "/contact",
  },
  {
    number: "05",
    title: "3D Visualization",
    description:
      "Photorealistic renderings that allow you to experience your new space before a single tile is set.",
    href: "/contact",
  },
  {
    number: "06",
    title: "Project Management",
    description:
      "We oversee every detail from contractor coordination to final installation — seamless, on time, impeccable.",
    href: "/contact",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        section.querySelectorAll(".services-header-item"),
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );

      // Gold line
      gsap.fromTo(
        section.querySelector(".services-line"),
        { width: 0 },
        {
          width: "3rem",
          duration: 0.8,
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );

      // Service items stagger
      section.querySelectorAll(".service-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
            },
          }
        );
      });

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
          },
        }
      );

      // Parallax on image
      ScrollTrigger.create({
        trigger: imageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const img = imageRef.current?.querySelector("img");
          if (img) gsap.set(img, { yPercent: -12 * self.progress });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-40 px-8 md:px-16 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-16 md:gap-20">
          {/* Left: Services list */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="services-line h-[1px] bg-gold" />
              <p className="services-header-item text-label text-stone opacity-0">What We Do</p>
            </div>
            <h2 className="services-header-item font-display text-display-md text-charcoal mb-12 opacity-0">
              Full-Service<br />
              <em>Design Studio</em>
            </h2>

            <div className="space-y-0 divide-y divide-light-stone">
              {services.map((service) => (
                <div
                  key={service.number}
                  className="service-item group opacity-0"
                >
                  <Link href={service.href} className="block py-6 hover:pl-3 transition-all duration-300">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-5 items-start">
                        <span className="text-label text-gold/70 mt-1 shrink-0">{service.number}</span>
                        <div>
                          <h3 className="font-display text-xl text-charcoal mb-1 group-hover:text-gold transition-colors duration-300">
                            {service.title}
                          </h3>
                          <p className="text-stone text-sm leading-relaxed max-w-sm">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-stone/40 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1">
                        →
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="md:col-span-6">
            <div
              ref={imageRef}
              className="relative h-[500px] md:h-full min-h-[600px] overflow-hidden sticky top-28"
            >
              <Image
                src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=85"
                alt="Heritage design studio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Floating detail */}
              <div className="absolute bottom-8 left-8 bg-warm-white/95 backdrop-blur-sm px-6 py-5">
                <p className="text-label text-stone mb-1">Design Process</p>
                <p className="font-display text-charcoal text-lg">6 — 14 weeks</p>
                <p className="text-stone text-xs mt-1">From concept to completion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
