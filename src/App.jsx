import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import AIAssistant from './components/AIAssistant';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HR from './pages/HR';
import CRM from './pages/CRM';
import Finance from './pages/Finance';
import Support from './pages/Support';
import Operations from './pages/Operations';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Marketing from './pages/Marketing';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('byteme-logged-in') === 'true';
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('byteme-logged-in', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('byteme-logged-in');
  };

  return (
    <ThemeProvider>
      <HashRouter>
        {!isLoggedIn ? (
          <Routes>
            <Route path="*" element={<Login handleLogin={handleLogin} />} />
          </Routes>
        ) : (
          <div className="flex min-h-screen w-screen bg-[var(--bg-app)] text-[var(--text-main)] transition-colors duration-300">
            {/* Sidebar Left Navigation */}
            <Sidebar handleLogout={handleLogout} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
              {/* Global Topbar */}
              <Topbar />

              {/* Page Content with main wrapper */}
              <main className="flex-grow overflow-y-auto">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/hr" element={<HR />} />
                  <Route path="/crm" element={<CRM />} />
                  <Route path="/marketing" element={<Marketing />} />
                  <Route path="/finance" element={<Finance />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/operations" element={<Operations />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </main>
            </div>

            {/* Global AI Float Copilot */}
            <AIAssistant />
          </div>
        )}
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
