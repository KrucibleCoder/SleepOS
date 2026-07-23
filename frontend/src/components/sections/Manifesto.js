import { MaskedLines, FadeUp } from "../RevealText";
import { MANIFESTO } from "../data";

export default function Manifesto() {
  return (
    <section
      data-testid="manifesto-section"
      id="craft"
      className="relative bg-void px-6 md:px-12 py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-24 max-w-4xl">
          <span className="text-xs uppercase tracking-[0.4em] text-gold">
            Chapter — The Manifesto
          </span>
          <MaskedLines
            lines={["Not Just", "A Mattress."]}
            className="mt-6 font-display text-6xl md:text-[9vw] font-light uppercase leading-[0.85] text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 border-t border-white/10 pt-16">
          {MANIFESTO.map((m, i) => (
            <FadeUp key={m.n} delay={i * 0.12} className="flex flex-col">
              <span className="font-display text-6xl font-light text-gold/80">
                {m.n}
              </span>
              <h3 className="mt-6 font-display text-3xl md:text-4xl font-light text-white">
                {m.title}
              </h3>
              <p className="mt-4 text-base font-light leading-relaxed text-zinc-400">
                {m.body}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
