import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface GalleryItem { id: number; src: string; label: string; }
interface CardConfig   { item: GalleryItem; w: number; h: number; rounded: boolean; }

// ── Images ────────────────────────────────────────────────────────────────────
const galleryItems: GalleryItem[] = [
  { id: 1,  src: "/Photos/Sago Food Photos/JULY/1.JPG",   label: "Image 1"  },
  { id: 2,  src: "/Photos/Image 2.JPG",                   label: "Image 2"  },
  { id: 3,  src: "/Photos/Image 1.png",                   label: "Image 3"  },
  { id: 4,  src: "/Photos/Sago Food Photos/JULY/2.JPG",   label: "Image 4"  },
  { id: 5,  src: "/Photos/Sago Food Photos/JULY/3.JPG",   label: "Image 5"  },
  { id: 6,  src: "/Photos/Sago Food Photos/JULY/4.JPG",   label: "Image 6"  },
  { id: 7,  src: "/Photos/Sago Food Photos/AUG/5.JPG",    label: "Image 7"  },
  { id: 8,  src: "/Photos/Sago Food Photos/AUG/6.JPG",    label: "Image 8"  },
  { id: 9,  src: "/Photos/Sago Food Photos/AUG/7.JPG",    label: "Image 9"  },
  { id: 10, src: "/Photos/Sago Food Photos/AUG/8.JPG",    label: "Image 10" },
  { id: 11, src: "/Photos/Sago Food Photos/C9R_7157.JPG", label: "Image 11" },
];

const row1Config: CardConfig[] = [
  { item: galleryItems[0], w: 195, h: 370, rounded: false },
  { item: galleryItems[1], w: 270, h: 325, rounded: true  },
  { item: galleryItems[2], w: 430, h: 385, rounded: false },
  { item: galleryItems[3], w: 245, h: 330, rounded: true  },
  { item: galleryItems[4], w: 400, h: 380, rounded: false },
  { item: galleryItems[5], w: 255, h: 335, rounded: true  },
  { item: galleryItems[6], w: 345, h: 372, rounded: false },
];

