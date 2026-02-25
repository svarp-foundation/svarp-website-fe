import { useState } from "react";
import "./App.css";
import Router from "./routes/Router";
import Loader from "./components/Loader";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./hooks/useToast";
import { PopupProvider } from "./context/PopupContext";

function App() {
  const [loading, setLoading] = useState(
    !sessionStorage.getItem("videoPlayed"),
  );
  const handleLoaderComplete = () => {
    sessionStorage.setItem("videoPlayed", "true");
    setLoading(false);
  };

  return (
    <AuthProvider>
      <ToastProvider>
        <PopupProvider>
          {loading ? <Loader onComplete={handleLoaderComplete} /> : <Router />}
        </PopupProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
