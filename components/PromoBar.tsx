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
      <div className="promo-content">
        <a href={SCHEDULE_URL} className="promo-link">
          Schedule a Design Appointment
        </a>
        <span className="promo-phone">Call us: (123) 456-7890</span>
      </div>
    </div>
  );
}
