"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";
const TRADE_URL = "https://10daykitchens.hbportal.co/public/69f50cd056cf56fd0dd4c172/1-form";
const homeCardStyle = { "--audience-image": "url('/project-university-place.png')" } as CSSProperties;
const tradeCardStyle = { "--audience-image": "url('/gallery-quartz-backsplash.jpg')" } as CSSProperties;

export default function AudienceSplit() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (ScrollTrigger.isTouch === 1) {
      gsap.set(el.querySelectorAll(".audience-col"), { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      el.querySelectorAll(".audience-col").forEach((col, i) => {
        gsap.fromTo(col,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 78%", once: true }, delay: i * 0.18,
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="audience" ref={sectionRef} style={{ background: "transparent" }}>
      <style>{`
        .audience {
          border-top: none !important;
          border-bottom: none !important;
          background: transparent !important;
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 28px !important;
          max-width: var(--max) !important;
          margin: 0 auto !important;
          padding: clamp(72px, 9vw, 108px) var(--pad) !important;
        }
        .audience-col {
          position: relative !important;
          overflow: hidden !important;
          isolation: isolate !important;
          border-radius: 18px !important;
          border: 1px solid var(--gold-border-strong) !important;
          background: linear-gradient(180deg, rgba(23,20,16,0.84), rgba(13,12,10,0.92)) !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08) !important;
          min-height: 560px !important;
          padding: clamp(44px, 5vw, 58px) clamp(30px, 4vw, 44px) !important;
          transition: transform 420ms var(--ease), box-shadow 420ms var(--ease), border-color 420ms var(--ease) !important;
        }
        .audience-col::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--audience-image);
          background-size: cover;
          background-position: center;
          opacity: 0.24;
          transform: scale(1.02);
          transition: opacity 450ms var(--ease), transform 900ms var(--ease);
          z-index: -2;
        }
        .audience-col::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 82% 14%, rgba(201, 168, 76, 0.22), transparent 42%), linear-gradient(180deg, rgba(10,9,8,0.35), rgba(10,9,8,0.9));
          z-index: -1;
        }
        .audience-col:hover {
          transform: translateY(-6px) !important;
          border-color: rgba(201,168,76,0.72) !important;
          box-shadow: 0 26px 74px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.12) !important;
        }
        .audience-col:hover::before {
          opacity: 0.36;
          transform: scale(1.06);
        }
        .audience .divider {
          display: none !important;
        }
        .audience-kicker {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--white-faint);
          font-weight: 400;
          margin-bottom: 20px;
        }
        .audience-col .num {
          font-size: clamp(72px, 7vw, 102px) !important;
          margin-bottom: 18px !important;
          color: rgba(201,168,76,0.92) !important;
          text-shadow: 0 0 30px rgba(201,168,76,0.15);
        }
        .audience-col h2 {
          color: var(--white) !important;
          font-size: clamp(34px, 3.1vw, 46px) !important;
          margin-bottom: 16px !important;
          line-height: 1.05 !important;
        }
        .audience-col p {
          color: var(--white-dim) !important;
          font-size: 17px !important;
          line-height: 1.78 !important;
          margin-bottom: 28px !important;
          max-width: 46ch !important;
        }
        .audience-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
        }
        .audience-tag {
          border: 1px solid rgba(255,255,255,0.22);
          color: var(--white);
          background: rgba(255,255,255,0.06);
          border-radius: 999px;
          padding: 9px 12px;
          font-size: 11px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          font-weight: 500;
          backdrop-filter: blur(3px);
        }
        .audience-btn {
          margin-top: auto;
          width: fit-content;
          min-height: 48px;
        }
        .audience-top-bar {
          width: 76px;
          height: 1px;
          background: linear-gradient(to right, var(--gold), rgba(201,168,76,0.08));
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .audience {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            padding: 48px var(--pad) !important;
          }
          .audience-col {
            padding: 40px 24px !important;
            min-height: auto !important;
          }
          .audience-col .num {
            font-size: clamp(64px, 18vw, 88px) !important;
          }
          .audience-col h2 {
            font-size: clamp(30px, 9vw, 40px) !important;
          }
          .audience-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* Homeowners */}
      <div className="audience-col ac-home" style={homeCardStyle}>
        <div className="audience-top-bar" />
        <div className="audience-kicker">Residential</div>
        <div className="num">01</div>
        <h2>Homeowners &amp;<br />Renovators</h2>
        <p>
          Whether you&apos;re tackling it yourself or working with a contractor, we handle every design decision and source every material so your project starts with a clear plan and the right products in hand.
        </p>
        <div className="audience-tags">
          {["Free Consultation", "Design Included", "All Materials Sourced"].map((tag) => (
            <span key={tag} className="audience-tag">{tag}</span>
          ))}
        </div>
        <a className="btn btn-solid audience-btn pulse-shimmer-btn" href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
          Book a Free Consultation
        </a>
      </div>

      <div className="divider" />

      {/* Builders */}
      <div className="audience-col ac-trade" style={tradeCardStyle}>
        <div className="audience-top-bar" />
        <div className="audience-kicker">Trade Partner</div>
        <div className="num">02</div>
        <h2>Builders &amp;<br />Contractors</h2>
        <p>
          Bring your clients to our showroom. We handle the design, specification, and material supply. You stay focused on the build. Trade pricing, reliable lead times, and a team that speaks your language.
        </p>
        <div className="audience-tags">
          {["Trade Pricing", "Fast Lead Times", "Dedicated Rep"].map((tag) => (
            <span key={tag} className="audience-tag">{tag}</span>
          ))}
        </div>
        <a className="btn btn-outline-gold audience-btn" href={TRADE_URL} target="_blank" rel="noopener noreferrer">
          Partner with Us
        </a>
      </div>

    </section>
  );
}
