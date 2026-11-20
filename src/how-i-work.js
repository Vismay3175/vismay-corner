// "How I work" section: five stages of a feature, each with proof from real projects.
// Desktop: page scroll inside a tall sticky wrapper picks the stage. Smaller screens: auto-advances until the visitor taps a stage.
const STAGES = [
  {
    label: 'Schema & data',
    title: 'Get the data model right first.',
    body: 'I start with the database: tables, relations, indexes and, where the product needs it, multi-tenant separation. A clean model keeps every later feature simpler and faster.',
    tools: ['MySQL', 'Eloquent ORM', 'Redis', 'Multi-tenant'],
    metric: 'Sub-second',
    proof: 'Booking calendar grid after removing N+1 query bottlenecks in a real-time drag-and-drop view.',
  },
  {
    label: 'APIs & business logic',
    title: 'Build APIs other teams can rely on.',
    body: 'REST APIs in Laravel with proper auth, roles and validation. Slow or heavy work moves to queues and scheduled jobs so requests stay quick.',
    tools: ['Laravel 10–12', 'REST', 'Queues & Scheduler', 'Sanctum / Passport', 'RBAC'],
    metric: '4 user roles',
    proof: 'Multi-role LMS for CIY CLUB: super admins, franchise managers, coaches and parents, each with their own permissions.',
  },
  {
    label: 'Integrations',
    title: 'Connect the business to the outside world.',
    body: 'Payments, messaging, accounting and hotel channel managers, wired up with webhooks, retries and logging so failures are visible and recoverable.',
    tools: ['Stripe', 'URWAY', 'Buddy', 'Twilio WhatsApp', 'Xero', 'STAAH / SU'],
    metric: '4 gateways',
    proof: 'Stripe, Razorpay, URWAY and Buddy payments, with webhook-driven reconciliation and automatic notifications.',
  },
  {
    label: 'Applied AI',
    title: 'Add AI where it saves real work.',
    body: 'OpenAI function calling inside existing Laravel apps, so the model can look things up and take actions through the same business rules as the rest of the system.',
    tools: ['OpenAI API', 'Function calling', 'Prompt design', 'Exploring RAG & MCP'],
    metric: 'Enquiry → booking',
    proof: 'AI booking assistant that verifies the guest and completes a reservation end to end.',
  },
  {
    label: 'Ship & support',
    title: 'Release it, then stay with it.',
    body: 'Deployments on Linux servers, file storage on S3, and production support after launch: monitoring, fixing and improving based on how people actually use it.',
    tools: ['Laravel Forge', 'Nginx', 'DigitalOcean', 'AWS S3', 'Git'],
    metric: '100K+',
    proof: 'Active subscriptions on Loscop, a QR-based tracking platform where I built core features.',
  },
];

const AUTO_MS = 6000;
// Must match the media query in index.css that turns on the sticky layout.
const SCROLL_MODE_QUERY = '(min-width: 1024px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)';

