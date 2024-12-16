import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SaldoProvider } from "./components/SaldoContext.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SaldoProvider>
      <App />
    </SaldoProvider>
  </Provider>
);

{
  /* <ReactStrictMode>
  <SaldoProvider>
  <App />
  </SaldoProvider>
</React.StrictMode>; */
}
