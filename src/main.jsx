import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import App from "./App";
import "./i18n";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={
      <div className="h-screen w-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
