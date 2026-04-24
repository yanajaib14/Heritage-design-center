"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const interests = [
  "Kitchen Design",
  "Bath Design",
  "Full Renovation",
  "Space Planning",
  "Material Consultation",
  "3D Visualization",
];

const budgets = [
  "$50k – $100k",
  "$100k – $200k",
  "$200k – $400k",
  "$400k+",
  "Not sure yet",
];

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (heroRef.current) {
        tl.fromTo(
          heroRef.current.querySelectorAll(".hero-item"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.9 },
          0.3
        );
      }

      if (formRef.current) {
        gsap.fromTo(
          formRef.current.querySelectorAll(".form-field"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.07,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: formRef.current, start: "top 80%" },
          }
        );
      }

      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current.querySelectorAll(".info-item"),
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: { trigger: infoRef.current, start: "top 80%" },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gsap.to(formRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setSubmitted(true),
    });
  };

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-20 md:pt-52 md:pb-28 px-8 md:px-16 bg-charcoal overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1800&q=60"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="hero-item text-label text-gold mb-5 opacity-0">Get in Touch</p>
          <h1 className="hero-item font-display text-display-lg text-warm-white mb-6 opacity-0">
            Begin Your<br />
            <em>Project</em>
          </h1>
          <p className="hero-item text-stone max-w-md leading-relaxed opacity-0">
            Every extraordinary space begins with a single conversation. Tell us about your project and we will reach out within one business day.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-32 px-8 md:px-16 bg-warm-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-20">
          {/* Form */}
          <div className="md:col-span-7">
            {submitted ? (
              <div className="py-16">
                <div className="w-12 h-[1px] bg-gold mb-8" />
                <h2 className="font-display text-4xl text-charcoal mb-4">
                  Thank you.
                </h2>
                <p className="text-stone leading-relaxed max-w-sm">
                  We have received your message and will be in touch within one business day. We look forward to learning more about your project.
                </p>
                <p className="text-label text-gold mt-8">Heritage Design Center</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {/* Name row */}
                <div className="form-field grid sm:grid-cols-2 gap-6 opacity-0">
                  <div>
                    <label className="text-label text-stone block mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Margaret"
                      className="w-full border-b border-light-stone bg-transparent py-3 text-charcoal placeholder:text-stone/40 focus:outline-none focus:border-gold transition-colors duration-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-label text-stone block mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ashford"
                      className="w-full border-b border-light-stone bg-transparent py-3 text-charcoal placeholder:text-stone/40 focus:outline-none focus:border-gold transition-colors duration-300 text-sm"
                    />
                  </div>
                </div>

                {/* Contact row */}
                <div className="form-field grid sm:grid-cols-2 gap-6 opacity-0">
                  <div>
                    <label className="text-label text-stone block mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full border-b border-light-stone bg-transparent py-3 text-charcoal placeholder:text-stone/40 focus:outline-none focus:border-gold transition-colors duration-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-label text-stone block mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 (312) 555-0000"
                      className="w-full border-b border-light-stone bg-transparent py-3 text-charcoal placeholder:text-stone/40 focus:outline-none focus:border-gold transition-colors duration-300 text-sm"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="form-field opacity-0">
                  <label className="text-label text-stone block mb-2">Project Location</label>
                  <input
                    type="text"
                    placeholder="City, State"
                    className="w-full border-b border-light-stone bg-transparent py-3 text-charcoal placeholder:text-stone/40 focus:outline-none focus:border-gold transition-colors duration-300 text-sm"
                  />
                </div>

                {/* Interests */}
                <div className="form-field opacity-0">
                  <label className="text-label text-stone block mb-4">I am Interested In</label>
                  <div className="flex flex-wrap gap-3">
                    {interests.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 text-label border transition-all duration-300 ${
                          selectedInterests.includes(interest)
                            ? "bg-charcoal text-warm-white border-charcoal"
                            : "bg-transparent text-stone border-light-stone hover:border-stone"
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="form-field opacity-0">
                  <label className="text-label text-stone block mb-4">Approximate Budget</label>
                  <div className="flex flex-wrap gap-3">
                    {budgets.map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => setSelectedBudget(budget)}
                        className={`px-4 py-2 text-label border transition-all duration-300 ${
                          selectedBudget === budget
                            ? "bg-charcoal text-warm-white border-charcoal"
                            : "bg-transparent text-stone border-light-stone hover:border-stone"
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="form-field opacity-0">
                  <label className="text-label text-stone block mb-2">Tell Us About Your Project</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your vision, timeline, or any specific requirements..."
                    className="w-full border-b border-light-stone bg-transparent py-3 text-charcoal placeholder:text-stone/40 focus:outline-none focus:border-gold transition-colors duration-300 text-sm resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="form-field opacity-0">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 bg-charcoal text-warm-white px-10 py-4 text-label hover:bg-gold transition-all duration-500 magnetic-btn"
                  >
                    Send Message
                    <span>→</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Studio Info */}
          <div ref={infoRef} className="md:col-span-4 md:col-start-9">
            <div className="space-y-10">
              <div className="info-item opacity-0">
                <p className="text-label text-gold mb-3">Studio Address</p>
                <address className="not-italic text-charcoal/80 text-sm leading-relaxed space-y-1">
                  <p>340 N Michigan Avenue</p>
                  <p>Suite 1200</p>
                  <p>Chicago, Illinois 60601</p>
                </address>
              </div>

              <div className="info-item opacity-0">
                <p className="text-label text-gold mb-3">Contact</p>
                <div className="space-y-2">
                  <a href="tel:+13125550142" className="block text-charcoal/80 text-sm hover:text-gold transition-colors duration-300 nav-link">
                    +1 (312) 555-0142
                  </a>
                  <a href="mailto:hello@heritagedesign.com" className="block text-charcoal/80 text-sm hover:text-gold transition-colors duration-300 nav-link">
                    hello@heritagedesign.com
                  </a>
                </div>
              </div>

              <div className="info-item opacity-0">
                <p className="text-label text-gold mb-3">Hours</p>
                <div className="space-y-1 text-sm text-charcoal/70">
                  <p>Monday – Friday: 9:00am – 6:00pm</p>
                  <p>Saturday: By appointment</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="info-item opacity-0 pt-8 border-t border-light-stone">
                <p className="text-label text-stone mb-4">Typical Response</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-stone text-sm">Initial Response</span>
                    <span className="font-display text-charcoal">1 day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone text-sm">Discovery Call</span>
                    <span className="font-display text-charcoal">1 week</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone text-sm">Design Proposal</span>
                    <span className="font-display text-charcoal">2–3 weeks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
