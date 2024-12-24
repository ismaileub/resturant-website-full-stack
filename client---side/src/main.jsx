import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Routes/Router";
import AuthProviders from "./Components/Providers/AuthProviders";

import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query'

const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <AuthProviders>

      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto">
          <RouterProvider router={router} />
        </div>

      </QueryClientProvider>

    </AuthProviders>

  </React.StrictMode>

);