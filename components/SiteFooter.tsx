"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".footer-logo, .footer-tag, .footer-nav, .footer-contact, .socials, .footer-fine"),
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef}>
      <div className="footer-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/0c15682d-817f-4508-b804-ad5aba6b200f/Heritage_Design_Center_email_signature_400px.png?content-type=image%2Fpng" alt="Heritage Design Center" className="footer-logo" style={{ height: 98, width: "auto" }} />
        <div className="footer-tag">Kitchen &amp; Bath Showroom — Lacey, WA</div>

        <nav className="footer-nav">
          {[
            { href: "#top", label: "Home" },
            { href: "#process", label: "Process" },
            { href: "#cabinetry", label: "Collections" },
            { href: "#materials", label: "Showroom" },
            { href: "#destination", label: "Visit" },
            { href: "#lead", label: "Contact" },
          ].map(({ href, label }) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <div className="footer-contact">
          <strong>Showroom</strong>
          8695 Martin Way E #101, Lacey, WA 98516<br />
          (360) 557-3441 ·{" "}
          <a href="mailto:showroom@heritagedesignctr.com">showroom@heritagedesignctr.com</a>
        </div>

        <div className="socials">
          <a href="#" aria-label="Instagram" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
              <path d="M14 9h3V6h-3c-1.657 0-3 1.343-3 3v2H8v3h3v7h3v-7h2.5l.5-3H14V9.5c0-.276.224-.5.5-.5z" />
            </svg>
          </a>
        </div>

        <div className="footer-fine">
          Design. Supply. Delivered right.<br />
          © {new Date().getFullYear()} Heritage Design Center. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

