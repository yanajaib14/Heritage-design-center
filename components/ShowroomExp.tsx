"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";
const PHONE_URL = "tel:3605573441";

const SLIDER_IMAGES = [
  "/gallery-whistler-frost.jpg",
  "/project-forest-kitchen.jpg",
  "/gallery-metropolitan-walnut.jpg",
  "/gallery-quartz-backsplash.jpg",
  "/project-coastal-calm.jpg",
  "/gallery-butcher-block.jpg",
  "/gallery-luxury-bath.png",
  "/gallery-essential-white-bath.jpg",
  "/hero-bathroom-custom.png",
  "/gallery-bath-view2.jpg",
  "/gallery-oslo-white-bath.jpg",
  "/project-midnight-blue.jpg",
];

export default function ShowroomExp() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const go = useCallback((n: number) => {
    setCurrent((n + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDER_IMAGES.length);
    }, 5000);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDER_IMAGES.length);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handlePrev = () => {
    setCurrent((c) => (c - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);
    resetTimer();
  };
  const handleNext = () => {
    setCurrent((c) => (c + 1) % SLIDER_IMAGES.length);
    resetTimer();
  };
  const handleDot = (i: number) => {
    setCurrent(i);
    resetTimer();
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (ScrollTrigger.isTouch === 1) {
      gsap.set(el.querySelectorAll(".showroom-copy, .showroom-slider-wrap"), { opacity: 1, x: 0, clipPath: "none" });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector(".showroom-copy"),
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 78%", once: true } }
      );
      gsap.fromTo(
        el.querySelector(".showroom-slider-wrap"),
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.2, ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 78%", once: true }, delay: 0.2 }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="showroom-exp" id="destination" ref={sectionRef}>
      <div className="showroom-inner">
        <div className="showroom-copy">
          <span className="eyebrow">A Destination, Not an Errand</span>
          <h2>Visit <span style={{ whiteSpace: "nowrap" }}>the <em>Design Center.</em></span></h2>
          <p>
            An afternoon at Heritage is less showroom, more studio. Designers at your pace, materials in your hands, and the quiet room to decide with intention.
          </p>
          <ul className="showroom-features">
            {[
              "Curated Vignettes & Full Room Builds",
              "Hands-On Material Library",
              "One-on-One Designer Appointments",
              "Coffee & Considered Conversation",
            ].map((feat) => (
              <li key={feat}>
                <span className="tick">✓</span>
                <span className="label">{feat}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4">
            <a className="btn btn-outline-gold w-full sm:w-auto justify-center" href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              Schedule a Design Appointment
            </a>
            <a className="btn btn-solid pulse-shimmer-btn w-full sm:w-auto justify-center" href={PHONE_URL}>
              Call Us (360) 557-3441
            </a>
          </div>
        </div>

        <div className="showroom-slider-wrap">
          <div
            className="showroom-slider-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 40) { diff > 0 ? handleNext() : handlePrev(); }
            }}
          >
            {SLIDER_IMAGES.map((src, i) => (
              <div key={i} className="showroom-slide">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Heritage Design Center project ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} />
              </div>
            ))}
          </div>

          <button className="showroom-arrow showroom-arrow-prev" onClick={handlePrev} aria-label="Previous photo">&#10094;</button>
          <button className="showroom-arrow showroom-arrow-next" onClick={handleNext} aria-label="Next photo">&#10095;</button>

          <div className="showroom-dots">
            {SLIDER_IMAGES.map((_, i) => (
              <button
                key={i}
                className={`showroom-dot${i === current ? " active" : ""}`}
                onClick={() => handleDot(i)}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
