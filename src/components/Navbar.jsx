import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Login from "../pages/Login";
import "../../css/components/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const storedUserName = localStorage.getItem("userName");
    if (loggedIn && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginSuccess = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("lastOrgName");
    localStorage.removeItem("lastRepoName");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    setShowLogout(false);
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
        {isLoggedIn ? (
          <div
            className="user-menu"
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => setShowLogout(false)}
          >
            <span className="navbar-user">{userName}</span>
            {showLogout && (
              <div className="logout-option" onClick={handleLogout}>
                Logout
              </div>
            )}
          </div>
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
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
