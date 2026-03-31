const dashboardTitle = document.getElementById("dashboard-title");
const dashboardDescription = document.getElementById("dashboard-description");
const currentRoleBadge = document.getElementById("current-role-badge");
const currentUserLine = document.getElementById("current-user-line");
const roleSummary = document.getElementById("role-summary");
const statGrid = document.getElementById("stat-grid");
const highlightList = document.getElementById("highlight-list");
const permissionList = document.getElementById("permission-list");
const quickActionList = document.getElementById("quick-action-list");
const toolGrid = document.getElementById("tool-grid");
const reportList = document.getElementById("report-list");
const taskList = document.getElementById("task-list");
const teamList = document.getElementById("team-list");
const operationsTitle = document.getElementById("operations-title");
const logoutButton = document.getElementById("logout-button");
const adminPanel = document.getElementById("admin-panel");
const customRoleForm = document.getElementById("custom-role-form");
const adminMessage = document.getElementById("admin-message");
const customRoleList = document.getElementById("custom-role-list");
const adminUserList = document.getElementById("admin-user-list");

if (!localStorage.getItem("wildlife-ai_token")) {
  window.location.href = "./index.html";
}

function createStatCards(stats) {
  const labels = {
    forestsMonitored: "Forests Monitored",
    activeDevices: "Active Devices",
    wildlifeAlertsToday: "Alerts Today",
    openCases: "Open Cases"
  };

  statGrid.innerHTML = Object.entries(stats)
    .map(
      ([key, value]) => `
        <article class="stat-card">
          <span>${labels[key] || key}</span>
          <strong>${value}</strong>
        </article>
      `
    )
    .join("");
}

function createListMarkup(items, type) {
  if (!items.length) {
    return '<p class="empty-state">No records available.</p>';
  }

  if (type === "reports") {
    return items
      .map(
        (item) => `
          <article class="record-card">
            <div class="record-top">
              <strong>${item.id}</strong>
              <span class="badge">${item.status}</span>
            </div>
            <h4>${item.title}</h4>
            <p>${item.region}</p>
            <p>Source: ${item.source}</p>
            <p>Assigned to: ${item.assignedTo}</p>
          </article>
        `
      )
      .join("");
  }

  if (type === "tasks") {
    return items
      .map(
        (item) => `
          <article class="record-card">
            <div class="record-top">
              <strong>${item.id}</strong>
              <span class="badge">${item.status}</span>
            </div>
            <h4>${item.title}</h4>
            <p>Assignee: ${item.assignee}</p>
          </article>
        `
      )
      .join("");
  }

  return items
    .map(
      (item) => `
        <article class="record-card">
          <div class="record-top">
            <strong>${item.name}</strong>
            <span class="badge">${item.roleName}</span>
          </div>
          <p>${item.email}</p>
          <p>${item.region}</p>
        </article>
      `
    )
    .join("");
}

