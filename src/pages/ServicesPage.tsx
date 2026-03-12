import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import weighbridgeImg from "@/assets/weighbridge.jpg";
import godownImg from "@/assets/godown.jpg";
import labImg from "@/assets/lab.jpg";
import eauctionImg from "@/assets/eauction.jpg";
import heroVideo from "@/assets/hero-video.mp4";
import Footer from "@/components/Footer";
/* ── Scroll-reveal ─────────────────────────────────────── */
const Reveal = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const initial =
    direction === "left"
      ? { opacity: 0, x: -60 }
      : direction === "right"
      ? { opacity: 0, x: 60 }
      : { opacity: 0, y: 50 };

  const animate = inView ? { opacity: 1, x: 0, y: 0 } : {};

  return (
    
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Feature row (alternating image + text) ────────────── */
interface ServiceSectionProps {
  tag: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  reverse?: boolean;
  children?: ReactNode;
}

const ServiceSection = ({
  tag,
  title,
  description,
  features,
  image,
  reverse = false,
  children,
}: ServiceSectionProps) => (
  <div
    className={`flex flex-col ${
      reverse ? "lg:flex-row-reverse" : "lg:flex-row"
    } items-center gap-12 lg:gap-20`}
  >
    {/* Image */}
    <Reveal
      direction={reverse ? "right" : "left"}
      className="w-full lg:w-1/2"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full aspect-[4/3] object-cover img-premium"
        />
        {/* Gold accent bar */}
        <div
          className={`absolute -bottom-3 ${
            reverse ? "-right-3" : "-left-3"
          } w-24 h-1.5 rounded-full gold-line`}
        />
      </div>
    </Reveal>

    {/* Text */}
    <Reveal
      direction={reverse ? "left" : "right"}
      delay={0.15}
      className="w-full lg:w-1/2"
    >
      <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
        {tag}
      </span>
      <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-tight mb-5">
        {title}
      </h2>
      <p className="text-muted-foreground text-lg leading-relaxed mb-8">
        {description}
      </p>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-foreground/80">{f}</span>
          </li>
        ))}
      </ul>
      {children}
    </Reveal>
  </div>
);

