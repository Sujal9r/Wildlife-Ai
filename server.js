const express = require("express");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const baseRoles = {
  admin: {
    id: "admin",
    name: "Admin",
    description:
      "Controls the full forest department system, assigns supervisors, reviews wildlife alerts, and manages statewide reports.",
    isSystem: true
  },
  supervisor: {
    id: "supervisor",
    name: "Supervisor",
    description:
      "Monitors regional forest zones, verifies field activity, tracks staff work, and handles urgent threats.",
    isSystem: true
  },
  user: {
    id: "user",
    name: "User",
    description:
      "Field staff and citizens can send wildlife reports, check awareness updates, and follow assigned tasks.",
    isSystem: true
  }
};

const customRoles = {};

const users = [
  {
    id: 1,
    name: "Asha Verma",
    email: "admin@junglix.com",
    password: "admin123",
    role: "admin",
    region: "National Command Center",
    status: "Active"
  },
  {
    id: 2,
    name: "Ravi Singh",
    email: "supervisor@junglix.com",
    password: "super123",
    role: "supervisor",
    region: "Central Tiger Division",
    status: "On Patrol"
  },
  {
    id: 3,
    name: "Meera Das",
    email: "officer@junglix.com",
    password: "user123",
    role: "user",
    region: "Eastern Elephant Reserve",
    status: "In Field"
  }
];

const reports = [
  {
    id: "R-104",
    title: "Possible poaching movement near buffer zone",
    region: "Central Tiger Division",
    status: "Critical",
    submittedBy: "Meera Das",
    assignedTo: "Ravi Singh",
    source: "Mobile App"
  },
  {
    id: "R-105",
    title: "Drone flagged smoke pattern in sal forest",
    region: "Eastern Elephant Reserve",
    status: "High",
    submittedBy: "AI Fire Monitor",
    assignedTo: "Ravi Singh",
    source: "Drone + AI"
  },
  {
    id: "R-106",
    title: "Camera trap detected leopard near village trail",
    region: "Western Wetland Range",
    status: "Moderate",
    submittedBy: "Camera Trap Unit 8",
    assignedTo: "Meera Das",
    source: "Camera Trap"
  }
];

const tasks = [
  {
    id: "T-301",
    title: "Verify camera trap data in Zone 4",
    ownerRole: "supervisor",
    assignee: "Ravi Singh",
    status: "In Progress"
  },
  {
    id: "T-302",
    title: "Upload GPS collar movement update",
    ownerRole: "user",
    assignee: "Meera Das",
    status: "Pending"
  },
  {
    id: "T-303",
    title: "Approve drone patrol expansion budget",
    ownerRole: "admin",
    assignee: "Asha Verma",
    status: "Pending"
  }
];

const tools = [
  {
    name: "Drones",
    use: "Used for aerial patrol, fire spotting, and checking illegal tree cutting in remote forest zones."
  },
  {
    name: "Camera Traps",
    use: "Capture wildlife movement without disturbing animals and help identify rare species."
  },
  {
    name: "GPS Tracking",
    use: "Tracks the movement of tagged animals and field teams across protected areas."
  },
  {
    name: "Satellites",
    use: "Monitor forest cover, changes in land use, and large-scale environmental damage."
  },
  {
    name: "GIS Mapping",
    use: "Maps habitats, patrol routes, danger zones, and conservation boundaries."
  },
  {
    name: "Mobile Apps",
    use: "Allow quick reporting of poaching, injured animals, forest fires, and illegal activity."
  },
  {
    name: "Artificial Intelligence",
    use: "Analyzes camera images, sounds, and patterns to detect threats and predict risks."
  }
];

const sessions = new Map();
let nextUserId = 4;

function getAllRoles() {
  return {
    ...baseRoles,
    ...customRoles
  };
}

function findRole(roleId) {
  return getAllRoles()[roleId] || null;
}

function createSession(user) {
  const token = crypto.randomUUID();
  sessions.set(token, user.id);
  return token;
}

