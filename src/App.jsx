import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import "./App.css";
import Router from "./routes/Router";
import Loader from "./components/Loader";
import { AuthProvider } from "./context/AuthContext";
import { PopupProvider } from "./context/PopupContext";

function App() {
  const [loading, setLoading] = useState(
    !localStorage.getItem("videoPlayed"),
  );
  const location = useLocation();

  const handleLoaderComplete = () => {
    localStorage.setItem("videoPlayed", "true");
    setLoading(false);
  };

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Store in window for global access
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // Scroll to top instantly when location changes
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Update document title and meta description dynamically based on route
  useEffect(() => {
    const routeTitles = {
      "/": "SVARP Global | Safety Leadership & EHS Solutions",
      "/about": "About Us | SVARP Global",
      "/services": "Our Services | SVARP Global",
      "/certifications": "Certifications | SVARP Global",
      "/stories": "Impact Stories & Testimonials | SVARP Global",
      "/team": "Our Team | SVARP Global",
      "/contact": "Contact Us | SVARP Global",
      "/careers": "Careers | SVARP Global",
      "/donation": "Support Our Initiatives | SVARP Global",
      "/login": "Sign In | SVARP Global Partner Portal",
      "/register": "Create Account | SVARP Global",
      "/dashboard": "Partner Dashboard | SVARP Global",
    };

    const routeDescriptions = {
      "/": "SVARP Global is a premier provider of safety leadership training, EHS advisory, community wellness programs, and sustainability initiatives.",
      "/about": "Learn about SVARP Global's mission, values, and our commitment to building safer, sustainable, and empowered communities.",
      "/services": "Explore SVARP Global's services, including safety training, occupational health advisory, risk audits, and compliance consulting.",
      "/certifications": "Verify and apply for occupational safety, EHS, and sustainability certifications from SVARP Global.",
      "/stories": "Read real impact stories and testimonials from professionals, partners, and organizations working with SVARP Global.",
      "/team": "Meet the board members, safety experts, and educators guiding SVARP Global's mission.",
      "/contact": "Get in touch with SVARP Global for safety training programs, consulting queries, and corporate wellness advisory.",
      "/careers": "Join a purpose-driven team at SVARP Global and build a rewarding career in safety, environment, and social impact.",
      "/donation": "Support SVARP Global's social initiatives, environmental drives, and community safety awareness campaigns.",
      "/login": "Access your SVARP Global partner and training dashboard.",
      "/register": "Register for SVARP Global courses, audits, and certification tracking.",
      "/dashboard": "Manage your EHS certifications, view training schedules, and monitor audit progress.",
    };

    const path = location.pathname;
    const title = routeTitles[path] || "SVARP Global | Safety Leadership & EHS Solutions";
    const desc = routeDescriptions[path] || "SVARP Global is a premier provider of safety leadership training, EHS advisory, community wellness programs, and sustainability initiatives.";

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", desc);
  }, [location]);

  return (
    <AuthProvider>
      <PopupProvider>
        {loading ? <Loader onComplete={handleLoaderComplete} /> : <Router />}
      </PopupProvider>
    </AuthProvider>
  );
}

export default App;
