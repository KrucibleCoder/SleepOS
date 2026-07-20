"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../js/animationRuntime";
import { initCatalogue } from "../js/catalogue";
import { initCursor } from "../js/cursor";
import { initFabricStack } from "../js/fabricStack";
import { initFeatureSection } from "../js/featureSection";
import { initHeroAnimations } from "../js/heroAnimations";
import { initLayerShowcase } from "../js/layerShowcase";
import { initLoader } from "../js/loader";
import { initLogoAnimation } from "../js/logoAnimation";
import { initPageAnimations } from "../js/pageAnimations";
import { initParticleBackgrounds } from "../js/particleBackgrounds";
import { initSectionAnimations } from "../js/sectionAnimations";
import { initTechSection } from "../js/techSection";

export default function SleepOSRuntime() {
  useEffect(() => {
    document.documentElement.dataset.sleepOsRuntime = "active";

    const root = document.documentElement;
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    root.classList.add("is-loading");
    document.body.classList.add("is-loading");

    const lenis = new Lenis({ autoRaf: false });
    const updateLenis = (time) => lenis.raf(time * 1000);

    lenis.stop();

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const releaseSplashLock = () => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true, force: true });
      root.classList.remove("is-loading");
      document.body.classList.remove("is-loading");
      document
        .querySelector(".hero-video video")
        ?.play()
        .catch(() => {});
      lenis.start();
      ScrollTrigger.refresh();
    };

    const loaderTimeline = initLoader(releaseSplashLock);
    initLogoAnimation();
    initHeroAnimations();
    initSectionAnimations();
    initFabricStack();
    initFeatureSection();
    initLayerShowcase();
    initCatalogue();
    initTechSection();
    initPageAnimations();
    const destroyCursor = initCursor() || (() => {});
    const destroyParticleBackgrounds = initParticleBackgrounds();

    const refresh = () => ScrollTrigger.refresh();

    if (document.readyState === "complete") {
      requestAnimationFrame(refresh);
    } else {
      window.addEventListener("load", refresh, { once: true });
    }

    return () => {
      window.removeEventListener("load", refresh);
      loaderTimeline.kill();
      destroyCursor();
      destroyParticleBackgrounds();
      root.classList.remove("is-loading");
      document.body.classList.remove("is-loading");
      window.history.scrollRestoration = previousScrollRestoration;
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      delete document.documentElement.dataset.sleepOsRuntime;
    };
  }, []);

  return <span data-sleep-os-runtime hidden />;
}
