// src/components/ReportForm.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, ENGINEERS, CATEGORY_ICONS } from "../data";
import "../styles/ReportForm.css";

function ReportForm({ onSubmit }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);

  const engineerForCategory = ENGINEERS.find((e) => e.category === form.category);

  function validate() {
    const errs = {};
    if (!form.title.trim() || form.title.trim().length < 5)
      errs.title = "Title must be at least 5 characters.";
    if (!form.description.trim() || form.description.trim().length < 10)
      errs.description = "Description must be at least 10 characters.";
    if (!form.category)
      errs.category = "Please select a category.";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit(form);
    setSubmitted(true);
    setForm({ title: "", description: "", category: "" });
    setTimeout(() => {
      setSubmitted(false);
      navigate("/");
    }, 2000);
  }

  return (
    <div className="report-form-wrap">
      <div className="form-card">
        <h2 className="form-heading">📢 Report an Issue</h2>
        <p className="form-subheading">
          Help us fix your city. Fill in the details below and submit your complaint.
        </p>

        {submitted && (
          <div className="success-toast">
            ✅ Your issue has been reported successfully! Redirecting…
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="title">Issue Title</label>
            <input
              id="title"
              name="title"
              className="form-input"
              placeholder="e.g. Pothole on MG Road near bus stop"
              value={form.title}
              onChange={handleChange}
              maxLength={120}
            />
            {errors.title && (
              <span className="form-error">⚠️ {errors.title}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              className="form-select"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">— Select a category —</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_ICONS[cat]} {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="form-error">⚠️ {errors.category}</span>
            )}
          </div>

          {engineerForCategory && (
            <div className="form-group">
              <label className="form-label">Assigned Engineer</label>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "var(--primary-light)", borderRadius: "var(--radius-sm)",
                padding: "10px 14px", fontSize: "0.88rem"
              }}>
                <span style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: "var(--primary)", color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "0.75rem", flexShrink: 0
                }}>
                  {engineerForCategory.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text)" }}>
                    {engineerForCategory.name}
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                    📞 {engineerForCategory.contact}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              placeholder="Describe the issue in detail — location, severity, duration…"
              value={form.description}
              onChange={handleChange}
              maxLength={500}
            />
            {errors.description && (
              <span className="form-error">⚠️ {errors.description}</span>
            )}
            <span style={{ fontSize: "0.75rem", color: "var(--text-light)", textAlign: "right" }}>
              {form.description.length}/500
            </span>
          </div>

          <button type="submit" className="submit-btn">
            Submit Report →
          </button>
        </form>
      </div>
    </div>
  );
}

ReportForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ReportForm;