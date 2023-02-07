import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { SWRConfig } from "swr";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((r) => r.json()),
        provider: () => new Map(),
      }}
    >
      <Router>
        <App />
      </Router>
    </SWRConfig>
  </React.StrictMode>
);
