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

function isBotUserAgent() {
  if (typeof navigator === "undefined" || !navigator.userAgent) return false;
  return /bot|googlebot|crawler|spider|robot|crawling|lighthouse|facebookexternalhit|twitterbot|bingbot|duckduckbot|yandexbot|baiduspider|whatsapp/i.test(
    navigator.userAgent
  );
}

function App() {
  const [loading, setLoading] = useState(() => {
    if (isBotUserAgent()) return false;
    return !localStorage.getItem("videoPlayed");
  });
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

  // Update Page Titles, Descriptions, Canonical Tags and Open Graph dynamically
  useEffect(() => {
    const routeTitles = {
      "/": t("meta.homeTitle"),
      "/about": t("meta.aboutTitle"),
      "/services": t("meta.servicesTitle") || t("meta.projectsTitle"),
      "/projects": t("meta.projectsTitle"),
      "/certifications": t("meta.certificationsTitle"),
      "/stories": t("meta.storiesTitle"),
      "/team": t("meta.teamTitle"),
      "/contact": t("meta.contactTitle"),
      "/careers": t("meta.careersTitle"),
      "/donate": t("meta.donationTitle"),
      "/donation": t("meta.donationTitle"),
      "/login": t("meta.loginTitle"),
      "/register": t("meta.registerTitle"),
      "/dashboard": t("meta.dashboardTitle"),
      "/membership": t("meta.membershipTitle"),
      "/events": t("meta.eventsTitle"),
      "/gallery": t("meta.galleryTitle"),
      "/global-academy": "SVARP Global Academy | Professional Safety & EHS Training",
      "/global-academy/catalog": "Course Catalog | SVARP Global Academy",
      "/global-academy/verify": "Verify Certificate | SVARP Global Academy",
    };

    const routeDescriptions = {
      "/": t("meta.homeDesc"),
      "/about": t("meta.aboutDesc"),
      "/services": t("meta.servicesDesc") || t("meta.projectsDesc"),
      "/projects": t("meta.projectsDesc"),
      "/certifications": t("meta.certificationsDesc"),
      "/stories": t("meta.storiesDesc"),
      "/team": t("meta.teamDesc"),
      "/contact": t("meta.contactDesc"),
      "/careers": t("meta.careersDesc"),
      "/donate": t("meta.donationDesc"),
      "/donation": t("meta.donationDesc"),
      "/login": t("meta.loginDesc"),
      "/register": t("meta.registerDesc"),
      "/dashboard": t("meta.dashboardDesc"),
      "/membership": t("meta.membershipDesc"),
      "/events": t("meta.eventsDesc"),
      "/gallery": t("meta.galleryDesc"),
      "/global-academy": "Advance your career with certified occupational health, safety leadership, and EHS compliance courses from SVARP Global Academy.",
      "/global-academy/catalog": "Explore our comprehensive directory of workplace safety, risk management, and environmental compliance training programs.",
      "/global-academy/verify": "Verify authentic SVARP Global Academy certifications and training credentials online.",
    };

    const path = location.pathname;
    const title = routeTitles[path] || t("meta.homeTitle");
    const desc = routeDescriptions[path] || t("meta.homeDesc");
    const canonicalUrl = `https://www.svarp.org${path === "/" ? "" : path}`;

    document.title = title;

    // Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", desc);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // Open Graph & Twitter URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", canonicalUrl);
    let twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute("content", canonicalUrl);

    // Open Graph & Twitter Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", title);

    // Open Graph & Twitter Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", desc);
    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute("content", desc);
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
