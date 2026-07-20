/* Hero section entrance animations and subtle glow effects */

import { gsap } from "./animationRuntime";

export const initHeroAnimations = () => {
  const heroVideo = document.querySelector(".hero-video video");
  const mobileMode = window.matchMedia("(max-width: 768px)").matches;

  /* ==========================
   HERO CINEMATIC EXPERIENCE
========================== */

  const heroTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",

      start: "top top",

      end: () => `+=${window.innerHeight}`,

      scrub: 1,

      pin: true,

      pinSpacing: false,

      anticipatePin: 1,

      invalidateOnRefresh: true,
      onLeave: () => heroVideo?.pause(),
      onEnterBack: () => heroVideo?.play().catch(() => {}),
    },
  });

  heroTL

    .to(
      ".hero-video video",
      {
        scale: mobileMode ? 1.12 : 1.25,

        filter: mobileMode ? "brightness(0.62)" : "brightness(0.45)",

        ease: "none",
      },
      0,
    )

    .to(
      ".hero-overlay",
      {
        backgroundColor: "rgba(0, 0, 0, 0.72)",

        ease: "none",
      },
      0,
    );

  /* ==========================
   HERO LOAD REVEAL
========================== */

  gsap.from(".hero-title", {
    y: 120,

    opacity: 0,

    letterSpacing: "50px",

    duration: 1.5,

    delay: 0.5,

    ease: "power4.out",

    onComplete: () =>
      gsap.set(".hero-title", {
        clearProps: "transform,opacity,letterSpacing",
      }),
  });

  gsap.from(".hero-subtitle", {
    y: 60,

    opacity: 0,

    duration: 1.3,

    delay: 0.8,

    ease: "power3.out",

    onComplete: () =>
      gsap.set(".hero-subtitle", { clearProps: "transform,opacity" }),
  });

  gsap.to(".scroll", {
    y: 9,
    opacity: 0.42,
    duration: 1.1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
};
