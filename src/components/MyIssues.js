// src/components/MyIssues.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { ENGINEERS, CATEGORY_ICONS, CATEGORY_COLORS } from "../data";
import "../styles/MyIssues.css";

function statusBadgeClass(status) {
  if (status === "Pending")     return "badge badge-pending";
  if (status === "In Progress") return "badge badge-progress";
  if (status === "Resolved")    return "badge badge-resolved";
  return "badge";
}

function statusIcon(status) {
  if (status === "Pending")     ;
  if (status === "In Progress") ;
  if (status === "Resolved")    return "✅";
  return "";
}

class MyIssues extends Component {
  constructor(props) {
    super(props);
    // Constructor initializes local state for filter
    this.state = {
      filter: "All",
    };
    // Bind event handler in constructor (classic class component pattern)
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(filter) {
    this.setState({ filter });
  }

  render() {
    const { issues, onUpvote } = this.props;
    const { filter } = this.state;

    const STATUS_FILTERS = ["All", "Pending", "In Progress", "Resolved"];

    const filtered = filter === "All"
      ? issues
      : issues.filter((i) => i.status === filter);

    return (
      <div className="myissues-wrap page-fade-in">
        <div className="myissues-header">
          <div>
            <h2 className="myissues-title"> My Reported Issues</h2>
            <p className="myissues-sub">
              All issues you have submitted. Track status and engineer details here.
            </p>
          </div>
          <span className="myissues-count-badge">{issues.length} Issue{issues.length !== 1 ? "s" : ""}</span>
        </div>

        <div className="myissues-filters">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              className={"filter-chip" + (filter === s ? " active" : "")}
              onClick={() => this.handleFilterChange(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="myissues-empty">
            <div style={{ fontSize: "2.8rem", marginBottom: 12 }}>
              {issues.length === 0 ? "" : "🔍"}
            </div>
            <h3>
              {issues.length === 0
                ? "You haven't reported any issues yet."
                : "No issues match this filter."}
            </h3>
            <p>
              {issues.length === 0
                ? "Use the Report Issue page to submit your first complaint."
                : "Try selecting a different status filter."}
            </p>
          </div>
        ) : (
          <div className="myissues-list">
            {filtered.map((issue) => {
              const engineer = ENGINEERS.find((e) => e.id === issue.engineerId) || ENGINEERS[5];
              const catColor = CATEGORY_COLORS[issue.category] || "#2563eb";
              const catIcon  = CATEGORY_ICONS[issue.category]  || "📋";

              return (
                <div
                  key={issue.id}
                  className="myissue-card"
                  style={{ "--cat-color": catColor }}
                >
                  <div className="myissue-top">
                    <div className="myissue-title-wrap">
                      <span className="myissue-title">{issue.title}</span>
                      <div className="myissue-badges">
                        <span className="badge badge-category">
                          {catIcon} {issue.category}
                        </span>
                        <span className={statusBadgeClass(issue.status)}>
                          {statusIcon(issue.status)} {issue.status}
                        </span>
                      </div>
                    </div>
                    <button
                      className={"myissue-upvote" + (issue.voted ? " voted" : "")}
                      onClick={() => onUpvote(issue.id)}
                    >
                      👍 {issue.upvotes}
                    </button>
                  </div>

                  <p className="myissue-desc">{issue.description}</p>

                  <div className="myissue-location">
                     <span>{issue.location || "Location not specified"}</span>
                  </div>

                  <div className="myissue-footer">
                    <div className="myissue-engineer">
                      <div className="eng-avatar-sm">
                        {engineer.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="eng-name">{engineer.name}</div>
                        <div className="eng-contact"> {engineer.contact}</div>
                      </div>
                    </div>
                    <div className="myissue-date">📅 {issue.date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

MyIssues.propTypes = {
  issues:   PropTypes.arrayOf(
    PropTypes.shape({
      id:          PropTypes.number.isRequired,
      title:       PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      location:    PropTypes.string,
      category:    PropTypes.string.isRequired,
      status:      PropTypes.string.isRequired,
      upvotes:     PropTypes.number.isRequired,
      voted:       PropTypes.bool.isRequired,
      date:        PropTypes.string.isRequired,
      engineerId:  PropTypes.number,
    })
  ).isRequired,
  onUpvote: PropTypes.func.isRequired,
};

export default MyIssues;
