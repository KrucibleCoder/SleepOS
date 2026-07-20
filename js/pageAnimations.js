/* Additional section animations: testimonials, CTA, tables, metrics, footer */

import { gsap, ScrollTrigger } from "./animationRuntime";

export const initPageAnimations = () => {
  gsap.utils
    .toArray(".testimonial-header, .comparison-header")
    .forEach((header) => {
      gsap.from(header.children, {
        y: 65,
        clipPath: "inset(100% 0 0 0)",
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: header,
          start: "top 78%",
        },
      });
    });

  gsap.from(".testimonial-card", {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".testimonials",
      start: "top 80%",
      once: true,
    },
  });

  gsap.from(".cta-container", {
    y: 100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".premium-cta",
      start: "top 70%",
    },
  });

  gsap.fromTo(
    ".cta-buttons .cta-btn",
    { y: 35, opacity: 0, scale: 0.92 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      stagger: 0.12,
      duration: 0.8,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: ".cta-buttons",
        start: "top 88%",
      },
    },
  );

  gsap.from(".table-row", {
    opacity: 0,
    y: 50,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".comparison-section",
      start: "top 70%",
    },
  });

  document.querySelectorAll(".counter").forEach((counter) => {
    ScrollTrigger.create({
      trigger: counter,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const target = Number(counter.dataset.target);
        gsap.to(counter, {
          innerText: target,
          duration: 2,
          snap: {
            innerText: 1,
          },
          onUpdate: function () {
            counter.innerText = Math.floor(counter.innerText);
          },
        });
      },
    });
  });

  gsap.from(".metric-box", {
    y: 70,
    opacity: 0,
    scale: 0.86,
    stagger: 0.12,
    duration: 0.9,
    ease: "back.out(1.35)",
    scrollTrigger: {
      trigger: ".metrics-section",
      start: "top 76%",
      once: true,
    },
  });

  gsap.from(".footer-top", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    scrollTrigger: {
      trigger: ".footer",
      start: "top 80%",
    },
  });

  gsap.from(".footer-links", {
    y: 45,
    opacity: 0,
    stagger: 0.1,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".footer",
      start: "top 76%",
    },
  });

  gsap.fromTo(
    ".footer-watermark",
    { x: "-8vw" },
    {
      x: "8vw",
      ease: "none",
      scrollTrigger: {
        trigger: ".footer",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    },
  );
};
