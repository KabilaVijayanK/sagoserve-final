import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BLUE = "#5f9bf5";
const DARK = "#0f1923";

const navItems = [
  { label: "Home",          href: "/" },
  { label: "About",         href: "/about" },
  { label: "Products",      href: "/products" },
  { label: "Services",      href: "/services" },
  { label: "E-Auction",     href: "/auction" },
  { label: "Applications",  href: "/applications" },
  { label: "Blogs & News",  href: "/blogs" },
  { label: "Contact",       href: "/contact" },
];

const registrationLinks = [
  { label: "Member Registration",    href: "/register/member" },
  { label: "Merchant Registration",  href: "/register/merchant" },
  { label: "Wholesale Registration", href: "/register/wholesale" },
];

const Navbar = () => {
  const [scrolled,             setScrolled]             = useState(false);
  const [isMobileMenuOpen,     setIsMobileMenuOpen]     = useState(false);
  const [isDropdownOpen,       setIsDropdownOpen]       = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropTimer = useRef<ReturnType<typeof setTimeout>>();
  const location  = useLocation();

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

  const openDrop  = () => { clearTimeout(dropTimer.current); setIsDropdownOpen(true); };
  const closeDrop = () => { dropTimer.current = setTimeout(() => setIsDropdownOpen(false), 130); };
  const isActive  = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .nb, .nb * { font-family: 'DM Sans', sans-serif !important; box-sizing: border-box; }
        .nb a { text-decoration: none; }

        /* underline animation */
        .nb-lnk { position: relative; }
        .nb-lnk::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 2px; background: ${BLUE}; border-radius: 2px;
          transition: width .28s cubic-bezier(.22,1,.36,1);
        }
        .nb-lnk:hover::after, .nb-lnk.act::after { width: 100%; }

        /* dropdown item */
        .nb-ddi { transition: background .15s, color .15s, padding-left .18s; }
        .nb-ddi:hover {
          background: rgba(95,155,245,.07) !important;
          color: ${BLUE} !important;
          padding-left: 22px !important;
        }

        /* mobile link */
        .nb-mob { transition: color .18s; }
        .nb-mob:hover { color: ${BLUE} !important; }

        /* Enquire ghost (transparent navbar state) */
        .enq-ghost {
          background: transparent;
          border: 1.5px solid rgba(95,155,245,.55);
          color: ${BLUE} !important;
          transition: background .3s, border-color .3s, box-shadow .3s, transform .2s, color .3s;
        }
        .enq-ghost:hover {
          background: ${BLUE} !important;
          border-color: ${BLUE} !important;
          color: #fff !important;
          box-shadow: 0 8px 26px rgba(95,155,245,.38);
          transform: translateY(-1px);
        }

        /* Enquire solid (scrolled state) */
        .enq-solid {
          background: ${BLUE} !important;
          border: 1.5px solid ${BLUE} !important;
          color: #fff !important;
          transition: background .3s, border-color .3s, box-shadow .3s, transform .2s;
        }
        .enq-solid:hover {
          background: #3a78e8 !important;
          border-color: #3a78e8 !important;
          box-shadow: 0 8px 26px rgba(95,155,245,.38);
          transform: translateY(-1px);
        }

        /* hamburger */
        .nb-ham {
          display: none; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 10px; cursor: pointer;
          transition: background .2s;
        }
        .nb-ham:hover { background: rgba(95,155,245,.18) !important; }

        @media (max-width: 1100px) {
          .nb-desk { display: none !important; }
          .nb-ham  { display: flex !important; }
        }
      `}</style>

      {/* ═══════════════════════ HEADER ═══════════════════════ */}
      <header
        className="nb"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 999,
          // ── TRANSPARENT on hero, white frosted card on scroll ──
          background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(95,155,245,0.10)" : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 28px rgba(15,25,35,0.08)" : "none",
          transition: "background .4s ease, box-shadow .4s ease, border-color .4s ease",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center",
          maxWidth: 1360, margin: "0 auto",
          height: 72, padding: "0 32px",
        }}>

          {/* ── LOGO — just image + text, zero background block ── */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            {/* Raw image — no wrapper div, no colored box */}
            <img
              src="/logo.png"
              alt="SAGOSERVE"
              style={{ width: 38, height: 38, objectFit: "contain", display: "block" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <div>
              <div style={{
                fontSize: 15, fontWeight: 800,
                color: scrolled ? DARK : "#fff",
                lineHeight: 1.1, letterSpacing: "-0.3px",
                transition: "color .35s",
              }}>
                SAGOSERVE
              </div>
              <div style={{
                fontSize: 9, fontWeight: 600,
                color: scrolled ? "#9aacbe" : "rgba(255,255,255,0.55)",
                letterSpacing: "2px", textTransform: "uppercase" as const,
                transition: "color .35s",
              }}>
                Est. 1965
              </div>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <div
            className="nb-desk"
            style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 0 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`nb-lnk${isActive(item.href) ? " act" : ""}`}
                style={{
                  fontSize: 13.5, fontWeight: isActive(item.href) ? 700 : 600,
                  color: isActive(item.href) ? BLUE : scrolled ? DARK : "#fff",
                  padding: "6px 11px", borderRadius: 8,
                  whiteSpace: "nowrap",
                  transition: "color .35s",
                }}
              >
                {item.label}
              </Link>
            ))}

            {/* Registration dropdown */}
            <div style={{ position: "relative" }} onMouseEnter={openDrop} onMouseLeave={closeDrop}>
              <button style={{
                display: "flex", alignItems: "center", gap: 4,
                fontSize: 13.5, fontWeight: 600,
                color: isDropdownOpen ? BLUE : scrolled ? DARK : "#fff",
                background: "none", border: "none", cursor: "pointer",
                padding: "6px 11px", borderRadius: 8,
                transition: "color .35s", whiteSpace: "nowrap",
              }}>
                Registration
                <motion.span animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                  <ChevronDown size={13} />
                </motion.span>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={openDrop}
                    onMouseLeave={closeDrop}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      left: "50%", transform: "translateX(-50%)",
                      background: "#fff",
                      border: "1px solid rgba(95,155,245,0.14)",
                      borderRadius: 14,
                      boxShadow: "0 16px 50px rgba(15,25,35,0.11)",
                      overflow: "hidden", minWidth: 220,
                    }}
                  >
                    <div style={{ height: 2, background: `linear-gradient(90deg,${BLUE},#3a78e8)` }} />
                    <div style={{ padding: "6px 0" }}>
                      {registrationLinks.map((link) => (
                        <Link
                          key={link.label}
                          to={link.href}
                          className="nb-ddi"
                          style={{
                            display: "block", padding: "10px 18px",
                            fontSize: 13.5, fontWeight: 500, color: "#3a4a5a",
                          }}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── RIGHT: CTA + Hamburger ── */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <Link
              to="/contact"
              className={`nb-desk ${scrolled ? "enq-solid" : "enq-ghost"}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "9px 20px", borderRadius: 10,
                fontSize: 13.5, fontWeight: 700,
              }}
            >
              Enquire Now
              <span style={{
                width: 20, height: 20, borderRadius: "50%",
                background: scrolled ? "rgba(255,255,255,0.22)" : "rgba(95,155,245,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, transition: "background .3s",
              }}>↗</span>
            </Link>

            <button
              className="nb-ham"
              onClick={() => setIsMobileMenuOpen(true)}
              style={{
                background: scrolled ? "rgba(95,155,245,0.08)" : "rgba(255,255,255,0.12)",
                border: `1.5px solid ${scrolled ? "rgba(95,155,245,0.18)" : "rgba(255,255,255,0.3)"}`,
                color: scrolled ? BLUE : "#fff",
                transition: "background .35s, border-color .35s, color .35s",
              }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════ MOBILE DRAWER ═══════════════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="nb" style={{ position: "fixed", inset: 0, zIndex: 1000 }}>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                position: "absolute", inset: 0,
                background: "rgba(15,25,35,0.36)", backdropFilter: "blur(4px)",
              }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute", top: 0, right: 0,
                height: "100%", width: "min(340px, 88vw)",
                background: "#fff",
                boxShadow: "-8px 0 56px rgba(15,25,35,0.14)",
                display: "flex", flexDirection: "column", overflowY: "auto",
              }}
            >
              {/* Top accent bar */}
              <div style={{ height: 3, background: `linear-gradient(90deg,${BLUE},#3a78e8)`, flexShrink: 0 }} />

              {/* Drawer header — no bg block on logo */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "20px 22px 16px",
                borderBottom: "1px solid #f0f2f5",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <img
                    src="/logo.png"
                    alt="SAGOSERVE"
                    style={{ width: 30, height: 30, objectFit: "contain" }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: DARK, lineHeight: 1 }}>SAGOSERVE</div>
                    <div style={{ fontSize: 9, fontWeight: 600, color: "#9aacbe", letterSpacing: "2px", textTransform: "uppercase" as const, marginTop: 2 }}>Est. 1965</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: "#f4f5f7", border: "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "#5a6a7a",
                  }}
                >
                  <X size={17} />
                </button>
              </div>

              {/* Links list */}
              <div style={{ padding: "10px 12px", flex: 1 }}>
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.038, duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={item.href}
                      className="nb-mob"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "12px 12px", borderRadius: 10, marginBottom: 2,
                        fontSize: 15, fontWeight: isActive(item.href) ? 700 : 500,
                        color: isActive(item.href) ? BLUE : DARK,
                        background: isActive(item.href) ? "rgba(95,155,245,0.07)" : "transparent",
                        borderLeft: isActive(item.href) ? `3px solid ${BLUE}` : "3px solid transparent",
                      }}
                    >
                      {item.label}
                      {isActive(item.href) && (
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: BLUE }} />
                      )}
                    </Link>
                  </motion.div>
                ))}

                {/* Registration accordion */}
                <motion.div
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.038, duration: 0.30 }}
                >
                  <button
                    onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      width: "100%", padding: "12px 12px", borderRadius: 10,
                      background: "none", border: "none",
                      borderLeft: "3px solid transparent",
                      fontSize: 15, fontWeight: 500, color: DARK, cursor: "pointer",
                    }}
                  >
                    Registration
                    <motion.span animate={{ rotate: isMobileDropdownOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                      <ChevronDown size={15} color="#9aacbe" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isMobileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: "hidden", paddingLeft: 14 }}
                      >
                        {registrationLinks.map((link) => (
                          <Link
                            key={link.label}
                            to={link.href}
                            className="nb-mob"
                            style={{
                              display: "block", padding: "10px 12px",
                              borderRadius: 8, fontSize: 14, fontWeight: 500,
                              color: "#5a6a7a", marginBottom: 2,
                            }}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Footer */}
              <div style={{ padding: "14px 18px 28px", borderTop: "1px solid #f0f2f5" }}>
                <Link
                  to="/contact"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    width: "100%", padding: "15px 24px", borderRadius: 12,
                    background: BLUE, color: "#fff", fontSize: 15, fontWeight: 700,
                    boxShadow: "0 8px 28px rgba(95,155,245,0.3)",
                    textDecoration: "none",
                  }}
                >
                  Enquire Now ↗
                </Link>
                <p style={{ textAlign: "center", fontSize: 11, color: "#b0bcca", marginTop: 14 }}>
                  © 2025 SAGOSERVE · Est. 1965
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;