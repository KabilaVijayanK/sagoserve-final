import { motion } from "framer-motion";
import warehouseImg from "@/assets/warehouse.jpg";
import { ShieldCheck, Users, TrendingUp, Award, Sparkles } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="bg-white py-32 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* 🔥 CENTER TOP PILL WITH SIDE LINES */}
        <div className="flex items-center justify-center gap-6 mb-20">

          <div className="hidden sm:block h-[1px] w-32 bg-gradient-to-r from-transparent to-gray-900" />

          <div className="
            px-8 py-2.5
            rounded-full
            border border-gray-900
            text-sm
            tracking-widest
            font-medium
            text-gray-700
            whitespace-nowrap
          ">
            WHO WE ARE · LEARN ABOUT US
          </div>

          <div className="hidden sm:block h-[1px] w-32 bg-gradient-to-l from-transparent to-gray-900" />

        </div>

        {/* 🔥 MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">

         {/* LEFT TEXT */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="flex flex-col justify-center"
>

  {/* 🔹 Small Highlight Line */}
  <span className="
    inline-block
    text-sm
    font-semibold
    tracking-wider
    uppercase
    text-gray-500
    mb-4
  ">
    Strength. Transparency. Growth.
  </span>

  <h2 className="
    text-[36px] md:text-[42px]
    font-semibold
    text-gray-900
    leading-tight
    mb-6
    max-w-xl
  ">
    Empowering the <br />
    Tapioca Industry
  </h2>

  <p className="
    text-gray-600
    text-lg
    leading-relaxed
    max-w-lg
    mb-8
  ">
    Salem Starch and Sago Manufacturers’ Service Industrial
    Cooperative Society Ltd. strengthens the sago and starch
    industry through transparent trade systems, quality assurance,
    and cooperative growth.
  </p>

  {/* 🔹 CTA Button */}
  <div>
    <button className="
      px-7 py-3
      bg-gray-900
      text-white
      text-sm
      font-medium
     
      hover:bg-gray-800
      transition-all
      duration-300
      shadow-md
      hover:shadow-lg
    ">
      Get Started 
    </button>
  </div>

</motion.div>

          {/* RIGHT IMAGE */}
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.9 }}
  viewport={{ once: true }}
  className="relative h-full group"
>
  <div className="
    rounded-3xl
    overflow-hidden
    shadow-[0_30px_80px_rgba(0,0,0,0.08)]
    h-full
    min-h-[420px]
  ">

    {/* Subtle Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10"></div>

    <img
      src="hero-about.jpg"
      alt="Sagoserve Warehouse"
      className="
        w-full h-full object-cover
        transition-transform duration-700
        group-hover:scale-105
      "
    />
  </div>
</motion.div>

        </div>

        {/* 🔥 TRUST LINE */}
        <div className="mt-28 text-center">
          <p className="text-gray-500 text-sm tracking-wide">
            Salem – trusted hub for world-class sago and starch.
          </p>
        </div>

        {/* 🔥 PREMIUM VALUE STRIP WITH ICONS */}
        <div className="mt-16 relative overflow-hidden">

          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-16 items-center whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 28,
              ease: "linear",
            }}
          >
            {[
              { text: "Quality and Fair Pricing", icon: ShieldCheck },
              { text: "Cooperative Strength", icon: Users },
              { text: "Sustainable Growth", icon: TrendingUp },
              { text: "Trusted Quality", icon: Award },
              { text: "Collective Progress", icon: Sparkles },
            ]
              .concat([
                { text: "Quality and Fair Pricing", icon: ShieldCheck },
                { text: "Cooperative Strength", icon: Users },
                { text: "Sustainable Growth", icon: TrendingUp },
                { text: "Trusted Quality", icon: Award },
                { text: "Collective Progress", icon: Sparkles },
              ])
              .map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="
                      flex items-center gap-3
                      text-gray-900
                      text-lg
                      font-medium
                      hover:text-black
                      transition
                    "
                  >
                    <Icon className="w-5 h-5 text-blue-600" />
                    {item.text}
                  </div>
                );
              })}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;