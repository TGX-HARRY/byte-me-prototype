import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supportTickets, chatbotScript } from '../data/support';
import {
  Headphones,
  Sparkles,
  Search,
  X,
  Send,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

const Support = () => {
  const [activeTab, setActiveTab] = useState('Open'); // 'Open' | 'Pending' | 'Resolved'
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: chatbotScript.welcome }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleQuickQuestion = (option) => {
    if (isTyping) return;

    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', text: option.text }]);
    setIsTyping(true);

    // AI response delay
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'ai', text: option.response }]);
      setIsTyping(false);
    }, 1000);
  };

  const currentTickets = supportTickets[activeTab] || [];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white m-0">
          Customer Support Center
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Audit customer ticket statuses, priorities, and run custom support AI agent chats.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Board Left (Col span 2) */}
        <div className="lg:col-span-2 space-y-4 flex flex-col">
          {/* Tabs */}
          <div className="flex bg-slate-100/60 dark:bg-slate-900/20 p-1.5 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 w-fit">
            {Object.keys(supportTickets).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-premium'
                    : 'text-slate-500 hover:text-slate-850 dark:hover:text-slate-300'
                }`}
              >
                {tab} ({supportTickets[tab].length})
              </button>
            ))}
          </div>

          {/* Ticket Listing */}
          <div className="space-y-3">
            {currentTickets.map((tkt, idx) => (
              <motion.div
                key={tkt.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-900/40 p-5 rounded-[20px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium flex items-center justify-between gap-4"
              >
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    <Headphones className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-850 dark:text-white leading-none">
                      {tkt.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400 font-semibold">
                      <span>{tkt.id}</span>
                      <span>•</span>
                      <span>By {tkt.user}</span>
                      <span>•</span>
                      <span>{tkt.date}</span>
                    </div>
                  </div>
                </div>

                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                  tkt.priority === 'Critical' ? 'bg-rose-500/10 text-rose-600 border-rose-500/25' :
                  tkt.priority === 'High' ? 'bg-amber-500/10 text-amber-600 border-amber-500/25' :
                  tkt.priority === 'Medium' ? 'bg-indigo-500/10 text-indigo-600 border-indigo-500/25' :
                  'bg-slate-100 text-slate-600 dark:bg-slate-800 border-slate-300/10'
                }`}>
                  {tkt.priority}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chatbot Side Panel Right (Col span 1) */}
        <div className="bg-white dark:bg-slate-900/40 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium flex flex-col justify-between h-[500px] overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/50 dark:border-slate-800/80 flex items-center gap-3 shrink-0">
            <div className="bg-accent/15 p-2 rounded-xl text-accent border border-accent/20">
              <Sparkles className="h-4.5 w-4.5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-white m-0 uppercase tracking-wide">Byte Support Copilot</h3>
              <span className="text-[10px] text-emerald-500 font-semibold">Online & Automated</span>
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-accent text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-850 text-slate-800 dark:text-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-850 text-slate-400 rounded-xl rounded-tl-none px-3 py-2 flex gap-1 items-center">
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Preset Buttons & actions */}
          <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/20 shrink-0 space-y-3">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Common Audit Issues</span>
            <div className="grid grid-cols-2 gap-2">
              {chatbotScript.options.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleQuickQuestion(opt)}
                  className="px-2.5 py-1.5 text-[10px] text-left font-semibold rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 hover:bg-accent/5 hover:text-accent dark:hover:text-accent dark:text-slate-300 text-slate-700 transition-all cursor-pointer leading-tight truncate"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
