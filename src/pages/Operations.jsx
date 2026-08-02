import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Sparkles,
  RefreshCw,
  Play,
  Pause,
  CheckCircle,
  AlertOctagon,
  Clock
} from 'lucide-react';

const mockCronTasks = [
  { id: 'cron-1', name: 'Resume screening indexer', trigger: 'Every 5 mins', status: 'Running', lastActive: '2 mins ago', totalRuns: 1420 },
  { id: 'cron-2', name: 'Invoice outstanding reminders', trigger: 'Daily at 9:00 AM', status: 'Idle', lastActive: '19 hours ago', totalRuns: 45 },
  { id: 'cron-3', name: 'CRM hot-lead alert broadcaster', trigger: 'Instant trigger (Webhooks)', status: 'Running', lastActive: '50 secs ago', totalRuns: 8940 },
  { id: 'cron-4', name: 'Marketing campaign dispatch queue', trigger: 'Hourly at minute 0', status: 'Running', lastActive: '44 mins ago', totalRuns: 720 },
  { id: 'cron-5', name: 'Slack/Teams attendance sync utility', status: 'Paused', trigger: 'Daily at 10:30 AM', lastActive: 'Yesterday', totalRuns: 110 }
];

const Operations = () => {
  const [tasks, setTasks] = useState(mockCronTasks);

  const toggleTaskStatus = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          const nextStatus = task.status === 'Running' ? 'Paused' : 'Running';
          return { ...task, status: nextStatus, lastActive: nextStatus === 'Running' ? 'Just now' : task.lastActive };
        }
        return task;
      })
    );
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white m-0">
            System Operations & Health
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitor and toggle autonomic system agent crons, model weights pipeline configurations, and execution loops.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cognitive Node Health</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white mt-1 block">99.8% Uptime</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center text-xs font-bold text-emerald-500">
            99%
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average Model Latency</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white mt-1 block">184 ms</span>
          </div>
          <div className="p-3 bg-accent/10 rounded-xl text-accent border border-accent/25">
            <Cpu className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Automations Active</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white mt-1 block">4 / 5 Crons</span>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-500 border border-indigo-500/25">
            <RefreshCw className="h-5 w-5 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>
      </div>

      {/* Cron lists */}
      <div className="bg-white dark:bg-slate-900/40 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/40">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white m-0">Autonomic Agent Crons</h3>
          <span className="text-[10px] font-bold text-slate-450 uppercase">Operational Status</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {tasks.map((task) => (
            <div key={task.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/20 dark:hover:bg-slate-800/10 transition-colors">
              <div className="flex gap-4 items-start">
                <div className={`p-2.5 rounded-xl border ${
                  task.status === 'Running' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/25' :
                  task.status === 'Paused' ? 'bg-slate-200 dark:bg-slate-800 text-slate-405 border-slate-300/10' :
                  'bg-amber-500/10 text-amber-600 border-amber-500/25'
                }`}>
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-none">{task.name}</h4>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {task.trigger}</span>
                    <span>•</span>
                    <span>Last run: {task.lastActive}</span>
                    <span>•</span>
                    <span>Total executions: {task.totalRuns}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  task.status === 'Running' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/25 dark:text-emerald-400' :
                  task.status === 'Paused' ? 'bg-slate-100 text-slate-600 border-slate-350/20 dark:bg-slate-800 dark:text-slate-400' :
                  'bg-amber-500/10 text-amber-600 border-amber-500/25'
                }`}>
                  {task.status}
                </span>

                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    task.status === 'Running'
                      ? 'bg-rose-500/10 text-rose-500 border-rose-500/25 hover:bg-rose-500/15'
                      : 'bg-accent/10 text-accent border-accent/25 hover:bg-accent/15'
                  }`}
                  title={task.status === 'Running' ? 'Pause Automation' : 'Resume Automation'}
                >
                  {task.status === 'Running' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Operations;
