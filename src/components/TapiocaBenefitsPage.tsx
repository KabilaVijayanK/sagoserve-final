import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── HEALTH BENEFITS DATA ──────────────────────────────────────────────────────
const healthBenefits = [
  {
    id: "01",
    title: "Gluten – Free Alternative",
    desc: "It is an ideal substitute for wheat for people with gluten intolerance.",
    img: "/icon 1.png",
  },
  {
    id: "02",
    title: "Rich in Antioxidants",
    desc: "Contains antioxidants that protect the body from cell damage.",
    img: "/icon 2.png",
  },
  {
    id: "03",
    title: "Strengthens Bones",
    desc: "Contains calcium and magnesium that support bone strength and help reduce the risk of arthritis and osteoporosis.",
    img: "/icon 3.png",
  },
  {
    id: "04",
    title: "Supports Child Growth",
    desc: "Contributes to healthy growth and development in children.",
    img: "/icon 4.png",
  },
  {
    id: "05",
    title: "Boosts Energy Levels",
    desc: "As a pure, natural carbohydrate source, it provides instant energy—great for athletes and post-fasting recovery.",
    img: "/icon 5.png",
  },
  {
    id: "06",
    title: "Improves Digestion",
    desc: "It helps prevent constipation, bloating and indigestion.",
    img: "/icon 6.png",
  },
];

// ─── INDUSTRY DATA ─────────────────────────────────────────────────────────────
const topIndustries = [
  {
    id: "01",
    title: "Food Processing Industries",
    desc: "Used as a natural thickener and stabilizer in food products.",
    iconSrc: "/industry-food.png",
  },
  {
    id: "02",
    title: "Adhesive & Glue Manufacturing Industries",
    desc: "Provides strong bonding for industrial adhesives and glues.",
    iconSrc: "/industry-adhesive.png",
  },
  {
    id: "03",
    title: "Paper Mills",
    desc: "Improves paper strength, texture and print quality.",
    iconSrc: "/industry-paper.png",
  },
  {
    id: "04",
    title: "Textile Manufacturing",
    desc: "Used for yarn sizing and fabric finishing.",
    iconSrc: "/industry-textile.png",
  },
];

const bottomIndustries = [
  {
    id: "01",
    title: "Packaging Industries",
    desc: "Used in corrugated boards and packaging adhesives.",
    iconSrc: "/industry-packaging.png",
  },
  {
    id: "02",
    title: "Pharmaceutical Companies",
    desc: "Acts as a binder and filler in tablets.",
    iconSrc: "/industry-pharma.png",
  },
  {
    id: "03",
    title: "Construction & Paint Industries",
    desc: "Improves binding and viscosity in paints and coatings.",
    iconSrc: "/industry-construction.png",
  },
  {
    id: "04",
    title: "Animal Feed Industries",
    desc: "Provides energy and binding in animal feed.",
    iconSrc: "/industry-animal.png",
  },
];

