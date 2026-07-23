import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MaskedLines } from "../RevealText";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const COLS = [
  {
    title: "Collection",
    links: ["The Queen", "The King", "Orthopedic", "The Luxury"],
  },
  {
    title: "Company",
    links: ["Our Craft", "Showrooms", "Warranty", "Contact"],
  },
  { title: "Social", links: ["Instagram", "Pinterest", "YouTube", "LinkedIn"] },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    try {
      const { data } = await axios.post(`${API}/newsletter`, { email });
      toast.success(
        data.status === "already_subscribed"
          ? "You're already on the list."
          : "Subscribed — welcome to deeper sleep.",
      );
      setEmail("");
    } catch {
      toast.error("Please enter a valid email.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer
      data-testid="site-footer"
      className="relative overflow-hidden bg-void px-6 md:px-12 pt-32 pb-12"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-b border-white/10 pb-20">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-gold">
              Ready for deeper sleep?
            </span>
            <MaskedLines
              lines={["Sleep Better.", "Live Better."]}
              className="mt-6 font-display text-5xl md:text-7xl font-light uppercase leading-[0.9] text-white"
            />
            <a
              href="#trial"
              data-testid="footer-cta-button"
              className="group relative mt-10 inline-flex overflow-hidden rounded-full border border-gold px-8 py-4 text-sm uppercase tracking-[0.2em] text-gold"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-void">
                Book a 100-Night Trial
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-300 group-hover:translate-x-0" />
            </a>

            <form
              onSubmit={subscribe}
              data-testid="newsletter-form"
              className="mt-10 flex max-w-md items-center gap-4 border-b border-white/20 pb-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email for sleep notes & offers"
                data-testid="newsletter-input"
                className="w-full bg-transparent text-base font-light text-white placeholder:text-zinc-600 focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy}
                data-testid="newsletter-submit-button"
                className="shrink-0 text-xs uppercase tracking-[0.2em] text-gold hover:text-white transition-colors duration-300 disabled:opacity-60"
              >
                {busy ? "..." : "Subscribe"}
              </button>
            </form>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {COLS.map((c) => (
              <div key={c.title}>
                <h4 className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  {c.title}
                </h4>
                <ul className="mt-6 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        data-testid={`footer-link-${l.toLowerCase().replace(/\s/g, "-")}`}
                        className="text-sm font-light text-zinc-300 hover:text-gold transition-colors duration-300"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10">
          <span className="font-display text-4xl font-light text-white">
            Shreeram<span className="text-gold">.</span>
          </span>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            © {new Date().getFullYear()} Shreeram Mattress · Crafted for Deeper
            Sleep
          </p>
        </div>
      </div>
    </footer>
  );
}
