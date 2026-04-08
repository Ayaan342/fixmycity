// src/components/AdminPanel.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { ENGINEERS, CATEGORY_ICONS } from "../data";
import "../styles/AdminPanel.css";

const STATUSES = ["Pending", "In Progress", "Resolved"];

function AdminPanel({ issues, onStatusChange }) {
  const [filterCat, setFilterCat] = useState("All");

  const categories = ["All", ...Array.from(new Set(issues.map((i) => i.category)))];
  const filtered = filterCat === "All"
    ? issues
    : issues.filter((i) => i.category === filterCat);

  const pending    = issues.filter((i) => i.status === "Pending").length;
  const inProgress = issues.filter((i) => i.status === "In Progress").length;
  const resolved   = issues.filter((i) => i.status === "Resolved").length;

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <h2 className="admin-title">Admin Panel</h2>
        <span className="admin-badge">Municipal Authority</span>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon"></div>
          <div className="stat-value">{issues.length}</div>
          <div className="stat-label">Total Issues</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🕐</div>
          <div className="stat-value" style={{ color: "#f97316" }}>{pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔧</div>
          <div className="stat-value" style={{ color: "#7c3aed" }}>{inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value" style={{ color: "#10b981" }}>{resolved}</div>
          <div className="stat-label">Resolved</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilterCat(c)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: "0.82rem",
              fontWeight: 600,
              border: "1.5px solid var(--border)",
              background: filterCat === c ? "var(--primary-light)" : "var(--surface)",
              color: filterCat === c ? "var(--primary)" : "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {c !== "All" && CATEGORY_ICONS[c]} {c}
          </button>
        ))}
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Issue</th>
              <th>Category</th>
              <th>Engineer</th>
              <th>Upvotes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((issue, idx) => {
              const engineer = ENGINEERS.find((e) => e.id === issue.engineerId) || ENGINEERS[5];
              return (
                <tr key={issue.id}>
                  <td style={{ color: "var(--text-light)", fontWeight: 600 }}>{idx + 1}</td>
                  <td>
                    <div className="admin-issue-title">{issue.title}</div>
                    <div className="admin-issue-desc">{issue.description}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                      {CATEGORY_ICONS[issue.category]} {issue.category}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: "0.82rem" }}>
                      <div style={{ fontWeight: 600 }}>{engineer.name}</div>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                        {engineer.contact}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="upvote-count">{issue.upvotes}</div>
                  </td>
                  <td>
                    <select
                      className="status-select"
                      value={issue.status}
                      onChange={(e) => onStatusChange(issue.id, e.target.value)}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

AdminPanel.propTypes = {
  issues:         PropTypes.array.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default AdminPanel;
