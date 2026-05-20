"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";
const PHONE_URL = "tel:3605573441";

export default function LeadCapture() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".eyebrow, h2, .sub, .lead-grid > *"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 78%" } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="lead" id="lead" ref={sectionRef}>
      <span className="eyebrow">Get Started</span>
      <h2>
        Let&apos;s Design Something{" "}
        <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>Beautiful.</em>
      </h2>
      <p className="sub">
        Book a free consultation or send us a message - we respond within 24 - 48 hours.
      </p>

      <div className="lead-grid">
        <div className="lead-col">
          <h3>Pick a Time That Works</h3>
          <p>
            Free 30-minute consultation — no commitment required. We&apos;ll talk through your project, your timeline, and the materials that fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a className="btn btn-solid" href={SCHEDULE_URL} target="_blank" rel="noopener">
              Schedule Appointment
            </a>
            <a className="btn btn-ghost" href={PHONE_URL}>
              Call Us (360) 557-3441
            </a>
          </div>
        </div>

        <div className="divider" />

        <div className="lead-col">
          <h3>Send Us a Message</h3>
          <p>Prefer to write? Drop us a note and we&apos;ll follow up with next steps.</p>
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
