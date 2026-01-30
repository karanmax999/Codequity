import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { HelmetProvider } from "react-helmet-async";
import { ThirdwebProvider } from "thirdweb/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider>
      <HelmetProvider>
        <ConvexProvider client={convex}>
          <App />
        </ConvexProvider>
      </HelmetProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
