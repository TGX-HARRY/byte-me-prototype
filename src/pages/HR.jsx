import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { employeesData } from '../data/employees';
import { candidatesData } from '../data/candidates';
import {
  Users,
  Briefcase,
  Plus,
  Sparkles,
  FileText,
  Upload,
  CheckCircle2,
  ChevronRight,
  Calendar,
  X,
  Clock,
  UserCheck,
  Search,
  AlertCircle
} from 'lucide-react';

const screeningSteps = [
  "Uploading resumes...",
  "Parsing resumes",
  "Extracting skills",
  "Comparing JD",
  "Ranking candidates",
  "Completed"
];

const HR = () => {
  const [activeSubTab, setActiveSubTab] = useState('employees'); // 'employees' | 'recruitment'
  
  // Employees Tab States
  const [employees, setEmployees] = useState(employeesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showAttendanceReport, setShowAttendanceReport] = useState(false);
  const [attendanceReportText, setAttendanceReportText] = useState('');
  const [reportLoading, setReportLoading] = useState(false);
  
  // New Employee Form
  const [newEmp, setNewEmp] = useState({ name: '', role: '', department: 'Engineering', attendance: 'Present', salary: '', email: '' });

  // Recruitment Tab States
  const [jdFile, setJdFile] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [screeningState, setScreeningState] = useState('idle'); // 'idle' | 'screening' | 'done'
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');

  // Filter employees
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Trigger AI Attendance Brief
  const handleAIReportClick = () => {
    setReportLoading(true);
    setShowAttendanceReport(true);
    setAttendanceReportText('');
    
    setTimeout(() => {
      setReportLoading(false);
      setAttendanceReportText(
        "AI ATTENDANCE SUMMARY:\n" +
        "• Current daily attendance rate is 87.5% (7 of 8 employees active).\n" +
        "• 2 Engineering personnel are WFH (Rahul Sen, Kabir Mehta).\n" +
        "• Sneha Patel (Marketing) is listed as Absent today without a prior WFH note. AI suggests sending a Slack nudge.\n" +
        "• Shift schedule compliance: Excellent (98.4%). Design & HR operations are fully staffed."
      );
    }, 1200);
  };

  // Add Employee Submit
  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newId = employees.length + 1;
    const addedEmployee = {
      id: newId,
      ...newEmp,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + newId * 100000}?w=150&auto=format&fit=crop&q=80`
    };
    setEmployees([addedEmployee, ...employees]);
    setIsAddModalOpen(false);
    setNewEmp({ name: '', role: '', department: 'Engineering', attendance: 'Present', salary: '', email: '' });
  };

  // Recruitment AI Screen Animation Loop
  const runScreening = () => {
    if (!jdFile || resumes.length === 0) return;
    setScreeningState('screening');
    setCurrentStepIndex(0);
    setCandidates([]);
  };

  useEffect(() => {
    let timer;
    if (screeningState === 'screening' && currentStepIndex < screeningSteps.length) {
      timer = setTimeout(() => {
        if (currentStepIndex === screeningSteps.length - 1) {
          setScreeningState('done');
          setCandidates(candidatesData); // load candidates
        } else {
          setCurrentStepIndex(prev => prev + 1);
        }
      }, 800); // 800ms per step
    }
    return () => clearTimeout(timer);
  }, [screeningState, currentStepIndex]);

  // Schedule interview mock submit
  const handleScheduleInterview = (e) => {
    e.preventDefault();
    if (!interviewDate || !interviewTime) return;
    setScheduleSuccess(true);
    setTimeout(() => {
      setScheduleSuccess(false);
      setSelectedCandidate(null);
      setInterviewDate('');
      setInterviewTime('');
    }, 2000);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Top Section Nav Tabs */}
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800/80 pb-4">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveSubTab('employees')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer transition-all ${
              activeSubTab === 'employees'
                ? 'bg-accent text-white shadow-md shadow-accent/20'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/30'
            }`}
          >
            <Users className="h-4 w-4" />
            Employee Directory
          </button>
          <button
            onClick={() => setActiveSubTab('recruitment')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer transition-all ${
              activeSubTab === 'recruitment'
                ? 'bg-accent text-white shadow-md shadow-accent/20'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/30'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            AI Recruitment Hub
          </button>
        </div>

        {activeSubTab === 'employees' && (
          <div className="flex gap-3">
            <button
              onClick={handleAIReportClick}
              className="px-4 py-2 text-xs font-bold text-accent bg-accent/15 border border-accent/25 rounded-xl hover:bg-accent/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 animate-pulse" />
              AI Attendance Brief
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 text-xs font-bold bg-accent text-white rounded-xl hover:bg-accent/90 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Employee
            </button>
          </div>
        )}
      </div>

      {/* SUBTAB 1: EMPLOYEES DIRECTORY */}
      {activeSubTab === 'employees' && (
        <div className="space-y-6">
          {/* AI Attendance brief response */}
          <AnimatePresence>
            {showAttendanceReport && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="glass-effect rounded-2xl p-5 border border-accent/20 relative overflow-hidden"
              >
                <button
                  onClick={() => setShowAttendanceReport(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex gap-3">
                  <div className="bg-accent/15 p-2 rounded-xl text-accent border border-accent/20 h-fit shrink-0">
                    <Sparkles className="h-4 w-4 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2">System Attendance Audit</h3>
                    {reportLoading ? (
                      <div className="flex gap-1.5 items-center py-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line m-0">
                        {attendanceReportText}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search bar */}
          <div className="flex justify-between items-center bg-white dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 shadow-premium">
            <div className="relative w-full max-w-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, role, department..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800/60 rounded-xl focus:outline-none border-0 text-slate-700 dark:text-slate-200"
              />
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              Showing {filteredEmployees.length} of {employees.length} employees
            </div>
          </div>

          {/* Employees Table Card */}
          <div className="bg-white dark:bg-slate-900/40 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 font-bold">
                    <th className="px-6 py-4">Employee</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Attendance</th>
                    <th className="px-6 py-4">Salary</th>
                    <th className="px-6 py-4">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-800" />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200 leading-none">{emp.name}</p>
                          <p className="text-xs text-slate-400 mt-1">{emp.role}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                        {emp.department}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                          emp.attendance === 'Present' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400' :
                          emp.attendance === 'WFH' ? 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400' :
                          'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400'
                        }`}>
                          {emp.attendance}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-300">
                        {emp.salary}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400 dark:text-slate-500">
                        {emp.email}
                      </td>
                    </tr>
                  ))}
                  {filteredEmployees.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                        No employees found matching the filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: RECRUITMENT SHOWCASE */}
      {activeSubTab === 'recruitment' && (
        <div className="space-y-6">
          {/* File Upload Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Description Upload */}
            <div className="bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white m-0">1. Job Description</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Upload the active JD in PDF or TXT to align target skills</p>
              </div>
              <div className="mt-4">
                {jdFile ? (
                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-emerald-500" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white">{jdFile.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{(jdFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button onClick={() => setJdFile(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-accent hover:bg-accent/5 dark:hover:bg-accent/10 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all">
                    <Upload className="h-6 w-6 text-slate-400 mb-2" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Choose Job Description File</span>
                    <span className="text-[10px] text-slate-400 mt-1">PDF, DOCX up to 5MB</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setJdFile(e.target.files[0] ? { name: e.target.files[0].name, size: e.target.files[0].size } : null)}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Resumes Multi-Upload */}
            <div className="bg-white dark:bg-slate-900/40 p-6 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white m-0">2. Candidate Resumes</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Upload multiple resume files to score and rank side-by-side</p>
              </div>
              <div className="mt-4">
                {resumes.length > 0 ? (
                  <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-indigo-500" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white">{resumes.length} Resumes Loaded</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Ready for comparison</p>
                      </div>
                    </div>
                    <button onClick={() => setResumes([])} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-accent hover:bg-accent/5 dark:hover:bg-accent/10 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all">
                    <Upload className="h-6 w-6 text-slate-400 mb-2" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Choose Multi-Resume Batch</span>
                    <span className="text-[10px] text-slate-400 mt-1">Upload 2 to 10 resume PDFs</span>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        if (files.length > 0) {
                          setResumes(files.map(f => ({ name: f.name })));
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Action trigger button */}
          <div className="flex justify-center mt-2">
            <button
              onClick={runScreening}
              disabled={!jdFile || resumes.length === 0 || screeningState === 'screening'}
              className="px-8 py-3 bg-accent text-white font-bold rounded-xl shadow-lg shadow-accent/25 hover:opacity-95 disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              AI Score Candidates
            </button>
          </div>

          {/* Wow AI Processing Animation Screen */}
          {screeningState === 'screening' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-[24px] p-8 border border-accent/25 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden"
            >
              <div className="scanline"></div>
              <div className="bg-accent/15 p-4 rounded-full text-accent border border-accent/20 mb-6 relative">
                <Sparkles className="h-8 w-8 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="absolute inset-0 rounded-full border-2 border-accent border-dashed animate-ping"></span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white m-0">ByteMe Cognitive Screen Active</h3>
              <p className="text-xs text-slate-400 mt-1.5">Extracting skill vectors & plotting matching scores...</p>

              {/* Steps Progress Check list */}
              <div className="mt-8 space-y-3.5 w-full max-w-xs text-left">
                {screeningSteps.map((step, idx) => {
                  const isChecked = idx < currentStepIndex || (currentStepIndex === screeningSteps.length - 1);
                  const isActive = idx === currentStepIndex && (currentStepIndex < screeningSteps.length - 1);
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 transition-colors duration-300 ${
                        isChecked ? 'text-slate-700 dark:text-slate-200' :
                        isActive ? 'text-accent font-bold scale-105 origin-left' :
                        'text-slate-300 dark:text-slate-700'
                      }`}
                    >
                      {isChecked ? (
                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                      ) : isActive ? (
                        <span className="h-5 w-5 flex items-center justify-center shrink-0">
                          <span className="w-2.5 h-2.5 bg-accent rounded-full animate-ping"></span>
                        </span>
                      ) : (
                        <span className="w-5 h-5 rounded-full border border-slate-200 dark:border-slate-800 shrink-0"></span>
                      )}
                      <span className="text-sm">{step}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Results Table - Staggered fade/slide-in */}
          {screeningState === 'done' && candidates.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl border border-emerald-500/20 text-xs font-semibold">
                <AlertCircle className="h-4 w-4 shrink-0" />
                Cognitive evaluation successfully completed. Found 5 scored candidates sorted by compatibility.
              </div>

              <div className="bg-white dark:bg-slate-900/40 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-premium overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 font-bold">
                        <th className="px-6 py-4">Candidate</th>
                        <th className="px-6 py-4">AI Score Match</th>
                        <th className="px-6 py-4">Experience</th>
                        <th className="px-6 py-4">Top Skills</th>
                        <th className="px-6 py-4">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {candidates.map((cand, idx) => (
                        <motion.tr
                          key={cand.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors"
                        >
                          <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">
                            {cand.name}
                            <p className="text-[10px] font-normal text-slate-400 mt-0.5">{cand.role}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                              cand.score >= 90 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25' :
                              cand.score >= 80 ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/25' :
                              'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                            }`}>
                              <Sparkles className="h-3 w-3" />
                              {cand.score}% Match
                            </span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                            {cand.experience}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {cand.skills.slice(0, 3).map((s, i) => (
                                <span key={i} className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                                  {s}
                                </span>
                              ))}
                              {cand.skills.length > 3 && (
                                <span className="text-[10px] font-semibold text-slate-400 px-1">+{cand.skills.length - 3}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => setSelectedCandidate(cand)}
                              className="text-accent hover:underline flex items-center gap-1 text-xs font-bold cursor-pointer"
                            >
                              View & Schedule
                              <ChevronRight className="h-3 w-3" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* MODAL 1: ADD EMPLOYEE */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Add Employee Record</h3>
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newEmp.name}
                    onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                    placeholder="e.g. Priyanshu Sen"
                    className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Role Title</label>
                    <input
                      type="text"
                      required
                      value={newEmp.role}
                      onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
                      placeholder="e.g. Lead Designer"
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Salary</label>
                    <input
                      type="text"
                      required
                      value={newEmp.salary}
                      onChange={(e) => setNewEmp({ ...newEmp, salary: e.target.value })}
                      placeholder="e.g. ₹60,000"
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Department</label>
                    <select
                      value={newEmp.department}
                      onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      <option value="HR">HR</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Customer Support">Customer Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Attendance</label>
                    <select
                      value={newEmp.attendance}
                      onChange={(e) => setNewEmp({ ...newEmp, attendance: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      <option value="Present">Present</option>
                      <option value="WFH">WFH</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={newEmp.email}
                    onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                    placeholder="e.g. user@byteme.com"
                    className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl text-xs font-bold bg-accent text-white hover:opacity-95 shadow-md shadow-accent/15 cursor-pointer"
                  >
                    Add Record
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DRAWER / MODAL: CANDIDATE DETAIL & INTERVIEW SCHEDULER */}
      <AnimatePresence>
        {selectedCandidate && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full max-w-md bg-white dark:bg-slate-950 h-full p-6 shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 relative overflow-y-auto"
            >
              <div>
                {/* Drawer close */}
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Candidate Overview */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-accent/15 text-accent text-[10px] font-bold uppercase rounded-full">
                    {selectedCandidate.score}% Match Score
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{selectedCandidate.experience} Exp</span>
                </div>

                <h2 className="text-xl font-bold text-slate-800 dark:text-white mt-3 mb-1">{selectedCandidate.name}</h2>
                <p className="text-xs text-slate-500 mt-0 leading-none">{selectedCandidate.role}</p>

                {/* Info Block */}
                <div className="mt-6 border-t border-b border-slate-100 dark:border-slate-800/80 py-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Previous Company:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{selectedCandidate.previousCompany}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{selectedCandidate.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phone:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{selectedCandidate.phone}</span>
                  </div>
                </div>

                {/* Resume Summary */}
                <div className="mt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-accent" />
                    AI Resume Extracted Summary
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-2xl border border-slate-200/20 dark:border-slate-800/20">
                    {selectedCandidate.resumeSummary}
                  </p>
                </div>

                {/* Skills Tags */}
                <div className="mt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Verified Skill Tags</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCandidate.skills.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Schedule Interview Form */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-5 mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-accent" />
                  Interview Scheduler
                </h4>
                {scheduleSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400"
                  >
                    <UserCheck className="h-5 w-5 animate-bounce" />
                    <div className="text-xs">
                      <p className="font-bold">Interview scheduled successfully!</p>
                      <p className="mt-0.5">Confirmation email dispatched to candidate.</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleScheduleInterview} className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pick Date</label>
                        <input
                          type="date"
                          required
                          value={interviewDate}
                          onChange={(e) => setInterviewDate(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pick Time</label>
                        <input
                          type="time"
                          required
                          value={interviewTime}
                          onChange={(e) => setInterviewTime(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-accent text-white text-xs font-bold rounded-xl shadow-md shadow-accent/15 hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Clock className="h-4 w-4" />
                      Confirm Schedule
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HR;
