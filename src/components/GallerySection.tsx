import { useEffect, useRef, useState, useCallback } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────
const galleryItems = [
  { id: 1,  src: "/Photos/Sago Food Photos/JULY/1.JPG",   label: "Dish I"    },
  { id: 2,  src: "/Photos/Image 2.JPG",                   label: "Dish II"   },
  { id: 3,  src: "/Photos/Image 1.png",                   label: "Dish III"  },
  { id: 4,  src: "/Photos/Sago Food Photos/JULY/2.JPG",   label: "Dish IV"   },
  { id: 5,  src: "/Photos/Sago Food Photos/JULY/3.JPG",   label: "Dish V"    },
  { id: 6,  src: "/Photos/Sago Food Photos/JULY/4.JPG",   label: "Dish VI"   },
  { id: 7,  src: "/Photos/Sago Food Photos/AUG/5.JPG",    label: "Dish VII"  },
  { id: 8,  src: "/Photos/Sago Food Photos/AUG/6.JPG",    label: "Dish VIII" },
  { id: 9,  src: "/Photos/Sago Food Photos/AUG/7.JPG",    label: "Dish IX"   },
  { id: 10, src: "/Photos/Sago Food Photos/AUG/8.JPG",    label: "Dish X"    },
  { id: 11, src: "/Photos/Sago Food Photos/C9R_7157.JPG", label: "Dish XI"   },
];

// All sharp — borderRadius: 0 everywhere
const row1 = [
  { item: galleryItems[0],  w: 200, h: 380 },
  { item: galleryItems[1],  w: 280, h: 330 },
  { item: galleryItems[2],  w: 440, h: 390 },
  { item: galleryItems[3],  w: 250, h: 340 },
  { item: galleryItems[4],  w: 410, h: 385 },
  { item: galleryItems[5],  w: 260, h: 340 },
  { item: galleryItems[6],  w: 350, h: 375 },
];
const row2 = [
  { item: galleryItems[7],  w: 290, h: 360 },
  { item: galleryItems[8],  w: 570, h: 375 },
  { item: galleryItems[9],  w: 310, h: 355 },
  { item: galleryItems[10], w: 520, h: 370 },
];

// ── Scroll progress for a ref ─────────────────────────────────────────────────
function useScrollProgress(ref) {
  const prog = useRef(0);
  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      prog.current = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [ref]);
  return prog;
}

