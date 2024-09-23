import { useState } from "react";
import "./../../css/main.css";
import { Link } from "react-router-dom";
import Logo from "../images/logo.svg";
function Navbar() {
  console.log("Navbar");
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div>
            <Link to="/" className="logo">
              <div className="logo-container flex-row">
                <img src={Logo} alt="" />
                <h2>Git Security</h2>
              </div>
            </Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/report">Report</Link>
            </li>
            <li>
              <Link to="/recommendations">Security Recommendation</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
