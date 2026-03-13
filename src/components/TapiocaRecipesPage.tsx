import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const recipes = [
  {
    id: 1,
    num: "01",
    title: "Sago Payasam",
    image: "payasam.jpg",
    content:
      "A traditional sweet dessert made with tapioca pearls, milk, jaggery and dry fruits.",
  },
  {
    id: 2,
    num: "02",
    title: "Sago Khichdi",
    image: "kichadi.jpg",
    content:
      "A delicious and light dish prepared with soaked sago, peanuts and spices.",
  },
  {
    id: 3,
    num: "03",
    title: "Sago Vada",
    image: "Photos/Sago Food Photos/JULY/3.JPG",
    content: "Crispy fried patties made with sago and potatoes.",
  },
  {
    id: 4,
    num: "04",
    title: "Sago Pongal",
    image: "Photos/Sago Food Photos/C9R_7061.JPG",
    content:
      "A savory South Indian style pongal made using tapioca pearls.",
  },
  {
    id: 1,
    num: "05",
    title: "Sago Pakoda",
    image: "Photos/Sago Food Photos/C9R_7021.JPG",
    content:
      "A traditional sweet dessert made with tapioca pearls, milk, jaggery and dry fruits.",
  },
 
];

const ACCENT = "#5f9bf5";

