/* Loader timeline and reveal sequence for SleepOS */

export const initLoader = () => {
  const loaderTL = gsap.timeline();

  loaderTL
    .from(".loader-text", {
      scale: 0.2,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    })
    .to(".loader-text", {
      scale: 1.1,
      duration: 1,
    })
    .to(".loader-text", {
      scale: 25,
      duration: 2,
      ease: "power4.inOut",
    })
    .to(
      ".loader",
      {
        opacity: 0,
        duration: 0.5,
      },
      "-=0.5",
    )
    .to(
      ".hero",
      {
        opacity: 1,
        duration: 0.8,
      },
      "-=0.5",
    )
    .set(".loader", {
      display: "none",
    });
};