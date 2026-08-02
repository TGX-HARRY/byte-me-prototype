import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Handshake,
  Megaphone,
  IndianRupee,
  Headphones,
  Cpu,
  BarChart3,
  Settings as SettingsIcon,
  LogOut,
  Sparkles
} from 'lucide-react';

const menuItems = [
  { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { path: '/hr', name: 'HR', icon: Users },
  { path: '/crm', name: 'CRM', icon: Handshake },
  { path: '/marketing', name: 'Marketing', icon: Megaphone },
  { path: '/finance', name: 'Finance', icon: IndianRupee },
  { path: '/support', name: 'Support', icon: Headphones },
  { path: '/operations', name: 'Operations', icon: Cpu },
  { path: '/analytics', name: 'Analytics', icon: BarChart3 },
  { path: '/settings', name: 'Settings', icon: SettingsIcon },
];

const Sidebar = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 min-h-screen bg-[var(--bg-sidebar)] text-[var(--text-sidebar)] flex flex-col justify-between border-r border-slate-800/20 shrink-0 transition-colors duration-300">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800/30 gap-3">
          <div className="bg-accent p-2 rounded-xl text-white shadow-lg shadow-accent/20">
            <Sparkles className="h-5 w-5 animate-sparkle" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white m-0 leading-none">ByteMe</h1>
            <span className="text-[10px] text-accent font-semibold tracking-wider uppercase">AI Automation</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-accent text-white shadow-md shadow-accent/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout Area */}
      <div className="p-4 border-t border-slate-800/30">
        <button
          onClick={() => {
            handleLogout();
            navigate('/login');
          }}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
