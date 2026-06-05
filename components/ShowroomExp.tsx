"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";
const PHONE_URL = "tel:3605573441";

const SLIDER_IMAGES = [
  "https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/66d7596b-2556-49cd-8f7f-7203a0ac9b63/Kitchen+-+Whistler+Flat+in+Frost.jpg?content-type=image%2Fjpeg",
  "https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/0d9dc93e-2eef-419b-a5d1-1e3d41e8a7c1/Kitchen+-+Ethos+in+Walnut+with+clear%2C+and+Denman+in+Powder+on+the+Island.jpg?content-type=image%2Fjpeg",
  "https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/da3ea0d3-59ea-4ee8-ae87-8251a29d29ee/Vanity+-+Metropolitan+Walnut+1.jpg?content-type=image%2Fjpeg",
  "https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/c805d147-3999-4249-bce3-cd1b9d4a042c/kitchen+with+quatz+backsplash.jpg?content-type=image%2Fjpeg",
  "https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/935a950b-c2d5-4a2f-b112-5a025057f946/full+kitchen+with+marble+cpuntertop.jpg?content-type=image%2Fjpeg",
  "https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/a3d20e09-5dd9-4dec-a6c7-d1da6a8e9ce4/full+kitchen+with+busher+block.jpg?content-type=image%2Fjpeg",
  "https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/030032ee-c9b7-4fb8-99f7-34129e493592/Luxury+Modern+Master+Bath+Concept.png?content-type=image%2Fpng",
  "https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/da315904-f176-49cd-9c5f-d3fb752a5853/Essential+White+Bathroom+1.jpg?content-type=image%2Fjpeg",
  "https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/8807ca3a-5ba9-4970-b5ba-fe00a7137182/Full+Master+Bathroom+Suite.png?content-type=image%2Fpng",
  "https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/31f06899-aa52-4e30-bf5e-0fe5a22dd356/Bathroom1+View2.jpg?content-type=image%2Fjpeg",
  "https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/cd44f26c-d314-4820-a9d0-5a698ef24756/Oslo+White+Bathroom-+View+1.jpg?content-type=image%2Fjpeg",
  "https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/5aec0b12-22cb-4356-b129-045c298ae697/Completed+Modern+Kitchen.png?content-type=image%2Fpng",
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
    timerRef.current = setInterval(() => go(current + 1), 5000);
  }, [current, go]);

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
          scrollTrigger: { trigger: el, start: "top 78%" } }
      );
      gsap.fromTo(
        el.querySelector(".showroom-slider-wrap"),
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.2, ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 78%" }, delay: 0.2 }
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
            <a className="btn btn-outline-gold" href={SCHEDULE_URL} target="_blank" rel="noopener">
              Schedule a Design Appointment
            </a>
            <a className="btn btn-solid" href={PHONE_URL}>
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
