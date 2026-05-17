import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight } from "@ui/icons";
import { ROUTES } from "@shared/constants/routes";
import { fadeUp } from "./animations";

export function LandingHero() {
  const orbRef1 = useRef<HTMLDivElement>(null);
  const orbRef2 = useRef<HTMLDivElement>(null);
  const orbRef3 = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating orbs
      gsap.to(orbRef1.current, {
        y: -30,
        x: 20,
        rotation: 15,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(orbRef2.current, {
        y: 25,
        x: -15,
        rotation: -10,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
      gsap.to(orbRef3.current, {
        y: -20,
        x: 10,
        rotation: 8,
        duration: 7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });
      // Floating product image
      gsap.to(imageRef.current, {
        y: -16,
        rotation: 1.5,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#0A0A09",
        paddingTop: 120,
        paddingBottom: 80,
      }}
    >
      {/* Wave background */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          backgroundImage: "url(/landing/wavy.png)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />

      {/* Animated orbs */}
      <div
        ref={orbRef1}
        style={{
          position: "absolute",
          top: "15%",
          left: "8%",
          width: 320,
          height: 320,
          background:
            "radial-gradient(circle, rgba(83,58,253,0.22) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />
      <div
        ref={orbRef2}
        style={{
          position: "absolute",
          top: "30%",
          right: "6%",
          width: 260,
          height: 260,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          filter: "blur(50px)",
        }}
      />
      <div
        ref={orbRef3}
        style={{
          position: "absolute",
          bottom: "20%",
          left: "15%",
          width: 200,
          height: 200,
          background:
            "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />

      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(700px, 90vw)",
          height: 400,
          background:
            "radial-gradient(ellipse at center, rgba(83,58,253,0.16) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            style={{
              fontSize: "clamp(36px, 6.5vw, 80px)",
              fontWeight: 900,
              letterSpacing: "-0.034em",
              lineHeight: 1.03,
              color: "#fff",
              margin: "0 0 24px",
              maxWidth: 860,
            }}
          >
            Create content that{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #533AFD 0%, #A78BFA 50%, #60A5FA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              actually performs
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
            style={{
              fontSize: "clamp(15px, 2.2vw, 20px)",
              color: "rgba(255,255,255,0.52)",
              lineHeight: 1.65,
              maxWidth: 540,
              margin: "0 0 40px",
              fontWeight: 400,
            }}
          >
            BuffByte analyzes your content, scores your scripts, and helps you
            deliver every word with precision.
            <br />
            <br />
            <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
              Powered by the world's most advanced AI.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.3}
            variants={fadeUp}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 60,
              width: "100%",
            }}
          >
            <Link
              to={ROUTES.AUTH.LOGIN}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--accent)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "clamp(14px, 2vw, 15px)",
                padding: "clamp(12px, 2vw, 14px) clamp(20px, 3vw, 28px)",
                borderRadius: 10,
                textDecoration: "none",
                boxShadow: "0 0 48px rgba(83,58,253,0.45)",
                transition: "transform 200ms, box-shadow 200ms",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 64px rgba(83,58,253,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 48px rgba(83,58,253,0.45)";
              }}
            >
              Get started free <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <a
              href="#how-it-works"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.8)",
                fontWeight: 600,
                fontSize: "clamp(14px, 2vw, 15px)",
                padding: "clamp(12px, 2vw, 14px) clamp(20px, 3vw, 28px)",
                borderRadius: 10,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "background 200ms",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.06)";
              }}
            >
              See how it works
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
