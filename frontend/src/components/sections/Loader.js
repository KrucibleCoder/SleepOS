import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animated brand logo intro. A line-art mark (bed + crescent moon) draws itself,
// then the wordmark reveals. Substitutes the original 96-frame PNG sequence with
// a crisp vector animation. Drop-in a <video>/frames source later if desired.
export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2900);
    return () => clearTimeout(t);
  }, []);

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: 0.2 + i * 0.25,
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: { delay: 0.2 + i * 0.25, duration: 0.3 },
      },
    }),
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-testid="page-loader"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-void"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.svg
            width="150"
            height="110"
            viewBox="0 0 150 110"
            fill="none"
            className="mb-8"
            data-testid="loader-logo-mark"
          >
            {/* crescent moon */}
            <motion.path
              d="M95 20 A18 18 0 1 0 95 54 A22 22 0 0 1 95 20 Z"
              stroke="#FF9D1F"
              strokeWidth="1.5"
              variants={draw}
              initial="hidden"
              animate="visible"
              custom={0}
            />
            {/* bed frame / mattress */}
            <motion.path
              d="M20 82 L20 62 Q20 58 24 58 L126 58 Q130 58 130 62 L130 82"
              stroke="#ffffff"
              strokeWidth="1.5"
              variants={draw}
              initial="hidden"
              animate="visible"
              custom={1}
            />
            <motion.path
              d="M12 82 L138 82"
              stroke="#ffffff"
              strokeWidth="1.5"
              variants={draw}
              initial="hidden"
              animate="visible"
              custom={2}
            />
            {/* pillow */}
            <motion.path
              d="M30 58 L30 50 Q30 46 34 46 L58 46 Q62 46 62 50 L62 58"
              stroke="#ffffff"
              strokeWidth="1.5"
              variants={draw}
              initial="hidden"
              animate="visible"
              custom={2.3}
            />
          </motion.svg>

          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-6xl md:text-8xl font-light tracking-tight text-white"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
            >
              SleepOS
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-3">
            <motion.p
              className="text-xs uppercase tracking-[0.4em] text-zinc-500"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: 1.35,
              }}
            >
              Crafted for Deeper Sleep
            </motion.p>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gold"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.6, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
