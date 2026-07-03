import { fadeSwapImage } from "./shared.js";

/* Technology section image update on panel scroll */

export const initTechSection = () => {
  const techImage = document.getElementById("techImage");
  if (!techImage) {
    return;
  }

  document.querySelectorAll(".tech-panel").forEach((panel) => {
    ScrollTrigger.create({
      trigger: panel,
      start: "top center",
      onEnter: () => fadeSwapImage(techImage, panel.dataset.image),
      onEnterBack: () => fadeSwapImage(techImage, panel.dataset.image),
    });
  });
};
