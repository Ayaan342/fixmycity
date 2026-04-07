// src/data.js
export const ENGINEERS = [
  { id: 1, name: "Rajan Mehta",    contact: "+91 98765 43210", category: "Roads" },
  { id: 2, name: "Priya Sharma",   contact: "+91 87654 32109", category: "Sanitation" },
  { id: 3, name: "Arjun Nair",     contact: "+91 76543 21098", category: "Water" },
  { id: 4, name: "Deepa Rao",      contact: "+91 65432 10987", category: "Electricity" },
  { id: 5, name: "Kiran Patel",    contact: "+91 54321 09876", category: "Parks" },
  { id: 6, name: "Sunita Bose",    contact: "+91 43210 98765", category: "Other" },
];

export const CATEGORIES = ["Roads", "Sanitation", "Water", "Electricity", "Parks", "Other"];

export const CATEGORY_COLORS = {
  Roads:       "#2563eb",
  Sanitation:  "#10b981",
  Water:       "#0ea5e9",
  Electricity: "#f59e0b",
  Parks:       "#16a34a",
  Other:       "#8b5cf6",
};

export const CATEGORY_ICONS = {
  Roads:       "🛣️",
  Sanitation:  "🗑️",
  Water:       "💧",
  Electricity: "⚡",
  Parks:       "🌳",
  Other:       "📋",
};

export const INITIAL_ISSUES = [
  {
    id: 1,
    title: "Large pothole on MG Road near bus stop",
    description: "There is a dangerous pothole that has caused two accidents this week. Immediate repair needed.",
    category: "Roads",
    status: "Pending",
    upvotes: 24,
    voted: false,
    date: "2026-04-01",
    engineerId: 1,
  },
  {
    id: 2,
    title: "Overflowing garbage bins at Nehru Park",
    description: "Garbage bins haven't been cleared in over a week. The area smells and attracts stray animals.",
    category: "Sanitation",
    status: "In Progress",
    upvotes: 18,
    voted: false,
    date: "2026-04-02",
    engineerId: 2,
  },
  {
    id: 3,
    title: "Water pipeline burst on 5th Cross",
    description: "A pipeline has burst and water is flooding the road, making it impassable for vehicles.",
    category: "Water",
    status: "In Progress",
    upvotes: 31,
    voted: false,
    date: "2026-04-03",
    engineerId: 3,
  },
  {
    id: 4,
    title: "Streetlight not working near school",
    description: "Three streetlights near Kendriya Vidyalaya have been off for two weeks. Very unsafe at night.",
    category: "Electricity",
    status: "Resolved",
    upvotes: 15,
    voted: false,
    date: "2026-03-28",
    engineerId: 4,
  },
  {
    id: 5,
    title: "Broken benches and damaged swings in Central Park",
    description: "Many benches are broken and the children's swings are damaged. Parents are concerned about safety.",
    category: "Parks",
    status: "Pending",
    upvotes: 9,
    voted: false,
    date: "2026-04-05",
    engineerId: 5,
  },
];