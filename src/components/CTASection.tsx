import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08]);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* VIDEO */}
      <motion.video
        style={{ y, scale }}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </motion.video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* FILM GRAIN */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(https://grainy-gradients.vercel.app/noise.svg)",
        }}
      />

      {/* 🎬 CINEMATIC FADE TO FOOTER */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#0b0f1a]" />

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <p className="uppercase tracking-[4px] text-amber-400 mb-6">
          Quality matters?
        </p>

        <h2 className="text-[clamp(48px,7vw,96px)] font-serif text-white mb-6">
          STOP COMPROMISING
        </h2>

        <h3 className="text-3xl md:text-4xl text-amber-400 mb-12">
          START SAGOSERVE.
        </h3>

        <Link to="/contact" className="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 px-10 py-4 rounded-full text-white shadow-xl hover:scale-105 transition">
          Contact Us
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
