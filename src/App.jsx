import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./common/ErrorBoundary";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <ErrorBoundary>
      <Helmet>
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; connect-src 'self' https://api.github.com; img-src 'self' https://github.com https://*.githubusercontent.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </Helmet>
      <Navbar />
      {/* Render children from the router */}
      <Outlet />
    </ErrorBoundary>
  );
};

export default App;