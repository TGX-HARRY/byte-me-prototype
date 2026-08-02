import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initialLeads } from '../data/crm';
import {
  Sparkles,
  ArrowRightLeft,
  X,
  IndianRupee,
  ShieldAlert,
  Mail,
  User,
  Plus
} from 'lucide-react';

const CRM = () => {
  const [pipeline, setPipeline] = useState(initialLeads);
  const [selectedLead, setSelectedLead] = useState(null);

  // Move lead stage helper
  const moveLead = (leadId, currentStage, targetStage) => {
    const leadToMove = pipeline[currentStage].find(l => l.id === leadId);
    if (!leadToMove) return;

    // Filter out from current stage
    const updatedCurrent = pipeline[currentStage].filter(l => l.id !== leadId);
    // Add to target stage
    const updatedTarget = [...pipeline[targetStage], leadToMove];

    setPipeline({
      ...pipeline,
      [currentStage]: updatedCurrent,
      [targetStage]: updatedTarget
    });
    
    // Update active details overlay if it's currently open
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => ({ ...prev, stage: targetStage }));
    }
  };

  const stages = ['New', 'Contacted', 'Proposal', 'Won'];

  return (
    <div className="p-8 space-y-6">
      {/* CRM header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white m-0">
            Deals & Leads Pipeline
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time pipeline tracking and automated AI recommendation workflows.
          </p>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stages.map((stage) => {
          const leads = pipeline[stage] || [];
          return (
            <div
              key={stage}
              className="bg-slate-100/60 dark:bg-slate-900/20 rounded-[24px] border border-slate-200/40 dark:border-slate-800/40 p-4 min-h-[500px] flex flex-col"
            >
              {/* Column Header */}
              <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-sm font-black text-slate-700 dark:text-slate-300">{stage}</span>
                <span className="px-2 py-0.5 text-xs font-bold bg-slate-200 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400">
                  {leads.length}
                </span>
              </div>

              {/* Lead Cards list */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {leads.map((lead) => (
                    <motion.div
                      layout
                      key={lead.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 shadow-premium hover:shadow-lg cursor-pointer group"
                      onClick={() => setSelectedLead({ ...lead, stage })}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          lead.priority === 'Critical' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/25' :
                          lead.priority === 'High' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25' :
                          'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {lead.priority}
                        </span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-300 flex items-center">
                          {lead.budget}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-800 dark:text-white mt-3 group-hover:text-accent transition-colors">
                        {lead.company}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {lead.contactPerson}
                      </p>

                      {/* Small AI indicator */}
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[10px] text-accent font-bold">
                          <Sparkles className="h-3 w-3" />
                          AI Evaluated
                        </span>
                        
                        {/* Shifter actions (prevent click bubblers) */}
                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                          {stages.indexOf(stage) > 0 && (
                            <button
                              onClick={() => moveLead(lead.id, stage, stages[stages.indexOf(stage) - 1])}
                              className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-[10px] font-semibold cursor-pointer"
                              title="Move back"
                            >
                              ←
                            </button>
                          )}
                          {stages.indexOf(stage) < stages.length - 1 && (
                            <button
                              onClick={() => moveLead(lead.id, stage, stages[stages.indexOf(stage) + 1])}
                              className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-[10px] font-semibold cursor-pointer"
                              title="Move next"
                            >
                              →
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {leads.length === 0 && (
                  <div className="h-32 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center text-xs text-slate-400">
                    Drag/Move deals here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* DRAWER / MODAL: LEAD DETAIL & AI RECOMMENDATION */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[28px] max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded">
                  Stage: {selectedLead.stage}
                </span>
                <span className="px-2.5 py-0.5 bg-accent/15 text-accent text-[10px] font-bold rounded flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Score: 89%
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-800 dark:text-white m-0">{selectedLead.company}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" />
                {selectedLead.email}
              </p>

              {/* Deal stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 border-t border-b border-slate-100 dark:border-slate-800/80 py-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Contact</span>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{selectedLead.contactPerson}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deal Budget</span>
                  <p className="text-sm font-bold text-slate-850 dark:text-white mt-1 flex items-center gap-0.5">
                    <IndianRupee className="h-4 w-4" />
                    {selectedLead.budget}
                  </p>
                </div>
              </div>

              {/* AI Recommendations Panel */}
              <div className="mt-6 bg-accent/5 dark:bg-accent/10 p-5 rounded-2xl border border-accent/25 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-2 text-accent font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  AI Agent Recommendation Brief
                </div>
                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 m-0">
                  {selectedLead.aiRecommendation}
                </p>
              </div>

              {/* Form shift dropdown */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <ArrowRightLeft className="h-4 w-4" />
                  Change Stage:
                </div>
                <select
                  value={selectedLead.stage}
                  onChange={(e) => {
                    moveLead(selectedLead.id, selectedLead.stage, e.target.value);
                  }}
                  className="px-3.5 py-1.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-xs focus:outline-none"
                >
                  {stages.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CRM;
