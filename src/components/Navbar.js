// src/components/Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/Navbar.css";

function Navbar({ issueCount, myIssueCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <div className="brand-icon">FS</div>
          Fix<span className="city">MyCity</span>
        </div>
        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          >
             Dashboard
            <span className="nav-badge">{issueCount}</span>
          </NavLink>
          <NavLink
            to="/report"
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          >
             Report Issue
          </NavLink>
          <NavLink
            to="/my-issues"
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          >
             My Issues
            {myIssueCount > 0 && (
              <span className="nav-badge" style={{ background: "#16a34a" }}>{myIssueCount}</span>
            )}
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          >
             Admin Panel
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  issueCount:   PropTypes.number.isRequired,
  myIssueCount: PropTypes.number.isRequired,
};

export default Navbar;
