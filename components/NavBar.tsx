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
          <img src="https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/0c15682d-817f-4508-b804-ad5aba6b200f/Heritage_Design_Center_email_signature_400px.png?content-type=image%2Fpng" alt="Heritage Design Center" height={74} style={{ height: 107, width: "auto" }} />
        </Link>
        <div className="nav-center">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </div>
        <a className="btn btn-solid nav-cta" href={SCHEDULE_URL} target="_blank" rel="noopener">
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
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} className="ml" onClick={close}>{label}</Link>
        ))}
        <a className="btn btn-solid" href={SCHEDULE_URL} target="_blank" rel="noopener" onClick={close}>
          Book a Consultation
        </a>
      </div>
    </>
  );
}
