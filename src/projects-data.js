export const projects = [
  { 
    image: "/projects/perfectstay-logo.webp",
    title: "PERFECTSTAY",
    status: "Live",
    description: "Property Management Platform with an OpenAI Function Calling booking assistant, channel manager sync and Xero invoicing.",
    longDescription: "PerfectStay is a property management platform that lets hosts run bookings, guest communication, owner payouts and accounting from one system, connected to external booking channels. I designed and built an AI Booking Assistant with OpenAI Function Calling that turns a natural-language enquiry into a completed booking, engineered a drag-and-drop booking calendar that renders in under one second, and delivered STAAH / SU channel sync, Xero invoicing with ~70% faster sync and automated owner payouts.",
    detailsUrl: "https://perfectstay.rentals/social-feed",
    bgColor: "bg-surface",
    features: [
      "AI Booking Assistant with OpenAI Function Calling (Tools API): automated OTP identity check, dynamic option cards and natural-language enquiry to completed booking",
      "Drag-and-drop booking calendar with real-time room reassignment; removed N+1 queries with targeted Eloquent eager loading for sub-second renders",
      "Maintained the STAAH channel manager integration with the STAAH API team and independently built the new SU Channel Manager booking API and data migration module",
      "Automated Xero prepayment and final-invoice workflows; ~70% faster live sync with asynchronous HTTP request pooling",
      "Automated property-owner payouts by generating FNB bank payout files from scheduled cron jobs",
      "Audit logging and granular role-based access control for financial operations, invoice deletions and sensitive reservation changes",
      "Migrated all property images to AWS S3 and automated guest check-in messages with Twilio WhatsApp templates"
    ],
    techStack: ["Laravel", "OpenAI", "Xero", "Twilio", "AWS S3"],
    liveUrl: "http://perfectstay.rentals/",
    sourceUrl: "#"
  },
  { 
    image: "/projects/infostay.webp",
    title: "INFOSTAY",
    status: "Live",
    description: "Hospitality Marketplace (CRM) with real-time guest messaging, a GPT-based guest assistant and secure multi-tenant APIs.",
    longDescription: "Infostay is a hospitality marketplace and CRM that connects guests with properties and local businesses, with booking, e-commerce, messaging and in-room digital content. I developed real-time guest messaging with Node.js, Socket.io and Redis, built a GPT-based guest assistant, and designed secure multi-tenant APIs with OAuth2, social login and role-based access.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "Real-time guest messaging microservice with Node.js, Socket.io and Redis Pub/Sub, plus Firebase Cloud Messaging push notifications",
      "OpenAI GPT guest assistance engine that answers property questions, recommends services and handles common support requests",
      "Secure multi-tenant REST APIs with Laravel Passport (OAuth2) and Sanctum, Google and Apple social login and role-based access control",
      "Core e-commerce module (products, cart and orders) and a directory booking and quotation workflow with no manual follow-up",
      "Contactless check-in with dynamic QR codes, DomPDF receipts and invoices, and the Infostay TV live-preview engine"
    ],
    techStack: ["Laravel", "Node.js", "Socket.io", "Redis", "OpenAI"],
    liveUrl: "https://infostay.app/login",
    sourceUrl: "#"
  },
  { 
    image: "/projects/loscop.webp",
    title: "LOSCOP",
    status: "Live",
    description: "QR-based Product Tracking System with real-time chat and Stripe subscriptions for 100K+ active subscriptions.",
    longDescription: "Loscop is a QR-code-based product tracking platform with more than 100,000 active user subscriptions. I integrated the Stripe API for subscription payments and tiered access, built real-time chat for tracking updates, extended the core QR code generation and processing logic, and built admin dashboard components that visualize tracking data and user activity at scale.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "Stripe API integration for secure subscription payments and tiered access levels",
      "Real-time chat so users can communicate instantly about tracking updates",
      "Extended the core logic that generates and processes QR codes for the tracking and status-update workflow",
      "Admin dashboard components that manage subscriptions and visualize tracking data and user activity at scale"
    ],
    techStack: ["Laravel", "Stripe", "Socket.io"],
    liveUrl: "https://app.loscop.com/",
    sourceUrl: "#"
  },
  { 
    image: "/projects/ciy-club.webp",
    title: "CIY.CLUB",
    status: "Live",
    description: "Educational & Coding Platform: multi-role LMS with student progress tracking, auto-generated certificates and Twilio alerts.",
    longDescription: "CIY CLUB is a learning platform for a South African coding education franchise, used by administrators, franchise managers, coaches and parents to manage students and track their progress. I created a multi-role LMS with a Skill Matrix module, student progress tracking, auto-generated certificates and Twilio SMS and WhatsApp alerts.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "Custom Skill Matrix module that reproduces the client's familiar Excel layout as an interactive web grid",
      "Student level-tracking and progress engine for skill advancement, session attendance and specialization pathways",
      "PDF certification engine with DomPDF and Snappy (wkhtmltopdf) for personalized certificates and progress reports",
      "Multi-role LMS dashboard for SuperAdmins, Franchise Managers, Coaches and Parents with Spatie role-based access control",
      "Twilio SMS and WhatsApp notifications for trial sessions, schedule changes and student achievements"
    ],
    techStack: ["Laravel 12", "Twilio", "Spatie RBAC"],
    liveUrls: [
      { label: "Visit Live Project", url: "https://ciyclub.sa/" },
      { label: "Visit Dashboard", url: "https://dashboard.ciyclub.sa/login" }
    ],
    sourceUrl: "#"
  },
  { 
    image: "/projects/tiraLogo.webp",
    title: "MY TIRA",
    status: "Live",
    description: "E-Commerce Platform (Trip Deen) with two-phase Stripe payments and multi-language product content.",
    longDescription: "My Tira is a mobile-first, multi-language e-commerce platform for product discovery, ordering and customer support. I engineered the complete e-commerce backend with two-phase Stripe payments, a localization layer for multi-language product content, and Sanctum-authenticated mobile APIs.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "Complete e-commerce backend: product discovery, cart synchronization, checkout summaries and automated order fulfilment",
      "Stripe API with two-phase payment processing (PaymentIntent creation and capture) and automatic transaction logging",
      "Localization layer with spatie/laravel-translatable for product details, ingredients and categories in multiple languages",
      "Sanctum-authenticated mobile APIs for profiles, address books, wishlists and support tickets, plus banners, coupons, extra charges and ratings and reviews"
    ],
    techStack: ["Laravel 12", "Stripe", "Sanctum"],
    liveUrl: "https://php.devstree.in/trip-deen/public/",
    sourceUrl: "#"
  },
  { 
    image: "/projects/altaseira-logo.webp",
    title: "ALTASEIRA",
    status: "Live",
    description: "Platform Revamp with an analytics dashboard, Arabic RTL support, real-time messaging and URWAY payments.",
    longDescription: "Altaseira is a bilingual (Arabic and English) platform that was rebuilt with new analytics, real-time features and payments. I built an analytics dashboard with Arabic RTL support, real-time messaging with Laravel WebSockets and Pusher, and URWAY payments.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "Admin analytics dashboard with real-time pie, bar and bubble charts, financial reports and advanced filters",
      "Internationalization with full Right-to-Left (Arabic) and Left-to-Right (English) layouts",
      "Internal translation management tool that finds and compares language strings automatically",
      "Real-time messaging and live event broadcasting with Laravel WebSockets and Pusher; APIs secured with JWT Auth and Sanctum",
      "URWAY payment gateway with saved-card management, digital transactions and payment verification"
    ],
    techStack: ["Laravel 10", "Pusher", "JWT", "URWAY"],
    liveUrl: "https://altaseira.com/",
    sourceUrl: "#"
  },
  { 
    image: "/projects/FiarPlay.webp", 
    title: "FAIRPLAY GIVEAWAYS", 
    status: "Live",
    description: "High-performance, transparent giveaway and ecommerce ecosystem designed to redefine how online competitions and retail interact.",
    longDescription: "FairPlay Giveaways is a high-performance, transparent giveaway and ecommerce ecosystem designed to redefine how online competitions and retail interact. In an industry often clouded by opacity, FairPlay stands as a \"Fairness-First\" platform, solving the critical problem of trust in digital giveaways. It provides a verifiable, secure, and engaging environment where users can participate in life-changing competitions while enjoying a seamless premium shopping experience.\n\nBy bridging the gap between traditional ecommerce and high-stakes giveaway rounds, FairPlay Giveaways offers users a dual-value proposition: high-quality products and the excitement of a transparent win. The platform is engineered to handle high traffic and complex transactional logic, making it a robust solution for brands looking to scale their engagement through rewards and memberships. Its impact is measured not just in sales, but in the community trust built through its verifiable winner histories and secure, gated participation.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "Dynamic Giveaway Engine: Orchestrates complex giveaway rounds and promotions with real-time slot tracking.",
      "Tiered Membership System: Drives recurring revenue and user loyalty through weekly and monthly subscription plans.",
      "Comprehensive Ecommerce Suite: Integrates a full-featured store where product purchases translate directly into giveaway entries.",
      "Verifiable Winner Ecosystem: Features a dedicated winner gallery with video evidence and photo proof.",
      "Strategic Partner & Affiliate Portal: Empowers influencers and partners with dedicated tools to track their impact.",
      "Multi-Factor Security (2FA): Guards sensitive user data and administrative controls with Google 2FA.",
      "Automated Financial Reporting: Generates dynamic PDF invoices and provides exhaustive analytics."
    ],
    techStack: ["Laravel 12.0", "PHP 8.2", "Tailwind CSS 4.0", "Vite", "MySQL", "Stripe", "Laravel Socialite", "Google 2FA", "Laravel DomPDF", "Spatie Permissions", "Yajra DataTables"],
    liveUrl: "https://php.devstree.in/fair-play-giveaways/public/",
    sourceUrl: "#"
  },
  { 
    image: "/projects/pride-mile.webp",
    title: "PRIDEMILE",
    status: "Offline",
    description: "Backend API Service: optimized high-traffic search API and multi-currency subscription billing.",
    longDescription: "Pridemile is a backend API service. I proposed and built a high-traffic search API and optimized its database queries, built the end-to-end multi-currency subscription flow, and integrated AWS S3 for scalable asset storage.",
    detailsUrl: "#",
    bgColor: "bg-surface-container-high",
    features: [
      "Proposed and built a high-traffic search API, then optimized its database queries to cut data retrieval times significantly",
      "End-to-end multi-currency subscription flow with a payment processor to manage user access tiers",
      "AWS S3 for scalable storage of product images and assets, with the API structured for horizontal scale"
    ],
    techStack: ["Laravel", "MySQL", "AWS S3"],
    liveUrl: "#",
    sourceUrl: "#"
  },
  { 
    image: "/projects/atvn-logo.webp",
    title: "ATVN CAR REPAIRING",
    status: "Offline",
    description: "Car Repair Platform with role-based access, 2FA and the Point Redemption History feature.",
    longDescription: "ATVN is a car repair platform. I added role-based access control and two-factor authentication, shipped the Point Redemption History feature from concept to release, and built automated email notifications.",
    detailsUrl: "#",
    bgColor: "bg-[#FF6D00]",
    features: [
      "Role-based access control through Laravel middleware and a two-factor authentication system",
      "Built the 'Point Redemption History' feature from concept to release: database schema, backend logic and user interface",
      "Automated email notifications for key user actions; fixed critical profile-update bugs and improved the user flow"
    ],
    techStack: ["Laravel", "RBAC", "2FA"],
    liveUrl: "#",
    sourceUrl: "#"
  },
  { 
    image: "/projects/hotspot-management.webp",
    title: "HOTSPOT GUEST WIFI",
    status: "Offline",
    description: "Guest WiFi Portal: UniFi and Buddy APIs give guests WiFi access automatically after payment.",
    longDescription: "Hotspot Guest WiFi Portal connects web software to physical router infrastructure. I integrated the UniFi Controller API to authorize guests on the hotspot network after a successful payment, and built the complete guest login and payment flow with the Buddy payment gateway.",
    detailsUrl: "#",
    bgColor: "bg-surface-container-high",
    features: [
      "UniFi Controller API integration to authorize guests on the hotspot network automatically after payment",
      "Complete guest login and payment flow with the Buddy payment gateway",
      "Connected web software to physical router infrastructure"
    ],
    techStack: ["Laravel", "UniFi API", "Buddy"],
    liveUrl: "#",
    sourceUrl: "#"
  }
];

