import { useEffect, useRef, useState } from "react";

const BLUE = "#5f9bf5";
const BLACK = "#111111";
const BG = "#F5F4F1";

/* ─── count-up hook ─── */
const useCountUp = (end: number, active: boolean, duration = 1800) => {
  const [v, setV] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!active || done.current) return;
    done.current = true;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(2, -10 * p);
      setV(Math.floor(ease * end));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setV(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end, duration]);
  return v;
};

/* ─── TOP ROW CARD (344+, 177+) — large hero cards ─── */
const TopCard = ({
  stat,
  active,
  borderRight,
}: {
  stat: {
    prefix: string;
    end: number;
    decimal: string;
    unit: string;
    suffix: string;
    label: string;
    desc: string;
    highlight: boolean;
  };
  active: boolean;
  borderRight?: boolean;
}) => {
  const [hov, setHov] = useState(false);
  const n = useCountUp(stat.end, active);
  const numColor = stat.highlight ? BLUE : hov ? BLUE : BLACK;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1,
        padding: "40px 60px 40px 40px",
        borderRight: borderRight ? `1px solid rgba(0,0,0,0.09)` : "none",
        transition: "background 0.3s",
        background: "transparent",
        cursor: "default",
        userSelect: "none",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Big number */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 0,
          lineHeight: 1,
          marginBottom: 16,
          flexWrap: "nowrap",
          justifyContent: "center",
        }}
      >
        {stat.prefix && (
          <span
            style={{
              fontSize: "clamp(22px, 2.8vw, 42px)",
              fontWeight: 900,
              color: BLUE,
              lineHeight: 1,
              marginRight: 2,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {stat.prefix}
          </span>
        )}
        <span
          style={{
            fontSize: "clamp(32px, 6.8vw, 58px)",
            fontWeight: 900,
            color: numColor,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            fontFamily: "'Inter', sans-serif",
            transition: "color 0.25s",
          }}
        >
          {n.toLocaleString("en-IN")}
        </span>
        {(stat.decimal || stat.suffix) && (
          <span
            style={{
              fontSize: "clamp(26px, 3.2vw, 40px)",
              fontWeight: 900,
              color: numColor,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              fontFamily: "'Inter', sans-serif",
              transition: "color 0.25s",
            }}
          >
            {stat.decimal || stat.suffix}
          </span>
        )}
        {stat.unit && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: BLUE,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              alignSelf: "flex-end",
              marginBottom: 12,
              marginLeft: 7,
              whiteSpace: "nowrap",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {stat.unit}
          </span>
        )}
      </div>

      {/* Divider */}
      <div
        style={{
          height: 2,
          width: "60px",
          background: stat.highlight
            ? BLUE
            : hov
            ? BLUE
            : "rgba(0,0,0,0.1)",
          marginBottom: 16,
          borderRadius: 2,
          transition: "background 0.3s",
          transformOrigin: "center",
          animation: active ? "divSlide 0.6s ease forwards" : "none",
          alignSelf: "center",
        }}
      />

      {/* Label */}
      <p
        style={{
          fontSize: "clamp(12px, 1vw, 15px)",
          fontWeight: 800,
          color: stat.highlight ? BLUE : hov ? BLUE : BLACK,
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          marginBottom: 8,
          fontFamily: "'Inter', sans-serif",
          transition: "color 0.25s",
          textAlign: "center",
        }}
      >
        {stat.label}
      </p>

      {/* Description — bigger & neater */}
      <p
        style={{
          fontSize: "clamp(12px, 0.95vw, 13.5px)",
          fontWeight: 400,
          lineHeight: 1.7,
          color: "#777",
          maxWidth: "320px",
          fontFamily: "'Inter', sans-serif",
          textAlign: "center",
        }}
      >
        {stat.desc}
      </p>
    </div>
  );
};

