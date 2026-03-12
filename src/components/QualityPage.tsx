import { motion } from "framer-motion";

const QualityPage = () => {
  return (
    <section className="min-h-screen bg-white py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">

        {/* QUALITY PROMISE TAG */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-blue-600 font-semibold tracking-widest text-sm mb-8"
        >
          OUR QUALITY PROMISE
        </motion.p>

        {/* MAIN HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-[42px] md:text-[56px] leading-tight mb-6 text-gray-900"
        >
          Pure Tapioca transformed into <br />
          <span className="text-blue-600">
            World-Class Sago & Starch
          </span>
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-600 text-lg mb-20"
        >
          Every batch tested. Every gram trusted.
        </motion.p>

        {/* LEGACY SECTION */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-blue-600 font-semibold tracking-widest text-sm mb-6"
        >
          OUR LEGACY
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-[38px] md:text-[52px] text-gray-900 mb-6 leading-tight"
        >
          Over <span className="text-blue-600">45 Years</span> of Service to <br />
          the Tapioca Industry
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[#8b5e34] text-lg"
        >
          Built on cooperative strength, transparency and trust.
        </motion.p>

      </div>
    </section>
  );
};

export default QualityPage;