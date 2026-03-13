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
import { motion, useInView } from "framer-motion";
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

/* ── ICON RENDERER ── */
const IconRenderer = ({ Icon }: { Icon: React.ComponentType<unknown> }) => (
  // @ts-expect-error: lucide icons accept these props
  <Icon size={44} strokeWidth={1.5} color="#c08a5b" />
);

/* ── CARD — fills full height of its slot so all cards match ── */
const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        padding: "28px 24px 30px",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "box-shadow 0.3s",
        boxShadow: hovered
          ? "0 24px 60px rgba(0,0,0,0.13)"
          : "0 4px 24px rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.05)",
        /* fill the motion.div wrapper height completely */
        width: "100%",
        height: "100%",
      }}
    >
      {/* TOP: title + icon */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
          gap: "12px",
        }}
      >
        <h3
          style={{
            fontSize: "21px",
            fontWeight: 800,
            lineHeight: 1.2,
            color: "#111",
            letterSpacing: "-0.02em",
            whiteSpace: "pre-line",
            flex: 1,
            margin: 0,
          }}
        >
          {service.title}
        </h3>
        <div
          style={{
            flexShrink: 0,
            opacity: hovered ? 1 : 0.75,
            transition: "opacity 0.3s, transform 0.3s",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          <IconRenderer Icon={service.Icon} />
        </div>
      </div>

      {/* DIVIDER */}
      <div
        style={{
          height: "1px",
          background: hovered ? "#c08a5b" : "#e8e8e8",
          marginBottom: "16px",
          transition: "background 0.3s",
          flexShrink: 0,
        }}
      />

      {/* DESC — flex:1 pushes any extra space into the text area evenly */}
      <p
        style={{
          fontSize: "13.5px",
          fontWeight: 400,
          lineHeight: 1.75,
          color: "#666",
          margin: 0,
          flex: 1,
        }}
      >
        {service.desc}
      </p>

      {/* Gold bar on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #8b5e34, #c08a5b)",
          transformOrigin: "left",
        }}
      />
    </div>
  );
};

/* ── MAIN SECTION ── */
const ServicesSection = () => {
  const headerRef     = useRef<HTMLDivElement>(null);
  const headerView    = useInView(headerRef, { once: true, margin: "-60px" });
  const sectionRef    = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const scrollRef   = useRef<HTMLDivElement>(null);
  const [paused, setPaused]         = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const posRef      = useRef(0);
  const startX      = useRef(0);
  const scrollStart = useRef(0);
  const animRef     = useRef<number>(0);

  /* ── SMOOTH RAF TICKER ── */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const tick = () => {
      if (!paused && !isDragging) {
        posRef.current += 0.8;
        const half = container.scrollWidth / 2;
        if (posRef.current >= half) posRef.current -= half;
        container.scrollLeft = posRef.current;
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [paused, isDragging]);

  /* ── MOUSE DRAG ── */
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current      = e.pageX;
    scrollStart.current = posRef.current;
    setPaused(true);
  };
  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      const next = scrollStart.current - (e.pageX - startX.current);
      posRef.current = next;
      scrollRef.current.scrollLeft = next;
    },
    [isDragging]
  );
  const onMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setPaused(false), 1200);
  };

  /* ── TOUCH ── */
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current      = e.touches[0].pageX;
    scrollStart.current = posRef.current;
    setPaused(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    const next = scrollStart.current - (e.touches[0].pageX - startX.current);
    posRef.current = next;
    scrollRef.current.scrollLeft = next;
  };
  const onTouchEnd = () => setTimeout(() => setPaused(false), 1200);

  /* ── ARROW ── */
  const scrollByCard = (dir: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    setPaused(true);
    const from = posRef.current;
    const to   = from + (dir === "right" ? 300 : -300);
    const dur  = 420;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p    = Math.min((ts - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const half = container.scrollWidth / 2;
      const next = ((from + (to - from) * ease) % half + half) % half;
      posRef.current = next;
      container.scrollLeft = next;
      if (p < 1) requestAnimationFrame(step);
      else setTimeout(() => setPaused(false), 600);
    };
    requestAnimationFrame(step);
  };

  const getInitialX = (index: number) =>
    index < Math.ceil(services.length / 2) ? "-60vw" : "60vw";

  const doubled = [...services, ...services];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .ss, .ss * { font-family: 'Inter', sans-serif !important; box-sizing: border-box; }
        .ss a { text-decoration: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .ss-arrowbtn:hover { background: #111 !important; color: #fff !important; }
        .explore-link:hover { background: #111 !important; }

        @media (max-width: 900px) {
          .ss-header-cols  { flex-direction: column !important; min-height: auto !important; }
          .ss-header-left  { width: 100% !important; padding: 24px 20px !important; justify-content: flex-start !important; }
          .ss-header-right { padding: 16px 0 0 0 !important; }
          .ss-vdiv         { display: none !important; }
          .ss-section      { padding: 40px 0 40px !important; }
          .ss-hw           { padding: 0 20px !important; margin-bottom: 36px !important; }
          .ss-arrowbtn     { display: none !important; }
          .ss-ctaline      { display: none !important; }
          .ss-ctawrap      { padding: 0 20px !important; }
          .ss-card-slot    { min-width: 220px !important; width: 220px !important; }
        }
        @media (max-width: 480px) {
          .ss-card-slot { min-width: 190px !important; width: 190px !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="ss ss-section"
        style={{
          width: "100%",
          background: "#F5F4F1",
          padding: "70px 0 60px",
          overflowX: "hidden",
          overflowY: "visible",
          position: "relative",
        }}
      >
        {/* WATERMARK */}
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

        {/* ══ HEADER ══ */}
        <div
          ref={headerRef}
          className="ss-hw"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 56px",
            marginBottom: "72px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="ss-header-cols"
            style={{
              display: "flex",
              alignItems: "stretch",
              minHeight: "160px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 200,
                width: "500px",
                height: "1px",
                background: "rgba(0,0,0,0.15)",
                zIndex: 0,
              }}
            />
            <div
              className="ss-vdiv"
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

            <motion.div
              className="ss-header-left"
              initial={{ opacity: 0, x: -20 }}
              animate={headerView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                width: "280px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 20px",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#fff",
                  border: "1.5px solid #1a1a1a",
                  borderRadius: "999px",
                  padding: "8px 20px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#5f9bf5",
                    display: "block",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    color: "#1a1a1a",
                    textTransform: "uppercase",
                  }}
                >
                  WHAT WE DO
                </span>
              </div>
            </motion.div>

            <div
              className="ss-header-right"
              style={{
                flex: 1,
                padding: "40px 0 40px 48px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={headerView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2
                  style={{
                    fontSize: "clamp(22px,3vw,36px)",
                    fontWeight: 800,
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    color: "#111827",
                    margin: "0 0 1px",
                    lineHeight: 1.15,
                    letterSpacing: "-0.4px",
                  }}
                >
                  Experience
                </h2>
                <h2
                  style={{
                    fontSize: "clamp(22px,3vw,36px)",
                    fontWeight: 800,
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    color: "#5f9bf5",
                    margin: "0 0 14px",
                    lineHeight: 1.15,
                    letterSpacing: "-0.4px",
                  }}
                >
                  The Purity Of Salem Sago
                </h2>
                <p
                  style={{
                    fontSize: "13.5px",
                    color: "#555f6e",
                    lineHeight: 1.75,
                    maxWidth: "580px",
                    margin: 0,
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  SAGOSERVE has been strengthening the tapioca sago and starch
                  industry through cooperation, quality assurance, and
                  transparent trade practices for over five decades.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ══ CAROUSEL — full 100vw ══ */}
        <div
          style={{
            position: "relative",
            width: "100vw",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          {/* LEFT ARROW */}
          <button
            onClick={() => scrollByCard("left")}
            className="ss-arrowbtn"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.10)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              color: "#333",
              transition: "background 0.2s, color 0.2s",
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            }}
          >
            ‹
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scrollByCard("right")}
            className="ss-arrowbtn"
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.10)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              color: "#333",
              transition: "background 0.2s, color 0.2s",
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            }}
          >
            ›
          </button>

          {/* SCROLL TRACK
              alignItems: "stretch" → all card slots grow to the tallest card's height
              The card inside uses height:100% to fill that slot completely
              Result: every card is exactly the same height automatically
          */}
          <div
            ref={scrollRef}
            className="no-scrollbar"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseEnter={() => setPaused(true)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              display: "flex",
              gap: "20px",
              overflowX: "scroll",
              cursor: isDragging ? "grabbing" : "grab",
              paddingBottom: "12px",
              userSelect: "none",
              alignItems: "stretch", /* ← key: all slots same height */
            }}
          >
            {doubled.map((service, i) => {
              const isFirstSet = i < services.length;
              const cardIndex  = i % services.length;
              const initX      = getInitialX(cardIndex);

              return (
                <motion.div
                  key={i}
                  className="ss-card-slot"
                  initial={isFirstSet ? { opacity: 0, x: initX } : false}
                  animate={
                    isFirstSet
                      ? sectionInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: initX }
                      : {}
                  }
                  transition={
                    isFirstSet
                      ? { duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] }
                      : {}
                  }
                  style={{
                    minWidth: "280px",
                    width: "280px",
                    flexShrink: 0,
                    /* display:flex + height:100% lets the card fill this slot */
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ══ BOTTOM CTA ══ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="ss-ctawrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            padding: "0 56px",
            maxWidth: "1200px",
            margin: "80px auto 0",
          }}
        >
          <div
            className="ss-ctaline"
            style={{
              flex: 1,
              maxWidth: "320px",
              height: "1px",
              background: "linear-gradient(to right, transparent, #111 80%, #111)",
            }}
          />
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
          <div
            className="ss-ctaline"
            style={{
              flex: 1,
              maxWidth: "320px",
              height: "1px",
              background: "linear-gradient(to left, transparent, #111 80%, #111)",
            }}
          />
        </motion.div>
      </section>
    </>
  );
};

export default ServicesSection;