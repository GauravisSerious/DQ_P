import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { AuditProvider } from "./context/AuditContext";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AuditProvider>
        <App />
      </AuditProvider>
    </HashRouter>
  </React.StrictMode>
);
