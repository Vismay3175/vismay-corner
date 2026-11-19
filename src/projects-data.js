// Project data for the Work and AI Lab sections.
// Fields: badge (optional card label), role, period, caseStudy { problem, approach[], results[] },
// liveUrl / liveUrls (omit both for private projects; linkNote then explains why).
export const projects = [
  {
    image: "/projects/perfectstay-logo.webp",
    title: "PERFECTSTAY",
    bgColor: "bg-surface",
    status: "Live",
    role: "Backend Developer",
    period: "2024 - Present",
    description: "Property management platform for holiday rentals: AI booking chat, STAAH and SU channel managers, Xero and Hubdoc accounting, automated owner payouts and WhatsApp notifications.",
    longDescription: "PerfectStay runs a holiday-rental business end to end across three Laravel apps: an internal PMS for reservations, the booking grid, housekeeping and payouts; an owner and admin dashboard with mobile-app APIs; and the public booking website with an AI booking assistant. It connects to booking channels through the STAAH and SU channel managers and to accounting through Xero and Hubdoc.",
    caseStudy: {
      problem: "Running many rental properties meant keeping rates and availability in sync across booking channels, collecting guest payments, invoicing, and paying property owners correctly every month. Much of this was manual, slow and error-prone, and guests waited for staff to answer booking enquiries.",
      approach: [
        "AI booking assistant on OpenAI (gpt-4o) with tool calling: checks availability and price, verifies the guest by OTP and creates the booking, so an enquiry becomes a reservation in one chat",
        "Channel manager integrations: STAAH reservations and payment links, and the SU channel manager for room types, rate plans, rate and availability push, reservations and webhooks",
        "Xero integration for prepayment and final invoices, owner payout bills and housekeeping bills, with OAuth token refresh and asynchronous HTTP request pooling for faster sync",
        "Hubdoc integration that generates owner payout invoice PDFs and sends receipts for bookkeeping",
        "Automated owner payouts: batch payout jobs to Xero and Hubdoc and FNB bank payout files generated on a schedule",
        "Twilio WhatsApp templates for booking confirmations, check-in messages and guest notifications",
        "Role-based access control and an audit trail of every admin change, so financial and reservation edits are traceable"
      ],
      results: [
        "~70% faster Xero sync with asynchronous HTTP request pooling",
        "Guests go from enquiry to confirmed booking inside the AI chat, without waiting for staff",
        "Rates, availability and reservations stay in sync across channels through STAAH and SU",
        "Owner payouts, invoices and bills flow to Xero, Hubdoc and the bank without manual entry"
      ]
    },
    features: [
      "AI booking assistant with OpenAI tool calling: availability and price check, OTP verification and booking creation",
      "STAAH channel manager: reservations, expiring payment links, proof-of-payment upload and receipts",
      "SU channel manager: room types, rate plans, rate and availability push, reservations and webhooks",
      "Xero: prepayment and final invoices, owner payout bills and housekeeping bills with OAuth token refresh",
      "Hubdoc: owner payout invoice PDFs and receipt emails",
      "Automated owner payouts with queued batch jobs and FNB bank payout files",
      "Twilio WhatsApp notifications for bookings and guest check-in",
      "Drag-and-drop booking grid, housekeeping, Buddy Pay payment links and AWS S3 document storage",
      "Role-based access control with spatie/laravel-permission: custom roles and granular permissions managed from the admin panel",
      "Audit log middleware that records every admin create, update and delete by user and module, with a searchable audit log viewer",
      "Change and integration logs for STAAH amount changes, Xero payment status and SU API calls, plus request performance logging",
      "Query optimization with eager loading, duplicate-query removal and targeted database indexes"
    ],
    techStack: ["Laravel 10", "OpenAI", "Xero", "STAAH / SU", "Hubdoc", "Twilio", "Spatie RBAC"],
    liveUrl: "https://perfectstay.rentals/",
    sourceUrl: "#"
  },
  {
    image: "/projects/phoenixtoken-logo.webp",
    title: "PHOENIX TOKEN",
    bgColor: "bg-surface",
    status: "Live",
    role: "Backend Developer",
    period: "2026 - Present",
    description: "Crypto token investment platform (PXT): pre-sale, BOOST bonus payouts, P2P market, lotteries, automated DeepL translations and admin-editable notification emails.",
    longDescription: "Phoenix Token is a Laravel 12 investment and token management platform with separate member and admin panels. Members deposit crypto, buy participation shares and pre-sale packages, trade on a P2P market, join lotteries and giveaways, and earn referral and BOOST bonuses. Admins verify every transaction by its blockchain hash, run payouts from vault wallets and configure the whole platform without code changes.",
    caseStudy: {
      problem: "Every deposit, purchase and payout on the platform depends on a blockchain transaction hash that an admin must verify, and mistakes are expensive to undo. The client also needed new products launched quickly, the platform in several languages, and email content they could change without a developer.",
      approach: [
        "Built a hash action service that applies everything an approved transaction hash does to a user account and stores the exact effects in an action log, so any approval can be reverted precisely later",
        "Built the BOOST bonus: a percentage of each order's PXT value, locked in when the order is placed and paid from the vault bonus wallet once the admin enters the delivery hash, with progress, confirmation and failure tracking",
        "Built the PXS pre-sale module with a scheduled pre-sale to airdrop transition, a live price chart and dedicated purchase emails, plus external withdrawals with expiry and reinvest fee management",
        "Automated translation of the whole platform with the DeepL API: batch translation of missing strings, placeholder protection, usage tracking and live progress in the admin panel",
        "Admin-editable notification emails: a template catalog and renderer that send the admin's text in each recipient's language and fall back to the original Blade email when nothing was edited"
      ],
      results: [
        "Hash approvals are fully reversible from a stored action log, protecting member balances from admin mistakes",
        "New languages are translated automatically instead of by hand",
        "Admins change email content, banners, lottery cut-off times and fees from the admin panel, with no deployment"
      ]
    },
    features: [
      "Hash action service with an action log for exact, reversible transaction approvals",
      "BOOST bonus payouts from the vault bonus wallet with confirmation and failure tracking",
      "PXS pre-sale module, scheduled pre-sale to airdrop transition and live price chart",
      "P2P market: cancel, reopen and revert trades, delete invalid hashes and record every P2P transfer",
      "Lotteries with ticket images, winner-based prize distribution and admin-set sales cut-off",
      "DeepL auto-translation with batch processing, placeholder repair and live progress tracking",
      "Admin-editable, multi-language notification email templates and a notification mail configuration and test module",
      "Dashboard banner module, external withdrawals with expiry, and reinvest fee management",
      "Chunked uploads that split large documents into 8 MB parts to stay under Cloudflare's 100 MB request limit",
      "Database transactions and higher decimal precision for deposit and financial processing",
      "Layered admin access control (super admin, admin, staff) and two-factor authentication"
    ],
    techStack: ["Laravel 12", "PHP 8.2", "DeepL API", "AWS S3", "Queues", "MySQL"],
    linkNote: "Private client platform; access is limited to registered members. Happy to walk through the architecture in an interview.",
    sourceUrl: "#"
  },
  {
    image: "/projects/infostay.webp",
    title: "INFOSTAY",
    bgColor: "bg-surface",
    status: "Live",
    role: "Backend Developer",
    period: "Sep 2023 - Present",
    description: "All-in-one digital guest platform for hotels and hospitality businesses: guest app, AI guide, in-room TV, ordering, service bookings, real-time chat and staff HR.",
    longDescription: "Infostay replaces the paper guest compendium and scattered guest tools with one platform. Each business gets an admin panel to run rooms, stores, orders, service providers and staff, and its guests get a branded web and app experience with a local directory, gallery, store, service bookings, an AI guide and live chat with the property. In-room TV apps and an employee HR module run on the same backend, alongside a Node.js real-time service.",
    caseStudy: {
      problem: "Hotels and guest-facing businesses managed guest information, in-stay orders, local services and staff in separate, manual tools, and guests had no single place to find answers or order during their stay. Every property also needed its own branding, modules and AI settings on shared infrastructure.",
      approach: [
        "Built a multi-business Laravel backend where each property switches modules on or off, configures its own branding and runs its own store, directory and service providers",
        "Built the AI guest guide ('Ask Guide') on OpenAI with a per-business API key and model, knowledge from the property's own content, and an embeddable iframe widget for any website",
        "Built in-stay commerce: multi-item cart with modifiers and variants, order tracking, delivery areas, and service bookings where providers send quotes and earn commission",
        "Extended the Node.js / Socket.IO real-time service for guest-to-property chat, new-order alerts and in-room TV notifications, with Firebase push",
        "Built the staff HR module: punch in/out with multiple shifts, leave requests and accrual, pay runs with CSV/Excel export and payslip PDFs"
      ],
      results: [
        "One platform covers the full guest stay: information, ordering, services, AI help and live chat",
        "Properties answer common guest questions automatically through the AI guide",
        "Staff attendance, leave and payroll run on the same system as guest operations"
      ]
    },
    features: [
      "AI guest guide ('Ask Guide') with per-business OpenAI key and model selection and an embeddable iframe widget",
      "Guest web and app experience: local directory, gallery, videos, weather, store and service bookings",
      "In-stay commerce: cart, modifiers and variants, orders, delivery areas and guest order tracking",
      "Service providers marketplace with quotes and commission tracking",
      "Real-time guest chat, order alerts and in-room TV notifications on Node.js, Socket.IO and Redis, with Firebase push",
      "InfostayTV API for in-room TV apps",
      "HR module: punch in/out with multiple shifts, leave accrual, pay runs with CSV/Excel export and payslip PDFs",
      "Role-based access control with spatie/laravel-permission for admins and staff",
      "Google and Apple sign-in, module-toggle middleware, per-route rate limiting and performance indexes"
    ],
    techStack: ["Laravel 10", "OpenAI", "Node.js", "Socket.IO", "Redis"],
    liveUrl: "https://infostay.app/login",
    sourceUrl: "#"
  },
  {
    image: "/projects/ciy-club.webp",
    title: "CIY.CLUB",
    bgColor: "bg-surface",
    status: "Live",
    role: "Backend Developer",
    period: "Dec 2025 - Aug 2026",
    description: "Bilingual (Arabic / English) academy management platform with role-based dashboards, student progress tracking, automatic certificates and WhatsApp alerts.",
    longDescription: "CIY.CLUB is a multi-branch kids' academy platform. Super admins, branch managers, coaches and parents each get their own dashboard to run branches, students, skill matrices, sessions, attendance, subscriptions, progress reports and certificates. The platform is built on Laravel 12, fully in Arabic and English.",
    caseStudy: {
      problem: "A multi-branch academy tracked student progress, reports, certificates and parent communication by hand, in two languages. Parents had no live view of their child's progress and no way to book sessions themselves.",
      approach: [
        "Role-scoped dashboards for super admins, branch managers, coaches and parents on Laravel 12 and spatie/laravel-permission, fully in Arabic and English",
        "A skill / level / measure matrix that drives each student's learning journey, with a coach-writes, manager-approves workflow for level reports",
        "Event-driven automation: completing a level generates a certificate PDF (Snappy / wkhtmltopdf, A4 at 300 dpi) that is emailed and sent on WhatsApp through queued Twilio jobs",
        "Scheduled commands for subscription activation, expiry, freeze requests, absence warnings and automatic session check-out",
        "Session booking with time slots, trial-booking caps and blackout slots that cancel affected bookings and notify parents",
        "Audit logs that record every create, update and delete across the platform, with user and description"
      ],
      results: [
        "Certificates and parent updates go out automatically when a student completes a level",
        "Parents see live progress and book sessions themselves",
        "Branches run subscriptions, attendance and reports from one bilingual system"
      ]
    },
    features: [
      "Multi-role dashboards (Super Admin, Branch Manager, Coach, Parent) with spatie/laravel-permission",
      "Audit logs: middleware records every create, update and delete with user, action and description, viewable by admins",
      "Skill matrix module with levels, measures and badge images",
      "Student learning path and progress tracking, with a read-only parent view",
      "Level reports: coach writes, branch manager approves, watermarked PDF emailed to the parent",
      "Automatic certificate PDFs on level completion and graduation",
      "WhatsApp notifications via Twilio Content templates and queued jobs",
      "Subscription lifecycle: upcoming queue, freeze / unfreeze, expiry checks, Asia/Riyadh timezone handling",
      "Public parent registration and trial booking; fixed scrambled Arabic text on iOS by rendering T&C pages as images"
    ],
    techStack: ["Laravel 12", "Twilio WhatsApp", "Spatie Permission", "Snappy PDF", "Queues"],
    liveUrls: [
      { label: "Visit Live Project", url: "https://ciyclub.sa/" },
      { label: "Visit Dashboard", url: "https://dashboard.ciyclub.sa/login" }
    ],
    sourceUrl: "#"
  },
  {
    image: "/projects/tiraLogo.webp",
    title: "MY TIRA",
    bgColor: "bg-surface",
    status: "Live",
    role: "Backend Developer",
    period: "Oct 2025 - Aug 2026",
    description: "E-commerce backend and admin panel for a bakery brand: mobile API, Stripe authorize-then-capture payments and English / French content.",
    longDescription: "My Tira (Trip Deen) is a cake and café e-commerce platform: a Sanctum REST API for the mobile app, an admin panel for products, orders, coupons, charges, banners and CMS pages, and a public B2B landing site.",
    caseStudy: {
      problem: "A bakery brand needed a mobile commerce backend and admin panel that only charges customers for valid orders, keeps stock accurate and serves both English and French customers.",
      approach: [
        "Laravel 12 API and admin panel covering cart, checkout, coupons, extra charges, cash on delivery and Stripe",
        "Stripe PaymentIntents with manual capture: payment is authorized in the app and captured on the server, and only then is the order placed and stock decremented",
        "spatie/laravel-translatable JSON columns for products, banners, tags and CMS pages, with API responses in each user's preferred language",
        "Firebase Cloud Messaging (HTTP v1) push notifications on order status changes, and an API request / response log viewer to debug the mobile app"
      ],
      results: [
        "Payment is captured only after server-side ownership and status checks",
        "Full admin panel and API in English and French",
        "Order status updates reach customers instantly through push notifications"
      ]
    },
    features: [
      "Cart, checkout and order APIs with wishlist, coupons, fixed or percentage extra charges and cash on delivery",
      "Stripe PaymentIntent with capture_method manual, EphemeralKeys for the mobile SDK and capture-time stock updates",
      "EN / FR localization of UI, validation, DataTables and API responses via SetApiLocale middleware",
      "Admin dashboard with date-range filters, order management and transaction history",
      "FCM push notifications on order status changes",
      "API request and response logging to a dedicated log channel, with an admin log viewer for debugging the mobile app",
      "Admin-only middleware protecting the admin panel, plus active-user checks on every API request",
      "Google login, one active device per user, password reset, account deletion and support tickets"
    ],
    techStack: ["Laravel 12", "Stripe", "Sanctum", "FCM", "Spatie Translatable"],
    linkNote: "Client project; the live app is not public yet. Happy to walk through the code and payment flow in an interview.",
    sourceUrl: "#"
  },
  {
    image: "/projects/altaseira-logo.webp",
    title: "ALTASEIRA",
    bgColor: "bg-surface",
    status: "Live",
    role: "Backend Developer",
    period: "Nov 2024 - Jan 2025",
    description: "Arabic-first services marketplace: URWAY wallet and commission payments, bilingual RTL / LTR interface and admin modules.",
    longDescription: "Altaseira is a Saudi services marketplace for clients, service providers and admins, covering service requests, offers, ratings, chat, provider commissions and wallets.",
    caseStudy: {
      problem: "An Arabic-first marketplace needed a way for service providers to pay commissions and top up wallets online, and a polished bilingual interface, before launch.",
      approach: [
        "Integrated URWAY card payment flows for provider wallet top-ups and commission payments, with callback checks, transaction history, saved cards and localized gateway error codes",
        "Moved all Arabic and English labels and messages into central language files and made the admin panel and frontend switch between RTL and LTR by locale",
        "Added a complaints and inquiries module, ad slides, admin settings, and commission and transaction reports",
        "Moved large provider image uploads to chunked, queued processing with a broadcast event and completion email"
      ],
      results: [
        "Providers could pay commissions and recharge wallets online",
        "Admin panel and frontend work in Arabic (RTL) and English (LTR), matched to the Figma designs"
      ]
    },
    features: [
      "URWAY payment flows for wallet recharge and commission payment, with callback handling and transaction history",
      "Arabic / English localization with RTL / LTR layouts across admin and frontend",
      "Complaints and inquiries module, ad slides and admin settings",
      "Contributed to the reports dashboard (date filters, commission and transaction listings) and chat conversation handling",
      "Chunked, queued image uploads with events and completion emails"
    ],
    techStack: ["Laravel 10", "URWAY", "Pusher", "JWT", "Queues"],
    liveUrl: "https://altaseira.com/",
    sourceUrl: "#"
  },
  {
    image: "/projects/loscop.webp",
    title: "LOSCOP",
    bgColor: "bg-surface",
    status: "Live",
    role: "Backend Developer",
    period: "2023 - 2024",
    description: "QR-based product tracking system with real-time chat and Stripe subscriptions, serving 100K+ active subscriptions.",
    longDescription: "Loscop is a QR-code-based product tracking platform with more than 100,000 active user subscriptions. I integrated the Stripe API for subscription payments and tiered access, built real-time chat for tracking updates, extended the core QR code generation and processing logic, and built admin dashboard components that visualize tracking data and user activity.",
    features: [
      "Stripe API integration for subscription payments and tiered access levels",
      "Real-time chat so users can communicate instantly about tracking updates",
      "Extended the core logic that generates and processes QR codes for the tracking and status-update workflow",
      "Admin dashboard components that manage subscriptions and visualize tracking data and user activity"
    ],
    techStack: ["Laravel", "Stripe", "Socket.IO"],
    linkNote: "Client project; the public site is not available right now. Happy to walk through the architecture in an interview.",
    sourceUrl: "#"
  },
  {
    image: "/projects/FiarPlay.webp",
    title: "FAIRPLAY GIVEAWAYS",
    bgColor: "bg-surface",
    status: "Live",
    role: "Backend Developer",
    period: "2025",
    description: "Giveaway and e-commerce platform where product purchases become giveaway entries, with memberships, a winner gallery and 2FA.",
    longDescription: "FairPlay Giveaways combines an online store with transparent giveaway rounds: product purchases turn into giveaway entries, members subscribe weekly or monthly, and winners are published with photo and video proof.",
    features: [
      "Giveaway engine that runs rounds and promotions with real-time slot tracking",
      "Weekly and monthly membership plans",
      "Store where product purchases turn into giveaway entries",
      "Winner gallery with photo and video proof",
      "Partner and affiliate portal",
      "Google 2FA for users and admins, and PDF invoices"
    ],
    techStack: ["Laravel 12", "PHP 8.2", "Stripe", "Google 2FA", "Spatie Permission"],
    linkNote: "Client project; the demo server is offline. Happy to walk through the code in an interview.",
    sourceUrl: "#"
  },
  {
    image: "/projects/pride-mile.webp",
    title: "PRIDEMILE",
    bgColor: "bg-surface-container-high",
    status: "Private",
    badge: "Private",
    role: "Backend Developer",
    period: "2023 - 2024",
    description: "Backend API service: optimized search API and multi-currency subscription billing.",
    longDescription: "Pridemile is a backend API service. I proposed and built a search API and optimized its database queries, built the end-to-end multi-currency subscription flow, and integrated AWS S3 for asset storage.",
    features: [
      "Proposed and built a search API, then optimized its database queries for faster data retrieval",
      "End-to-end multi-currency subscription flow with a payment processor to manage user access tiers",
      "AWS S3 storage for product images and assets"
    ],
    techStack: ["Laravel", "MySQL", "AWS S3"],
    sourceUrl: "#"
  },
  {
    image: "/projects/atvn-logo.webp",
    title: "ATVN CAR REPAIRING",
    bgColor: "bg-[#FF6D00]",
    status: "Private",
    badge: "Private",
    role: "Backend Developer",
    period: "2023",
    description: "Car repair platform with role-based access, 2FA and a point redemption history feature.",
    longDescription: "ATVN is a car repair platform. I added role-based access control and two-factor authentication, shipped the Point Redemption History feature from concept to release, and built automated email notifications.",
    features: [
      "Role-based access control through Laravel middleware and a two-factor authentication system",
      "Built the 'Point Redemption History' feature from concept to release: database schema, backend logic and user interface",
      "Automated email notifications for key user actions; fixed profile-update bugs"
    ],
    techStack: ["Laravel", "RBAC", "2FA"],
    sourceUrl: "#"
  },
  {
    image: "/projects/hotspot-management.webp",
    title: "HOTSPOT GUEST WIFI",
    bgColor: "bg-surface-container-high",
    status: "Private",
    badge: "Private",
    role: "Backend Developer",
    period: "2024",
    description: "Guest WiFi portal: UniFi and Buddy APIs give guests WiFi access automatically after payment.",
    longDescription: "Hotspot Guest WiFi Portal connects web software to physical router infrastructure. I integrated the UniFi Controller API to authorize guests on the hotspot network after a successful payment, and built the guest login and payment flow with the Buddy payment gateway.",
    features: [
      "UniFi Controller API integration that authorizes guests on the hotspot network automatically after payment",
      "Guest login and payment flow with the Buddy payment gateway"
    ],
    techStack: ["Laravel", "UniFi API", "Buddy"],
    sourceUrl: "#"
  }
];

