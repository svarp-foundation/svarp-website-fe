import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <NavLink to="/" className="inline-block mb-4">
            <img
              src="/company/svarp-logo.webp"
              alt="SVARP Foundation"
              className="h-16 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />
          </NavLink>
          <p className="text-sm opacity-80 leading-relaxed">
            Building safer, smarter, sustainable futures through safety,
            sustainability, and social impact. SVARP Foundation works with
            individuals, organizations, and communities to drive meaningful,
            long-term change.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>
              <NavLink to="/about" className="hover:underline">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className="hover:underline">
                Our Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/stories" className="hover:underline">
                Impact Stories
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" className="hover:underline">
                Reports & Documents
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:underline">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <p className="text-sm opacity-80 leading-relaxed">
            A-200, Shatabdi Nagar, Sector 2, MDA <br />
            Meerut, Uttar Pradesh – 250103 <br />
            India
          </p>

          <p className="text-sm opacity-80 mt-4">
            info@svarp.org <br />
            +91-9917759966
          </p>
        </div>

        {/* CTA */}
        <div>
          <h3 className="font-semibold mb-4">Get Involved</h3>
          <p className="text-sm opacity-80 mb-4">
            Join the movement for safety, sustainability, and social change.
          </p>
          <NavLink
            to="/contact"
            className="inline-block bg-accent text-primary px-6 py-2 rounded-full font-medium hover:scale-105 transition"
          >
            Connect with Us
          </NavLink>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 text-center py-4 text-sm opacity-70">
        © {new Date().getFullYear()} SVARP Foundation. All rights reserved.
      </div>
    </footer>
  );
}
