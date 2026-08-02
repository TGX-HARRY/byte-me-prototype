import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Bell, Search, User } from 'lucide-react';

const Topbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Extract page title from route
  const getPageTitle = () => {
    const path = location.pathname.substring(1);
    if (!path) return 'Dashboard';
    if (path === 'hr') return 'Human Resources';
    if (path === 'crm') return 'CRM Pipeline';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800/60 bg-white/70 dark:bg-[#0c1932]/70 backdrop-blur-md flex items-center justify-between px-8 z-10 sticky top-0 transition-colors duration-300">
      {/* Search & Breadcrumb */}
      <div className="flex items-center gap-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 m-0 capitalize">
          {getPageTitle()}
        </h2>
        <div className="relative max-w-xs hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search dashboard..."
            className="w-64 pl-10 pr-4 py-1.5 text-sm rounded-full bg-slate-100 dark:bg-slate-800/50 border-0 focus:outline-none focus:ring-2 focus:ring-accent text-slate-700 dark:text-slate-200 transition-all placeholder-slate-400"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300 transition-all relative cursor-pointer">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900"></span>
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>

        {/* User profile */}
        <div className="flex items-center gap-3 pl-1">
          <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-semibold text-sm">
            A
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-none">Admin User</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-none mt-1">Super Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
