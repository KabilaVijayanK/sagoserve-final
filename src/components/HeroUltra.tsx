import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

/* ── stagger helper ── */
const stagger = (i: number) => ({ delay: 0.1 + i * 0.12, duration: 0.7 });

const checkItems = [
  { label: "Certified Quality",    col: 0 },
  { label: "High-Grade Products",  col: 1 },
  { label: "Cooperative Pricing",  col: 0 },
  { label: "Member Benefits",      col: 1 },
];

const HeroUltra = () => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .hu2, .hu2 * { font-family: 'Inter', sans-serif !important; box-sizing: border-box; }
        .hu2 a { text-decoration: none; }
        .more-btn:hover .arrow-circle { background: #5f9bf5 !important; }
        .more-btn:hover .arrow-circle span { color: #fff !important; }
        .more-btn:hover { border-color: #5f9bf5 !important; background: rgba(95, 155, 245, 0.08) !important; }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(95, 155, 245, 0.45); }
          70%  { box-shadow: 0 0 0 12px rgba(95, 155, 245, 0); }
          100% { box-shadow: 0 0 0 0 rgba(95, 155, 245, 0); }
        }
        .badge-pill { animation: pulse-ring 2.4s ease-out infinite; }
        .scroll-btn { animation: float 2.8s ease-in-out infinite; }
        @media (max-width: 900px) {
          .hu2-section { flex-direction: column !important; height: auto !important; min-height: auto !important; }
          .hu2-left { width: 100% !important; padding: 40px 24px 32px !important; }
          .hu2-right { padding: 0 16px 32px !important; }
          .hu2-headline span { font-size: clamp(32px, 7vw, 48px) !important; }
          .hu2-photo { width: 100% !important; border-radius: 16px !important; height: 320px !important; }
          .hu2-vertlabel { display: none !important; }
        }
        @media (max-width: 480px) {
          .hu2-left { padding: 32px 16px 24px !important; }
          .hu2-right { padding: 0 12px 24px !important; }
          .hu2-headline span { font-size: clamp(28px, 8vw, 38px) !important; }
          .hu2-checklist { grid-template-columns: 1fr !important; }
          .hu2-photo { height: 240px !important; }
        }
      `}</style>

      <section
        ref={ref}
        className="hu2 hu2-section"
        style={{
          width: "100%",
          height: "100vh",
          minHeight: "640px",
          display: "flex",
          overflow: "hidden",
          background: "#FFFFFF",
          position: "relative",
        }}
      >

        {/* ══════════════════════════════════════════
            LEFT HALF — dark charcoal, all text content
        ══════════════════════════════════════════ */}
        <div className="hu2-left" style={{
          width: "50%",
          flexShrink: 0,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 56px 60px 56px",
          overflow: "hidden",
        }}>

          {/* ── FAINT WATERMARK "SAGOSERVE" ── */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 1.2, duration: 1.4 }}
          >
            <div style={{
              position: "absolute",
              bottom: "42%",
              left: "-60px",
              transform: "translateY(50%)",
              fontSize: "clamp(80px, 11vw, 140px)",
              fontWeight: 900,
              color: "rgba(95, 155, 245, 0.08)",
              letterSpacing: "-0.04em",
              whiteSpace: "nowrap",
              userSelect: "none",
              pointerEvents: "none",
              lineHeight: 1,
            }}>
              SAGOSERVE
            </div>
          </motion.div>

          {/* ── BADGE ── "• STARTED IN 1965" */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={stagger(0)}
            style={{ marginBottom: "28px" }}
          >
            <div
              className="badge-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(95, 155, 245, 0.1)",
                border: "1px solid rgba(95, 155, 245, 0.3)",
                borderRadius: "999px",
                padding: "7px 16px 7px 10px",
              }}
            >
              <span style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#5f9bf5", display: "block", flexShrink: 0,
              }} />
              <span style={{
                fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.18em",
                color: "#5f9bf5",
                textTransform: "uppercase",
              }}>
                SINCE 1965
              </span>
            </div>
          </motion.div>

          {/* ── MEGA HEADLINE ──
              Line 1: "Where Purity" — white, 900
              Line 2: "Matters, And" — white
              Line 3: "Quality Comes" — gold
              Line 4: "Alive" — gold
          ── */}
          <div className="hu2-headline" style={{ marginBottom: "24px", overflow: "visible" }}>
            {[
              { text: "Where Purity",    color: "#1a1a2e" },
              { text: "Matters, And",    color: "#1a1a2e" },
              { text: "Quality Comes",   color: "#5f9bf5" },
              { text: "Alive",           color: "#5f9bf5" },
            ].map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.div
                  initial={{ y: "110%", opacity: 0 }}
                  animate={inView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ delay: 0.18 + i * 0.10, duration: 0.75 }}
                >
                  <span style={{
                    display: "block",
                    fontSize: "clamp(44px, 5.6vw, 78px)",
                    fontWeight: 900,
                    lineHeight: 1.06,
                    letterSpacing: "-0.03em",
                    color: line.color,
                  }}>
                    {line.text}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* ── CHECKLIST — 2 columns ── */}
          <motion.div
            className="hu2-checklist"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={stagger(4)}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px 40px",
              marginBottom: "28px",
            }}
          >
            {checkItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -14 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.58 + i * 0.09, duration: 0.55, ease: "easeOut" }}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{
                  color: "#5f9bf5", fontSize: "15px",
                  fontWeight: 700, lineHeight: 1, flexShrink: 0,
                }}>✓</span>
                <span style={{
                  fontSize: "13.5px", fontWeight: 700,
                  color: "#1a1a2e", letterSpacing: "0.005em",
                }}>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── BODY PARAGRAPH ── */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={stagger(6)}
            style={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#555555",
              marginBottom: "36px",
              maxWidth: "520px",
            }}
          >
            Whether it's cooperative supply, fair pricing, or a commercial
            export — we are always dedicated to bringing your vision to life.
            Our decades of service and the collective strength of hundreds of
            manufacturers speak better than words.
          </motion.p>

          {/* ── CTA PILL — "More About Us →" ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={stagger(7)}
          >
            <Link
              to="/about"
              className="more-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "14px",
                background: "transparent",
                border: "1.5px solid #5f9bf5",
                borderRadius: "999px",
                padding: "10px 10px 10px 24px",
                color: "#5f9bf5",
                fontSize: "14px",
                fontWeight: 700,
                transition: "border-color 0.3s, background 0.3s",
                letterSpacing: "0.01em",
              }}
            >
              More About Us
              <span
                className="arrow-circle"
                style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  background: "#5f9bf5",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.25s",
                }}
              >
                <span style={{ color: "#fff", fontSize: "17px", lineHeight: 1, transition: "color 0.25s" }}>↗</span>
              </span>
            </Link>
          </motion.div>

        </div>

        {/* ══════════════════════════════════════════
            RIGHT HALF — large photo, rounded corners with vertical labels
        ══════════════════════════════════════════ */}
        <div
          className="hu2-right"
          style={{
            flex: "1 1 0",
            position: "relative",
            overflow: "hidden",
            paddingTop: "40px",
            paddingBottom: "40px",
            paddingRight: "40px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            background: "#FFFFFF",
          }}
        >
          {/* ── VERTICAL TEXT LABEL — "EXPLORE" (top right) ── */}
          <motion.div
            className="hu2-vertlabel"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              position: "absolute",
              top: "40px",
              right: "40px",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#5f9bf5",
              textTransform: "uppercase",
            }}
          >
            Explore
          </motion.div>

          {/* ── VERTICAL TEXT LABEL — "TOP PARTS" (bottom right) ── */}
          <motion.div
            className="hu2-vertlabel"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.95, duration: 0.8 }}
            style={{
              position: "absolute",
              bottom: "40px",
              right: "40px",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#5f9bf5",
              textTransform: "uppercase",
            }}
          >
            Top Parts
          </motion.div>

          {/* Photo without scaling */}
          <motion.div
            className="hu2-photo"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 1.1 }}
            style={{
              width: "92%",
              height: "100%",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(95, 155, 245, 0.15)",
              position: "relative",
            }}
          >
            {/* DUMMY IMAGE — replace src with your actual image */}
            <img
              src="/Photos/Image 2.JPG"
              alt="Quality facility"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
                const parent = el.parentElement!;
                parent.style.background =
                  "linear-gradient(140deg,#f0f4f8 0%,#e8eef7 55%,#dae5f0 100%)";
              }}
            />
          </motion.div>

          {/* Subtle vignette on left edge of photo for blending */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "linear-gradient(to right, rgba(255,255,255,0.2) 0%, transparent 40%)",
            }}
          />

          {/* ── SCROLL-UP BUTTON bottom-right ── */}
          <motion.button
            className="scroll-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.0, duration: 0.55, ease: "backOut" }}
            style={{
              position: "absolute",
              bottom: "28px",
              right: "28px",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "#5f9bf5",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(95, 155, 245, 0.35)",
              backdropFilter: "blur(8px)",
              zIndex: 10,
            }}
          >
            ↑
          </motion.button>
        </div>

      </section>
    </>
  );
};

export default HeroUltra;