/* ─── BOTTOM ROW CARD (84.4, 3042, 36.03, 15.97) — 4-across ─── */
const BottomCard = ({
  stat,
  active,
  borderRight,
  delay,
}: {
  stat: {
    prefix: string;
    end: number;
    decimal: string;
    unit: string;
    suffix: string;
    label: string;
    desc: string;
    highlight: boolean;
  };
  active: boolean;
  borderRight?: boolean;
  delay?: number;
}) => {
  const [hov, setHov] = useState(false);
  const n = useCountUp(stat.end, active, 1600);
  const numColor = hov ? BLUE : BLACK;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1,
        padding: "36px 32px 36px 32px",
        borderRight: borderRight ? "1px solid rgba(0,0,0,0.09)" : "none",
        background: "transparent",
        transition: "background 0.3s",
        cursor: "default",
        userSelect: "none",
        animationDelay: delay ? `${delay}ms` : "0ms",
      }}
    >
      {/* Big number */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 0,
          lineHeight: 1,
          marginBottom: 14,
        }}
      >
        {stat.prefix && (
          <span
            style={{
              fontSize: "clamp(16px, 2vw, 28px)",
              fontWeight: 900,
              color: BLUE,
              lineHeight: 1,
              marginRight: 1,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {stat.prefix}
          </span>
        )}
        <span
          style={{
            fontSize: "clamp(30px, 3.8vw, 48px)",
            fontWeight: 900,
            color: numColor,
            letterSpacing: "-0.045em",
            lineHeight: 1,
            fontFamily: "'Inter', sans-serif",
            transition: "color 0.25s",
          }}
        >
          {n.toLocaleString("en-IN")}
        </span>
        {(stat.decimal || stat.suffix) && (
          <span
            style={{
              fontSize: "clamp(22px, 2.8vw, 36px)",
              fontWeight: 900,
              color: numColor,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              fontFamily: "'Inter', sans-serif",
              transition: "color 0.25s",
            }}
          >
            {stat.decimal || stat.suffix}
          </span>
        )}
        {stat.unit && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: BLUE,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              alignSelf: "flex-end",
              marginBottom: 10,
              marginLeft: 6,
              whiteSpace: "nowrap",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {stat.unit}
          </span>
        )}
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: hov
            ? `linear-gradient(to right, ${BLUE}, transparent)`
            : "rgba(0,0,0,0.1)",
          marginBottom: 14,
          borderRadius: 1,
          transition: "background 0.3s",
          animation: active ? "divSlide 0.6s ease forwards" : "none",
        }}
      />

      {/* Label */}
      <p
        style={{
          fontSize: "clamp(12px, 1vw, 14px)",
          fontWeight: 800,
          color: hov ? BLUE : BLACK,
          letterSpacing: "-0.01em",
          lineHeight: 1.25,
          marginBottom: 9,
          fontFamily: "'Inter', sans-serif",
          transition: "color 0.25s",
        }}
      >
        {stat.label}
      </p>

      {/* Description — bigger & neater */}
      <p
        style={{
          fontSize: "clamp(12px, 0.9vw, 13.5px)",
          fontWeight: 400,
          lineHeight: 1.75,
          color: "#777",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {stat.desc}
      </p>
    </div>
  );
};

