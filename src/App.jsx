import { useState } from "react";
import "./App.css";
import Router from "./routes/Router";
import Loader from "./components/Loader";
import { AuthProvider } from "./context/AuthContext";
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
      <PopupProvider>
          <Router />
          {/* {loading ? <Loader onComplete={handleLoaderComplete} /> : <Router />} */}
        </PopupProvider>
    </AuthProvider>
  );
}

export default App;
