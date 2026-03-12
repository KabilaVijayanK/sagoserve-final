import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "SAGOSERVE has transformed how we do business. The transparency and fair pricing have been game-changers for our factory.",
    author: "Rajesh Kumar",
    role: "Sago Manufacturer",
  },
  {
    quote:
      "Being a member for 15 years, I've witnessed the growth and positive impact on our farming community.",
    author: "Lakshmi Devi",
    role: "Tapioca Farmer",
  },
  {
    quote:
      "The auction system is incredibly efficient. We always get the best quality products at fair market prices.",
    author: "Mohammed Farooq",
    role: "Starch Trader",
  },
  {
    quote:
      "Quality testing facilities give us confidence in every transaction we make.",
    author: "Sunita Patel",
    role: "Processing Unit Owner",
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
    filter: "blur(6px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.96,
    filter: "blur(6px)",
  }),
};

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setActive((p) => (p + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setActive((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  };

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-semibold mb-16"
        >
          Customer <span className="font-light">Voices:</span>
          <span className="block">Hear What They Say!</span>
        </motion.h2>

        {/* DOTS */}
        <div className="flex justify-center gap-5 mb-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > active ? 1 : -1);
                setActive(i);
              }}
              className={`relative w-4 h-4 rounded-full transition-all
                ${active === i ? "bg-amber-500 scale-125" : "bg-gray-300"}
              `}
            >
              {active === i && (
                <span className="absolute inset-0 rounded-full animate-ping bg-amber-400/40" />
              )}
            </button>
          ))}
        </div>

        {/* TESTIMONIAL */}
        <div className="relative max-w-3xl mx-auto">

          {/* QUOTE ICON */}
          <motion.div
            key={active}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center mb-6"
          >
            <Quote className="w-12 h-12 text-amber-500" />
          </motion.div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                “{testimonials[active].quote}”
              </p>

              <p className="font-semibold text-gray-900">
                {testimonials[active].author}
              </p>
              <p className="text-sm text-gray-500">
                {testimonials[active].role}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* ARROWS */}
          <div className="flex justify-between items-center mt-14">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-gray-100 hover:scale-110 transition"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-gray-100 hover:scale-110 transition"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;