// ── Custom Cursor ─────────────────────────────────────────────────────────────
function Cursor({ hovering }) {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const s = useRef({ mx: -999, my: -999, rx: -999, ry: -999 });

  useEffect(() => {
    const onMove = (e) => {
      s.current.mx = e.clientX;
      s.current.my = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${e.clientX-3}px,${e.clientY-3}px,0)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    let raf;
    const tick = () => {
      const c = s.current;
      c.rx += (c.mx - c.rx) * 0.1;
      c.ry += (c.my - c.ry) * 0.1;
      if (ringRef.current) {
        const r = hovering ? 44 : 18;
        ringRef.current.style.transform = `translate3d(${c.rx-r}px,${c.ry-r}px,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [hovering]);

  return (
    <>
      <div ref={dotRef} style={{
        position:"fixed",top:0,left:0,width:6,height:6,
        background:"#c9a96e",pointerEvents:"none",zIndex:9999,
        willChange:"transform",mixBlendMode:"difference",
      }}/>
      <div ref={ringRef} style={{
        position:"fixed",top:0,left:0,pointerEvents:"none",zIndex:9998,
        display:"flex",alignItems:"center",justifyContent:"center",
        width: hovering?88:36, height: hovering?88:36,
        background: hovering?"rgba(6,5,4,0.92)":"transparent",
        border:`1px solid rgba(201,169,110,${hovering?0.4:0.38})`,
        willChange:"transform",
        transition:"width .42s cubic-bezier(.22,1,.36,1),height .42s cubic-bezier(.22,1,.36,1),background .35s",
      }}>
        {hovering && (
          <span style={{color:"#c9a96e",fontSize:8.5,fontWeight:500,letterSpacing:"3.5px",
            textTransform:"uppercase",fontFamily:"'Cormorant Garamond',Georgia,serif"}}>View</span>
        )}
      </div>
    </>
  );
}

// ── Gallery Card ──────────────────────────────────────────────────────────────
function GalleryCard({ item, w, h, onOpen, onHover, scrollProg, parallaxFactor }) {
  const [hov, setHov] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const cardRef = useRef(null);

  // Per-card vertical parallax (staggered depth)
  useEffect(() => {
    if (!cardRef.current) return;
    let raf;
    const tick = () => {
      const shift = (scrollProg.current - 0.3) * parallaxFactor * 55;
      if (cardRef.current)
        cardRef.current.style.setProperty("--pshift", `${shift}px`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollProg, parallaxFactor]);

  const enter = useCallback(() => { setHov(true);  onHover(true);  }, [onHover]);
  const leave = useCallback(() => { setHov(false); onHover(false); }, [onHover]);

  return (
    <div
      ref={cardRef}
      onClick={() => onOpen(item.id - 1)}
      onMouseEnter={enter}
      onMouseLeave={leave}
      style={{
        position:"relative", width:w, height:h,
        borderRadius:0,
        overflow:"hidden",
        cursor:"none", flexShrink:0,
        willChange:"transform",
        transform: hov
          ? "translateY(calc(var(--pshift,0px) - 12px)) scaleX(0.984)"
          : "translateY(var(--pshift,0px)) scaleX(1)",
        boxShadow: hov
          ? "0 52px 100px rgba(0,0,0,0.34), inset 0 0 0 1px rgba(201,169,110,0.28)"
          : "0 8px 32px rgba(0,0,0,0.13)",
        transition:"transform .6s cubic-bezier(.22,1,.36,1),box-shadow .6s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {/* Shimmer skeleton */}
      {!loaded && (
        <div style={{
          position:"absolute",inset:0,
          background:"linear-gradient(110deg,#1c1a14 0%,#2e2a20 45%,#1c1a14 80%)",
          backgroundSize:"200% 100%",
          animation:"skeleton 1.8s ease infinite",
        }}/>
      )}

      {/* Image (overflows for inner parallax headroom) */}
      <img
        src={item.src} alt={item.label}
        loading="lazy" decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          position:"absolute", inset:"-8% 0",
          width:"100%", height:"116%",
          objectFit:"cover", display:"block",
          willChange:"transform",
          opacity: loaded ? 1 : 0,
          transform: hov ? "scale(1.05)" : "scale(1.01)",
          transition:"transform 1.3s cubic-bezier(.22,1,.36,1),opacity .6s ease",
        }}
      />

      {/* Vignette */}
      <div style={{
        position:"absolute",inset:0,zIndex:1,
        background:"linear-gradient(180deg,rgba(0,0,0,0.04) 0%,rgba(0,0,0,0) 35%,rgba(0,0,0,0.58) 100%)",
        opacity: hov ? 1 : 0.5,
        transition:"opacity .5s ease",
      }}/>

      {/* Top-right corner bracket */}
      <div style={{
        position:"absolute",top:0,right:0,zIndex:3,
        width:0,height:0,
        borderStyle:"solid",
        borderWidth:`0 ${hov?38:0}px ${hov?38:0}px 0`,
        borderColor:`transparent rgba(201,169,110,0.55) transparent transparent`,
        transition:"border-width .45s cubic-bezier(.22,1,.36,1)",
      }}/>

      {/* Gold bottom bar */}
      <div style={{
        position:"absolute",bottom:0,left:0,right:0,height:2,zIndex:4,
        background:"linear-gradient(90deg,transparent,#c9a96e 22%,#eddcaa 50%,#c9a96e 78%,transparent)",
        transformOrigin:"left",
        transform: hov ? "scaleX(1)" : "scaleX(0)",
        transition:"transform .75s cubic-bezier(.22,1,.36,1)",
      }}/>

      {/* Left vertical bar */}
      <div style={{
        position:"absolute",top:0,left:0,bottom:0,width:2,zIndex:4,
        background:"linear-gradient(180deg,transparent,#c9a96e 25%,#c9a96e 75%,transparent)",
        transformOrigin:"top",
        transform: hov ? "scaleY(1)" : "scaleY(0)",
        transition:"transform .75s cubic-bezier(.22,1,.36,1) .07s",
      }}/>

      {/* Index */}
      <div style={{
        position:"absolute",top:15,left:16,zIndex:5,
        color:"#c9a96e",fontSize:9,letterSpacing:"2.5px",
        fontFamily:"'Cormorant Garamond',Georgia,serif",
        opacity: hov ? 0.6 : 0,
        transform: hov ? "translateY(0)" : "translateY(-10px)",
        transition:"opacity .35s ease .08s,transform .45s cubic-bezier(.22,1,.36,1) .08s",
      }}>{String(item.id).padStart(2,"0")}</div>

      {/* Label */}
      <div style={{
        position:"absolute",bottom:20,left:18,zIndex:5,
        opacity: hov ? 1 : 0,
        transform: hov ? "translateY(0)" : "translateY(16px)",
        transition:"opacity .38s ease .05s,transform .5s cubic-bezier(.22,1,.36,1) .05s",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
          <div style={{width:16,height:1,background:"#c9a96e"}}/>
          <span style={{
            color:"rgba(255,255,255,0.9)",fontSize:8,fontWeight:500,
            letterSpacing:"4px",textTransform:"uppercase",
            fontFamily:"'Cormorant Garamond',Georgia,serif",
          }}>{item.label}</span>
        </div>
      </div>
    </div>
  );
}

// ── Animated number counter ───────────────────────────────────────────────────
function AnimCounter({ to, suffix, scrollProg, triggerAt }) {
  const elRef = useRef(null);
  useEffect(() => {
    let raf, started = false, startTs = null;
    const tick = (ts) => {
      if (scrollProg.current >= triggerAt && !started) { started = true; startTs = ts; }
      if (started && startTs !== null) {
        const t = Math.min(1, (ts - startTs) / 1500);
        const ease = 1 - Math.pow(1 - t, 3);
        if (elRef.current) elRef.current.textContent = Math.round(ease * to) + suffix;
        if (t >= 1) return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, suffix, scrollProg, triggerAt]);
  return <span ref={elRef}>0{suffix}</span>;
}

// ── Horizontal scroll row ─────────────────────────────────────────────────────
function useScrollRow(sectionRef, fromX, scrollProg) {
  const elRef = useRef(null);
  const attach = useCallback((el) => { elRef.current = el; }, []);
  useEffect(() => {
    let raf, current = fromX;
    const tick = () => {
      const target = fromX * (1 - Math.min(1, scrollProg.current * 2.3));
      current += (target - current) * 0.07;
      if (Math.abs(target - current) < 0.04) current = target;
      if (elRef.current) elRef.current.style.transform = `translateX(${current}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fromX, scrollProg]);
  return attach;
}

// ── Vertical parallax for section-level elements ──────────────────────────────
function useParallaxY(scrollProg, multiplier) {
  const elRef = useRef(null);
  const attach = useCallback((el) => { elRef.current = el; }, []);
  useEffect(() => {
    let raf;
    const tick = () => {
      const y = (scrollProg.current - 0.08) * multiplier * -75;
      if (elRef.current) elRef.current.style.transform = `translateY(${y}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [multiplier, scrollProg]);
  return attach;
}

// ── Scroll-triggered reveal (RAF, no layout thrash) ───────────────────────────
function useReveal(scrollProg, triggerAt, fromY) {
  const elRef = useRef(null);
  const attach = useCallback((el) => { elRef.current = el; }, []);
  useEffect(() => {
    let raf, done = false;
    const tick = () => {
      if (done) { cancelAnimationFrame(raf); return; }
      const p = scrollProg.current;
      if (p >= triggerAt) {
        const t = Math.min(1, (p - triggerAt) / 0.1);
        const ease = 1 - Math.pow(1 - t, 3);
        if (elRef.current) {
          elRef.current.style.opacity = ease;
          elRef.current.style.transform = `translateY(${fromY * (1 - ease)}px)`;
        }
        if (t >= 1) done = true;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollProg, triggerAt, fromY]);
  return attach;
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ index, onClose, onPrev, onNext }) {
  const [vis, setVis] = useState(false);
  const [imgKey, setImgKey] = useState(0);

  useEffect(() => {
    if (index !== null) requestAnimationFrame(() => setVis(true));
    else setVis(false);
  }, [index]);

  const handleClose = useCallback(() => {
    setVis(false);
    setTimeout(onClose, 380);
  }, [onClose]);

  useEffect(() => {
    if (index === null) return;
    const h = (e) => {
      if (e.key === "Escape")     handleClose();
      if (e.key === "ArrowRight") { setImgKey(k=>k+1); onNext(); }
      if (e.key === "ArrowLeft")  { setImgKey(k=>k+1); onPrev(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [index, handleClose, onNext, onPrev]);

  useEffect(() => {
    document.body.style.overflow = index !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [index]);

  if (index === null) return null;
  const item = galleryItems[index];
  const counter = `${String(index+1).padStart(2,"0")} / ${String(galleryItems.length).padStart(2,"0")}`;

  const NavBtn = ({ side, onClick, children }) => (
    <button onClick={onClick} style={{
      position:"absolute", top:"50%", [side]:-68, transform:"translateY(-50%)",
      width:48, height:48, borderRadius:0,
      background:"rgba(255,255,255,0.04)", border:"1px solid rgba(201,169,110,0.22)",
      color:"rgba(255,255,255,0.6)", cursor:"pointer",
      display:"flex", alignItems:"center", justifyContent:"center", outline:"none",
      transition:"background .2s,border-color .2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.background="rgba(201,169,110,0.1)"; e.currentTarget.style.borderColor="rgba(201,169,110,0.5)"; }}
      onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor="rgba(201,169,110,0.22)"; }}
    >{children}</button>
  );

  return (
    <div onClick={(e)=>e.target===e.currentTarget&&handleClose()} style={{
      position:"fixed",inset:0,zIndex:3000,
      background:`rgba(3,2,1,${vis?0.97:0})`,
      display:"flex",alignItems:"center",justifyContent:"center",
      backdropFilter: vis?"blur(14px)":"none",
      transition:"background .4s ease,backdrop-filter .4s ease",
      padding:24,
    }}>
      <button onClick={handleClose} style={{
        position:"fixed",top:24,right:28,width:44,height:44,borderRadius:0,
        background:"rgba(255,255,255,0.05)",border:"1px solid rgba(201,169,110,0.22)",
        color:"rgba(255,255,255,0.65)",cursor:"pointer",zIndex:3001,
        display:"flex",alignItems:"center",justifyContent:"center",outline:"none",
        opacity: vis?1:0, transform: vis?"scale(1)":"scale(0.85)",
        transition:"opacity .3s,transform .3s,background .2s",
      }}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(201,169,110,0.1)"}
        onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      <div style={{
        position:"relative",maxWidth:"88vw",maxHeight:"88vh",
        opacity: vis?1:0,
        transform: vis?"scale(1) translateY(0)":"scale(0.92) translateY(28px)",
        transition:"opacity .5s ease,transform .55s cubic-bezier(.22,1,.36,1)",
      }}>
        <NavBtn side="left" onClick={()=>{setImgKey(k=>k+1);onPrev();}}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </NavBtn>

        <img key={imgKey} src={item.src} alt={item.label} style={{
          maxWidth:"88vw",maxHeight:"88vh",borderRadius:0,
          objectFit:"contain",display:"block",
          boxShadow:"0 80px 160px rgba(0,0,0,0.9)",
          animation:"lbIn .48s cubic-bezier(.22,1,.36,1)",
        }}/>

        <NavBtn side="right" onClick={()=>{setImgKey(k=>k+1);onNext();}}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </NavBtn>

        {/* Sharp corner brackets */}
        {[["top:0,left:0","borderTop,borderLeft"],["top:0,right:0","borderTop,borderRight"],
          ["bottom:0,left:0","borderBottom,borderLeft"],["bottom:0,right:0","borderBottom,borderRight"]].map(([pos,borders],i) => {
          const p = Object.fromEntries(pos.split(",").map(s=>s.split(":")));
          const b = borders.split(",");
          return <div key={i} style={{
            position:"absolute",...p,width:20,height:20,
            [b[0]]:"1px solid #c9a96e",[b[1]]:"1px solid #c9a96e",
          }}/>;
        })}

        <div style={{
          position:"absolute",bottom:-46,left:0,right:0,
          display:"flex",justifyContent:"space-between",alignItems:"center",
        }}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:16,height:1,background:"#c9a96e"}}/>
            <span style={{color:"rgba(255,255,255,0.36)",fontSize:8.5,
              letterSpacing:"3.5px",textTransform:"uppercase",
              fontFamily:"'Cormorant Garamond',Georgia,serif"}}>{item.label}</span>
          </div>
          <span style={{color:"rgba(255,255,255,0.22)",fontSize:11,
            fontFamily:"'Cormorant Garamond',Georgia,serif",
            fontStyle:"italic",letterSpacing:2}}>{counter}</span>
        </div>
      </div>

      {/* Progress bar dots */}
      <div style={{
        position:"fixed",bottom:28,left:"50%",transform:"translateX(-50%)",
        display:"flex",gap:5,
        opacity:vis?1:0,transition:"opacity .5s ease .2s",
      }}>
        {galleryItems.map((_,i)=>(
          <div key={i} style={{
            width:i===index?22:5,height:2,
            background:i===index?"#c9a96e":"rgba(255,255,255,0.2)",
            transition:"width .4s cubic-bezier(.22,1,.36,1),background .25s",
          }}/>
        ))}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function GallerySection() {
  const [lbIndex,   setLbIndex]   = useState(null);
  const [hovering,  setHovering]  = useState(false);
  const [activated, setActivated] = useState(false);
  const sectionRef = useRef(null);

  const scrollProg = useScrollProgress(sectionRef);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActivated(true); obs.disconnect(); } },
      { threshold: 0.03 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Scroll-driven animations
  const attachRow1  = useScrollRow(sectionRef, -370, scrollProg);
  const attachRow2  = useScrollRow(sectionRef,  370, scrollProg);
  const attachWM    = useParallaxY(scrollProg, 0.65);
  const attachTitle = useParallaxY(scrollProg, 0.3);

  // Staggered header reveals
  const revealTag   = useReveal(scrollProg, 0.04, 24);
  const revealH2    = useReveal(scrollProg, 0.07, 38);
  const revealRule  = useReveal(scrollProg, 0.11, 0);
  const revealStats = useReveal(scrollProg, 0.14, 28);

  const openLb  = useCallback((i)  => setLbIndex(i), []);
  const closeLb = useCallback(()   => setLbIndex(null), []);
  const prevLb  = useCallback(()   => setLbIndex(p=>p!==null?(p-1+galleryItems.length)%galleryItems.length:null), []);
  const nextLb  = useCallback(()   => setLbIndex(p=>p!==null?(p+1)%galleryItems.length:null), []);
  const onHover = useCallback((v)  => setHovering(v), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

        @keyframes skeleton {
          0%   { background-position:  200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes lbIn {
          from { opacity:0; transform:scale(0.95) translateY(12px); }
          to   { opacity:1; transform:scale(1)    translateY(0); }
        }

        .gs-wrap { cursor:none !important; }
        .gs-wrap * { cursor:none !important; }
        @media (pointer: coarse) {
          .gs-wrap   { cursor:auto !important; }
          .gs-wrap * { cursor:auto !important; }
          .gs-cursor { display:none !important; }
        }

        .gs-row {
          display:flex; flex-direction:row; align-items:flex-end;
          gap:12px; padding:0 clamp(12px,3vw,44px);
          flex-wrap:nowrap; will-change:transform;
        }

        @media (max-width: 1024px) {
          .gs-row { flex-wrap:wrap !important; gap:10px; }
          .gs-card {
            width:calc(50% - 5px) !important; min-width:0 !important;
            height:250px !important; flex:0 0 calc(50% - 5px) !important;
          }
          .gs-card > div { width:100% !important; height:100% !important; }
        }
        @media (max-width: 640px) {
          .gs-row { gap:8px; }
          .gs-card { width:100% !important; min-width:0 !important; height:215px !important; flex:none !important; }
        }
      `}</style>

      <div className="gs-cursor" style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9990}}>
        <Cursor hovering={hovering}/>
      </div>

      <section id="gallery" ref={sectionRef} className="gs-wrap" style={{
        position:"relative", background:"#f0eeea",
        paddingBottom:"clamp(60px,9vh,110px)",
        minHeight:"160vh", overflowX:"hidden", overflowY:"visible",
      }}>

        {/* ── Watermark — floats at different parallax speed ── */}
        <div ref={attachWM} style={{
          position:"absolute",top:0,left:"50%",marginLeft:"-50%",width:"100%",textAlign:"center",
          fontSize:"clamp(70px,14vw,200px)",
          fontFamily:"'Cormorant Garamond',Georgia,serif",
          fontWeight:300,fontStyle:"italic",lineHeight:1,letterSpacing:"-4px",
          color:"rgba(168,160,146,0.20)",pointerEvents:"none",userSelect:"none",zIndex:0,
          opacity: activated?1:0, willChange:"transform",
          transition:"opacity 1.2s ease .4s",
        }}>Gallery</div>

        {/* ── Header block — parallax scroll ── */}
        <div ref={attachTitle} style={{
          position:"relative",zIndex:2,willChange:"transform",
          paddingTop:"clamp(80px,11vw,140px)",
          paddingLeft:"clamp(16px,4.5vw,56px)",
          marginBottom:"clamp(36px,5vw,60px)",
        }}>
        
         
          {/* Horizontal rule */}
          <div ref={revealRule} style={{
            width:"clamp(160px,20vw,260px)",height:1,
            background:"linear-gradient(90deg,#c9a96e,rgba(201,169,110,0))",
            opacity:0,
          }}/>

          {/* Stats */}
          <div ref={revealStats} style={{
            display:"flex",gap:"clamp(22px,4vw,46px)",marginTop:22,opacity:0,
          }}>
            
          </div>
        </div>

        {/* ── Rows ── */}
        <div style={{
          position:"relative",zIndex:1,
          display:"flex",flexDirection:"column",gap:13,
          opacity: activated?1:0,transition:"opacity .7s ease .15s",
        }}>

          {/* Row 1 — LEFT slide + per-card vertical parallax */}
          <div ref={attachRow1} className="gs-row">
            {row1.map(({item,w,h},i) => (
              <div key={item.id} className="gs-card" style={{width:w,minWidth:w,height:h,flexShrink:0}}>
                <GalleryCard item={item} w={w} h={h}
                  onOpen={openLb} onHover={onHover}
                  scrollProg={scrollProg}
                  parallaxFactor={(i%2===0?1:-1)*(0.55+i*0.13)}
                />
              </div>
            ))}
          </div>

          {/* Row 2 — RIGHT slide */}
          <div ref={attachRow2} className="gs-row">
            {row2.map(({item,w,h},i) => (
              <div key={item.id} className="gs-card" style={{width:w,minWidth:w,height:h,flexShrink:0}}>
                <GalleryCard item={item} w={w} h={h}
                  onOpen={openLb} onHover={onHover}
                  scrollProg={scrollProg}
                  parallaxFactor={(i%2===0?-1:1)*(0.5+i*0.16)}
                />
              </div>
            ))}
          </div>

        </div>

        {/* ── Footer rule ── */}
        <div style={{
          position:"relative",zIndex:2,
          margin:"clamp(44px,6vw,70px) clamp(16px,4.5vw,56px) 0",
          display:"flex",alignItems:"center",gap:16,
          opacity: activated?1:0,transition:"opacity 1s ease .65s",
        }}>
          <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(201,169,110,0.55),rgba(201,169,110,0))"}}/>
          <span style={{fontSize:7.5,letterSpacing:"4.5px",textTransform:"uppercase",
            color:"rgba(95,85,70,0.45)",whiteSpace:"nowrap",
            fontFamily:"'Cormorant Garamond',Georgia,serif"}}>End of gallery</span>
          <div style={{flex:1,height:1,background:"linear-gradient(270deg,rgba(201,169,110,0.55),rgba(201,169,110,0))"}}/>
        </div>

      </section>

      <Lightbox index={lbIndex} onClose={closeLb} onPrev={prevLb} onNext={nextLb}/>
    </>
  );
}