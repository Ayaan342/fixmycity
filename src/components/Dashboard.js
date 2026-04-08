// src/components/Dashboard.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import IssueCard from "./IssueCard";
import { CATEGORY_COLORS } from "../data";
import "../styles/Dashboard.css";

const TOP_N = 5;

function Dashboard({ issues, onUpvote }) {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", ...Array.from(new Set(issues.map((i) => i.category)))];

  // Sort by upvotes descending, then apply filters, then take top N
  const topIssues = [...issues].sort((a, b) => b.upvotes - a.upvotes);

  const filtered = topIssues.filter((issue) => {
    const matchCategory = categoryFilter === "All" || issue.category === categoryFilter;
    const matchSearch   = !search ||
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  }).slice(0, TOP_N);

  const pending    = issues.filter((i) => i.status === "Pending").length;
  const inProgress = issues.filter((i) => i.status === "In Progress").length;
  const resolved   = issues.filter((i) => i.status === "Resolved").length;
  const totalVotes = issues.reduce((sum, i) => sum + i.upvotes, 0);

  return (
    <div className="dashboard-wrap">
      <div className="dashboard-hero">
        <div className="hero-text">
          <h1>City Issue Dashboard</h1>
          <p>Track and upvote civic problems reported by citizens in your area.</p>
        </div>
        <button className="hero-cta" onClick={() => navigate("/report")}>
           Report Issue
        </button>
      </div>

      <div className="stats-row">
        <div className="mini-stat">
          <div className="mini-stat-icon" style={{ background: "#eff6ff" }}>📋</div>
          <div>
            <div className="mini-stat-num">{issues.length}</div>
            <div className="mini-stat-lbl">Total Issues</div>
          </div>
        </div>
        <div className="mini-stat">
          <div className="mini-stat-icon" style={{ background: "#fff7ed" }}>🕐</div>
          <div>
            <div className="mini-stat-num" style={{ color: "#f97316" }}>{pending}</div>
            <div className="mini-stat-lbl">Pending</div>
          </div>
        </div>
        <div className="mini-stat">
          <div className="mini-stat-icon" style={{ background: "#ede9fe" }}>🔧</div>
          <div>
            <div className="mini-stat-num" style={{ color: "#7c3aed" }}>{inProgress}</div>
            <div className="mini-stat-lbl">In Progress</div>
          </div>
        </div>
        <div className="mini-stat">
          <div className="mini-stat-icon" style={{ background: "#ecfdf5" }}>✅</div>
          <div>
            <div className="mini-stat-num" style={{ color: "#10b981" }}>{resolved}</div>
            <div className="mini-stat-lbl">Resolved</div>
          </div>
        </div>
        <div className="mini-stat">
          <div className="mini-stat-icon" style={{ background: "#fef9c3" }}></div>
          <div>
            <div className="mini-stat-num" style={{ color: "#ca8a04" }}>{totalVotes}</div>
            <div className="mini-stat-lbl">Total Upvotes</div>
          </div>
        </div>
      </div>

      {/* Section heading for top issues */}
      <div className="top-issues-heading">
        <div>
          <span className="top-issues-label"> Top {TOP_N} Most Upvoted Issues</span>
          <span className="top-issues-hint">Showing the most critical issues by community votes</span>
        </div>
      </div>

      <div className="filter-bar">
        <span className="filter-label">Category:</span>
        {categories.map((c) => (
          <button
            key={c}
            className={"filter-btn" + (categoryFilter === c ? " active" : "")}
            onClick={() => setCategoryFilter(c)}
            style={c !== "All" ? { borderColor: CATEGORY_COLORS[c] + "55" } : {}}
          >
            {c}
          </button>
        ))}
        <div className="search-bar">
          🔍
          <input
            type="text"
            placeholder="Search issues…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No issues found</h3>
          <p>Try changing the filters or search query.</p>
        </div>
      ) : (
        <div className="issues-grid">
          {filtered.map((issue, idx) => (
            <div key={issue.id} style={{ position: "relative" }}>
             
              <IssueCard issue={issue} onUpvote={onUpvote} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Dashboard.propTypes = {
  issues:   PropTypes.array.isRequired,
  onUpvote: PropTypes.func.isRequired,
};

export default Dashboard;
