"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VisitSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".visit-grid > *"),
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 78%" } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="visit" id="visit" ref={sectionRef}>
      <div className="visit-inner">
        <div className="visit-grid">
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: "20px" }}>
              Visit the Showroom
            </span>
            <h2>
              Come See Us{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>In Person.</em>
            </h2>
            <div className="visit-details">
              <div className="visit-detail">
                <span className="label">Address</span>
                <span className="value">
                  8695 Martin Way E #101<br />Lacey, WA 98516
                </span>
              </div>
              <div className="visit-detail">
                <span className="label">Hours</span>
                <span className="value">Coming soon!</span>
              </div>
            </div>
            <a
              className="link-arrow"
              href="https://maps.google.com/?q=8695+Martin+Way+E+Lacey+WA"
              target="_blank"
              rel="noopener"
            >
              Get Directions <span className="arrow">→</span>
            </a>
          </div>

          <div className="visit-map">
            <iframe
              title="Heritage Design Center – 8695 Martin Way E, Lacey, WA"
              src="https://www.google.com/maps?q=8695+Martin+Way+E+STE+101,+Lacey,+WA+98516&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="map-pin-overlay" aria-hidden="true">
              <div className="pin">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                  <path d="M12 21s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <h4>Heritage Design Center</h4>
              <p>Lacey · Washington</p>
            </div>
          </div>
        </div>

        <div className="sister-note">
          Proud sister company of{" "}
          <a href="https://10daykitchens.com" target="_blank" rel="noopener">
            10 Day Kitchens — 10daykitchens.com
          </a>
        </div>
      </div>
    </section>
  );
}
