import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./common/ErrorBoundary";
import Home from "./pages/Home";
import SelectionPage from "./pages/SelectionPage";
import RepoReport from "./components/RepoReport";
import OrgReport from "./components/OrgReport";
import Recommendations from "./pages/Recommendations";
import Login from "./pages/Login";

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
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selection" element={<SelectionPage />} />
          <Route path="/report/repo/:repoId" element={<RepoReport />} />
          <Route path="/report/org/:orgId" element={<OrgReport />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
