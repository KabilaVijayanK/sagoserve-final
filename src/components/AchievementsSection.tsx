import { useEffect, useRef, useState } from "react";

const BLUE  = "#5f9bf5";
const BLACK = "#111111";
const BG    = "#F5F4F1";

const stats = [
  { prefix: "",  end: 344,  decimal: "",    unit: "",      suffix: "+", label: "Active Members",      desc: "Registered member manufacturers working under the cooperative", highlight: true  },
  { prefix: "",  end: 177,  decimal: "",    unit: "",      suffix: "+", label: "Active Merchants",    desc: "Authorized merchants facilitating trade and distribution",       highlight: false },
  { prefix: "",  end: 84,   decimal: ".4",  unit: "Lakhs", suffix: "",  label: "Total Bags Sold",     desc: "Total bags sold across all e-auction and direct sales channels", highlight: false },
  { prefix: "₹", end: 3042, decimal: "",    unit: "Crore", suffix: "",  label: "Total Sales Value",   desc: "Cumulative value of all sago and starch sales since inception",  highlight: false },
  { prefix: "₹", end: 36,   decimal: ".03", unit: "",      suffix: "",  label: "Average Sale Value",  desc: "Average per-bag sale value achieved through cooperative trading", highlight: false },
  { prefix: "₹", end: 15,   decimal: ".97", unit: "Crore", suffix: "",  label: "Total Profit Earned", desc: "Net profit distributed among members through surplus sharing",    highlight: false },
];

/* ── count-up ── */
const useCountUp = (end: number, active: boolean) => {
  const [v, setV] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!active || done.current) return;
    done.current = true;
    const dur = 1700, t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setV(Math.floor((1 - Math.pow(2, -10 * p)) * end));
      if (p < 1) raf = requestAnimationFrame(tick); else setV(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end]);
  return v;
};

/* ── single card ── */
const Card = ({ stat, active }: { stat: typeof stats[0]; active: boolean }) => {
  const n = useCountUp(stat.end, active);
  const [hov, setHov] = useState(false);
  const c = stat.highlight ? BLUE : BLACK;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: "0 0 auto",
        width: "clamp(220px, 28vw, 320px)",
        scrollSnapAlign: "start",
        paddingRight: 40,
        borderRight: "1px solid rgba(0,0,0,0.09)",
        transition: "transform 0.3s",
        transform: hov ? "translateY(-6px)" : "none",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {/* number row */}
      <div style={{ display: "flex", alignItems: "baseline", lineHeight: 1, marginBottom: 14, flexWrap: "nowrap", gap: 0 }}>
        {stat.prefix && (
          <span style={{ fontSize: "clamp(18px,2.2vw,32px)", fontWeight: 900, color: BLUE, lineHeight: 1, marginRight: 1 }}>
            {stat.prefix}
          </span>
        )}
        <span style={{ fontSize: "clamp(44px,5.5vw,80px)", fontWeight: 900, color: hov ? BLUE : c, letterSpacing: "-0.045em", lineHeight: 1, transition: "color 0.2s" }}>
          {n.toLocaleString("en-IN")}
        </span>
        {(stat.decimal || stat.suffix) && (
          <span style={{ fontSize: "clamp(30px,3.8vw,56px)", fontWeight: 900, color: hov ? BLUE : c, letterSpacing: "-0.04em", lineHeight: 1, transition: "color 0.2s" }}>
            {stat.decimal || stat.suffix}
          </span>
        )}
        {stat.unit && (
          <span style={{ fontSize: 10, fontWeight: 800, color: BLUE, letterSpacing: "0.12em", textTransform: "uppercase" as const, alignSelf: "flex-end" as const, marginBottom: 8, marginLeft: 5, whiteSpace: "nowrap" as const }}>
            {stat.unit}
          </span>
        )}
      </div>

      {/* divider */}
      <div style={{
        height: 1,
        background: stat.highlight ? BLUE : hov ? `linear-gradient(to right,${BLUE},transparent)` : "rgba(0,0,0,0.12)",
        marginBottom: 18, transition: "background 0.25s",
        animation: active ? "divSlide 0.55s ease forwards" : "none",
      }} />

      {/* label */}
      <p style={{ fontSize: "clamp(13px,1.2vw,17px)", fontWeight: 800, color: hov ? BLUE : (stat.highlight ? BLUE : BLACK), letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: 8, transition: "color 0.2s" }}>
        {stat.label}
      </p>

      {/* desc */}
      <p style={{ fontSize: "clamp(11px,0.9vw,13px)", fontWeight: 400, lineHeight: 1.75, color: "#888" }}>
        {stat.desc}
      </p>
    </div>
  );
};

