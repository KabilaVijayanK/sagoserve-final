import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Gavel, Megaphone, Warehouse, HandCoins, FlaskConical,
  MapPin, Building2, CheckCircle2, Play, ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";

/* ─────────────────────────── CONSTANTS ─────────────────────────── */
const BLUE = "#5f9bf5";

/* ─────────────────────────── DATA ─────────────────────────── */
const aboutPoints = [
  "The Salem Starch and Sago Manufacturers' Service Industrial Co-operative Society Ltd.(SAGOSERVE) is the only Industrial Cooperative Society for marketing of Sago and Starch in India.",
  "The Salem Starch and Sago Manufacturers' Service Industrial Co-operative Society Ltd. started in the year 1981 to eliminate the middlemen from the scene of trade and to ensure better prices for the tapioca finished products and to provide warehousing, credit and marketing facility to the Sago and Starch manufacturers.",
  "Kerala ranks first in cultivation and production, but Tamil Nadu stands first in respect of processing of Tapioca into Sago meeting about 80% of country's demand for Sago. There are about 400 Sago industries in the small scale sector in the State. The estimated total area under Tapioca cultivation in Tamil Nadu is 85,000 hectares. The Salem region offers good raw material, cheap labour and good sunshine for a longer period of the day throughout the year, helping manufacturers to produce more Tapioca based products.",
  "Tapioca popularly known as Cassava (Botanical Name: Manihot esculenta Crantz) is a tropical tuber crop cultivated in large areas in different parts of the world and has been an important staple food crop and industrial crop in Asia, Africa and Latin America. Tapioca is known to be a very drought-tolerant and water-efficient crop. India acquires significance in the global cassava scenario due to its highest productivity in the world (27.92 MT per Hectare). Similarly within India, Tamil Nadu prides itself in having the highest productivity of 38 tons per hectare. Also 90 per cent of the Sago produced in India is from Tamil Nadu prepared by milling of Tapioca roots.",
];

const visionPoints = [
  "To be India's most trusted co-operative organization for marketing of sago and starch products.",
  "To empower tapioca-based industries through transparent, fair and efficient trade practices.",
  "To ensure sustainable growth for manufacturers, farmers and allied stakeholders.",
  "To promote quality, safety and standardization in sago and starch production.",
  "To strengthen the co-operative movement and contribute to rural economic development.",
];

const missionPoints = [
  "To eliminate middlemen and ensure fair price realization for member-manufacturers.",
  "To provide direct market access through e-auction, marketing and export facilitation.",
  "To support members with warehousing, laboratory testing and credit facilities.",
  "To improve productivity and quality through technology and market intelligence.",
  "To work with integrity, transparency and co-operation for collective growth.",
];

const timelineItems = [
  { icon: "🌱", era: "Before 1947",   label: "Pre-Independence Era",    desc: "Tapioca (cassava) was introduced to India by the Portuguese in the 17th century, and Salem later became a key region for its cultivation. During World War I, when sago imports from Southeast Asia were disrupted, small-scale producers in Salem began India's first tapioca sago industry." },
  { icon: "🏭", era: "1950s – 1960s", label: "Rise of the Industry",    desc: "Salem emerged as the 'land of Sago,' with hundreds of small manufacturers as demand for starch and sago grew rapidly in the food and textile industries. To support sago producers and organize marketing, the Government of Tamil Nadu recognized the need to establish a cooperative society." },
  { icon: "🤝", era: "1961",          label: "Formation of SAGOSERVE",  desc: "Established under the Tamil Nadu Co-operative Societies Act, 1961, with the objective of strengthening the sago and starch industry through fair pricing, organized marketing, and quality assurance." },
  { icon: "📈", era: "1970s – 1990s", label: "Expansion & Recognition", desc: "Membership grew to include hundreds of manufacturers, making Salem the largest tapioca starch and sago hub in India. SAGOSERVE developed strong warehousing and marketing systems, and Salem sago gained recognition across the country as a trusted brand." },
  { icon: "💻", era: "2000s",         label: "Modernization Era",       desc: "The introduction of e-auction system enabled transparent pricing and nationwide participation. Infrastructure was upgraded with modern warehousing, logistics, and IT systems, strengthening SAGOSERVE's financial position." },
  { icon: "🔬", era: "2010s",         label: "Scientific Edge",         desc: "A dedicated testing laboratory with modern equipment was established to ensure quality standards. In 2018, the laboratory achieved NABL accreditation, enabling globally recognized quality assurance." },
  { icon: "🌐", era: "2020s",         label: "Global Outlook",          desc: "SAGOSERVE aligned its operations with GI, APEDA, and EU standards to support exports. It adopted advanced instruments such as ICP-MS and Protein Analyser to meet international food safety requirements." },
];

