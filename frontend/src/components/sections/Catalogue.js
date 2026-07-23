import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CATALOGUE } from "../data";

// Vertical scroll drives a horizontal translate across the product cards.
export default function Catalogue() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0.1, 1], ["2%", "-72%"]);

  return (
    <section
      ref={ref}
      id="collection"
      data-testid="catalogue-section"
      className="relative h-[320vh] bg-void"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="px-6 md:px-12 mb-10 flex items-end justify-between mx-auto max-w-[1600px] w-full">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-gold">
              The Collection
            </span>
            <h2 className="mt-3 font-display text-5xl md:text-7xl font-light uppercase text-white">
              Choose Your Rest
            </h2>
          </div>
          <span className="hidden md:block text-xs uppercase tracking-[0.3em] text-zinc-500">
            Drag / Scroll →
          </span>
        </div>

        <motion.div
          style={{ x }}
          className="flex gap-6 md:gap-10 pl-6 md:pl-12"
        >
          {CATALOGUE.map((p, i) => (
            <motion.article
              key={p.name}
              data-testid={`catalogue-card-${i}`}
              whileHover={{ y: -12 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group relative h-[62vh] w-[80vw] md:w-[34vw] shrink-0 overflow-hidden rounded-2xl border border-white/10"
            >
              <img
                src={p.img}
                alt={p.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <div className="flex justify-between">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                    {p.tag}
                  </span>
                  <span className="text-xs text-zinc-400">0{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-display text-4xl md:text-5xl font-light text-white">
                    {p.name}
                  </h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-light text-zinc-300">
                      {p.price}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-void">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
