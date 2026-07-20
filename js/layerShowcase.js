/* ==========================
   LAYER SHOWCASE MODULE
========================== */
import { gsap } from "./animationRuntime";

export const initLayerShowcase = () => {
  const mobileMode = window.matchMedia("(max-width: 900px)").matches;
  const data = [
    {
      title: "Premium Fabric",
      desc: "Soft breathable fabric designed for luxurious comfort.",
      features: ["Breathable", "Ultra Soft", "Cooling Touch"],
    },
    {
      title: "Cooling Memory Foam",
      desc: "Contours to your body and relieves pressure points.",
      features: ["Cooling Gel", "Pressure Relief", "Body Contouring"],
    },
    {
      title: "Orthopedic Support",
      desc: "Provides proper spinal alignment and support.",
      features: ["Spinal Alignment", "Back Support", "Ergonomic Design"],
    },
    {
      title: "Pocket Spring System",
      desc: "Ensures motion isolation and balanced support.",
      features: ["Motion Isolation", "Balanced Support", "Enhanced Comfort"],
    },
    {
      title: "High Density Base",
      desc: "Enhances durability and extends mattress life.",
      features: ["High Density", "Long Life", "Maximum Stability"],
    },
  ];
  const counters = document.querySelectorAll(".counter-item");
  const titleEl = document.getElementById("layerTitle");
  const descEl = document.getElementById("layerDescription");
  const tagEl = document.getElementById("layerTag");
  const featureEls = [
    document.getElementById("feature1"),
    document.getElementById("feature2"),
    document.getElementById("feature3"),
  ];
  let lastIndex = -1;

  function updateLayer(index) {
    if (index === lastIndex) return;
    lastIndex = index;
    [titleEl, descEl].forEach((el) => el.classList.remove("show"));
    setTimeout(() => {
      tagEl.innerText = `LAYER 0${index + 1}`;
      titleEl.innerText = data[index].title;
      descEl.innerText = data[index].desc;
      featureEls.forEach((el, i) => {
        if (el) el.innerText = data[index].features[i];
      });
      gsap.fromTo(
        featureEls,
        { x: 28, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: "power2.out" },
      );
      counters.forEach((item, i) =>
        item.classList.toggle("active", i === index),
      );
      [titleEl, descEl].forEach((el) => el.classList.add("show"));
    }, 150);
  }

  /* ==========================
   MAIN TIMELINE — continuous, no idle scroll
   (every phase overlaps slightly with the next,
   so there's never a stretch of scroll with nothing moving)
========================== */

  updateLayer(0);

  const layerScrollDistance = () =>
    window.innerHeight * (mobileMode ? 3.5 : data.length);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".layers-showcase",
      start: "top top",
      end: () => `+=${layerScrollDistance()}`,
      pin: true,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const index = Math.min(
          data.length - 1,
          Math.floor(self.progress * data.length),
        );
        updateLayer(index);
      },
    },
  });

  // preserve CSS centering (translate(-50%,-50%)) since GSAP will
  // otherwise overwrite the whole transform when animating y
  gsap.set(".layer", { xPercent: -50, yPercent: -50 });

  // EXPLODE — staggered, overlapping
  const offsets = mobileMode
    ? [-118, -62, -5, 54, 112]
    : [-230, -130, -10, 110, 230];

  tl.to(".fabric", { y: offsets[0], duration: 0.35 }, 0)
    .to(".memory", { y: offsets[1], opacity: 1, duration: 0.35 }, 0)
    .to(".support", { y: offsets[2], opacity: 1, duration: 0.35 }, 0.12)
    .to(".spring", { y: offsets[3], opacity: 1, duration: 0.35 }, 0.24)
    .to(".base", { y: offsets[4], opacity: 1, duration: 0.35 }, 0.36)

    // REBUILD — starts before explode fully settles, keeps motion flowing
    .to(".fabric", { y: 0, duration: 0.4, ease: "power2.inOut" }, 0.55)
    .to(".memory", { y: 0, duration: 0.4, ease: "power2.inOut" }, 0.55)
    .to(".support", { y: 0, duration: 0.4, ease: "power2.inOut" }, 0.55)
    .to(".spring", { y: 0, duration: 0.4, ease: "power2.inOut" }, 0.55)
    .to(".base", { y: 0, duration: 0.4, ease: "power2.inOut" }, 0.55)

    // ZOOM + FADE — starts as rebuild finishes settling, punchier scale so it reads clearly
    .to(
      ".center-panel",
      { scale: mobileMode ? 1.08 : 1.35, duration: 0.4, ease: "power2.out" },
      0.85,
    );
};
