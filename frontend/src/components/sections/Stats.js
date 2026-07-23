import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "../data";

function CountUp({ target, active }) {
  const [val, setVal] = useState(0);
  const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
  const suffix = target.replace(/[0-9.]/g, "");
  const isFloat = target.includes(".");

  useEffect(() => {
    if (!active) return;
    let raf;
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(numeric * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, numeric]);

  return (
    <span>
      {isFloat ? val.toFixed(1) : Math.round(val)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      id="reviews"
      data-testid="stats-section"
      className="relative bg-coal px-6 md:px-12 py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1600px] grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            data-testid={`stat-${i}`}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="border-l border-gold/40 pl-5"
          >
            <div className="font-display text-6xl md:text-8xl font-light text-white leading-none">
              <CountUp target={s.value} active={inView} />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-zinc-400">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
