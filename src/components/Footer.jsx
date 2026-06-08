import { useState } from "react";
import { NavLink } from "react-router-dom";
import { usePopup } from "../context/PopupContext";

export default function Footer() {
  const { showPopup } = usePopup();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setTimeout(() => {
      showPopup(`Successfully subscribed ${email} to our newsletter!`, "success");
      setEmail("");
      setSubmitting(false);
    }, 800);
  };

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/17zG3oSPaT/?mibextid=wwXIfr",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/svarpfoundation?igsh=NDg0MzFmZmI2ZnI0&utm_source=qr",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-primary text-white border-t border-white/5 relative overflow-hidden">
      {/* Visual Ambient Element */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <NavLink to="/" className="inline-block group">
            <div className="flex items-center gap-3">
              <img
                src="/company/svarp-logo.webp"
                alt="SVARP Global"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-lg tracking-wider font-bold">SVARP</span>
                <span className="text-[9px] text-accent tracking-[0.2em] font-semibold">GLOBAL</span>
              </div>
            </div>
          </NavLink>
          <p className="text-xs opacity-75 leading-relaxed text-slate-300 max-w-sm">
            Fostering safety culture, environmental sustainability, and community resilience through training workshops, audits, and youth empowerment.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 pt-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-accent hover:border-accent hover:bg-white/10 transition-all duration-300"
                aria-label={`Follow us on ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-4 sm:mb-5">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { name: "About Us", path: "/about" },
              { name: "Our Team", path: "/team" },
              { name: "Services", path: "/projects" },
              { name: "Careers & Jobs", path: "/careers" },
              { name: "Reports & Documents", path: "/reports" },
              { name: "Contact Us", path: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className="text-slate-300 hover:text-accent transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info Column */}
        <div>
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-4 sm:mb-5">
            HQ Contact
          </h3>
          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex gap-2.5 items-start">
              <span className="text-accent">📍</span>
              <p className="leading-relaxed">
                A-200, Shatabdi Nagar, Sector 2, MDA, Meerut, UP – 250103, India
              </p>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-white/5">
              <a href="mailto:info@svarp.org" className="flex items-center gap-2 hover:text-accent transition">
                <span>✉️</span> info@svarp.org
              </a>
              <a href="tel:+919917759966" className="flex items-center gap-2 hover:text-accent transition">
                <span>📞</span> +91-9917759966
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription Column */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider">
            Newsletter
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Stay updated with our latest safety campaigns, EHS audits, and community drives.
          </p>
          
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-accent text-primary font-bold py-2.5 rounded-xl text-xs hover:bg-white hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-accent/10 disabled:opacity-50"
            >
              {submitting ? "Subscribing..." : "Subscribe Now"}
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Copyright and Verification Note */}
      <div className="border-t border-white/5 py-6 px-4 text-center text-xs text-slate-400 space-y-1 bg-black/10">
        <p>© {new Date().getFullYear()} SVARP Global. All rights reserved.</p>
        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
          EHS & Safety Leadership Compliance Initiatives
        </p>
      </div>
    </footer>
  );
}
