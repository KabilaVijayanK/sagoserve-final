import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import farmLandscape from "@/assets/farm-landscape.jpg";

const TapiocaHighlight = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* 🌿 PARALLAX */
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* 🌄 BACKGROUND IMAGE */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <img
          src={farmLandscape}
          alt="Tapioca Farm"
          className="w-full h-full object-cover"
        />

        {/* DARK GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/10" />
      </motion.div>

      {/* 📝 CONTENT */}
      <div className="relative z-10 w-full px-12 lg:px-24">
        <div className="max-w-3xl">
          {/* SMALL LABEL */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-[#d8c2ad] tracking-[4px] text-xs mb-6 uppercase"
          >
            At the heart of our operations
          </motion.p>

          {/* BIG HEADING */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="
              font-serif
              text-[clamp(52px,6.5vw,96px)]
              leading-[1.05]
              text-[#f5e7d4]
              mb-8
            "
          >
            Tapioca
            <br />
            <span className="text-[#c08a5b]">
              and its finished products
            </span>
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-[#e6d3c2]/80 text-lg leading-relaxed max-w-xl"
          >
            We work closely with farmers, processors, and buyers across regions
            to ensure the highest quality tapioca products reach every market.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default TapiocaHighlight;
