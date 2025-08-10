// Sample Users
let users = [
  {
    id: "u1",
    name: "Alice Wambui",
    email: "alice@example.com",
  },
  {
    id: "u2",
    name: "Brian Otieno",
    email: "brian@example.com",
  },
  {
    id: "u3",
    name: "Clara Kiptoo",
    email: "clara@example.com",
  },
];

// Sample Issues
let issues = [
  {
    id: "i1",
    title: "Fix login bug",
    description: "Users can't log in using their credentials on mobile.",
    status: "OPEN",
    createdAt: "2025-08-05T09:30:00Z",
    updatedAt: "2025-08-05T09:30:00Z",
    assignedTo: "u1",
  },
  {
    id: "i2",
    title: "Update dashboard layout",
    description: "Redesign dashboard to match new branding guidelines.",
    status: "IN_PROGRESS",
    createdAt: "2025-08-04T11:00:00Z",
    updatedAt: "2025-08-06T15:00:00Z",
    assignedTo: "u2",
  },
  {
    id: "i3",
    title: "Optimize database queries",
    description: "Some API endpoints are taking over 5 seconds to respond.",
    status: "OPEN",
    createdAt: "2025-08-06T13:45:00Z",
    updatedAt: "2025-08-06T13:45:00Z",
    assignedTo: null, // unassigned
  },
];

module.exports = { users, issues };
