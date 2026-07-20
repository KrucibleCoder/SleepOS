/* Section entrance and scroll animations for SleepOS */

import { gsap, ScrollTrigger } from "./animationRuntime";

export const initSectionAnimations = () => {
  /* ==========================
     INTRO SECTION ENTRANCE
  ========================== */

  gsap.fromTo(
    ".intro",
    {
      borderRadius: "48px 48px 0 0",
    },
    {
      borderRadius: "0px 0px 0 0",
      ease: "none",
      scrollTrigger: {
        trigger: ".intro",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    },
  );

  gsap.from(".intro-title span", {
    yPercent: 115,
    clipPath: "inset(100% 0 0 0)",
    opacity: 0,
    stagger: 0.14,
    duration: 1.25,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".intro",
      start: "top 72%",
    },
  });

  gsap.from(".intro-right", {
    y: 55,
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".intro",
      start: "top 70%",
    },
  });

  const introStoryTransition = gsap.timeline({
    scrollTrigger: {
      trigger: ".intro",
      start: "top top",
      end: () => `+=${window.innerHeight}`,
      scrub: 1,
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  introStoryTransition
    .to(".intro-left", { yPercent: -55, opacity: 0, ease: "power2.in" }, 0)
    .to(".intro-right", { yPercent: 55, opacity: 0, ease: "power2.in" }, 0)
    .to(".intro", { clipPath: "inset(0 0 100% 0)", ease: "power2.inOut" }, 0);

  /* ==========================
     STORY SECTION (fixed pinning)
  ========================== */

  // pin the image manually via GSAP instead of relying on CSS position:sticky
  // (CSS sticky breaks inside Lenis smooth-scroll wrappers)
  ScrollTrigger.create({
    trigger: ".story",
    start: "top top",
    end: "bottom bottom",
    pin: ".story .sticky",
  });

  gsap.to(".mattress", {
    scale: 1.25,

    y: -80,

    ease: "none",

    scrollTrigger: {
      trigger: ".story",

      start: "top top",

      end: "+=1500",

      scrub: true,
    },
  });

  gsap.utils.toArray(".story .panel").forEach((panel) => {
    const heading = panel.querySelector("h2");
    const copy = panel.querySelector("p");

    gsap.from(heading, {
      yPercent: 110,
      clipPath: "inset(100% 0 0 0)",
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: panel,
        start: "top 68%",
      },
    });

    gsap.from(copy, {
      y: 45,
      clipPath: "inset(0 0 100% 0)",
      opacity: 0,
      duration: 1,
      delay: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: panel,
        start: "top 62%",
      },
    });
  });

  /* ==========================
     IL CAPO STYLE EDITORIAL
  ========================== */

  const editorialTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".editorial",
      start: "top 5%",
      end: "+=3500",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  // 1. Image opening animation
  editorialTL.to(".editorial-img", {
    width: "100vw",
    height: "100vh",
    borderRadius: "0px",
    duration: 2,
    ease: "power2.inOut",
  });

  // 2. Reveal the floating glass card background exactly as the image finishes zooming
  editorialTL.to(
    ".editorial-title",
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    },
    "-=1",
  ); // Overlaps with the last half of the image zoom for smooth blending

  // 3. Text reveal inside the glass card
  editorialTL.to(
    ".editorial-title span",
    {
      y: 0,
      stagger: 0.15,
      duration: 1.5,
      ease: "power4.out",
    },
    "-=0.5",
  );

  // 4. Description paragraph reveal
  editorialTL.to(
    ".editorial-desc",
    {
      opacity: 1,
      y: -20,
      duration: 1,
    },
    "-=1",
  );
};
