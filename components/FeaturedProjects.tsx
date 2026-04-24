"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "The Mercer Residence",
    type: "Kitchen",
    year: "2024",
    location: "Lincoln Park, Chicago",
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=85",
    href: "/kitchens",
    description: "A chef's kitchen defined by Calacatta marble and hand-crafted millwork.",
  },
  {
    id: 2,
    title: "Lake Shore Estate",
    type: "Bath",
    year: "2024",
    location: "Gold Coast, Chicago",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=85",
    href: "/baths",
    description: "A master bath sanctuary featuring book-matched stone and bespoke fixtures.",
  },
  {
    id: 3,
    title: "The Wentworth",
    type: "Kitchen",
    year: "2023",
    location: "River North, Chicago",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=85",
    href: "/kitchens",
    description: "Industrial refinement meets organic warmth in this penthouse kitchen.",
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".reveal-item"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
            },
          }
        );

        // Gold line draw
        const goldLine = headerRef.current.querySelector(".gold-line");
        if (goldLine) {
          gsap.fromTo(
            goldLine,
            { width: 0 },
            {
              width: "3rem",
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 80%",
              },
            }
          );
        }
      }

      // Project cards reveal
      section.querySelectorAll(".project-card").forEach((card, i) => {
        const imageWrap = card.querySelector(".project-image-wrap");
        if (imageWrap) gsap.fromTo(
          imageWrap,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
            },
          }
        );

        gsap.fromTo(
          card.querySelectorAll(".project-detail"),
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
            },
            delay: 0.3 + i * 0.1,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-40 px-8 md:px-16 bg-warm-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="gold-line h-[1px] bg-gold" />
              <p className="reveal-item text-label text-stone">Featured Work</p>
            </div>
            <h2 className="reveal-item text-display-lg text-charcoal max-w-sm">
              Spaces That<br />
              <em>Define Living</em>
            </h2>
          </div>
          <div className="reveal-item">
            <Link
              href="/kitchens"
              className="text-label text-charcoal nav-link hover:text-gold transition-colors duration-300"
            >
              View All Projects →
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-12 md:gap-6">
          {/* Large featured project */}
          <div className="project-card md:col-span-7 group">
            <div className="project-image-wrap img-zoom overflow-hidden aspect-[4/3]">
              <Image
                src={projects[0].image}
                alt={projects[0].title}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
              />
            </div>
            <div className="pt-6 flex justify-between items-start">
              <div>
                <p className="project-detail text-label text-stone mb-2">{projects[0].type} · {projects[0].year}</p>
                <h3 className="project-detail font-display text-2xl md:text-3xl text-charcoal mb-2">{projects[0].title}</h3>
                <p className="project-detail text-stone/70 text-sm">{projects[0].description}</p>
              </div>
              <Link
                href={projects[0].href}
                className="project-detail text-gold text-2xl self-start mt-1 hover:translate-x-1 transition-transform duration-300 inline-block"
              >
                →
              </Link>
            </div>
          </div>

          {/* Two stacked projects */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {projects.slice(1).map((project) => (
              <div key={project.id} className="project-card group">
                <div className="project-image-wrap img-zoom overflow-hidden aspect-[3/2]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
                  />
                </div>
                <div className="pt-4 flex justify-between items-start">
                  <div>
                    <p className="project-detail text-label text-stone mb-1">{project.type} · {project.year}</p>
                    <h3 className="project-detail font-display text-xl md:text-2xl text-charcoal">{project.title}</h3>
                  </div>
                  <Link
                    href={project.href}
                    className="project-detail text-gold self-start mt-1 hover:translate-x-1 transition-transform duration-300 inline-block"
                  >
                    →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
