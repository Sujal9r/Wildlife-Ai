const heroSubtitle = document.getElementById("hero-subtitle");
const authMessage = document.getElementById("auth-message");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");

function showLogin() {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.remove("hidden-form");
  signupForm.classList.add("hidden-form");
}

function showSignup() {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.remove("hidden-form");
  loginForm.classList.add("hidden-form");
}

async function loadOverview() {
  try {
    const response = await fetch("/api/overview");
    const data = await response.json();
    heroSubtitle.textContent = data.subtitle;
  } catch (error) {
    heroSubtitle.textContent = "System overview is not available right now.";
  }
}

loginTab.addEventListener("click", showLogin);
signupTab.addEventListener("click", showSignup);

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(signupForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    authMessage.textContent = data.message;
    signupForm.reset();
    showLogin();
  } catch (error) {
    authMessage.textContent = error.message;
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("junglix_token", data.token);
    window.location.href = "/dashboard.html";
  } catch (error) {
    authMessage.textContent = error.message;
  }
});

loadOverview();
