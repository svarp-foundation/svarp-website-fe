import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Lenis from "lenis";
import "./App.css";
import Router from "./routes/Router";
import Loader from "./components/Loader";
import RTLProvider from "./components/RTLProvider";
import { AuthProvider } from "./context/AuthContext";
import { PopupProvider } from "./context/PopupContext";

function App() {
  const [loading, setLoading] = useState(
    !localStorage.getItem("videoPlayed"),
  );
  const location = useLocation();
  const { t, i18n } = useTranslation();

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
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // Scroll to top instantly when location changes
  useEffect(() => {
    if (window.lenis && typeof window.lenis.scrollTo === "function") {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Update Page Titles and Descriptions dynamically based on route and language
  useEffect(() => {
    const routeTitles = {
      "/": t("meta.homeTitle"),
      "/about": t("meta.aboutTitle"),
      "/services": t("meta.servicesTitle"),
      "/certifications": t("meta.certificationsTitle"),
      "/stories": t("meta.storiesTitle"),
      "/team": t("meta.teamTitle"),
      "/contact": t("meta.contactTitle"),
      "/careers": t("meta.careersTitle"),
      "/donation": t("meta.donationTitle"),
      "/login": t("meta.loginTitle"),
      "/register": t("meta.registerTitle"),
      "/dashboard": t("meta.dashboardTitle"),
      "/membership": t("meta.membershipTitle"),
      "/events": t("meta.eventsTitle"),
      "/gallery": t("meta.galleryTitle"),
      "/projects": t("meta.projectsTitle"),
    };

    const routeDescriptions = {
      "/": t("meta.homeDesc"),
      "/about": t("meta.aboutDesc"),
      "/services": t("meta.servicesDesc"),
      "/certifications": t("meta.certificationsDesc"),
      "/stories": t("meta.storiesDesc"),
      "/team": t("meta.teamDesc"),
      "/contact": t("meta.contactDesc"),
      "/careers": t("meta.careersDesc"),
      "/donation": t("meta.donationDesc"),
      "/login": t("meta.loginDesc"),
      "/register": t("meta.registerDesc"),
      "/dashboard": t("meta.dashboardDesc"),
      "/membership": t("meta.membershipDesc"),
      "/events": t("meta.eventsDesc"),
      "/gallery": t("meta.galleryDesc"),
      "/projects": t("meta.projectsDesc"),
    };

    const path = location.pathname;
    const title = routeTitles[path] || t("meta.homeTitle");
    const desc = routeDescriptions[path] || t("meta.homeDesc");

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", desc);
  }, [location, i18n.language, t]);

  return (
    <RTLProvider>
      <AuthProvider>
        <PopupProvider>
          {loading ? <Loader onComplete={handleLoaderComplete} /> : <Router />}
        </PopupProvider>
      </AuthProvider>
    </RTLProvider>
  );
}

export default App;
