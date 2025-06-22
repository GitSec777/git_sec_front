// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


const ProtectedRoute = () => {
  const { isAuthenticated, loadingAuth } = useContext(AuthContext);
  const location = useLocation();

  // Simply show loading while auth is being checked
  console.log("ProtectedRoute:", { isAuthenticated, loadingAuth });
  if (loadingAuth) {
    return (
      <div className="loading-container">
        <p>Verifying authentication...</p>
      </div>
    );
  }

  // Only redirect once auth check is complete
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;