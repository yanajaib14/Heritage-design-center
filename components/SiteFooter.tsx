"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/process", label: "Process" },
  { href: "/collections", label: "Collections" },
  { href: "/showroom", label: "Showroom" },
  { href: "/gallery", label: "Gallery" },
];

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    if (ScrollTrigger.isTouch === 1) {
      gsap.set(el.querySelectorAll(".footer-reveal"), { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".footer-reveal"),
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer-layout bg-[#F2EEE6] border-t-2 border-[var(--gold)]">
      <div className="footer-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Logo & Brand Intro */}
          <div className="lg:col-span-5 flex flex-col justify-start footer-reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo.png"
              alt="Heritage Design Center"
              className="w-auto h-[90px] object-contain object-left mb-6"
              style={{ filter: "drop-shadow(0 2px 12px rgba(201,168,76,0.25))" }}
            />
            <p className="text-[var(--text-dim)] font-normal text-[17px] leading-relaxed max-w-sm">
              Heritage is a kitchen and bath design house serving all of Western Washington, from Olympia to Seattle and everywhere in between. We handle detailed specifications, supply luxury cabinetry and stone, and coordinate direct job-site deliveries.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 flex flex-col justify-start footer-reveal">
            <h4 className="text-[var(--gold)] font-body text-[15px] tracking-[0.18em] uppercase font-semibold mb-6">
              Explore
            </h4>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map(({ href, label }) => (
                <Link 
                  key={href} 
                  href={href} 
                  className="text-[var(--text-dim)] hover:text-[var(--gold)] font-medium text-[17px] tracking-wide transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="lg:col-span-3 flex flex-col justify-start footer-reveal">
            <h4 className="text-[var(--gold)] font-body text-[15px] tracking-[0.18em] uppercase font-semibold mb-6">
              Showroom
            </h4>
            <p className="text-[var(--text-dim)] font-normal text-[17px] leading-relaxed mb-4">
              <a href="https://maps.google.com/?q=8695+Martin+Way+E+Lacey+WA" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors duration-200">
                8695 Martin Way E #101<br />
                Lacey, WA 98516
              </a>
            </p>
            <div className="flex flex-col gap-2 font-medium text-[17px]">
              <a href="tel:3605573441" className="text-[var(--text-dim)] hover:text-[var(--gold)] transition-colors duration-200">
                (360) 557-3441
              </a>
              <a href="mailto:showroom@heritagedesignctr.com" className="text-[var(--text-dim)] hover:text-[var(--gold)] transition-colors duration-200 break-all">
                showroom@heritagedesignctr.com
              </a>
            </div>
          </div>

          {/* Column 4: Hours */}
          <div className="lg:col-span-2 flex flex-col justify-start footer-reveal">
            <h4 className="text-[var(--gold)] font-body text-[15px] tracking-[0.18em] uppercase font-semibold mb-6">
              Hours
            </h4>
            <p className="text-[var(--text-dim)] font-normal text-[17px] leading-relaxed">
              Mon – Fri: 9:00 AM – 5:30 PM<br />
              Sat: By appointment only<br />
              Sun: Closed
            </p>
          </div>

        </div>

        {/* Fine Print */}
        <div className="mt-16 pt-8 border-t border-[var(--gold-border)] flex flex-col sm:flex-row justify-between items-center gap-4 text-[15px] text-[var(--text-dim)] font-normal footer-reveal">
          <div>
            © {new Date().getFullYear()} Heritage Design Center. All rights reserved.
          </div>
          <div className="tracking-wider uppercase text-[14px] font-medium text-[var(--gold)]">
            Design. Supply. Delivered right.
          </div>
        </div>
      </div>
    </footer>
  );
}
