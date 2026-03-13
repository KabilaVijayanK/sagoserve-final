import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Icon components ────────────────────────────────────────────────────────────
const FoodIcon = () => (
  <svg viewBox="0 0 48 48" width="36" height="36" fill="none">
    <rect x="8" y="20" width="32" height="20" rx="3" fill="#8B1A1A" opacity="0.18"/>
    <rect x="12" y="20" width="24" height="20" rx="2" fill="#8B1A1A" opacity="0.22"/>
    <rect x="15" y="11" width="7" height="11" rx="1.5" fill="#8B1A1A"/>
    <rect x="26" y="11" width="7" height="11" rx="1.5" fill="#8B1A1A"/>
    <rect x="8" y="28" width="32" height="3" fill="#8B1A1A" opacity="0.35"/>
    <circle cx="24" cy="31" r="3" fill="#8B1A1A"/>
    <path d="M17 23 Q24 19 31 23" stroke="#8B1A1A" strokeWidth="1.5" fill="none"/>
  </svg>
);

const AdhesiveIcon = () => (
  <svg viewBox="0 0 48 48" width="36" height="36" fill="none">
    <path d="M14 9 L34 9 L38 18 L38 40 L10 40 L10 18 Z" fill="#8B1A1A" opacity="0.14"/>
    <rect x="17" y="13" width="14" height="3.5" rx="1" fill="#8B1A1A"/>
    <rect x="14" y="20" width="20" height="2" rx="1" fill="#8B1A1A" opacity="0.55"/>
    <rect x="14" y="25" width="20" height="2" rx="1" fill="#8B1A1A" opacity="0.55"/>
    <rect x="14" y="30" width="13" height="2" rx="1" fill="#8B1A1A" opacity="0.55"/>
    <circle cx="35" cy="22" r="6" fill="#8B1A1A" opacity="0.25"/>
    <path d="M33 22 L35 24 L39 19" stroke="#8B1A1A" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
  </svg>
);

const PaperIcon = () => (
  <svg viewBox="0 0 48 48" width="36" height="36" fill="none">
    <rect x="9" y="30" width="30" height="11" rx="2" fill="#8B1A1A" opacity="0.18"/>
    <ellipse cx="24" cy="30" rx="15" ry="5.5" fill="#8B1A1A" opacity="0.28"/>
    <ellipse cx="24" cy="30" rx="9" ry="3.5" fill="#8B1A1A" opacity="0.38"/>
    <rect x="11" y="11" width="6" height="19" rx="1.5" fill="#8B1A1A" opacity="0.5"/>
    <rect x="21" y="15" width="6" height="15" rx="1.5" fill="#8B1A1A" opacity="0.5"/>
    <rect x="31" y="13" width="6" height="17" rx="1.5" fill="#8B1A1A" opacity="0.5"/>
    <line x1="7" y1="38" x2="41" y2="38" stroke="#8B1A1A" strokeWidth="1.5"/>
  </svg>
);

const TextileIcon = () => (
  <svg viewBox="0 0 48 48" width="36" height="36" fill="none">
    <rect x="10" y="20" width="28" height="20" rx="2" fill="#8B1A1A" opacity="0.14"/>
    <path d="M10 20 Q24 14 38 20" fill="#8B1A1A" opacity="0.22"/>
    {[14, 19, 24, 29, 34].map((x) => (
      <line key={x} x1={x} y1="20" x2={x} y2="40" stroke="#8B1A1A" strokeWidth="1.2" opacity="0.45"/>
    ))}
    {[25, 30, 35].map((y) => (
      <path key={y} d={`M10 ${y} Q24 ${y - 3} 38 ${y}`} stroke="#8B1A1A" strokeWidth="1" fill="none" opacity="0.35"/>
    ))}
    <ellipse cx="24" cy="13" rx="6" ry="4" fill="#8B1A1A" opacity="0.28"/>
    <rect x="22" y="8" width="4" height="5" rx="1" fill="#8B1A1A"/>
  </svg>
);

const PackagingIcon = () => (
  <svg viewBox="0 0 48 48" width="34" height="34" fill="none">
    <rect x="10" y="19" width="28" height="21" rx="2" fill="#8B1A1A" opacity="0.18"/>
    <path d="M10 19 L24 12 L38 19" fill="#8B1A1A" opacity="0.32"/>
    <path d="M10 19 L24 12 L38 19 L38 40 L10 40 Z" stroke="#8B1A1A" strokeWidth="1.5" fill="none"/>
    <line x1="24" y1="12" x2="24" y2="40" stroke="#8B1A1A" strokeWidth="1.2"/>
    <line x1="10" y1="27" x2="38" y2="27" stroke="#8B1A1A" strokeWidth="1" opacity="0.45"/>
  </svg>
);

