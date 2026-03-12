import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sagoProducts = [
  {
    title: "Tapioca Sago",
    desc: "Standardized tapioca sago with consistent pearl formation and high swelling capacity suitable for domestic and export markets.",
    image: "/hero1.jpg",
  },
  {
    title: "Tapioca Nylon",
    desc: "Premium steam-processed variety with superior transparency and expansion properties preferred by snack manufacturers.",
    image: "/hero2.jpg",
  },
  {
    title: "Tapioca Mothithana",
    desc: "Traditional refined tapioca product valued for purity and digestibility.",
    image: "/prd1.jpeg",
  },
  {
    title: "Tapioca Pearl",
    desc: "Refined starch pearls offering smooth texture and translucent appearance after cooking.",
    image: "/prd2.jpg",
  },
  {
    title: "Tapioca Broken",
    desc: "Granulated form with high digestibility used in porridge and snacks.",
    image: "/prd3.jpg",
  },
];

const starchProducts = [
  {
    title: "Dryer Tapioca Starch",
    desc: "Stable moisture content with improved storage life, ideal for food and industrial use.",
    image: "/stats-bg.jpg",
  },
  {
    title: "Native Tapioca Starch",
    desc: "Natural white starch with excellent binding and thickening properties.",
    image: "/hero1.jpg",
  },
  {
    title: "Grinded Tapioca Starch",
    desc: "Fine particle starch for precision food and industrial formulations.",
    image: "/prd1.jpeg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
};

const ProductCard = ({ product, i }: any) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    custom={i}
    whileHover={{ y: -6 }}
    className="group bg-white rounded-2xl overflow-hidden
               border border-gray-200
               shadow-sm hover:shadow-2xl
               transition-all duration-500"
  >
    {/* IMAGE */}
    <div className="relative overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-[230px] object-cover
                   transition duration-700
                   group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
    </div>

    {/* CONTENT */}
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {product.title}
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        {product.desc}
      </p>

      {/* BUTTON ROW */}
      <div className="flex items-center justify-between">
        <Link to="/products" className="inline-block px-5 py-2.5
                           bg-amber-500 text-white
                           text-sm font-medium
                           rounded-lg
                           hover:bg-amber-600
                           transition duration-300">
          Get Started
        </Link>

        <button className="flex items-center gap-2
                           text-sm font-medium
                           text-gray-800
                           group-hover:gap-3
                           transition-all duration-300">
          Learn More
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

const ProductsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar />

      {/* HERO */}
      <section className="pt-24 pb-12 text-center bg-white">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="font-serif text-4xl md:text-5xl"
        >
          SAGOSERVE <span className="text-amber-500">Products</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="mt-4 text-base text-gray-600 max-w-2xl mx-auto"
        >
          Chemical-free, quality-tested tapioca sago and starch products
          manufactured under strict standards.
        </motion.p>
      </section>

      {/* SAGO PRODUCTS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-center mb-8">
            Tapioca Sago Varieties
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sagoProducts.map((product, i) => (
              <ProductCard key={i} product={product} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* STARCH PRODUCTS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-center mb-8">
            Tapioca Starch Varieties
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {starchProducts.map((product, i) => (
              <ProductCard key={i} product={product} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
          Bulk Orders & Export Enquiries
        </h2>

        <p className="mt-3 text-gray-600 text-base max-w-2xl mx-auto">
          SAGOSERVE connects domestic and export traders with verified
          manufacturers ensuring transparency and quality.
        </p>

        <Link to="/contact" className="inline-block mt-6 px-8 py-3
                           bg-amber-500
                           text-white
                           rounded-lg
                           hover:bg-amber-600
                           transition shadow-md">
          Contact Us
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;