import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./pages/Layout.jsx";
import Report from "./components/report.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Recommendations from "./pages/Recommendations.jsx";
import SelectionPage from "./pages/SelectionPage.jsx";
import GitHubCallback from "./components/GitHubCallback.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
        path: "/report",
        element: <Report />,
      },
      {
        path: "/recommendations",
        element: <Recommendations />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/selection",
        element: <SelectionPage />,
      },
      {
        path: "/auth/github/callback",
        element: <GitHubCallback />,
      },
      {
        path: "/report/org/:orgName", // Dynamic route for organization reports
        element: <Report />,
      },
      {
        path: "/report/repo/:repoName", // Dynamic route for repository reports
        element: <Report />,
      },
    ],
  },
  {
    path: "*", // Catch-all route for undefined paths
    element: <div>404 Not Found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
