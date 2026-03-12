import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface GalleryItem {
  id: number;
  src: string;
  label: string;
}

interface CardConfig {
  item: GalleryItem;
  w: number;
  rounded: boolean;
}

// ── Your public folder images ─────────────────────────────────────────────────
const galleryItems: GalleryItem[] = [
  { id: 1,  src: "/Photos/Sago Food Photos/JULY/1.JPG",      label: "Image 1"  },
  { id: 2,  src: "/Photos/Image 2.JPG",                       label: "Image 2"  },
  { id: 3,  src: "/Photos/Image 1.png",                       label: "Image 3"  },
  { id: 4,  src: "/Photos/Sago Food Photos/JULY/2.JPG",      label: "Image 4"  },
  { id: 5,  src: "/Photos/Sago Food Photos/JULY/3.JPG",      label: "Image 5"  },
  { id: 6,  src: "/Photos/Sago Food Photos/JULY/4.JPG",      label: "Image 6"  },
  { id: 7,  src: "/Photos/Sago Food Photos/AUG/5.JPG",       label: "Image 7"  },
  { id: 8,  src: "/Photos/Sago Food Photos/AUG/6.JPG",       label: "Image 8"  },
  { id: 9,  src: "/Photos/Sago Food Photos/AUG/7.JPG",       label: "Image 9"  },
  { id: 10, src: "/Photos/Sago Food Photos/AUG/8.JPG",       label: "Image 10" },
  { id: 11, src: "/Photos/Sago Food Photos/C9R_7157.JPG",    label: "Image 11" },
];

// ── Row configs ───────────────────────────────────────────────────────────────
const row1Config: CardConfig[] = [
  { item: galleryItems[0], w: 220, rounded: false },
  { item: galleryItems[1], w: 265, rounded: true  },
  { item: galleryItems[2], w: 305, rounded: false },
  { item: galleryItems[3], w: 242, rounded: true  },
  { item: galleryItems[4], w: 285, rounded: false },
  { item: galleryItems[5], w: 250, rounded: true  },
  { item: galleryItems[6], w: 325, rounded: false },
];

const row2Config: CardConfig[] = [
  { item: galleryItems[7],  w: 285, rounded: true  },
  { item: galleryItems[8],  w: 245, rounded: false },
  { item: galleryItems[9],  w: 305, rounded: true  },
  { item: galleryItems[10], w: 265, rounded: false },
];

// ── Custom Cursor ─────────────────────────────────────────────────────────────
const GalleryCursor = ({ isView }: { isView: boolean }) => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top  = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top  = ring.current.y + "px";
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "#c8a96e",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          zIndex: 9998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width:      isView ? 88 : 38,
          height:     isView ? 88 : 38,
          background: isView ? "rgba(12,10,8,0.92)" : "transparent",
          border:     isView ? "none" : "1.5px solid rgba(30,25,20,0.35)",
          transition: "width 0.4s cubic-bezier(0.22,1,0.36,1), height 0.4s, background 0.4s, border 0.4s",
        }}
      >
        {isView && (
          <span
            style={{
              color: "#fff",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            View
          </span>
        )}
      </div>
    </>
  );
};

// ── Scroll Card ───────────────────────────────────────────────────────────────
interface ScrollCardProps {
  item: GalleryItem;
  rounded?: boolean;
  onOpen: (idx: number) => void;
  onHover: (v: boolean) => void;
  style?: React.CSSProperties;
  index?: number;
  sectionRef: React.RefObject<HTMLElement>;
  direction: "left" | "right";
}

