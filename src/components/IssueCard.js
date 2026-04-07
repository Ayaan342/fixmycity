// src/components/IssueCard.js
import React from "react";
import PropTypes from "prop-types";
import { CATEGORY_COLORS, CATEGORY_ICONS, ENGINEERS } from "../data";
import "../styles/IssueCard.css";

function statusBadgeClass(status) {
  if (status === "Pending")     return "badge badge-pending";
  if (status === "In Progress") return "badge badge-progress";
  if (status === "Resolved")    return "badge badge-resolved";
  return "badge";
}

function statusIcon(status) {
  if (status === "Pending")     return "🕐";
  if (status === "In Progress") return "🔧";
  if (status === "Resolved")    return "✅";
  return "";
}

function IssueCard({ issue, onUpvote }) {
  const engineer = ENGINEERS.find((e) => e.id === issue.engineerId) || ENGINEERS[5];
  const catColor = CATEGORY_COLORS[issue.category] || "#2563eb";
  const catIcon  = CATEGORY_ICONS[issue.category]  || "📋";

  return (
    <div className="issue-card" style={{ "--category-color": catColor }}>
      <div className="card-header">
        <div className="card-title">{issue.title}</div>
      </div>

      <div className="card-meta">
        <span className="badge badge-category">
          {catIcon} {issue.category}
        </span>
        <span className={statusBadgeClass(issue.status)}>
          {statusIcon(issue.status)} {issue.status}
        </span>
      </div>

      <p className="card-description">{issue.description}</p>

      <div className="engineer-tag">
        <div className="eng-avatar">
          {engineer.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <span>
          <span className="engineer-name">{engineer.name}</span>
          {" · "}{engineer.contact}
        </span>
      </div>

      <div className="card-footer">
        <span className="card-date">📅 {issue.date}</span>
        <button
          className={"upvote-btn" + (issue.voted ? " voted" : "")}
          onClick={() => onUpvote(issue.id)}
          aria-label="Upvote this issue"
        >
          <span className="thumb-icon">👍</span>
          {issue.upvotes} Upvotes
        </button>
      </div>
    </div>
  );
}

IssueCard.propTypes = {
  issue: PropTypes.shape({
    id:          PropTypes.number.isRequired,
    title:       PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category:    PropTypes.string.isRequired,
    status:      PropTypes.string.isRequired,
    upvotes:     PropTypes.number.isRequired,
    voted:       PropTypes.bool.isRequired,
    date:        PropTypes.string.isRequired,
    engineerId:  PropTypes.number,
  }).isRequired,
  onUpvote: PropTypes.func.isRequired,
};

export default IssueCard;