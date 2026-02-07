import { NavLink } from "react-router-dom";
import { useState } from "react";

const linkClass = ({ isActive }) =>
  `relative transition ${
    isActive ? "text-accent after:w-full" : "hover:text-accent after:w-0"
  } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-accent after:transition-all`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "About", path: "/about" },
    { name: "Our Team", path: "/team" },
    { name: "Services", path: "/projects" },
    { name: "Our Certifications", path: "/certifications" },
    { name: "Membership", path: "/membership" },
    // { name: "Events", path: "/events" },
    { name: "Gallery & Events", path: "/gallery" },
    { name: "Stories", path: "/stories" },
    // { name: "Reports", path: "/reports" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-lg font-semibold tracking-wide text-white"
            onClick={() => setOpen(false)}
          >
            SVARP <span className="text-accent">FOUNDATION</span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 text-sm text-white">
            {menuItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={linkClass}>
                {item.name}
              </NavLink>
            ))}
            <a href="https://www.svarp.org/course-category/global-course/?tutor-course-filter-category=471" target="_blank">
              Courses
            </a>
            <NavLink
              to="/contact"
              className="ml-4 bg-accent text-primary px-5 py-2 rounded-full font-medium hover:scale-105 transition"
            >
              Connect
            </NavLink>
          </div>

          {/* Mobile Button */}
          <button
            className="lg:hidden text-white text-2xl"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-white/10">
          <div className="px-6 py-6 space-y-4 text-white text-sm">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="block hover:text-accent"
              >
                {item.name}
              </NavLink>
            ))}
            <a href="https://www.svarp.org/course-category/global-course/?tutor-course-filter-category=471" target="_blank" className="block hover:text-accent">
              Courses
            </a>

            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="block mt-4 bg-accent text-primary px-5 py-2 rounded-full text-center font-medium"
            >
              Connect with Us
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
