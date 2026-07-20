import { fadeSwapImage } from "./shared.js";
import { gsap, ScrollTrigger } from "./animationRuntime";

/* Technology section image update on panel scroll */

export const initTechSection = () => {
  const mobileMode = window.matchMedia("(max-width: 768px)").matches;
  const techImage = document.getElementById("techImage");
  if (!techImage) {
    return;
  }

  document.querySelectorAll(".tech-panel").forEach((panel) => {
    gsap.from(panel.querySelectorAll("h2, p"), {
      y: 65,
      opacity: 0,
      filter: mobileMode ? "blur(0px)" : "blur(8px)",
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: panel,
        start: "top 72%",
        end: "top 42%",
        scrub: true,
      },
    });

    ScrollTrigger.create({
      trigger: panel,
      start: "top center",
      onEnter: () => fadeSwapImage(techImage, panel.dataset.image),
      onEnterBack: () => fadeSwapImage(techImage, panel.dataset.image),
    });
  });
};
