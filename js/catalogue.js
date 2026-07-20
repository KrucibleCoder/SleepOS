/* Horizontal catalogue scroll and per-slide entrance animations */

import { gsap } from "./animationRuntime";

export const initCatalogue = () => {
  const catalogueSlides = gsap.utils.toArray(".catalogue-item");
  if (!catalogueSlides.length) {
    return;
  }

  gsap.set(".catalogue-wrapper", {
    width: `${catalogueSlides.length * 100}vw`,
  });

  const horizontalScroll = gsap.to(catalogueSlides, {
    xPercent: -100 * (catalogueSlides.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".catalogue-story",
      pin: true,
      scrub: 1,
      snap: {
        snapTo: 1 / (catalogueSlides.length - 1),
        duration: 0.35,
        ease: "power1.inOut",
      },
      end: () => "+=" + window.innerWidth * (catalogueSlides.length - 1),
    },
  });

  catalogueSlides.forEach((slide) => {
    gsap.from(slide.querySelector(".product-info"), {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: slide,
        containerAnimation: horizontalScroll,
        start: "left center",
      },
    });

    gsap.from(slide.querySelector("img"), {
      scale: 0.85,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: slide,
        containerAnimation: horizontalScroll,
        start: "left center",
      },
    });

    gsap.from(slide.querySelector("h2"), {
      x: -200,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: slide,
        containerAnimation: horizontalScroll,
        start: "left center",
      },
    });

    gsap.to(slide.querySelector("img"), {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: slide,
        containerAnimation: horizontalScroll,
        start: "left right",
        end: "right left",
        scrub: true,
      },
    });
  });
};
