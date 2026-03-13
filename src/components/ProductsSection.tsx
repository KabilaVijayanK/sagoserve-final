import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Users, TrendingUp, Award, Sparkles } from "lucide-react";

interface Badge {
  label: string;
  bg: string;
  color: string;
}

interface Product {
  id: number;
  name: string;
  location: string;
  year: string;
  badges: Badge[];
  image: string;
  darkBg?: boolean;
}

interface SlotConfig {
  scale: number;
  zIndex: number;
}

const products: Product[] = [
  { id: 1,  name: "Chemical Free Sago",    location: "Salem, India", year: "2024", badges: [{ label: "PREMIUM", bg: "#111", color: "#fff" }, { label: "NATURAL", bg: "#2e7d32", color: "#fff" }], image: "/prd1.jpeg" },
  { id: 2,  name: "Chemical Free Nylon",   location: "Salem, India", year: "2024", badges: [{ label: "PREMIUM", bg: "#111", color: "#fff" }, { label: "NATURAL", bg: "#2e7d32", color: "#fff" }], image: "/prd2.jpg" },
  { id: 3,  name: "Tapioca Nylon",   location: "Salem, India", year: "2024", badges: [{ label: "PREMIUM", bg: "#111", color: "#fff" }], image: "/prd3.jpg", darkBg: true },
  { id: 4,  name: "Tapioca Sago",          location: "Salem, India", year: "2024", badges: [{ label: "STANDARD", bg: "#555", color: "#fff" }], image: "/broken-sago.jpg" },
  { id: 5,  name: "Tapioca Mothithana",            location: "Salem, India", year: "2024", badges: [{ label: "PREMIUM", bg: "#111", color: "#fff" }, { label: "NATURAL", bg: "#2e7d32", color: "#fff" }], image: "/prd1.jpeg" },
  { id: 6,  name: "Tapioca Pearl",             location: "Salem, India", year: "2024", badges: [{ label: "PREMIUM", bg: "#111", color: "#fff" }], image: "/prd2.jpg" },
  { id: 7,  name: "Tapioca Native Starch",       location: "Salem, India", year: "2024", badges: [{ label: "NATURAL", bg: "#2e7d32", color: "#fff" }], image: "/prd1.jpeg" },
  { id: 8,  name: "Tapioca Grinded Starch",      location: "Salem, India", year: "2024", badges: [{ label: "PREMIUM", bg: "#111", color: "#fff" }, { label: "NATURAL", bg: "#2e7d32", color: "#fff" }], image: "/broken-sago.jpg" },
  { id: 9,  name: "Tapioca Broken",     location: "Salem, India", year: "2024", badges: [{ label: "PREMIUM", bg: "#111", color: "#fff" }], image: "/prd1.jpeg" },
  { id: 10, name: "Tapioca Dryer  Starch",     location: "Salem, India", year: "2024", badges: [{ label: "STANDARD", bg: "#555", color: "#fff" }], image: "/prd3.jpg" },
];

const TOTAL: number = products.length;

const CONFIG: Record<string, SlotConfig> = {
  "-2": { scale: 0.70, zIndex: 1 },
  "-1": { scale: 0.85, zIndex: 2 },
   "0": { scale: 1.00, zIndex: 3 },
   "1": { scale: 0.85, zIndex: 2 },
   "2": { scale: 0.70, zIndex: 1 },
};