const row2Config: CardConfig[] = [
  { item: galleryItems[7],  w: 285, h: 355, rounded: true  },
  { item: galleryItems[8],  w: 558, h: 370, rounded: false },
  { item: galleryItems[9],  w: 300, h: 350, rounded: false },
  { item: galleryItems[10], w: 510, h: 365, rounded: true  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CURSOR — pure DOM + RAF, zero React re-renders
// ─────────────────────────────────────────────────────────────────────────────
const GalleryCursor = ({ isView }: { isView: boolean }) => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ mx: -300, my: -300, rx: -300, ry: -300 });
  const rafId   = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px,${e.clientY - 3}px,0)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      const p = pos.current;
      p.rx += (p.mx - p.rx) * 0.12;
      p.ry += (p.my - p.ry) * 0.12;
      if (ringRef.current) {
        const half = isView ? 43 : 17;
        ringRef.current.style.transform = `translate3d(${p.rx - half}px,${p.ry - half}px,0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [isView]);

  return (
    <>
      <div ref={dotRef} style={{
        position:"fixed",top:0,left:0,width:6,height:6,borderRadius:"50%",
        background:"#c8a96e",pointerEvents:"none",zIndex:9999,willChange:"transform",
      }}/>
      <div ref={ringRef} style={{
        position:"fixed",top:0,left:0,borderRadius:"50%",pointerEvents:"none",
        zIndex:9998,display:"flex",alignItems:"center",justifyContent:"center",
        willChange:"transform",
        width:  isView ? 86 : 34,
        height: isView ? 86 : 34,
        background: isView ? "rgba(8,6,4,0.88)" : "transparent",
        border:     isView ? "none" : "1.5px solid rgba(30,24,18,0.28)",
        transition: "width .38s cubic-bezier(.22,1,.36,1),height .38s cubic-bezier(.22,1,.36,1),background .38s,border .38s",
      }}>
        {isView && (
          <span style={{color:"#fff",fontSize:9.5,fontWeight:500,letterSpacing:"2.8px",
            textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>View</span>
        )}
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY CARD
// ─────────────────────────────────────────────────────────────────────────────
interface CardProps {
  item: GalleryItem; w: number; h: number; rounded: boolean;
  onOpen: (idx: number) => void; onHover: (v: boolean) => void;
}
const GalleryCard = ({ item, w, h, rounded, onOpen, onHover }: CardProps) => {
  const [hov, setHov] = useState(false);
  const set = (v: boolean) => { setHov(v); onHover(v); };

  return (
    <div
      onClick={() => onOpen(item.id - 1)}
      onMouseEnter={() => set(true)}
      onMouseLeave={() => set(false)}
      style={{
        position:"relative", width:w, height:h,
        borderRadius: rounded ? 16 : 6,
        overflow:"hidden", cursor:"none", flexShrink:0,
        willChange:"transform",
        transform:  hov ? "translateY(-8px)" : "translateY(0)",
        boxShadow:  hov ? "0 30px 72px rgba(0,0,0,0.20)" : "0 4px 20px rgba(0,0,0,0.08)",
        transition: "transform .38s cubic-bezier(.22,1,.36,1),box-shadow .38s ease",
      }}
    >
      <img src={item.src} alt={item.label} loading="lazy" style={{
        position:"absolute",inset:0,width:"100%",height:"100%",
        objectFit:"cover",display:"block",willChange:"transform",
        transform:  hov ? "scale(1.0)" : "scale(1.07)",
        transition: "transform 1.1s cubic-bezier(.22,1,.36,1)",
      }}/>
      <div style={{
        position:"absolute",inset:0,zIndex:1,
        background:"linear-gradient(180deg,transparent 30%,rgba(0,0,0,0.52) 100%)",
        opacity: hov ? 1 : 0, transition:"opacity .40s ease",
      }}/>
      <div style={{
        position:"absolute",bottom:0,left:0,right:0,height:3,zIndex:3,
        background:"linear-gradient(90deg,#c8a96e,#e8d5a8,#c8a96e)",
        transformOrigin:"left center",
        transform:  hov ? "scaleX(1)" : "scaleX(0)",
        transition: "transform .65s cubic-bezier(.22,1,.36,1)",
      }}/>
      <div style={{
        position:"absolute",bottom:20,left:20,zIndex:2,
        opacity:   hov ? 1 : 0,
        transform: hov ? "translateY(0)" : "translateY(12px)",
        transition:"opacity .36s ease .04s,transform .36s ease .04s",
      }}>
        <div style={{width:18,height:1.5,background:"#c8a96e",marginBottom:7}}/>
        <span style={{color:"#fff",fontSize:9,fontWeight:500,letterSpacing:"3px",
          textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>{item.label}</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────────────────────────────────
const Lightbox = ({ index, onClose, onPrev, onNext }:
  { index: number|null; onClose:()=>void; onPrev:()=>void; onNext:()=>void }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const slide = useCallback((dir: 1|-1) => {
    const img = imgRef.current; if (!img) return;
    img.style.transition = "opacity .12s ease,transform .12s ease";
    img.style.opacity = "0";
    img.style.transform = `scale(.97) translateX(${dir * -40}px)`;
    setTimeout(() => {
      if (dir === 1) {
        onNext();
      } else {
        onPrev();
      }
      requestAnimationFrame(() => {
        if (!imgRef.current) return;
        imgRef.current.style.transition =
          "opacity .46s cubic-bezier(.22,1,.36,1),transform .52s cubic-bezier(.22,1,.36,1)";
        imgRef.current.style.opacity = "1";
        imgRef.current.style.transform = "scale(1) translateX(0)";
      });
    }, 125);
  }, [onNext, onPrev]);

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
  const item    = galleryItems[index];
  const counter = `${String(index+1).padStart(2,"0")} / ${String(galleryItems.length).padStart(2,"0")}`;
  const navBtn: React.CSSProperties = {
    position:"absolute",top:"50%",transform:"translateY(-50%)",
    width:50,height:50,borderRadius:"50%",
    background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.13)",
    backdropFilter:"blur(10px)",color:"#fff",cursor:"pointer",
    display:"flex",alignItems:"center",justifyContent:"center",zIndex:10,outline:"none",
  };

  return (
    <AnimatePresence>
      <motion.div key="lb"
        initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        transition={{duration:0.32}}
        style={{
          position:"fixed",inset:0,zIndex:2000,background:"rgba(3,2,1,.97)",
          display:"flex",alignItems:"center",justifyContent:"center",padding:24,cursor:"default",
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.button initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}}
          onClick={onClose}
          style={{
            position:"fixed",top:24,right:28,width:42,height:42,borderRadius:"50%",
            background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",
            backdropFilter:"blur(10px)",color:"#fff",cursor:"pointer",zIndex:2001,
            display:"flex",alignItems:"center",justifyContent:"center",outline:"none",
          }}>
          <X size={16}/>
        </motion.button>
        <motion.div
          initial={{opacity:0,scale:0.88,y:26}} animate={{opacity:1,scale:1,y:0}}
          exit={{opacity:0,scale:0.94}} transition={{duration:0.5,ease:[0.22,1,0.36,1]}}
          style={{position:"relative",maxWidth:"88vw",maxHeight:"88vh"}}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => slide(-1)} style={{...navBtn,left:-64}}><ChevronLeft size={20}/></button>
          <img ref={imgRef} src={item.src} alt={item.label} style={{
            maxWidth:"88vw",maxHeight:"88vh",borderRadius:8,objectFit:"contain",display:"block",
            boxShadow:"0 60px 140px rgba(0,0,0,.8)",
          }}/>
          <button onClick={() => slide(1)} style={{...navBtn,right:-64}}><ChevronRight size={20}/></button>
          <div style={{
            position:"absolute",bottom:-42,left:0,right:0,
            display:"flex",justifyContent:"space-between",alignItems:"center",
          }}>
            <span style={{color:"rgba(255,255,255,.34)",fontSize:9,letterSpacing:"3px",
              textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>{item.label}</span>
            <span style={{color:"rgba(255,255,255,.22)",fontSize:12,
              fontFamily:"Georgia,serif",fontStyle:"italic",letterSpacing:3}}>{counter}</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────────────────
const GallerySection = () => {
  const [lbIndex,    setLbIndex]    = useState<number|null>(null);
  const [cursorView, setCursorView] = useState(false);
  // Track if the section has entered the viewport at least once.
  // Rows are hidden (opacity:0, x:0) until this fires, preventing the
  // "jump from edge" glitch when navigating from another section.
  const [activated, setActivated]   = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  // Fire once when section first becomes visible
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -100px 0px" });
  useEffect(() => {
    if (isInView) setActivated(true);
  }, [isInView]);

  const openLb  = useCallback((i: number) => setLbIndex(i), []);
  const closeLb = useCallback(() => setLbIndex(null), []);
  const prevLb  = useCallback(
    () => setLbIndex(p => p !== null ? (p - 1 + galleryItems.length) % galleryItems.length : null), []
  );
  const nextLb  = useCallback(
    () => setLbIndex(p => p !== null ? (p + 1) % galleryItems.length : null), []
  );
  const onHover = useCallback((v: boolean) => setCursorView(v), []);

  // ── Scroll driver ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Watermark
  const wmOpacity = useTransform(scrollYProgress, [0, 0.22], [0, 1]);
  const wmY       = useTransform(scrollYProgress, [0, 0.22], [56, 0]);
  const wmScale   = useTransform(scrollYProgress, [0, 0.22], [0.92, 1]);

  // Row translations — only active after section is in view
  // Clamp keeps them at 0 before activation so no jump occurs on mount
  const row1Raw = useTransform(
    scrollYProgress,
    [0.06, 0.58],
    activated ? [-320, 0] : [0, 0]   // ← stays at 0 until activated
  );
  const row2Raw = useTransform(
    scrollYProgress,
    [0.20, 0.72],
    activated ? [320, 0] : [0, 0]    // ← stays at 0 until activated
  );

  // Springs — the motion smoothing layer
  // These values give a natural, weighty feel without any bounce
  const sc = { stiffness: 50, damping: 18, mass: 0.7, restDelta: 0.001 } as const;
  const row1X = useSpring(row1Raw, sc);
  const row2X = useSpring(row2Raw, sc);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        @media (pointer: fine) {
          .gs-section, .gs-section * { cursor: none !important; }
        }
        @media (pointer: coarse) { .gs-cursor-layer { display:none !important; } }

        .gs-row {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          gap: 16px;
          padding: 0 clamp(20px, 4vw, 52px);
          flex-wrap: nowrap;
        }

        @media (max-width: 1024px) {
          .gs-row { flex-wrap: wrap !important; gap: 14px; }
          .gs-co {
            width: calc(50% - 7px) !important; min-width: 0 !important;
            height: 260px !important; flex: 0 0 calc(50% - 7px) !important;
          }
          .gs-co > div { width: 100% !important; height: 100% !important; }
        }
        @media (max-width: 640px) {
          .gs-row { gap: 12px; }
          .gs-co {
            width: 100% !important; min-width: 0 !important;
            height: 230px !important; flex: none !important;
          }
          .gs-co > div { width: 100% !important; height: 100% !important; }
          .gs-wm { font-size: 18vw !important; letter-spacing: -3px !important; }
        }
      `}</style>

      {/* Cursor */}
      <div className="gs-cursor-layer"
        style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9990}}>
        <GalleryCursor isView={cursorView}/>
      </div>

      <section
        id="gallery"
        ref={sectionRef}
        className="gs-section"
        style={{
          position:"relative",
          background:"#f5f4f2",
          paddingTop:0,
          paddingBottom:"clamp(72px,9vh,110px)",
          minHeight:"160vh",
          overflowX:"hidden",
          overflowY:"visible",
        }}
      >
        {/* Watermark */}
        <motion.div
          className="gs-wm"
          style={{
            position:"absolute",
            top:"clamp(-20px,-1vw,0px)",
            left:"50%",
            x:"-50%",
            opacity: wmOpacity,
            y: wmY,
            scale: wmScale,
            fontSize:"clamp(96px,17vw,250px)",
            fontFamily:"'Georgia','Times New Roman',serif",
            fontWeight:700,
            fontStyle:"italic",
            lineHeight:1,
            whiteSpace:"nowrap",
            letterSpacing:"-5px",
            color:"rgba(188,183,172,0.40)",
            pointerEvents:"none",
            userSelect:"none",
            zIndex:0,
            willChange:"transform,opacity",
          }}
        >
          gallery
        </motion.div>

        {/* Rows */}
        <div style={{
          position:"relative", zIndex:1,
          paddingTop:"clamp(80px,12vw,155px)",
          display:"flex", flexDirection:"column", gap:"18px",
        }}>

          {/* ── ROW 1: slides in from LEFT ── */}
          <motion.div
            className="gs-row"
            style={{
              x: row1X,
              // Hidden until section activates — prevents flash/jump
              opacity: activated ? 1 : 0,
              willChange: "transform, opacity",
            }}
          >
            {row1Config.map(({ item, w, h, rounded }) => (
              <div key={item.id} className="gs-co"
                style={{width:w,minWidth:w,height:h,flexShrink:0}}>
                <GalleryCard item={item} w={w} h={h} rounded={rounded}
                  onOpen={openLb} onHover={onHover}/>
              </div>
            ))}
          </motion.div>

          {/* ── ROW 2: slides in from RIGHT ── */}
          <motion.div
            className="gs-row"
            style={{
              x: row2X,
              opacity: activated ? 1 : 0,
              willChange: "transform, opacity",
            }}
          >
            {row2Config.map(({ item, w, h, rounded }) => (
              <div key={item.id} className="gs-co"
                style={{width:w,minWidth:w,height:h,flexShrink:0}}>
                <GalleryCard item={item} w={w} h={h} rounded={rounded}
                  onOpen={openLb} onHover={onHover}/>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      <Lightbox index={lbIndex} onClose={closeLb} onPrev={prevLb} onNext={nextLb}/>
    </>
  );
};

export default GallerySection;