const ScrollCard = ({
  item,
  rounded = false,
  onOpen,
  onHover,
  style,
  index = 0,
  sectionRef,
  direction,
}: ScrollCardProps) => {
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const baseOffset = direction === "left" ? -700 : 700;
  const staggerDelay = index * 0.1;

  const x = useTransform(
    scrollYProgress,
    [0, 0.18 + staggerDelay * 0.12, 0.65 + staggerDelay * 0.12, 1],
    [baseOffset, baseOffset * 0.4, 0, direction === "left" ? -80 : 80]
  );
  const springX = useSpring(x, { stiffness: 38, damping: 26, mass: 1.3 });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.14 + staggerDelay * 0.08, 0.72 + staggerDelay * 0.08, 1],
    [0, 1, 1, 0.25]
  );

  const handle = (v: boolean) => {
    setHovered(v);
    onHover(v);
  };

  return (
    <motion.div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: rounded ? 16 : 5,
        cursor: "none",
        flexShrink: 0,
        boxShadow: hovered
          ? "0 36px 90px rgba(0,0,0,0.24)"
          : "0 6px 24px rgba(0,0,0,0.09)",
        transition: "box-shadow 0.65s cubic-bezier(0.22,1,0.36,1)",
        ...style,
        x: springX,
        opacity,
      }}
      onMouseEnter={() => handle(true)}
      onMouseLeave={() => handle(false)}
      onClick={() => onOpen(item.id - 1)}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Image */}
      <motion.img
        src={item.src}
        alt={item.label}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          willChange: "transform",
        }}
        animate={{ scale: hovered ? 1.0 : 1.09 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Dark gradient overlay */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.52) 100%)",
          zIndex: 1,
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.45 }}
      />

      {/* Gold bottom accent line */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, #c8a96e, #e8d5a8, #c8a96e)",
          transformOrigin: "left",
          zIndex: 3,
        }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Label */}
      <motion.div
        style={{ position: "absolute", bottom: 22, left: 22, zIndex: 2 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 16 }}
        transition={{ duration: 0.42, delay: 0.06 }}
      >
        <div
          style={{ width: 22, height: 1.5, background: "#c8a96e", marginBottom: 9 }}
        />
        <span
          style={{
            color: "#fff",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "2.8px",
            textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {item.label}
        </span>
      </motion.div>
    </motion.div>
  );
};

// ── Lightbox ──────────────────────────────────────────────────────────────────
interface LightboxProps {
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = ({ index, onClose, onPrev, onNext }: LightboxProps) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const slide = useCallback(
    (dir: 1 | -1) => {
      const img = imgRef.current;
      if (!img) return;
      img.style.transition = "opacity 0.13s ease, transform 0.13s ease";
      img.style.opacity = "0";
      img.style.transform = `scale(0.95) translateX(${dir * -50}px)`;
      setTimeout(() => {
        if (dir === 1) onNext();
        else onPrev();
        requestAnimationFrame(() => {
          if (!imgRef.current) return;
          imgRef.current.style.transition =
            "opacity 0.44s cubic-bezier(0.22,1,0.36,1), transform 0.52s cubic-bezier(0.22,1,0.36,1)";
          imgRef.current.style.opacity = "1";
          imgRef.current.style.transform = "scale(1) translateX(0)";
        });
      }, 140);
    },
    [onNext, onPrev]
  );

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowRight") slide(1);
      if (e.key === "ArrowLeft")  slide(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [index, onClose, slide]);

