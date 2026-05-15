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
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".footer-logo, .footer-tag, .footer-nav, .footer-contact, .footer-fine"),
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
        <div className="footer-tag">Kitchen &amp; Bath Showroom, Lacey, WA</div>

        <nav className="footer-nav">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>

        <div className="footer-contact">
          <strong>Showroom</strong>
          8695 Martin Way E #101, Lacey, WA 98516<br />
          (360) 557-3441 ·{" "}
          <a href="mailto:showroom@heritagedesignctr.com">showroom@heritagedesignctr.com</a>
        </div>

        <div className="footer-fine">
          Design. Supply. Delivered right.<br />
          © {new Date().getFullYear()} Heritage Design Center. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