export const aiLabProjects = [
  { 
    image: "/projects/ai-featured/work-bestie.webp", 
    title: "WORK BESTIE", 
    status: "Live",
    description: "AI-powered workplace companion for productivity and mental well-being.",
    longDescription: "Work Bestie is an AI-powered workplace companion designed to enhance productivity and support mental well-being. It leverages advanced LLMs to provide personalized advice, manage tasks, and offer emotional support in a professional environment.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "AI-driven task prioritization and management",
      "Personalized productivity coaching and mental health support",
      "Seamless integration with workplace communication tools",
      "Real-time sentiment analysis and feedback"
    ],
    techStack: ["Gemini API", "Laravel", "React", "Tailwind CSS"],
    liveUrl: "https://work-bestie.vercel.app/",
    sourceUrl: "#"
  },
  { 
    image: "/projects/ai-featured/custom-resume.webp", 
    title: "CUSTOM RESUME", 
    status: "Live",
    description: "Intelligent resume builder that tailors content based on job descriptions using LLMs.",
    longDescription: "Custom Resume is an intelligent resume builder that uses Large Language Models to tailor resume content specifically to job descriptions. It helps users highlight relevant skills and experience, increasing their chances of landing interviews.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "AI-powered resume tailoring based on job descriptions",
      "Dynamic content generation and keyword optimization",
      "Multiple professional templates and export options",
      "Real-time feedback and improvement suggestions"
    ],
    techStack: ["NLP", "OpenAI", "Laravel", "React"],
    liveUrl: "https://custom-resume-master.vercel.app/",
    sourceUrl: "#"
  },
  { 
    image: "/projects/ai-featured/runner-game.webp", 
    title: "RUNNER GAME", 
    status: "Live",
    description: "Infinite runner game with procedural level generation and AI-controlled obstacles.",
    longDescription: "Runner Game is an infinite runner game featuring procedural level generation and AI-controlled obstacles. It offers a fast-paced and unpredictable gameplay experience that keeps players on their toes.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "Procedural level generation for infinite gameplay",
      "AI-controlled obstacles and enemy behavior",
      "Smooth animations and responsive controls",
      "High-score tracking and social sharing"
    ],
    techStack: ["Procedural Generation", "Phaser", "JavaScript"],
    liveUrl: "https://vismay.site/runner-game/index.html",
    sourceUrl: "#"
  },
  { 
    image: "/projects/ai-featured/puzzle-and-games.webp", 
    title: "GAMING LOUNGE", 
    status: "Live",
    description: "AI-generated puzzles and logic games that adapt to player skill levels.",
    longDescription: "Gaming Lounge is a collection of AI-generated puzzles and logic games designed to adapt to the player's skill level. It provides a challenging and engaging experience for users of all ages and backgrounds.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "AI-generated adaptive difficulty levels",
      "Diverse collection of logic puzzles and strategy games",
      "Real-time performance tracking and leaderboards",
      "Interactive and responsive game mechanics"
    ],
    techStack: ["Game AI", "Canvas", "JavaScript", "Phaser"],
    liveUrl: "https://gamig-lounge.vercel.app/",
    sourceUrl: "#"
  },
  { 
    image: "/projects/ai-featured/royal-gaming.webp", 
    title: "ROYAL GAMING", 
    status: "Live",
    description: "High-performance gaming platform with AI-driven matchmaking and fraud detection.",
    longDescription: "Royal Gaming is a high-performance gaming platform that utilizes AI for intelligent matchmaking and fraud detection. It provides a secure and competitive environment for gamers to compete and connect.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "AI-driven matchmaking for balanced gameplay",
      "Advanced fraud detection and anti-cheat systems",
      "Real-time leaderboards and tournament management",
      "Secure payment integration for in-game purchases"
    ],
    techStack: ["Real-time", "AI Security", "Laravel", "Socket.io"],
    liveUrl: "https://vismay.site/royal-gaming-arena/index.html",
    sourceUrl: "#"
  },
];
