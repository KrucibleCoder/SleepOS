import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMAGES } from "../data";

// IL CAPO style: a small centered image expands to fill the viewport while a
// pinned title reveals line-by-line, then a description fades in.
export default function Editorial() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const width = useTransform(scrollYProgress, [0, 0.5], ["36vw", "100vw"]);
  const height = useTransform(scrollYProgress, [0, 0.5], ["48vh", "100vh"]);
  const radius = useTransform(scrollYProgress, [0, 0.5], [16, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.3, 1]);

  const titleOpacity = useTransform(scrollYProgress, [0.52, 0.62], [0, 1]);
  const descOpacity = useTransform(scrollYProgress, [0.78, 0.9], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.78, 0.9], [40, 0]);
  const overlay = useTransform(scrollYProgress, [0.4, 0.6], [0.2, 0.65]);

  const titleLines = ["Crafted", "For Perfect", "Sleep"];

  return (
    <section
      ref={ref}
      data-testid="editorial-section"
      className="relative h-[300vh] bg-void"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ width, height, borderRadius: radius }}
          className="relative overflow-hidden"
        >
          <motion.img
            style={{ scale: imgScale }}
            src={IMAGES.editorial}
            alt="Perfect sleep"
            className="h-full w-full object-cover"
          />
          <motion.div
            style={{ opacity: overlay }}
            className="absolute inset-0 bg-void"
          />

          <motion.div
            style={{ opacity: titleOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <span className="mb-6 text-xs uppercase tracking-[0.4em] text-gold">
              The Philosophy
            </span>
            <h2 className="font-display font-light uppercase leading-[0.85] text-white text-[13vw] md:text-[9vw]">
              {titleLines.map((l, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1 + i * 0.1,
                    }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </h2>
            <motion.p
              style={{ opacity: descOpacity, y: descY }}
              className="mt-8 max-w-xl text-base md:text-lg font-light text-zinc-300"
            >
              We reject the ordinary. Each Shreeram mattress is a deliberate
              composition of engineered layers — tuned to cradle, cool, and
              restore the body through every hour of the night.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
