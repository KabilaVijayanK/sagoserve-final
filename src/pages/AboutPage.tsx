import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Gavel,
  Megaphone,
  Warehouse,
  HandCoins,
  FlaskConical,
  ChevronDown,
  MapPin,
  Users,
  Building2,
  Eye,
  Target,
  Sprout,
  Handshake,
} from "lucide-react";
import heroBg from "/hero-bg.jpg";
import tamilnaduMap from "/tamilnadu-map.png";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";
const services = [
  {
    icon: Gavel,
    title: "E-Auction",
    points: ["Transparency", "Competitive Nature", "Making available the right price"],
  },
  {
    icon: Megaphone,
    title: "Marketing",
    points: ["Direct wholesale marketing of sago and starch products"],
  },
  {
    icon: Warehouse,
    title: "Warehouse",
    points: ["Own warehouse – 10", "Private warehouse – 6"],
  },
  {
    icon: HandCoins,
    title: "Loan",
    points: ["Advance Payment to members"],
  },
  {
    icon: FlaskConical,
    title: "NABL Accredited Lab",
    points: [
      "Sago – 11 Parameters (As per FSSAI)",
      "Starch – 3 Parameters",
    ],
  },
];

const districts = [
  { name: "Salem", count: 196 },
  { name: "Namakkal", count: 127 },
  { name: "Dharmapuri", count: 20 },
  { name: "Kallakurichi", count: 7 },
  { name: "Villupuram", count: 3 },
  { name: "Erode", count: 3 },
  { name: "Perambalur", count: 3 },
  { name: "Trichy", count: 1 },
  { name: "Thiruvannamalai", count: 1 },
];

const visionCards = [
  { icon: Eye, title: "Direct Market Access", desc: "Ensuring members receive fair prices without middleman interference." },
  { icon: Target, title: "Fair Trade", desc: "Creating transparent marketing channels that protect our members." },
  { icon: Sprout, title: "Support & Growth", desc: "Credit, marketing & warehousing support for sustainable development." },
  { icon: Handshake, title: "Cooperative Values", desc: "Integrity, transparency and unity for collective prosperity." },
];

const honourData = [
  { name: "Thiru.N.Natarajan", from: "18-06-81", to: "30-04-84" },
  { name: "Thiru.C.Subramanian", from: "01-05-84", to: "31-05-85" },
  { name: "Thiru.N.Chandrasekaran", from: "01-06-85", to: "30-06-90" },
  { name: "Thiru.K.Ramasamy", from: "01-07-90", to: "31-12-95" },
  { name: "Tmt.R.KEERTHY PRIYADHARSHINI, DRO", from: "19-07-24", to: "PRESENT" },
];

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    
    <div ref={ref} className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="font-serif text-4xl md:text-5xl font-semibold text-foreground"
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-6 mx-auto h-1 w-20 rounded-full bg-primary origin-left"
      />
    </div>
  );
};

const CountUp = ({ target }: { target: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {target}
        </motion.span>
      ) : (
        0
      )}
    </motion.span>
  );
};

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-background text-foreground overflow-hidden">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center">
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0 bg-cover bg-center"
        >
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </motion.div>
        {/* GRADIENT DEPTH OVERLAY */}
