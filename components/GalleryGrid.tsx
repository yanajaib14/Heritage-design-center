"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface Project {
  id: number;
  title: string;
  location: string;
  year: string;
  style: string;
  image: string;
  span?: "wide" | "normal";
  description: string;
}

interface GalleryGridProps {
  projects: Project[];
  category: string;
}

const filters = ["All", "Contemporary", "Traditional", "Transitional", "Modern"];

export default function GalleryGrid({ projects, category }: GalleryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.style === activeFilter);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll(".gallery-card");
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: { amount: 0.6 },
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
          },
        }
      );
    }, grid);

    return () => ctx.revert();
  }, [filtered]);

  const switchFilter = (filter: string) => {
    const grid = gridRef.current;
    if (!grid) return;

    gsap.to(grid.querySelectorAll(".gallery-card"), {
      opacity: 0,
      y: 20,
      duration: 0.25,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {
        setActiveFilter(filter);
      },
    });
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-14">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => switchFilter(f)}
            className={`text-label transition-all duration-300 pb-1 border-b ${
              activeFilter === f
                ? "text-charcoal border-gold"
                : "text-stone border-transparent hover:text-charcoal hover:border-light-stone"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((project) => (
          <div
            key={project.id}
            className={`gallery-card group opacity-0 ${
              project.span === "wide" ? "md:col-span-2" : ""
            }`}
          >
            <div className="img-zoom overflow-hidden aspect-[4/3] bg-light-stone">
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
              />
            </div>

            {/* Overlay on hover */}
            <div className="relative">
              <div className="pt-5 flex justify-between items-start">
                <div>
                  <p className="text-label text-stone mb-1">{project.style} · {project.year}</p>
                  <h3 className="font-display text-xl text-charcoal group-hover:text-gold transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-stone text-xs mt-1">{project.location}</p>
                </div>
                <span className="text-stone/40 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300 mt-1 text-sm">
                  →
                </span>
              </div>
              <p className="text-stone text-sm mt-3 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
