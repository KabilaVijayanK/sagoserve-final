import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="bg-[#0b0f1a] text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">

          {/* LOGO + ABOUT */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="Sagoserve"
                className="w-9 h-9 object-contain"
              />
              <span className="text-white font-semibold text-xl">
                SAGOSERVE
              </span>
            </Link>

            <p className="text-white/60 leading-relaxed text-sm">
              Sagoserve was formed to address challenges such as
              inadequate credit facilities, unorganized marketing,
              lack of warehousing infrastructure, and exploitation
              by middlemen.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-lg">
              Quick Links
            </h4>

            <ul className="space-y-3 text-white/60 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-lg">
              Services
            </h4>

            <ul className="space-y-3 text-white/60 text-sm">
              <li>Lab Testing</li>
              <li>E-Auction</li>
              <li>Market Pricing</li>
              <li>Member Support</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-lg">
              Contact
            </h4>

            <div className="space-y-4 text-white/60 text-sm">

              <div className="flex gap-3">
                <MapPin size={16}/>
                <p>Salem, Tamil Nadu 636001</p>
              </div>

              <div className="flex gap-3">
                <Phone size={16}/>
                <p>+91 98765 43210</p>
              </div>

              <div className="flex gap-3">
                <Mail size={16}/>
                <p>info@sagoserve.com</p>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">

          <p>© 2025 SAGOSERVE. All rights reserved.</p>

          <div className="flex gap-6">
            <a className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </a>
            <a className="hover:text-white transition cursor-pointer">
              Terms & Conditions
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;