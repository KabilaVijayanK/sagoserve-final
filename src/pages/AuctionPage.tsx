import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Gavel,
  Clock,
  TrendingUp,
  ShieldCheck,
  Users,
  ChevronDown,
  CheckCircle,
  FlaskConical,
  Radio,
  Handshake,
} from "lucide-react";
import heroBg from "@/assets/hero-sago.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
interface LotData {
  id: number;
  product: string;
  grade: string;
  quantity: string;
  base: number;
  current: number;
  time: number;
  status: string;
}

const demoLots: LotData[] = [
  { id: 1, product: "Premium Sago", grade: "A1", quantity: "10 Tons", base: 3200, current: 3450, time: 180, status: "LIVE" },
  { id: 2, product: "Tapioca Starch", grade: "A", quantity: "5 Tons", base: 2800, current: 2950, time: 0, status: "CLOSED" },
  { id: 3, product: "Broken Sago", grade: "B", quantity: "8 Tons", base: 2400, current: 2500, time: 400, status: "UPCOMING" },
];

const steps = [
  { icon: CheckCircle, label: "Register", desc: "Create your verified account" },
  { icon: FlaskConical, label: "Quality Testing", desc: "Lots tested & graded" },
  { icon: Radio, label: "Live Bidding", desc: "Compete in real-time" },
  { icon: Handshake, label: "Settlement", desc: "Transparent & fair" },
];

