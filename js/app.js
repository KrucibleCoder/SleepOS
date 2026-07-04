import { initLoader } from "./loader.js";
import { initLogoAnimation } from "./logoAnimation.js";
import { initHeroAnimations } from "./heroAnimations.js";
import { initSectionAnimations } from "./sectionAnimations.js";
import { initFeatureSection } from "./featureSection.js";
import { initLayerShowcase } from "./layerShowcase.js";
import { initCatalogue } from "./catalogue.js";
import { initTechSection } from "./techSection.js";
import { initPageAnimations } from "./pageAnimations.js";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

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
});