/* ── Stat pill ─────────────────────────────────────────── */
const Stat = ({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) => (
  <Reveal delay={delay}>
    <div className="text-center">
      <p className="font-display text-4xl md:text-5xl text-primary">{value}</p>
      <p className="text-muted-foreground text-sm mt-2 tracking-wide uppercase">
        {label}
      </p>
    </div>
  </Reveal>
);

/* ── Param tag ─────────────────────────────────────────── */
const ParamTag = ({ text, index }: { text: string; index: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="inline-flex items-center border rounded-full px-4 py-2 text-sm bg-card text-foreground/80"
    >
      {text}
    </motion.span>
  );
};

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════ */
const ServicesPage = () => {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
        <Navbar />
      {/* ── HERO ──────────────────────────────────────────── */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">

  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover scale-105"
  >
    <source src={heroVideo} type="video/mp4" />
  </video>

  {/* Strong Gradient Overlay for Clear Text */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

  {/* Content */}
  <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-32 pb-20">

    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 mb-6"
    >
      SAGOSERVE
    </motion.span>

    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-white drop-shadow-2xl"
    >
      Services &{" "}
      <span className="italic text-amber-400">Infrastructure</span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-gray-200 leading-relaxed"
    >
      Strong Infrastructure. Reliable Operations.
      <br className="hidden sm:block" />
      Built to Support the Sago Ecosystem.
    </motion.p>

    <motion.div
      className="mx-auto mt-10 h-[2px] w-20 bg-amber-400"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    />

  </div>
</section>
{/* ── STATS BAR ─────────────────────────────────────── */}
<section className="relative -mt-20 z-15">
  <div className="max-w-6xl mx-auto px-6">
    <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl border border-gray-100 py-10 px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

      <Stat value="10+" label="Owned Godowns" delay={0} />
      <Stat value="2.19L" label="Sq.ft Coverage" delay={0.1} />
      <Stat value="60 MT" label="Max Weighbridge Capacity" delay={0.2} />
      <Stat value="11" label="Lab Test Parameters" delay={0.3} />

    </div>
  </div>
</section>

      {/* ── WEIGHBRIDGE - PREMIUM WHITE REDESIGN ───────────────── */}
<section className="relative py-28 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">

    <div className="grid lg:grid-cols-2 gap-20 items-center">
{/* LEFT - PREMIUM ALIGNED IMAGE */}
<motion.div
  initial={{ opacity: 0, x: -60 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="relative w-full"
>
  {/* Decorative Frame */}
  <div className="absolute -top-5 -left-5 w-full h-full 
                  border-2 border-blue-200/70
                  rounded-[28px]
                  z-0" />

  {/* Image Container */}
  <div className="relative z-10 
                  rounded-[28px] 
                  overflow-hidden 
                  aspect-[16/10]
                  shadow-[0_30px_80px_rgba(0,0,0,0.15)]">

    <img
      src="/wight.jpg"
      alt="Weighbridge"
      className="w-full h-full object-cover 
                 transition duration-700 
                 hover:scale-105"
    />

  </div>
</motion.div>

      {/* RIGHT - CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >

        <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
          Precision Weighing
        </span>

        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
          Weighbridge Excellence
        </h2>

        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          SAGOSERVE Weighbridge Services – Precision You Can Trust.
          Built for speed, accuracy, and seamless documentation.
        </p>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 gap-6">

          {[
            "Two High-Capacity Weighbridges – 50 MT & 60 MT",
            "Instant E-way Bill & E-invoice generation",
            "Affordable pricing – ₹0.40 per bag for members",
            "Smooth, hassle-free weighing and documentation",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 bg-gray-50 rounded-2xl 
                         border border-gray-100
                         hover:shadow-lg
                         transition-all duration-300"
            >
              <p className="text-gray-700 font-medium text-sm">
                {item}
              </p>
            </motion.div>
          ))}

        </div>

      </motion.div>

    </div>
  </div>
</section>
      {/* ── GODOWN ────────────────────────────────────────── */}
<section className="py-24 md:py-32 bg-[#0b0f19] px-6
  [&_.text-muted-foreground]:text-white/80
  [&_.text-foreground\/80]:text-white/90
  [&_.text-primary]:text-blue-400
">
  <div className="max-w-6xl mx-auto text-white">
    <ServiceSection
      tag="Storage Solutions"
      title="Godown Services"
      description="SAGOSERVE operates 10 owned godowns covering 2.19 lakh Sq.ft with a storage capacity of 2.17 lakh 90kg bags. Additionally, 6 rental godowns are available."
      features={[
        "Members: Rent starts at ₹1.50 per bag per week",
        "Insurance up to 1 year – ₹1 per bag",
        "Merchants: First 5 days – Free storage",
        "Competitive rates after the 5th day",
      ]}
      image="/ware.jpg"
      reverse
    />
  </div>
</section>
{/* ── TESTING LAB - FULL HERO + CONTENT ───────────────────── */}
<section className="relative overflow-hidden">

  {/* HERO SECTION */}
  <div className="relative min-h-[90vh] flex items-center overflow-hidden">

    {/* Background */}
    <div
      className="absolute inset-0 bg-cover bg-center scale-105"
      style={{ backgroundImage: `url(${labImg})` }}
    />

    {/* Overlay */}
   <div className="absolute inset-0 bg-gradient-to-b from-[#0b1e3c]/95 via-[#0b1e3c]/90 to-[#0b1e3c]/85" />
    {/* Content */}
    <div className="relative z-10 max-w-6xl mx-auto px-6 text-white py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-2xl"
      >
        <span className="uppercase tracking-[0.3em] text-xs text-blue-300 font-semibold">
          Quality Assurance
        </span>

        <h2 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          SAGOSERVE Testing Laboratory
        </h2>

        <p className="mt-8 text-lg md:text-xl text-white/80 leading-relaxed">
          Established August 10, 2009. NABL Accredited on August 30, 2018
          as per ISO/IEC 17025:2015 standards.
        </p>

       
      </motion.div>
    </div>
  </div>

  {/* FEATURE STRIP */}
  <div className="bg-white py-20">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
      {[
        "NABL Accredited Laboratory",
        "FSSAI Norms Compliant Testing",
        "IS Standard Starch Analysis",
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -6 }}
          className="p-10 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-300 text-center"
        >
          <CheckCircle2 className="w-8 h-8 text-blue-600 mx-auto mb-6" />
          <h4 className="text-lg font-semibold text-gray-900">
            {item}
          </h4>
        </motion.div>
      ))}
    </div>
  </div>
{/* PARAMETERS SECTION - PREMIUM SPLIT DESIGN */}
<div className="bg-white py-28">
  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24">

    {/* 11 PARAMETERS - CARD MATRIX STYLE */}
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-3xl font-bold text-gray-900 mb-12">
        Sago Testing – 11 Parameters
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {[
          "pH","Crude Fiber","Colour Test","Total Ash",
          "Insoluble Ash","Protein","SO₂",
          "Optical Whitener","HCN Acid",
          "Starch","Moisture",
        ].map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -6 }}
            className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg text-center font-medium text-gray-700 transition-all duration-300"
          >
            {t}
          </motion.div>
        ))}
      </div>
    </motion.div>


    {/* 3 PARAMETERS - PREMIUM PANEL STYLE */}
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="relative rounded-3xl overflow-hidden shadow-2xl"
    >

      {/* Blue Accent Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600" />

      <div className="relative p-14 text-white">
        <h3 className="text-3xl font-bold mb-12">
          Starch Testing – 3 Parameters
        </h3>

        <div className="space-y-8">
          {["Starch Content","Moisture","Viscosity"].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ x: 8 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-10 py-6 text-xl font-semibold"
            >
              {t}
            </motion.div>
          ))}
        </div>
      </div>

    </motion.div>

  </div>
</div>
</section>
     {/* ── E-AUCTION - PREMIUM REDESIGN ───────────────────── */}