const insights = [
  { icon: TrendingUp, title: "Avg Winning Price", value: "+8%" },
  { icon: Users, title: "Active Members Today", value: "142" },
  { icon: ShieldCheck, title: "Verified Lots", value: "100%" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" + s : s}`;
};

const AuctionPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [lots, setLots] = useState(demoLots);
  const [selectedLot, setSelectedLot] = useState<LotData | null>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [flashId, setFlashId] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLots((prev) =>
        prev.map((lot) => {
          if (lot.status !== "LIVE") return lot;
          if (lot.time <= 1) return { ...lot, status: "CLOSED", time: 0 };
          return { ...lot, time: lot.time - 1 };
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);
const scrollToAuction = () => {
  const section = document.getElementById("auction-board");
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
  const handleBidSubmit = () => {
    if (!selectedLot) return;
    const newBid = Number(bidAmount);
    if (newBid <= selectedLot.current) {
      alert("Bid must be higher than current price");
      return;
    }

    setLots((prev) =>
      prev.map((lot) => {
        if (lot.id === selectedLot.id) {
          return { ...lot, current: newBid, time: lot.time <= 10 ? lot.time + 15 : lot.time };
        }
        return lot;
      })
    );

    setFlashId(selectedLot.id);
    setTimeout(() => setFlashId(null), 700);
    setSelectedLot(null);
    setBidAmount("");
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
  {/* ===== HERO ===== */}
<section
  ref={heroRef}
  className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
>
  {/* VIDEO BACKGROUND */}
  <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
    <video
      src="/service1.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="h-full w-full object-cover"
    />
  </motion.div>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

  {/* CONTENT */}
  <motion.div
    className="relative z-10 text-center px-6 max-w-3xl mx-auto"
    style={{ opacity: heroOpacity }}
  >
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      custom={0}
      className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm px-5 py-2 mb-8"
    >
      <Gavel className="h-4 w-4 text-accent" />
      <span className="text-sm font-medium text-primary-foreground">
        SAGOSERVE E-Auction
      </span>
    </motion.div>

    <motion.h1
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      custom={1}
      className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight tracking-tight"
    >
      E-Auction
    </motion.h1>

    <motion.p
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      custom={2}
      className="mt-5 text-lg sm:text-xl text-primary-foreground/80 max-w-xl mx-auto leading-relaxed"
    >
      Transparent. Competitive. Fair Price Discovery.
    </motion.p>

    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      custom={3}
      className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
    >
      <button
        onClick={scrollToAuction}
        className="inline-flex items-center justify-center gap-2
                   bg-yellow-500 text-black
                   font-semibold px-8 py-3.5
                   rounded-xl
                   transition-all duration-300
                   hover:scale-105 hover:bg-yellow-400
                   active:scale-100"
      >
        <Gavel className="h-4 w-4" />
        View Live Auctions
      </button>

      <Link to="/register/member" className="inline-flex items-center justify-center gap-2
                   bg-white text-black
                   font-semibold px-8 py-3.5
                   rounded-xl
                   transition-all duration-300
                   hover:scale-105 hover:bg-gray-100
                   active:scale-100">
        <CheckCircle className="h-4 w-4" />
        Register Now
      </Link>

     
    </motion.div>
  </motion.div>

  {/* Scroll indicator */}
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
    animate={{ y: [0, 8, 0] }}
    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
  >
    <ChevronDown className="h-6 w-6 text-primary-foreground/60" />
  </motion.div>
</section>
      {/* ===== HOW IT WORKS - BLACK EDITION ===== */}
<section className="relative py-28 px-6 bg-black text-white overflow-hidden">

  {/* Subtle Glow Effect */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 blur-[140px] rounded-full" />

  <div className="relative max-w-6xl mx-auto">

    {/* SECTION HEADING */}
    <div className="text-center mb-20">
      <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
        How It <span className="text-yellow-400">Works</span>
      </h2>
      <p className="text-white/60 max-w-2xl mx-auto">
        A transparent and structured e-auction process designed to ensure fair price discovery and competitive bidding.
      </p>
      <div className="w-24 h-[3px] bg-yellow-500 mx-auto mt-6 rounded-full" />
    </div>

    {/* STEPS GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={i}
          whileHover={{ y: -8 }}
          className="relative group p-8 rounded-2xl 
                     bg-[#111111]
                     border border-white/10
                     hover:border-yellow-500/40
                     transition-all duration-500
                     text-center"
        >

          {/* Step Number Badge */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 
                          w-10 h-10 rounded-full 
                          bg-yellow-500 text-black 
                          flex items-center justify-center 
                          font-bold shadow-lg">
            {String(i + 1).padStart(2, "0")}
          </div>

          {/* Icon */}
          <div className="mt-6 mb-6 flex items-center justify-center">
            <div className="w-16 h-16 rounded-xl 
                            bg-yellow-500/10
                            flex items-center justify-center
                            group-hover:scale-110
                            transition-transform duration-300">
              <step.icon className="h-7 w-7 text-yellow-400" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold mb-3 text-white">
            {step.label}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/60 leading-relaxed">
            {step.desc}
          </p>

        </motion.div>
      ))}

    </div>
  </div>
</section>

 {/* ===== LIVE AUCTION BOARD - PREMIUM BLUE ===== */}
<section
  id="auction-board"
  className="relative py-28 px-6 
             bg-gradient-to-br from-[#0b1b3a] via-[#132c63] to-[#1e40af] 
             text-white overflow-hidden"
>

  {/* Background Glow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[180px] rounded-full" />

  <div className="relative max-w-6xl mx-auto">

    {/* Header Block */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={0}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm font-semibold text-green-300 uppercase tracking-wider">
          Live Now
        </span>
      </div>

      <h2 className="font-display text-4xl md:text-5xl font-bold">
        Live <span className="text-yellow-400">Auction Board</span>
      </h2>

      <div className="w-24 h-[3px] bg-yellow-400 mx-auto mt-6 rounded-full" />
    </motion.div>


    {/* ===== DESKTOP TABLE ===== */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={1}
      className="hidden lg:block 
                 rounded-2xl 
                 bg-white/5 backdrop-blur-xl
                 border border-white/10
                 shadow-[0_30px_80px_rgba(0,0,0,0.4)]
                 overflow-hidden"
    >
      <table className="w-full text-left">

        {/* HEADER */}
        <thead>
          <tr className="bg-white/10 border-b border-white/10">
            {["Lot", "Product", "Grade", "Qty", "Base (₹)", "Current (₹)", "Time", "Status", "Action"].map((h) => (
              <th
                key={h}
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/70"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {lots.map((lot) => (
            <tr
              key={lot.id}
              className="border-b border-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <td className="px-6 py-4 font-semibold text-white">
                #{lot.id}
              </td>

              <td className="px-6 py-4 font-medium text-white">
                {lot.product}
              </td>

              <td className="px-6 py-4 text-white/60">
                {lot.grade}
              </td>

              <td className="px-6 py-4 text-white/60">
                {lot.quantity}
              </td>

              <td className="px-6 py-4 text-white/60">
                ₹{lot.base.toLocaleString()}
              </td>

              <td className="px-6 py-4 font-bold text-yellow-400 text-lg">
                ₹{lot.current.toLocaleString()}
              </td>

              <td className="px-6 py-4">
                <span className={`font-mono text-sm ${
                  lot.status === "LIVE"
                    ? "text-green-300 font-semibold"
                    : "text-white/40"
                }`}>
                  {lot.status === "LIVE" ? formatTime(lot.time) : "—"}
                </span>
              </td>

              <td className="px-6 py-4">
                <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                  lot.status === "LIVE"
                    ? "bg-green-500/20 text-green-300 border border-green-400/30"
                    : lot.status === "CLOSED"
                    ? "bg-gray-600/20 text-gray-400 border border-gray-500/20"
                    : "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                }`}>
                  {lot.status}
                </span>
              </td>

              <td className="px-6 py-4">
                {lot.status === "LIVE" ? (
                  <button
                    onClick={() => setSelectedLot(lot)}
                    className="px-5 py-2 text-sm font-semibold 
                               bg-yellow-500 text-black 
                               rounded-xl
                               hover:bg-yellow-400
                               hover:scale-105
                               transition-all duration-300"
                  >
                    Place Bid
                  </button>
                ) : (
                  <span className="text-white/30">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>


    {/* ===== MOBILE CARDS ===== */}
    <div className="lg:hidden space-y-6 mt-8">
      {lots.map((lot) => (
        <div
          key={lot.id}
          className="bg-white/5 backdrop-blur-xl 
                     border border-white/10 
                     rounded-2xl p-6"
        >
          <div className="flex justify-between mb-4">
            <div>
              <h3 className="font-semibold text-white">
                {lot.product}
              </h3>
              <p className="text-xs text-white/50">
                Lot #{lot.id} · {lot.grade}
              </p>
            </div>

            <span className="text-xs font-bold uppercase text-blue-300">
              {lot.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="block text-white/50">Base</span>
              ₹{lot.base.toLocaleString()}
            </div>
            <div>
              <span className="block text-white/50">Current</span>
              <span className="text-yellow-400 font-bold">
                ₹{lot.current.toLocaleString()}
              </span>
            </div>
          </div>

          {lot.status === "LIVE" && (
            <button
              onClick={() => setSelectedLot(lot)}
              className="w-full py-2.5 bg-yellow-500 text-black 
                         font-semibold rounded-xl 
                         hover:bg-yellow-400 transition"
            >
              Place Bid
            </button>
          )}
        </div>
      ))}
    </div>

  </div>
</section>
      {/* ===== BID MODAL ===== */}
     <AnimatePresence>
  {selectedLot && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/70 backdrop-blur-md px-4"
      onClick={() => setSelectedLot(null)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl 
                   bg-[#0f172a] 
                   border border-white/10 
                   p-8 text-white shadow-2xl"
      >
        <h3 className="text-xl font-bold mb-6">
          Place Bid — Lot #{selectedLot.id}
        </h3>

        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <span className="block text-sm text-white/50">
            Current Price
          </span>
          <span className="text-3xl font-bold text-yellow-400">
            ₹{selectedLot.current.toLocaleString()}
          </span>
        </div>

        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder={`Min ₹${(selectedLot.current + 1).toLocaleString()}`}
          className="w-full border border-white/10 rounded-xl px-4 py-3 mb-6 
                     bg-white/5 text-white placeholder:text-white/50 
                     focus:ring-2 focus:ring-yellow-400 outline-none"
        />

        <button
          onClick={handleBidSubmit}
          className="w-full py-3.5 font-semibold rounded-xl 
                     bg-yellow-500 text-black
                     hover:bg-yellow-400 transition"
        >
          Confirm Bid
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* ===== TRANSPARENCY ===== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
          >
            No Middlemen.{" "}
            <span className="text-gradient-gold">Only Fair Market Value.</span>
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            SAGOSERVE ensures transparent bidding, verified lots, and real-time price discovery for every participant.
          </motion.p>
        </div>
      </section>

     {/* ===== INSIGHTS ===== */}
<section className="py-16 px-6 bg-white">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">

    {insights.map((item, i) => (
      <motion.div
        key={item.title}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={i}
        whileHover={{ y: -6 }}
        className="flex flex-col items-center text-center
                   p-8
                   bg-[#f9fafb]
                   border border-gray-200
                   rounded-2xl
                   hover:shadow-xl
                   transition-all duration-300"
      >
        {/* ICON */}
        <div className="flex items-center justify-center 
                        w-12 h-12 
                        rounded-lg 
                        bg-yellow-100 
                        mb-4">
          <item.icon className="h-5 w-5 text-yellow-600" />
        </div>

        {/* VALUE */}
        <span className="text-3xl sm:text-4xl font-bold text-gray-900 font-display">
          {item.value}
        </span>

        {/* TITLE */}
        <span className="mt-1 text-xs text-gray-500 uppercase tracking-widest">
          {item.title}
        </span>

      </motion.div>
    ))}

  </div>
</section>

      {/* ===== CTA ===== */}
<section className="py-24 px-6 bg-black">
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    custom={0}
    className="max-w-4xl mx-auto text-center 
               bg-gradient-to-r from-gray-900 to-black
               border border-white/10
               rounded-2xl
               p-12 sm:p-16"
  >
    <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-8">
      Ready to Participate in the Next Auction?
    </h2>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to="/register/member" className="inline-flex items-center justify-center gap-2
                   bg-yellow-500 text-black
                   font-semibold px-8 py-3.5
                   rounded-xl
                   transition-all duration-300
                   hover:scale-105 hover:bg-gray-100
                   active:scale-100">
        <CheckCircle className="h-4 w-4" />
        Register Now
      </Link>

      <button
        className="inline-flex items-center justify-center 
                   px-8 py-3.5 
                   rounded-xl 
                   font-semibold 
                   border border-white/30 
                   text-white
                   hover:bg-white/10 
                   transition-all duration-300"
      >
        View Upcoming Lots
      </button>
    </div>
  </motion.div>
</section>

      <Footer />
   
    </div>
  );
};

export default AuctionPage;
