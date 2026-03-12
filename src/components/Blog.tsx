import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const BLUE = "#5f9bf5";

// ── Data ──────────────────────────────────────────────────────
const blogs = [
  {
    id: 1,
    category: "Cooperative Marketing",
    title: "Strengthening cooperative marketing in the Sago & Starch industry",
    excerpt:
      "Modern sago production is all about creating a sleek, functional, and market-driven approach that reflects contemporary cooperative living. Whether you're...",
    date: "September 07",
    image: "/blog1.jpg",
    author: "Admin",
  },
  {
    id: 2,
    category: "Fair Pricing",
    title: "The role of SAGOSERVE in ensuring fair pricing for sago manufacturers",
    excerpt:
      "Modern sago production is all about creating a sleek, functional, and market-driven approach that reflects contemporary cooperative living. Whether you're...",
    date: "November 08",
    image: "/blog2.jpg",
    author: "Admin",
  },
  {
    id: 3,
    category: "Market Stability",
    title: "Serving members, stabilizing markets: The SAGOSERVE approach",
    excerpt:
      "Modern sago production is all about creating a sleek, functional, and market-driven approach that reflects contemporary cooperative living. Whether you're...",
    date: "December 09",
    image: "/blog3.jpg",
    author: "Admin",
  },
];

// ── Blog Card ─────────────────────────────────────────────────
const BlogCard = ({ blog, index }: { blog: (typeof blogs)[0]; index: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(95,155,245,0.14)" }}
      style={{
        background: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.06)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Image + badge */}
      <div style={{ position: "relative", overflow: "hidden", height: 260 }}>
        <motion.img
          src={blog.image}
          alt={blog.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Category badge — blue */}
        <div style={{
          position: "absolute", top: 16, left: 16,
          background: BLUE,
          color: "#fff", fontSize: 11, fontWeight: 600,
          padding: "5px 13px", borderRadius: 100,
          letterSpacing: "0.4px",
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: "0 4px 14px rgba(95,155,245,0.4)",
        }}>
          {blog.category}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 20px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
          By <span style={{ color: BLUE, fontWeight: 600 }}>{blog.author}</span>
          <span style={{ marginLeft: 12, color: "#ccc" }}>·</span>
          <span style={{ marginLeft: 12 }}>{blog.date}</span>
        </p>

        <h3 style={{
          fontSize: "clamp(15px, 1.5vw, 19px)",
          fontWeight: 800, color: "#111", lineHeight: 1.3,
          marginBottom: 8, fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "-0.3px",
        }}>
          {blog.title}
        </h3>

        <p style={{
          fontSize: 14, color: "#888", lineHeight: 1.7,
          marginBottom: 14, flex: 1, fontFamily: "'DM Sans', sans-serif",
        }}>
          {blog.excerpt}
        </p>

        <Link to={`/blog/${blog.id}`} style={{ textDecoration: "none" }}>
          <motion.div
            whileHover={{ gap: 10 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              color: BLUE, fontSize: 13, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              transition: "gap 0.3s",
            }}
          >
            Read More <ArrowRight size={14} />
          </motion.div>
        </Link>
      </div>
    </motion.article>
  );
};

// ── Animated orb for CTA ──────────────────────────────────────
const FloatingOrb = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    animate={{ y: [0, -18, 0], scale: [1, 1.08, 1] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    style={style}
  />
);

// ── CTA Section — attractive, #5f9bf5 accented ───────────────

// ── Main Export ───────────────────────────────────────────────
export default function BlogNewsSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
        @media (max-width: 900px) {
          .blog-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 580px) {
          .blog-grid { grid-template-columns: 1fr !important; }
          .blog-header-row { flex-direction: column !important; gap: 16px !important; }
          .cta-inner { flex-direction: column !important; padding: 30px 28px !important; }
          .cta-heading { font-size: 22px !important; }
        }
      `}</style>

      <section
        id="blog"
        className="section-cinematic"
        style={{ background: "#f5f4f1", padding: "50px 0 60px" }}
      >
        <div className="container-editorial">

          {/* ── Header ── */}
          <div
            className="blog-header-row"
            style={{
              display: "flex", alignItems: "flex-start",
              gap: 24, marginBottom: 40,
            }}
          >
            {/* Pill tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ flexShrink: 0, paddingTop: 10 }}
            >
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                border: "1.5px solid #ccc",
                borderRadius: 100, padding: "7px 16px",
                background: "#fff",
              }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: BLUE, flexShrink: 0 }} />
                <span style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: "2.5px",
                  textTransform: "uppercase", color: "#444",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  Straight From The Newsroom
                </span>
              </div>
            </motion.div>

            {/* Vertical divider */}
            <div style={{ width: 1.5, alignSelf: "stretch", background: "#ccc", flexShrink: 0 }} />

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 style={{
                fontSize: "clamp(28px, 3.8vw, 52px)",
                fontWeight: 800, lineHeight: 1.15, color: "#111",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "-1px", margin: 0,
              }}>
                Take A Look At{" "}
                <span style={{
                  color: BLUE,
                  background: `linear-gradient(135deg, ${BLUE}, #3a78e8)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  Our Latest
                </span>
                <br />
                <span style={{
                  color: BLUE,
                  background: `linear-gradient(135deg, ${BLUE}, #3a78e8)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  Blog
                </span>
                {" "}& Articles.
              </h2>
            </motion.div>
          </div>

          {/* ── Blog Cards ── */}
          <div
            className="blog-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              marginBottom: 50,
            }}
          >
            {blogs.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} />
            ))}
          </div>

          

        </div>
      </section>
    </>
  );
}