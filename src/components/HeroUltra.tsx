import { motion, useScroll, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* ── stagger helper ── */
const stagger = (i: number) => ({ delay: 0.1 + i * 0.12, duration: 0.7 });

const checkItems = [
  { label: "Certified Quality",   col: 0 },
  { label: "High-Grade Products", col: 1 },
  { label: "Cooperative Pricing", col: 0 },
  { label: "Member Benefits",     col: 1 },
];

/* ── simple hook to track window width ── */
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

const HeroUltra = () => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const width     = useWindowWidth();
  const isMobile  = width <= 480;
  const isTablet  = width > 480 && width <= 900;
  const isDesktop = width > 900;

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
      `}</style>

      <section
        ref={ref}
        className="hu2"
        style={{
          width: "100%",
          minHeight: isDesktop ? "100vh" : "auto",
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          overflow: "visible",
          background: "#FFFFFF",
          position: "relative",
        }}
      >

        {/* ══════════════════════════════════════════
            LEFT / TOP — text content
        ══════════════════════════════════════════ */}
        <div style={{
          width: isDesktop ? "50%" : "100%",
          flexShrink: 0,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: isMobile
            ? "40px 20px 32px"
            : isTablet
            ? "48px 32px 40px"
            : "80px 56px 80px 56px",
          overflow: "visible",
        }}>

          {/* ── FAINT WATERMARK ── */}
          {isDesktop && (
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 1.2, duration: 1.4 }}
            >
              <div style={{
                position: "absolute",
                bottom: "42%",
                left: "-20px",
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
          )}

          {/* ── BADGE ── */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={stagger(0)}
            style={{ marginBottom: isMobile ? "20px" : "28px" }}
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

          {/* ── MEGA HEADLINE ── */}
          <div style={{ marginBottom: isMobile ? "20px" : "24px", overflow: "visible" }}>
            {[
              { text: "Where Purity",     color: "#1a1a2e" },
              { text: "Matters, And",     color: "#1a1a2e" },
              { text: "Excellence Comes", color: "#5f9bf5" },
              { text: "Alive",            color: "#5f9bf5" },
            ].map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.div
                  initial={{ y: "110%", opacity: 0 }}
                  animate={inView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ delay: 0.18 + i * 0.10, duration: 0.75 }}
                >
                  <span style={{
                    display: "block",
                    fontSize: isMobile
                      ? "clamp(32px, 9vw, 44px)"
                      : isTablet
                      ? "clamp(36px, 7vw, 56px)"
                      : "clamp(44px, 5.6vw, 78px)",
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

          {/* ── CHECKLIST ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={stagger(4)}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "8px 0" : "10px 40px",
              marginBottom: isMobile ? "20px" : "28px",
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
              fontSize: isMobile ? "13px" : "14px",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#555555",
              marginBottom: isMobile ? "28px" : "36px",
              maxWidth: "520px",
            }}
          >
            <br />
            SAGOSERVE – Salem Starch and Sago Manufacturers' Service Industrial Co-operative Society Ltd., is registered under the Tamil Nadu Co-operative Societies Act, 1961, and functions under the administrative control of the Industries Commissioner and Director of Industries and Commerce, Government of Tamil Nadu.<br /><br />
            The Society was formed to address challenges such as inadequate credit facilities, unorganized marketing, lack of warehousing infrastructure, and exploitation by middlemen.
          </motion.p>

          {/* ── CTA PILL ── */}
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
            RIGHT / BOTTOM — photo
        ══════════════════════════════════════════ */}
        <div
          style={{
            flex: isDesktop ? "1 1 0" : "none",
            width: isDesktop ? undefined : "100%",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#FFFFFF",
            minHeight: isMobile ? "240px" : isTablet ? "340px" : undefined,
          }}
        >
          <motion.img
            src="photo1.png"
            alt="Quality facility"
            initial={{ opacity: 0, x: isDesktop ? 50 : 0, y: isDesktop ? 0 : 30 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 1.1 }}
            style={{
              width: "100%",
              height: isDesktop ? "50%" : "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              borderRadius: isDesktop ? "0" : isMobile ? "12px" : "16px",
              margin: isDesktop ? "0" : "0 16px 32px",
              maxWidth: isDesktop ? "none" : "calc(100% - 32px)",
            }}
          />

          {/* Vignette blend */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: isDesktop
                ? "linear-gradient(to right, rgba(255,255,255,0.2) 0%, transparent 40%)"
                : "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 30%)",
            }}
          />
        </div>

      </section>
    </>
  );
};

export default HeroUltra;