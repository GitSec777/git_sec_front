import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Login from "../pages/Login";
import "../../css/components/navbar.css";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, userData, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
    setShowLogout(false);
    navigate("/");
    window.location.reload();
  };

  const navItems = [
    { to: "/", text: "Home" },
    { to: "/selection", text: "Selection" },
    { to: "/report", text: "Report" },
    { to: "/recommendations", text: "Security Recommendation" },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <div className="logo-container flex-row">
            <Logo width={50} height={50} />
            <h2>GitSec</h2>
          </div>
        </Link>
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={item.to} onClick={() => setIsOpen(false)}>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="auth-container">
          {isAuthenticated ? (
            <div
              className="user-menu"
              onMouseEnter={() => setShowLogout(true)}
              onMouseLeave={() => setShowLogout(false)}
            >
              <span className="username">{userData?.name}</span>
              {showLogout && (
                <div className="logout-dropdown">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Login />
          )}
        </div>
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link to={item.to} onClick={() => setIsOpen(false)}>
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
