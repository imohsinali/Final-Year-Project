import React from "react";
import "./index.css";
import App from "./App";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { TransactionsProvider } from "./StateMangement/Context";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <TransactionsProvider>
      <App />
    </TransactionsProvider>
  </React.StrictMode>
);