export default function ProductCarousel(): JSX.Element {
  const [centerIdx, setCenterIdx] = useState<number>(0);
  const [locked, setLocked] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerView = useInView(headerRef, { once: true });

  function slide(dir: number): void {
    if (locked) return;
    setLocked(true);
    setCenterIdx((c) => (c + dir + TOTAL) % TOTAL);
    setTimeout(() => setLocked(false), 380);
  }

  const visibleCards = [-2, -1, 0, 1, 2].map((offset) => ({
    product: products[(centerIdx + offset + TOTAL) % TOTAL],
    offset,
  }));

  return (
    <>
      <style>{`
       @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .root {
          background: #eeebe3;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 56px 0 48px;
          font-family: 'Inter', sans-serif;
        }

        @media (max-width: 768px) {
          .root {
            padding: 40px 0 40px;
          }
        }

        @media (max-width: 480px) {
          .root {
            padding: 32px 0 32px;
          }
        }

        .subtitle {
          font-size: 12.5px;
          color: #888;
          text-align: center;
          max-width: 400px;
          line-height: 1.8;
          margin: 0 auto 40px;
          padding: 0 20px;
        }

        .header-container {
          width: 100%;
        }

        @media (max-width: 1024px) {
          .header-container {
            padding: 0 40px !important;
            margin-bottom: 32px !important;
          }
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0 20px !important;
            margin-bottom: 24px !important;
          }
        }

        @media (max-width: 480px) {
          .header-container {
            padding: 0 16px !important;
            margin-bottom: 20px !important;
          }
        }

        .stage {
          width: 100%;
          max-width: 1480px;
          padding: 0 40px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 520px;
          margin: 0 auto;
          gap: 12px;
        }

        @media (max-width: 1024px) {
          .stage {
            height: 480px;
            padding: 0 30px;
            max-width: 1100px;
            gap: 10px;
          }
        }

        @media (max-width: 768px) {
          .stage {
            height: 420px;
            padding: 0 20px;
            max-width: 100%;
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .stage {
            height: 360px;
            padding: 0 16px;
            gap: 6px;
          }
        }

        .slot {
          flex: 1;
          min-width: 140px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          transition: transform 0.36s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        @media (max-width: 1024px) {
          .slot {
            min-width: 120px;
          }
        }

        @media (max-width: 768px) {
          .slot {
            min-width: 100px;
          }
        }

        @media (max-width: 480px) {
          .slot {
            min-width: 70px;
          }
        }

        .img-box {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          background: #c8c4ba;
        }

        .img-box.dark-bg {
          background: #1a1a1a;
        }

        .img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 768px) {
          .img-box {
            border-radius: 12px;
          }
        }

        @media (max-width: 480px) {
          .img-box {
            border-radius: 10px;
          }
        }

        .badges {
          position: absolute;
          top: 9px;
          left: 9px;
          display: flex;
          gap: 4px;
          z-index: 2;
        }

        .badge {
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.07em;
          padding: 2.5px 8px;
          border-radius: 20px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .badges {
            top: 6px;
            left: 6px;
            gap: 3px;
          }
          .badge {
            font-size: 7px;
            padding: 2px 6px;
          }
        }

        @media (max-width: 480px) {
          .badges {
            top: 4px;
            left: 4px;
          }
          .badge {
            font-size: 6px;
            padding: 1.5px 5px;
          }
        }

        .btn {
          position: absolute;
          bottom: 50%;
          transform: translateY(50%);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid #ddd;
          box-shadow: 0 1px 6px rgba(0,0,0,0.09);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.15s, border-color 0.15s;
          padding: 0;
        }

        .btn:hover { background: #111; border-color: #111; }
        .btn:hover .chev { stroke: #fff; }
        .btn-l { left: 0; }
        .btn-r { right: 0; }

        @media (max-width: 1024px) {
          .btn {
            width: 32px;
            height: 32px;
          }
        }

        @media (max-width: 768px) {
          .btn {
            width: 30px;
            height: 30px;
          }
        }

        @media (max-width: 480px) {
          .btn {
            width: 26px;
            height: 26px;
          }
        }
        .chev { stroke: #333; fill: none; transition: stroke 0.15s; }

        /* Header responsive styles */
        @media (max-width: 1024px) {
          .ps-header-cols {
            min-height: 120px !important;
          }
        }

        @media (max-width: 768px) {
          .ps-header-cols {
            min-height: 100px !important;
            flex-direction: column;
          }
          .ps-header-left {
            width: 100% !important;
            padding: 20px !important;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            margin-bottom: 20px;
          }
          .ps-header-right {
            padding: 20px 20px 20px 20px !important;
          }
          .ps-header-right > div > h2 {
            font-size: clamp(20px, 5vw, 32px) !important;
          }
          .ps-header-right > div > p {
            font-size: 12px !important;
            line-height: 1.6 !important;
          }
        }

        @media (max-width: 480px) {
          .ps-header-cols {
            min-height: 80px !important;
          }
          .ps-header-left {
            padding: 16px !important;
          }
          .ps-header-right {\n            padding: 16px !important;\n          }\n          .ps-header-right > div > h2 {\n            font-size: clamp(18px, 5vw, 28px) !important;\n            margin-bottom: 8px !important;\n          }\n          .ps-header-right > div > p {\n            font-size: 11px !important;\n          }\n        }

      `}</style>

      <div className="root">
         {/* ══ HEADER ══ */}
        <div
          ref={headerRef}
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 60px",
            marginBottom: "40px",
            position: "relative",
            zIndex: 1,
          }}
          className="header-container"
        >
          {/* Two-column header layout */}
          <div className="ps-header-cols" style={{
            display: "flex",
            alignItems: "stretch",
            minHeight: "130px",
            position: "relative",
          }}>
            {/* Horizontal divider line — across full width at top */}
            <div
              style={{
                position: "absolute",
                top: 0,
                
                left: "10%",
                right: 0,
                 width: "400px",
                height: "1px",
                background: "rgba(0,0,0,0.15)",
                zIndex: 0,
              }}
            />

            {/* Vertical divider line — at 280px boundary */}
            <div
              style={{
                position: "absolute",
                left: "280px",
                top: -40,
                bottom: 0,
                width: "1px",
                background: "rgba(0,0,0,0.15)",
                zIndex: 0,
              }}
            />

            {/* LEFT — Badge */}
            <motion.div
              className="ps-header-left"
              initial={{ opacity: 0, x: -20 }}
              animate={headerView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                width: "280px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "30px 20px",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#fff",
                border: "1.5px solid #1a1a1a",
                borderRadius: "999px",
                padding: "8px 20px",
              }}>
                <span style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: "#5f9bf5", display: "block", flexShrink: 0,
                }} />
                <span style={{
                  fontSize: "12px", fontWeight: 600,
                  letterSpacing: "0.14em", color: "#1a1a1a",
                  textTransform: "uppercase",
                }}>OUR PRODUCTS</span>
              </div>
            </motion.div>

            {/* RIGHT — Heading + Description */}
            <div className="ps-header-right" style={{
              flex: 1,
              padding: "30px 0 30px 48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={headerView ? { opacity: 1, y: 0 } : {}}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ marginBottom: "30px" }}
              >
                <h2 style={{ fontSize: "clamp(28px,4.5vw,48px)", fontWeight: "900", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#111827", margin: "0 0 2px", lineHeight: 1.1, letterSpacing: "-0.6px" }}>
                  Our Products That
                </h2>
                <h2 style={{ fontSize: "clamp(28px,4.5vw,48px)", fontWeight: "900", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#5f9bf5", margin: "0 0 16px", lineHeight: 1.1, letterSpacing: "-0.6px" }}>
                  Define Our Range
                </h2>
                <p style={{ fontSize: "13.5px", color: "#555f6e", lineHeight: 1.75, maxWidth: "580px", margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
                 Our product range includes GI-tagged Salem Sago (Javvarisi) and tapioca starch, carefully processed to ensure purity, consistency, and reliability for food, industrial, and export applications.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="stage">
          <button className="btn btn-l" onClick={() => slide(-1)} aria-label="Previous">
            <svg width="13" height="13" viewBox="0 0 13 13">
              <polyline className="chev" points="8.5,1.5 3.5,6.5 8.5,11.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button className="btn btn-r" onClick={() => slide(1)} aria-label="Next">
            <svg width="13" height="13" viewBox="0 0 13 13">
              <polyline className="chev" points="4.5,1.5 9.5,6.5 4.5,11.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {visibleCards.map(({ product: p, offset }) => {
            const cfg = CONFIG[String(offset)];
            const isCenter = offset === 0;
            const isOuter = Math.abs(offset) === 2;
            // Increased image height per position for bigger cards — responsive scaling
            let imgHeight = isCenter ? 420 : Math.abs(offset) === 1 ? 310 : 360;
            if (window.innerWidth <= 1024) imgHeight = isCenter ? 390 : Math.abs(offset) === 1 ? 290 : 340;
            if (window.innerWidth <= 768) imgHeight = isCenter ? 340 : Math.abs(offset) === 1 ? 260 : 300;
            if (window.innerWidth <= 480) imgHeight = isCenter ? 280 : Math.abs(offset) === 1 ? 220 : 250;
            // Reserve fixed info height so all cards' image midpoints align — responsive
            const INFO_H = window.innerWidth <= 480 ? 48 : 58; // name + location + year

            return (
              <div
                key={`${p.id}-${offset}`}
                className="slot"
                style={{
                  zIndex: cfg.zIndex,
                  transform: `scale(${cfg.scale})`,
                  transformOrigin: "center center",
                  // Total card height is always imgHeight + INFO_H, centered in slot
                  height: imgHeight + INFO_H,
                  flex: isCenter ? 1.35 : 1,
                }}
              >
                {/* Image — takes exact imgHeight */}
                <div
                  className={`img-box${isCenter && p.darkBg ? " dark-bg" : ""}`}
                  style={{ height: imgHeight, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="badges">
                    {p.badges.map((b) => (
                      <span key={b.label} className="badge" style={{ background: b.bg, color: b.color }}>
                        {b.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info — always reserves INFO_H even when hidden, keeping midpoint consistent */}
                <div style={{ height: INFO_H, padding: window.innerWidth <= 480 ? "6px 4px 0" : "10px 4px 0", visibility: isOuter ? "hidden" : "visible" }}>
                  <div style={{ fontSize: window.innerWidth <= 480 ? 11 : isCenter ? 14 : 12.5, fontWeight: 600, color: "#111", marginBottom: 2, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                  <div style={{ fontSize: window.innerWidth <= 480 ? 9 : 11, color: "#999", lineHeight: 1.4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.location}</div>
                  <div style={{ fontSize: window.innerWidth <= 480 ? 9 : 11, color: "#999", whiteSpace: "nowrap" }}>{p.year}</div>
                </div>
              </div>
            );
          })}

          {/* Lines + button */}
          <div
            style={{
              position: "absolute",
              bottom: "-80px",
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              gap: "32px",
              width: "100%",
              justifyContent: "center",
              padding: "0 20px",
            }}
          >
            <div style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to right, transparent, #111 80%)",
              maxWidth: "300px",
            }} />
            <button
              onClick={() => window.location.href = "/products"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#1a1a1a",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 700,
                padding: "14px 30px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                transition: "background 0.25s",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
                boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1a1a")}
            >
              Explore Products
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <div style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to left, transparent, #111 80%)",
              maxWidth: "300px",
            }} />
          </div>
        </div>

        {/* 🔥 SCROLLING VALUE STRIP WITH ICONS */}
        <div style={{
          marginTop: "100px",
          position: "relative",
          overflow: "hidden",
         
        }}>
          {/* Gradient overlays */}
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "80px",
            background: "linear-gradient(to right, #fff, transparent)",
            zIndex: 10,
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "80px",
            background: "linear-gradient(to left, #fff, transparent)",
            zIndex: 10,
            pointerEvents: "none",
          }} />

          <motion.div
            style={{
              display: "flex",
              gap: "64px",
              alignItems: "center",
              whiteSpace: "nowrap",
              width: "max-content",
            }}
            animate={{ x: ["0", "-33.33%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {[
              { text: "Quality and Fair Pricing", icon: Shield },
              { text: "Cooperative Strength", icon: Users },
              { text: "Sustainable Growth", icon: TrendingUp },
              { text: "Trusted Quality", icon: Award },
              { text: "Collective Progress", icon: Sparkles },
            ]
              .concat([
                { text: "Quality and Fair Pricing", icon: Shield },
                { text: "Cooperative Strength", icon: Users },
                { text: "Sustainable Growth", icon: TrendingUp },
                { text: "Trusted Quality", icon: Award },
                { text: "Collective Progress", icon: Sparkles },
              ])
              .concat([
                { text: "Quality and Fair Pricing", icon: Shield },
                { text: "Cooperative Strength", icon: Users },
                { text: "Sustainable Growth", icon: TrendingUp },
                { text: "Trusted Quality", icon: Award },
                { text: "Collective Progress", icon: Sparkles },
              ])
              .map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      color: "#111",
                      fontSize: "16px",
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} style={{ color: "#1a4fd6", flexShrink: 0 }} />
                    <span>{item.text}</span>
                  </div>
                );
              })}
          </motion.div>
        </div>
      </div>
    </>
  );
}