const services = [
  { icon: Gavel,        title: "E-Auction",           points: ["Transparency", "Competitive Nature", "Making available the right price"] },
  { icon: Megaphone,    title: "Marketing",           points: ["Direct wholesale marketing of sago and starch products"] },
  { icon: Warehouse,    title: "Warehouse",           points: ["Own warehouse – 10", "Private warehouse – 6"] },
  { icon: HandCoins,    title: "Loan",                points: ["Advance Payment to members"] },
  { icon: FlaskConical, title: "NABL Accredited Lab", points: ["Sago – 11 Parameters (As per FSSAI)", "Starch – 3 Parameters"] },
];

const certifications = [
  { icon: "🌍", title: "Geographical Indication (GI)", subtitle: "Salem Sago (Javvarusi)",      desc: "Registered on 31.03.2023 recognizing authenticity of Salem Sago.",    span: 2 },
  { icon: "®",  title: "Trademark Registration",       subtitle: "SAGOSERVE SAGO",              desc: "Registered on 20.12.2024 ensuring brand protection.",                span: 2 },
  { icon: "🧪", title: "NABL Accreditation",           subtitle: "ISO/IEC 17025:2017",          desc: "Accredited on 30.08.2018 confirming testing standards.",             span: 2 },
  { icon: "📦", title: "APEDA Registration",           subtitle: "RCMC/APEDA/18441/2025–2026", desc: "Authorised for export participation.",                               span: 3 },
  { icon: "🌐", title: "Importer–Exporter Code",       subtitle: "AAAAS2151B",                  desc: "Authorising SAGOSERVE for international trade.",                     span: 3 },
];

const districts = [
  { name: "Salem",           count: 196 },
  { name: "Namakkal",        count: 127 },
  { name: "Dharmapuri",      count: 20  },
  { name: "Kallakurichi",    count: 7   },
  { name: "Villupuram",      count: 3   },
  { name: "Erode",           count: 3   },
  { name: "Perambalur",      count: 3   },
  { name: "Trichy",          count: 1   },
  { name: "Thiruvannamalai", count: 1   },
];

const honourData = [
  { name: "Thiru.N.Natarajan",                 from: "18-06-81", to: "30-04-84" },
  { name: "Thiru.C.Subramanian",               from: "01-05-84", to: "31-05-85" },
  { name: "Thiru.N.Chandrasekaran",            from: "01-06-85", to: "30-06-90" },
  { name: "Thiru.K.Ramasamy",                  from: "01-07-90", to: "31-12-95" },
  { name: "Tmt.R.KEERTHY PRIYADHARSHINI, DRO", from: "19-07-24", to: "PRESENT"  },
];

/* ─────────────────────────── HELPERS ─────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

function CountUp({ target }: { target: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = Math.ceil(target / 45);
    const id = setInterval(() => {
      n = Math.min(n + step, target);
      setVal(n);
      if (n >= target) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{val}</span>;
}

function BadgePill({ label }: { label: string }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid #d4dced", borderRadius:999, padding:"5px 18px 5px 12px", marginBottom:24 }}>
      <span style={{ width:7, height:7, borderRadius:"50%", background:BLUE, display:"block", flexShrink:0 }} />
      <span style={{ fontSize:11, fontWeight:700, color:"#555", letterSpacing:"0.18em", textTransform:"uppercase" as const }}>{label}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */
