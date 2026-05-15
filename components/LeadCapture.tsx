"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";

export default function LeadCapture() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".lc-reveal"),
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.13, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 75%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="lc-section" id="lead" ref={sectionRef}>

      {/* Decorative top border */}
      <div className="lc-top-accent" />

      <div className="lc-inner">

        {/* Header */}
        <div className="lc-header">
          <div className="section-eyebrow-row lc-reveal" style={{ opacity: 0, justifyContent: "center" }}>
            <div className="section-rule" />
            <span className="eyebrow">Get Started</span>
            <div className="section-rule" />
          </div>
          <h2 className="lc-heading lc-reveal" style={{ opacity: 0 }}>
            Ready to Build<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>Something Beautiful?</em>
          </h2>
          <p className="lc-sub lc-reveal" style={{ opacity: 0 }}>
            Book a free appointment or send us a message — we respond within 24 hours.
          </p>
        </div>

        {/* Two columns */}
        <div className="lc-grid lc-reveal" style={{ opacity: 0 }}>

          {/* Schedule */}
          <div className="lc-card lc-card-primary">
            <span className="lc-card-num">01</span>
            <h3 className="lc-card-title">Book an Appointment</h3>
            <p className="lc-card-body">
              Free 30-minute consultation, no commitment required. We&apos;ll walk through your project, timeline, and the materials that fit your vision.
            </p>
            <ul className="lc-card-checklist">
              {["Free & no commitment", "In-person or phone", "Same-week availability"].map((item) => (
                <li key={item}>
                  <span className="lc-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a className="btn btn-solid lc-btn" href={SCHEDULE_URL} target="_blank" rel="noopener">
              Schedule Now
            </a>
          </div>

          {/* HoneyBook */}
          <div className="lc-card lc-card-secondary">
            <span className="lc-card-num">02</span>
            <h3 className="lc-card-title">Send a Message</h3>
            <p className="lc-card-body">
              Prefer to write? Drop us a note with your project details and we&apos;ll follow up with next steps within 24 hours.
            </p>
            <div className="hb-widget-wrap">
              <div className="hb-p-698386a789407f0007b175e0-7" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src="https://www.honeybook.com/p.png?pid=698386a789407f0007b175e0"
                alt=""
              />
            </div>
          </div>

        </div>
      </div>

      <Script id="honeybook-widget" strategy="afterInteractive">{`
        (function(h,b,s,n,i,p,e,t) {
          h._HB_ = h._HB_ || {};h._HB_.pid = i;
          t=b.createElement(s);t.type="text/javascript";t.async=!0;t.src=n;
          e=b.getElementsByTagName(s)[0];e.parentNode.insertBefore(t,e);
        })(window,document,"script","https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js","698386a789407f0007b175e0");
      `}</Script>
    </section>
  );
}
