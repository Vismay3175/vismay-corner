// Technical Skills section. Each group lists tools that are used in production code
// in the projects named under `usedIn`.
const ICONS = {
  code: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  chat: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  bolt: 'M13 10V3L4 14h7v7l9-11h-7z',
  card: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
  link: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
  shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  terminal: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
};

export const skillGroups = [
  {
    icon: 'code',
    title: 'Backend & Data',
    summary: 'Laravel applications from schema design to queued jobs and scheduled automation.',
    skills: ['PHP 8.2', 'Laravel 10–12', 'MySQL', 'Eloquent ORM', 'Queues & Jobs', 'Scheduler / Cron', 'Redis', 'Repository Pattern', 'Migrations & Indexing'],
    usedIn: ['PerfectStay', 'Phoenix Token', 'CIY.CLUB'],
  },
  {
    icon: 'chat',
    title: 'APIs & Real-time',
    summary: 'Mobile and web APIs, webhooks and live updates between users and staff.',
    skills: ['REST APIs', 'Passport (OAuth2)', 'Sanctum', 'JWT', 'Webhooks', 'Node.js', 'Socket.IO', 'Pusher / WebSockets', 'Firebase FCM'],
    usedIn: ['Infostay', 'My Tira', 'Altaseira'],
  },
  {
    icon: 'bolt',
    title: 'AI & LLM',
    summary: 'AI assistants that answer guests and complete bookings through tool calls.',
    skills: ['OpenAI API', 'GPT-4o', 'Function / Tool Calling', 'Prompt Engineering', 'DeepL API', 'RAG', 'MCP'],
    usedIn: ['PerfectStay', 'Infostay', 'Phoenix Token'],
  },
  {
    icon: 'card',
    title: 'Payments & Billing',
    summary: 'Checkout, subscriptions, payment links, wallets and owner payouts.',
    skills: ['Stripe PaymentIntents', 'Authorize & Capture', 'Stripe Subscriptions', 'URWAY', 'Buddy Pay', 'Wallets & Commissions', 'Bank Payout Files', 'Crypto Hash Verification'],
    usedIn: ['My Tira', 'Altaseira', 'Phoenix Token'],
  },
  {
    icon: 'link',
    title: 'Integrations',
    summary: 'Connecting platforms to accounting, booking channels, messaging and hardware.',
    skills: ['Xero', 'Hubdoc', 'STAAH', 'SU Channel Manager', 'Twilio WhatsApp', 'iCal Sync', 'Google & Apple Sign-In', 'UniFi Controller', 'AWS S3'],
    usedIn: ['PerfectStay', 'CIY.CLUB', 'Hotspot WiFi'],
  },
  {
    icon: 'shield',
    title: 'Security & Reliability',
    summary: 'Access control, traceability and safe handling of money and data.',
    skills: ['RBAC (Spatie)', 'Audit Logs', '2FA', 'Rate Limiting', 'DB Transactions', 'Reversible Approvals', 'Query Optimization', 'PDF Generation'],
    usedIn: ['PerfectStay', 'Phoenix Token', 'CIY.CLUB'],
  },
];

export const tooling = ['Git', 'Linux', 'Nginx', 'Laravel Forge', 'DigitalOcean', 'AWS S3', 'Postman', 'Vite', 'Composer', 'DataTables'];

const icon = (name, cls) =>
  `<svg class="${cls}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${ICONS[name]}"></path></svg>`;

function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (grid) {
    grid.innerHTML = skillGroups.map((g, i) => `
      <article class="skill-card group relative flex flex-col bg-surface-container-low border border-outline-variant/30 rounded-[2rem] p-7 md:p-8 hover:border-secondary/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500">
        <div class="flex items-start justify-between gap-4 mb-5">
          <div class="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-500">
            ${icon(g.icon, 'w-6 h-6')}
          </div>
          <span class="font-label text-[10px] font-black tracking-[0.3em] text-on-surface/30">${String(i + 1).padStart(2, '0')}</span>
        </div>
        <h3 class="font-headline text-xl md:text-2xl font-bold text-on-surface mb-2">${g.title}</h3>
        <p class="text-sm text-on-surface-variant leading-relaxed opacity-80 mb-6">${g.summary}</p>
        <ul class="flex flex-wrap gap-2 mb-6" aria-label="${g.title} skills">
          ${g.skills.map(s => `<li class="px-3 py-1.5 bg-surface-container-high border border-outline-variant/20 rounded-full text-[11px] font-semibold text-on-surface-variant hover:bg-secondary hover:text-white hover:border-secondary transition-colors">${s}</li>`).join('')}
        </ul>
        <div class="mt-auto pt-5 border-t border-outline-variant/15">
          <span class="block font-label text-[9px] uppercase tracking-[0.25em] font-black text-secondary/70 mb-1">Used in</span>
          <span class="text-xs font-semibold text-on-surface/70">${g.usedIn.join(' · ')}</span>
        </div>
      </article>
    `).join('');
  }

  const tools = document.getElementById('skills-tooling');
  if (tools) {
    tools.innerHTML = tooling
      .map(t => `<li class="px-3 py-1.5 rounded-full text-[11px] font-semibold text-on-surface-variant border border-outline-variant/20 bg-surface">${t}</li>`)
      .join('');
  }
}

document.addEventListener('DOMContentLoaded', renderSkills);