// ─── FALLBACK SVG ICONS ───────────────────────────────────────────────────────
const SVG_FALLBACKS: Record<string, string> = {
  "/industry-food.png": `<svg viewBox="0 0 40 40" width="26" height="26" fill="none"><rect x="5" y="17" width="30" height="18" rx="4" fill="#7a1a1a" opacity=".9"/><rect x="11" y="9" width="6" height="10" rx="2" fill="#7a1a1a" opacity=".65"/><rect x="23" y="11" width="6" height="8" rx="2" fill="#7a1a1a" opacity=".65"/><circle cx="13" cy="28" r="3.5" fill="white" opacity=".5"/><circle cx="27" cy="28" r="3.5" fill="white" opacity=".5"/></svg>`,
  "/industry-adhesive.png": `<svg viewBox="0 0 40 40" width="26" height="26" fill="none"><rect x="17" y="3" width="6" height="19" rx="3" fill="#7a1a1a" opacity=".85"/><ellipse cx="20" cy="26" rx="11" ry="6.5" fill="#7a1a1a" opacity=".7"/><rect x="9" y="31" width="22" height="6" rx="2.5" fill="#7a1a1a" opacity=".6"/><line x1="20" y1="22" x2="20" y2="31" stroke="white" strokeWidth="2.5" opacity=".5"/></svg>`,
  "/industry-paper.png": `<svg viewBox="0 0 40 40" width="26" height="26" fill="none"><rect x="7" y="5" width="26" height="32" rx="3" fill="#7a1a1a" opacity=".75"/><rect x="12" y="12" width="16" height="2" rx="1" fill="white" opacity=".55"/><rect x="12" y="17" width="16" height="2" rx="1" fill="white" opacity=".45"/><rect x="12" y="22" width="10" height="2" rx="1" fill="white" opacity=".35"/><rect x="5" y="9" width="4" height="24" rx="2" fill="#7a1a1a" opacity=".5"/></svg>`,
  "/industry-textile.png": `<svg viewBox="0 0 40 40" width="26" height="26" fill="none"><circle cx="20" cy="20" r="11" stroke="#7a1a1a" strokeWidth="3.5" opacity=".85"/><circle cx="20" cy="20" r="4.5" fill="#7a1a1a" opacity=".8"/><line x1="20" y1="3" x2="20" y2="9" stroke="#7a1a1a" strokeWidth="3" opacity=".65"/><line x1="20" y1="31" x2="20" y2="37" stroke="#7a1a1a" strokeWidth="3" opacity=".65"/><line x1="3" y1="20" x2="9" y2="20" stroke="#7a1a1a" strokeWidth="3" opacity=".55"/><line x1="31" y1="20" x2="37" y2="20" stroke="#7a1a1a" strokeWidth="3" opacity=".55"/></svg>`,
  "/industry-packaging.png": `<svg viewBox="0 0 40 40" width="26" height="26" fill="none"><rect x="7" y="15" width="26" height="20" rx="3" fill="#7a1a1a" opacity=".75"/><path d="M7 15 L20 6 L33 15" fill="#7a1a1a" opacity=".6"/><line x1="20" y1="15" x2="20" y2="35" stroke="white" strokeWidth="1.8" opacity=".45"/><line x1="7" y1="23" x2="33" y2="23" stroke="white" strokeWidth="1.8" opacity=".35"/></svg>`,
  "/industry-pharma.png": `<svg viewBox="0 0 40 40" width="26" height="26" fill="none"><rect x="14" y="3" width="12" height="11" rx="3" fill="#7a1a1a" opacity=".55"/><rect x="9" y="12" width="22" height="25" rx="4.5" fill="#7a1a1a" opacity=".8"/><rect x="16" y="21" width="8" height="2.5" rx="1.2" fill="white" opacity=".65"/><rect x="19" y="17.5" width="2.5" height="9" rx="1.2" fill="white" opacity=".65"/></svg>`,
  "/industry-construction.png": `<svg viewBox="0 0 40 40" width="26" height="26" fill="none"><rect x="5" y="27" width="30" height="11" rx="2.5" fill="#7a1a1a" opacity=".75"/><rect x="9" y="18" width="22" height="11" rx="2.5" fill="#7a1a1a" opacity=".6"/><rect x="13" y="12" width="14" height="8" rx="2" fill="#7a1a1a" opacity=".45"/><rect x="16" y="6" width="8" height="8" rx="1.5" fill="#7a1a1a" opacity=".32"/></svg>`,
  "/industry-animal.png": `<svg viewBox="0 0 40 40" width="26" height="26" fill="none"><ellipse cx="20" cy="26" rx="13" ry="11" fill="#7a1a1a" opacity=".75"/><circle cx="13" cy="13" r="6" fill="#7a1a1a" opacity=".7"/><circle cx="27" cy="13" r="6" fill="#7a1a1a" opacity=".7"/><ellipse cx="20" cy="26" rx="6" ry="4.5" fill="white" opacity=".25"/></svg>`,
};

// ─── SIDEBAR WIDTH CONSTANT ───────────────────────────────────────────────────
const SIDEBAR_W = 180;
const SIDEBAR_PAD_RIGHT = 102;
const CONTENT_PAD_LEFT = 32;
const INDENT = SIDEBAR_W + SIDEBAR_PAD_RIGHT + CONTENT_PAD_LEFT; // ~244px

// ─── ANIMATED CROSS-LINE WRAPPER ──────────────────────────────────────────────
function CrossLineHeader({
  children,
  verticalHeight = 260,
}: {
  children: React.ReactNode;
  verticalHeight?: number;
}) {
  return (
    <div style={{ position: "relative" }}>
      {/* Horizontal rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: "1px",
          background: "#d1d1d1",
          width: "50%",
          transformOrigin: "left center",
        }}
      />
      {/* Vertical rule drops from the sidebar/content boundary */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: -40,
          left: `${SIDEBAR_W}px`,
          width: "1px",
          height: verticalHeight,
          background: "#d1d1d1",
          transformOrigin: "top center",
        }}
      />
      {children}
    </div>
  );
}

