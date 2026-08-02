import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Sun, Moon, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('admin@byteme.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate small latency
    setTimeout(() => {
      handleLogin();
      setLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col justify-between bg-slate-50 dark:bg-[#070d1e] text-slate-800 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px]"></div>

      {/* Floating Theme Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/60 text-slate-600 dark:text-slate-300 shadow-md cursor-pointer hover:scale-105 transition-transform"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="w-full max-w-md bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 rounded-[32px] p-8 shadow-2xl transition-all">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-accent p-3.5 rounded-2xl text-white shadow-xl shadow-accent/20 mb-4 animate-sparkle">
              <Sparkles className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white m-0">ByteMe</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">AI-Powered Business Automation Platform</p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Password</label>
                <a href="#forgot" className="text-xs text-accent hover:underline font-medium">Forgot?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white py-3 px-4 rounded-xl text-sm font-bold shadow-lg shadow-accent/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Sign In'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <span className="relative bg-slate-50 dark:bg-slate-900 px-3 text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Or continue with</span>
          </div>

          {/* Google Button */}
          <button
            onClick={onSubmit}
            className="w-full bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 py-3 px-4 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all cursor-pointer"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.69 5.69 0 0 1 8.3 12.825a5.69 5.69 0 0 1 5.691-5.69c2.457 0 4.298 1.436 4.887 2.8l3.6-1.5C21.365 5.565 17.9 3 13.99 3c-5.5 0-10 4.5-10 10s4.5 10 10 10c6.04 0 9.8-4.24 9.8-9.8a8.8 8.8 0 0 0-.15-1.915H12.24Z"/>
            </svg>
            Google Workspace
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="text-center py-6 text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-2">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        Secured by ByteMe Advanced Sentinel Encryption.
      </footer>
    </div>
  );
};

export default Login;
