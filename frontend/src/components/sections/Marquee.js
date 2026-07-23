import { motion } from "framer-motion";

const WORDS = [
  "Deeper Sleep",
  "Orthopedic Comfort",
  "Cooling Tech",
  "Hand Assembled",
  "100 Night Trial",
];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <section
      data-testid="marquee-section"
      className="relative overflow-hidden border-y border-white/10 bg-void py-10"
    >
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
      >
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-5xl md:text-7xl font-light uppercase text-white/90">
              {w}
            </span>
            <span className="text-gold text-4xl">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
