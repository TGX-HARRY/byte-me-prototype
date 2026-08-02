import React from 'react';
import { motion } from 'framer-motion';
import {
  salesDistribution,
  hiringFunnelData,
  supportResponseTime,
  heatmapData
} from '../data/analytics';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { Sparkles, Calendar, TrendingUp } from 'lucide-react';

// Help helper for heatmap cell colors matching intensity
const getHeatmapColor = (value) => {
  if (value < 10) return 'bg-slate-100 dark:bg-slate-900 border-slate-200/20';
  if (value < 30) return 'bg-accent/15 text-accent/80 border-accent/10';
  if (value < 60) return 'bg-accent/40 text-white border-accent/20';
  if (value < 85) return 'bg-accent/70 text-white border-accent/30';
  return 'bg-accent text-white border-accent/40 shadow-sm shadow-accent/25';
};

const Analytics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white m-0">
          Executive Reports & Analytics
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Deep-dive visual audits covering revenue splits, funnel leakage, ticket response benchmarks, and machine operations.
        </p>
      </div>

      {/* Row 1: Pie Donut + Funnel Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sales Revenue split Pie chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-850 dark:text-white m-0">Sales Revenue Splits</h3>
            <p className="text-xs text-slate-450 mt-1">Distribution of contracts MTD across package tiers</p>
          </div>
          <div className="h-64 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="75%"
                  paddingAngle={4}
                  dataKey="value"
                >
                  {salesDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                  contentStyle={{
                    backgroundColor: '#13294B',
                    color: '#fff',
                    borderRadius: '16px',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Overlay Center */}
            <div className="absolute text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
              <p className="text-base font-black text-slate-800 dark:text-white m-0">₹12.4L</p>
            </div>
          </div>

          {/* Custom legend */}
          <div className="space-y-1.5 mt-2">
            {salesDistribution.map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></span>
                  <span className="text-slate-500 dark:text-slate-405">{entry.name}</span>
                </div>
                <span className="text-slate-800 dark:text-slate-200">₹{(entry.value / 100000).toFixed(2)}L</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recruitment conversion funnel */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-850 dark:text-white m-0">Recruitment Conversion Funnel</h3>
            <p className="text-xs text-slate-450 mt-1">Leakage summary of candidate filters from initial views to hires</p>
          </div>
          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="yaml"
                data={hiringFunnelData}
                margin={{ top: 10, right: 10, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:hidden" />
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" className="hidden dark:block" />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis dataKey="stage" type="category" stroke="#94a3b8" fontSize={10} tickLine={false} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#13294B',
                    color: '#fff',
                    borderRadius: '16px',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" fill="#4F8EF7" radius={[0, 4, 4, 0]} name="Candidates Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Support resolution Line chart */}
      <div className="bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-850 dark:text-white m-0">Support Resolution Response Times</h3>
          <p className="text-xs text-slate-450 mt-1">Average daily resolution time (in minutes) compared with target SLA thresholds</p>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={supportResponseTime} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:hidden" />
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" className="hidden dark:block" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
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
              <Line type="monotone" dataKey="Avg Resolution (mins)" stroke="#4F8EF7" strokeWidth={2.5} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="Target (mins)" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth={1.5} className="stroke-slate-350 dark:stroke-slate-700" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Load Heatmap (CSS grid visualization) */}
      <div className="bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-slate-850 dark:text-white m-0">AI Agent Activity Load Heatmap</h3>
            <p className="text-xs text-slate-450 mt-1">Hourly system process density managed by autonomic cron/trigger routines (24h blocks)</p>
          </div>
        </div>

        {/* Heatmap Layout */}
        <div className="space-y-2 overflow-x-auto pb-2">
          {heatmapData.map((row) => (
            <div key={row.day} className="flex items-center gap-2 min-w-[700px]">
              <span className="w-10 text-xs font-bold text-slate-400 uppercase tracking-wider">{row.day}</span>
              <div className="flex-1 grid grid-cols-24 gap-1.5">
                {row.hours.map((val, hIdx) => (
                  <div
                    key={hIdx}
                    title={`${row.day} at ${hIdx}:00 - Load value: ${val}`}
                    className={`h-6 rounded-md border border-black/5 flex items-center justify-center text-[8px] font-medium transition-colors hover:scale-105 ${getHeatmapColor(val)}`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Heatmap Legend */}
        <div className="flex justify-end gap-4 mt-4 text-[10px] font-bold text-slate-450 uppercase tracking-wide">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200/20"></span>
            Low Load (&lt;10)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-accent/15 border border-accent/10"></span>
            Active (&lt;30)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-accent/40 border border-accent/20"></span>
            High Active (&lt;60)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-accent/70 border border-accent/30"></span>
            Heavy (&lt;85)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-accent border border-accent/40"></span>
            Peak (&gt;85)
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
