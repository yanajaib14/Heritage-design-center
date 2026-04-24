"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer.querySelectorAll(".footer-item"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-charcoal text-warm-white py-20 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="footer-item md:col-span-1">
            <Link href="/" className="font-display text-2xl tracking-[0.15em] uppercase font-light text-warm-white block mb-4">
              Heritage
            </Link>
            <p className="text-stone text-sm leading-relaxed">
              Crafting exceptional kitchen and bath spaces since 1987. Where design meets legacy.
            </p>
          </div>

          {/* Studio */}
          <div className="footer-item">
            <p className="text-label text-gold mb-5">Studio</p>
            <address className="not-italic text-stone text-sm leading-relaxed space-y-1">
              <p>340 N Michigan Avenue</p>
              <p>Suite 1200</p>
              <p>Chicago, Illinois 60601</p>
            </address>
          </div>

          {/* Navigation */}
          <div className="footer-item">
            <p className="text-label text-gold mb-5">Explore</p>
            <ul className="space-y-3">
              {[
                { href: "/kitchens", label: "Kitchens" },
                { href: "/baths", label: "Baths" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-stone text-sm hover:text-warm-white transition-colors duration-300 nav-link"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-item">
            <p className="text-label text-gold mb-5">Connect</p>
            <ul className="space-y-3 text-stone text-sm">
              <li>
                <a href="tel:+13125550142" className="hover:text-warm-white transition-colors duration-300 nav-link">
                  +1 (312) 555-0142
                </a>
              </li>
              <li>
                <a href="mailto:hello@heritagedesign.com" className="hover:text-warm-white transition-colors duration-300 nav-link">
                  hello@heritagedesign.com
                </a>
              </li>
              <li className="pt-2">
                <span className="text-label text-stone/60">Mon — Fri, 9am – 6pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-item border-t border-warm-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-stone/50 text-xs">
            © {new Date().getFullYear()} Heritage Design Center. All rights reserved.
          </p>
          <p className="text-stone/50 text-xs tracking-wider">
            Est. 1987 · Chicago, Illinois
          </p>
        </div>
      </div>
    </footer>
  );
}
