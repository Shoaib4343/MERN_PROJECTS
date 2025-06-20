import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/auth.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);
