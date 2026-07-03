/* Additional section animations: testimonials, CTA, tables, metrics, footer */

export const initPageAnimations = () => {
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

  gsap.from(".footer-top", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    scrollTrigger: {
      trigger: ".footer",
      start: "top 80%",
    },
  });
};