export default function Index() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Outfit',sans-serif; }
        .serif { font-family:'DM Serif Display',serif !important; }

        /* marquee */
        @keyframes marquee-x { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .mq-inner { display:flex; width:max-content; animation:marquee-x 36s linear infinite; }
        .mq-inner:hover { animation-play-state:paused; }

        /* hover states */
        .dist-row:hover   { background:#eef3ff; }
        .honour-row:hover { background:rgba(95,155,245,0.07); }
        .cert-card  { transition:transform .35s,box-shadow .35s; }
        .cert-card:hover  { transform:translateY(-6px); box-shadow:0 18px 52px rgba(95,155,245,0.18); }
        .svc-card   { transition:border-color .35s,box-shadow .35s,transform .35s; }
        .svc-card:hover   { border-color:${BLUE} !important; box-shadow:0 0 40px rgba(95,155,245,0.28); transform:translateY(-4px); }

        /* timeline connector line */
        .tl-wrap { position:relative; }
        .tl-wrap::before {
          content:''; position:absolute; top:22px; left:0; right:0; height:2px;
          background:linear-gradient(90deg,${BLUE}30,${BLUE},${BLUE}30);
        }

        @media(max-width:900px){
          .about-grid  { grid-template-columns:1fr !important; }
          .vm-grid     { grid-template-columns:1fr !important; }
          .lab-grid    { grid-template-columns:1fr !important; }
          .dist-grid   { grid-template-columns:1fr !important; }
          .cert-grid   { grid-template-columns:1fr 1fr !important; }
          .tl-wrap::before { display:none; }
          .tl-items    { flex-direction:column !important; gap:24px !important; padding-bottom:0 !important; }
          .tl-dot      { top:0 !important; }
        }
        @media(max-width:580px){
          .cert-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

      <div style={{ fontFamily:"'Outfit',sans-serif", color:"#1a1a2e", overflowX:"hidden", background:"#fff" }}>

        {/* ══════════ NAVBAR ══════════ */}
        <Navbar />

        {/* ══════════════════════════════════════════════════════
            HERO BANNER — antra style: compact, centred title + breadcrumb
        ══════════════════════════════════════════════════════ */}
        <section style={{ position:"relative", height:"clamp(260px,35vw,440px)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
          <img
            src="/hero-bg.jpg"
            alt=""
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}
          />
          {/* dark overlay — same depth as antra reference */}
          <div style={{ position:"absolute", inset:0, background:"rgba(18,22,30,0.60)" }} />

          <div style={{ position:"relative", zIndex:2, textAlign:"center", padding:"0 24px" }}>
            <motion.h1
              className="serif"
              initial={{ opacity:0, y:26 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.82, ease:[0.22,1,0.36,1] }}
              style={{ fontSize:"clamp(40px,6.5vw,90px)", fontWeight:700, color:"#fff", lineHeight:1.06, marginBottom:20 }}
            >
              About Us
            </motion.h1>

            <motion.div
              initial={{ opacity:0, y:14 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.32, duration:0.62 }}
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}
            >
              <span style={{ color:"rgba(255,255,255,0.72)", fontSize:13, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase" }}>HOME</span>
              <ChevronRight size={13} color="rgba(255,255,255,0.5)" />
              <span style={{ color:BLUE, fontSize:13, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase" }}>ABOUT US</span>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            1. Empowering the Tapioca Sago & Starch Industry
        ══════════════════════════════════════════════════════ */}
        <section style={{ padding:"96px 0 80px", background:"#f7f9fc" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 40px" }}>

            <motion.div {...fadeUp(0)}>
              <BadgePill label="ABOUT US" />
            </motion.div>

            <div
              className="about-grid"
              style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:48, alignItems:"start" }}
            >
              {/* col 1 — heading + years */}
              <motion.div {...fadeUp(0.06)}>
                <h2
                  className="serif"
                  style={{ fontSize:"clamp(22px,2.8vw,36px)", lineHeight:1.28, color:"#1a1a2e", marginBottom:36 }}
                >
                  Empowering the{" "}
                  <span style={{ color:BLUE }}>Tapioca Sago &amp; Starch Industry</span>{" "}
                  Since 1981
                </h2>
                <div style={{ borderLeft:`4px solid ${BLUE}`, paddingLeft:20 }}>
                  <div
                    className="serif"
                    style={{ fontSize:100, fontWeight:700, color:BLUE, lineHeight:1, letterSpacing:"-4px" }}
                  >
                    61
                  </div>
                  <div style={{ fontSize:14, fontWeight:600, color:"#444", marginTop:6, lineHeight:1.45 }}>
                    Years of<br />Experience
                  </div>
                </div>
              </motion.div>

              {/* col 2 — two stacked images */}
              <motion.div {...fadeUp(0.13)} style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <img
                  src="/building.jpg"
                  alt="SAGOSERVE building"
                  style={{ width:"100%", height:186, objectFit:"cover", borderRadius:14, boxShadow:"0 10px 36px rgba(0,0,0,0.12)" }}
                />
                <img
                  src="/sign.jpg"
                  alt="SAGOSERVE sign board"
                  style={{ width:"100%", height:164, objectFit:"cover", borderRadius:14, boxShadow:"0 10px 36px rgba(0,0,0,0.12)" }}
                />
              </motion.div>

              {/* col 3 — checkmark bullet list */}
              <motion.div {...fadeUp(0.2)} style={{ display:"flex", flexDirection:"column", gap:18 }}>
                {aboutPoints.map((pt, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity:0, x:20 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ delay:0.1 + i * 0.1, duration:0.55 }}
                    style={{ display:"flex", gap:12, alignItems:"flex-start" }}
                  >
                    <CheckCircle2 size={17} color={BLUE} style={{ flexShrink:0, marginTop:2 }} />
                    <p style={{ fontSize:13.5, lineHeight:1.72, color:"#444" }}>{pt}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            2. Vision & Mission + Video
        ══════════════════════════════════════════════════════ */}
        <section style={{ padding:"96px 0", background:"#fff" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 40px" }}>

            <motion.div {...fadeUp(0)}>
              <BadgePill label="RECIPES" />
            </motion.div>

            <motion.div {...fadeUp(0.08)} style={{ marginBottom:52 }}>
              <h2
                className="serif"
                style={{ fontSize:"clamp(20px,2.6vw,34px)", lineHeight:1.32, maxWidth:600, color:"#1a1a2e" }}
              >
                India's most{" "}
                <span style={{ color:BLUE }}>trusted co-operative organization</span>{" "}
                for the marketing of sago and starch products.
              </h2>
            </motion.div>

            {/* Vision | Centre image | Mission */}
            <div
              className="vm-grid"
              style={{ display:"grid", gridTemplateColumns:"1fr 210px 1fr", gap:48, alignItems:"start" }}
            >
              {/* Vision */}
              <motion.div {...fadeUp(0.1)}>
                <h3 className="serif" style={{ fontSize:24, fontWeight:700, color:"#1a1a2e", marginBottom:22 }}>Vision</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
                  {visionPoints.map((pt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity:0, x:-16 }}
                      whileInView={{ opacity:1, x:0 }}
                      viewport={{ once:true }}
                      transition={{ delay:i * 0.09, duration:0.55 }}
                      style={{ display:"flex", gap:10, alignItems:"flex-start" }}
                    >
                      <CheckCircle2 size={15} color={BLUE} style={{ flexShrink:0, marginTop:3 }} />
                      <p style={{ fontSize:13, lineHeight:1.68, color:"#444" }}>{pt}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Centre arch image */}
              <motion.div {...fadeUp(0.15)}>
                <img
                  src="/tapioca-field.jpg"
                  alt="Tapioca field"
                  style={{ width:"100%", height:290, objectFit:"cover", borderRadius:"100px 100px 0 0", boxShadow:`0 18px 52px rgba(95,155,245,0.15)` }}
                />
              </motion.div>

              {/* Mission */}
              <motion.div {...fadeUp(0.1)}>
                <h3 className="serif" style={{ fontSize:24, fontWeight:700, color:"#1a1a2e", marginBottom:22 }}>Mission</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
                  {missionPoints.map((pt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity:0, x:16 }}
                      whileInView={{ opacity:1, x:0 }}
                      viewport={{ once:true }}
                      transition={{ delay:i * 0.09, duration:0.55 }}
                      style={{ display:"flex", gap:10, alignItems:"flex-start" }}
                    >
                      <CheckCircle2 size={15} color={BLUE} style={{ flexShrink:0, marginTop:3 }} />
                      <p style={{ fontSize:13, lineHeight:1.68, color:"#444" }}>{pt}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Full-width video banner */}
            <motion.div
              {...fadeUp(0.22)}
              onClick={() => setVideoOpen(true)}
              style={{ marginTop:68, position:"relative", borderRadius:22, overflow:"hidden", height:"clamp(200px,32vw,360px)", cursor:"pointer" }}
            >
              <img
                src="/farmers-field.jpg"
                alt="Farmers working in tapioca field"
                style={{ width:"100%", height:"100%", objectFit:"cover" }}
              />
              <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.36)" }} />
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <motion.div
                  whileHover={{ scale:1.1 }}
                  whileTap={{ scale:0.93 }}
                  style={{ width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.18)", border:"2.5px solid rgba(255,255,255,0.65)", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(10px)" }}
                >
                  <Play size={26} color="#fff" fill="#fff" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* VIDEO MODAL */}
        <AnimatePresence>
          {videoOpen && (
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setVideoOpen(false)}
              style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center" }}
            >
              <motion.div
                initial={{ scale:0.86 }} animate={{ scale:1 }} exit={{ scale:0.86 }}
                onClick={e => e.stopPropagation()}
                style={{ width:"min(860px,92vw)", borderRadius:14, overflow:"hidden", background:"#000" }}
              >
                <video src="/about-video.mp4" controls autoPlay style={{ width:"100%", display:"block" }} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════
            3. Our History Timeline
        ══════════════════════════════════════════════════════ */}
        <section style={{ padding:"96px 0", background:"#f7f9fc" }}>
          <div style={{ maxWidth:1300, margin:"0 auto", padding:"0 40px" }}>

            {/* two-col heading */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:48, marginBottom:72 }}>
              <motion.div {...fadeUp(0)}>
                <BadgePill label="OUR HISTORY" />
              </motion.div>
              <motion.div {...fadeUp(0.08)}>
                <h2
                  className="serif"
                  style={{ fontSize:"clamp(22px,3vw,40px)", lineHeight:1.22, color:"#1a1a2e" }}
                >
                  Our History Reflects a{" "}
                  <span style={{ color:BLUE }}>Legacy of Growth,</span>{" "}
                  Innovation, and Progress.
                </h2>
              </motion.div>
            </div>

            {/* horizontal timeline */}
            <div className="tl-wrap">
              <div
                className="tl-items"
                style={{ display:"flex", gap:0, overflowX:"auto", paddingBottom:8 }}
              >
                {timelineItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity:0, y:30 }}
                    whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }}
                    transition={{ delay:i * 0.09, duration:0.62 }}
                    style={{ flex:`0 0 calc(100% / 7)`, minWidth:152, paddingRight:20, paddingTop:56, position:"relative" }}
                  >
                    {/* icon bubble above line */}
                    <div style={{ position:"absolute", top:-12, left:-4, width:30, height:30, borderRadius:"50%", background:`${BLUE}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>
                      {item.icon}
                    </div>
                    {/* dot on line */}
                    <div className="tl-dot" style={{ position:"absolute", top:14, left:0, width:16, height:16, borderRadius:"50%", background:BLUE, border:"3px solid #f7f9fc", boxShadow:`0 0 0 3px ${BLUE}40` }} />

                    <div style={{ fontSize:10.5, fontWeight:700, color:BLUE, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>{item.era}</div>
                    <div style={{ fontSize:12.5, fontWeight:700, color:"#1a1a2e", marginBottom:8, lineHeight:1.35 }}>{item.label}</div>
                    <p style={{ fontSize:11.5, color:"#666", lineHeight:1.65 }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            4. Advanced Laboratory
        ══════════════════════════════════════════════════════ */}
        <section style={{ padding:"100px 0", background:"#fff", position:"relative", overflow:"hidden" }}>
          {/* giant watermark */}
          <div
            aria-hidden
            style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontSize:"clamp(52px,11vw,150px)", fontWeight:900, color:"rgba(95,155,245,0.045)", letterSpacing:"-0.03em", whiteSpace:"nowrap", userSelect:"none", pointerEvents:"none", lineHeight:1, textAlign:"center" }}
          >
            ADVANCED LABORATORY
          </div>

          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 40px", position:"relative", zIndex:1 }}>
            <div className="lab-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>

              {/* LEFT — text */}
              <motion.div {...fadeUp(0)}>
                <BadgePill label="QUALITY" />
                <h2
                  className="serif"
                  style={{ fontSize:"clamp(22px,2.8vw,38px)", lineHeight:1.28, marginBottom:18, color:"#1a1a2e" }}
                >
                  Advanced Laboratory for{" "}
                  <span style={{ color:BLUE }}>Global Quality Standards.</span>
                </h2>
                <p style={{ fontSize:14, color:"#555", lineHeight:1.78, marginBottom:32 }}>
                  To stay at the forefront of scientific testing and certification, the SAGOSERVE Laboratory is equipped with state-of-the-art analytical instruments that bring international-level precision to its operations.
                </p>

                {[
                  {
                    title: "ICP-MS (Inductively Coupled Plasma Mass Spectrometry)",
                    body:  "The ICP-MS instrument enables precise detection of trace elements and heavy metals such as lead, cadmium, arsenic, and mercury at extremely low levels (parts per billion). This technology ensures that tapioca sago and starch products meet strict national and international food safety standards, supporting reliable quality assurance and global competitiveness.",
                  },
                  {
                    title: "Protein Analyzer",
                    body:  "This instrument accurately measures the protein content in samples, which is essential for nutritional profiling. It helps validate the nutritional value of sago-based products and ensures compliance with international food labeling and health standards, strengthening the reputation of Salem Sago as a safe and nutritious food ingredient.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity:0, x:-18 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ delay:0.15 + i * 0.14, duration:0.6 }}
                    style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:22 }}
                  >
                    <CheckCircle2 size={17} color={BLUE} style={{ flexShrink:0, marginTop:3 }} />
                    <div>
                      <div style={{ fontSize:13.5, fontWeight:700, color:"#1a1a2e", marginBottom:6 }}>{item.title}</div>
                      <p style={{ fontSize:13, color:"#555", lineHeight:1.72 }}>{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* RIGHT — 3D lab image */}
              <motion.div {...fadeUp(0.18)} style={{ position:"relative" }}>
                <div style={{ background:"linear-gradient(140deg,#edf3ff,#dce8fc)", borderRadius:24, padding:28, boxShadow:"0 20px 72px rgba(95,155,245,0.12)" }}>
                  <img src="/lab-3d.png" alt="Advanced Laboratory equipment" style={{ width:"100%", borderRadius:12, display:"block" }} />
                </div>
                {/* floating NABL badge */}
                <motion.div
                  animate={{ y:[0,-8,0] }}
                  transition={{ duration:3.2, repeat:Infinity, ease:"easeInOut" }}
                  style={{ position:"absolute", bottom:-18, left:-18, background:"#fff", borderRadius:16, padding:"12px 18px", boxShadow:"0 8px 32px rgba(0,0,0,0.11)", display:"flex", alignItems:"center", gap:12 }}
                >
                  <div style={{ width:40, height:40, borderRadius:"50%", background:`${BLUE}18`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <FlaskConical size={19} color={BLUE} />
                  </div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:700, color:"#1a1a2e" }}>NABL Accredited</div>
                    <div style={{ fontSize:11, color:"#888" }}>ISO/IEC 17025:2017</div>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

           

        {/* ══════════════════════════════════════════════════════
            6. Certifications & Recognitions
        ══════════════════════════════════════════════════════ */}
        <section style={{ padding:"96px 0", background:"#fff" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 40px" }}>

            <motion.div {...fadeUp(0)} style={{ textAlign:"center", marginBottom:52 }}>
              <h2
                className="serif"
                style={{ fontSize:"clamp(24px,3.5vw,44px)", fontWeight:700, color:"#1a1a2e", marginBottom:10 }}
              >
                Certifications &amp; <span style={{ color:BLUE }}>Recognitions</span>
              </h2>
              <p style={{ color:"#666", maxWidth:500, margin:"0 auto", fontSize:14 }}>
                Recognitions that reflect our commitment to quality, compliance and global standards.
              </p>
              <div style={{ width:52, height:3, background:BLUE, borderRadius:4, margin:"18px auto 0" }} />
            </motion.div>

            <div
              className="cert-grid"
              style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:22 }}
            >
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  className="cert-card"
                  initial={{ opacity:0, y:28 }}
                  whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }}
                  transition={{ delay:i * 0.1, duration:0.62 }}
                  style={{ gridColumn:`span ${cert.span}`, background:"#f7f9fc", border:"1px solid #e4eaf5", borderRadius:18, padding:"26px 22px" }}
                >
                  <div style={{ width:50, height:50, borderRadius:13, background:`${BLUE}14`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:21, marginBottom:16 }}>
                    {cert.icon}
                  </div>
                  <h3 style={{ fontSize:14.5, fontWeight:700, color:"#1a1a2e", marginBottom:4 }}>{cert.title}</h3>
                  <p style={{ fontSize:11.5, color:BLUE, fontWeight:700, marginBottom:10 }}>{cert.subtitle}</p>
                  <p style={{ fontSize:13, color:"#666", lineHeight:1.62 }}>{cert.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════
            8. Roll of Honour — dark section
        ══════════════════════════════════════════════════════ */}
        <section style={{ padding:"96px 0", background:"#0b0f1a", position:"relative", overflow:"hidden" }}>
          {/* ambient glow */}
          <div style={{ position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)", width:540, height:540, background:`${BLUE}0c`, borderRadius:"50%", filter:"blur(100px)", pointerEvents:"none" }} />

          <div style={{ maxWidth:1000, margin:"0 auto", padding:"0 40px", position:"relative", zIndex:1 }}>

            <motion.div {...fadeUp(0)} style={{ marginBottom:6 }}>
              <span style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid rgba(255,255,255,0.14)", borderRadius:999, padding:"5px 18px 5px 12px", marginBottom:20 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:BLUE, display:"block" }} />
                <span style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.5)", letterSpacing:"0.18em", textTransform:"uppercase" as const }}>RECIPES</span>
              </span>
            </motion.div>

            <motion.div {...fadeUp(0.08)} style={{ marginBottom:16 }}>
              <h2
                className="serif"
                style={{ fontSize:"clamp(26px,4vw,50px)", fontWeight:700, color:"#fff", marginBottom:14 }}
              >
                Roll of <span style={{ color:BLUE }}>Honor</span>
              </h2>
              <p style={{ color:"rgba(255,255,255,0.48)", maxWidth:540, fontSize:14, lineHeight:1.72 }}>
                We proudly honor the leaders and members whose dedication, vision, and service have contributed to the growth and success of SAGOSERVE. Their leadership has strengthened the cooperative and the sago industry over the years, leaving a legacy that continues to inspire our commitment to quality, fairness, and progress.
              </p>
              <div style={{ width:52, height:3, background:BLUE, borderRadius:4, marginTop:20 }} />
            </motion.div>

            {/* Current leader highlight */}
            <motion.div
              {...fadeUp(0.16)}
              style={{ display:"flex", justifyContent:"center", margin:"44px 0" }}
            >
              <div style={{ display:"flex", alignItems:"center", gap:20, background:"rgba(255,255,255,0.06)", border:`1px solid ${BLUE}40`, borderRadius:18, padding:"16px 30px" }}>
                <div style={{ width:48, height:48, borderRadius:"50%", background:`${BLUE}22`, border:`2px solid ${BLUE}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>
                  👤
                </div>
                <div>
                  <div style={{ fontSize:14.5, fontWeight:700, color:"#fff" }}>Tmt. Keerthy Priyadharshini, DRO</div>
                  <div style={{ fontSize:12, color:BLUE, fontWeight:600, marginTop:3 }}>19.07.2024 – PRESENT</div>
                </div>
              </div>
            </motion.div>

            {/* Table */}
            <motion.div
              {...fadeUp(0.22)}
              style={{ borderRadius:22, overflow:"hidden", border:`1px solid ${BLUE}1e`, boxShadow:`0 0 60px ${BLUE}12` }}
            >
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:`linear-gradient(90deg,${BLUE},#3b82f6)` }}>
                    {["Name", "From", "To"].map(h => (
                      <th
                        key={h}
                        style={{ padding:"15px 20px", color:"#fff", fontSize:11.5, fontWeight:700, textAlign:"left", letterSpacing:"0.14em", textTransform:"uppercase" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {honourData.map((row, i) => (
                    <motion.tr
                      key={i}
                      className="honour-row"
                      initial={{ opacity:0, x:-28 }}
                      whileInView={{ opacity:1, x:0 }}
                      viewport={{ once:true }}
                      transition={{ delay:i * 0.09, duration:0.52 }}
                      style={{ borderTop:`1px solid ${BLUE}12`, transition:"background 0.22s", cursor:"default" }}
                    >
                      <td style={{ padding:"15px 20px", color:"#fff", fontWeight:600, fontSize:14 }}>{row.name}</td>
                      <td style={{ padding:"15px 20px", color:"rgba(255,255,255,0.46)", fontSize:14 }}>{row.from}</td>
                      <td style={{ padding:"15px 20px", fontSize:14, fontWeight:600 }}>
                        {row.to === "PRESENT"
                          ? <span style={{ color:BLUE }}>{row.to}</span>
                          : <span style={{ color:"rgba(255,255,255,0.6)" }}>{row.to}</span>
                        }
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

          </div>
        </section>

        {/* <TestimonialsSection /> */}
        <Footer />
      </div>
    </>
  );
}