import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SelectionPage from "./pages/SelectionPage";
import RepoReport from "./components/RepoReport";
import OrgReport from "./components/OrgReport";
import Recommendations from "./pages/Recommendations";
import Login from "./pages/Login";

const App = () => {
  return (
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
  );
};

export default App;
