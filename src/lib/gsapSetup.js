import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ensureGsapPlugins() {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
  return { gsap, ScrollTrigger };
}
