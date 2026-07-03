/* Section entrance and scroll animations for SleepOS */

export const initSectionAnimations = () => {
  gsap.from(".intro-left", {
    x: -200,
    opacity: 0,
    scrollTrigger: {
      trigger: ".intro",
      start: "top 70%",
    },
  });

  gsap.from(".intro-right", {
    x: 200,
    opacity: 0,
    scrollTrigger: {
      trigger: ".intro",
      start: "top 70%",
    },
  });

  gsap.utils.toArray(".panel").forEach((panel) => {
    gsap.from(panel, {
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger: panel,
        start: "top 70%",
      },
    });
  });

  gsap.to(".mattress", {
    scale: 1.15,
    scrollTrigger: {
      trigger: ".story",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });

  gsap.from(".reveal-text", {
    scale: 0.8,
    opacity: 0,
    scrollTrigger: {
      trigger: ".editorial",
      start: "top center",
      end: "center center",
      scrub: true,
    },
  });

  gsap.to(".editorial-image img", {
    scale: 1.2,
    scrollTrigger: {
      trigger: ".editorial",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
};