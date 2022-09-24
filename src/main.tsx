import "@picocss/pico/css/pico.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Register } from "./features";
import { RegisterProvider } from "./features/register/_contexts/registerContext/RegisterContext";

const router = createBrowserRouter([
  {
    path: "/register/:step",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <main className="container">
      <RegisterProvider>
        <RouterProvider router={router} />
      </RegisterProvider>
    </main>
  </React.StrictMode>
);