/* ─── MAIN SECTION ─── */
export default function AchievementsSection() {
  const secRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (secRef.current) obs.observe(secRef.current);
    return () => obs.disconnect();
  }, []);

  const topStats = [
    {
      prefix: "",
      end: 344,
      decimal: "",
      unit: "",
      suffix: "+",
      label: "Active Members",
      desc: "Registered member manufacturers working under the cooperative",
      highlight: true,
    },
    {
      prefix: "",
      end: 177,
      decimal: "",
      unit: "",
      suffix: "+",
      label: "Active Merchants",
      desc: "Authorized merchants facilitating trade and distribution",
      highlight: false,
    },
  ];

  const bottomStats = [
    {
      prefix: "",
      end: 84,
      decimal: ".4",
      unit: "Lakhs",
      suffix: "",
      label: "Total Bags Sold",
      desc: "Total bags sold across all e-auction and direct sales channels",
      highlight: false,
    },
    {
      prefix: "₹",
      end: 3042,
      decimal: "",
      unit: "Crore",
      suffix: "",
      label: "Total Sales Value",
      desc: "Cumulative value of all sago and starch sales since inception",
      highlight: false,
    },
    {
      prefix: "₹",
      end: 36,
      decimal: ".03",
      unit: "",
      suffix: "",
      label: "Average Sale Value",
      desc: "Average per-bag sale value achieved through cooperative trading",
      highlight: false,
    },
    {
      prefix: "₹",
      end: 15,
      decimal: ".97",
      unit: "Crore",
      suffix: "",
      label: "Total Profit Earned",
      desc: "Net profit distributed among members through surplus sharing",
      highlight: false,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .ach-root, .ach-root * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes divSlide {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideH2 {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ach-badge { animation: fadeUp 0.5s ease both; }
        .ach-h2    { animation: slideH2 0.7s 0.1s cubic-bezier(.22,1,.36,1) both; }
        .ach-top-row  { animation: fadeIn 0.7s 0.2s ease both; }
        .ach-bot-row  { animation: fadeIn 0.7s 0.35s ease both; }

        .sweep-line {
          animation: sweepIn 1.4s 0.5s ease forwards;
          transform-origin: left;
          opacity: 0;
          transform: scaleX(0);
        }
        @keyframes sweepIn { to { opacity: 1; transform: scaleX(1); } }

        @media (max-width: 768px) {
          .ach-top-row  { flex-direction: column !important; }
          .ach-bot-row  { flex-direction: column !important; }
          .ach-top-card { border-right: none !important; border-bottom: 1px solid rgba(0,0,0,0.09) !important; }
          .ach-bot-card { border-right: none !important; border-bottom: 1px solid rgba(0,0,0,0.09) !important; }
        }
      `}</style>

      <section
        className="ach-root"
        ref={secRef}
        style={{
          width: "100%",
          background: BG,
          padding: "clamp(48px,7vw,96px) 0 clamp(48px,7vw,96px) 0",
          overflow: "hidden",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <>

          {/* ── HEADER ── */}
          {inView && (
            <div style={{ textAlign: "center", marginBottom: "clamp(40px,5.5vw,72px)" }}>

              {/* "OUR IMPACT" badge */}
              <div
                className="ach-badge"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.09)",
                  borderRadius: 999,
                  padding: "6px 16px 6px 10px",
                  marginBottom: 20,
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: BLUE, display: "block" }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#555", textTransform: "uppercase", fontFamily: "'Inter',sans-serif" }}>
                  OUR IMPACT
                </span>
              </div>

              {/* "Numbers That Matter" */}
              <div style={{ overflow: "hidden" }}>
                <h2
                  className="ach-h2"
                  style={{
                    display: "block",
                    fontSize: "clamp(30px,4.2vw,58px)",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.08,
                    color: BLACK,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Numbers That{" "}
                  <span style={{ color: BLUE }}>Matter</span>
                </h2>
              </div>
            </div>
          )}

          {/* ── TOP ROW: 344+ | 177+ ── */}
          {inView && (
            <div
              className="ach-top-row"
              style={{
                display: "flex",
                borderRadius: 0,
                overflow: "hidden",
                marginBottom: 3,
                boxShadow: "none",
                maxWidth: "900px",
                margin: "0 auto 3px",
                justifyContent: "center",
              }}
            >
              {topStats.map((s, i) => (
                <div
                  key={s.label}
                  className="ach-top-card"
                  style={{ flex: "0 1 auto", borderRight: i < topStats.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none", minWidth: "280px" }}
                >
                  <TopCard stat={s} active={inView} borderRight={false} />
                </div>
              ))}
            </div>
          )}

          {/* ── BOTTOM ROW: 84.4 | 3042 | 36.03 | 15.97 ── */}
          {inView && (
            <div
              className="ach-bot-row"
              style={{
                display: "flex",
                borderRadius: 0,
                overflow: "hidden",
                boxShadow: "none",
              }}
            >
              {bottomStats.map((s, i) => (
                <div
                  key={s.label}
                  className="ach-bot-card"
                  style={{ flex: 1, borderRight: i < bottomStats.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none" }}
                >
                  <BottomCard stat={s} active={inView} delay={i * 80} />
                </div>
              ))}
            </div>
          )}

          {/* ── BOTTOM SWEEP LINE ── */}
         

        </>
      </section>
    </>
  );
}