export function initHowIWork() {
  const root = document.getElementById('hw');
  if (!root) return;

  const tabs = [...root.querySelectorAll('.hw-step')];
  const panel = document.getElementById('hw-panel');
  const fill = document.getElementById('hw-fill');
  const timer = document.getElementById('hw-timer');
  const el = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scroller = document.getElementById('hw-scroll');
  const hint = document.getElementById('hw-hint');
  const scrollMq = window.matchMedia(SCROLL_MODE_QUERY);
  let scrollMode = scrollMq.matches;

  let current = -1;
  let auto = !reduceMotion && !scrollMode;
  let handle = null;

  const show = (i, focus = false) => {
    if (i === current) return;
    current = i;
    const s = STAGES[i];
    tabs.forEach((t, n) => {
      const on = n === i;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      t.classList.toggle('is-done', n < i);
    });
    if (focus) tabs[i].focus({ preventScroll: true });
    // On phones the rail scrolls sideways: keep the active stage in view without moving the page.
    const rail = tabs[i].parentElement;
    if (rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({ left: tabs[i].offsetLeft - rail.clientWidth / 2 + tabs[i].offsetWidth / 2, behavior: 'smooth' });
    }
    panel.setAttribute('aria-labelledby', tabs[i].id);
    if (!scrollMode) fill.style.setProperty('--p', i / (STAGES.length - 1));

    el('hw-num').textContent = String(i + 1).padStart(2, '0');
    el('hw-label').textContent = s.label;
    el('hw-title').textContent = s.title;
    el('hw-body').textContent = s.body;
    el('hw-tools').innerHTML = s.tools.map((t) => `<li>${t}</li>`).join('');
    el('hw-proof-metric').textContent = s.metric;
    el('hw-proof-text').textContent = s.proof;

    panel.classList.remove('is-entering');
    void panel.offsetWidth; // restart animation
    panel.classList.add('is-entering');
    restartTimer();
  };

  const restartTimer = () => {
    clearTimeout(handle);
    if (timer) {
      timer.style.animation = 'none';
      void timer.offsetWidth;
      timer.style.animation = auto ? `hw-timer ${AUTO_MS}ms linear forwards` : 'none';
    }
    if (auto) handle = setTimeout(() => show((current + 1) % STAGES.length), AUTO_MS);
  };

  const stopAuto = () => {
    auto = false;
    restartTimer();
  };

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => {
      stopAuto();
      if (scrollMode) scrollToStage(i);
      else show(i);
    });
    t.addEventListener('keydown', (e) => {
      const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (e.key in keys) {
        e.preventDefault();
        stopAuto();
        const next = (i + keys[e.key] + STAGES.length) % STAGES.length;
        if (scrollMode) scrollToStage(next);
        show(next, true);
      } else if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        stopAuto();
        const next = e.key === 'Home' ? 0 : STAGES.length - 1;
        if (scrollMode) scrollToStage(next);
        show(next, true);
      }
    });
  });

  // Pause while the pointer is over the section; only run while it is on screen.
  let hovering = false;
  let visible = false;
  root.addEventListener('mouseenter', () => { hovering = true; clearTimeout(handle); timer?.style.setProperty('animation-play-state', 'paused'); });
  root.addEventListener('mouseleave', () => { hovering = false; if (visible) restartTimer(); });

  show(0);
  clearTimeout(handle);

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !hovering) restartTimer();
    else clearTimeout(handle);
  }, { threshold: 0.4 }).observe(root);

  // ---- Scroll-driven mode: page scroll inside the wrapper picks the stage ----
  const sticky = document.getElementById('hw-sticky');
  const stepDistance = () => window.innerHeight * 0.45; // scroll needed per stage
  const range = () => stepDistance() * (STAGES.length - 1);
  const stickyTop = () => parseFloat(getComputedStyle(sticky).top) || 0;
  let refreshTimer = null;
  const sizeWrapper = () => {
    const next = scrollMode ? `${sticky.offsetHeight + range()}px` : '';
    if (scroller.style.height === next) return;
    scroller.style.height = next;
    // The page below moved: let GSAP recalculate where later scroll animations start.
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => window.ScrollTrigger?.refresh(), 150);
  };
  const progress = () => {
    const r = scroller.getBoundingClientRect();
    return Math.min(1, Math.max(0, (stickyTop() - r.top) / range()));
  };
  const scrollToStage = (i) => {
    const y = scroller.getBoundingClientRect().top + window.scrollY - stickyTop() + (i / (STAGES.length - 1)) * range();
    if (window.lenis) window.lenis.scrollTo(y, { duration: 0.8 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };
  let ticking = false;
  const onScroll = () => {
    if (!scrollMode || ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const p = progress();
      fill.style.setProperty('--p', p);
      show(Math.round(p * (STAGES.length - 1)));
      hint?.classList.toggle('is-done', p > 0.97);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  new ResizeObserver(sizeWrapper).observe(sticky);
  window.addEventListener('resize', sizeWrapper);
  const applyMode = () => {
    scrollMode = scrollMq.matches;
    sizeWrapper();
    auto = !reduceMotion && !scrollMode;
    if (scrollMode) onScroll();
    else fill.style.setProperty('--p', current / (STAGES.length - 1));
    restartTimer();
  };
  scrollMq.addEventListener('change', applyMode);
  sizeWrapper();
  if (scrollMode) onScroll();

  initCounters();
}

function initCounters() {
  const counters = document.querySelectorAll('.hw-count');
  if (!counters.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const run = (node) => {
    const to = Number(node.dataset.to);
    const pre = node.dataset.prefix || '';
    const suf = node.dataset.suffix || '';
    const start = performance.now();
    const dur = 1400;
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      node.textContent = `${pre}${Math.round(to * eased)}${suf}`;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        run(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => io.observe(c));
}
