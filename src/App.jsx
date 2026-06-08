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

  return (
    <AuthProvider>
      <PopupProvider>
        {loading ? <Loader onComplete={handleLoaderComplete} /> : <Router />}
      </PopupProvider>
    </AuthProvider>
  );
}

export default App;
