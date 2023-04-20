import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./report";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";

import Garden from "./routes/Garden";
import Settings from "./routes/Settings";
import Sign from "./routes/Sign/Sign";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Sign />} />
        <Route path="/garden" element={<Garden />} />
        <Route path="/view/:subjectID" element={<Garden />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
