"use client";

import Link from "next/link";
import { useEffect } from "react";
import { initCursor } from "../../js/cursor";

const layerData = {
  "premium-fabric": {
    eyebrow: "Layer 01",
    title: "Premium Fabric",
    description:
      "A breathable surface layer crafted for softness, coolness, and a plush first touch every night.",
    bullets: [
      "Ultra-soft hand-feel",
      "Breathable weave for airflow",
      "Luxury finish with lasting durability",
    ],
    highlights: ["Cloud-soft comfort", "Cool-touch texture", "Refined elegance"],
  },
  "memory-foam": {
    eyebrow: "Layer 02",
    title: "Memory Foam",
    description:
      "Responsive memory foam contours to your body and reduces pressure points for deep, restorative rest.",
    bullets: [
      "Pressure-relieving support",
      "Body-hugging comfort",
      "Quiet motion isolation",
    ],
    highlights: ["Adaptive support", "Pressure relief", "Zero sag design"],
  },
  "orthopedic-support": {
    eyebrow: "Layer 03",
    title: "Orthopedic Support",
    description:
      "Engineered to align the spine and support natural posture while maintaining balanced comfort.",
    bullets: [
      "Spinal alignment support",
      "Targeted back relief",
      "Balanced firmness for all sleep styles",
    ],
    highlights: ["Posture support", "Back comfort", "Long-term resilience"],
  },
  "pocket-spring": {
    eyebrow: "Layer 04",
    title: "Pocket Spring",
    description:
      "Individually wrapped springs provide responsive lift, support, and motion isolation across the mattress.",
    bullets: [
      "Independent spring movement",
      "Excellent edge support",
      "Balanced bounce and softness",
    ],
    highlights: ["Responsive feel", "Motion isolation", "Enhanced support"],
  },
  "high-density-base": {
    eyebrow: "Layer 05",
    title: "High Density Base",
    description:
      "A durable foundation layer built to maintain structure, stability, and lasting performance year after year.",
    bullets: [
      "Strong structural support",
      "Superior durability",
      "Stable foundation for every layer above",
    ],
    highlights: ["Lasting strength", "Stability", "Premium foundation"],
  },
};

export default function LayerDetail({ slug }) {
  const layer = layerData[slug] ?? layerData["premium-fabric"];

  useEffect(() => {
    const destroyCursor = initCursor();
    return () => destroyCursor?.();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#f5f3eb",
        padding: "3rem 1.5rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Link
          href="/#layers"
          style={{
            display: "inline-block",
            marginBottom: "2rem",
            color: "#e8c56b",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          ← Back to layers
        </Link>

        <section
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "24px",
            padding: "2rem",
            background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              fontSize: "0.85rem",
              color: "#e8c56b",
              marginBottom: "0.75rem",
            }}
          >
            {layer.eyebrow}
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}>
            {layer.title}
          </h1>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#d9d2c6", marginBottom: "1.5rem" }}>
            {layer.description}
          </p>

          <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {layer.bullets.map((bullet) => (
              <div key={bullet} style={{ padding: "0.85rem 1rem", background: "rgba(255,255,255,0.06)", borderRadius: "12px" }}>
                {bullet}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {layer.highlights.map((highlight) => (
              <span
                key={highlight}
                style={{
                  padding: "0.6rem 0.95rem",
                  borderRadius: "999px",
                  background: "rgba(232, 197, 107, 0.16)",
                  color: "#f6e6b2",
                  fontSize: "0.95rem",
                }}
              >
                {highlight}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="cur-dot" id="cdot" />
      <div className="cur-ring" id="cring" />
    </main>
  );
}
