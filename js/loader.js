/* Cinematic splash, kept to compositor-only properties during the zoom. */

import { gsap } from "./animationRuntime";

export const initLoader = (onComplete) => {
  const mobileMode = window.matchMedia(
    "(max-width: 768px), (pointer: coarse)",
  ).matches;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const loaderText = document.querySelector(".loader-text");

  const loaderTL = gsap.timeline({ onComplete });

  loaderTL
    .from(loaderText, {
      scale: reducedMotion ? 0.86 : mobileMode ? 0.56 : 0.3,
      opacity: 0,
      duration: reducedMotion ? 0.45 : 1.15,
      force3D: true,
      ease: "power4.out",
    })
    .from(
      ".loader-subtext",
      {
        y: 30,
        opacity: 0,
        duration: reducedMotion ? 0.35 : 0.75,
        force3D: true,
        ease: "power3.out",
      },
      "-=0.55",
    )
    .to(loaderText, {
      scale: 1.04,
      duration: reducedMotion ? 0.2 : 0.55,
      force3D: true,
      ease: "power2.out",
    })
    .to(".loader-subtext", {
      opacity: 0,
      y: -24,
      duration: reducedMotion ? 0.2 : 0.45,
      force3D: true,
    })
    .call(() => {
      loaderText.classList.add("is-zooming");
      loaderText.closest(".loader")?.classList.add("loader-zooming");
    })
    .to(loaderText, {
      scale: reducedMotion ? 1.1 : mobileMode ? 3.4 : 6,
      opacity: 0,
      duration: reducedMotion ? 0.25 : 0.78,
      force3D: true,
      ease: "power3.in",
    })
    .to(".loader", { opacity: 0, duration: 0.34 }, "-=0.24")
    .to(".hero", { opacity: 1, duration: 0.55 }, "-=0.38")
    .set(".loader", { display: "none" });

  return loaderTL;
};
