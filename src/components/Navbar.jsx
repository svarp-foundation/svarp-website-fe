import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";

const APP_URL = import.meta.env.VITE_APP_URL || "https://globalacademy.svarp.org";

const linkClass = ({ isActive }) =>
  `relative transition ${
    isActive ? "text-accent after:w-full" : "hover:text-accent after:w-0"
  } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-accent after:transition-all text-center flex items-center gap-1`;

const dropdownItemClass = ({ isActive }) =>
  `block px-4 py-2 text-xs transition-colors ${
    isActive ? "text-accent bg-white/5" : "text-slate-300 hover:text-accent hover:bg-white/5"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  const isGlobalAcademy = location.pathname.startsWith("/global-academy") || location.pathname.startsWith("/courses") || location.pathname.startsWith("/course");

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const menuItems = [
    { name: t("nav.home"), path: "/" },
    {
      name: t("nav.about"),
      submenu: [
        { name: t("nav.aboutUs"), path: "/about" },
        { name: t("nav.ourTeam"), path: "/team" },
        { name: t("nav.certifications"), path: "/certifications" },
      ],
    },
    { name: t("nav.services"), path: "/projects" },
    {
      name: t("nav.community"),
      submenu: [
        { name: t("nav.membership"), path: "/membership" },
        { name: t("nav.careers"), path: "/careers" },
        { name: t("nav.events"), path: "/events" },
      ],
    },
    {
      name: t("nav.resources"),
      submenu: [
        { name: t("nav.gallery"), path: "/gallery" },
        { name: t("nav.stories"), path: "/stories" },
      ],
    },
    {
      name: t("nav.courses"),
      submenu: [
        { name: t("nav.globalAcademy"), path: "/global-academy" },
        { name: t("nav.coursesCatalog"), path: "/global-academy/catalog" },
        { name: t("nav.verifyCertificate"), path: "/global-academy/verify" },
      ],
    },
    {
      name: t("nav.store"),
      submenu: [
        { name: t("nav.svarpBodyWellness"), path: "https://bodywellness.svarp.org/" },
        { name: t("nav.productsCatalog"), path: "https://bodywellness.svarp.org/shop" },
      ],
    },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const isSubmenuActive = (submenu) => {
    return submenu.some((item) => location.pathname === item.path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="w-full max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center text-lg font-bold tracking-tight text-white gap-3 group"
          >
            <div className="relative">
              <img
                src="/company/svarp-logo.webp"
                alt="SVARP Global"
                className="h-12 max-md:h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex gap-1">
              <span className="text-xl tracking-wider">SVARP</span>
              <span className="text-xl tracking-wider text-accent">GLOBAL</span>
            </div>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-6 text-[11px] xl:text-[12px] font-semibold uppercase tracking-wider text-white">
            {menuItems.map((item) => (
              item.submenu ? (
                <div key={item.name} className="relative group py-2">
                  <button
                    className={`flex items-center gap-1 transition-colors hover:text-accent ${
                      isSubmenuActive(item.submenu) ? "text-accent" : ""
                    }`}
                  >
                    {item.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3.5 h-3.5 transition-transform group-hover:rotate-180"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <div className="bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden min-w-[180px] shadow-2xl">
                      {item.submenu.map((sub) => (
                        sub.path.startsWith("http") ? (
                          <a
                            key={sub.path}
                            href={sub.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={dropdownItemClass({ isActive: false })}
                          >
                            {sub.name}
                          </a>
                        ) : (
                          <NavLink
                            key={sub.path}
                            to={sub.path}
                            className={dropdownItemClass}
                          >
                            {sub.name}
                          </NavLink>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              ) : item.path.startsWith("http") ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative transition hover:text-accent after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-accent after:transition-all after:w-0 hover:after:w-full text-center flex items-center gap-1"
                >
                  {item.name}
                </a>
              ) : (
                <NavLink key={item.path} to={item.path} className={linkClass}>
                  {item.name}
                </NavLink>
              )
            ))}

            {/* Language Switcher Component */}
            <LanguageSwitcher variant="desktop" />

            {user ? (
              <NavLink
                to="/dashboard"
                className="relative group flex items-center justify-center"
                title="Dashboard"
              >
                <div className="w-9 h-9 rounded-full border-2 border-accent/30 p-0.5 group-hover:border-accent transition-all duration-300 overflow-hidden bg-zinc-800">
                  {user.profile_picture_path ? (
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${user.profile_picture_path}`}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-full h-full p-1 text-white group-hover:text-accent transition"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </div>
              </NavLink>
            ) : isGlobalAcademy ? (
              <div className="flex items-center gap-3">
                <a
                  href={`${APP_URL}/login`}
                  className="border border-white/20 text-white hover:border-accent hover:text-accent px-4 py-1.5 rounded-full font-semibold transition text-[11px] hover:scale-105 active:scale-95"
                >
                  {t("nav.login")}
                </a>
                <a
                  href={`${APP_URL}/register`}
                  className="bg-accent text-primary px-4 py-1.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/10 text-[11px]"
                >
                  {t("nav.register")}
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/login"
                  className="border border-white/20 text-white hover:border-accent hover:text-accent px-4 py-1.5 rounded-full font-semibold transition text-[11px] hover:scale-105 active:scale-95"
                >
                  {t("nav.login")}
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-accent text-primary px-4 py-1.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/10 text-[11px]"
                >
                  {t("nav.register")}
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Right Section */}
          <div className="flex lg:hidden items-center gap-4">
            {user && (
              <NavLink
                to="/dashboard"
                className="w-9 h-9 rounded-full border border-accent/30 p-0.5 overflow-hidden"
              >
                {user.profile_picture_path ? (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${user.profile_picture_path}`}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-full h-full p-1 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </NavLink>
            )}
            <button
              className="text-white focus:outline-none p-1"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "rotate-45 top-3" : "top-1"}`}></span>
                <span className={`absolute block w-6 h-0.5 bg-white transition-all duration-300 top-3 ${open ? "opacity-0" : "opacity-100"}`}></span>
                <span className={`absolute block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "-rotate-45 top-3" : "top-5"}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-x-0 top-[64px] sm:top-[72px] bottom-0 bg-zinc-950/95 backdrop-blur-2xl border-t border-white/10 transition-all duration-500 overflow-hidden ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <div className="px-4 py-4 space-y-3 text-white overflow-y-auto h-full pb-[env(safe-area-inset-bottom,20px)]">
          {menuItems.map((item) => (
            <div key={item.name} className="border-b border-white/5 last:border-0 pb-1">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    className="w-full flex items-center justify-between py-2 text-sm font-semibold text-white/90 hover:text-accent"
                  >
                    {item.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? "rotate-180" : ""}`}
                    >
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className={`pl-4 space-y-0.5 transition-all duration-300 overflow-hidden ${activeDropdown === item.name ? "max-h-96 opacity-100 mt-0.5 mb-2" : "max-h-0 opacity-0"}`}>
                    {item.submenu.map((sub) => (
                      sub.path.startsWith("http") ? (
                        <a
                          key={sub.path}
                          href={sub.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-1 text-xs text-white/60 hover:text-accent"
                        >
                          {sub.name}
                        </a>
                      ) : (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          className={({ isActive }) => `block py-1 text-xs ${isActive ? "text-accent" : "text-white/60"}`}
                        >
                          {sub.name}
                        </NavLink>
                      )
                    ))}
                  </div>
                </>
              ) : item.path.startsWith("http") ? (
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-sm font-semibold text-white transition hover:text-white"
                >
                  {item.name}
                </a>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `block py-2 text-sm font-semibold ${isActive ? "text-accent" : "text-white/90"}`}
                >
                  {item.name}
                </NavLink>
              )}
            </div>
          ))}

          {/* Mobile Language Switcher */}
          <div className="pt-2 pb-2 border-t border-white/10">
            <LanguageSwitcher variant="mobile" />
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            {!user && (
              isGlobalAcademy ? (
                <>
                  <a
                    href={`${APP_URL}/login`}
                    className="w-full bg-accent text-primary px-4 py-2.5 rounded-xl text-center text-xs font-bold"
                  >
                    {t("nav.login")}
                  </a>
                  <a
                    href={`${APP_URL}/register`}
                    className="w-full bg-white/10 text-white border border-white/10 px-4 py-2.5 rounded-xl text-center text-xs font-bold"
                  >
                    {t("nav.register")}
                  </a>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="w-full bg-accent text-primary px-4 py-2.5 rounded-xl text-center text-xs font-bold"
                  >
                    {t("nav.login")}
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="w-full bg-white/10 text-white border border-white/10 px-4 py-2.5 rounded-xl text-center text-xs font-bold"
                  >
                    {t("nav.register")}
                  </NavLink>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
