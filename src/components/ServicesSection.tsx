import {
  Warehouse,
  Gavel,
  FlaskConical,
  Store,
  CreditCard,
  Scale,
  ArrowUpRight,
} from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/* ── SERVICE DATA ── */
const services = [
  {
    Icon: Warehouse,
    title: "Warehousing\nFacilities",
    desc: "SAGOSERVE operates 10 owned warehouses to support its members. These facilities ensure safe storage, quality maintenance, and smooth supply chain operations for efficient market demand.",
  },
  {
    Icon: Gavel,
    title: "E-Auction\nFacilities",
    desc: "A transparent and competitive online e-auction platform is provided. An advance payment structure: 97%, 95%, or 90% advance for confirmed goods. This ensures fair price discovery and faster transactions.",
  },
  {
    Icon: FlaskConical,
    title: "Laboratory\nFacilities",
    desc: "A well-equipped quality testing laboratory ensures reliable product analysis. Sago is tested for 11 parameters per FSSAI standards and starch for 3 parameters per Indian Standards (IS).",
  },
  {
    Icon: Store,
    title: "Marketing &\nDirect Sales",
    desc: "SAGOSERVE operates a Direct Sales terminal for effective market access. Since 2012, 2,75,022 tons have been sold worth ₹10,046 crore — eliminating middlemen for better price realization.",
  },
  {
    Icon: CreditCard,
    title: "Loan &\nFinancial Support",
    desc: "SAGOSERVE provides credit and loan facilities to member manufacturers to support working capital needs, reducing dependency on private lenders and helping avoid distress sales.",
  },
  {
    Icon: Scale,
    title: "Weighbridge\nExcellence",
    desc: "High-capacity 50 MT and 60 MT weighbridges for accurate load measurement with 100% accuracy. Includes instant E-way Bill and E-invoice generation — fast, efficient, and affordable.",
  },
];

/* ── ICON RENDERER (realistic lucide-react icons) ── */
const IconRenderer = ({ Icon }: { Icon: React.ComponentType<unknown>; }) => (
  // @ts-expect-error: lucide-react icons accept size, strokeWidth, color props but type definition is restrictive
  <Icon size={48} strokeWidth={1.5} color="#c08a5b" />
);

