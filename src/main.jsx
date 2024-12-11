import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SaldoProvider } from "./components/SaldoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SaldoProvider>
      <App />
    </SaldoProvider>
  </React.StrictMode>
);
