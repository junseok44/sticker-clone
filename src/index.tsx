import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { todoStore } from "./store";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App store={new todoStore()} />
  </React.StrictMode>
);
