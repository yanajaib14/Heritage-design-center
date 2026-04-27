"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/schedule/698386a7bad8ce0037d6fb1c";

export default function ShowroomExp() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector(".showroom-copy"),
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 78%" } }
      );

      const sA = el.querySelector(".s-a");
      const sB = el.querySelector(".s-b");
      if (sA) gsap.fromTo(sA,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 78%" }, delay: 0.2 }
      );
      if (sB) gsap.fromTo(sB,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 78%" }, delay: 0.45 }
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
          <a className="btn btn-outline-gold" href={SCHEDULE_URL} target="_blank" rel="noopener">
            Schedule a Design Appointment
          </a>
        </div>

        <div className="showroom-stack" aria-hidden="true">
          <div className="s-a">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/d8a89f92-fff8-4e5d-bc74-e7a4b90c6935/457848393_1318784925750875_4047394869648906891_n.jpg"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="s-b">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/a3d20e09-5dd9-4dec-a6c7-d1da6a8e9ce4/full+kitchen+with+busher+block.jpg"
              alt=""
              loading="lazy"
            />
            <div className="frame-label">By appointment.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
