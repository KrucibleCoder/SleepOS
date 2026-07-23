import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { LAYERS } from "../data";

// Exploded cross-section. Five transparent isometric slabs stack like a real
// mattress, then separate (explode) and re-assemble as you scroll.
function Layer({ progress, index, total }) {
  const layer = LAYERS[index];
  const offset = index - (total - 1) / 2;

  // Assembled = tight stack; Exploded = separated. Explode then rebuild.
  // A small downward baseline (+3vh) keeps the stack clear of the heading.
  const assembled = offset * 4 + 3; // vh between slab centers when stacked
  const exploded = offset * 10.5 + 3; // vh when pulled apart
  const y = useTransform(
    progress,
    [0.12, 0.5, 0.88],
    [`${assembled}vh`, `${exploded}vh`, `${assembled}vh`],
  );

  return (
    <motion.div
      style={{ y, zIndex: total - index }}
      className="absolute left-1/2 top-1/2"
      data-testid={`layer-slab-${index}`}
    >
      <div className="-translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[40vw]">
        <img
          src={layer.img}
          alt={layer.title}
          className="w-full h-auto object-contain drop-shadow-2xl select-none pointer-events-none"
        />
      </div>
    </motion.div>
  );
}

export default function LayerShowcase() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      LAYERS.length - 1,
      Math.max(0, Math.floor(v * LAYERS.length)),
    );
    setActive(idx);
  });

  return (
    <section
      ref={ref}
      data-testid="layer-showcase-section"
      className="relative h-[400vh] bg-coal"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-8 left-0 right-0 text-center px-6 z-10">
          <span className="text-xs uppercase tracking-[0.4em] text-gold">
            Anatomy of Rest
          </span>
          <h2 className="mt-2 font-display text-3xl md:text-5xl font-light uppercase text-white">
            Five Engineered Layers
          </h2>
        </div>

        {/* Stacked slabs, centered with perspective */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <div className="relative h-[16vh] w-full">
            {LAYERS.map((_, i) => (
              <Layer
                key={i}
                progress={scrollYProgress}
                index={i}
                total={LAYERS.length}
              />
            ))}
          </div>
        </div>

        {/* Synced text counter */}
        <div className="absolute bottom-14 left-0 right-0 px-6 md:px-16">
          <div className="mx-auto max-w-[1600px] flex items-end justify-between gap-8">
            <div
              className="flex items-baseline gap-4"
              data-testid="layer-counter"
            >
              <span className="font-display text-7xl md:text-8xl font-light text-gold leading-none">
                {LAYERS[active].n}
              </span>
              <div className="max-w-md">
                <motion.h3
                  key={LAYERS[active].title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-3xl md:text-4xl font-light text-white"
                >
                  {LAYERS[active].title}
                </motion.h3>
                <motion.p
                  key={LAYERS[active].desc}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="mt-2 text-sm md:text-base font-light text-zinc-400"
                >
                  {LAYERS[active].desc}
                </motion.p>
              </div>
            </div>
            <span className="hidden md:block text-xs uppercase tracking-[0.3em] text-zinc-500">
              {String(active + 1).padStart(2, "0")} / 05
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
