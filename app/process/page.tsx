"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";
const TRADE_URL = "https://10daykitchens.hbportal.co/public/69f50cd056cf56fd0dd4c172";

const steps = [
  {
    num: "01",
    title: "Book a Free Consultation",
    badge: "30–60 min · Free · No commitment",
    body: "Schedule your appointment online or give us a call. We block 30 to 60 minutes to hear about your project, your timeline, and what you want your space to feel like. Come with inspiration photos and rough dimensions — or come with nothing at all. We know how to get a project started.",
    tags: ["Online scheduling", "By phone", "In person at the showroom"],
  },
  {
    num: "02",
    title: "Visit Our Showroom",
    badge: "60–90 min · Lacey, WA",
    body: "Come in and experience materials in person — full-size cabinetry displays, stone slabs, tile walls, and hardware in every finish, all under one roof. Our designers walk you through every option so you can touch, compare, and decide with confidence. This is not a sales presentation. It is a focused discovery session built around your project.",
    tags: ["Full cabinetry displays", "Stone & tile samples", "Hardware finish wall", "Designer-guided walkthrough"],
  },
  {
    num: "03",
    title: "We Handle the Design",
    badge: "1–2 weeks · Builder-ready output",
    body: "Our team produces full floor plans, wall elevations, and a complete material specification for your project. Every dimension is measured, every material selected, and every detail resolved before anything is ordered. What you receive is a builder-ready document package your contractor can execute without a single question left unanswered.",
    tags: ["Floor plans & layouts", "Elevation drawings", "Full material spec", "3D visualization"],
  },
  {
    num: "04",
    title: "We Supply Everything",
    badge: "4–8 weeks · Coordinated delivery",
    body: "From cabinetry to countertops to the last piece of hardware, we source, coordinate, and deliver every specified material. One vendor. One contact. One delivery schedule coordinated directly with your contractor so the right materials arrive at the right time — and nothing falls through the cracks.",
    tags: ["Cabinetry & countertops", "Tile & stone", "Fixtures & hardware", "Job-site delivery"],
  },
];

const deliverables = [
  {
    num: "I",
    title: "Floor Plan & Layout",
    body: "A dimensioned overhead drawing showing cabinet placement, appliance locations, island sizing, and traffic flow for every room in scope.",
  },
  {
    num: "II",
    title: "Elevation Drawings",
    body: "Full wall elevations for every cabinet run, showing exact door heights, filler positions, and stacking configurations.",
  },
  {
    num: "III",
    title: "Material Specification Sheet",
    body: "A complete line-item list of every product by SKU, finish, dimensions, and quantity. Your contractor's complete reference document.",
  },
  {
    num: "IV",
    title: "3D Layout Visualization",
    body: "A rendered three-dimensional view of the finished space so you can see how everything fits and feels before a single item is ordered.",
  },
  {
    num: "V",
    title: "In-Showroom Sample Board",
    body: "A curated set of physical samples — stone, tile, hardware finishes — assembled to represent your approved material palette.",
  },
  {
    num: "VI",
    title: "Delivery Schedule",
    body: "A coordinated delivery timeline tied to your contractor's project schedule, so materials arrive in sequence and on time.",
  },
];

const faqs = [
  {
    q: "Do I need a contractor before my first visit?",
    a: "No. Many of our clients visit Heritage before they have hired a contractor. We handle the design and full material specification first, then you bring that package to your builder. We can also connect you with trusted local contractors who are familiar with our process.",
  },
  {
    q: "How long does the full process take?",
    a: "Most projects move from the first consultation to material delivery in 8 to 12 weeks. Cabinetry typically carries a 4 to 6 week lead time after order confirmation. Countertops and tile are usually 1 to 3 weeks depending on in-stock availability. We will give you specific lead times during the design phase.",
  },
  {
    q: "Can I purchase materials without going through the design process?",
    a: "Yes. If you already have a designer or a complete spec sheet, we can supply any of the materials we carry. Just bring your measurements, SKUs, or material list and we will quote and order from there.",
  },
  {
    q: "Do you produce 3D renderings of the finished space?",
    a: "Yes. As part of the design deliverables we produce 3D layout visualizations so you can see the space before anything is ordered. Changes on screen cost nothing. Changes after delivery cost significantly more.",
  },
  {
    q: "How does delivery work?",
    a: "We coordinate delivery directly with your contractor to the job site. We manage all logistics and build the delivery schedule around your project timeline, so the right materials arrive in the right sequence without staging delays.",
  },
  {
    q: "What if I am already working with my own interior designer?",
    a: "We work alongside other designers regularly. If your designer has a concept or a material board, we can source and supply those materials — or we can provide detailed drawings and specifications that complement their work. We are flexible and happy to play whatever role is most useful.",
  },
];

