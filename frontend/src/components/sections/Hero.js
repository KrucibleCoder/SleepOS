import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { IMAGES } from "../data";

const LINE1 = "SHREERAM";
const LINE2 = "MATTRESS";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: image scales + drifts, text lifts at a different speed.
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      data-testid="hero-section"
      className="relative h-screen w-full overflow-hidden bg-void"
    >
      <motion.div
        style={{ scale: imgScale, y: imgY }}
        className="absolute inset-0"
      >
        <img
          src={IMAGES.hero}
          alt="Luxury bedroom"
          className="h-full w-full object-cover"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-40"
          autoPlay
          muted
          loop
          playsInline
          poster={IMAGES.hero}
          data-testid="hero-video"
        >
          <source src="/hero-fog.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/30 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/60 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 flex h-full flex-col justify-end px-6 md:px-12 pb-20 md:pb-24 mx-auto max-w-[1600px]"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7, duration: 1 }}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-gold"
        >
          Premium Sleep Systems · Est. 1998
        </motion.span>

        <h1 className="font-display font-light uppercase leading-[0.82] text-white text-[19vw] md:text-[15vw]">
          {[LINE1, LINE2].map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 2.5 + li * 0.12,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <p className="max-w-md text-base md:text-lg font-light text-zinc-300">
            An engineered rest system built layer by layer — where orthopedic
            science meets hotel-grade indulgence.
          </p>
          <div className="flex items-center gap-3 text-zinc-400">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
            >
              <ArrowDown className="h-5 w-5 text-gold" />
            </motion.span>
            <span className="text-xs uppercase tracking-[0.3em]">
              Scroll to explore
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
