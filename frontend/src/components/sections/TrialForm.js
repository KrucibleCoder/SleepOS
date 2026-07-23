import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MaskedLines } from "../RevealText";
import { CATALOGUE, IMAGES } from "../data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FIELD =
  "w-full bg-transparent border-b border-white/20 py-4 text-lg font-light text-white placeholder:text-zinc-600 focus:border-gold focus:outline-none transition-colors duration-300";

export default function TrialForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    plan: CATALOGUE[0].name,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please add your name and email.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, form);
      toast.success(
        "Request received — we'll be in touch about your 100-night trial.",
      );
      setForm({
        name: "",
        email: "",
        city: "",
        plan: CATALOGUE[0].name,
        message: "",
      });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="trial"
      data-testid="trial-form-section"
      className="relative bg-coal px-6 md:px-12 py-28 md:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <span className="text-xs uppercase tracking-[0.4em] text-gold">
            Chapter — The Invitation
          </span>
          <MaskedLines
            lines={["Book Your", "100-Night", "Trial."]}
            className="mt-6 font-display text-6xl md:text-[7vw] font-light uppercase leading-[0.85] text-white"
          />
          <p className="mt-8 max-w-md text-base font-light text-zinc-400">
            Sleep on a Shreeram for 100 nights. If it isn&apos;t the deepest
            rest of your life, we&apos;ll collect it — no questions asked.
          </p>
          <div className="mt-12 hidden md:block overflow-hidden rounded-2xl border border-white/10">
            <img
              src={IMAGES.editorial}
              alt="Trial bed"
              className="h-64 w-full object-cover"
            />
          </div>
        </div>

        <motion.form
          onSubmit={submit}
          data-testid="trial-form"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input
              className={FIELD}
              placeholder="Full name"
              value={form.name}
              onChange={update("name")}
              data-testid="trial-input-name"
            />
            <input
              className={FIELD}
              placeholder="Email address"
              type="email"
              value={form.email}
              onChange={update("email")}
              data-testid="trial-input-email"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input
              className={FIELD}
              placeholder="City"
              value={form.city}
              onChange={update("city")}
              data-testid="trial-input-city"
            />
            <select
              className={`${FIELD} appearance-none`}
              value={form.plan}
              onChange={update("plan")}
              data-testid="trial-select-plan"
            >
              {CATALOGUE.map((c) => (
                <option
                  key={c.name}
                  value={c.name}
                  className="bg-coal text-white"
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            className={`${FIELD} resize-none`}
            placeholder="Anything we should know? (optional)"
            rows={2}
            value={form.message}
            onChange={update("message")}
            data-testid="trial-input-message"
          />

          <button
            type="submit"
            disabled={loading}
            data-testid="trial-submit-button"
            className="group relative mt-2 inline-flex w-fit items-center gap-3 overflow-hidden rounded-full bg-gold px-9 py-4 text-sm uppercase tracking-[0.2em] text-void disabled:opacity-60"
          >
            <span className="relative z-10 flex items-center gap-3">
              {loading ? "Sending..." : "Claim My Trial"}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.form>
      </div>
    </section>
  );
}
