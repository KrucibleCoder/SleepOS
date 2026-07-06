/* Hero section entrance animations and subtle glow effects */

export const initHeroAnimations = () => {
  gsap.from(".hero-title", {
    y: 180,
    opacity: 0,
    scale: 0.9,
    duration: 2,
    ease: "power4.out",
  });

  

  gsap.from(".hero-subtitle", {
    y: 80,
    opacity: 0,
    duration: 1.5,
    delay: 0.4,
    ease: "power3.out",
  });

  gsap.from(".hero p", {
    y: 80,
    opacity: 0,
    duration: 1.5,
    delay: 0.5,
    ease: "power3.out",
  });

  gsap.from(".scroll", {
    y: 40,
    opacity: 0,
    duration: 1.2,
    delay: 1,
    ease: "power2.out",
  });

  gsap.to(".hero-title", {
    textShadow: "0 0 20px rgba(245,158,11,.4), 0 0 60px rgba(245,158,11,.2)",
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.from(".hero-video video", {
    scale: 1.2,
    duration: 3,
    ease: "power2.out",
  });
};
