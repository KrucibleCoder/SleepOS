import { initLoader } from "./loader.js";
import { initLogoAnimation } from "./logoAnimation.js";
import { initHeroAnimations } from "./heroAnimations.js";
import { initSectionAnimations } from "./sectionAnimations.js";
import { initFeatureSection } from "./featureSection.js";
import { initLayerShowcase } from "./layerShowcase.js";
import { initCatalogue } from "./catalogue.js";
import { initTechSection } from "./techSection.js";
import { initPageAnimations } from "./pageAnimations.js";
import { initCursor } from "./cursor.js";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

// 🔧 FIX: sync Lenis with GSAP's ticker + ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

window.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initLogoAnimation();
  initHeroAnimations();
  initSectionAnimations();
  initFeatureSection();
  initLayerShowcase();
  initCatalogue();
  initTechSection();
  initPageAnimations();
  initCursor();
});

// 🔧 FIX: recalc ScrollTrigger positions once everything (images/fonts) has loaded
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});