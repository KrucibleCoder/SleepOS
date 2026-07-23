import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMAGES } from "../data";

const PANELS = [
  {
    n: "Memory Foam",
    body: "Viscoelastic foam that melts to your shape and springs back the moment you move — zero pressure, total contour.",
  },
  {
    n: "Cooling Tech",
    body: "Gel-infused channels and a phase-change cover pull heat away, so you stay in the deep-sleep temperature zone all night.",
  },
  {
    n: "Orthopedic Support",
    body: "A zoned core holds the spine in neutral alignment, with reinforced edges for a firm, dependable perimeter.",
  },
  {
    n: "10 Year Warranty",
    body: "Built to outlast a decade of nights. Every layer is guaranteed against sag, split, and softening.",
  },
];

export default function StickyStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <section
      ref={ref}
      data-testid="story-section"
      id="technology"
      className="relative bg-void"
    >
      <div className="mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-2">
        {/* Sticky image */}
        <div className="hidden md:block">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <motion.img
              style={{ scale, y: imgY }}
              src={IMAGES.sleeper}
              alt="Peaceful sleep"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-void/50 to-transparent" />
            <div className="absolute bottom-10 left-10">
              <span className="text-xs uppercase tracking-[0.4em] text-gold">
                Inside the Build
              </span>
            </div>
          </div>
        </div>

        {/* Scrolling panels */}
        <div className="px-6 md:px-16">
          {PANELS.map((p, i) => (
            <div
              key={p.n}
              data-testid={`story-panel-${i}`}
              className="flex min-h-screen flex-col justify-center border-b border-white/10 py-24 md:border-none"
            >
              <span className="font-display text-7xl font-light text-white/10">
                0{i + 1}
              </span>
              <motion.h3
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 font-display text-5xl md:text-6xl font-light uppercase text-white"
              >
                {p.n}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 max-w-md text-lg font-light leading-relaxed text-zinc-400"
              >
                {p.body}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
