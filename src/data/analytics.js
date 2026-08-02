export const salesDistribution = [
  { name: 'Enterprise', value: 650000, color: '#13294B' },
  { name: 'SMB / Professional', value: 410000, color: '#4F8EF7' },
  { name: 'Startup Tier', value: 180000, color: '#E8F1FF' }
];

export const hiringFunnelData = [
  { stage: 'Job Views', count: 1200 },
  { stage: 'Applications', count: 450 },
  { stage: 'AI Screened', count: 210 },
  { stage: 'Shortlisted', count: 45 },
  { stage: 'Offered', count: 12 },
  { stage: 'Hired', count: 8 }
];

export const supportResponseTime = [
  { day: 'Mon', 'Avg Resolution (mins)': 42, 'Target (mins)': 30 },
  { day: 'Tue', 'Avg Resolution (mins)': 35, 'Target (mins)': 30 },
  { day: 'Wed', 'Avg Resolution (mins)': 28, 'Target (mins)': 30 },
  { day: 'Thu', 'Avg Resolution (mins)': 25, 'Target (mins)': 30 },
  { day: 'Fri', 'Avg Resolution (mins)': 32, 'Target (mins)': 30 },
  { day: 'Sat', 'Avg Resolution (mins)': 45, 'Target (mins)': 30 },
  { day: 'Sun', 'Avg Resolution (mins)': 40, 'Target (mins)': 30 }
];

// 24 hours x 7 days heatmap grid for "System Activity Load"
// Represents active tasks / processes handled by AI agents
export const heatmapData = [
  { day: 'Mon', hours: [12, 18, 22, 10, 5, 2, 8, 25, 45, 65, 80, 95, 85, 90, 75, 60, 55, 45, 30, 25, 20, 15, 12, 10] },
  { day: 'Tue', hours: [10, 15, 20, 12, 8, 3, 7, 30, 50, 70, 85, 90, 80, 88, 70, 65, 50, 40, 32, 28, 22, 18, 15, 12] },
  { day: 'Wed', hours: [15, 18, 24, 15, 6, 4, 9, 28, 48, 75, 90, 98, 92, 85, 82, 70, 62, 48, 35, 30, 25, 20, 18, 14] },
  { day: 'Thu', hours: [12, 14, 18, 10, 5, 2, 8, 26, 46, 68, 80, 85, 78, 80, 72, 58, 48, 42, 28, 24, 20, 16, 12, 10] },
  { day: 'Fri', hours: [11, 16, 22, 12, 7, 3, 9, 32, 52, 74, 88, 92, 85, 89, 78, 62, 52, 45, 38, 32, 26, 20, 16, 11] },
  { day: 'Sat', hours: [8, 10, 12, 8, 4, 1, 5, 12, 18, 25, 30, 35, 28, 32, 26, 22, 18, 15, 12, 10, 8, 6, 5, 4] },
  { day: 'Sun', hours: [5, 6, 8, 5, 2, 1, 3, 8, 12, 18, 22, 25, 20, 22, 18, 15, 12, 10, 8, 7, 5, 4, 3, 2] }
];
