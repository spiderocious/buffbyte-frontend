import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "@ui/icons";
import { ROUTES } from "@shared/constants/routes";
import { fadeUp } from "./animations";

const FREE_BULLETS = [
  "5 content analyses per month",
  "3 script analyses per month",
  "Full teleprompter access",
  "All 14 scoring dimensions",
  "Platform-specific insights",
] as const;

export function LandingPricing() {
  return (
    <section
      id="pricing"
      style={{
        background: "#0A0A09",
        padding: "clamp(64px, 10vw, 120px) 20px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 12,
            }}
          >
            Pricing
          </p>
          <h2
            style={{
              fontSize: "clamp(26px, 4.5vw, 48px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.028em",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Simple, creator-friendly pricing
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              color: "rgba(255,255,255,0.45)",
              maxWidth: 400,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Start free. 
          </p>
        </motion.div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            maxWidth: 760,
            margin: "0 auto",
          }}
        >
          {/* Free */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: "clamp(28px, 4vw, 36px) clamp(24px, 3vw, 32px)",
              width: 500,
              maxWidth: "100%",
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: 8,
              }}
            >
              Free
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 4,
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontSize: "clamp(40px, 5vw, 48px)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                }}
              >
                $0
              </span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>
                /month
              </span>
            </div>
            <p
              style={{
                fontSize: 13.5,
                color: "rgba(255,255,255,0.4)",
                marginBottom: 28,
              }}
            >
              No credit card required
            </p>
            <Link
              to={ROUTES.AUTH.LOGIN}
              style={{
                display: "block",
                textAlign: "center",
                padding: "12px 20px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                marginBottom: 28,
              }}
            >
              Get started free
            </Link>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {FREE_BULLETS.map((b) => (
                <li
                  key={b}
                  style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                >
                  <Check
                    size={14}
                    color="rgba(255,255,255,0.4)"
                    strokeWidth={2.5}
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  <span
                    style={{
                      fontSize: "clamp(12.5px, 1.4vw, 13.5px)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
