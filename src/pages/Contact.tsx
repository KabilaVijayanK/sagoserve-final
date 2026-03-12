import { Phone, Mail, Globe, Clock, MapPin } from "lucide-react";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact: React.FC = () => {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-br from-[#0b1120] via-[#13274f] to-[#1e3a8a] pt-32 pb-20 px-6 min-h-screen text-white">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">
              Contact <span className="text-blue-400">SAGOSERVE</span>
            </h1>
            <p className="text-white/70 mt-4 text-lg max-w-3xl mx-auto">
              Salem Starch and Sago Manufacturers' Service Industrial Co-operative Society Ltd. (IND.No.1421)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">

            {/* LEFT INFO */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 space-y-8 shadow-xl">

              <h2 className="text-2xl font-semibold text-white">
                Get in Touch
              </h2>

              <div className="space-y-6 text-white/80">

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <Phone className="text-blue-400 mt-1" />
                  <span>
                    +91 99404 45416<br />
                    +91 94899 05441
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail className="text-blue-400 mt-1" />
                  <span>
                    sagoservemarketing@gmail.com<br />
                    slm_mdsago@yahoo.co.in
                  </span>
                </div>

                {/* Website */}
                <div className="flex items-start gap-4">
                  <Globe className="text-blue-400 mt-1" />
                  <span>www.sagoserve.co.in</span>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <Clock className="text-blue-400 mt-1" />
                  <span>Monday – Saturday | 9:30 AM – 5:30 PM</span>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin className="text-blue-400 mt-1" />
                  <span>
                    Omalur Main Road,<br />
                    Jagir Ammapalayam (Post),<br />
                    Salem – 636 302,<br />
                    Tamil Nadu, India
                  </span>
                </div>

              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-xl">
              <form className="space-y-6">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 
                             text-white placeholder:text-white/50
                             focus:ring-2 focus:ring-blue-400 outline-none"
                />

                <input
                  type="tel"
                  placeholder="Your Mobile Number"
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 
                             text-white placeholder:text-white/50
                             focus:ring-2 focus:ring-blue-400 outline-none"
                />

                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 
                             text-white placeholder:text-white/50
                             focus:ring-2 focus:ring-blue-400 outline-none"
                />

                <textarea
                  rows={5}
                  placeholder="Your Message"
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 
                             text-white placeholder:text-white/50
                             focus:ring-2 focus:ring-blue-400 outline-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 
                             text-white font-semibold py-4 
                             rounded-xl transition duration-300 shadow-lg"
                >
                  Send Message
                </button>

              </form>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Contact;