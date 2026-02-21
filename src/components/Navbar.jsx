import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const linkClass = ({ isActive }) =>
  `relative transition ${
    isActive ? "text-accent after:w-full" : "hover:text-accent after:w-0"
  } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-accent after:transition-all`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

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
            className="flex items-center text-lg font-semibold tracking-wide text-white gap-2"
            onClick={() => setOpen(false)}
          >
            <img
              src="/company/svarp-logo.webp"
              alt="SVARP Foundation"
              className="h-12 w-auto object-contain transition-transform duration-300"
            />
            SVARP <span className="text-accent">FOUNDATION</span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm text-white">
            {menuItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={linkClass}>
                {item.name}
              </NavLink>
            ))}
            <a
              href=""
              target="_blank"
            >
              Courses
            </a>
            {/* <NavLink
              to="/contact"
              className="ml-4 bg-accent text-primary px-5 py-2 rounded-full font-medium hover:scale-105 transition"
            >
              Connect
            </NavLink> */}
            {user ? (
              <div className="flex items-center gap-4">
                <NavLink
                  to="/dashboard"
                  className="bg-accent/20 p-2 rounded-full hover:bg-accent/40 transition group"
                  title="Dashboard"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white group-hover:text-accent transition"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </NavLink>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="ml-4 bg-accent text-primary px-5 py-2 rounded-full font-medium hover:scale-105 transition"
              >
                Login
              </NavLink>
            )}
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
            <a
              href="https://www.svarp.org/course-category/global-course/?tutor-course-filter-category=471"
              target="_blank"
              className="block hover:text-accent"
            >
              Courses
            </a>

            {/* <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="block mt-4 bg-accent text-primary px-5 py-2 rounded-full text-center font-medium"
            >
              Connect with Us
            </NavLink> */}
            {user ? (
              <>
                <div className="flex justify-center mt-4 gap-4">
                  <NavLink
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center bg-accent/20 p-2 rounded-full hover:bg-accent/40 transition group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-white group-hover:text-accent transition"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="ml-2 text-white group-hover:text-accent">
                      Dashboard
                    </span>
                  </NavLink>
                </div>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="block mt-4 bg-accent text-primary px-5 py-2 rounded-full text-center font-medium"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
