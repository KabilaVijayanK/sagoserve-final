import { ArrowUpRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback, } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Users, TrendingUp, Award, Sparkles } from "lucide-react";
/* ─────────────────────────────────────
   PRODUCTS DATA
   Replace image paths with your real ones
───────────────────────────────────── */
const products = [
  {
    title: "Chemical Free Sago",
    category: "PREMIUM",
    subcategory: "NATURAL",
    location: "Salem, India",
    year: "2024",
    image: "prd1.jpeg",
    tall: false,
  },
  {
    title: "Chemical Free Nylon",
    category: "PREMIUM",
    subcategory: null,
    location: "Salem, India",
    year: "2024",
    image: "prd2.jpg",
    tall: true,   // ← middle card is taller like image
  },
  {
    title: "Tapioca Sago",
    category: "STANDARD",
    subcategory: null,
    location: "Salem, India",
    year: "2024",
    image: "prd3.jpg",
    tall: false,
  },
  {
    title: "Tapioca Nylon",
    category: "STANDARD",
    subcategory: null,
    location: "Salem, India",
    year: "2024",
    image: "prd2.jpg",
    tall: true,
  },
  {
    title: "Tapioca Mothithana",
    category: "EXPORT",
    subcategory: null,
    location: "Salem, India",
    year: "2024",
    image: "prd1.jpeg",
    tall: false,
  },
  {
    title: "Tapioca Pearl",
    category: "EXPORT",
    subcategory: null,
    location: "Salem, India",
    year: "2024",
    image: "prd3.jpg",
    tall: true,
  },
  {
    title: "Tapioca Dryer Starch",
    category: "INDUSTRIAL",
    subcategory: null,
    location: "Salem, India",
    year: "2024",
    image: "prd2.jpg",
    tall: false,
  },
  {
    title: "Tapioca Native Starch",
    category: "INDUSTRIAL",
    subcategory: null,
    location: "Salem, India",
    year: "2024",
    image: "prd1.jpeg",
    tall: true,
  },
  {
    title: "Tapioca Grinded Starch",
    category: "INDUSTRIAL",
    subcategory: null,
    location: "Salem, India",
    year: "2024",
    image: "prd3.jpg",
    tall: false,
  },
  {
    title: "Tapioca Broken",
    category: "STANDARD",
    subcategory: null,
    location: "Salem, India",
    year: "2024",
    image: "prd2.jpg",
    tall: true,
  },
];

/* ─────────────────────────────────────
   SINGLE CARD
───────────────────────────────────── */
const ProductCard = ({
  product,
  index,
}: {
  product: typeof products[0];
  index: number;
}) => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  /* tall cards are ~490px, short ones ~400px — slightly smaller */
  const photoH = product.tall ? 490 : 400;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 3) * 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: "380px",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        scrollSnapAlign: "start",
      }}
    >
      {/* ── PHOTO AREA ── */}
      <div
        style={{
          width: "100%",
          height: `${photoH}px`,
          borderRadius: "18px",
          overflow: "hidden",
          position: "relative",
          background: "#ddd",
          transition: "box-shadow 0.4s",
          boxShadow: hovered
            ? "0 28px 64px rgba(0,0,0,0.18)"
            : "0 6px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* Image */}
        <motion.img
          src={product.image}
          alt={product.title}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.background = "linear-gradient(135deg,#c09040,#3a2200)";
            el.style.display = "none";
            const p = el.parentElement!;
            p.style.background = "linear-gradient(135deg,#c09040 0%,#3a2200 100%)";
          }}
        />

        {/* Category pill(s) — top-left inside photo */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              borderRadius: "999px",
              padding: "5px 14px",
              fontSize: "11px",
              fontWeight: 700,
              color: "#111",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            {product.category}
          </span>
          {product.subcategory && (
            <span
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
                borderRadius: "999px",
                padding: "5px 14px",
                fontSize: "11px",
                fontWeight: 700,
                color: "#111",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {product.subcategory}
            </span>
          )}
        </div>

        {/* Hover: bottom dark gradient + arrow */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#c08a5b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "18px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            }}
          >
            ↗
          </div>
        </motion.div>
      </div>

      {/* ── TEXT BELOW PHOTO — matches image 2 ── */}
      <div style={{ padding: "20px 4px 8px" }}>
        {/* Product name — big bold black */}
        <motion.h3
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: "#111",
            letterSpacing: "-0.02em",
            marginBottom: "8px",
            lineHeight: 1.2,
          }}
        >
          {product.title}
        </motion.h3>

        {/* Location — grey, small */}
        <p
          style={{
            fontSize: "13.5px",
            fontWeight: 400,
            color: "#888",
            marginBottom: "2px",
          }}
        >
          {product.location}
        </p>

        {/* Year — grey, small */}
        <p
          style={{
            fontSize: "13.5px",
            fontWeight: 400,
            color: "#888",
          }}
        >
          {product.year}
        </p>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────
   MAIN SECTION
