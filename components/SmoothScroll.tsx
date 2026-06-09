"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll — mounts Lenis smooth-wheel scroll and keeps GSAP ScrollTrigger
 * in sync so position-based triggers fire at the correct moment.
 * Mobile / touch devices use native momentum scroll (smoothTouch: false default).
 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Keep GSAP ScrollTrigger positions in sync with Lenis
    lenis.on("scroll", () => ScrollTrigger.update());

    // Drive Lenis from GSAP's ticker so everything runs at the same frame rate
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", () => ScrollTrigger.update());
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
