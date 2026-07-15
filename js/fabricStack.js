/* Fabric Stack Cards - deck fans out on scroll */

export const initFabricStack = () => {
  const cards = gsap.utils.toArray(".fabric-card");
  if (!cards.length) return;

  // final spread positions (left to right fan)
  const spread = [
    { x: -520, y: 30, rotate: -16 },
    { x: -260, y: 8, rotate: -8 },
    { x: 0, y: 0, rotate: 0 },
    { x: 260, y: 8, rotate: 8 },
    { x: 520, y: 30, rotate: 16 },
  ];

  // initial stacked state — all cards centered, slightly offset/rotated like a real deck
  gsap.set(cards, {
    x: 0,
    y: (i) => i * 6,
    rotate: (i) => (i - (cards.length - 1) / 2) * 4,
    scale: 0.94,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".fabric-stack",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  cards.forEach((card, i) => {
    tl.to(
      card,
      {
        x: spread[i].x,
        y: spread[i].y,
        rotate: spread[i].rotate,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      },
      i * 0.15 // staggered along the scrubbed scroll timeline
    );
  });

  /* ==========================
     CLICK / HOVER INTERACTIONS
  ========================== */

  cards.forEach((card) => {
    // subtle lift on hover, on top of its scroll-set position
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: "-=14",
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: "+=14",
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    // quick press-down feedback on click before navigating
    card.addEventListener("click", (e) => {
      gsap.to(card, {
        scale: 0.96,
        duration: 0.15,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      });
    });
  });
};