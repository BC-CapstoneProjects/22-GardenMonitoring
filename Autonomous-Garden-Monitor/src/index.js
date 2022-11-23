import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./report";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Garden from "./routes/Garden";
import Subject from "./routes/Subject";
import Settings from "./routes/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Garden />,
  },
  {
    path: "/view/:id",
    element: <Subject />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

//---
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