  useEffect(() => {
    document.body.style.overflow = index !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [index]);

  if (index === null) return null;

  const item = galleryItems[index];
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(galleryItems.length).padStart(2, "0")}`;

  const btnStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    outline: "none",
  };

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2000,
          background: "rgba(3,2,1,0.97)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          cursor: "default",
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Close */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onClose}
          style={{
            position: "fixed",
            top: 28,
            right: 32,
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(10px)",
            color: "#fff",
            cursor: "pointer",
            zIndex: 2001,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
          }}
        >
          <X size={18} />
        </motion.button>

        {/* Image wrap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.86, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative",
            maxWidth: "88vw",
            maxHeight: "88vh",
            cursor: "default",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => slide(-1)} style={{ ...btnStyle, left: -70 }}>
            <ChevronLeft size={22} />
          </button>

          <img
            ref={imgRef}
            src={item.src}
            alt={item.label}
            style={{
              maxWidth: "88vw",
              maxHeight: "88vh",
              borderRadius: 8,
              objectFit: "contain",
              display: "block",
              boxShadow: "0 70px 160px rgba(0,0,0,0.9)",
            }}
          />

          <button onClick={() => slide(1)} style={{ ...btnStyle, right: -70 }}>
            <ChevronRight size={22} />
          </button>

          {/* Meta */}
          <div
            style={{
              position: "absolute",
              bottom: -46,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 10,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.28)",
                fontSize: 13,
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                letterSpacing: 3,
              }}
            >
              {counter}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ── Main Gallery Section ──────────────────────────────────────────────────────
const GallerySection = () => {
  const [lbIndex,    setLbIndex]    = useState<number | null>(null);
  const [cursorView, setCursorView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  const openLb  = useCallback((i: number) => setLbIndex(i), []);
  const closeLb = useCallback(() => setLbIndex(null), []);
  const prevLb  = useCallback(
    () => setLbIndex((p) => p !== null ? (p - 1 + galleryItems.length) % galleryItems.length : null),
    []
  );
  const nextLb  = useCallback(
    () => setLbIndex((p) => p !== null ? (p + 1) % galleryItems.length : null),
    []
  );
  const onHover = useCallback((v: boolean) => setCursorView(v), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        /* Hide default cursor on desktop */
        @media (pointer: fine) {
          .gs-wrap * { cursor: none !important; }
        }
        /* Hide custom cursor on touch */
        @media (pointer: coarse) {
          .gs-cursor { display: none !important; }
        }

        .gs-row {
          display: flex;
          flex-direction: row;
          gap: 18px;
          margin-bottom: 20px;
          flex-wrap: nowrap;
          overflow-x: auto;
          padding-right: 20px;
        }

        /* Desktop - normal layout */
        @media (min-width: 1025px) {
          .gs-row { overflow-x: visible; }
        }

        /* Tablet - 900px to 1024px */
        @media (max-width: 1024px) {
          .gs-row { overflow-x: auto; }
          .gs-row > * { height: 260px !important; }
        }

        /* Tablet - 768px to 899px */
        @media (max-width: 899px) {
          .gs-row {
            flex-wrap: wrap;
            overflow-x: visible;
            gap: 14px;
            margin-bottom: 16px;
          }
          .gs-row > * {
            width: calc(50% - 7px) !important;
            height: 220px !important;
            flex: 0 0 calc(50% - 7px);
          }
        }

        /* Mobile - 640px to 767px */
        @media (max-width: 767px) {
          .gs-row {
            gap: 12px;
            margin-bottom: 14px;
          }
          .gs-row > * {
            width: calc(50% - 6px) !important;
            height: 200px !important;
            flex: 0 0 calc(50% - 6px);
          }
          .gs-wm { font-size: 12vw !important; }
        }

        /* Mobile - up to 639px */
        @media (max-width: 639px) {
          .gs-row {
            gap: 12px;
            margin-bottom: 14px;
          }
          .gs-row > * {
            width: 100% !important;
            height: 200px !important;
            flex: 0 0 100%;
          }
          .gs-wm { font-size: 14vw !important; }
        }
      `}</style>

      {/* Custom cursor */}
      <div className="gs-cursor">
        <GalleryCursor isView={cursorView} />
      </div>

      <section
        id="gallery"
        ref={sectionRef}
        className="gs-wrap"
        style={{
          position: "relative",
          background: "#f5f4f2",
          overflow: "hidden",
          paddingBottom: "clamp(40px, 10vh, 90px)",
          paddingTop: 0,
          minHeight: "100vh",
        }}
      >
        {/* ── Watermark ── */}
        <motion.div
          className="gs-wm"
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          style={{
            position: "absolute",
            top: -20,
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(200,196,188,0.55)",
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "clamp(88px, 16vw, 240px)",
            fontWeight: 700,
            fontStyle: "italic",
            lineHeight: 1,
            whiteSpace: "nowrap",
            letterSpacing: "-4px",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
        >
          gallery
        </motion.div>

        {/* ── Cards ── */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            paddingTop: "clamp(60px, 8vw, 110px)",
            paddingLeft: "clamp(12px, 4vw, 40px)",
            paddingRight: "clamp(12px, 4vw, 40px)",
            overflowX: "hidden",
          }}
        >
          {/* ROW 1 — slides from LEFT */}
          <div
            className="gs-row"
            style={{
              position: "relative",
            }}
          >
            {row1Config.map(({ item, w, rounded }, i) => (
              <ScrollCard
                key={item.id}
                item={item}
                rounded={rounded}
                onOpen={openLb}
                onHover={onHover}
                index={i}
                sectionRef={sectionRef}
                direction="left"
                style={{
                  width: w,
                  minWidth: w,
                  height: 375,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* ROW 2 — slides from RIGHT */}
          <div
            className="gs-row"
            style={{
              position: "relative",
            }}
          >
            {row2Config.map(({ item, w, rounded }, i) => (
              <ScrollCard
                key={item.id}
                item={item}
                rounded={rounded}
                onOpen={openLb}
                onHover={onHover}
                index={i}
                sectionRef={sectionRef}
                direction="right"
                style={{
                  width: w,
                  minWidth: w,
                  height: 355,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <Lightbox index={lbIndex} onClose={closeLb} onPrev={prevLb} onNext={nextLb} />
    </>
  );
};

export default GallerySection;