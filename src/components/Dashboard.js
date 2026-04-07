// src/components/Dashboard.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import IssueCard from "./IssueCard";
import { CATEGORY_COLORS } from "../data";
import "../styles/Dashboard.css";

const STATUS_FILTERS = ["All", "Pending", "In Progress", "Resolved"];

function Dashboard({ issues, onUpvote }) {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", ...Array.from(new Set(issues.map((i) => i.category)))];

  const filtered = issues.filter((issue) => {
    const matchStatus   = statusFilter === "All"   || issue.status === statusFilter;
    const matchCategory = categoryFilter === "All" || issue.category === categoryFilter;
    const matchSearch   = !search ||
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.description.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchCategory && matchSearch;
  });

  const pending    = issues.filter((i) => i.status === "Pending").length;
  const inProgress = issues.filter((i) => i.status === "In Progress").length;
  const resolved   = issues.filter((i) => i.status === "Resolved").length;
  const totalVotes = issues.reduce((sum, i) => sum + i.upvotes, 0);

  return (
    <div className="dashboard-wrap">
      <div className="dashboard-hero">
        <div className="hero-text">
          <h1>City Issue Dashboard 🏙️</h1>
          <p>Track and upvote civic problems reported by citizens in your area.</p>
        </div>
        <button className="hero-cta" onClick={() => navigate("/report")}>
          ➕ Report Issue
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
          <div className="mini-stat-icon" style={{ background: "#fef9c3" }}>👍</div>
          <div>
            <div className="mini-stat-num" style={{ color: "#ca8a04" }}>{totalVotes}</div>
            <div className="mini-stat-lbl">Total Upvotes</div>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <span className="filter-label">Status:</span>
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            className={"filter-btn" + (statusFilter === s ? " active" : "")}
            onClick={() => setStatusFilter(s)}
          >
            {s}
          </button>
        ))}
        <span className="filter-label" style={{ marginLeft: 8 }}>Category:</span>
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
          {filtered.map((issue) => (
            <IssueCard key={issue.id} issue={issue} onUpvote={onUpvote} />
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