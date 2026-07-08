"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

const SCHEDULE_URL =
  "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/process", label: "Process" },
  { href: "/collections", label: "Collections" },
  { href: "/showroom", label: "Showroom" },
  { href: "/gallery", label: "Gallery" },
];

export default function NavBar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(nav, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 });

    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      menu.classList.add("open");
    } else {
      document.body.style.overflow = "";
      menu.classList.remove("open");
    }
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav ref={navRef} className={`nav${scrolled ? " scrolled" : ""}`} style={{ opacity: 0 }}>
        <Link href="/" className="nav-logo" aria-label="Heritage Design Center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.png" alt="Heritage Design Center" height={74} style={{ height: 118, width: "auto", filter: "drop-shadow(0 2px 12px rgba(201,168,76,0.25))" }} />
        </Link>
        <div className="nav-center">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </div>
        <a className="btn btn-solid nav-cta pulse-shimmer-btn" href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
          Book a Consultation
        </a>
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div ref={menuRef} className="mobile-menu">
        <button
          className="mobile-menu-close"
          onClick={close}
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} className="ml" onClick={close}>{label}</Link>
        ))}
        <a className="btn btn-solid pulse-shimmer-btn" href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer" onClick={close}>
          Book a Consultation
        </a>
      </div>
    </>
  );
}
