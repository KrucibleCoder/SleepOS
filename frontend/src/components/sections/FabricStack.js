import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMAGES } from "../data";

const CARDS = [
  { label: "Organic Cotton", img: IMAGES.fabric1 },
  { label: "Tencel Weave", img: IMAGES.fabric2 },
  { label: "Cool Bamboo", img: IMAGES.layer3 },
  { label: "Quilted Knit", img: IMAGES.layer4 },
  { label: "Merino Blend", img: IMAGES.editorial },
];

function Card({ progress, index, total }) {
  const card = CARDS[index];
  const mid = (total - 1) / 2;
  const offset = index - mid; // negative = left

  const x = useTransform(progress, [0.15, 0.85], ["0%", `${offset * 108}%`]);
  const rotate = useTransform(progress, [0.15, 0.85], [offset * 2, offset * 6]);
  const y = useTransform(progress, [0.15, 0.85], [0, Math.abs(offset) * -24]);

  return (
    <motion.div
      style={{ x, rotate, y, zIndex: total - Math.abs(offset) }}
      className="absolute h-[58vh] w-[70vw] md:w-[24vw] overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
      data-testid={`fabric-card-${index}`}
    >
      <img
        src={card.img}
        alt={card.label}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
          Cover 0{index + 1}
        </span>
        <p className="font-display text-3xl font-light text-white">
          {card.label}
        </p>
      </div>
    </motion.div>
  );
}

export default function FabricStack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const headOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.85, 1],
    [0, 1, 1, 0],
  );

  return (
    <section
      ref={ref}
      data-testid="fabric-stack-section"
      className="relative h-[300vh] bg-coal"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          style={{ opacity: headOpacity }}
          className="absolute top-24 left-1/2 -translate-x-1/2 text-center px-6"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold">
            The Cover Collection
          </span>
          <h2 className="mt-3 font-display text-5xl md:text-7xl font-light uppercase text-white">
            Five Ways to Feel It
          </h2>
        </motion.div>

        <div className="relative flex items-center justify-center w-full">
          {CARDS.map((_, i) => (
            <Card
              key={i}
              progress={scrollYProgress}
              index={i}
              total={CARDS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