/* ── main ── */
export default function AchievementsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const secRef    = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activePage, setActivePage] = useState(0);

  // intersection observer
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (secRef.current) obs.observe(secRef.current);
    return () => obs.disconnect();
  }, []);

  // track scroll position → active dot
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 40 : 300;
      const pg = Math.round(el.scrollLeft / cardW);
      setActivePage(Math.min(pg, 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (pg: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 40 : 300;
    el.scrollTo({ left: pg * cardW * 4, behavior: "smooth" });
  };

  // which stats are "active" based on scroll position
  const activeStart = activePage * 4;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        .ach8, .ach8 * { font-family:'Inter',sans-serif !important; box-sizing:border-box; margin:0; padding:0; }
        .ach8 button { cursor:pointer; border:none; background:none; padding:0; }

        @keyframes divSlide { from { transform: scaleX(0); transform-origin:left; } to { transform: scaleX(1); transform-origin:left; } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
        @keyframes slideH2 { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:none; } }

        .ach8-badge { animation: fadeUp 0.5s ease forwards; }
        .ach8-h2    { animation: slideH2 0.7s 0.1s cubic-bezier(.22,1,.36,1) both; }

        /* scroll track */
        .ach8-scroll {
          display: flex;
          gap: 0;
          overflow-x: scroll;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          cursor: grab;
          padding-bottom: 4px;
        }
        .ach8-scroll::-webkit-scrollbar { display:none; }
        .ach8-scroll:active { cursor: grabbing; }

        /* right fade */
        .ach8-wrap { position:relative; }
        .ach8-fade {
          position:absolute; top:0; right:0; bottom:0; width:80px;
          background: linear-gradient(to right, transparent, ${BG});
          pointer-events:none; z-index:5;
        }

        .dot-pill { transition: background 0.3s, width 0.35s ease; }
        .dot-pill:hover { opacity:0.7; }
        .sweep-line { animation: sweepIn 1.2s 1s ease forwards; transform-origin:left; opacity:0; transform:scaleX(0); }
        @keyframes sweepIn { to { opacity:1; transform:scaleX(1); } }
      `}</style>

      <section className="ach8" ref={secRef} style={{ width:"100%", background:BG, padding:"clamp(40px,6vw,88px) 0", overflow:"hidden" }}>
        <div style={{ maxWidth:"1240px", margin:"0 auto", padding:"0 clamp(24px,5vw,64px)" }}>

          {/* header */}
          {inView && (
            <div style={{ textAlign:"center", marginBottom:"clamp(40px,5.5vw,76px)" }}>
              <div className="ach8-badge" style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#fff", border:"1px solid rgba(0,0,0,0.09)", borderRadius:999, padding:"6px 16px 6px 10px", marginBottom:16 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:BLUE, display:"block" }} />
                <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.18em", color:"#555", textTransform:"uppercase" }}>OUR IMPACT</span>
              </div>
              <div style={{ overflow:"hidden" }}>
                <h2 className="ach8-h2" style={{ display:"block", fontSize:"clamp(28px,4vw,54px)", fontWeight:900, letterSpacing:"-0.03em", lineHeight:1.1, color:BLACK }}>
                  Numbers That <span style={{ color:BLUE }}>Matter</span>
                </h2>
              </div>
            </div>
          )}

          {/* scroll wrap */}
          <div className="ach8-wrap">
            <div ref={scrollRef} className="ach8-scroll">
              {stats.map((s, i) => (
                <Card key={s.label} stat={s} active={inView && i >= activeStart && i < activeStart + 6} />
              ))}
              {/* spacer so last card doesn't hug edge */}
              <div style={{ flex:"0 0 60px" }} />
            </div>
            <div className="ach8-fade" />
          </div>

          {/* dots */}
          {inView && (
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginTop:"clamp(24px,3.5vw,44px)" }}>
              {[0, 1].map(i => (
                <button
                  key={i}
                  className="dot-pill"
                  onClick={() => goTo(i)}
                  style={{ width: i === activePage ? 28 : 10, height:10, borderRadius:999, background: i === activePage ? BLUE : "rgba(0,0,0,0.16)" }}
                />
              ))}
            </div>
          )}

          {/* bottom sweep */}
          {inView && (
            <div className="sweep-line" style={{ height:2, background:`linear-gradient(to right,${BLUE},rgba(95,155,245,0))`, marginTop:"clamp(24px,3.5vw,48px)", borderRadius:999 }} />
          )}
        </div>
      </section>
    </>
  );
}