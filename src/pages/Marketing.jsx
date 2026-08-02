import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { campaignsData, aiEmailTemplates } from '../data/marketing';
import {
  Sparkles,
  Megaphone,
  Mail,
  Send,
  CheckCircle,
  Copy,
  ChevronRight
} from 'lucide-react';

const Marketing = () => {
  const [campaigns, setCampaigns] = useState(campaignsData);
  const [selectedTemplate, setSelectedTemplate] = useState('welcome'); // 'welcome' | 'promo' | 'retarget'
  const [clientName, setClientName] = useState('Priyanshu');
  const [generatedDraft, setGeneratedDraft] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedDraft(null);

    // Simulate AI thinking and building
    setTimeout(() => {
      const template = aiEmailTemplates[selectedTemplate];
      const compiledBody = template.body.replace('{{contact_name}}', clientName);
      
      setGeneratedDraft({
        subject: template.subject,
        body: compiledBody
      });
      setIsGenerating(false);
    }, 1800);
  };

  const handleCopy = () => {
    if (!generatedDraft) return;
    navigator.clipboard.writeText(`Subject: ${generatedDraft.subject}\n\n${generatedDraft.body}`);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white m-0">
          Marketing Outreach Engine
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Monitor campaign conversion flows across channels and build AI email/outreach copy.
        </p>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-white dark:bg-slate-900/40 p-5 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {camp.channel}
                </span>
                <span className={`w-2 h-2 rounded-full ${camp.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white mt-3.5 mb-1 leading-snug">{camp.name}</h4>
              <p className="text-xs text-slate-400 font-semibold mt-0">{camp.spent} spent</p>
            </div>

            <div className="mt-5 border-t border-slate-100 dark:border-slate-800/80 pt-3.5 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[9px] font-bold text-slate-400 block uppercase">Outreach Metric</span>
                <span className="font-bold text-slate-700 dark:text-slate-350">{camp.metric1}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-400 block uppercase">Conversion Metric</span>
                <span className="font-bold text-slate-700 dark:text-slate-350">{camp.metric2}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Copy Builder Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Configurations Form Left (Col span 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-accent/15 p-2 rounded-xl text-accent border border-accent/20">
                <Sparkles className="h-4.5 w-4.5 animate-pulse" />
              </div>
              <h3 className="text-sm font-bold text-slate-850 dark:text-white m-0">ByteMe Cognitive Copywriter</h3>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Target Client Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Priyanshu Sharma"
                className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Template Style</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-250/20 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-900/40">
                  <input
                    type="radio"
                    name="template"
                    checked={selectedTemplate === 'welcome'}
                    onChange={() => setSelectedTemplate('welcome')}
                    className="accent-accent"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-white m-0 leading-none">New Account Welcome</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-none">Standard welcome onboarding setup steps</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-250/20 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-900/40">
                  <input
                    type="radio"
                    name="template"
                    checked={selectedTemplate === 'promo'}
                    onChange={() => setSelectedTemplate('promo')}
                    className="accent-accent"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-white m-0 leading-none">24h Promotion Discount</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-none">Offer 30% discount on enterprise plans</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-250/20 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-900/40">
                  <input
                    type="radio"
                    name="template"
                    checked={selectedTemplate === 'retarget'}
                    onChange={() => setSelectedTemplate('retarget')}
                    className="accent-accent"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-white m-0 leading-none">Features Re-engagement</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-none">Highlight auto-billing and AI tools</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full mt-6 py-2.5 bg-accent text-white text-xs font-bold rounded-xl shadow-lg shadow-accent/25 hover:opacity-95 disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? 'Drafting Campaign Email...' : 'Generate AI outreach Draft'}
          </button>
        </div>

        {/* Generated Copy Output Right (Col span 3) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium min-h-[350px] flex flex-col justify-between relative overflow-hidden">
          {isGenerating && <div className="scanline"></div>}

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5">Copy Draft Output</h3>

            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center text-xs text-slate-400 space-y-3"
                >
                  <Sparkles className="h-7 w-7 text-accent animate-spin" />
                  <p>Assembling copy points and generating email structure...</p>
                </motion.div>
              ) : generatedDraft ? (
                <motion.div
                  key="draft"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {/* Subject Line */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/60 dark:border-slate-800/80 text-xs">
                    <span className="text-slate-400 font-bold">Subject:</span>{' '}
                    <strong className="text-slate-700 dark:text-slate-200">{generatedDraft.subject}</strong>
                  </div>

                  {/* Body Copy */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/60 dark:border-slate-800/80 text-xs leading-relaxed text-slate-700 dark:text-slate-350 whitespace-pre-wrap font-mono min-h-[180px]">
                    {generatedDraft.body}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center text-xs text-slate-450 space-y-2"
                >
                  <Mail className="h-8 w-8 text-slate-300 dark:text-slate-700" />
                  <p className="font-semibold">No active copy draft generated.</p>
                  <p className="text-[10px]">Select a template and click build to run the AI engine.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {generatedDraft && !isGenerating && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copySuccess ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Code Draft
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  alert("Outreach Campaign successfully dispatched via SMTP and Twilio node endpoints.");
                }}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-accent text-white hover:opacity-95 shadow-md shadow-accent/15 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                Dispatch Outreach
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketing;
