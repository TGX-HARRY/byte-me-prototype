import React from 'react';
import { motion } from 'framer-motion';
import { dashboardStats, aiSummary, revenueChartData, hiringChartData, departmentPerformance } from '../data/dashboard';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Sparkles, IndianRupee, Users, Briefcase, Headphones, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const iconMap = {
  revenue: IndianRupee,
  employees: Users,
  jobs: Briefcase,
  tickets: Headphones
};

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 space-y-8"
    >
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white m-0">
            Good Morning, Admin 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here is your automated AI brief for today, August 3, 2026.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = iconMap[stat.id] || Sparkles;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.1 }}
              className="bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {stat.name}
                </span>
                <div className="p-2.5 rounded-xl bg-accent/10 dark:bg-accent/15 text-accent border border-accent/20">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white m-0 leading-none">
                  {stat.value}
                </h3>
                <div className="flex items-center gap-1.5 mt-2.5">
                  {stat.trend === 'up' && <ArrowUpRight className="h-4 w-4 text-emerald-500 shrink-0" />}
                  {stat.trend === 'down' && <ArrowDownRight className="h-4 w-4 text-rose-500 shrink-0" />}
                  {stat.trend === 'flat' && <Minus className="h-4 w-4 text-slate-400 shrink-0" />}
                  <span className={`text-xs font-semibold ${
                    stat.trend === 'up' ? 'text-emerald-600 dark:text-emerald-500' :
                    stat.trend === 'down' ? 'text-rose-600 dark:text-rose-500' :
                    'text-slate-500 dark:text-slate-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* AI Summary Panel (Glassmorphism Card) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-effect rounded-[24px] p-6 shadow-xl border border-white/20 dark:border-slate-800/80 relative overflow-hidden"
      >
        <div className="scanline"></div>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-accent/15 p-2 rounded-xl text-accent border border-accent/20">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white m-0">ByteMe Executive AI Agent</h3>
            <span className="text-[10px] text-accent font-semibold tracking-wide uppercase">Real-Time Core Briefing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiSummary.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-3 items-start p-3.5 rounded-2xl bg-white/40 dark:bg-slate-900/30 border border-slate-200/20 dark:border-slate-800/40 text-sm text-slate-700 dark:text-slate-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Charts Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Line / Area Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-white m-0">Revenue Operations Trend</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Comparison of actual revenue vs set targets (in Lakhs)</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F8EF7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4F8EF7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:hidden" />
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" className="hidden dark:block" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#13294B',
                    color: '#fff',
                    borderRadius: '16px',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="revenue" name="Actual Revenue (₹)" stroke="#4F8EF7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="target" name="Target Revenue (₹)" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={1.5} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar / Department Performance Chart */}
        <div className="bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-white m-0">Department Performance</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Resource allocation vs target score index</p>
          </div>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={departmentPerformance}>
                <PolarGrid stroke="#94a3b8" opacity={0.3} />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#94a3b8" fontSize={8} />
                <Radar name="Primary Agent" dataKey="A" stroke="#4F8EF7" fill="#4F8EF7" fillOpacity={0.35} />
                <Radar name="Secondary Bench" dataKey="B" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#13294B',
                    color: '#fff',
                    borderRadius: '16px',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quarter Hiring Trend */}
      <div className="bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white m-0">Quarterly Recruitment Trends</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Detailed department headcount growth trends</p>
          </div>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hiringChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:hidden" />
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" className="hidden dark:block" />
              <XAxis dataKey="quarter" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#13294B',
                  color: '#fff',
                  borderRadius: '16px',
                  border: 'none',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="Developers" fill="#4F8EF7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Marketing" fill="#13294B" radius={[4, 4, 0, 0]} className="fill-[#13294B] dark:fill-slate-700" />
              <Bar dataKey="Support" fill="#818cf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