// Personal side projects. Descriptions are kept factual: these are experiments, not client work.
export const aiLabProjects = [
  {
    image: "/projects/ai-featured/work-bestie.webp",
    title: "WORK BESTIE",
    bgColor: "bg-surface",
    status: "Live",
    role: "Side Project",
    period: "Personal",
    description: "Productivity web app for tracking work hours and tasks.",
    longDescription: "Work Bestie is a personal productivity app for logging work hours and managing tasks, built as a side project to practise modern frontend tooling and AI-assisted development.",
    features: [
      "Work-hour logging and task management",
      "Responsive interface deployed on Vercel"
    ],
    techStack: ["React", "Tailwind CSS", "Vercel"],
    liveUrl: "https://work-bestie.vercel.app/",
    sourceUrl: "#"
  },
  {
    image: "/projects/ai-featured/custom-resume.webp",
    title: "CUSTOM RESUME",
    bgColor: "bg-surface",
    status: "Live",
    role: "Side Project",
    period: "Personal",
    description: "Resume builder prototype that tailors resume content to a job description with an LLM.",
    longDescription: "Custom Resume is a prototype built with an AI app builder to explore how an LLM can rewrite resume content to match a specific job description.",
    features: [
      "Paste a job description and get resume content tailored to it",
      "Prototype built with AI-assisted tooling and deployed on Vercel"
    ],
    techStack: ["LLM", "React", "Vercel"],
    liveUrl: "https://custom-resume-master.vercel.app/",
    sourceUrl: "#"
  },
  {
    image: "/projects/ai-featured/runner-game.webp",
    title: "RUNNER GAME",
    bgColor: "bg-surface",
    status: "Live",
    role: "Side Project",
    period: "Personal",
    description: "Endless 3D runner game in the browser, built with Three.js.",
    longDescription: "An endless runner built for fun with Three.js: dodge obstacles across three lanes while the speed increases.",
    features: [
      "3D scene, player movement and obstacles in Three.js",
      "Lane switching, collision detection and score counter",
      "Sound effects"
    ],
    techStack: ["Three.js", "JavaScript", "Canvas"],
    liveUrl: "https://vismayoza.com/runner-game/index.html",
    sourceUrl: "#"
  },
  {
    image: "/projects/ai-featured/puzzle-and-games.webp",
    title: "GAMING LOUNGE",
    bgColor: "bg-surface",
    status: "Live",
    role: "Side Project",
    period: "Personal",
    description: "Collection of browser puzzle, strategy and arcade games.",
    longDescription: "Gaming Lounge is a collection of browser puzzle, strategy and classic arcade games, built as a side project.",
    features: [
      "Several puzzle, strategy and arcade games in one place",
      "Responsive layout for desktop and mobile"
    ],
    techStack: ["JavaScript", "Canvas", "Vercel"],
    liveUrl: "https://gamig-lounge.vercel.app/",
    sourceUrl: "#"
  },
  {
    image: "/projects/ai-featured/royal-gaming.webp",
    title: "ROYAL GAMING",
    bgColor: "bg-surface",
    status: "Live",
    role: "Side Project",
    period: "Personal",
    description: "Browser Blackjack and Mines games with play-money balance.",
    longDescription: "Royal Gaming Arena is a small browser game project with Blackjack and Mines, built for fun to practise game state and UI logic in plain JavaScript.",
    features: [
      "Blackjack and Mines game logic",
      "Play-money balance and betting UI"
    ],
    techStack: ["JavaScript", "HTML", "CSS"],
    liveUrl: "https://vismayoza.com/royal-gaming-arena/index.html",
    sourceUrl: "#"
  }
];