export default function TapiocaRecipesPage() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .recipes-wrap {
          background: #f8f6f2;
          padding: 40px 0 50px;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }
        .recipes-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* HEADER — two-column layout with intersecting divider lines */
        .recipes-header {
          text-align: left;
          margin-bottom: 64px;
          
          display: flex;
          align-items: stretch;
          min-height: 160px;
          position: relative;
        }
          /* Horizontal half-line — centered at 280px */
        .recipes-header::before {
          content: '';
          position: absolute;
          top: 10%;
          left: 180px;
          width: 280px;
          height: 1px;
          background: rgba(0,0,0,0.15);
          z-index: 0;
        }
        /* Vertical divider line using ::after pseudo-element */
        .recipes-header::after {
          content: '';
          position: absolute;
          left: 280px;
          top: -40px;
          bottom: 0;
          width: 1px;
          background: rgba(0,0,0,0.15);
          z-index: 0;
        }
        .recipes-header-left {
          width: 280px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          position: relative;
          z-index: 1;
        }
        .recipes-header-right {
          flex: 1;
          padding: 40px 0 40px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        .recipes-eyebrow {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 14px;
          font-weight: 500;
        }
        .recipes-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 900;
          color: #1a1a1a;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.03em;
          max-width: 700px;
        }
        .recipes-title .accent { color: ${ACCENT}; }
        .recipes-subtitle {
          font-size: 15px;
          color: #666;
          line-height: 1.75;
          max-width: 680px;
          margin: 0;
          font-weight: 400;
        }

        /* SECTION BADGE */
        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1.5px solid #1a1a1a;
          border-radius: 100px;
          padding: 4px 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1a1a1a;
        }
        .badge-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: ${ACCENT};
          flex-shrink: 0;
        }

        /* MAIN GRID */
        .recipes-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }

        /* LEFT - TEXT + IMAGE */
        .left-panel {
          position: sticky;
          top: 40px;
        }
        .left-intro {
          margin-bottom: 36px;
        }
        .left-intro h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3vw, 42px);
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.2;
          margin-bottom: 14px;
        }
        .left-intro p {
          font-size: 14px;
          color: #777;
          line-height: 1.7;
          font-weight: 300;
          max-width: 420px;
        }
        .explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: #1a1a1a;
          color: white;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s;
          margin-bottom: 40px;
        }
        .explore-btn:hover {
          background: ${ACCENT};
          transform: translateY(-1px);
        }

        /* IMAGE CARD */
        .image-card {
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          aspect-ratio: 4/3;
          background: #1a1a1a;
        }
        .recipe-img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: opacity 0.5s cubic-bezier(0.4,0,0.2,1),
                      transform 0.55s cubic-bezier(0.4,0,0.2,1);
        }
        .recipe-img.active-img {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }
        .recipe-img.inactive-img {
          opacity: 0;
          transform: scale(1.05);
          z-index: 1;
        }

        /* CAPTION OVERLAY */
        .img-caption {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 24px 24px 28px;
          background: linear-gradient(0deg,rgba(8,8,8,0.88) 0%,rgba(8,8,8,0.35) 70%,transparent 100%);
          z-index: 3;
        }

        /* HIGHLIGHT BAR */
        .highlight-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 3px;
          background: ${ACCENT};
          z-index: 4;
          border-radius: 0 2px 0 22px;
          transition: width 0.55s cubic-bezier(0.4,0,0.2,1);
        }

        /* DOTS */
        .dots-row {
          display: flex;
          gap: 7px;
          margin-top: 14px;
          justify-content: center;
        }
        .dot {
          height: 7px;
          border-radius: 4px;
          background: #ccc;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .dot.active { background: ${ACCENT}; }

        /* RIGHT - ACCORDION LIST */
        .recipes-list {
          display: flex;
          flex-direction: column;
          padding-top: 4px;
        }
        .recipe-item {
          border-top: 1px solid rgba(26,26,26,0.12);
          cursor: pointer;
          user-select: none;
        }
        .recipe-item:last-child { border-bottom: 1px solid rgba(26,26,26,0.12); }

        .recipe-row {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 22px 0;
          transition: padding 0.2s;
        }
        .recipe-item:hover .r-num,
        .recipe-item:hover .r-title { color: ${ACCENT}; }

        .r-num {
          font-size: 13px;
          font-weight: 500;
          color: #bbb;
          width: 26px;
          flex-shrink: 0;
          letter-spacing: 0.04em;
          transition: color 0.3s;
        }
        .r-title {
          flex: 1;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(18px, 2.2vw, 26px);
          font-weight: 700;
          color: #1a1a1a;
          transition: color 0.3s;
          line-height: 1.2;
        }
        .recipe-item.is-active .r-num,
        .recipe-item.is-active .r-title { color: ${ACCENT}; }

        .r-arrow {
          width: 42px; height: 42px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          border: 1.5px solid transparent;
          color: #1a1a1a;
          flex-shrink: 0;
        }
        .recipe-item.is-active .r-arrow {
          background: ${ACCENT};
          border-color: ${ACCENT};
          color: white;
        }
        .recipe-item:not(.is-active):hover .r-arrow {
          border-color: rgba(26,26,26,0.2);
        }

        /* EXPANDED CONTENT */
        .recipe-content {
          overflow: hidden;
        }
        .recipe-content-inner {
          padding: 0 0 20px 44px;
        }
        .recipe-content-inner p {
          font-size: 14px;
          color: #777;
          line-height: 1.7;
          font-weight: 300;
        }

        /* FADE-UP ENTRANCE */
        .fade-up {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }

        /* MOBILE */
        @media (max-width: 900px) {
          .recipes-wrap { padding: 50px 0 60px; }
          .recipes-container { padding: 0 20px; }
          .recipes-main { grid-template-columns: 1fr; gap: 0; }
          .left-panel { position: relative; top: 0; margin-bottom: 36px; }
          .image-card { aspect-ratio: 4/3; border-radius: 16px; }
          .recipes-header { margin-bottom: 44px; flex-direction: column; min-height: auto; }
          .recipes-header-left { width: 100%; border-right: none; border-bottom: 1px solid rgba(0,0,0,0.12); padding: 24px 20px; justify-content: flex-start; }
          .recipes-header-right { padding: 24px 0 0 0; }
        }
        @media (max-width: 480px) {
          .recipes-title { font-size: 30px; }
          .r-title { font-size: 17px; }
          .r-arrow { width: 34px; height: 34px; font-size: 14px; }
        }
      `}</style>

      <section className="recipes-wrap" ref={sectionRef}>
        <div className="recipes-container">

          {/* HEADER — two-column layout */}
          <div className={`recipes-header fade-up ${visible ? "visible" : ""}`}>
            <div className="recipes-header-left">
              <div className="section-badge">
                <span className="badge-dot" />
                Recipes
              </div>
            </div>
            <div className="recipes-header-right">
              <h2 className="recipes-title">
                Tapioca <span className="accent">Sago</span> Recipes
              </h2>
              <p className="recipes-subtitle">
                Discover traditional and modern recipes made using premium quality tapioca sago.
              </p>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="recipes-main">

            {/* LEFT */}
            <div className={`left-panel fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
              

              {/* IMAGE CARD */}
              <div className="image-card">
                {recipes.map((r, i) => (
                  <img
                    key={r.id}
                    src={r.image}
                    alt={r.title}
                    className={`recipe-img ${i === active ? "active-img" : "inactive-img"}`}
                  />
                ))}

                {/* CAPTION */}
                <div className="img-caption">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={active}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", lineHeight: 1.65, fontWeight: 300 }}
                    >
                      {recipes[active].content}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* HIGHLIGHT BAR */}
                <div
                  className="highlight-bar"
                  style={{ width: `${((active + 1) / recipes.length) * 100}%` }}
                />
              </div>

              {/* DOTS */}
              <div className="dots-row">
                {recipes.map((_, i) => (
                  <button
                    key={i}
                    className={`dot ${i === active ? "active" : ""}`}
                    style={{ width: i === active ? 22 : 7 }}
                    onClick={() => setActive(i)}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — ACCORDION LIST */}
            <div className="recipes-list">
              {recipes.map((recipe, idx) => (
                <div
                  key={recipe.id}
                  className={`recipe-item fade-up ${active === idx ? "is-active" : ""} ${visible ? "visible" : ""}`}
                  style={{ transitionDelay: `${0.2 + idx * 0.08}s` }}
                  onClick={() => setActive(idx)}
                >
                  <div className="recipe-row">
                    <span className="r-num">{recipe.num}</span>
                    <span className="r-title">{recipe.title}</span>
                    <div className="r-arrow">
                      {active === idx ? "→" : "↗"}
                    </div>
                  </div>

                  {/* EXPANDED DESCRIPTION */}
                  <AnimatePresence initial={false}>
                    {active === idx && (
                      <motion.div
                        className="recipe-content"
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <div className="recipe-content-inner">
                          <p>{recipe.content}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}