/* ── CARD COMPONENT ── */
const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        /* exact card from image: white bg, rounded, tall portrait, no fixed height */
        background: "#FFFFFF",
        borderRadius: "16px",
        padding: "32px 28px 36px",
        minWidth: "280px",
        flexShrink: 0,
        width: "calc(25% - 18px)",  /* 4 cards visible like image */
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "box-shadow 0.3s, transform 0.35s",
        boxShadow: hovered
          ? "0 24px 60px rgba(0,0,0,0.13)"
          : "0 4px 24px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      {/* TOP ROW: title left, icon right */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "20px",
        gap: "12px",
      }}>
        {/* TITLE — bold, black, pre-wrap for line breaks */}
        <h3 style={{
          fontSize: "22px",
          fontWeight: 800,
          lineHeight: 1.2,
          color: "#111",
          letterSpacing: "-0.02em",
          whiteSpace: "pre-line",
          flex: 1,
        }}>
          {service.title}
        </h3>

        {/* REALISTIC LUCIDE ICON */}
        <div style={{ 
          flexShrink: 0, 
          opacity: hovered ? 1 : 0.75, 
          transition: "opacity 0.3s, transform 0.3s",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}>
          <IconRenderer Icon={service.Icon} />
        </div>
      </div>

      {/* DIVIDER — thin, light grey */}
      <div style={{
        height: "1px",
        background: hovered ? "#c08a5b" : "#e8e8e8",
        marginBottom: "20px",
        transition: "background 0.3s",
      }} />

      {/* DESCRIPTION */}
      <p style={{
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: 1.75,
        color: "#666",
        flex: 1,
      }}>
        {service.desc}
      </p>

      {/* Hover gold accent bottom bar */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #8b5e34, #c08a5b)",
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
};

/* ── MAIN SECTION ── */
const ServicesSection = () => {
  const headerRef   = useRef<HTMLDivElement>(null);
  const headerView  = useInView(headerRef, { once: true, margin: "-60px" });
  const scrollRef   = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX]         = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const animRef = useRef<number>(0);
  const speed   = useRef(1.2);

  /* ── AUTO SCROLL (seamless duplicate) ── */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const animate = () => {
      if (!paused && !isDragging) {
        container.scrollLeft += speed.current;
        const half = container.scrollWidth / 2;
        if (container.scrollLeft >= half) {
          container.scrollLeft -= half;
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [paused, isDragging]);

  /* ── DRAG TO SCROLL ── */
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollStart(scrollRef.current?.scrollLeft || 0);
    setPaused(true);
  };
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = e.pageX - startX;
    scrollRef.current.scrollLeft = scrollStart - dx;
  }, [isDragging, startX, scrollStart]);
  const onMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setPaused(false), 1500);
  };

  /* ── ARROW SCROLL ── */
  const scrollBy = (dir: "left" | "right") => {
    setPaused(true);
    const container = scrollRef.current;
    if (!container) return;
    const cardW = 298;  // card width + gap
    container.scrollLeft += dir === "right" ? cardW : -cardW;
    setTimeout(() => setPaused(false), 1800);
  };

  /* Duplicated cards for seamless loop */
  const doubled = [...services, ...services];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .ss, .ss * { font-family: 'Inter', sans-serif !important; box-sizing: border-box; }
        .ss a { text-decoration: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .arrow-btn:hover { background: #111 !important; color: #fff !important; }
        .explore-link:hover { background: #111 !important; }
        @media (max-width: 900px) {
          .ss-header-cols { flex-direction: column !important; min-height: auto !important; }
          .ss-header-left { width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(0,0,0,0.12) !important; padding: 24px 20px !important; justify-content: flex-start !important; }
          .ss-header-right { padding: 24px 0 0 0 !important; }
        }
      `}</style>

      <section
        className="ss"
        style={{
          width: "100%",
          background: "#F5F4F1",   /* exact warm off-white from image */
          padding: "70px 0 60px",
          overflow: "hidden",
          position: "relative",
        }}
      >
       {/* ── IMAGE WATERMARK ── */}
<div
  style={{
    position: "absolute",
    top: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "700px",
    height: "400px",
    opacity: 0.18,
    backgroundImage: 'url("/Photos/Image%201.png")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    pointerEvents: "none",
    zIndex: 0,
  }}
/>
        {/* ══════════════════════════
            HEADER
        ══════════════════════════ */}
        <div
          ref={headerRef}
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 56px",
            marginBottom: "72px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Two-column header layout */}
          <div className="ss-header-cols" style={{
            display: "flex",
            alignItems: "stretch",
            minHeight: "160px",
            position: "relative",
          }}>
            {/* Horizontal divider line — across full width at top */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 200,
                right: 400,
                
                width: "500px",
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
                bottom: 100,
                width: "1px",
                background: "rgba(0,0,0,0.12)",
                zIndex: 0,
              }}
            />

            {/* LEFT — Badge */}
            <motion.div
              className="ss-header-left"
              initial={{ opacity: 0, x: -20 }}
              animate={headerView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                width: "280px",
                flexShrink: 0,
                top: -40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 20px",
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
                }}>WHAT WE DO</span>
              </div>
            </motion.div>

            {/* RIGHT — Heading + Description */}
            <div className="ss-header-right" style={{
              flex: 1,
              padding: "40px 0 40px 48px",
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
                <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#111827", margin: "0 0 1px", lineHeight: 1.15, letterSpacing: "-0.4px" }}>
                  Experience
                </h2>
                <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#5f9bf5", margin: "0 0 14px", lineHeight: 1.15, letterSpacing: "-0.4px" }}>
                  The Purity Of Salem Sago
                </h2>
                <p style={{ fontSize: "13.5px", color: "#555f6e", lineHeight: 1.75, maxWidth: "580px", margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
                  SAGOSERVE has been strengthening the tapioca sago and starch industry through cooperation, quality assurance, and transparent trade practices for over five decades.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════
            CAROUSEL
        ══════════════════════════ */}
        <div
          style={{
            position: "relative",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 56px",
            zIndex: 2,
          }}
        >
          {/* LEFT ARROW */}
          <button
            onClick={() => scrollBy("left")}
            className="arrow-btn"
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: "40px", height: "40px",
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.10)",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px",
              color: "#333",
              transition: "background 0.2s, color 0.2s",
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            }}
          >‹</button>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scrollBy("right")}
            className="arrow-btn"
            style={{
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: "40px", height: "40px",
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.10)",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px",
              color: "#333",
              transition: "background 0.2s, color 0.2s",
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            }}
          >›</button>

          {/* TRACK */}
          <div style={{ overflow: "hidden", borderRadius: "4px" }}>
            <div
              ref={scrollRef}
              className="no-scrollbar"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onMouseEnter={() => setPaused(true)}
              style={{
                display: "flex",
                gap: "20px",
                overflowX: "scroll",
                cursor: isDragging ? "grabbing" : "grab",
                paddingBottom: "8px",
                userSelect: "none",
              }}
            >
              {doubled.map((service, i) => (
                <ServiceCard key={i} service={service} index={i % services.length} />
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════
            BOTTOM CTA — lines + button
        ══════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            marginTop: "80px",
            padding: "0 56px",
            maxWidth: "1200px",
            margin: "80px auto 0",
          }}
        >
          {/* Left line */}
          <div style={{
            flex: 1,
            maxWidth: "320px",
            height: "1px",
            background: "linear-gradient(to right, transparent, #111 80%, #111)",
          }} />

          {/* CTA Button */}
          <Link
            to="/services"
            className="explore-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "#111",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 700,
              padding: "14px 30px",
              borderRadius: "999px",
              transition: "background 0.25s",
              whiteSpace: "nowrap",
              letterSpacing: "0.01em",
              boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
            }}
          >
            Explore Services
            <ArrowUpRight size={18} />
          </Link>

          {/* Right line */}
          <div style={{
            flex: 1,
            maxWidth: "320px",
            height: "1px",
            background: "linear-gradient(to left, transparent, #111 80%, #111)",
          }} />
        </motion.div>

      </section>
    </>
  );
};

export default ServicesSection;