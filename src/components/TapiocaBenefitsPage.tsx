import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Shirt, Utensils, Droplets, Pill, FileText } from "lucide-react";

const benefits = [
  {
    id: "01",
    text: "Supports Baby's Growth",
    desc: "Rich in essential nutrients that fuel fetal development at every stage.",
  },
  {
    id: "02",
    text: "Strengthens Bones & Muscles",
    desc: "Natural calcium and mineral content builds lasting skeletal strength.",
  },
  {
    id: "03",
    text: "Boosts Energy Levels",
    desc: "Complex carbohydrates provide sustained, clean energy throughout the day.",
  },
  {
    id: "04",
    text: "Promotes Heart Health",
    desc: "Zero cholesterol profile supports a healthy cardiovascular system.",
  },
  {
    id: "05",
    text: "Regulates Blood Pressure",
    desc: "Natural potassium content helps maintain optimal blood pressure levels.",
  },
  {
    id: "06",
    text: "Improves Digestion",
    desc: "Gentle on the stomach; supports smooth and healthy gut function.",
  },
];

const industries = [
  { name: "Textile Industry", Icon: Shirt, desc: "Used as a sizing agent in fabric processing and finishing." },
  { name: "Food Processing", Icon: Utensils, desc: "A key thickener and stabilizer in a vast range of food products." },
  { name: "Adhesive Industry", Icon: Droplets, desc: "Forms strong, eco-friendly bonds in packaging and labeling." },
  { name: "Pharmaceutical Industry", Icon: Pill, desc: "Serves as an excipient in tablet binding and coating." },
  { name: "Paper Industry", Icon: FileText, desc: "Improves paper surface smoothness and printing quality." },
];

function BenefitCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, y: 30 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "default" }}
    >
      <div
        style={{
          position: "relative",
          background: hovered
            ? "linear-gradient(135deg, #5f9bf5 0%, #3a78e8 100%)"
            : "white",
          border: hovered ? "1.5px solid #5f9bf5" : "1.5px solid #e8edf5",
          borderRadius: "20px",
          padding: "28px 28px 24px",
          boxShadow: hovered
            ? "0 24px 60px rgba(95,155,245,0.35)"
            : "0 4px 24px rgba(0,0,0,0.05)",
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
          overflow: "hidden",
        }}
      >
        {/* Floating number watermark */}
        <span
          style={{
            position: "absolute",
            top: "-14px",
            right: "20px",
            fontSize: "80px",
            fontWeight: "900",
            fontFamily: "'Playfair Display', serif",
            color: hovered ? "rgba(255,255,255,0.12)" : "rgba(95,155,245,0.07)",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
            transition: "color 0.4s",
          }}
        >
          {item.id}
        </span>

        {/* Number badge */}
        <div
          style={{
            display: "inline-block",
            background: hovered ? "rgba(255,255,255,0.2)" : "rgba(95,155,245,0.1)",
            color: hovered ? "white" : "#5f9bf5",
            borderRadius: "8px",
            padding: "3px 10px",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "2px",
            marginBottom: "14px",
            fontFamily: "monospace",
            transition: "all 0.4s",
          }}
        >
          {item.id}
        </div>

        <h4
          style={{
            fontSize: "16px",
            fontWeight: "700",
            fontFamily: "'Playfair Display', serif",
            color: hovered ? "white" : "#0f1923",
            marginBottom: "10px",
            lineHeight: 1.3,
            transition: "color 0.4s",
          }}
        >
          {item.text}
        </h4>

        <p
          style={{
            fontSize: "13px",
            color: hovered ? "rgba(255,255,255,0.85)" : "#7a8a9a",
            lineHeight: 1.65,
            fontFamily: "'DM Sans', sans-serif",
            transition: "color 0.4s",
            margin: 0,
          }}
        >
          {item.desc}
        </p>

        {/* Bottom accent line */}
        <motion.div
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "3px",
            background: "rgba(255,255,255,0.4)",
            borderRadius: "0 0 20px 20px",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function TapiocaBenefitsPremium() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div style={{ background: "white", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .blend-text {
          mix-blend-mode: multiply;
        }

        .section-tag::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #5f9bf5;
          margin-right: 8px;
          vertical-align: middle;
        }
        @media (max-width: 900px) {
          .tp-benefits-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .tp-industry-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .tp-container { padding: 0 24px !important; }
          .tp-section { padding: 48px 0 !important; }
          .tp-header { margin-bottom: 48px !important; }
        }
        @media (max-width: 640px) {
          .tp-benefits-grid { grid-template-columns: 1fr !important; }
          .tp-industry-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .tp-stat-strip { grid-template-columns: 1fr !important; }
          .tp-stat-strip > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.2) !important; }
          .tp-stat-strip > div:last-child { border-bottom: none !important; }
          .tp-container { padding: 0 16px !important; }
          .tp-section { padding: 40px 0 !important; }
          .tp-header { flex-direction: column !important; align-items: flex-start !important; margin-bottom: 36px !important; }
        }
        @media (max-width: 480px) {
          .tp-industry-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>


      {/* ═══════════════════════════════════════════
          HEALTH BENEFITS SECTION
      ═══════════════════════════════════════════ */}
      <section
        className="tp-section"
        style={{
          background: "white",
          padding: "80px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Large blending background text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-6deg)",
            fontSize: "clamp(60px, 14vw, 180px)",
            fontWeight: "900",
            fontFamily: "'Playfair Display', serif",
            color: "#5f9bf5",
            opacity: 0.04,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            letterSpacing: "-4px",
          }}
        >
          BENEFITS
        </div>

        <div className="tp-container" style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 48px" }}>

          {/* Section header — split layout like image */}
          <div
            className="tp-header"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "80px",
              gap: "48px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="section-tag"
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#5f9bf5",
                  background: "rgba(95,155,245,0.08)",
                  padding: "7px 16px 7px 10px",
                  borderRadius: "100px",
                  border: "1px solid rgba(95,155,245,0.2)",
                  display: "inline-block",
                  marginBottom: "24px",
                }}
              >
                Wellness
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(32px, 4.5vw, 62px)",
                  fontWeight: "900",
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: 1.1,
                  letterSpacing: "-1.5px",
                  color: "#0f1923",
                  margin: 0,
                }}
              >
                Explore The Health Benefits
                <br />
                <span
                  style={{
                    color: "#5f9bf5",
                    fontStyle: "italic",
                  }}
                >
                  of Tapioca Sago
                </span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                maxWidth: "380px",
                fontSize: "15px",
                color: "#7a8a9a",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
             Tapioca sago (Javvarisi) is a nutritious and easily digestible food that provides quick energy and supports a balanced diet. Rich in carbohydrates and naturally gluten-free, it is widely used in healthy and traditional recipes for people of all ages.
            </motion.p>
          </div>

          {/* Benefit cards grid */}
          <div
            className="tp-benefits-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {benefits.map((item, i) => (
              <BenefitCard key={i} item={item} index={i} />
            ))}
          </div>

          {/* Center stat strip */}
          <motion.div
            className="tp-stat-strip"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              marginTop: "64px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              background: "linear-gradient(135deg, #5f9bf5 0%, #3a78e8 100%)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(95,155,245,0.3)",
            }}
          >
            {[
              { num: "100%", label: "Natural & Organic" },
              { num: "6+", label: "Proven Health Benefits" },
              { num: "50+", label: "Years of Heritage" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: "40px 32px",
                  textAlign: "center",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.2)" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(32px, 4vw, 52px)",
                    fontWeight: "900",
                    fontFamily: "'Playfair Display', serif",
                    color: "white",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.75)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    fontWeight: "500",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INDUSTRIAL USES SECTION
      ═══════════════════════════════════════════ */}
      <section
        className="tp-section"
        style={{
          background: "#fdfdfe",
          padding: "80px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
       

        <div className="tp-container" style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 48px" }}>

          {/* Section header */}
          <div
            className="tp-header"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "72px",
              flexWrap: "wrap",
              gap: "32px",
            }}
          >
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="section-tag"
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#5f9bf5",
                  background: "rgba(95,155,245,0.08)",
                  padding: "7px 16px 7px 10px",
                  borderRadius: "100px",
                  border: "1px solid rgba(95,155,245,0.2)",
                  display: "inline-block",
                  marginBottom: "24px",
                }}
              >
                Applications
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(32px, 4vw, 56px)",
                  fontWeight: "900",
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: 1.1,
                  letterSpacing: "-1.5px",
                  color: "#0f1923",
                  margin: 0,
                }}
              >
                Industrial Uses of{" "}
                <span style={{ color: "#5f9bf5", fontStyle: "italic" }}>
                  Tapioca Starch
                </span>
              </motion.h2>
            </div>

            {/* Decorative line element */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "60px", height: "2px", background: "#5f9bf5", opacity: 0.3 }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#5f9bf5" }} />
              <div style={{ width: "60px", height: "2px", background: "#5f9bf5", opacity: 0.3 }} />
            </div>
          </div>

          {/* Industry cards — 5 across */}
          <div
            className="tp-industry-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "16px",
            }}
          >
            {industries.map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -10, boxShadow: "0 32px 64px rgba(95,155,245,0.18)" }}
                  style={{
                    background: "white",
                    borderRadius: "20px",
                    padding: "36px 24px",
                    textAlign: "center",
                    border: "1.5px solid #e8edf5",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                    transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Background number */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-20px",
                      right: "-10px",
                      fontSize: "80px",
                      fontWeight: "900",
                      fontFamily: "'Playfair Display', serif",
                      color: "rgba(95,155,245,0.05)",
                      lineHeight: 1,
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "16px",
                      background: "rgba(95,155,245,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <Icon style={{ width: "24px", height: "24px", color: "#5f9bf5" }} strokeWidth={1.8} />
                  </div>

                  <h4
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      fontFamily: "'Playfair Display', serif",
                      color: "#0f1923",
                      marginBottom: "10px",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.name}
                  </h4>

                  <p
                    style={{
                      fontSize: "12px",
                      color: "#7a8a9a",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}