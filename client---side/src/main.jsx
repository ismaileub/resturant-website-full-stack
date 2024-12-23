import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Routes/Router";
import AuthProviders from "./Components/Providers/AuthProviders";



ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <AuthProviders>

      <div className="container mx-auto">
        <RouterProvider router={router} />
      </div>

    </AuthProviders>

  </React.StrictMode>

);