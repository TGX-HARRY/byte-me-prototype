import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  User,
  Shield,
  Bell,
  Sliders,
  Settings as SettingsIcon,
  CheckCircle,
  Moon,
  Sun,
  Eye,
  Key,
  ShieldAlert
} from 'lucide-react';

const rolesData = [
  { name: 'Admin', description: 'Complete read/write configurations across CRM, HR, Finance, Operations and Settings modules.', users: '2 assigned' },
  { name: 'HR Manager', description: 'Manage employee directories, add records, trigger JD uploads, and perform candidate screening.', users: '3 assigned' },
  { name: 'Sales Specialist', description: 'Manage CRM Pipeline Kanban, shift deal cards, update budgets, and view AI recommendations.', users: '5 assigned' },
  { name: 'Operations Engineer', description: 'Configure autonomic cron loops, audit system load, toggle tasks, and audit latency metrics.', users: '2 assigned' },
  { name: 'Support Agent', description: 'Audit resolution tickets, toggle Pending/Resolved boards, and trigger customer chat briefs.', users: '4 assigned' }
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'security' | 'notifications' | 'rbac'
  const { theme, toggleTheme } = useTheme();
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@byteme.com',
    company: 'ByteMe AI Tech Solutions',
    timezone: 'Asia/Kolkata (GMT+5:30)'
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    sessionExpiry: '1 hour',
    aiBroadcaster: true
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    whatsappAlerts: true,
    cronFails: true,
    weeklyLedger: false
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white m-0">
          Global App Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Adjust security protocols, notifications intervals, customize profile sheets, and define RBAC levels.
        </p>
      </div>

      {/* Main layout: left tabs nav, right form panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left tabs nav */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900/40 p-4 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium h-fit space-y-1.5">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-accent text-white shadow-md shadow-accent/20'
                : 'text-slate-500 dark:text-slate-450 hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
            }`}
          >
            <User className="h-4.5 w-4.5" />
            User Profile
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-accent text-white shadow-md shadow-accent/20'
                : 'text-slate-500 dark:text-slate-450 hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
            }`}
          >
            <Shield className="h-4.5 w-4.5" />
            App Security
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-accent text-white shadow-md shadow-accent/20'
                : 'text-slate-500 dark:text-slate-450 hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
            }`}
          >
            <Bell className="h-4.5 w-4.5" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('rbac')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'rbac'
                ? 'bg-accent text-white shadow-md shadow-accent/20'
                : 'text-slate-500 dark:text-slate-450 hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
            }`}
          >
            <Sliders className="h-4.5 w-4.5" />
            RBAC User Roles
          </button>
        </div>

        {/* Right forms container */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium">
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-6">
              <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Profile Sheet</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Corporate Name</label>
                  <input
                    type="text"
                    required
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Company Unit</label>
                  <input
                    type="text"
                    required
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Timezone</label>
                  <select
                    value={profile.timezone}
                    onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-xs focus:outline-none"
                  >
                    <option value="Asia/Kolkata (GMT+5:30)">Asia/Kolkata (GMT+5:30)</option>
                    <option value="Europe/London (GMT+0:00)">Europe/London (GMT+0:00)</option>
                    <option value="America/New_York (GMT-5:00)">America/New_York (GMT-5:00)</option>
                    <option value="Asia/Singapore (GMT+8:00)">Asia/Singapore (GMT+8:00)</option>
                  </select>
                </div>
              </div>

              {/* Theme Settings block inside profile */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <h4 className="text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-3">Workspace UI Mode</h4>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => theme === 'dark' && toggleTheme()}
                    className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold cursor-pointer transition-all ${
                      theme === 'light'
                        ? 'bg-accent/15 text-accent border-accent/25'
                        : 'border-slate-200 dark:border-slate-800 text-slate-550 dark:text-slate-400'
                    }`}
                  >
                    <Sun className="h-4.5 w-4.5" />
                    Light Theme
                  </button>
                  <button
                    type="button"
                    onClick={() => theme === 'light' && toggleTheme()}
                    className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold cursor-pointer transition-all ${
                      theme === 'dark'
                        ? 'bg-accent/15 text-accent border-accent/25'
                        : 'border-slate-200 dark:border-slate-800 text-slate-550 dark:text-slate-400'
                    }`}
                  >
                    <Moon className="h-4.5 w-4.5" />
                    Dark Theme
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                {saveSuccess ? (
                  <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5 animate-pulse">
                    <CheckCircle className="h-4 w-4" />
                    Profile changes successfully updated.
                  </span>
                ) : (
                  <span></span>
                )}
                <button
                  type="submit"
                  className="px-6 py-2 bg-accent text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 cursor-pointer"
                >
                  Save Settings
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: SECURITY */}
          {activeTab === 'security' && (
            <form onSubmit={handleSave} className="space-y-6">
              <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2 font-black">Security Protocols</h3>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/10 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-slate-850 dark:text-slate-200">Two-Factor Authentication (2FA)</span>
                    <p className="text-[10px] text-slate-400 mt-1 leading-none">Force Google Authenticator MFA alerts on login</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={security.twoFactor}
                    onChange={(e) => setSecurity({ ...security, twoFactor: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/10 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-slate-850 dark:text-slate-200">Byte AI Autonomic Broadcasts</span>
                    <p className="text-[10px] text-slate-400 mt-1 leading-none">Allow model vectors to periodically inspect lead actions</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={security.aiBroadcaster}
                    onChange={(e) => setSecurity({ ...security, aiBroadcaster: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent"
                  />
                </label>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Session Expiry Timeout</label>
                  <select
                    value={security.sessionExpiry}
                    onChange={(e) => setSecurity({ ...security, sessionExpiry: e.target.value })}
                    className="w-full max-w-xs px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-xs focus:outline-none"
                  >
                    <option value="30 minutes">30 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="12 hours">12 hours</option>
                    <option value="Never expiry">Never expiry</option>
                  </select>
                </div>
              </div>

              {/* API credential display */}
              <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                  <ShieldAlert className="h-4 w-4 text-accent" />
                  Developer API Tokens
                </h4>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-250/20 dark:border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500">btm_live_sec_89df201...xcd3a9</span>
                  <button
                    type="button"
                    onClick={() => alert("Developer API Key copied to clipboard safely.")}
                    className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-250/40 text-[10px] font-bold rounded hover:bg-slate-100 text-slate-650 cursor-pointer"
                  >
                    Reveal Key
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                {saveSuccess ? (
                  <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4" />
                    Security protocols updated.
                  </span>
                ) : (
                  <span></span>
                )}
                <button
                  type="submit"
                  className="px-6 py-2 bg-accent text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 cursor-pointer"
                >
                  Save Security
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <form onSubmit={handleSave} className="space-y-6">
              <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Notifications Channels</h3>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/10 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-slate-850 dark:text-slate-200">SMTP Email Notifications</span>
                    <p className="text-[10px] text-slate-405 mt-1 leading-none">Deliver weekly reports and ledger summaries to email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailAlerts}
                    onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/10 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-slate-850 dark:text-slate-200">WhatsApp Alert Dispatcher</span>
                    <p className="text-[10px] text-slate-405 mt-1 leading-none">Broadcast CRM close warnings directly to active reps</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.whatsappAlerts}
                    onChange={(e) => setNotifications({ ...notifications, whatsappAlerts: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/10 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-slate-850 dark:text-slate-200">autonomic Cron Fails Alerts</span>
                    <p className="text-[10px] text-slate-405 mt-1 leading-none">Ping Slack channel if indexing cron tasks exit unexpectedly</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.cronFails}
                    onChange={(e) => setNotifications({ ...notifications, cronFails: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent"
                  />
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                {saveSuccess ? (
                  <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4" />
                    Notification paths updated.
                  </span>
                ) : (
                  <span></span>
                )}
                <button
                  type="submit"
                  className="px-6 py-2 bg-accent text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 cursor-pointer"
                >
                  Save Channels
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: RBAC USER ROLES */}
          {activeTab === 'rbac' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">RBAC User Roles</h3>
              
              <div className="space-y-4">
                {rolesData.map((role, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-250/20 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10 hover:bg-slate-100/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-850 dark:text-slate-100 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        {role.name}
                      </h4>
                      <p className="text-[11px] leading-relaxed text-slate-400 mt-1.5">{role.description}</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide shrink-0">
                      {role.users}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
