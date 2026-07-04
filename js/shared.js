/* Shared helpers for SleepOS animations and interactions */

gsap.registerPlugin(ScrollTrigger);

export const fadeSwapImage = (imageElement, newSrc) => {
  gsap.to(imageElement, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      imageElement.src = newSrc;
      gsap.to(imageElement, {
        opacity: 1,
        duration: 0.3,
      });
    },
  });
};

export const animateOnScroll = (target, settings) => {
  gsap.from(target, {
    ...settings,
    scrollTrigger: {
      trigger: target,
      start: settings.start || "top 70%",
      ...settings.scrollTrigger,
    },
  });
};