// ─── HEALTH BENEFIT CARD ──────────────────────────────────────────────────────
function BenefitCard({
  item,
  index,
}: {
  item: (typeof healthBenefits)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "0",
      }}
    >
      {/* Icon circle + number badge */}
      <div
        style={{
          position: "relative",
          marginBottom: "12px",
          display: "inline-block",
        }}
      >
        {/* Circular icon */}
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid #e5e7eb",
            background: "#ece9e3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={item.img}
            alt={item.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
              if (el.parentElement) {
                el.parentElement.style.fontSize = "32px";
                el.parentElement.innerText = "🌿";
              }
            }}
          />
        </div>
        {/* Number badge — top right, blue */}
        <span
          style={{
            position: "absolute",
            top: "-4px",
            right: "-14px",
            fontSize: "11px",
            fontWeight: "700",
            color: "#2155a3",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1,
          }}
        >
          {item.id}
        </span>
      </div>

      <h4
        style={{
          fontSize: "13.5px",
          fontWeight: "700",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: "#111827",
          margin: "0 0 8px",
          lineHeight: 1.3,
        }}
      >
        {item.title}
      </h4>
      <p
        style={{
          fontSize: "12px",
          color: "#6b7280",
          lineHeight: 1.65,
          margin: 0,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {item.desc}
      </p>
    </motion.div>
  );
}