function renderAdminControls(adminControls, currentRoleId) {
  if (currentRoleId !== "admin" || !adminControls.visible) {
    adminPanel.classList.add("hidden-panel");
    return;
  }

  adminPanel.classList.remove("hidden-panel");

  customRoleList.innerHTML = adminControls.customRoles.length
    ? adminControls.customRoles
        .map(
          (role) => `
            <article class="record-card">
              <div class="record-top">
                <strong>${role.name}</strong>
                <button class="danger-button" type="button" data-role-delete="${role.id}">Delete</button>
              </div>
              <p>${role.description}</p>
              <p>Role ID: ${role.id}</p>
            </article>
          `
        )
        .join("")
    : '<p class="empty-state">No custom roles created yet.</p>';

  const roleOptions = adminControls.customRoles
    .map((role) => `<option value="${role.id}">${role.name}</option>`)
    .join("");

  adminUserList.innerHTML = adminControls.manageableUsers
    .map(
      (user) => `
        <article class="record-card">
          <div class="record-top">
            <strong>${user.name}</strong>
            <span class="badge">${user.roleName}</span>
          </div>
          <p>${user.email}</p>
          <p>${user.region}</p>
          <div class="assign-row">
            <select data-user-role="${user.id}">
              <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
              <option value="supervisor" ${user.role === "supervisor" ? "selected" : ""}>Supervisor</option>
              <option value="user" ${user.role === "user" ? "selected" : ""}>User</option>
              ${roleOptions}
            </select>
            <button class="assign-button" type="button" data-user-save="${user.id}">Assign</button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderDashboard(data) {
  dashboardTitle.textContent = `${data.role.name} Dashboard`;
  dashboardDescription.textContent = data.role.description;
  currentRoleBadge.textContent = data.role.name;
  currentUserLine.textContent = `Logged in as ${data.currentUser.name} (${data.currentUser.email})`;
  operationsTitle.textContent =
    data.role.id === "admin"
      ? "Reports, tasks, team activity, and role management"
      : data.role.id === "supervisor"
        ? "Regional reports, assigned tasks, and team members"
        : "My reports, my tasks, and field support";

  roleSummary.innerHTML = `
    <article class="summary-card">
      <span>Focus Area</span>
      <strong>${data.roleSummary.focus}</strong>
    </article>
    <article class="summary-card">
      <span>Access Level</span>
      <strong>${data.roleSummary.accessLevel}</strong>
    </article>
    <article class="summary-card">
      <span>Primary Scope</span>
      <strong>${data.roleSummary.primaryMetric}</strong>
    </article>
  `;

  createStatCards(data.stats);
  highlightList.innerHTML = data.roleHighlights.map((item) => `<li>${item}</li>`).join("");
  permissionList.innerHTML = data.permissions.map((item) => `<li>${item}</li>`).join("");
  quickActionList.innerHTML = data.quickActions
    .map((item) => `<article class="action-card">${item}</article>`)
    .join("");
  toolGrid.innerHTML = data.tools
    .map(
      (tool) => `
        <article class="mini-card">
          <h4>${tool.name}</h4>
          <p>${tool.use}</p>
        </article>
      `
    )
    .join("");

  reportList.innerHTML = createListMarkup(data.reports, "reports");
  taskList.innerHTML = createListMarkup(data.tasks, "tasks");
  teamList.innerHTML = createListMarkup(data.team, "team");
  renderAdminControls(data.adminControls, data.role.id);
}

async function loadDashboard() {
  try {
    const data = WildlifeAiApp.getSession();
    renderDashboard(data);
  } catch (error) {
    WildlifeAiApp.logout();
    window.location.href = "./index.html";
  }
}

customRoleForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(customRoleForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const data = WildlifeAiApp.createRole(payload);
    adminMessage.textContent = data.message;
    customRoleForm.reset();
    loadDashboard();
  } catch (error) {
    adminMessage.textContent = error.message;
  }
});

customRoleList.addEventListener("click", async (event) => {
  const roleId = event.target.getAttribute("data-role-delete");
  if (!roleId) {
    return;
  }

  try {
    const data = WildlifeAiApp.deleteRole(roleId);
    adminMessage.textContent = data.message;
    loadDashboard();
  } catch (error) {
    adminMessage.textContent = error.message;
  }
});

adminUserList.addEventListener("click", async (event) => {
  const userId = event.target.getAttribute("data-user-save");
  if (!userId) {
    return;
  }

  const select = document.querySelector(`[data-user-role="${userId}"]`);
  if (!select) {
    return;
  }

  try {
    const data = WildlifeAiApp.assignRole(userId, select.value);
    adminMessage.textContent = data.message;
    loadDashboard();
  } catch (error) {
    adminMessage.textContent = error.message;
  }
});

logoutButton.addEventListener("click", () => {
  WildlifeAiApp.logout();
  window.location.href = "./index.html";
});

loadDashboard();
