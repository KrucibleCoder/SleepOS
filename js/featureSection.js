import { fadeSwapImage } from "./shared.js";

/* Feature section reveal and image swap logic */

export const initFeatureSection = () => {
  const featurePanels = gsap.utils.toArray(".feature-panel");
  const mattressImage = document.getElementById("mattressImage");

  featurePanels.forEach((panel) => {
    gsap.from(panel, {
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger: panel,
        start: "top 70%",
        end: "top 30%",
        scrub: true,
      },
    });
  });

  if (!mattressImage) {
    return;
  }

  featurePanels.forEach((panel) => {
    ScrollTrigger.create({
      trigger: panel,
      start: "top center",
      onEnter: () => fadeSwapImage(mattressImage, panel.dataset.image),
      onEnterBack: () => fadeSwapImage(mattressImage, panel.dataset.image),
    });
  });
};
