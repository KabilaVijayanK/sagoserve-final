import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const BLUE = "#5f9bf5";

export default function SagoserveCTA() {
  return (
    <section
      style={{
        position: "relative",
        padding: "60px 20px",
        background: "#ffffff",
        overflow: "hidden",
        textAlign: "center",
      }}
    >

      {/* Background watermark image */}
      <img
        src="/Photos/Image 1.png"
        alt="architecture"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: "1200px",
          opacity: 0.12,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 900, margin: "auto" }}>

        {/* Small Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid #ddd",
            borderRadius: 50,
            padding: "8px 18px",
            fontSize: 12,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: 15,
            background: "#fff",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              background: BLUE,
              borderRadius: "50%",
            }}
          />
          CONNECT WITH SAGOSERVE
        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: "clamp(36px,5vw,68px)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 10,
            color: "#111",
          }}
        >
          Join <span style={{ color: BLUE }}>SAGOSERVE</span>
          <br />
          Grow in the <span style={{ color: BLUE }}>Sago & Starch </span>
        </h2>

        {/* Description */}
        <p
          style={{
            color: "#666",
            fontSize: 18,
            maxWidth: 650,
            margin: "auto",
            lineHeight: 1.7,
            marginBottom: 30,
          }}
        >
          Connect with SAGOSERVE to explore opportunities in the sago and starch industry.
          Discover new partnerships, cooperative initiatives, and market insights.
        </p>

        {/* Contact Button */}
        <Link to="/contact" style={{ textDecoration: "none" }}>
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 40px rgba(95,155,245,0.4)",
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "18px 44px",
              background: BLUE,
              color: "#fff",
              borderRadius: 100,
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(95,155,245,0.3)",
            }}
          >
            Contact Us <ArrowUpRight size={18} />
          </motion.div>
        </Link>

      </div>
    </section>
  );
}