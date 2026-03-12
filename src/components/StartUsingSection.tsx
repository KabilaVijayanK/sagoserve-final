import { motion } from "framer-motion";
import { UserPlus, Radio, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    desc: "Create your account and get verified access to SAGOSERVE.",
    href: "/register/member",
  },
  {
    icon: Radio,
    title: "Live Auctions",
    desc: "Participate in real-time transparent auctions.",
    href: "/auction",
  },
  {
    icon: ShoppingBag,
    title: "Products",
    desc: "Explore premium sago & starch products.",
    href: "/products",
  },
];

const StartUsingSection = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* DARK PANEL */}
        

          {/* subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-700/10 via-transparent to-transparent" />

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20 relative"
          >
            <span className="uppercase tracking-[4px] text-amber-600 text-xs block mb-4">
              Quick Access
            </span>

            <h2 className="font-serif text-[44px] leading-tight text-black mb-4">
              Seamless Access to{" "}
              <span className="text-amber-600">SAGOSERVE</span>
            </h2>

            <p className="text-black/60 text-sm">
              A premium gateway to the regulated tapioca marketplace.
            </p>
          </motion.div>

          {/* CARDS */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((s, i) => (
              <Link
                key={i}
                to={s.href}
                className="
                  block
                  bg-[#111]
                  rounded-2xl
                  p-8
                  border border-white/5
                  shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                  hover:border-amber-600/40
                  transition
                  group
                "
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                >
                  <div className="w-14 h-14 rounded-xl bg-amber-600/10 flex items-center justify-center mb-6">
                    <s.icon className="w-7 h-7 text-amber-600" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {s.title}
                  </h3>

                  <p className="text-sm text-white/60 leading-relaxed mb-6">
                    {s.desc}
                  </p>

                  <span className="inline-flex items-center gap-2 text-amber-600 text-sm font-medium">
                    Discover <ArrowRight size={16} />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>

      </div>
    </section>
  );
};

export default StartUsingSection;