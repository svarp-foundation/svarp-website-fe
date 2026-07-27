import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61590402162054",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/svarpglobal/?hl=en",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/svarpglobal",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/svarpglobal",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-primary text-white border-t border-white/5 relative overflow-hidden py-8">
      {/* Visual Ambient Element */}
      <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand and Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <NavLink to="/" className="inline-block group">
            <div className="flex items-center gap-3">
              <img
                src="/company/svarp-logo.webp"
                alt="SVARP Global"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-base tracking-wider font-bold">SVARP</span>
                <span className="text-[8px] text-accent tracking-[0.2em] font-semibold">GLOBAL</span>
              </div>
            </div>
          </NavLink>
          <span className="hidden sm:inline text-slate-700">|</span>
          <p className="text-xs text-slate-400">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
        </div>

        {/* Right Side: Links, Contacts & Socials */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-xs text-slate-300 font-medium">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <NavLink to="/about" className="hover:text-accent transition-colors">{t("footer.about")}</NavLink>
            <NavLink to="/team" className="hover:text-accent transition-colors">{t("footer.team")}</NavLink>
            <NavLink to="/projects" className="hover:text-accent transition-colors">{t("footer.services")}</NavLink>
            <NavLink to="/careers" className="hover:text-accent transition-colors">{t("footer.careers")}</NavLink>
            <NavLink to="/contact" className="hover:text-accent transition-colors">{t("footer.contact")}</NavLink>
          </div>
          
          <span className="hidden md:inline text-slate-700">|</span>

          <div className="flex items-center gap-4">
            <a href="mailto:info@svarp.org" className="hover:text-accent transition-colors">info@svarp.org</a>
            <a href="tel:+919917759966" className="hover:text-accent transition-colors">+91-9917759966</a>
          </div>

          <span className="hidden md:inline text-slate-700">|</span>

          {/* Social Icons */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-accent transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
