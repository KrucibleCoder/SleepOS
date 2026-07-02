gsap.registerPlugin(ScrollTrigger);

/* LENIS */

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/* ==========================
   CINEMATIC LOADER
========================== */

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

/*logo animation*/

const logo = document.getElementById("logoAnimation");
const frames = [];
const totalFrames = 101; // Change to 101 if your files are 000 to 100

// 1. Generate frame paths correctly
for (let i = 0; i < totalFrames; i++) {
  const num = String(i).padStart(3, "0");
  frames.push(`assets/logo animation/logo/logo-ani_${num}.png`);
}

let animation;
let current = 0;

// 2. Play forward on hover
logo.addEventListener("mouseenter", () => {
  clearInterval(animation);

  animation = setInterval(() => {
    if (current < frames.length - 1) {
      current++;
      logo.src = frames[current];
    } else {
      clearInterval(animation);
    }
  }, 30);
});

// 3. Play backward on leave
logo.addEventListener("mouseleave", () => {
  clearInterval(animation);

  animation = setInterval(() => {
    if (current > 0) {
      current--;
      logo.src = frames[current];
    } else {
      clearInterval(animation);
    }
  }, 30);
});

/* HERO */

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

/* Matte Saffron Glow */

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

/* INTRO */

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

/* PANELS */

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

/* MATTRESS SCALE */

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

gsap.utils.toArray(".feature-panel").forEach((panel) => {
  gsap.from(panel, {
    opacity: 0,
    y: 100,

    scrollTrigger: {
      trigger: panel,
      start: "top 70%",
      end: "top 30%",
      scrub: true,
    },
  });
});

const mattressImage = document.getElementById("mattressImage");

document.querySelectorAll(".feature-panel").forEach((panel) => {
  ScrollTrigger.create({
    trigger: panel,

    start: "top center",

    onEnter: () => {
      gsap.to(mattressImage, {
        opacity: 0,

        duration: 0.3,

        onComplete: () => {
          mattressImage.src = panel.dataset.image;

          gsap.to(mattressImage, {
            opacity: 1,
            duration: 0.3,
          });
        },
      });
    },

    onEnterBack: () => {
      gsap.to(mattressImage, {
        opacity: 0,

        duration: 0.3,

        onComplete: () => {
          mattressImage.src = panel.dataset.image;

          gsap.to(mattressImage, {
            opacity: 1,
            duration: 0.3,
          });
        },
      });
    },
  });
});

/* ==========================
   LAYER DATA
========================== */

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

/* ==========================
   COUNTERS
========================== */

const counters = document.querySelectorAll(".counter-item");

/* ==========================
   UPDATE LAYER INFO
========================== */

function updateLayer(index) {
  document.getElementById("layerTitle").innerText = data[index].title;

  document.getElementById("layerDescription").innerText = data[index].desc;

  counters.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

/* ==========================
   MAIN TIMELINE
========================== */

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".layers-showcase",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

/* ==========================
   EXPLODE LAYERS
========================== */

tl.to(
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

  /* ==========================
   REBUILD MATTRESS
========================== */

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

  /* ==========================
   ZOOM IN EFFECT
========================== */

  .to(
    ".center-panel",
    {
      scale: 1.2,

      duration: 1,
    },
    2,
  )

  /* ==========================
   FADE SIDE PANELS
========================== */

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

/* ==========================
   CONTENT CHANGE ON SCROLL
========================== */

ScrollTrigger.create({
  trigger: ".layers-showcase",

  start: "top top",

  end: "bottom bottom",

  scrub: true,

  onUpdate: (self) => {
    let index = Math.min(4, Math.floor(self.progress * 5));

    updateLayer(index);
  },
});

/* ==========================================================
   HORIZONTAL CATALOGUE SCROLLER
========================================================== */

gsap.registerPlugin(ScrollTrigger);

/* Get all catalogue slides */

const catalogueSlides = gsap.utils.toArray(".catalogue-item");

/* Automatically size the wrapper based on number of slides */

gsap.set(".catalogue-wrapper", {
  width: `${catalogueSlides.length * 100}vw`,
});

/* ==========================================================
   MAIN HORIZONTAL SCROLL
========================================================== */

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

/* ==========================================================
   INDIVIDUAL SLIDE ANIMATIONS
========================================================== */

catalogueSlides.forEach((slide) => {
  /* Product Info */

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

  /* Mattress Image */

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

  /* Background Title */

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
});

/* ==========================================================
   FLOATING IMAGE PARALLAX
========================================================== */

catalogueSlides.forEach((slide) => {
  const image = slide.querySelector("img");

  gsap.to(image, {
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

/* ==========================
   TESTIMONIALS CARD
========================== */

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

/* ==========================
   CTA CONTENT
========================== */
gsap.from(".cta-container", {
  y: 100,

  opacity: 0,

  duration: 1,

  scrollTrigger: {
    trigger: ".premium-cta",
    start: "top 70%",
  },
});

/* ==========================
   TECH PANELS
========================== */

const techImage = document.getElementById("techImage");

document.querySelectorAll(".tech-panel").forEach((panel) => {
  ScrollTrigger.create({
    trigger: panel,

    start: "top center",

    onEnter: () => {
      gsap.to(techImage, {
        opacity: 0,

        duration: 0.3,

        onComplete: () => {
          techImage.src = panel.dataset.image;

          gsap.to(techImage, {
            opacity: 1,
            duration: 0.3,
          });
        },
      });
    },

    onEnterBack: () => {
      gsap.to(techImage, {
        opacity: 0,

        duration: 0.3,

        onComplete: () => {
          techImage.src = panel.dataset.image;

          gsap.to(techImage, {
            opacity: 1,
            duration: 0.3,
          });
        },
      });
    },
  });
});

/* ==========================
     TABLE ROWS
========================== */

gsap.from(".table-row", {
  opacity: 0,

  y: 50,

  stagger: 0.1,

  scrollTrigger: {
    trigger: ".comparison-section",
    start: "top 70%",
  },
});

/* ==========================
  METRICS SECTION COUNTERS
========================== */

const metricCounters = document.querySelectorAll(".counter");

metricCounters.forEach((counter) => {
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

/* ==========================
    FOOTER ANIMATION
========================== */
gsap.from(".footer-top", {
  y: 100,

  opacity: 0,

  duration: 1.2,

  scrollTrigger: {
    trigger: ".footer",
    start: "top 80%",
  },
});
