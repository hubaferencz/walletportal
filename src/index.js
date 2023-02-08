import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SWRConfig } from "swr";
// import browserrouter
import { BrowserRouter } from "react-router-dom";

import "./index.css";

// create root element
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(

    <StrictMode>
      <SWRConfig
        value={{
          fetcher: (url) => fetch(url).then((r) => r.json()),
          provider: () => new Map(),
        }}
      >
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </SWRConfig>
    </StrictMode>

);