export default function ProcessPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const deliversRef = useRef<HTMLDivElement>(null);
  const audienceRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (ScrollTrigger.isTouch === 1) {
      gsap.set(".h-item, .proc-stat-item, .proc-entry, .proc-deliver-item, .audience-two-col-item, .faq-item", { opacity: 1, y: 0, x: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".h-item"),
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.13, duration: 1, ease: "power3.out", delay: 0.3 }
        );
      }

      // Stats bar
      gsap.fromTo(
        ".proc-stat-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".proc-stats", start: "top 88%" } }
      );

      // Timeline entries
      if (stepsRef.current) {
        stepsRef.current.querySelectorAll(".proc-entry").forEach((entry, i) => {
          gsap.fromTo(entry,
            { x: -24, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
              scrollTrigger: { trigger: entry, start: "top 82%" }, delay: i * 0.06 }
          );
        });
      }

      // Deliverables
      if (deliversRef.current) {
        gsap.fromTo(
          deliversRef.current.querySelectorAll(".proc-deliver-item"),
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: deliversRef.current, start: "top 78%" } }
        );
      }

      // Audience
      if (audienceRef.current) {
        gsap.fromTo(
          audienceRef.current.querySelectorAll(".audience-two-col-item"),
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: audienceRef.current, start: "top 78%" } }
        );
      }

      // FAQ
      if (faqRef.current) {
        gsap.fromTo(
          faqRef.current.querySelectorAll(".faq-item"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: faqRef.current, start: "top 80%" } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <NavBar />

      {/* ── Hero ── */}
      <section className="page-hero">
        <div
          className="page-hero-bg"
          style={{ backgroundImage: "url('https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/561695ba-8683-4348-93fb-4067502ac4e9/Design+Review+Meeting.png?content-type=image%2Fpng')" }}
        />
        <div className="page-hero-overlay" aria-hidden="true" />
        <div className="page-hero-inner" ref={heroRef}>
          <span className="eyebrow h-item" style={{ opacity: 0 }}>How It Works</span>
          <h1 className="h-item" style={{ opacity: 0 }}>
            The Heritage<br />
            <em>Process</em>
          </h1>
          <p className="page-hero-sub h-item" style={{ opacity: 0 }}>
            Whether you&apos;re a homeowner with a vision or a builder who needs a trusted design-and-supply partner — we make the path from first idea to finished space as clear and smooth as possible.
          </p>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="proc-stats">
        <div className="proc-stats-inner">
          {[
            { val: "Free", label: "Initial Consultation" },
            { val: "4–8 wk", label: "Typical Delivery Window" },
            { val: "1", label: "Partner for Design & Supply" },
            { val: "100%", label: "Materials Coordinated by Us" },
          ].map(({ val, label }) => (
            <div key={label} className="proc-stat-item">
              <div className="proc-stat-val">{val}</div>
              <div className="proc-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Editorial timeline ── */}
      <section style={{ padding: "clamp(80px, 10vw, 128px) var(--pad)", background: "var(--bg)" }}>
        <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
          <div className="section-eyebrow-row">
            <div className="section-rule" />
            <span className="eyebrow">Four Steps</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 60px)", fontWeight: 500, marginBottom: "0", maxWidth: "16ch" }}>
            From First Call to{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>Last Delivery.</em>
          </h2>

          <div ref={stepsRef} style={{ marginTop: "72px" }}>
            {steps.map(({ num, title, badge, body, tags }) => (
              <div key={num} className="proc-entry">
                <div className="proc-entry-num">{num}</div>
                <div className="proc-entry-divider" />
                <div className="proc-entry-content">
                  <div className="proc-entry-header">
                    <h3 className="proc-entry-title">{title}</h3>
                    <span className="proc-time-badge">{badge}</span>
                  </div>
                  <p className="proc-entry-body">{body}</p>
                  <div className="proc-entry-tags">
                    {tags.map((t) => (
                      <span key={t} className="proc-entry-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You'll Receive ── */}
      <section className="proc-delivers">
        <div className="proc-delivers-inner" ref={deliversRef}>
          <div className="section-eyebrow-row">
            <div className="section-rule" />
            <span className="eyebrow">Design Deliverables</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 60px)", fontWeight: 500, marginBottom: "8px" }}>
            What You&apos;ll{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>Receive.</em>
          </h2>
          <p style={{ color: "var(--text-dim)", fontSize: "17px", lineHeight: 1.75, fontWeight: 300, maxWidth: "540px", marginTop: "16px" }}>
            Every project produces a complete, builder-ready documentation package. Here is exactly what that includes.
          </p>
          <div className="proc-delivers-grid">
            {deliverables.map(({ num, title, body }) => (
              <div key={num} className="proc-deliver-item">
                <span className="proc-deliver-num">{num}</span>
                <h3 className="proc-deliver-title">{title}</h3>
                <p className="proc-deliver-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Homeowner vs Builder ── */}
      <section style={{ background: "var(--bg)", padding: "clamp(80px, 10vw, 128px) var(--pad)", borderTop: "1px solid var(--gold-border)", borderBottom: "1px solid var(--gold-border)" }}>
        <div style={{ maxWidth: "var(--max)", margin: "0 auto" }} ref={audienceRef}>
          <div className="section-eyebrow-row">
            <div className="section-rule" />
            <span className="eyebrow">Who We Serve</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 500, marginBottom: "48px" }}>
            The Right Experience{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>for Everyone.</em>
          </h2>
          <div className="audience-two-col">
            <div className="audience-two-col-item">
              <span className="eyebrow">Homeowners</span>
              <h3>Your Dream Space,<br /><em>Designed with You.</em></h3>
              <p>
                You have a vision — we help you find the materials that bring it to life. Whether you&apos;re renovating a kitchen, remodeling a bath, or building from scratch, our designers sit with you at every step. No guesswork. No surprises.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column", gap: "14px", borderTop: "1px solid var(--gold-border)", paddingTop: "24px" }}>
                {[
                  "Free 30–60 min consultation",
                  "Full in-showroom material selection",
                  "Floor plans, elevations & 3D layouts",
                  "Complete material specification",
                  "Coordinated delivery to your contractor",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", gap: "16px", alignItems: "flex-start", fontSize: "15px", color: "var(--text)", fontWeight: 400 }}>
                    <span style={{ color: "var(--gold)", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "20px", lineHeight: 1, flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a className="btn btn-solid" href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                Schedule Your Consultation
              </a>
            </div>
            <div className="audience-two-col-item" style={{ background: "var(--bg-surface)" }}>
              <span className="eyebrow">Builders &amp; Contractors</span>
              <h3>A Design Partner You<br /><em>Can Count On.</em></h3>
              <p>
                We work directly with builders and contractors to simplify the design and supply chain. Bring us your client early — we handle the selections, produce the spec sheet, and deliver everything on schedule so your job site never waits on materials.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column", gap: "14px", borderTop: "1px solid var(--gold-border)", paddingTop: "24px" }}>
                {[
                  "Trade partnership program",
                  "Full design & material specification",
                  "Single-vendor supply coordination",
                  "Builder-ready documentation package",
                  "Reliable job-site delivery scheduling",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", gap: "16px", alignItems: "flex-start", fontSize: "15px", color: "var(--text)", fontWeight: 400 }}>
                    <span style={{ color: "var(--gold)", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "20px", lineHeight: 1, flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a className="btn btn-outline-gold" href={TRADE_URL} target="_blank" rel="noopener noreferrer">
                Become a Trade Partner
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "var(--bg-surface)", padding: "clamp(80px, 10vw, 128px) var(--pad)", borderBottom: "1px solid var(--gold-border)" }}>
        <div ref={faqRef} className="faq-wrap">
          <div className="section-eyebrow-row">
            <div className="section-rule" />
            <span className="eyebrow">Common Questions</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 500, marginBottom: "56px" }}>
            Frequently<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>Asked.</em>
          </h2>
          <div>
            {faqs.map(({ q, a }, i) => (
              <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="faq-q-text">{q}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">{a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta-section">
        <div className="page-cta-watermark" aria-hidden="true">Process</div>
        <div className="page-cta-content">
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: 20 }}>Get Started Today</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.03em", color: "var(--white)", margin: "0 0 28px" }}>
              Let&apos;s Begin<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Your Project.</em>
            </h2>
            <p style={{ color: "var(--white-dim)", fontSize: 18, lineHeight: 1.75, fontWeight: 400, maxWidth: 460, margin: 0 }}>
              A free consultation is all it takes. No pressure, no commitment — just a conversation about your project and how we can help.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 220 }}>
            <a className="btn btn-solid pulse-shimmer-btn" href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              Book a Free Consultation
            </a>
            <Link href="/showroom" className="btn btn-outline-gold" style={{ color: "var(--white-dim)", borderColor: "var(--gold-border-strong)" }}>
              Visit Our Showroom
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
