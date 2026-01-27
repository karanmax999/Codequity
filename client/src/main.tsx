import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { HelmetProvider } from "react-helmet-async";

import { ThirdwebProvider } from "thirdweb/react";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
