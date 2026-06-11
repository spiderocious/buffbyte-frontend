import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "@ui/icons";
import { ROUTES } from "@shared/constants/routes";
import { fadeUp, overline, sectionH2 } from "../lib/tokens";

/* Three-tier pricing. Prices are placeholders flagged in ASSETS.md. */

type Tier = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "For trying it on your next post.",
    features: [
      "10 content scores a month",
      "All 14 dimensions",
      "Basic teleprompter",
    ],
    cta: "Get started free",
  },
  {
    name: "Creator",
    price: "$19",
    cadence: "per month",
    blurb: "For creators posting every day.",
    features: [
      "Unlimited content scores",
      "Script analysis + retention",
      "Full teleprompter with WPM control",
      "Suggested rewrites",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Studio",
    price: "$49",
    cadence: "per month",
    blurb: "For teams and multi-channel studios.",
    features: [
      "Everything in Creator",
      "Up to 5 seats",
      "Brand voice profiles",
      "Priority support",
    ],
    cta: "Start free trial",
  },
];

export function LandingPricing() {
  return (
    <section
      id="vb-pricing"
      style={{
        background: "var(--sheet)",
        borderTop: "1px solid var(--hair)",
        padding: "clamp(80px, 12vw, 140px) 0",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 48px" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          custom={0}
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span style={{ ...overline, marginBottom: 16 }}>Pricing</span>
          <h2 style={{ ...sectionH2, margin: "0 auto 16px", maxWidth: 620 }}>
            Start free, upgrade when it pays for itself
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--ink-3)",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            No card to start. Cancel anytime.
          </p>
        </motion.div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 22,
            alignItems: "start",
          }}
        >
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i * 0.1}
              variants={fadeUp}
              style={{
                position: "relative",
                background: t.featured ? "var(--ink)" : "var(--paper)",
                color: t.featured ? "#fff" : "var(--ink)",
                border: t.featured
                  ? "1px solid var(--ink)"
                  : "1px solid var(--hair)",
                borderRadius: 18,
                padding: 30,
                boxShadow: t.featured
                  ? "0 30px 60px -24px rgba(28,27,25,0.4)"
                  : "none",
                transform: t.featured ? "translateY(-8px)" : "none",
              }}
            >
              {t.featured && (
                <span
                  style={{
                    position: "absolute",
                    top: 18,
                    right: 18,
                    background: "var(--accent)",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "5px 10px",
                    borderRadius: 999,
                  }}
                >
                  Most popular
                </span>
              )}
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 10,
                  color: t.featured ? "rgba(255,255,255,0.9)" : "var(--ink-2)",
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 6,
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 44,
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {t.price}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: t.featured
                      ? "rgba(255,255,255,0.55)"
                      : "var(--ink-4)",
                  }}
                >
                  {t.cadence}
                </span>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: t.featured ? "rgba(255,255,255,0.6)" : "var(--ink-3)",
                  margin: "0 0 22px",
                  lineHeight: 1.5,
                }}
              >
                {t.blurb}
              </p>
              <Link
                to={ROUTES.AUTH.REGISTER}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 24,
                  background: t.featured ? "#fff" : "var(--accent)",
                  color: t.featured ? "var(--ink)" : "#fff",
                  fontWeight: 700,
                  fontSize: 15,
                  padding: "13px 18px",
                  borderRadius: 10,
                  textDecoration: "none",
                }}
              >
                {t.cta} <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                }}
              >
                {t.features.map((feat) => (
                  <li
                    key={feat}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 14,
                      color: t.featured
                        ? "rgba(255,255,255,0.85)"
                        : "var(--ink-2)",
                    }}
                  >
                    <span
                      style={{
                        color: t.featured ? "#9D86FF" : "var(--accent)",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      <Check size={15} strokeWidth={2.5} />
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