function sanitizeUser(user) {
  const role = findRole(user.role);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    roleName: role ? role.name : user.role,
    region: user.region,
    status: user.status
  };
}

function getUserFromToken(token) {
  const userId = sessions.get(token);
  return users.find((user) => user.id === userId) || null;
}

function roleContent(roleId, userName) {
  const defaults = {
    admin: {
      roleSummary: {
        focus: "System-wide command and policy control",
        accessLevel: "Full Access",
        primaryMetric: "All divisions and reports"
      },
      roleHighlights: [
        "Manage staff roles and access permissions",
        "Review all wildlife alerts and statewide cases",
        "Approve technology deployment and conservation plans"
      ],
      permissions: [
        "Create and delete custom roles",
        "Assign any role to any registered user",
        "Review all reports and tasks"
      ],
      quickActions: [
        "Create supervisor account",
        "Approve drone patrol request",
        "Review district conservation summary"
      ]
    },
    supervisor: {
      roleSummary: {
        focus: "Regional monitoring and team coordination",
        accessLevel: "Regional Access",
        primaryMetric: "Assigned range operations"
      },
      roleHighlights: [
        "Track field officers and regional incidents",
        "Verify camera, drone, and GPS data",
        "Escalate high-risk forest threats to admin"
      ],
      permissions: [
        "Monitor regional incidents and patrol activity",
        "Assign field work in the selected forest zone",
        "Update verified emergencies"
      ],
      quickActions: [
        "Assign forest patrol",
        "Verify camera trap alert",
        "Update incident status"
      ]
    },
    user: {
      roleSummary: {
        focus: "Field reporting and local task execution",
        accessLevel: "Basic Field Access",
        primaryMetric: "Personal tasks and local alerts"
      },
      roleHighlights: [
        "Submit incident reports through mobile tools",
        "Check field assignments and safety notices",
        "Support local wildlife and forest protection"
      ],
      permissions: [
        "Submit field reports and wildlife sightings",
        "View assigned tasks and safety instructions",
        "Track local alerts and awareness updates"
      ],
      quickActions: [
        "Submit new report",
        "Check today's field task",
        "View nearby wildlife alert"
      ]
    }
  };

  if (defaults[roleId]) {
    return defaults[roleId];
  }

  const customRole = findRole(roleId);
  return {
    roleSummary: {
      focus: `${customRole.name} operations for ${userName}`,
      accessLevel: "Custom Access",
      primaryMetric: customRole.description
    },
    roleHighlights: [
      `Work under the ${customRole.name} role`,
      "Handle assigned forest department responsibilities",
      "Coordinate with supervisors and admin when needed"
    ],
    permissions: [
      `Access tasks assigned for the ${customRole.name} role`,
      "View relevant wildlife and forest alerts",
      "Operate within admin-approved custom permissions"
    ],
    quickActions: [
      "View assigned work",
      "Check incident feed",
      "Send field update"
    ]
  };
}

function buildDashboardForUser(user) {
  const role = findRole(user.role);
  if (!role) {
    return null;
  }

  const stats = {
    forestsMonitored: user.role === "admin" ? 128 : user.role === "supervisor" ? 42 : 9,
    activeDevices: user.role === "admin" ? 342 : user.role === "supervisor" ? 98 : 17,
    wildlifeAlertsToday: user.role === "admin" ? 19 : user.role === "supervisor" ? 8 : 3,
    openCases: user.role === "admin" ? 11 : user.role === "supervisor" ? 4 : 2
  };

  const { roleSummary, roleHighlights, permissions, quickActions } = roleContent(
    user.role,
    user.name
  );

  const filteredReports =
    user.role === "admin"
      ? reports
      : user.role === "supervisor"
        ? reports.filter((report) => report.assignedTo === user.name || report.status !== "Moderate")
        : reports.filter(
            (report) => report.assignedTo === user.name || report.submittedBy === user.name
          );

  const filteredTasks =
    user.role === "admin"
      ? tasks
      : tasks.filter((task) => task.ownerRole === user.role || task.assignee === user.name);

  const filteredTeam =
    user.role === "admin"
      ? users.map(sanitizeUser)
      : user.role === "supervisor"
        ? users.filter((item) => item.role !== "admin").map(sanitizeUser)
        : [sanitizeUser(user)];

  return {
    currentUser: sanitizeUser(user),
    role,
    stats,
    roleSummary,
    roleHighlights,
    permissions,
    quickActions,
    tools,
    reports: filteredReports,
    tasks: filteredTasks,
    team: filteredTeam,
    adminControls:
      user.role === "admin"
        ? {
            visible: true,
            customRoles: Object.values(customRoles),
            manageableUsers: users.map(sanitizeUser)
          }
        : {
            visible: false
          }
  };
}

