import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GlobalStyles from "./styles/GlobalStyles.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
