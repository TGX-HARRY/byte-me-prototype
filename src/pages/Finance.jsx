import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { financeStats, invoicesData } from '../data/finance';
import {
  IndianRupee,
  Sparkles,
  Download,
  Printer,
  X,
  FileText,
  CreditCard,
  Plus
} from 'lucide-react';

const Finance = () => {
  const [invoices, setInvoices] = useState(invoicesData);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  
  // Generator states
  const [customer, setCustomer] = useState('TechCorp Industries');
  const [amount, setAmount] = useState('150000');
  const [desc, setDesc] = useState('ByteMe Enterprise Cloud Subscription - Annual');
  const [genInvoice, setGenInvoice] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateInvoice = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate AI generator typing
    setTimeout(() => {
      const newId = `INV-2026-00${invoices.length + 1}`;
      const generated = {
        id: newId,
        customer,
        amount: `₹${parseInt(amount).toLocaleString('en-IN')}`,
        status: 'Pending',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: [
          { desc, qty: 1, price: `₹${parseInt(amount).toLocaleString('en-IN')}` }
        ]
      };
      setGenInvoice(generated);
      setIsGenerating(false);
    }, 1500);
  };

  const saveGeneratedInvoice = () => {
    if (!genInvoice) return;
    setInvoices([genInvoice, ...invoices]);
    setIsGenerateModalOpen(false);
    setGenInvoice(null);
    setAmount('150000');
    setDesc('ByteMe Enterprise Cloud Subscription - Annual');
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white m-0">
            Financial Ledger & Invoices
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track business cashflow summaries, review invoices, and generate billing dynamically.
          </p>
        </div>
        <button
          onClick={() => setIsGenerateModalOpen(true)}
          className="px-4 py-2 text-xs font-bold bg-accent text-white rounded-xl hover:bg-accent/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-accent/25"
        >
          <Sparkles className="h-4 w-4" />
          Generate Invoice (AI)
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {financeStats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium flex flex-col justify-between"
          >
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {stat.name}
            </span>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white m-0 mt-4 leading-none flex items-center gap-1">
              {stat.value}
            </h3>
            <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Invoice Table Card */}
      <div className="bg-white dark:bg-slate-900/40 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 font-bold">
                <th className="px-6 py-4">Invoice #</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">
                    {inv.id}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                    {inv.customer}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-850 dark:text-white">
                    {inv.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                      inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400' :
                      inv.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400' :
                      'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-400">
                    {inv.dueDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-3 py-1.5 text-xs font-bold text-accent bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/15 cursor-pointer"
                    >
                      View Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: VIEW DETAILS & PRINT */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[28px] max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedInvoice(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Printable Area ID */}
              <div id="printable-invoice" className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-800/80">
                <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white m-0">ByteMe Ledger</h2>
                    <span className="text-[10px] text-slate-400 font-semibold tracking-wider">Automated AI Invoice</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800 dark:text-white m-0">{selectedInvoice.id}</p>
                    <p className="text-xs text-slate-400 mt-1">Due: {selectedInvoice.dueDate}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Billed To</span>
                  <p className="text-sm font-bold text-slate-850 dark:text-white">{selectedInvoice.customer}</p>
                </div>

                {/* Items */}
                <div className="mt-6">
                  <div className="grid grid-cols-3 text-xs font-bold text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                    <span className="col-span-2">Description</span>
                    <span className="text-right">Price</span>
                  </div>
                  {selectedInvoice.items?.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-3 text-xs py-3 border-b border-slate-100 dark:border-slate-800/50">
                      <span className="col-span-2 font-semibold text-slate-700 dark:text-slate-300">{item.desc}</span>
                      <span className="text-right font-bold text-slate-800 dark:text-slate-200">{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="mt-6 flex justify-between items-center bg-white dark:bg-slate-900/60 p-4 rounded-xl">
                  <span className="text-xs font-bold text-slate-400">Total Billed</span>
                  <span className="text-base font-black text-slate-800 dark:text-white flex items-center">
                    {selectedInvoice.amount}
                  </span>
                </div>
              </div>

              {/* Actions footer */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={triggerPrint}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-accent text-white flex items-center justify-center gap-1.5 hover:opacity-95 cursor-pointer shadow-md shadow-accent/15"
                >
                  <Printer className="h-4 w-4" />
                  Print / Save PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: GENERATE INVOICE AI */}
      <AnimatePresence>
        {isGenerateModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[28px] max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden"
            >
              <button
                onClick={() => setIsGenerateModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <div className="bg-accent/15 p-2 rounded-xl text-accent border border-accent/20">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-850 dark:text-white m-0">ByteMe Cognitive Billing Agent</h3>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Instant AI Ledger Generation</span>
                </div>
              </div>

              {!genInvoice ? (
                <form onSubmit={handleGenerateInvoice} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Customer / Client</label>
                    <select
                      value={customer}
                      onChange={(e) => setCustomer(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-xs focus:outline-none"
                    >
                      <option value="TechCorp Industries">TechCorp Industries</option>
                      <option value="Prime Health Ltd">Prime Health Ltd</option>
                      <option value="Apex Retail Group">Apex Retail Group</option>
                      <option value="GrowthStart Hub">GrowthStart Hub</option>
                      <option value="Swift Logistics LLC">Swift Logistics LLC</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Billing Amount (₹)</label>
                      <input
                        type="number"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g. 150000"
                        className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Terms</label>
                      <input
                        type="text"
                        disabled
                        value="Net 14 Days"
                        className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-400 rounded-xl text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Billing Description</label>
                    <input
                      type="text"
                      required
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="e.g. Integration services, licenses"
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-xs focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsGenerateModalOpen(false)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-accent text-white flex items-center justify-center gap-1.5 hover:opacity-95 disabled:opacity-50 cursor-pointer"
                    >
                      {isGenerating ? 'Compiling Ledger...' : 'Generate Ledger'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  {/* Generated invoice preview */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-800/80">
                    <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
                      <span className="text-xs font-bold text-accent">DRAFT PREVIEW READY</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-white">{genInvoice.id}</span>
                    </div>
                    <div className="mt-3 text-xs space-y-1">
                      <p><span className="text-slate-400">Customer:</span> <strong className="text-slate-700 dark:text-slate-300">{genInvoice.customer}</strong></p>
                      <p><span className="text-slate-400">Description:</span> <span className="text-slate-700 dark:text-slate-300">{genInvoice.items[0].desc}</span></p>
                      <p><span className="text-slate-400">Total Billed:</span> <strong className="text-slate-800 dark:text-white">{genInvoice.amount}</strong></p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setGenInvoice(null)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 cursor-pointer"
                    >
                      Re-generate
                    </button>
                    <button
                      onClick={saveGeneratedInvoice}
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-accent text-white hover:opacity-95 shadow-md shadow-accent/15 cursor-pointer"
                    >
                      Save & Issue Invoice
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Finance;
