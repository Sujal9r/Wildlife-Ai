import { motion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, UserCog, UserRoundSearch, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appMeta, authRoles, demoAccounts } from '../data/mockData';

const SESSION_KEY = 'forestra_session';
const SESSION_PROFILE_KEY = 'forestra_profile';
const USERS_KEY = 'forestra_users';

function getStoredUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify(demoAccounts));
    return demoAccounts;
  }

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify(demoAccounts));
    return demoAccounts;
  }
}

function getRoleIcon(roleId) {
  if (roleId === 'admin') return UserCog;
  if (roleId === 'analyst') return UserRoundSearch;
  return Users;
}

export function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [selectedRole, setSelectedRole] = useState('admin');
  const [message, setMessage] = useState('Use a demo account or create a role-based access profile.');
  const [loginForm, setLoginForm] = useState({ email: '', password: '', role: 'admin' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', role: 'ranger', region: '' });

  const demoForRole = useMemo(
    () => demoAccounts.find((account) => account.role === selectedRole) ?? demoAccounts[0],
    [selectedRole]
  );

  function openDashboard(user) {
    localStorage.setItem(SESSION_KEY, 'active');
    localStorage.setItem(
      SESSION_PROFILE_KEY,
      JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role,
        title: user.title || authRoles.find((role) => role.id === user.role)?.label || 'User',
        region: user.region,
      })
    );
    navigate('/');
  }

  function handleLoginSubmit(event) {
    event.preventDefault();
    const users = getStoredUsers();
    const user = users.find(
      (item) =>
        item.email.toLowerCase() === loginForm.email.toLowerCase() &&
        item.password === loginForm.password &&
        item.role === loginForm.role
    );

    if (!user) {
      setMessage('Invalid email, password, or selected role.');
      return;
    }

    setMessage(`${user.name} signed in as ${user.title || user.role}.`);
    openDashboard(user);
  }

  function handleSignupSubmit(event) {
    event.preventDefault();
    const users = getStoredUsers();
    const existing = users.find((item) => item.email.toLowerCase() === signupForm.email.toLowerCase());

    if (existing) {
      setMessage('An account with this email already exists.');
      return;
    }

    const roleLabel = authRoles.find((role) => role.id === signupForm.role)?.label || 'User';
    const newUser = {
      id: `user-${Date.now()}`,
      name: signupForm.name,
      email: signupForm.email,
      password: signupForm.password,
      role: signupForm.role,
      title: roleLabel,
      region: signupForm.region,
    };

    const nextUsers = [...users, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
    setMessage(`Account created for ${newUser.name} as ${roleLabel}.`);
    openDashboard(newUser);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="glass-panel grid w-full max-w-7xl overflow-hidden lg:grid-cols-[1.12fr,0.88fr]"
      >
        <div className="relative overflow-hidden border-b border-white/10 p-8 md:p-10 lg:border-b-0 lg:border-r">
          <div className="absolute inset-0 bg-gradient-to-br from-moss/10 via-transparent to-cyan-400/10" />
          <div className="relative">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75">
              <Leaf className="h-4 w-4 text-moss" />
              {appMeta.name} role-based access
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold tracking-tight text-white md:text-6xl">
              Login and signup according to role access
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
              Choose how you want to enter the platform. Admins oversee operations,
              rangers manage field activity, and analysts focus on trends and reporting.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {authRoles.map((role) => {
                const Icon = getRoleIcon(role.id);
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role.id);
                      setLoginForm((current) => ({ ...current, role: role.id }));
                      setSignupForm((current) => ({ ...current, role: role.id }));
                    }}
                    className={`data-card text-left transition ${selectedRole === role.id ? 'border-moss/25 bg-moss/10' : ''}`}
                  >
                    <Icon className={`h-5 w-5 ${role.accent}`} />
                    <p className="mt-4 text-lg font-semibold text-white">{role.label}</p>
                    <p className="mt-2 text-sm leading-7 text-white/65">{role.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-moss">
                <ShieldCheck className="h-4 w-4" />
                Demo account for selected role
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">Name</p>
                  <p className="mt-2 text-sm font-semibold text-white">{demoForRole.name}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">Role</p>
                  <p className="mt-2 text-sm font-semibold text-white">{demoForRole.title}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">Email</p>
                  <p className="mt-2 text-sm font-semibold text-white">{demoForRole.email}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">Password</p>
                  <p className="mt-2 text-sm font-semibold text-white">{demoForRole.password}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center p-8 md:p-10">
          <div className="w-full">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-7">
              <div className="flex gap-2 rounded-full bg-white/[0.04] p-1">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    mode === 'login' ? 'bg-moss text-forest-950' : 'text-white/65'
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    mode === 'signup' ? 'bg-moss text-forest-950' : 'text-white/65'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {mode === 'login' ? (
                <form className="mt-6 space-y-4" onSubmit={handleLoginSubmit}>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">Role</label>
                    <select
                      value={loginForm.role}
                      onChange={(event) => setLoginForm((current) => ({ ...current, role: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white focus:border-moss/30 focus:outline-none"
                    >
                      {authRoles.map((role) => (
                        <option key={role.id} value={role.id} className="bg-forest-900">
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">Email</label>
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-moss/30 focus:outline-none"
                      placeholder="Enter your role email"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">Password</label>
                    <input
                      type="password"
                      value={loginForm.password}
                      onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-moss/30 focus:outline-none"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-moss px-5 py-3.5 text-sm font-semibold text-forest-950 transition hover:scale-[1.01]"
                  >
                    Login As Role
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <form className="mt-6 space-y-4" onSubmit={handleSignupSubmit}>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">Full Name</label>
                    <input
                      type="text"
                      value={signupForm.name}
                      onChange={(event) => setSignupForm((current) => ({ ...current, name: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-moss/30 focus:outline-none"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">Role</label>
                    <select
                      value={signupForm.role}
                      onChange={(event) => setSignupForm((current) => ({ ...current, role: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white focus:border-moss/30 focus:outline-none"
                    >
                      {authRoles.map((role) => (
                        <option key={role.id} value={role.id} className="bg-forest-900">
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">Email</label>
                    <input
                      type="email"
                      value={signupForm.email}
                      onChange={(event) => setSignupForm((current) => ({ ...current, email: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-moss/30 focus:outline-none"
                      placeholder="Create your email"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">Password</label>
                    <input
                      type="password"
                      value={signupForm.password}
                      onChange={(event) => setSignupForm((current) => ({ ...current, password: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-moss/30 focus:outline-none"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">Region</label>
                    <input
                      type="text"
                      value={signupForm.region}
                      onChange={(event) => setSignupForm((current) => ({ ...current, region: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-moss/30 focus:outline-none"
                      placeholder="Assigned forest region"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-moss px-5 py-3.5 text-sm font-semibold text-forest-950 transition hover:scale-[1.01]"
                  >
                    Create Role Account
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
                {message}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
