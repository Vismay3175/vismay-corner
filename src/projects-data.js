export const projects = [
  { 
    image: "/projects/infostay.webp", 
    title: "INFOSTAY", 
    status: "Live",
    description: "Hospitality Marketplace (CRM) with real-time notifications and automated booking workflows.",
    longDescription: "Infostay is a robust Hospitality Marketplace designed to streamline the communication between guests and property owners. I implemented secure social authentication (Google/Apple) and developed the core e-commerce module. A key highlight is the real-time notification system built with Socket.io, which instantly alerts owners about orders and leave requests. I also architected an automated directory booking and quotation workflow, transforming a previously manual process into a seamless digital experience.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "Implemented secure social authentication (Google and Apple)",
      "Developed core e-commerce module (product, cart, and order management)",
      "Built real-time notification system using Socket.io for orders and leave requests",
      "Architected automated directory booking and quotation workflow via email and live notifications",
      "Streamlined manual booking processes into an automated digital workflow"
    ],
    techStack: ["Laravel", "MySQL", "Google/Apple Auth", "Socket.io", "E-commerce"],
    liveUrl: "https://infostay.app/login",
    sourceUrl: "#"
  },
  { 
    image: "/projects/perfectstay-logo.webp", 
    title: "PERFECTSTAY", 
    status: "Live",
    description: "Property Management Ecosystem featuring AI-powered booking assistant and social feed generation.",
    longDescription: "PerfectStay is a sophisticated property management platform where I led critical API migrations (STAAH to SU) and optimized storage using AWS S3. We've recently enhanced the platform with cutting-edge AI: an AI Booking Assistant powered by ChatGPT for intelligent user queries, and an Automatic Social Feed Generator that creates dynamic content for news, weather, and activities. I also developed new dashboards for website owners and revamped the front-user experience for onboarded property owners.",
    detailsUrl: "https://perfectstay.rentals/social-feed",
    bgColor: "bg-surface",
    features: [
      "AI Booking Assistant powered by ChatGPT for intelligent user queries",
      "Automatic Social Feed Generator (OpenAI) for news, weather, and travel activities",
      "Collaborated with STAAH API team for property availability and rate management",
      "Developed migration module from STAAH API to new SU API",
      "Twilio API integration for automated WhatsApp check-in messages",
      "AWS S3 migration for optimized image storage and loading times",
      "New Dashboards for website owners and revamped front-user dashboards"
    ],
    techStack: ["Laravel", "OpenAI (ChatGPT)", "Twilio", "AWS S3", "STAAH/SU API"],
    liveUrl: "http://perfectstay.rentals/",
    sourceUrl: "#"
  },
  { 
    image: "/projects/loscop.webp", 
    title: "LOSCOP", 
    status: "Live",
    description: "Product Tracking System with Stripe payment integration and real-time chat.",
    longDescription: "Loscop is a product tracking platform where I integrated the Stripe API to manage multi-tier user subscriptions. I enabled real-time chat functionality using Pusher for instant tracking updates and expanded the core logic for QR code generation and processing. Additionally, I assisted in building components for the admin analytics dashboard to visualize user activity and tracking data.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "Stripe API integration for secure subscription payments and access tiers",
      "Real-time chat functionality using Pusher for tracking updates",
      "Expanded core logic for QR code generation and processing",
      "Admin analytics dashboard components for data visualization"
    ],
    techStack: ["Laravel", "Stripe API", "Pusher", "Twilio", "QR Codes"],
    liveUrl: "https://app.loscop.com/",
    sourceUrl: "#"
  },
  { 
    image: "/projects/altaseira-logo.webp", 
    title: "ALTASEIRA", 
    status: "Live",
    description: "Platform Revamp with advanced reporting and RTL/LTR support.",
    longDescription: "Altaseira involved a major platform revamp where I designed a detailed reporting dashboard using Chart.js for complex data visualization. I led the internationalization effort, implementing both LTR (English) and RTL (Arabic) layouts. To improve team efficiency, I created a custom web tool to automate finding and comparing language files, which reduced manual translation errors.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "Detailed reporting dashboard with Chart.js (pie, bar, bubble graphs)",
      "Internationalization (i18n) with RTL (Arabic) and LTR (English) support",
      "Custom web tool for automated language file comparison",
      "URWAY Payment Gateway integration"
    ],
    techStack: ["Laravel", "React", "Chart.js", "URWAY", "RTL/LTR CSS"],
    liveUrl: "https://altaseira.com/",
    sourceUrl: "#"
  },
  { 
    image: "/projects/ciy-club.webp", 
    title: "CIY.CLUB", 
    status: "Live",
    description: "Community-driven platform featuring a student dashboard to track skills and learning paths with a matrix-type UI, plus automated certificate generation upon level completion.",
    longDescription: "CIY.Club (Code It Yourself Club) is a robust, state-of-the-art educational management platform meticulously engineered to bridge the gap between technical curriculum delivery and operational excellence. At its core, the system solves the complex challenge of managing individual student learning \"journeys\" across multiple global branches, ensuring that every student receives a personalized and tracked experience. By consolidating curriculum management, real-time attendance, and automated reporting into a single source of truth, CIY.Club empowers educators to focus on teaching while the platform handles the logistical heavy lifting.\n\nThe project’s value proposition lies in its structured Learning Matrix, which transforms abstract coding concepts into a tangible roadmap of skills and achievements. The impact is felt across the entire ecosystem: Super Admins gain birds-eye visibility into regional performance, Coaches are equipped with dynamic assessment tools, and Parents are kept deeply engaged through transparent, automated progress reports. It is not just a management tool; it is a scalable framework for nurturing the next generation of tech talent.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "Dynamic Learning Matrix: A hierarchical curriculum engine that tracks student progress through levels and skills.",
      "Real-time Attendance Management: QR-based and slug-driven check-in systems for immediate session visibility.",
      "Multi-Role Unified Dashboard: Tailored experiences for Super Admins, Branch Managers, Coaches, and Parents.",
      "Automated Certification Engine: Instant generation and delivery of high-quality PDF certificates.",
      "Subscription & Revenue Management: Complex billing system handling package purchases, renewals, and subscription freezing.",
      "Performance Analytics & Reporting: Data-driven insights via automated level reports and audit logs."
    ],
    techStack: ["Laravel 12", "Tailwind CSS", "Vite", "MySQL", "MyFatoorah", "Twilio WhatsApp API", "Snappy/Wkhtmltopdf", "Spatie Laravel-Permission", "Yajra DataTables"],
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
    description: "E-commerce platform for beauty and wellness products, featuring Stripe payment integration, inventory management, and a comprehensive admin panel for shop operations.",
    longDescription: "My Tira is a premium B2B and consumer-facing digital platform designed to redefine the artisanal dessert experience. Rooted in the craft of premium tiramisu jars, the project serves as a sophisticated bridge between traditional Italian culinary excellence and modern digital commerce. The platform provides a high-end showcase for professional clients—including restaurants, high-end cafes, and specialty boutiques—while maintaining an elegant retail presence for direct consumers.\n\nThe primary challenge addressed by My Tira was the digitization of a high-touch, premium product. By replacing generic e-commerce patterns with a mobile-first, minimalistic design philosophy, we created a journey that emphasizes sensory appeal through high-resolution imagery and narrative-driven storytelling. The resulting platform doesn't just sell a product; it facilitates professional relationships through a streamlined quote system, ensuring that the brand’s B2B operations are as refined as the desserts themselves.",
    detailsUrl: "#",
    bgColor: "bg-surface",
    features: [
      "Artisanal Product Showcase: Narrative-driven product grid with high-performance lazy-loading.",
      "B2B Quote Optimization: Direct WhatsApp API integration for seamless professional inquiries.",
      "Dynamic Order Tracking: Custom-engineered status-stepper for real-time B2B logistics transparency.",
      "Advanced Operational Dashboard: Comprehensive admin suite with KPI tracking and sales analytics.",
      "Multilingual Global Reach: Native support for English and French with localized SEO.",
      "Intelligent Marketing Controls: Integrated banner and CMS management for seasonal promotions."
    ],
    techStack: ["Laravel 12", "PHP 8.2+", "TailwindCSS 4", "Vite", "MySQL", "Stripe", "Intervention Image", "Spatie Translatable", "Sanctum API"],
    liveUrl: "https://php.devstree.in/trip-deen/public/",
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
    description: "Backend API Service for high-traffic product search and user subscriptions.",
    longDescription: "Pridemile is a specialized Backend API Service where I architected high-traffic search functionalities and optimized complex database queries to ensure rapid data retrieval. I led the integration with AWS S3 for scalable asset management and developed a secure, multi-tier user subscription ecosystem integrated with professional payment processors.",
    detailsUrl: "#",
    bgColor: "bg-surface-container-high",
    features: [
      "Proposed and optimized a high-traffic search API, significantly reducing query latency",
      "Integrated AWS S3 for scalable storage and retrieval of product-related assets",
      "Built end-to-end user subscription flow with secure payment gateway integration",
      "Managed different user access tiers and secure permission logic"
    ],
    techStack: ["Laravel", "RESTful API", "AWS S3", "MySQL", "Payment Integration"],
    liveUrl: "#",
    sourceUrl: "#"
  },
  { 
    image: "/projects/atvn-logo.webp", 
    title: "ATVN CAR REPAIRING", 
    status: "Offline",
    description: "Platform Enhancement with role-based security and automated notifications.",
    longDescription: "ATVN is a car repairing platform where I focus on strengthening system security and user engagement. I implemented Role-Based Access Control (RBAC) using custom Laravel Middleware and integrated a 2FA system. I also automated key notification workflows and built a comprehensive point redemption history module, improving both security and the overall user experience.",
    detailsUrl: "#",
    bgColor: "bg-[#FF6D00]",
    features: [
      "Implemented Robust RBAC using Laravel Middleware and 2FA integration",
      "Developed automated email notification system for profile and points activity",
      "Built 'Point Redemption History' from schema design to UI implementation",
      "Resolved critical profile update bugs and optimized UI/UX flows"
    ],
    techStack: ["Laravel", "Middleware", "2FA", "Bootstrap", "MySQL"],
    liveUrl: "#",
    sourceUrl: "#"
  },
  { 
    image: "/projects/hotspot-management.webp", 
    title: "HOTSPOT GUEST WIFI", 
    status: "Offline",
    description: "Guest WiFi Management Portal with UniFi Controller API integration.",
    longDescription: "This project involved building a sophisticated Guest WiFi Management Portal that bridges physical networking hardware with web software. I integrated the UniFi Controller API to authenticate users onto the network after successful payment processing via the Buddy gateway. I developed the entire login and payment flow, gaining deep experience in hardware API orchestration.",
    detailsUrl: "#",
    bgColor: "bg-surface-container-high",
    features: [
      "Integrated UniFi Controller API for real-time guest authentication",
      "Developed complete guest login and secure payment flow via Buddy Gateway",
      "Bridged web software with physical network infrastructure APIs",
      "Managed secure session handling and payment verification logic"
    ],
    techStack: ["Laravel", "UniFi API", "Buddy Gateway", "Networking APIs"],
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
