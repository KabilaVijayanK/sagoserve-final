import { motion } from "framer-motion";

const lines = [
  "Salem’s Sago Industry",
  "Cooperative Strength",
  "Farmers and Manufacturers",
  "Members’ Interests",
  "Merchants and Trade",
  "Quality and Fair Pricing",
  "Sustainable Industrial Growth",
];

const IntroDividerText = () => {
  return (
    <section className="w-full bg-[#f6f4f1] overflow-hidden">
      <div className="max-w-7xl mx-auto py-3 px-6">
        <motion.div
          className="
            flex gap-12 whitespace-nowrap
            text-sm md:text-base
            font-medium
            text-[#222]
          "
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 40, // slow & smooth
            ease: "linear",
          }}
        >
          <span className="font-semibold">
            SAGOSERVE – Empowering
          </span>

          {[...lines, ...lines].map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IntroDividerText;
