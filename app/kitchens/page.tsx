"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import GalleryGrid, { Project } from "@/components/GalleryGrid";

gsap.registerPlugin(ScrollTrigger);

const kitchens: Project[] = [
  {
    id: 1,
    title: "The Mercer Residence",
    location: "Lincoln Park, Chicago",
    year: "2024",
    style: "Contemporary",
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=85",
    span: "wide",
    description:
      "Calacatta marble waterfall island, hand-painted cabinetry in heirloom white, unlacquered brass hardware.",
  },
  {
    id: 2,
    title: "Wentworth Penthouse",
    location: "River North, Chicago",
    year: "2023",
    style: "Modern",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=85",
    description:
      "Open-plan chef's kitchen with custom steel-framed windows and walnut cabinetry to the ceiling.",
  },
  {
    id: 3,
    title: "Lakeside Cottage",
    location: "Lake Geneva, Wisconsin",
    year: "2023",
    style: "Traditional",
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=85",
    description:
      "Shaker cabinetry in sage, Carrara marble, and aged brass — a kitchen rooted in warmth.",
  },
  {
    id: 4,
    title: "The Morrison",
    location: "Streeterville, Chicago",
    year: "2023",
    style: "Transitional",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85",
    description:
      "A refined balance of clean lines and organic textures — leathered quartzite meets brushed nickel.",
  },
  {
    id: 5,
    title: "Halsted Loft",
    location: "West Loop, Chicago",
    year: "2022",
    style: "Modern",
    image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=900&q=85",
    description:
      "Industrial loft reimagined with bespoke concrete countertops and integrated Gaggenau appliances.",
  },
  {
    id: 6,
    title: "Elmwood Estate",
    location: "Hinsdale, Illinois",
    year: "2022",
    style: "Traditional",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=85",
    description:
      "A sprawling traditional kitchen with custom range hood, butler's pantry, and hand-painted tiles.",
  },
  {
    id: 7,
    title: "Cedar Shore",
    location: "Winnetka, Illinois",
    year: "2022",
    style: "Transitional",
    image: "https://images.unsplash.com/photo-1556909172-7abcde4a9e4e?w=900&q=85",
    description:
      "Coastal transitional with European white oak, stone quarried from Vermont, and soft grey tones.",
  },
  {
    id: 8,
    title: "North Shore Modern",
    location: "Glencoe, Illinois",
    year: "2021",
    style: "Contemporary",
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
    description:
      "Handle-free cabinetry, integrated Sub-Zero refrigeration, and a sculptural range hood in plaster.",
  },
];

export default function KitchensPage() {
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
        title="Kitchen"
        titleItalic="Design"
        subtitle="Every kitchen we design becomes the heart of a home — a space where precision craft and lived experience converge."
        image="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1800&q=85"
        imageAlt="Heritage kitchen design portfolio"
      />

      <div ref={sectionRef} className="px-8 md:px-16 py-24 md:py-36 bg-warm-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="section-header-item text-label text-stone mb-3 opacity-0">
                {kitchens.length} Projects
              </p>
              <h2 className="section-header-item font-display text-3xl md:text-4xl text-charcoal opacity-0">
                Our Kitchen Work
              </h2>
            </div>
            <p className="section-header-item text-stone max-w-xs leading-relaxed opacity-0">
              Each project begins with listening. We build spaces that reflect you — your rituals, your aesthetic, your life.
            </p>
          </div>

          <GalleryGrid projects={kitchens} category="kitchens" />
        </div>
      </div>
    </>
  );
}
