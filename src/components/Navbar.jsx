import { useState } from "react";
import "./../../css/main.css";
import { Link } from "react-router-dom";
import Login from "../pages/Login";
import Logo from "./Logo";

function Navbar() {
  console.log("Navbar");
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div>
            <Link to="/" className="logo">
              <div className="logo-container flex-row">
                <Logo width={50} height={50} />
                <h2>GitSec</h2>
              </div>
            </Link>
          </div>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/selection">Selection</Link>
          </li>
          <li>
            <Link to="/report">Report</Link>
          </li>
          <li>
            <Link to="/recommendations">Security Recommendation</Link>
          </li>
          <li>
            <Login />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
