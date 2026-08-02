import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, X, Send } from 'lucide-react';

const chipAnswers = {
  'Generate report': 'I have compiled a quick overview of the business. Active employees: 245. Open Jobs: 18. Match score average for recruitment: 86%. Month-to-date revenue is ₹12.4L (up 14.2%). Go to the Analytics module to view heatmaps and detailed metrics.',
  'Schedule interviews': 'I can assist in scheduling developer rounds. Candidates: Alice Sen (96% match) and Rahul Varma (91% match) are ready for interview setup. Navigate to HR > Recruitment to pick a date and time.',
  'Generate email': 'I have drafted an outreach email in Marketing > Email Generator. It is ready for your review. Customize the subject and click "Generate Draft" to run the visual builder.',
  'Summarize sales': 'Sales pipeline summary: 2 New leads, 2 Contacted, 1 Proposal, and 1 Won (Sky Telecom - ₹15L). Recommended priority follow-up: Prime Health Ltd (Critical, budget ₹8L, proposal under legal review).',
  'Analyze revenue': 'Revenue totals ₹12.4L, exceeding target by 37.7%. Expenses are stable at ₹4.15L. Net profits are ₹8.25L. The SaaS subscription split is: Enterprise (52%), SMB (33%), and Startup Tier (15%).'
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi! I'm Byte AI, your automation assistant. Ask me anything or click a quick action below." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleChipClick = (chipText) => {
    if (isTyping) return;

    // Add user message
    const userMsg = { sender: 'user', text: chipText };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responseText = chipAnswers[chipText] || "I'm processing that. Let me look up the active modules.";
      setMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      // Look for keywords in typed message
      const textLower = userText.toLowerCase();
      let responseText = "I'm still learning. Try choosing one of my quick-action chips above for immediate insights about CRM, HR, Finance, or Marketing details.";
      
      if (textLower.includes('revenue') || textLower.includes('sales') || textLower.includes('finance')) {
        responseText = chipAnswers['Analyze revenue'];
      } else if (textLower.includes('interview') || textLower.includes('candidate') || textLower.includes('hire') || textLower.includes('recru')) {
        responseText = chipAnswers['Schedule interviews'];
      } else if (textLower.includes('report') || textLower.includes('stat')) {
        responseText = chipAnswers['Generate report'];
      } else if (textLower.includes('email') || textLower.includes('marketing') || textLower.includes('campaign')) {
        responseText = chipAnswers['Generate email'];
      } else if (textLower.includes('hello') || textLower.includes('hi ') || textLower.includes('hey')) {
        responseText = "Hello there! How can I assist you with your business dashboard operations today?";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/40 cursor-pointer focus:outline-none transition-transform hover:scale-105"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Sparkles className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-accent animate-ping"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="absolute bottom-16 right-0 w-96 max-h-[500px] h-[500px] rounded-3xl glass-effect shadow-2xl flex flex-col border border-white/20 dark:border-slate-800/80 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-darknavy px-5 py-4 flex items-center gap-3 border-b border-slate-200/10 text-white shrink-0">
              <div className="bg-accent/15 p-2 rounded-xl text-accent border border-accent/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold m-0 leading-none">ByteMe AI</h3>
                <span className="text-[10px] text-accent/80 font-medium">Assistant Active</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-accent text-white rounded-br-none shadow-sm'
                        : 'bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-bl-none shadow-premium'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800/80 text-slate-400 border border-slate-100 dark:border-slate-800 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions Chips */}
            <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-slate-200/5 dark:border-slate-800/40 shrink-0 bg-slate-50/50 dark:bg-slate-900/10">
              {Object.keys(chipAnswers).map((chipText) => (
                <button
                  key={chipText}
                  onClick={() => handleChipClick(chipText)}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-slate-200/60 dark:bg-slate-800/70 hover:bg-accent/15 dark:hover:bg-accent/25 hover:text-accent dark:hover:text-accent dark:text-slate-300 text-slate-700 transition-all border border-slate-300/10 cursor-pointer"
                >
                  {chipText}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200/10 dark:border-slate-800/60 flex gap-2 shrink-0 bg-white dark:bg-slate-900/40">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Byte AI..."
                className="flex-1 px-4 py-2 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-1 focus:ring-accent text-slate-800 dark:text-slate-100"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-accent text-white flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistant;
