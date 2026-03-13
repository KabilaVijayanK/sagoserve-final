import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      "The auction system is transparent and reliable. It has significantly improved our trade efficiency and trust.",
    author: "Ema Watson",
    role: "Member",
    avatar: "/p1.jpg",
    initials: "EW",
    color: "#e8a87c",
  },
  {
    quote:
      "Professional management and quality assurance standards make SAGOSERVE our preferred trading platform.",
    author: "Jakob Alison",
    role: "Merchant",
    avatar: "/p2.jpg",
    initials: "JA",
    color: "#7ca8e8",
  },
  {
    quote:
      "SAGOSERVE has transformed how we do business. The transparency and fair pricing have been game-changers for our factory.",
    author: "Rajesh Kumar",
    role: "Sago Manufacturer",
    avatar: "/prd1.jpeg",
    initials: "RK",
    color: "#7ce8a8",
  },
  {
    quote:
      "Being a member for 15 years, I've witnessed the growth and positive impact on our farming community.",
    author: "Lakshmi Devi",
    role: "Tapioca Farmer",
    avatar: "/prd2.jpg",
    initials: "LD",
    color: "#e87ca8",
  },
];

// ─── AVATAR FALLBACK ──────────────────────────────────────────────────────────
function Avatar({
  src,
  initials,
  color,
  size = 64,
}: {
  src: string;
  initials: string;
  color: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        border: "3px solid white",
        boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
        background: failed ? color + "33" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.32,
        fontWeight: "700",
        color: color,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {failed ? (
        initials
      ) : (
        <img
          src={src}
          alt={initials}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

// ─── TESTIMONIAL CARD ─────────────────────────────────────────────────────────
function TestimonialCard({
  item,
  isActive,
  position,
  onClick,
}: {
  item: (typeof testimonials)[0];
  isActive: boolean;
  position: "left" | "center" | "right" | "hidden";
  onClick: () => void;
}) {
  const animationTargets = {
    center: { 
      x: 0, 
      scale: 1, 
      opacity: 1, 
      zIndex: 3, 
      filter: "blur(0px)",
      rotateY: 0,
      y: 0,
    },
    left: { 
      x: "-55%", 
      scale: 0.88, 
      opacity: 0.55, 
      zIndex: 1, 
      filter: "blur(1px)",
      rotateY: 15,
      y: 8,
    },
    right: { 
      x: "55%", 
      scale: 0.88, 
      opacity: 0.55, 
      zIndex: 1, 
      filter: "blur(1px)",
      rotateY: -15,
      y: 8,
    },
    hidden: { 
      x: 0, 
      scale: 0.7, 
      opacity: 0, 
      zIndex: 0, 
      filter: "blur(2px)",
      rotateY: 0,
      y: 20,
    },
  };

  const getTransition = (pos: typeof position) => {
    if (pos === "center") {
      return { duration: 0.7 };
    } else if (pos === "hidden") {
      return { duration: 0.55 };
    }
    return { duration: 0.65 };
  };

  return (
    <motion.div
      onClick={onClick}
      animate={animationTargets[position]}
      transition={getTransition(position)}
      style={{
        position: "absolute",
        width: "min(480px, 90vw)",
        background: "white",
        borderRadius: "20px",
        padding: "44px 48px",
        border: "1px solid #ebebeb",
        boxShadow: isActive
          ? position === "center"
            ? "0 32px 80px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.08)"
            : "0 12px 40px rgba(0,0,0,0.08)"
          : position === "center"
          ? "0 20px 60px rgba(0,0,0,0.10), 0 4px 20px rgba(0,0,0,0.06)"
          : "0 4px 16px rgba(0,0,0,0.05)",
        left: "50%",
        marginLeft: "calc(min(480px, 90vw) / -2)",
        top: 0,
        pointerEvents: position === "hidden" ? "none" : "auto",
        cursor: position !== "center" ? "pointer" : "default",
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Large decorative quote mark */}
      <div
        style={{
          fontSize: "96px",
          lineHeight: 0.8,
          color: "#f0f0f0",
          fontFamily: "Georgia, serif",
          marginBottom: "20px",
          userSelect: "none",
        }}
      >
        "
      </div>

      <p
        style={{
          fontSize: "16.5px",
          color: "#374151",
          lineHeight: 1.78,
          margin: "0 0 36px",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: "400",
        }}
      >
        "{item.quote}"
      </p>

      {/* Author row */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Avatar
          src={item.avatar}
          initials={item.initials}
          color={item.color}
          size={62}
        />
        <div>
          <p
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#111827",
              margin: "0 0 3px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {item.author}
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "#9ca3af",
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {item.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  // Autoplay
  useEffect(() => {
    if (!autoplay || !isInView) return;
    const t = setInterval(() => {
      setActive((p) => (p + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(t);
  }, [autoplay, isInView]);

  const go = (i: number) => {
    setAutoplay(false);
    setActive(i);
  };

  const prev = () => go((active + testimonials.length - 1) % testimonials.length);
  const next = () => go((active + 1) % testimonials.length);

  // Position mapping
  const getPosition = (i: number): "left" | "center" | "right" | "hidden" => {
    const total = testimonials.length;
    const diff = ((i - active + total) % total);
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === total - 1) return "left";
    return "hidden";
  };

  // Card height estimate for container
  const CARD_H = 320;

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#fafafa",
        padding: "96px 0 108px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }

        .tsec-nav-btn {
          width: 46px; height: 46px;
          border-radius: 50%;
          border: 1.5px solid #e0e0e0;
          background: white;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.22s ease;
          color: #374151;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .tsec-nav-btn:hover {
          background: #111827;
          border-color: #111827;
          color: white;
          transform: scale(1.08);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .tsec-dot {
          width: 8px; height: 8px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #d1d5db;
          padding: 0;
        }
        .tsec-dot.active {
          background: #111827;
          width: 28px;
        }
        .tsec-dot:hover:not(.active) {
          background: #9ca3af;
        }
      `}</style>

      {/* ── Subtle background decoration ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(241,245,249,0.8) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 40px",
          position: "relative",
        }}
      >
        {/* ── PILL HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          {/* Left line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              height: "1px",
              width: "120px",
              background: "linear-gradient(to right, transparent, #c8c8c8)",
              transformOrigin: "right center",
            }}
          />
          <div
            style={{
              border: "1.5px solid #c8c8c8",
              borderRadius: "100px",
              padding: "8px 24px",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "1.6px",
              textTransform: "uppercase",
              color: "#6b7280",
              fontFamily: "'DM Sans', sans-serif",
              background: "white",
              whiteSpace: "nowrap",
            }}
          >
            TESTIMONIALS
          </div>
          {/* Right line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              height: "1px",
              width: "120px",
              background: "linear-gradient(to left, transparent, #c8c8c8)",
              transformOrigin: "left center",
            }}
          />
        </motion.div>

        {/* ── HEADING ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: "16px" }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: "800",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "#5f9bf5",
              margin: "0",
              lineHeight: 1.15,
              letterSpacing: "-0.5px",
            }}
          >
            What Our Clients are Saying
          </h2>
        </motion.div>

        {/* ── SUBTITLE ── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textAlign: "center",
            fontSize: "15px",
            color: "#9ca3af",
            fontFamily: "'DM Sans', sans-serif",
            margin: "0 0 40px",
            lineHeight: 1.6,
          }}
        >
          Hear directly from our clients about their experiences and the results
          we've delivered.
        </motion.p>

        {/* ── CARDS STAGE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            position: "relative",
            height: `${CARD_H}px`,
            marginBottom: "40px",
          }}
        >
          {testimonials.map((item, i) => (
            <TestimonialCard
              key={i}
              item={item}
              isActive={i === active}
              position={getPosition(i)}
              onClick={() => {
                const pos = getPosition(i);
                if (pos === "left") prev();
                else if (pos === "right") next();
              }}
            />
          ))}
        </motion.div>

        {/* ── CONTROLS ROW: prev · dots · next ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {/* Prev */}
          <button className="tsec-nav-btn" onClick={prev} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dots */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`tsec-dot${active === i ? " active" : ""}`}
                onClick={() => go(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Next */}
          <button className="tsec-nav-btn" onClick={next} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* ── PROGRESS BAR ── */}
        <div
          style={{
            marginTop: "28px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "180px",
              height: "2px",
              background: "#e5e7eb",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <motion.div
              key={active}
              initial={{ width: "0%" }}
              animate={{ width: `${((active + 1) / testimonials.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: "100%",
                background: "#111827",
                borderRadius: "2px",
              }}
            />
          </div>
          <span
            style={{
              marginLeft: "12px",
              fontSize: "11px",
              color: "#9ca3af",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: "500",
              lineHeight: "2px",
              alignSelf: "center",
            }}
          >
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}