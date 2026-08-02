export const campaignsData = [
  { id: 'email', name: 'SaaS Autumn Newsletter', channel: 'Email Campaign', status: 'Active', metric1: '45.2% Open Rate', metric2: '12.8% Click Rate', spent: '₹15,000', leads: 112 },
  { id: 'whatsapp', name: 'Demo Request Welcome', channel: 'WhatsApp Automation', status: 'Active', metric1: '92.1% Deliver Rate', metric2: '24.5% Engagement', spent: '₹8,000', leads: 85 },
  { id: 'sms', name: 'OTP & Account Setup Alerts', channel: 'SMS Alerts', status: 'Paused', metric1: '85.0% Delivery Rate', metric2: '4.2% Click Rate', spent: '₹2,500', leads: 14 },
  { id: 'social', name: 'Meta Retargeting Campaign', channel: 'Social Media Ads', status: 'Active', metric1: '140k Impressions', metric2: '3.8% CTR', spent: '₹35,000', leads: 198 }
];

export const aiEmailTemplates = {
  welcome: {
    subject: "Welcome to ByteMe — Let's automate your business! 🚀",
    body: `Hi {{contact_name}},

Thank you for choosing ByteMe, the AI-first operating system for modern business.

We have set up your custom sandbox workspace. To get started:
1. Complete your Admin setup in Settings > Profile.
2. Invite your team members under Settings > Roles & Permissions.
3. Import your current active leads or employees database in one click.

If you have any questions, simply reply to this email, or ask Byte AI directly on your dashboard.

Cheers,
The ByteMe Team`
  },
  promo: {
    subject: "Exclusive 30% Off: Power up your workflow with ByteMe Enterprise 💎",
    body: `Hello {{contact_name}},

Are payroll schedules and CRM pipeline tracking taking up too much of your day?

For the next 48 hours, we are offering selected teams a 30% discount on ByteMe Enterprise annual subscriptions. 

Here is what you unlock:
- Unlimited AI Candidate Screening credits
- High-priority AI CRM pipeline scoring
- Custom Recharts Analytics heatmaps for operations auditing

Click here to claim your discount: [Claim 30% Offer]

Best,
ByteMe Sales Team`
  },
  retarget: {
    subject: "Still scrolling? Automate it in 5 seconds with ByteMe AI ⚡",
    body: `Hey {{contact_name}},

We noticed you draft marketing newsletters and invoices manually. Why?

ByteMe's AI Email Generator and Auto-Billing flows are designed to build, format, and deliver customer assets in under 5 seconds.

Re-open your dashboard today to view our updated UI theme, dark mode, and improved Framer Motion performance triggers.

Get Started: [Open Dashboard]

Regards,
ByteMe Support`
  }
};
