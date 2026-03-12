import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const empoweringLines = [
  "Salem's Sago Industry",
  "Cooperative Strength",
  "Farmers and Manufacturers",
  "Members' Interests",
  "Merchants and Trade",
  "Quality and Fair Pricing",
  "Sustainable Industrial Growth",
];

const rateData = [
  { label: "Sago",         value: 3200 },
  { label: "Starch",       value: 2850 },
  { label: "Broken Sago",  value: 2600 },
];

const IntroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [lineIndex, setLineIndex]   = useState(0);
  const [activeRate, setActiveRate] = useState(0);
  const [displayed, setDisplayed]   = useState(0); // count-up for active rate

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.6], [1, 0.96]);
  const y       = useTransform(scrollYProgress, [0, 0.6], [0, 120]);

  /* rotating empowering line */
  useEffect(() => {
    const t = setInterval(() => setLineIndex((p) => (p + 1) % empoweringLines.length), 2400);
    return () => clearInterval(t);
  }, []);

  /* cycle active rate every 2.8s */
  useEffect(() => {
    const t = setInterval(() => setActiveRate((p) => (p + 1) % rateData.length), 2800);
    return () => clearInterval(t);
  }, []);

  /* count-up whenever active rate changes */
  useEffect(() => {
    const target = rateData[activeRate].value;
    let current  = 0;
    const step   = Math.ceil(target / 50);
    const t = setInterval(() => {
      current = Math.min(current + step, target);
      setDisplayed(current);
      if (current >= target) clearInterval(t);
    }, 22);
    return () => clearInterval(t);
  }, [activeRate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .hs, .hs * { font-family: 'Inter', sans-serif !important; box-sizing: border-box; }
        .hs a { text-decoration: none; }
        .cta-pill:hover { background: rgba(255,255,255,0.08) !important; }
        @media (max-width: 768px) {
          .hs-layout { flex-direction: column !important; padding: 20px !important; height: auto !important; min-height: 100% !important; padding-top: 80px !important; gap: 20px !important; align-items: flex-start !important; }
          .hs-left { padding-right: 0 !important; }
          .hs-rates { width: 100% !important; margin-right: 0 !important; margin-top: 16px !important; margin-bottom: 24px !important; }
          .hs-fixed { display: none !important; }
          .hs-headline { font-size: clamp(32px, 9vw, 48px) !important; }
        }
        @media (max-width: 480px) {
          .hs-layout { padding: 16px !important; padding-top: 60px !important; }
          .hs-headline { font-size: clamp(28px, 8vw, 40px) !important; }
        }
      `}</style>

      <section
        ref={ref}
        className="hs"
        style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}
      >
        {/* ── VIDEO ── */}
        <video autoPlay loop muted playsInline style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%", objectFit: "cover", zIndex: 0,
        }}>
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* ── OVERLAY ── dark left, lighter centre-right exactly like image */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(100deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.50) 45%, rgba(0,0,0,0.20) 100%)",
        }} />

        {/* ── SCROLL CONTAINER ── */}
        <motion.div style={{ opacity, scale, y, position: "relative", zIndex: 10, height: "100%" }}>

          {/* ════ OUTER PADDING — flush left like image ════ */}
          <div className="hs-layout" style={{
            height: "125%",
            display: "flex",
            alignItems: "center",
            padding: "0 0 0 40px",
          }}>

            {/* ════ LEFT CONTENT BLOCK ════ */}
            <div className="hs-left" style={{ flex: "1 1 0", minWidth: 0, paddingRight: "24px" }}>

              {/* • FAST AND RELIABLE style badge */}
              <motion.div
                initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "16px" }}
              >
                <span style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "#D4A847", display: "block", flexShrink: 0,
                }} />
                <span style={{
                  fontSize: "11px", fontWeight: 600,
                  letterSpacing: "0.18em", color: "rgba(255,255,255,0.72)",
                  textTransform: "uppercase",
                }}>
                  TRUSTED &amp; COOPERATIVE
                </span>
              </motion.div>

              {/* ── GIANT HEADLINE
                  Image: starts at absolute left edge of safe area
                  "Find Your Inspired" — one line
                  "Interior Design"    — second line
                  Both pure #FFF, weight 900, very large
              ── */}
              <motion.h1
                className="hs-headline"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.65 }}
                style={{
                  fontSize: "clamp(56px, 7.4vw, 100px)",
                  fontWeight: 900,
                  lineHeight: 1.0,
                  letterSpacing: "-0.025em",
                  color: "#FFFFFF",
                  margin: "0 0 30px 0",
                  maxWidth: "920px",
                }}
              >
                Your Trusted Source For Sago &amp; Starch
              </motion.h1>

              {/* ── BODY COPY
                  Image: indented to roughly where "Y" of "Your" starts on line 1
                  i.e. ~180px left margin, left-aligned text block
              ── */}
              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44, duration: 0.55 }}
                style={{
                  fontSize: "14.5px",
                  fontWeight: 400,
                  lineHeight: 1.68,
                  color: "rgba(255,255,255,0.72)",
                  marginLeft: "0px",
                  marginBottom: "34px",
                  maxWidth: "620px",
                }}
              >
                Whether it's cooperative supply, fair pricing, or market access — SagoServe is always dedicated to empowering{" "}
                <motion.span
                  key={lineIndex}
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  style={{ color: "#5f9bf5", fontWeight: 500 }}
                >
                  {empoweringLines[lineIndex]}
                </motion.span>
                .
              </motion.p>

              {/* ── CTA BUTTON — white border pill, amber arrow ── */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.60 }}
                style={{ marginLeft: "0px" }}
              >
                <Link
                  to="/contact"
                  className="cta-pill"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    border: "1.5px solid rgba(255,255,255,0.85)",
                    borderRadius: "999px",
                    padding: "10px 10px 10px 22px",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 600,
                    background: "transparent",
                    transition: "background 0.25s",
                  }}
                >
                  Enquire Now
                  <span style={{
                    width: "34px", height: "34px", borderRadius: "50%",
                    background: "#5f9bf5",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#000", fontSize: "15px", fontWeight: 700, flexShrink: 0,
                  }}>↗</span>
                </Link>
              </motion.div>
            </div>

            {/* ════ RATES CARD — exact position/size of the 360+ card in image ════
                Brown semi-transparent, rounded corners, same padding as reference
            ════ */}
            <motion.div
  className="hs-rates"
  initial={{ opacity: 0, y: 28 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.48, duration: 0.55 }}
  style={{
    position: "relative",
    flexShrink: 0,
    width: "280px",
    borderRadius: "20px",

    /* GLASS BASE */
    background:
      "linear-gradient(145deg, rgba(80,60,25,0.55), rgba(25,18,8,0.75))",

    backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",

    /* GLASS BORDER */
    border: "1px solid rgba(255,255,255,0.08)",

    /* DEPTH SHADOW */
    boxShadow: `
      0 20px 60px rgba(0,0,0,0.55),
      inset 0 1px 0 rgba(255,255,255,0.08)
    `,

    padding: "34px 30px",
    marginRight: "40px",
    overflow: "hidden",
  }}
>
  {/* GLASS LIGHT REFLECTION */}
  <div
    style={{
      position: "absolute",
      top: "-40%",
      left: "-30%",
      width: "180%",
      height: "180%",
      background:
        "linear-gradient(120deg, rgba(255,255,255,0.12), transparent 60%)",
      transform: "rotate(25deg)",
      pointerEvents: "none",
    }}
  />

  {/* TOP LABEL */}
  <div
    style={{
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.18em",
      color: "rgba(255,255,255,0.45)",
      textTransform: "uppercase",
      marginBottom: "10px",
    }}
  >
    TODAY'S RATES
  </div>

  {/* RATE NUMBER */}
  <motion.div
    key={activeRate}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div
      style={{
        fontSize: "64px",
        fontWeight: 800,
        lineHeight: 1,
        color: "#ffffff",
        letterSpacing: "-0.03em",
        marginBottom: "6px",
      }}
    >
      ₹{displayed.toLocaleString()}
    </div>

    <div
      style={{
        fontSize: "14px",
        fontWeight: 400,
        color: "rgba(255,255,255,0.60)",
        lineHeight: 1.5,
        marginBottom: "22px",
      }}
    >
      {rateData[activeRate].label}
      <br />
      Per Metric Ton
    </div>
  </motion.div>

  {/* DIVIDER */}
  <div
    style={{
      height: "1px",
      background: "rgba(255,255,255,0.10)",
      marginBottom: "18px",
    }}
  />

  {/* RATE LIST */}
  {rateData.map((r, i) => (
    <div
      key={r.label}
      onClick={() => setActiveRate(i)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        cursor: "pointer",
        opacity: activeRate === i ? 1 : 0.55,
        transition: "all 0.25s",
      }}
    >
      <span
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: "0.02em",
        }}
      >
        {r.label}
      </span>

      <span
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color:
            activeRate === i
              ? "#D4A847"
              : "rgba(255,255,255,0.50)",
        }}
      >
        ₹{r.value.toLocaleString()}
      </span>
    </div>
  ))}
</motion.div>
            
          </div>
        </motion.div>

        {/* ── SCROLL ARROW centre-bottom ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{
            position: "absolute", bottom: "32px",
            left: "50%", transform: "translateX(-50%)", zIndex: 20,
          }}
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.42)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.65)", fontSize: "16px", cursor: "pointer",
            }}
          >↓</motion.div>
        </motion.div>

        {/* ── FIXED SIDE: ENQUIRE amber ── */}
        <Link to="/contact" className="hs-fixed" style={{
          position: "fixed", right: 0, top: "36%", transform: "translateY(-50%)",
          background: "#D4A847", color: "#000",
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em",
          padding: "28px 10px", borderRadius: "10px 0 0 10px",
          writingMode: "vertical-rl", zIndex: 50,
          boxShadow: "0 4px 20px rgba(0,0,0,0.28)",
        }}>
          ENQUIRE
        </Link>

        {/* ── FIXED SIDE: TOP RATES dark glass ── */}
        <div className="hs-fixed" style={{
          position: "fixed", right: 0, top: "58%", transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.72)", color: "#fff",
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em",
          padding: "22px 10px", borderRadius: "10px 0 0 10px",
          writingMode: "vertical-rl", zIndex: 50,
          border: "1px solid rgba(255,255,255,0.11)",
          backdropFilter: "blur(8px)",
        }}>
          TOP RATES
        </div>

      </section>
    </>
  );
};

export default IntroSection;