<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold text-primary-foreground leading-[1.1]">
              About{" "}
              <span className="text-gradient-gold">SAGOSERVE</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-lg md:text-xl text-primary-foreground/70 font-light tracking-wide"
          >
            Salem Starch and Sago Manufacturers' Service Industrial Co-operative Society Ltd
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex justify-center gap-12 text-primary-foreground"
          >
            {[
              { label: "Members", value: "361" },
              { label: "Merchants", value: "183" },
              { label: "Since", value: "1981" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/50 mt-1 uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 z-10"
        >
          <ChevronDown className="w-8 h-8 text-primary-foreground/40" />
        </motion.div>
      </section>

{/* ===== HISTORY - FIXED SPACING ===== */}
<section className="pt-32 pb-20 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      <h2 className="font-serif text-4xl md:text-5xl leading-tight">
        A Journey Since{" "}
        <span className="text-gradient-gold">1981</span>
      </h2>

      <div className="h-1 w-16 bg-primary rounded-full" />

      <p className="text-[16px] leading-relaxed text-gray-700">
        Welcome to Sagoserve, a cooperative society with a rich history of empowering the starch and sago manufacturers of Salem. Our journey began in 1981, when the industry faced numerous challenges in accessing fair credit and marketing opportunities.
      </p>

      <p className="text-[16px] leading-relaxed text-gray-700">
        Back then, manufacturers were often underpaid by merchants, with middlemen taking advantage of the absence of organized support.
      </p>

      <p className="text-[16px] leading-relaxed text-gray-700">
        Registered on <strong>July 21, 1981</strong>, and commencing operations on <strong>February 27, 1982</strong>, Sagoserve quickly became a beacon of hope and progress for the local industry.
      </p>

      <p className="text-[16px] leading-relaxed text-gray-700">
        Through our efforts, we established robust marketing channels, reliable credit facilities, and secure warehousing options.
      </p>

      <p className="font-semibold text-gray-900 pt-3 border-t">
        We proudly work with 361 members and 183 merchants.
      </p>

      <p className="italic text-primary font-medium">
        Thank you for being part of our journey.
      </p>
    </motion.div>

    {/* RIGHT IMAGE */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mt-8 lg:mt-0"
    >
      <div className="rounded-3xl overflow-hidden shadow-2xl">
        <img
          src="/warehouse.jpg"
          alt="Sagoserve History"
          className="w-full h-[360px] md:h-[440px] object-cover"
        />
      </div>
    </motion.div>

  </div>
</section>

{/* ===== OUR VISION - CENTER LUXURY LAYOUT ===== */}
<section className="relative py-32 bg-[#0b0b12] overflow-hidden">

  {/* Subtle Gold Glow Background */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[140px] rounded-full" />

  <div className="relative max-w-6xl mx-auto px-6">

    {/* Center Heading */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-20"
    >
      <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
        Our Vision
      </h2>

      <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        To empower starch and sago manufacturers by providing direct market access,
        eliminating middlemen, and fostering sustainable growth.
      </p>

      <div className="w-32 h-[2px] bg-gradient-to-r from-yellow-500 to-yellow-300 mx-auto mt-8 rounded-full" />
    </motion.div>


    {/* Cards Grid - 2 per row */}
    <div className="grid md:grid-cols-2 gap-12">

      {visionCards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.15 }}
          whileHover={{ y: -10, scale: 1.03 }}
          className="relative p-10 rounded-3xl 
                     bg-white/5 backdrop-blur-xl
                     border border-yellow-500/20
                     hover:border-yellow-400
                     hover:shadow-[0_0_60px_rgba(255,215,0,0.15)]
                     transition-all duration-500"
        >

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl 
                          bg-gradient-to-br from-yellow-500/20 to-yellow-300/10
                          flex items-center justify-center mb-8">
            <card.icon className="w-8 h-8 text-yellow-400" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-semibold text-white mb-4">
            {card.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed text-lg">
            {card.desc}
          </p>

        </motion.div>
      ))}

    </div>

  </div>
</section>

     {/* ===== SERVICES - CONTINUOUS BLUE SCROLL ===== */}
<section className="relative py-28 bg-gradient-to-br from-[#0f172a] via-[#14213d] to-[#1e3a8a] overflow-hidden">

  {/* Heading */}
  <div className="text-center mb-16">
    <h2 className="text-5xl font-serif font-bold text-white mb-4">
      Our Services
    </h2>
    <p className="text-blue-200 max-w-2xl mx-auto">
      Comprehensive support across every aspect of the sago industry.
    </p>
  </div>

 

  {/* Marquee */}
  <div className="relative w-full overflow-hidden">
    <motion.div
      className="flex gap-10 w-max"
      animate={{ x: ["0%", "-50%"] }}
      transition={{
        repeat: Infinity,
        duration: 30,
        ease: "linear",
      }}
    >
      {[...services, ...services].map((service, i) => (
        <div
          key={i}
          className="min-w-[340px] p-8 rounded-3xl 
                     bg-white/10 backdrop-blur-xl
                     border border-white/20
                     hover:border-blue-300
                     hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]
                     transition-all duration-500"
        >
          <service.icon className="w-10 h-10 text-blue-200 mb-6" />

          <h3 className="text-xl font-semibold text-white mb-4">
            {service.title}
          </h3>

          <ul className="space-y-2">
            {service.points.map((point, idx) => (
              <li key={idx} className="text-blue-100 text-sm">
                • {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  </div>
  </section>

{/* ===== CERTIFICATIONS - PREMIUM WHITE ===== */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
        Certifications & Recognitions
      </h2>
      <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm">
        Recognitions that reflect our commitment to quality, compliance and global standards.
      </p>
      <div className="w-20 h-[3px] bg-blue-600 mx-auto mt-5 rounded-full" />
    </div>

    {/* GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">

      {[
        {
          icon: "🌍",
          title: "Geographical Indication (GI)",
          subtitle: "Salem Sago (Javvarusi)",
          desc: "Registered on 31.03.2023 recognizing authenticity of Salem Sago.",
        },
        {
          icon: "®",
          title: "Trademark Registration",
          subtitle: "SAGOSERVE SAGO",
          desc: "Registered on 20.12.2024 ensuring brand protection.",
        },
        {
          icon: "🧪",
          title: "NABL Accreditation",
          subtitle: "ISO/IEC 17025:2017",
          desc: "Accredited on 30.08.2018 confirming testing standards.",
        },
        {
          icon: "📦",
          title: "APEDA Registration",
          subtitle: "RCMC/APEDA/18441/2025–2026",
          desc: "Authorised for export participation.",
        },
        {
          icon: "🌐",
          title: "Importer–Exporter Code",
          subtitle: "AAAAS2151B",
          desc: "Authorising SAGOSERVE for international trade.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -6 }}
          className={`
            ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}
            bg-gray-50
            border border-gray-200
            rounded-2xl
            p-6
            hover:shadow-xl
            transition-all duration-300
          `}
        >

          {/* Icon */}
          <div className="w-12 h-12 flex items-center justify-center 
                          bg-blue-100 
                          text-blue-600 
                          text-xl 
                          rounded-lg 
                          mb-4">
            {item.icon}
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {item.title}
          </h3>

          {/* Subtitle */}
          <p className="text-blue-600 text-xs font-medium mb-3">
            {item.subtitle}
          </p>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {item.desc}
          </p>

        </motion.div>
      ))}

    </div>

  </div>
</section>
      {/* ===== INDUSTRIES WE SERVE ===== */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={tamilnaduMap}
              alt="Tamil Nadu Districts Map"
              className="w-full max-w-md mx-auto rounded-2xl"
            />
          </motion.div>

          <div>
            <SectionHeading>Industries We Serve</SectionHeading>
            <div className="space-y-3">
              {districts.map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-card transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-foreground font-medium">{d.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    <CountUp target={d.count} />
                  </span>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-6 pt-4 border-t border-border flex items-center justify-between px-4"
              >
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span className="font-serif text-lg font-semibold text-foreground">Total (up to 31/08/2024)</span>
                </div>
                <span className="text-2xl font-bold text-gradient-gold">361</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
{/* ===== ROLL OF HONOUR - BLUE EDITION ===== */}
<section className="relative py-28 bg-[#0b0f19] overflow-hidden">
  <div className="max-w-5xl mx-auto px-6">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-20"
    >
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
        Roll of Honour
      </h2>
      <p className="text-gray-400 max-w-xl mx-auto">
        Leaders who shaped our cooperative's legacy.
      </p>

      {/* Blue Accent Line */}
      <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-400 mx-auto mt-6 rounded-full" />
    </motion.div>

    {/* Table Wrapper */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="rounded-3xl overflow-hidden 
                 border border-blue-500/20 
                 bg-white/5 backdrop-blur-xl
                 shadow-[0_0_60px_rgba(37,99,235,0.15)]"
    >
      <table className="w-full text-left">

        {/* Head */}
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white">
            <th className="p-5 text-sm uppercase tracking-wider font-semibold">
              Name
            </th>
            <th className="p-5 text-sm uppercase tracking-wider font-semibold">
              From
            </th>
            <th className="p-5 text-sm uppercase tracking-wider font-semibold">
              To
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {honourData.map((row, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border-t border-blue-500/10 
                         hover:bg-blue-500/10 
                         transition-all duration-300"
            >
              <td className="p-5 text-white font-medium">
                {row.name}
              </td>

              <td className="p-5 text-gray-400">
                {row.from}
              </td>

              <td className="p-5 font-semibold">
                {row.to === "PRESENT" ? (
                  <span className="text-blue-400">
                    {row.to}
                  </span>
                ) : (
                  <span className="text-gray-300">
                    {row.to}
                  </span>
                )}
              </td>

            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>

  </div>
</section>
      <Navbar />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
