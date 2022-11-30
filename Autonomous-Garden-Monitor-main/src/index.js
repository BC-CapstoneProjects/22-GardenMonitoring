import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./report";


import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Garden from "./routes/Garden";
import Settings from "./routes/Settings";
import Sign from "./routes/Sign/Sign";
//import Subject from "./routes/Subject";

const router = createBrowserRouter([
  {
    exact: true,
    path: "/",
    element: <Sign />,
  },
  {
    path: "/garden",
    element: <Garden />,
  },
  {
    path: "/view/:subjectID",
    element: <Garden />,
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