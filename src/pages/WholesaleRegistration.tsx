import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WholesaleRegistration = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-6xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl"
        >
          {/* Heading */}
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] text-amber-400 uppercase">
              JOIN WITH US
            </p>
            <h1 className="text-3xl md:text-4xl font-serif text-white mt-3">
              Explore Whole Sale
            </h1>
          </div>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">

            <Input label="Applicant Name and Firm Address" />

            <Select
              label="Name of the product and Requirement"
              options={["Sago", "Starch", "Broken"]}
            />

            <Select
              label="Product Quality type"
              options={["First Quality", "Second Quality", "Third Quality"]}
            />

            <Select
              label="Purpose of Purchase"
              options={["Food", "Textiles", "Pharmaceuticals", "Others"]}
            />

            <Input label="Required Quantity (Only in tons – Minimum 2.5 Tons)" />
            <Input label="TN GST No." />
            <Input label="FSSAI No." />
            <Input label="Aadhar card & PAN Number" />
            <Input label="Contact Number" />
            <Input label="E mail id" />

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 mt-10">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 border border-white/20 py-3 rounded-xl text-white hover:bg-white/10 transition"
            >
              ← Back
            </button>

            <button className="flex-1 bg-amber-500 py-3 rounded-xl text-black font-semibold hover:bg-amber-400 transition shadow-lg">
              Submit
            </button>
          </div>

        </motion.div>
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default WholesaleRegistration;


/* ---------------- Reusable Components ---------------- */

const Input = ({ label }: { label: string }) => (
  <div>
    <label className="block text-sm mb-2 text-gray-300">
      {label}
    </label>
    <input
      type="text"
      placeholder={label}
      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500 outline-none transition"
    />
  </div>
);

const Select = ({
  label,
  options,
}: {
  label: string;
  options: string[];
}) => (
  <div>
    <label className="block text-sm mb-2 text-gray-300">
      {label}
    </label>
    <select
      className="w-full bg-gray-800 text-white border border-white/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition"
    >
      <option className="text-black">Select {label}</option>
      {options.map((opt, i) => (
        <option key={i} className="text-black">
          {opt}
        </option>
      ))}
    </select>
  </div>
);