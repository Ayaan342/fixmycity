// src/App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ReportForm from "./components/ReportForm";
import AdminPanel from "./components/AdminPanel";
import { INITIAL_ISSUES, ENGINEERS, CATEGORY_ICONS } from "./data";
import "./styles/global.css";

let nextId = INITIAL_ISSUES.length + 1;

function App() {
  const [issues, setIssues] = useState(INITIAL_ISSUES);

  // Upvote toggle
  function handleUpvote(id) {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              upvotes: issue.voted ? issue.upvotes - 1 : issue.upvotes + 1,
              voted: !issue.voted,
            }
          : issue
      )
    );
  }

  // Submit new issue from ReportForm
  function handleSubmit(form) {
    const engineer = ENGINEERS.find((e) => e.category === form.category) || ENGINEERS[5];
    const newIssue = {
      id: nextId++,
      title: form.title,
      description: form.description,
      category: form.category,
      status: "Pending",
      upvotes: 0,
      voted: false,
      date: new Date().toISOString().slice(0, 10),
      engineerId: engineer.id,
    };
    setIssues((prev) => [newIssue, ...prev]);
  }

  // Admin status change
  function handleStatusChange(id, newStatus) {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    );
  }

  return (
    <BrowserRouter>
      <Navbar issueCount={issues.length} />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        <Routes>
          <Route
            path="/"
            element={<Dashboard issues={issues} onUpvote={handleUpvote} />}
          />
          <Route
            path="/report"
            element={<ReportForm onSubmit={handleSubmit} />}
          />
          <Route
            path="/admin"
            element={<AdminPanel issues={issues} onStatusChange={handleStatusChange} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;