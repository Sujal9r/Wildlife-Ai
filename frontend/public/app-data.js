const WildlifeAiApp = (() => {
  const STORAGE_KEYS = {
    users: "wildlife-ai_users",
    customRoles: "wildlife-ai_customRoles",
    sessionToken: "wildlife-ai_token",
    sessionUserId: "wildlife-ai_sessionUserId"
  };

  const overview = {
    title: "wildlife ai Forest Department Management System",
    subtitle:
      "Login or sign up to access your forest department dashboard. Admin users can manage custom roles and assign them to staff."
  };

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

  const defaultUsers = [
    {
      id: 1,
      name: "Asha Verma",
      email: "admin@wildlifeai.com",
      password: "admin123",
      role: "admin",
      region: "National Command Center",
      status: "Active"
    },
    {
      id: 2,
      name: "Ravi Singh",
      email: "supervisor@wildlifeai.com",
      password: "super123",
      role: "supervisor",
      region: "Central Tiger Division",
      status: "On Patrol"
    },
    {
      id: 3,
      name: "Meera Das",
      email: "officer@wildlifeai.com",
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

  function readJson(key, fallback) {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }

    try {
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function initialize() {
    if (!localStorage.getItem(STORAGE_KEYS.users)) {
      writeJson(STORAGE_KEYS.users, defaultUsers);
    }

    if (!localStorage.getItem(STORAGE_KEYS.customRoles)) {
      writeJson(STORAGE_KEYS.customRoles, {});
    }
  }

  function getUsers() {
    initialize();
    return readJson(STORAGE_KEYS.users, defaultUsers);
  }

  function saveUsers(users) {
    writeJson(STORAGE_KEYS.users, users);
  }

  function getCustomRoles() {
    initialize();
    return readJson(STORAGE_KEYS.customRoles, {});
  }

  function saveCustomRoles(customRoles) {
    writeJson(STORAGE_KEYS.customRoles, customRoles);
  }

  function getAllRoles() {
    return {
      ...baseRoles,
      ...getCustomRoles()
    };
  }

  function findRole(roleId) {
    return getAllRoles()[roleId] || null;
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

  function getCurrentUser() {
    const sessionUserId = Number(localStorage.getItem(STORAGE_KEYS.sessionUserId));
    if (!sessionUserId) {
      return null;
    }

    return getUsers().find((user) => user.id === sessionUserId) || null;
  }

  function requireCurrentUser() {
    const user = getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized access.");
    }

    return user;
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
      quickActions: ["View assigned work", "Check incident feed", "Send field update"]
    };
  }

  function buildDashboardForUser(user) {
    const role = findRole(user.role);
    if (!role) {
      throw new Error("Selected role does not exist.");
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

    const users = getUsers();
    const customRoles = getCustomRoles();
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

  function getOverview() {
    initialize();
    return overview;
  }

  function signup(payload) {
    initialize();
    const { name, email, password, region } = payload;
    if (!name || !email || !password || !region) {
      throw new Error("All signup fields are required.");
    }

    const users = getUsers();
    const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      throw new Error("Email already registered.");
    }

    const nextUserId = users.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1;
    users.push({
      id: nextUserId,
      name,
      email,
      password,
      role: "user",
      region,
      status: "Active"
    });

    saveUsers(users);
    return {
      message: "Signup successful. You can now log in with your credentials."
    };
  }

  function login(payload) {
    initialize();
    const { email, password } = payload;
    const user = getUsers().find(
      (item) => item.email.toLowerCase() === String(email || "").toLowerCase() && item.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const token =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `token-${Date.now()}`;

    localStorage.setItem(STORAGE_KEYS.sessionToken, token);
    localStorage.setItem(STORAGE_KEYS.sessionUserId, String(user.id));

    return {
      message: `${findRole(user.role).name} login successful.`,
      token,
      role: user.role
    };
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEYS.sessionToken);
    localStorage.removeItem(STORAGE_KEYS.sessionUserId);
  }

  function getSession() {
    initialize();
    return buildDashboardForUser(requireCurrentUser());
  }

  function createRole(payload) {
    const currentUser = requireCurrentUser();
    if (currentUser.role !== "admin") {
      throw new Error("Admin access required.");
    }

    const { name, description } = payload;
    if (!name || !description) {
      throw new Error("Role name and description are required.");
    }

    const roleId = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const customRoles = getCustomRoles();
    if (!roleId || findRole(roleId)) {
      throw new Error("Role already exists or is invalid.");
    }

    customRoles[roleId] = {
      id: roleId,
      name,
      description,
      isSystem: false
    };

    saveCustomRoles(customRoles);
    return {
      message: "Custom role created successfully.",
      customRoles: Object.values(customRoles)
    };
  }

  function deleteRole(roleId) {
    const currentUser = requireCurrentUser();
    if (currentUser.role !== "admin") {
      throw new Error("Admin access required.");
    }

    const customRoles = getCustomRoles();
    if (!customRoles[roleId]) {
      throw new Error("Custom role not found.");
    }

    const users = getUsers();
    users.forEach((user) => {
      if (user.role === roleId) {
        user.role = "user";
      }
    });

    delete customRoles[roleId];
    saveCustomRoles(customRoles);
    saveUsers(users);

    return {
      message: "Custom role deleted. Assigned users were moved to User role.",
      customRoles: Object.values(customRoles),
      users: users.map(sanitizeUser)
    };
  }

  function assignRole(userId, roleId) {
    const currentUser = requireCurrentUser();
    if (currentUser.role !== "admin") {
      throw new Error("Admin access required.");
    }

    const users = getUsers();
    const targetUser = users.find((user) => user.id === Number(userId));
    const role = findRole(roleId);

    if (!targetUser) {
      throw new Error("User not found.");
    }

    if (!role) {
      throw new Error("Selected role does not exist.");
    }

    targetUser.role = roleId;
    saveUsers(users);

    return {
      message: `${targetUser.name} is now assigned to ${role.name}.`,
      users: users.map(sanitizeUser)
    };
  }

  initialize();

  return {
    getOverview,
    signup,
    login,
    logout,
    getSession,
    createRole,
    deleteRole,
    assignRole
  };
})();