function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const user = getUserFromToken(token);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized access." });
  }

  req.user = user;
  req.token = token;
  return next();
}

function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }

  return next();
}

app.get("/api/overview", (req, res) => {
  res.json({
    title: "Junglix Forest Department Management System",
    subtitle:
      "Login or sign up to access your forest department dashboard. Admin users can manage custom roles and assign them to staff."
  });
});

app.post("/api/signup", (req, res) => {
  const { name, email, password, region } = req.body;

  if (!name || !email || !password || !region) {
    return res.status(400).json({ message: "All signup fields are required." });
  }

  const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered." });
  }

  const user = {
    id: nextUserId++,
    name,
    email,
    password,
    role: "user",
    region,
    status: "Active"
  };

  users.push(user);

  return res.status(201).json({
    message: "Signup successful. You can now log in with your credentials."
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (item) => item.email.toLowerCase() === String(email || "").toLowerCase() && item.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = createSession(user);

  return res.json({
    message: `${findRole(user.role).name} login successful.`,
    token,
    role: user.role
  });
});

app.get("/api/session", requireAuth, (req, res) => {
  const dashboard = buildDashboardForUser(req.user);
  return res.json(dashboard);
});

app.get("/api/admin/roles", requireAuth, requireAdmin, (req, res) => {
  return res.json({
    customRoles: Object.values(customRoles),
    users: users.map(sanitizeUser)
  });
});

app.post("/api/admin/roles", requireAuth, requireAdmin, (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: "Role name and description are required." });
  }

  const roleId = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  if (!roleId || findRole(roleId)) {
    return res.status(400).json({ message: "Role already exists or is invalid." });
  }

  customRoles[roleId] = {
    id: roleId,
    name,
    description,
    isSystem: false
  };

  return res.status(201).json({
    message: "Custom role created successfully.",
    customRoles: Object.values(customRoles)
  });
});

app.patch("/api/admin/users/:id/role", requireAuth, requireAdmin, (req, res) => {
  const userId = Number(req.params.id);
  const { roleId } = req.body;
  const targetUser = users.find((user) => user.id === userId);
  const role = findRole(roleId);

  if (!targetUser) {
    return res.status(404).json({ message: "User not found." });
  }

  if (!role) {
    return res.status(400).json({ message: "Selected role does not exist." });
  }

  targetUser.role = roleId;

  return res.json({
    message: `${targetUser.name} is now assigned to ${role.name}.`,
    users: users.map(sanitizeUser)
  });
});

app.delete("/api/admin/roles/:roleId", requireAuth, requireAdmin, (req, res) => {
  const { roleId } = req.params;

  if (!customRoles[roleId]) {
    return res.status(404).json({ message: "Custom role not found." });
  }

  const assignedUsers = users.filter((user) => user.role === roleId);
  assignedUsers.forEach((user) => {
    user.role = "user";
  });

  delete customRoles[roleId];

  return res.json({
    message: "Custom role deleted. Assigned users were moved to User role.",
    customRoles: Object.values(customRoles),
    users: users.map(sanitizeUser)
  });
});

app.listen(PORT, () => {
  console.log(`Junglix server running at http://localhost:${PORT}`);
});