// ─── INDUSTRY CARD ────────────────────────────────────────────────────────────
function IndustryCard({
  item,
  index,
  delay = 0,
}: {
  item: { id: string; title: string; desc: string; iconSrc: string };
  index: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: delay + index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(33,85,163,0.12)" }}
      style={{
        background: "white",
        borderRadius: "10px",
        padding: "14px 16px",
        border: "1px solid #e8edf5",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        cursor: "default",
        transition: "box-shadow 0.3s ease",
        display: "flex",
        flexDirection: "column",
        gap: "7px",
        position: "relative",
      }}
    >
      {/* Number badge — top right, blue */}
      <span
        style={{
          position: "absolute",
          top: "10px",
          right: "12px",
          fontSize: "10px",
          fontWeight: "700",
          color: "#2155a3",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {item.id}
      </span>

      {/* Icon + title row */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Icon box — warm reddish tint background */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "6px",
            background: "#fdf0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Fallback SVG underneath */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            dangerouslySetInnerHTML={{
              __html:
                SVG_FALLBACKS[item.iconSrc] ||
                SVG_FALLBACKS["/industry-food.png"],
            }}
          />
          {/* Real icon overlay */}
          <img
            src={item.iconSrc}
            alt={item.title}
            width={26}
            height={26}
            style={{
              objectFit: "contain",
              position: "relative",
              zIndex: 1,
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <h4
          style={{
            fontSize: "12.5px",
            fontWeight: "700",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: "#111827",
            margin: 0,
            lineHeight: 1.3,
            paddingRight: "18px",
          }}
        >
          {item.title}
        </h4>
      </div>

      <p
        style={{
          fontSize: "11px",
          color: "#6b7280",
          lineHeight: 1.6,
          margin: 0,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {item.desc}
      </p>
    </motion.div>
  );
}

// ─── ROOT EXPORT ──────────────────────────────────────────────────────────────
export default function TapiocaSections() {
  return (
    <div
      style={{
        background: "#f5f3ef",
        fontFamily: "'DM Sans', sans-serif",
        width: "100%",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }

        .tp-pill {
          display: inline-flex; align-items: center; gap: 7px;
          border: 1.5px solid #2d3748; border-radius: 100px;
          padding: 6px 16px;
          font-size: 10.5px; font-weight: 700; letter-spacing: 1.2px;
          text-transform: uppercase; color: #2d3748;
          font-family: 'DM Sans', sans-serif; white-space: nowrap;
          background: white;
        }
        .tp-pill::before {
          content: ''; display: inline-block;
          width: 6px; height: 6px; border-radius: 50%;
          background: #2d3748; flex-shrink: 0;
        }

        @media (max-width: 960px) {
          .main-row       { flex-direction: column !important; }
          .sidebar        { width: 100% !important; flex-direction: row !important; align-items: center !important; padding-right: 0 !important; padding-bottom: 24px; }
          .benefits-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .ind-top        { grid-template-columns: repeat(2,1fr) !important; margin-left: 0 !important; }
          .ind-bot        { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 600px) {
          .benefits-grid { grid-template-columns: 1fr !important; }
          .ind-top       { grid-template-columns: 1fr !important; }
          .ind-bot       { grid-template-columns: 1fr !important; }
          .tp-container  { padding: 0 20px !important; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — HEALTH BENEFITS
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#f5f3ef", paddingBottom: "64px" }}>
        <div
          className="tp-container"
          style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}
        >
          <CrossLineHeader verticalHeight={360}>
            <div
              className="main-row"
              style={{
                display: "flex",
                alignItems: "flex-start",
                paddingTop: "28px",
                gap: "0",
                marginLeft: "48px",
              }}
            >
              {/* ── LEFT SIDEBAR ── */}
              <div
                className="sidebar"
                style={{
                  width: `${SIDEBAR_W}px`,
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingRight: `${SIDEBAR_PAD_RIGHT}px`,
                  gap: "16px",
                }}
              >
                {/* Pill label */}
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="tp-pill"
                >
                  RECIPES
                </motion.div>

                {/* Sidebar illustration */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "450px" }}
                >
                  <img
                    src="/photo3.png"
                    alt="Health & wellness"
                    style={{
                      width: "100%",
                      height: "auto",
                      marginLeft: "-35px",
                      display: "block",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = "none";
                      const w = el.parentElement!;
                      w.style.height = "210px";
                      w.innerHTML = `<svg viewBox="0 0 200 280" fill="none" style="width:148px;height:210px">
                        <rect x="95" y="197" width="10" height="40" rx="4" fill="#b0c4d8" opacity=".5"/>
                        <circle cx="100" cy="148" r="58" fill="#7ab5d8" opacity=".12"/>
                        <circle cx="100" cy="132" r="50" fill="#7ab5d8" opacity=".17"/>
                        <circle cx="83"  cy="121" r="36" fill="#7ab5d8" opacity=".21"/>
                        <circle cx="117" cy="117" r="34" fill="#7ab5d8" opacity=".21"/>
                        <circle cx="100" cy="101" r="42" fill="#7ab5d8" opacity=".26"/>
                        <circle cx="89"  cy="87"  r="28" fill="#7ab5d8" opacity=".26"/>
                        <circle cx="111" cy="85"  r="26" fill="#7ab5d8" opacity=".24"/>
                        <circle cx="100" cy="69"  r="30" fill="#7ab5d8" opacity=".29"/>
                        <circle cx="100" cy="55"  r="22" fill="#7ab5d8" opacity=".3"/>
                        <circle cx="100" cy="41"  r="18" fill="#7ab5d8" opacity=".26"/>
                        <circle cx="100" cy="29"  r="12" fill="#7ab5d8" opacity=".22"/>
                        <circle cx="100" cy="208" r="9"  fill="#8fb8d0" opacity=".8"/>
                        <ellipse cx="100" cy="226" rx="16" ry="8" fill="#8fb8d0" opacity=".6"/>
                        <line x1="84" y1="221" x2="76" y2="230" stroke="#8fb8d0" strokeWidth="3" strokeLinecap="round" opacity=".7"/>
                        <line x1="116" y1="221" x2="124" y2="230" stroke="#8fb8d0" strokeWidth="3" strokeLinecap="round" opacity=".7"/>
                        <ellipse cx="85" cy="233" rx="10" ry="5" fill="#8fb8d0" opacity=".5"/>
                        <ellipse cx="115" cy="233" rx="10" ry="5" fill="#8fb8d0" opacity=".5"/>
                      </svg>`;
                    }}
                  />
                </motion.div>
              </div>

              {/* ── RIGHT CONTENT ── */}
              <div style={{ flex: 1, paddingLeft: `${CONTENT_PAD_LEFT}px` }}>
                {/* Heading block */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ marginBottom: "28px" }}
                >
                  <h2
                    style={{
                      fontSize: "clamp(22px, 3vw, 34px)",
                      fontWeight: "800",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: "#111827",
                      margin: "0",
                      lineHeight: 1.15,
                      letterSpacing: "-0.4px",
                    }}
                  >
                    Health Benefits
                  </h2>
                  <h2
                    style={{
                      fontSize: "clamp(22px, 3vw, 34px)",
                      fontWeight: "800",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: "#5f9bf5",
                      margin: "0 0 14px",
                      lineHeight: 1.15,
                      letterSpacing: "-0.4px",
                    }}
                  >
                    of Tapioca Sago
                  </h2>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      lineHeight: 1.75,
                      maxWidth: "560px",
                      margin: 0,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Tapioca sago (Javvarisi) is a nutritious and easily
                    digestible food that provides quick energy and supports a
                    balanced diet. Rich in carbohydrates and naturally
                    gluten-free, it is widely used in healthy and traditional
                    recipes for people of all ages.
                  </p>
                </motion.div>

                {/* 3×2 benefit grid */}
                <div
                  className="benefits-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "36px 24px",
                  }}
                >
                  {healthBenefits.map((item, i) => (
                    <BenefitCard key={i} item={item} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </CrossLineHeader>
        </div>
      </section>

     
    </div>
  );
}