"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import GalleryGrid, { Project } from "@/components/GalleryGrid";

gsap.registerPlugin(ScrollTrigger);

const baths: Project[] = [
  {
    id: 1,
    title: "Gold Coast Master Bath",
    location: "Gold Coast, Chicago",
    year: "2024",
    style: "Contemporary",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=85",
    span: "wide",
    description:
      "Book-matched Nero Marquina marble, freestanding soaking tub, and bespoke bronze fixtures.",
  },
  {
    id: 2,
    title: "The Whitmore Sanctuary",
    location: "Lincoln Square, Chicago",
    year: "2024",
    style: "Modern",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=900&q=85",
    description:
      "Wet-room concept with frameless glass, heated limestone floors, and a cedar steam room.",
  },
  {
    id: 3,
    title: "Lakeside Spa Bath",
    location: "Lake Bluff, Illinois",
    year: "2023",
    style: "Transitional",
    image: "https://images.unsplash.com/photo-1620626011761-996317702519?w=900&q=85",
    description:
      "Double vanity in honed Bianco Dolomiti, Waterworks fixtures, and panoramic lake views.",
  },
  {
    id: 4,
    title: "Hyde Park Brownstone",
    location: "Hyde Park, Chicago",
    year: "2023",
    style: "Traditional",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    description:
      "Period-sensitive renovation with clawfoot tub, subway tile, and restored hexagon mosaic floors.",
  },
  {
    id: 5,
    title: "River North Pied-à-Terre",
    location: "River North, Chicago",
    year: "2022",
    style: "Contemporary",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80",
    description:
      "A jewel-box bath: backlit onyx panels, polished nickel hardware, and floating vanity.",
  },
  {
    id: 6,
    title: "Winnetka Estate Bath",
    location: "Winnetka, Illinois",
    year: "2022",
    style: "Traditional",
    image: "https://images.unsplash.com/photo-1620626011761-996317702519?w=800&q=80",
    description:
      "Double marble vanity, coffered ceiling, and Waterworks fittings in a generous traditional bath.",
  },
];

export default function BathsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".section-header-item"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageHero
        label="Portfolio"
        title="Bath"
        titleItalic="Design"
        subtitle="We design bath spaces that transcend function — private sanctuaries where material and light create a sense of complete retreat."
        image="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1800&q=85"
        imageAlt="Heritage bath design portfolio"
      />

      <div ref={sectionRef} className="px-8 md:px-16 py-24 md:py-36 bg-warm-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="section-header-item text-label text-stone mb-3 opacity-0">
                {baths.length} Projects
              </p>
              <h2 className="section-header-item font-display text-3xl md:text-4xl text-charcoal opacity-0">
                Our Bath Work
              </h2>
            </div>
            <p className="section-header-item text-stone max-w-xs leading-relaxed opacity-0">
              Every sanctuary begins with stillness. We design baths that invite you to pause, breathe, and simply be.
            </p>
          </div>

          <GalleryGrid projects={baths} category="baths" />
        </div>
      </div>
    </>
  );
}