const PharmaIcon = () => (
  <svg viewBox="0 0 48 48" width="34" height="34" fill="none">
    <rect x="12" y="10" width="24" height="30" rx="4" fill="#8B1A1A" opacity="0.14"/>
    <rect x="14" y="12" width="20" height="26" rx="3" fill="#8B1A1A" opacity="0.2"/>
    <rect x="18" y="8" width="12" height="6" rx="2" fill="#8B1A1A" opacity="0.38"/>
    <line x1="24" y1="20" x2="24" y2="32" stroke="#8B1A1A" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="18" y1="26" x2="30" y2="26" stroke="#8B1A1A" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const ConstructionIcon = () => (
  <svg viewBox="0 0 48 48" width="34" height="34" fill="none">
    <rect x="8" y="23" width="32" height="17" rx="2" fill="#8B1A1A" opacity="0.18"/>
    <path d="M8 23 L24 11 L40 23" fill="#8B1A1A" opacity="0.28"/>
    <rect x="19" y="31" width="10" height="9" rx="1" fill="#8B1A1A" opacity="0.38"/>
    <rect x="10" y="27" width="7" height="5" rx="1" fill="#8B1A1A" opacity="0.28"/>
    <rect x="31" y="27" width="7" height="5" rx="1" fill="#8B1A1A" opacity="0.28"/>
    <line x1="24" y1="11" x2="24" y2="9" stroke="#8B1A1A" strokeWidth="2"/>
    <line x1="20" y1="9" x2="28" y2="9" stroke="#8B1A1A" strokeWidth="2"/>
  </svg>
);

const AnimalFeedIcon = () => (
  <svg viewBox="0 0 48 48" width="34" height="34" fill="none">
    <ellipse cx="24" cy="33" rx="15" ry="7" fill="#8B1A1A" opacity="0.18"/>
    <path d="M13 25 Q24 16 35 25 L35 33 Q24 39 13 33 Z" fill="#8B1A1A" opacity="0.22"/>
    <circle cx="18" cy="18" r="5" fill="#8B1A1A" opacity="0.28"/>
    <circle cx="30" cy="18" r="5" fill="#8B1A1A" opacity="0.28"/>
    <path d="M18 18 Q24 14 30 18" stroke="#8B1A1A" strokeWidth="1.5" fill="none"/>
    <path d="M15 25 Q24 21 33 25" stroke="#8B1A1A" strokeWidth="1" fill="none" opacity="0.45"/>
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────────
const topCards = [
  { id: "01", title: "Food Processing Industries", description: "Used as a natural thickener and stabilizer in food products.", icon: <FoodIcon /> },
  { id: "02", title: "Adhesive & Glue Manufacturing Industries", description: "Provides strong bonding for industrial adhesives and glues.", icon: <AdhesiveIcon /> },
  { id: "03", title: "Paper Mills", description: "Improves paper strength, texture and print quality.", icon: <PaperIcon /> },
  { id: "04", title: "Textile Manufacturing", description: "Used for yarn sizing and fabric finishing.", icon: <TextileIcon /> },
];

const bottomCards = [
  { id: "01", title: "Packaging Industries", description: "Used in corrugated boards and packaging adhesives.", icon: <PackagingIcon /> },
  { id: "02", title: "Pharmaceutical Companies", description: "Acts as a binder and filler in tablets.", icon: <PharmaIcon /> },
  { id: "03", title: "Construction & Paint Industries", description: "Improves binding and viscosity in paints and coatings.", icon: <ConstructionIcon /> },
  { id: "04", title: "Animal Feed Industries", description: "Provides energy and binding in animal feed.", icon: <AnimalFeedIcon /> },
];

// ── Animation variants ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9 } },
};

const lineGrow = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8 } },
};

const lineGrowY = {
  hidden: { scaleY: 0, originY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.7, delay: 0.3 } },
};

