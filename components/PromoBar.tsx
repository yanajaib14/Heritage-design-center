"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/schedule/698386a7bad8ce0037d6fb1c";

export default function PromoBar() {
  const [isVisible, setIsVisible] = useState(true);
  const promoRef = useRef<HTMLDivElement>(null);

  const syncPromoHeight = () => {
    const promo = promoRef.current;
    if (!promo) return;
    const height = `${promo.offsetHeight}px`;
    document.documentElement.style.setProperty("--promo-height", height);
  };

  useEffect(() => {
    // Add class to body to push nav down
    document.body.classList.add("has-promo");
    syncPromoHeight();

    // Slight delay for a fade-in effect to look premium
    gsap.fromTo(
      ".promo-bar-container",
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
    );

    const onResize = () => syncPromoHeight();
    window.addEventListener("resize", onResize);

    return () => {
      document.body.classList.remove("has-promo");
      document.documentElement.style.removeProperty("--promo-height");
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    document.body.classList.remove("has-promo");
    document.documentElement.style.removeProperty("--promo-height");
  };

  if (!isVisible) return null;

  return (
    <div ref={promoRef} className="promo-bar-container">
      <div className="promo-bar-inner">
        <span className="promo-badge">Coming Soon</span>
        <p className="promo-text">
          <strong>Our showroom in Lacey is opening soon.</strong>
          <span className="promo-divider" aria-hidden="true">•</span>
          <span className="promo-hours">Monday-Friday 9am-5:30pm</span>
          <span className="promo-divider" aria-hidden="true">•</span>
          <span className="promo-hours">Saturday by appointment only</span>
          <span className="promo-divider" aria-hidden="true">•</span>
          <span className="promo-hours">Closed Sunday</span>{" "}
          <a href={SCHEDULE_URL} target="_blank" rel="noopener" className="promo-link">
            Schedule now
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="promo-arrow"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </p>
        <button
          className="promo-close"
          onClick={handleClose}
          aria-label="Close promotion"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
