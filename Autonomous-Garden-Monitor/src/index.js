import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./report";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