// ── Component ──────────────────────────────────────────────────────────────────
const IndustrialUses: React.FC = () => {
  const offWhite = "#f0ede7";
  const font = "'Poppins', sans-serif";

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });

  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-60px" });

  const bottomRef = useRef<HTMLDivElement>(null);
  const bottomInView = useInView(bottomRef, { once: true, margin: "-60px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        .iu-root {
          background-color: #f0ede7;
          min-height: 100vh;
          font-family: 'Poppins', sans-serif;
          overflow: hidden;
        }

        /* ── HEADER ── */
        .iu-header {
          background-color: #f0ede7;
          position: relative;
        }
        .iu-header-rule {
          position: absolute;
          top: 60px;
          left: 0;
          right: 0;
          height: 1px;
          background-color: #d4cfc7;
          z-index: 1;
          transform-origin: left;
        }
        .iu-header-inner {
          display: flex;
          align-items: stretch;
          min-height: 210px;
        }
        .iu-badge-col {
          width: 300px;
          flex-shrink: 0;
          padding: 20px 0 32px 52px;
          position: relative;
          display: flex;
          align-items: flex-start;
        }
        .iu-badge-divider {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background-color: #d4cfc7;
          z-index: 2;
          transform-origin: top;
        }
        .iu-heading-col {
          flex: 1;
          padding: 72px 80px 40px 56px;
        }
        .iu-h2 {
          font-size: 42px;
          font-weight: 800;
          color: #111827;
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }
        .iu-h2-blue {
          font-size: 42px;
          font-weight: 800;
          color: #5f9bf5;
          margin: 0 0 20px 0;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }
        .iu-desc {
          font-size: 14px;
          color: #555;
          line-height: 1.8;
          max-width: 660px;
          margin: 0;
          font-weight: 400;
        }

        /* ── BODY ── */
        .iu-body {
          display: flex;
          align-items: flex-start;
          background-color: #f0ede7;
        }
        .iu-image-wrap {
          flex-shrink: 0;
          width: 420px;
          height: 460px;
          overflow: hidden;
          position: relative;
        }
        .iu-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          filter: grayscale(40%) opacity(0.8);
        }
        .iu-cards-wrap {
          flex: 1;
          padding: 32px 52px 40px 48px;
        }
        .iu-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .iu-card {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 20px 20px 18px 18px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.06);
          position: relative;
          border: 1px solid #ececec;
        }
        .iu-card-num {
          position: absolute;
          top: 14px;
          right: 16px;
          font-size: 11px;
          color: #1e3a8a;
          font-weight: 700;
        }
        .iu-card-header {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 10px;
        }
        .iu-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background-color: #f5ece7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .iu-card-title {
          font-size: 13px;
          font-weight: 700;
          color: #111;
          line-height: 1.35;
        }
        .iu-card-body {
          font-size: 11.5px;
          color: #666;
          margin: 0;
          line-height: 1.6;
          padding-left: 61px;
        }

        /* ── BOTTOM ── */
        .iu-bottom {
          padding: 0px 52px 52px 52px;
          margin-top: -28px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 20px;
          background-color: transparent;
          position: relative;
          z-index: 2;
        }
        .iu-bottom-card {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 18px 18px 18px 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          border: 1px solid #ececec;
        }
        .iu-bottom-num {
          display: block;
          font-size: 11px;
          color: #1e3a8a;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: 0.3px;
        }
        .iu-bottom-card-inner {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .iu-icon-box-sm {
          width: 44px;
          height: 44px;
          border-radius: 9px;
          background-color: #f5ece7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .iu-bottom-title {
          font-size: 12.5px;
          font-weight: 700;
          color: #111;
          margin: 0 0 5px 0;
          line-height: 1.35;
        }
        .iu-bottom-desc {
          font-size: 11px;
          color: #666;
          margin: 0;
          line-height: 1.6;
        }

        /* ── tp-pill (Application badge) ── */
        .tp-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1.5px solid #d4cfc7;
          border-radius: 28px;
          padding: 6px 18px;
          font-size: 13px;
          font-weight: 600;
          color: #111;
          font-family: 'Poppins', sans-serif;
          background-color: #f0ede7;
        }

        /* ══════════════════════════════════════════
           TABLET  (≤ 900px)
        ══════════════════════════════════════════ */
        @media (max-width: 900px) {
          .iu-header-rule { top: 52px; }
          .iu-badge-col { width: 180px; padding: 16px 0 24px 28px; }
          .iu-heading-col { padding: 60px 32px 32px 28px; }
          .iu-h2, .iu-h2-blue { font-size: 30px; }
          .iu-desc { font-size: 13px; }

          .iu-image-wrap { width: 260px; height: 380px; }
          .iu-cards-wrap { padding: 20px 24px 28px 20px; }

          .iu-bottom {
            grid-template-columns: 1fr 1fr;
            padding: 0 24px 40px 24px;
            gap: 14px;
          }
        }

        /* ══════════════════════════════════════════
           MOBILE  (≤ 600px)
        ══════════════════════════════════════════ */
        @media (max-width: 600px) {
          /* Header becomes single column */
          .iu-header-rule { top: 44px; }
          .iu-header-inner { flex-direction: column; min-height: unset; }

          .iu-badge-col {
            width: 100%;
            padding: 16px 20px 12px 20px;
            align-items: center;
          }
          .iu-badge-divider { display: none; }

          /* Horizontal divider below badge row */
          .iu-badge-col::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 20px;
            right: 20px;
            height: 1px;
            background-color: #d4cfc7;
          }

          .iu-heading-col {
            padding: 24px 20px 28px 20px;
          }
          .iu-h2, .iu-h2-blue { font-size: 26px; }
          .iu-desc { font-size: 13px; max-width: 100%; }

          /* Body stacks vertically */
          .iu-body { flex-direction: column; }
          .iu-image-wrap {
            width: 100%;
            height: 220px;
          }
          .iu-cards-wrap { padding: 20px 16px 16px 16px; }
          .iu-cards-grid { grid-template-columns: 1fr; gap: 12px; }

          /* Card body text no longer needs the icon offset */
          .iu-card-body { padding-left: 0; margin-top: 6px; }

          /* Bottom grid: 1 column */
          .iu-bottom {
            grid-template-columns: 1fr;
            padding: 0 16px 36px 16px;
            gap: 12px;
            margin-top: 0;
          }
        }

        /* ══════════════════════════════════════════
           VERY SMALL (≤ 380px)
        ══════════════════════════════════════════ */
        @media (max-width: 380px) {
          .iu-h2, .iu-h2-blue { font-size: 22px; }
        }
      `}</style>

      <div className="iu-root">

        {/* ══════════════════════════════════════════
            HEADER
        ══════════════════════════════════════════ */}
        <div className="iu-header" ref={headerRef}>

          <motion.div
            className="iu-header-rule"
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={lineGrow}
          />

          <div className="iu-header-inner">

            {/* Left — badge */}
            <motion.div
              className="iu-badge-col"
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={0}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", borderRadius: "28px", padding: "7px 22px", marginTop: "56px", zIndex: 2, position: "relative", backgroundColor: offWhite }}>
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="tp-pill"
                >
                  Application
                </motion.div>
              </div>

              <motion.div
                className="iu-badge-divider"
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
                variants={lineGrowY}
              />
            </motion.div>

            {/* Right — heading + description */}
            <div className="iu-heading-col">
              <motion.h2
                className="iu-h2"
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={1}
                style={{ fontFamily: font }}
              >
                Industrial Uses of
              </motion.h2>
              <motion.h2
                className="iu-h2-blue"
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={2}
                style={{ fontFamily: font }}
              >
                Tapioca Starch
              </motion.h2>
              <motion.p
                className="iu-desc"
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={3}
                style={{ fontFamily: font }}
              >
                Tapioca starch is widely used in industries like food, paper, textiles, and
                adhesives. It acts as a natural thickener and binder, making products
                stronger and eco-friendly.
              </motion.p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            BODY — image + 2×2 cards
        ══════════════════════════════════════════ */}
        <div className="iu-body" ref={bodyRef}>

          {/* Left – image */}
          <motion.div
            className="iu-image-wrap"
            initial="hidden"
            animate={bodyInView ? "visible" : "hidden"}
            variants={fadeLeft}
          >
            <img
              src="/photo2.png"
              alt="Industrial plant"
              onError={(e) => {
                const t = e.currentTarget;
                if (!t.dataset.tried) { t.dataset.tried = "1"; t.src = "/photo2.jpg"; }
                else if (t.dataset.tried === "1") { t.dataset.tried = "2"; t.src = "/images/photo2.png"; }
              }}
            />
          </motion.div>

          {/* Right – cards */}
          <motion.div
            className="iu-cards-wrap"
            initial="hidden"
            animate={bodyInView ? "visible" : "hidden"}
            variants={fadeRight}
          >
            <div className="iu-cards-grid">
              {topCards.map((card, i) => (
                <motion.div
                  key={i}
                  className="iu-card"
                  initial="hidden"
                  animate={bodyInView ? "visible" : "hidden"}
                  variants={fadeUp}
                  custom={i}
                >
                  <span className="iu-card-num" style={{ fontFamily: font }}>{card.id}</span>
                  <div className="iu-card-header">
                    <div className="iu-icon-box">{card.icon}</div>
                    <span className="iu-card-title" style={{ fontFamily: font }}>{card.title}</span>
                  </div>
                  <p className="iu-card-body" style={{ fontFamily: font }}>{card.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            BOTTOM 4 CARDS
        ══════════════════════════════════════════ */}
        <div className="iu-bottom" ref={bottomRef}>
          {bottomCards.map((card, i) => (
            <motion.div
              key={i}
              className="iu-bottom-card"
              initial="hidden"
              animate={bottomInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={i}
            >
              <span className="iu-bottom-num" style={{ fontFamily: font }}>{card.id}</span>
              <div className="iu-bottom-card-inner">
                <div className="iu-icon-box-sm">{card.icon}</div>
                <div>
                  <p className="iu-bottom-title" style={{ fontFamily: font }}>{card.title}</p>
                  <p className="iu-bottom-desc" style={{ fontFamily: font }}>{card.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </>
  );
};

export default IndustrialUses;