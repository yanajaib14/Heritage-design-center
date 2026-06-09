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
    
    // Mobile performance rule: do not register heavy scroll reveal animations on touch devices
    if (ScrollTrigger.isTouch === 1) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".lc-reveal"),
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: el, 
            start: "top 78%",
            once: true
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="lc-section-blend" id="lead" ref={sectionRef}>
      {/* Decorative top accent line */}
      <div className="lc-top-accent" />

      <div className="lc-inner">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Text & Location Strip */}
          <div className="lg:col-span-7 flex flex-col justify-center lc-reveal">
            <span className="eyebrow mb-6 tracking-widest block text-[var(--gold)]">
              Get Started
            </span>
            <h2 className="lc-editorial-title">
              Ready to Build<br />
              <span className="italic text-[var(--gold)] font-light">Something Beautiful?</span>
            </h2>
            <p className="text-[var(--text-mid)] text-base md:text-lg font-light max-w-xl leading-relaxed mb-8">
              Book a free consultation to discuss your vision, visit our showroom to experience materials in person, or send us a message below. We respond within 24 hours.
            </p>

            {/* Location strip */}
            <div className="lc-location-strip">
              <div className="lc-location-item">
                <h4>Address</h4>
                <p className="font-light">
                  <a href="https://maps.google.com/?q=8695+Martin+Way+E+Lacey+WA" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors duration-200">
                    8695 Martin Way E #101<br />
                    Lacey, WA 98516
                  </a>
                </p>
              </div>
              <div className="lc-location-item">
                <h4>Hours</h4>
                <p className="font-light">
                  Mon – Fri: 9:00 AM – 5:30 PM<br />
                  Sat: By appointment only
                </p>
              </div>
              <div className="lc-location-item">
                <h4>Contact</h4>
                <p className="font-light">
                  <a href="tel:3605573441" className="hover:text-[var(--gold)] transition-colors duration-200">
                    (360) 557-3441
                  </a><br />
                  <a href="mailto:showroom@heritagedesignctr.com" className="hover:text-[var(--gold)] transition-colors duration-200">
                    showroom@heritagedesignctr.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Card overlaying Watermark */}
          <div className="lg:col-span-5 relative lc-watermark-container lc-reveal">
            {/* Giant decorative watermark */}
            <div className="lc-watermark">Heritage</div>

            {/* Booking Card */}
            <div className="lc-booking-card">
              <span className="text-[var(--gold)] font-mono text-xs uppercase tracking-widest block mb-3">
                01 / Appointment
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-white mb-4">
                Book a Consultation
              </h3>
              <p className="text-[var(--white-dim)] font-light text-sm md:text-base mb-6 leading-relaxed">
                Free 30-minute consultation with a designer. We&apos;ll walk through your project requirements, options, and estimated timeline.
              </p>
              
              <ul className="flex flex-col gap-3 mb-8 border-t border-b border-[rgba(255,255,255,0.08)] py-5 text-sm text-[var(--white-dim)] font-light">
                <li className="flex items-center gap-3">
                  <span className="text-[var(--gold)] text-lg">✓</span> Free &amp; no commitment
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--gold)] text-lg">✓</span> In-person showroom or phone call
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--gold)] text-lg">✓</span> Same-week bookings available
                </li>
              </ul>

              <a 
                className="btn btn-solid pulse-shimmer-btn w-full text-center py-4" 
                href={SCHEDULE_URL} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Schedule Now
              </a>

              <div className="text-center mt-6">
                <a 
                  href="#honeybook-form" 
                  className="text-xs tracking-wider uppercase text-[var(--gold)] hover:text-white transition-colors duration-200 border-b border-[var(--gold-border)] pb-0.5"
                >
                  Or send us a message
                </a>
              </div>
            </div>
          </div>


        </div>

        {/* HoneyBook message widget */}
        <div id="honeybook-form" className="mt-20 border-t border-[var(--gold-border)] pt-16 max-w-4xl mx-auto lc-reveal">
          <div className="text-center mb-10">
            <span className="eyebrow">Direct Message</span>
            <h3 className="font-display text-2xl md:text-3xl mt-2 text-[var(--text)]">
              Send Us a Message
            </h3>
            <p className="text-[var(--text-dim)] font-light mt-2 max-w-lg mx-auto">
              Prefer to email or send project specs? Drop us a note here and we will follow up with next steps.
            </p>
          </div>
          <div className="hb-widget-wrap bg-white p-4 md:p-8 border border-[var(--gold-border)] shadow-sm">
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
