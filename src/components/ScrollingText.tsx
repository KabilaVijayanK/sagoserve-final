import { motion } from "framer-motion";

const ScrollingText = () => {
  return (
    <div className="relative overflow-hidden bg-[#1f2933] py-4">
      <motion.div
        className="flex whitespace-nowrap text-white text-sm md:text-base font-medium tracking-wide"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* DUPLICATE CONTENT FOR SEAMLESS LOOP */}
        <span className="mx-8">
          PREMIUM TAPIOCA • CHEMICAL FREE SAGO • QUALITY STARCH PRODUCTS •
        </span>
        <span className="mx-8">
          PREMIUM TAPIOCA • CHEMICAL FREE SAGO • QUALITY STARCH PRODUCTS •
        </span>
        <span className="mx-8">
          PREMIUM TAPIOCA • CHEMICAL FREE SAGO • QUALITY STARCH PRODUCTS •
        </span>
      </motion.div>
    </div>
  );
};

export default ScrollingText;