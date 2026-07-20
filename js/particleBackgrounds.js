const DARK_SECTION_SELECTORS = [
  ".loader",
  ".intro",
  ".story",
  ".editorial",
  ".fabric-stack",
  ".features-story",
  ".layers-showcase",
  ".catalogue-story",
  ".testimonials",
  ".technology-story",
  ".comparison-section",
  ".metrics-section",
  ".premium-cta",
  ".footer",
];

const PARTICLE_COLORS = [
  [255, 255, 255],
  [255, 210, 135],
  [255, 179, 71],
];

export const initParticleBackgrounds = () => {
  const sections = DARK_SECTION_SELECTORS.flatMap((selector) =>
    Array.from(document.querySelectorAll(selector)),
  );

  if (!sections.length) return () => {};

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const mobilePerformanceMode = window.matchMedia(
    "(max-width: 768px), (pointer: coarse)",
  ).matches;
  const states = new Map();
  const activeStates = new Set();
  const pointer = { x: -1000, y: -1000, active: false };

  const createParticles = (width, height) => {
    const density = reducedMotion
      ? 56000
      : mobilePerformanceMode
        ? 48000
        : 23000;
    const maxParticles = mobilePerformanceMode ? 30 : 68;
    const count = Math.max(
      12,
      Math.min(maxParticles, Math.round((width * height) / density)),
    );

    return Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: 0.7 + Math.random() * 1.7,
      alpha: 0.2 + Math.random() * 0.42,
      color:
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));
  };

  const resizeState = (state) => {
    const width = Math.max(1, state.section.clientWidth);
    const height = Math.max(
      1,
      Math.min(window.innerHeight, state.section.offsetHeight),
    );
    const dpr = Math.min(
      window.devicePixelRatio || 1,
      mobilePerformanceMode ? 1 : 1.5,
    );

    state.width = width;
    state.height = height;
    state.canvas.style.width = `${width}px`;
    state.canvas.style.height = `${height}px`;
    state.canvas.width = Math.round(width * dpr);
    state.canvas.height = Math.round(height * dpr);
    state.context.setTransform(dpr, 0, 0, dpr, 0, 0);
    state.particles = createParticles(width, height);
  };

  sections.forEach((section) => {
    section.classList.add("particle-section");

    if (getComputedStyle(section).position === "static") {
      section.classList.add("particle-section-positioned");
    }

    Array.from(section.children).forEach((child) => {
      if (getComputedStyle(child).position === "static") {
        child.classList.add("particle-content-positioned");
      }
      child.classList.add("particle-content-layer");
    });

    const canvas = document.createElement("canvas");
    canvas.className = "particle-canvas";
    canvas.setAttribute("aria-hidden", "true");
    section.prepend(canvas);

    states.set(section, {
      section,
      canvas,
      context: canvas.getContext("2d"),
      particles: [],
      width: 1,
      height: 1,
      offset: 0,
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const state = states.get(entry.target);
        if (!state) return;

        if (entry.isIntersecting) {
          resizeState(state);
          activeStates.add(state);
        } else {
          activeStates.delete(state);
          state.canvas.width = 1;
          state.canvas.height = 1;
          state.particles = [];
        }
      });
    },
    { rootMargin: "20% 0px" },
  );

  sections.forEach((section) => observer.observe(section));

  const updatePointer = (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  };

  const clearPointer = () => {
    pointer.active = false;
  };

  const resizeActiveStates = () => {
    activeStates.forEach(resizeState);
  };

  if (!mobilePerformanceMode) {
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerout", clearPointer);
  }
  window.addEventListener("blur", clearPointer);
  window.addEventListener("resize", resizeActiveStates, { passive: true });

  let animationFrame = 0;

  const render = () => {
    activeStates.forEach((state) => {
      if (state.section.classList.contains("loader-zooming")) return;

      const sectionRect = state.section.getBoundingClientRect();
      const maxOffset = Math.max(0, state.section.offsetHeight - state.height);
      state.offset = Math.min(maxOffset, Math.max(0, -sectionRect.top));
      state.canvas.style.transform = `translate3d(0, ${state.offset}px, 0)`;

      const localPointerX = pointer.x - sectionRect.left;
      const localPointerY = pointer.y - (sectionRect.top + state.offset);
      const pointerInside =
        pointer.active &&
        localPointerX >= 0 &&
        localPointerX <= state.width &&
        localPointerY >= 0 &&
        localPointerY <= state.height;
      const context = state.context;

      context.clearRect(0, 0, state.width, state.height);

      state.particles.forEach((particle) => {
        if (!reducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx *= 0.992;
          particle.vy *= 0.992;

          if (pointerInside) {
            const dx = particle.x - localPointerX;
            const dy = particle.y - localPointerY;
            const distance = Math.hypot(dx, dy);

            if (distance > 0 && distance < 145) {
              const force = (1 - distance / 145) * 0.16;
              particle.vx += (dx / distance) * force;
              particle.vy += (dy / distance) * force;
            }
          }
        }

        if (particle.x < -5) particle.x = state.width + 5;
        if (particle.x > state.width + 5) particle.x = -5;
        if (particle.y < -5) particle.y = state.height + 5;
        if (particle.y > state.height + 5) particle.y = -5;
      });

      for (let i = 0; i < state.particles.length; i += 1) {
        const particle = state.particles[i];

        if (!mobilePerformanceMode)
          for (let j = i + 1; j < state.particles.length; j += 1) {
            const neighbor = state.particles[j];
            const distance = Math.hypot(
              particle.x - neighbor.x,
              particle.y - neighbor.y,
            );

            if (distance < 92) {
              context.beginPath();
              context.moveTo(particle.x, particle.y);
              context.lineTo(neighbor.x, neighbor.y);
              context.strokeStyle = `rgba(255, 210, 145, ${
                (1 - distance / 92) * 0.09
              })`;
              context.lineWidth = 0.6;
              context.stroke();
            }
          }

        if (pointerInside) {
          const pointerDistance = Math.hypot(
            particle.x - localPointerX,
            particle.y - localPointerY,
          );

          if (pointerDistance < 120) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(localPointerX, localPointerY);
            context.strokeStyle = `rgba(255, 179, 71, ${
              (1 - pointerDistance / 120) * 0.22
            })`;
            context.lineWidth = 0.8;
            context.stroke();
          }
        }

        const [red, green, blue] = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${particle.alpha})`;
        context.fill();
      }

      if (pointerInside && !reducedMotion) {
        const glow = context.createRadialGradient(
          localPointerX,
          localPointerY,
          0,
          localPointerX,
          localPointerY,
          95,
        );
        glow.addColorStop(0, "rgba(255, 179, 71, 0.075)");
        glow.addColorStop(1, "rgba(255, 179, 71, 0)");
        context.fillStyle = glow;
        context.fillRect(localPointerX - 95, localPointerY - 95, 190, 190);
      }
    });

    animationFrame = requestAnimationFrame(render);
  };

  render();

  return () => {
    cancelAnimationFrame(animationFrame);
    observer.disconnect();
    if (!mobilePerformanceMode) {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerout", clearPointer);
    }
    window.removeEventListener("blur", clearPointer);
    window.removeEventListener("resize", resizeActiveStates);

    states.forEach((state) => {
      state.section.classList.remove(
        "particle-section",
        "particle-section-positioned",
      );
      Array.from(state.section.children).forEach((child) => {
        child.classList.remove(
          "particle-content-layer",
          "particle-content-positioned",
        );
      });
      state.canvas.remove();
    });
  };
};
