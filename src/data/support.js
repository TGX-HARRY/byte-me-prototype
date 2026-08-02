export const supportTickets = {
  Open: [
    { id: 'TKT-104', title: 'Unable to access Finance dashboard', user: 'Arjun Nambiar', priority: 'High', date: '2 hours ago' },
    { id: 'TKT-105', title: 'Password reset link expires instantly', user: 'Priya Sharma', priority: 'Low', date: '4 hours ago' },
    { id: 'TKT-106', title: 'Invoice PDF generation failing on Chrome', user: 'Neha Gupta', priority: 'Medium', date: '5 hours ago' }
  ],
  Pending: [
    { id: 'TKT-101', title: 'API integration documentation missing parameters', user: 'Rohan Das', priority: 'High', date: '1 day ago' },
    { id: 'TKT-102', title: 'Custom color scheme configuration request', user: 'Sarah Smith', priority: 'Low', date: '1 day ago' }
  ],
  Resolved: [
    { id: 'TKT-098', title: 'Dashboard charts failing to load in dark mode', user: 'Kabir Mehta', priority: 'Critical', date: '2 days ago' },
    { id: 'TKT-099', title: 'Add WFH attendance type option in HR config', user: 'Aman Verma', priority: 'Medium', date: '3 days ago' }
  ]
};

export const chatbotScript = {
  welcome: "Hi! I am Byte AI. How can I help you today?",
  options: [
    { key: 'reset_pwd', text: 'Reset Password', response: "To reset your password, navigate to Settings > Security. Under the Password block, click 'Change Password'. We have also sent a self-serve reset link to your registered email address." },
    { key: 'payment_issue', text: 'Payment Failed', response: "If your transaction failed but funds were debited, the money will automatically revert to your account in 3-5 working days. You can view all billing details in the Finance tab." },
    { key: 'add_user', text: 'Add New Users', response: "Navigate to settings, select 'Roles & Permissions', and click '+ Invite User'. Fill out the email field and assign a role (Admin, HR, Sales, Developer)." },
    { key: 'api_access', text: 'Developer API Keys', response: "API Keys can be generated from settings > Security. Ensure you keep your keys hidden, as they allow complete access to CRM and HR data write-backs." }
  ]
};
