/* Feature section reveal and video swap logic — premium Apple-style */

import { gsap, ScrollTrigger } from "./animationRuntime";

export const initFeatureSection = () => {
  const featurePanels = gsap.utils.toArray(".feature-panel");
  const mattressVideo = document.getElementById("mattressVideo");
  const dots = gsap.utils.toArray(".feature-progress .dot");
  const section = document.querySelector(".features-story");
  const mobileMode = window.matchMedia("(max-width: 768px)").matches;

  featurePanels.forEach((panel) => {
    // text content entrance — blur to focus, Apple-style
    gsap.from(panel.querySelectorAll(".feature-number, h2, p"), {
      opacity: 0,
      y: 40,
      filter: mobileMode ? "blur(0px)" : "blur(8px)",
      stagger: 0.08,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: panel,
        start: "top 70%",
        end: "top 30%",
        scrub: true,
      },
    });
  });

  // toggle progress indicator visibility while inside the section
  if (section) {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => section.classList.add("in-view"),
      onLeave: () => {
        section.classList.remove("in-view");
        mattressVideo?.pause();
      },
      onEnterBack: () => {
        section.classList.add("in-view");
        mattressVideo?.play().catch(() => {});
      },
      onLeaveBack: () => {
        section.classList.remove("in-view");
        mattressVideo?.pause();
      },
    });
  }

  if (!mattressVideo) return;

  const pulseVideo = () => {
    gsap.fromTo(
      mattressVideo,
      { scale: 0.96, opacity: 0.6 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
    );
  };

  const swapVideo = (src, index) => {
    dots.forEach((d, i) => d.classList.toggle("active", i === index));

    if (mattressVideo.getAttribute("data-current") === src) {
      pulseVideo(); // same video, still give a subtle "change" feel
      return;
    }

    gsap.to(mattressVideo, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        mattressVideo.setAttribute("src", src);
        mattressVideo.setAttribute("data-current", src);
        mattressVideo.load();
        mattressVideo.play().catch(() => {});
        pulseVideo();
      },
    });
  };

  featurePanels.forEach((panel, index) => {
    ScrollTrigger.create({
      trigger: panel,
      start: "top center",
      onEnter: () =>
        swapVideo(
          mobileMode
            ? panel.dataset.mobileVideo || panel.dataset.video
            : panel.dataset.video,
          index,
        ),
      onEnterBack: () =>
        swapVideo(
          mobileMode
            ? panel.dataset.mobileVideo || panel.dataset.video
            : panel.dataset.video,
          index,
        ),
    });
  });
};
