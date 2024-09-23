import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../../css/main.css";

const Layout = () => {
  const navigate = useNavigate(); // Use React Router's navigation
  const location = useLocation(); // Get the current location (path)

  useEffect(() => {
    // Only run this effect if the user is on the report page
    if (location.pathname === "/report") {
      // Check if there is a last visited report in localStorage
      const lastEndpoint = localStorage.getItem("lastEndpoint");

      if (lastEndpoint) {
        const { orgName, repoName } = JSON.parse(lastEndpoint);

        // Navigate to the last visited report
        if (orgName) {
          navigate(`/report/org/${orgName}`);
        } else if (repoName) {
          navigate(`/report/repo/${repoName}`);
        }
      }
    }
  }, [navigate, location.pathname]); // Dependency on navigate and pathname

  return (
    <>
      <div className="content-container">
        <Navbar />
        <div className="page-container">
          <div></div>
          <Outlet /> {/* This is where the child routes are rendered */}
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Layout;