───────────────────────────────────── */
const ProductsSection = () => {
  const headerRef  = useRef<HTMLDivElement>(null);
  const headerView = useInView(headerRef, { once: true, margin: "-60px" });
  const scrollRef  = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = Math.ceil(products.length / 3);

  /* track scroll position to update dot */
  const onScroll = useCallback(() => {
    const c = scrollRef.current;
    if (!c) return;
    const cardW = 440; // card + gap
    const slide = Math.round(c.scrollLeft / (cardW * 3));
    setActiveSlide(Math.min(slide, totalSlides - 1));
  }, [totalSlides]);

  useEffect(() => {
    const c = scrollRef.current;
    if (!c) return;
    c.addEventListener("scroll", onScroll, { passive: true });
    return () => c.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollToSlide = (i: number) => {
    const c = scrollRef.current;
    if (!c) return;
    c.scrollTo({ left: i * 440 * 3, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .ps, .ps * { font-family: 'Inter', sans-serif !important; box-sizing: border-box; }
        .ps a { text-decoration: none; }
        .no-sb::-webkit-scrollbar { display: none; }
        .no-sb { -ms-overflow-style: none; scrollbar-width: none; }
        .exp-btn:hover { background: #111 !important; }
      `}</style>

      <section
        className="ps"
        style={{
          width: "100%",
          background: "#F5F4F1",
          padding: "40px 0 50px",
          overflow: "hidden",
          position: "relative",
        }}
      >

        {/* ── FAINT ARCHITECTURAL WATERMARK ── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "420px",
            opacity: 0.055,
            pointerEvents: "none",
            zIndex: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='420' viewBox='0 0 800 420' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M400 10 L400 410 M50 410 L400 10 L750 410 M50 410 L750 410 M120 260 L680 260 M200 410 L400 10 L600 410 M400 10 L800 280 M400 10 L0 280' stroke='%23000' stroke-width='1.2' fill='none'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />

        {/* ══ HEADER ══ */}
        <div
          ref={headerRef}
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 60px",
            marginBottom: "64px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={headerView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: "999px",
              padding: "6px 14px 6px 10px",
              marginBottom: "28px",
            }}
          >
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "#5f9bf5", display: "block",
            }} />
            <span style={{
              fontSize: "11px", fontWeight: 600,
              letterSpacing: "0.18em", color: "#555",
              textTransform: "uppercase",
            }}>
              OUR PRODUCTS
            </span>
          </motion.div>

          {/* Headline — black "Our" + gold "Products That" / gold "Define" + black "Our Range" */}
          <div style={{ overflow: "hidden", marginBottom: "20px" }}>
            {[
              { parts: [{ t: "Our ", gold: false }, { t: "Products That", gold: true }] },
              { parts: [{ t: "Define ", gold: true }, { t: "Our Range", gold: false }] },
            ].map((line, li) => (
              <div key={li} style={{ overflow: "hidden" }}>
                <motion.div
                  initial={{ y: "110%", opacity: 0 }}
                  animate={headerView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ delay: 0.12 + li * 0.10, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 style={{
                    fontSize: "clamp(40px, 5.5vw, 74px)",
                    fontWeight: 900,
                    lineHeight: 1.08,
                    letterSpacing: "-0.03em",
                    margin: 0,
                    textAlign: "center",
                  }}>
                    {line.parts.map((p, pi) => (
                      <span key={pi} style={{ color: p.gold ? "#5f9bf5" : "#111" }}>{p.t}</span>
                    ))}
                  </h2>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Sub copy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headerView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: 1.72,
              color: "#666",
              maxWidth: "620px",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
           Our product range includes GI-tagged Salem Sago (Javvarisi) and tapioca starch, carefully processed to ensure purity, consistency, and reliability for food, industrial, and export applications.
          </motion.p>
        </div>

        {/* ══ SCROLL TRACK ══ */}
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 60px",
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Cards row — 3 visible, staggered heights */}
          <div
            ref={scrollRef}
            className="no-sb"
            style={{
              display: "flex",
              gap: "20px",
              overflowX: "scroll",
              alignItems: "center",   /* center-aligned »»» */
              paddingBottom: "16px",
              cursor: "grab",
              justifyContent: "flex-start",
              paddingLeft: "0px",
              paddingRight: "0px",
              scrollSnapType: "x mandatory",
            }}
            onMouseDown={(e) => {
              const el = scrollRef.current!;
              const startX = e.pageX;
              const sl     = el.scrollLeft;
              el.style.cursor = "grabbing";
              const move = (me: MouseEvent) => { el.scrollLeft = sl - (me.pageX - startX); };
              const up   = () => { el.style.cursor = "grab"; window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
              window.addEventListener("mousemove", move);
              window.addEventListener("mouseup", up);
            }}
          >
            {products.map((product, i) => (
              <ProductCard key={i} product={product} index={i} />
            ))}
          </div>
        </div>

        {/* ══ GOLD DOT PAGINATION + CTA ══ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} // moved up from y: 28
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "36px",
            marginTop: "30px", // reduced from 60px
            padding: "0 60px",
            maxWidth: "1320px",
            margin: "30px auto 0", // reduced from 60px auto 0
          }}
        >
          {/* Dot row — single amber dot like image */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                style={{
                  width: i === activeSlide ? "28px" : "10px",
                  height: "10px",
                  borderRadius: "999px",
                  background: i === activeSlide ? "#5f9bf5" : "rgba(0,0,0,0.18)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.35s ease",
                }}
              />
            ))}
          </div>

          {/* Lines + button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              width: "100%",
              maxWidth: "900px",
            }}
          >
            <div style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to right, transparent, #111 80%)",
            }} />
            <Link
              to="/products"
              className="exp-btn"
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
                transition: "background 0.25s",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
                boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
              }}
            >
              Explore Products
              <ArrowUpRight size={17} />
            </Link>
            <div style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to left, transparent, #111 80%)",
            }} />
          </div>
        </motion.div>
 {/* 🔥 PREMIUM VALUE STRIP WITH ICONS */}
        <div className="mt-16 relative overflow-hidden">

          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-16 items-center whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 28,
              ease: "linear",
            }}
          >
            {[
              { text: "Quality and Fair Pricing", icon: ShieldCheck },
              { text: "Cooperative Strength", icon: Users },
              { text: "Sustainable Growth", icon: TrendingUp },
              { text: "Trusted Quality", icon: Award },
              { text: "Collective Progress", icon: Sparkles },
            ]
              .concat([
                { text: "Quality and Fair Pricing", icon: ShieldCheck },
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
                    className="
                      flex items-center gap-3
                      text-gray-900
                      text-lg
                      font-medium
                      hover:text-black
                      transition
                    "
                  >
                    <Icon className="w-5 h-5 text-blue-600" />
                    {item.text}
                  </div>
                );
              })}
          </motion.div>

        </div>

      </section>
    </>
  );
};

export default ProductsSection;