import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const UniqueIdeasHoverSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // 🎬 CLEAN SCROLL EFFECT
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section
      ref={ref}
      className="
        relative
        -mt-28
        z-20
        px-6
      "
    >
      <motion.div
        style={{ y, scale, opacity }}
        className="
          w-full
          bg-[#0f0f0f]
          text-white
          rounded-xl
          px-16 py-16
          text-center
        "
      >
        {/* TOP LINE */}
        <p className="text-xs text-white/60 mb-5">
          We help organizations navigate their most critical moments
        </p>

        {/* MAIN HEADING */}
        <h2 className="text-[52px] leading-[1.1] font-semibold">
          <span className="text-white">We help </span>
          <span className="text-white/40">organizations </span>
          <br />
          <span className="text-white/40">navigate </span>
          <span className="text-white">
            their most fragile moments.
          </span>
        </h2>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/services"
            className="
              group
              inline-flex items-center gap-3
              bg-[#f4b41a]
              text-black
              px-8 py-4
              text-sm
              font-semibold
              transition
              shadow-[0_0_25px_rgba(244,180,26,0.45)]
              hover:scale-105
            "
          >
            What We Do
            <span
              className="
                w-7 h-7
                bg-black text-white
                flex items-center justify-center
                transition
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default UniqueIdeasHoverSection;