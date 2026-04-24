"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { href: "/kitchens", label: "Kitchens" },
  { href: "/baths", label: "Baths" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    const menuLinks = menuLinksRef.current;
    if (!menu || !menuLinks) return;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menu, { scaleY: 1, duration: 0.7, ease: "power4.inOut", transformOrigin: "top" });
      gsap.fromTo(
        menuLinks.querySelectorAll("li"),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power3.out", delay: 0.3 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menu, { scaleY: 0, duration: 0.6, ease: "power4.inOut", transformOrigin: "top" });
    }
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-6 flex items-center justify-between transition-all duration-700 ${
          scrolled || !isHome
            ? "bg-warm-white/95 backdrop-blur-sm border-b border-light-stone"
            : "bg-transparent"
        }`}
      >
        <Link
          href="/"
          className={`font-display text-xl tracking-[0.15em] uppercase font-light transition-colors duration-500 ${
            scrolled || !isHome ? "text-charcoal" : "text-warm-white"
          }`}
        >
          Heritage
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`nav-link text-label transition-colors duration-500 ${
                  scrolled || !isHome
                    ? pathname === href
                      ? "text-gold"
                      : "text-charcoal"
                    : "text-warm-white/90"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className={`text-label px-6 py-3 border transition-all duration-500 hover:bg-charcoal hover:text-warm-white hover:border-charcoal magnetic-btn ${
              scrolled || !isHome
                ? "border-charcoal text-charcoal"
                : "border-warm-white/60 text-warm-white"
            }`}
          >
            Begin Your Project
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`md:hidden flex flex-col gap-[5px] p-2 transition-colors duration-500 ${
            scrolled || !isHome ? "text-charcoal" : "text-warm-white"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[1px] bg-current transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`block w-4 h-[1px] bg-current transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1px] bg-current transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-charcoal flex flex-col justify-center px-8"
        style={{ transform: "scaleY(0)", transformOrigin: "top" }}
      >
        <div ref={menuLinksRef}>
          <ul className="space-y-2">
            {[{ href: "/", label: "Home" }, ...links].map(({ href, label }) => (
              <li key={href} className="overflow-hidden">
                <Link
                  href={href}
                  className="block text-display-lg text-warm-white/90 hover:text-gold transition-colors duration-300 py-2"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 pt-8 border-t border-warm-white/10">
            <p className="text-label text-stone mb-2">Studio</p>
            <p className="text-warm-white/60 text-sm">Chicago, Illinois</p>
          </div>
        </div>
      </div>
    </>
  );
}
