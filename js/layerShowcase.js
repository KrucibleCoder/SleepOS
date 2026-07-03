/* Mattress layer showcase timeline and scroll-driven content updates */

const layers = [
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

const layerCounters = document.querySelectorAll(".counter-item");

const updateLayer = (index) => {
  const layer = layers[index];
  const titleElement = document.getElementById("layerTitle");
  const descriptionElement = document.getElementById("layerDescription");

  if (!layer || !titleElement || !descriptionElement) {
    return;
  }

  titleElement.innerText = layer.title;
  descriptionElement.innerText = layer.desc;

  layerCounters.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
};

export const initLayerShowcase = () => {
  const layerSection = document.querySelector(".layers-showcase");
  if (!layerSection) {
    return;
  }

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".layers-showcase",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    })
    .to(
      ".memory",
      {
        y: 120,
        opacity: 1,
      },
      0.2,
    )
    .to(
      ".support",
      {
        y: 240,
        opacity: 1,
      },
      0.4,
    )
    .to(
      ".spring",
      {
        y: 360,
        opacity: 1,
      },
      0.6,
    )
    .to(
      ".base",
      {
        y: 480,
        opacity: 1,
      },
      0.8,
    )
    .to(
      ".fabric",
      {
        y: 0,
      },
      1,
    )
    .to(
      ".memory",
      {
        y: 0,
      },
      1,
    )
    .to(
      ".support",
      {
        y: 0,
      },
      1,
    )
    .to(
      ".spring",
      {
        y: 0,
      },
      1,
    )
    .to(
      ".base",
      {
        y: 0,
      },
      1,
    )
    .to(
      ".center-panel",
      {
        scale: 1.2,
        duration: 1,
      },
      2,
    )
    .to(
      ".left-panel",
      {
        opacity: 0,
        duration: 1,
      },
      2,
    )
    .to(
      ".right-panel",
      {
        opacity: 0,
        duration: 1,
      },
      2,
    );

  ScrollTrigger.create({
    trigger: ".layers-showcase",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      const index = Math.min(
        layers.length - 1,
        Math.floor(self.progress * layers.length),
      );
      updateLayer(index);
    },
  });
};
