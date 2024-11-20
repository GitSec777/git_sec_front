// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./pages/Layout.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Recommendations from "./pages/Recommendations.jsx";
import SelectionPage from "./pages/SelectionPage.jsx";
import GitHubCallback from "./components/GitHubCallback.jsx";
import OrgReport from "./components/OrgReport.jsx";
import RepoReport from "./components/RepoReport.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Main layout
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/auth/github/callback",
        element: <GitHubCallback />,
      },
      {
        element: <ProtectedRoute />, // Wrapper for protected routes
        children: [
          {
            path: "/selection",
            element: <SelectionPage />,
          },
          {
            path: "/recommendations",
            element: <Recommendations />,
          },
          {
            path: "/report/org/:orgId",
            element: <OrgReport />,
          },
          {
            path: "/report/repo/:repoId",
            element: <RepoReport />,
          },
        ],
      },
    ],
  },
  {
    path: "*", // Catch-all route for undefined paths
    element: <div>404 Not Found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
