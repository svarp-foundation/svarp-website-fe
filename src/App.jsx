import { useState } from "react";
import "./App.css";
import Router from "./routes/Router";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? <Loader onComplete={() => setLoading(false)} /> : <Router />}
    </>
  );
}

export default App;
