"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Margaret Ashford",
    title: "Founder & Principal Designer",
    bio: "With over 30 years designing Chicago's finest kitchens and baths, Margaret founded Heritage with a singular vision: that great design should feel inevitable.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85",
  },
  {
    name: "Daniel Park",
    title: "Senior Designer",
    bio: "A graduate of the Rhode Island School of Design, Daniel brings a sculptor's sensibility to every project — form follows feeling.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
  },
  {
    name: "Sofia Reyes",
    title: "Materials Director",
    bio: "Sofia has sourced stone from Italy, hardware from France, and tilework from Morocco. Her expertise transforms a design into a tactile experience.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85",
  },
];

const awards = [
  { year: "2024", award: "NKBA National Award", category: "Kitchen Design — Large" },
  { year: "2024", award: "Chicago Design Award", category: "Residential Interior" },
  { year: "2023", award: "NKBA National Award", category: "Bath Design — Luxury" },
  { year: "2023", award: "Luxe Red Award", category: "Kitchen Design" },
  { year: "2022", award: "NKBA National Award", category: "Kitchen Design — Specialty" },
  { year: "2021", award: "ASID Design Excellence", category: "Kitchen & Bath" },
];

export default function AboutPage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = [storyRef, teamRef, awardsRef, valuesRef];
    const ctxs = sections.map((ref) => {
      if (!ref.current) return null;
      return gsap.context(() => {
        gsap.fromTo(
          ref.current!.querySelectorAll(".animate-item"),
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 78%" },
          }
        );

        const line = ref.current!.querySelector(".section-line");
        if (line) {
          gsap.fromTo(line, { width: 0 }, {
            width: "3rem",
            duration: 0.8,
            scrollTrigger: { trigger: ref.current, start: "top 78%" },
          });
        }
      }, ref.current!);
    });

    // Team member images
    const teamCtx = gsap.context(() => {
      teamRef.current?.querySelectorAll(".team-image").forEach((img) => {
        gsap.fromTo(
          img,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.1,
            ease: "power4.inOut",
            scrollTrigger: { trigger: img, start: "top 80%" },
          }
        );
      });
    });

    return () => {
      ctxs.forEach((ctx) => ctx?.revert());
      teamCtx.revert();
    };
  }, []);

  return (
    <>
      <PageHero
        label="Our Story"
        title="A Legacy of"
        titleItalic="Exceptional Design"
        subtitle="Since 1987, Heritage Design Center has defined kitchen and bath design excellence in Chicago. Three decades. Hundreds of homes. One standard."
        image="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1800&q=85"
        imageAlt="Heritage Design Center studio"
      />

      {/* Story Section */}
      <section className="py-24 md:py-40 px-8 md:px-16 bg-warm-white">
        <div ref={storyRef} className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="section-line h-[1px] bg-gold" />
              <p className="animate-item text-label text-stone opacity-0">Our Origin</p>
            </div>
            <h2 className="animate-item font-display text-display-md text-charcoal opacity-0">
              Where<br />Heritage<br /><em>Began</em>
            </h2>
          </div>

          <div className="md:col-span-7 space-y-6">
            <p className="animate-item text-charcoal/80 leading-relaxed text-lg opacity-0">
              Heritage Design Center was founded in 1987 by Margaret Ashford, a designer with an unwavering conviction that the kitchen and bath are not merely functional spaces — they are the emotional center of a home.
            </p>
            <p className="animate-item text-stone leading-relaxed opacity-0">
              From a small studio on Michigan Avenue, Heritage grew through word of mouth alone. Client after client returned — for additions, for second homes, for their children's first homes. That loyalty is our truest measure of success.
            </p>
            <p className="animate-item text-stone leading-relaxed opacity-0">
              Today, Heritage operates as a full-service design studio with a team of eight, serving clients across Chicagoland and beyond. Our process is unchanged: listen deeply, design precisely, execute flawlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-36 px-8 md:px-16 bg-cream">
        <div ref={valuesRef} className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-5">
            <div className="section-line h-[1px] bg-gold" />
            <p className="animate-item text-label text-stone opacity-0">What We Believe</p>
          </div>
          <h2 className="animate-item font-display text-display-md text-charcoal mb-16 opacity-0">
            The Heritage<br /><em>Principles</em>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Craft Over Speed",
                body: "We take the time that great design demands. Every detail is resolved before a single material is ordered.",
              },
              {
                title: "Materials as Language",
                body: "Stone, wood, and metal speak. We select materials that say exactly what your home needs to say — and nothing else.",
              },
              {
                title: "Service Without Compromise",
                body: "From the first conversation to the final walk-through, we hold ourselves to a single standard: impeccable.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="animate-item opacity-0">
                <div className="w-6 h-[1px] bg-gold mb-6" />
                <h3 className="font-display text-2xl text-charcoal mb-3">{title}</h3>
                <p className="text-stone leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-36 px-8 md:px-16 bg-warm-white">
        <div ref={teamRef} className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-5">
            <div className="section-line h-[1px] bg-gold" />
            <p className="animate-item text-label text-stone opacity-0">The Studio</p>
          </div>
          <h2 className="animate-item font-display text-display-md text-charcoal mb-16 opacity-0">
            Meet the<br /><em>Team</em>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {team.map(({ name, title, bio, image }) => (
              <div key={name} className="animate-item opacity-0">
                <div className="team-image overflow-hidden aspect-[3/4] mb-6 bg-light-stone">
                  <Image
                    src={image}
                    alt={name}
                    width={600}
                    height={800}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="text-label text-gold mb-1">{title}</p>
                <h3 className="font-display text-2xl text-charcoal mb-3">{name}</h3>
                <p className="text-stone text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24 md:py-36 px-8 md:px-16 bg-charcoal">
        <div ref={awardsRef} className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-5">
            <div className="section-line h-[1px] bg-gold" />
            <p className="animate-item text-label text-gold opacity-0">Recognition</p>
          </div>
          <h2 className="animate-item font-display text-display-md text-warm-white mb-16 opacity-0">
            Awards &<br /><em>Honors</em>
          </h2>

          <div className="space-y-0 divide-y divide-warm-white/10">
            {awards.map(({ year, award, category }) => (
              <div
                key={`${year}-${award}`}
                className="animate-item opacity-0 py-6 flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <span className="text-label text-gold">{year}</span>
                <div className="flex-1 md:px-12">
                  <p className="font-display text-xl text-warm-white">{award}</p>
                  <p className="text-stone text-sm">{category}</p>
                </div>
                <span className="text-stone/30 text-sm hidden md:block">—</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 md:px-16 bg-cream text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-label text-stone mb-4">Begin Your Project</p>
          <h2 className="font-display text-display-md text-charcoal mb-8">
            Let&#39;s Create<br /><em>Something Enduring</em>
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-charcoal text-warm-white px-10 py-4 text-label hover:bg-gold transition-all duration-500 magnetic-btn"
          >
            Schedule a Consultation
            <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
