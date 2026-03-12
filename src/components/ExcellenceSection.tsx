import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ExcellenceSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="py-32 lg:py-48 overflow-hidden bg-primary">
      {/* BACKGROUND MOVING TEXT */}
      <motion.div style={{ x }} className="whitespace-nowrap">
        <h2 className="heading-xl text-primary-foreground/10 inline-block">
          Excellence • Quality • Integrity • Progress • Excellence • Quality • Integrity • Progress •
        </h2>
      </motion.div>

      <div className="container-editorial mt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="heading-lg text-primary-foreground mb-6">
              Excellence
            </h3>

            <p className="body-lg text-primary-foreground/75 max-w-lg leading-relaxed">
              Excellence is achieved through a strong commitment to quality,
              transparency, and cooperative values. Organized marketing,
              scientific warehousing, and strict quality control ensure
              consistent standards across the industry.
            </p>

            <p className="body-lg text-primary-foreground/75 max-w-lg mt-6 leading-relaxed">
              Fair trade practices safeguard the interests of farmers, members,
              and merchants. These collective efforts strengthen Salem’s sago
              and starch industry and enhance its recognition in global markets.
            </p>
          </motion.div>

          {/* RIGHT STATS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8"
          >
            <div className="text-center">
              <p className="heading-lg text-primary-foreground">50+</p>
              <p className="body-md text-primary-foreground/60 mt-2">
                Years of Service
              </p>
            </div>

            <div className="text-center">
              <p className="heading-lg text-primary-foreground">
                Assured
              </p>
              <p className="body-md text-primary-foreground/60 mt-2">
                Quality Standards
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExcellenceSection;
