import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LINKS = ["Collection", "Technology", "Craft", "Reviews"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-testid="site-header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[9990] transition-colors duration-500 ${
        scrolled
          ? "bg-void/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="nav-logo"
          className="font-display text-2xl md:text-3xl tracking-tight text-white"
        >
          Shreeram<span className="text-gold">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              data-testid={`nav-link-${l.toLowerCase()}`}
              className="text-xs uppercase tracking-[0.25em] text-zinc-400 hover:text-gold transition-colors duration-300"
            >
              {l}
            </a>
          ))}
        </nav>

        <a
          href="#collection"
          data-testid="nav-cta-button"
          className="group relative overflow-hidden rounded-full border border-gold/60 px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-gold"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-void">
            Shop Now
          </span>
          <span className="absolute inset-0 -translate-y-full bg-gold transition-transform duration-300 group-hover:translate-y-0" />
        </a>
      </div>
    </motion.header>
  );
}