<section className="pt-12 pb-28 bg-gradient-to-br from-gray-50 to-white px-6 -mt-10">
  <div className="max-w-7xl mx-auto">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* IMAGE SIDE */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <img
          src={eauctionImg}
          alt="E-Auction"
          className="w-full rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.1)]"
        />
      </motion.div>

      {/* CONTENT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="uppercase tracking-[0.25em] text-xs text-blue-600 font-semibold">
          Digital Trading
        </span>

        <h2 className="mt-6 text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
          E-Auction Facility
        </h2>

        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          Fully equipped e-tender hall with 25 desktops, ergonomic furniture,
          and high-speed internet connectivity.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-5 mt-10">
          {[
            "Increased Transparency",
            "Wider Market Reach",
            "Cost Efficiency & Convenience",
            "Support for Small Farmers",
            "User-Friendly Interface",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 text-sm font-medium text-gray-700"
            >
              {item}
            </motion.div>
          ))}
        </div>

      </motion.div>

    </div>
  </div>
</section>
     {/* ── CTA - PREMIUM BLACK EDITION ───────────────────────── */}
<section className="relative py-32 px-6 bg-black overflow-hidden">

  {/* Subtle Glow Background */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.15),transparent_70%)]" />

  <div className="relative max-w-5xl mx-auto text-center text-white">

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >

      {/* Tag */}
      <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 mb-6">
        Get in Touch
      </span>

      {/* Heading */}
      <h2 className="text-4xl md:text-6xl font-bold leading-tight">
        Supporting Processors, Farmers &
        <span className="block text-blue-400 mt-2">
          Entrepreneurs
        </span>
      </h2>

      {/* Divider */}
      <div className="w-24 h-[2px] bg-blue-500 mx-auto mt-8 rounded-full" />

      {/* Description */}
      <p className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
        Building the Future of the Sago Industry with Sustainability,
        Quality and Trust.
      </p>

      {/* Button */}
      <Link to="/contact">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="mt-12 inline-flex items-center gap-3 
                     bg-gradient-to-r from-blue-600 to-indigo-600 
                     px-10 py-5 rounded-full text-lg font-semibold 
                     shadow-[0_15px_40px_rgba(37,99,235,0.4)] 
                     hover:shadow-[0_20px_60px_rgba(37,99,235,0.6)]
                     transition-all duration-300"
        >
          Contact Us
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </Link>

    </motion.div>

  </div>

</section>
      <Footer />
    </div>
  );
};

export default ServicesPage;
