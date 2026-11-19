
import { projects } from './projects-data.js';

const personalInfo = {
  name: "Vismay Oza",
  headline: "Laravel Backend Engineer | AI Integration Developer",
  role: "Software Developer – Backend",
  location: "Ahmedabad, Gujarat, India",
  experience: "over 3 years",
  industryTenure: "3+ years",
  education: "B.Tech in Information Technology (2022 – 2026) at Silver Oak College of Engineering & Technology, Ahmedabad",
  achievements: {
    livePlatforms: "7+",
    xeroSyncSpeedup: "~70%",
    loscopSubscriptions: "100K+",
    timeToProduction: "3 months"
  },
  contact: {
    email: "vismay3175@gmail.com",
    linkedin: "https://www.linkedin.com/in/vismay-oza/",
    github: "https://github.com/VismayOza"
  },
  skills: {
    backend: ["PHP 8", "Laravel", "MySQL", "REST APIs", "Eloquent", "Queues & Jobs", "Node.js", "Socket.io", "Redis"],
    ai: ["OpenAI API", "Function Calling", "Prompt Engineering", "RAG", "MCP"],
    integrations: ["Stripe", "URWAY", "Twilio", "Xero", "STAAH / SU Channel Manager", "Webhooks"],
    security: ["Passport (OAuth2)", "Sanctum", "JWT", "RBAC", "2FA"],
    devops: ["AWS S3", "Linux", "Laravel Forge", "Nginx", "DigitalOcean", "Git", "Postman"]
  }
};

const intents = [
  {
    name: "GREETING",
    keywords: ["hi", "hello", "hey", "greetings", "who are you", "good morning", "good afternoon", "good evening"],
    responses: [
      "Welcome. I am the assistant for Vismay Oza's portfolio. Ask me about his experience, skills, projects or how to contact him.",
      "Greetings. I serve as the intelligent interface for Vismay Oza's professional portfolio. I can answer questions about his Laravel and AI integration work, projects and experience. What would you like to know?"
    ]
  },
  {
    name: "WHO_IS_VISMAY",
    keywords: ["who is", "tell me about", "profile", "vismay oza"],
    responses: [
      "Vismay Oza is a Laravel Backend Engineer and AI Integration Developer with 3+ years building production Laravel/PHP systems for SaaS, CRM, hospitality and e-commerce.\n\nHe works as a Software Developer – Backend at Devstree IT Services, Ahmedabad (Apr 2023 – Present), through an industry-integrated B.Tech in IT at Silver Oak College of Engineering & Technology. He shipped an OpenAI booking assistant and integrations with Stripe, Twilio, Xero and hotel channel managers, and moved from a non-CS (biology) background to production code within 3 months."
    ]
  },
  {
    name: "SKILLS",
    keywords: ["summarize", "key skills", "tech expertise", "skills", "tech stack", "technology", "what can you do", "programming", "languages", "expertise", "excellence", "mastery"],
    responses: [
      "Vismay's core skills:\n\n- **Backend:** " + personalInfo.skills.backend.join(", ") + "\n- **AI / LLM:** " + personalInfo.skills.ai.join(", ") + "\n- **Integrations:** " + personalInfo.skills.integrations.join(", ") + "\n- **Security & Auth:** " + personalInfo.skills.security.join(", ") + "\n- **DevOps & Tools:** " + personalInfo.skills.devops.join(", ")
    ]
  },
  {
    name: "INTRO_EMAIL",
    keywords: ["write an intro email", "intro email", "draft email", "email template"],
    responses: [
      "Subject: Introduction: Vismay Oza, Laravel Backend Engineer\n\nDear [Hiring Manager Name],\n\nI am introducing Vismay Oza, a Laravel Backend Engineer and AI Integration Developer with 3+ years of production experience at Devstree IT Services. He has delivered backend features and REST APIs for 7+ live platforms across SaaS, CRM, hospitality and e-commerce, shipped an OpenAI chatbot and booking assistant, and integrated Stripe, URWAY, Twilio, Xero and STAAH / SU channel managers. He also made Xero sync about 70% faster.\n\nYou can see his projects at " + window.location.origin + " or contact him at " + personalInfo.contact.email + ".\n\nSincerely,\n[Your Name]"
    ]
  },
  {
    name: "CONTACT",
    keywords: ["get in touch", "contact", "email", "hire", "reach", "linkedin", "github", "social", "touch", "connect"],
    responses: [
      "You can reach Vismay here:\n\n- **Email:** " + personalInfo.contact.email + "\n- **LinkedIn:** [LinkedIn Profile](" + personalInfo.contact.linkedin + ")\n- **GitHub:** [GitHub Profile](" + personalInfo.contact.github + ")\n- **Location:** " + personalInfo.location
    ]
  },
  {
    name: "EXPERIENCE",
    keywords: ["experience", "years", "background", "work history", "career", "how long", "tenure", "education"],
    responses: [
      "**Software Developer – Backend, Devstree IT Services Pvt. Ltd., Ahmedabad** (Apr 2023 – Present)\n\n- Built backend features and REST APIs for 7+ production platforms across SaaS, CRM and hospitality.\n- Shipped an OpenAI chatbot and booking assistant that handles guest queries and completes reservations.\n- Integrated Stripe, URWAY, Twilio and STAAH / SU channel managers with webhook-driven workflows.\n- Made Xero sync ~70% faster, optimized MySQL and ran deployments on Forge, Nginx and AWS S3.\n\n**Education:** " + personalInfo.education + ", through an industry-integrated program (full-time work Monday to Friday, coursework on Saturdays). HSC (Science) at S.S. Divine, Ahmedabad (2022); SSC at Shree Satya Sai Vidyalaya, Jamnagar (2020)."
    ]
  },
  {
    name: "PROJECTS",
    keywords: ["notable projects", "projects", "work", "portfolio", "built", "apps", "websites", "high-impact", "architectures"],
    responses: [
      "Key projects:\n\n- **PerfectStay:** Holiday-rental property management platform with an OpenAI booking assistant, STAAH and SU channel managers, Xero and Hubdoc accounting (~70% faster Xero sync), automated owner payouts and WhatsApp notifications.\n- **Phoenix Token:** Crypto token investment platform with reversible hash-based transaction approvals, BOOST bonus payouts, pre-sale and P2P market modules, DeepL auto-translation and admin-editable notification emails.\n- **Infostay:** All-in-one digital guest platform for hotels: AI guest guide, in-stay ordering, service bookings, in-room TV, real-time chat and staff HR.\n- **CIY.CLUB:** Bilingual academy platform with role-based dashboards, student progress tracking, automatic certificate PDFs and WhatsApp alerts via Twilio.\n- **My Tira:** E-commerce backend with Stripe authorize-then-capture payments, EN / FR content and push notifications.\n- **Altaseira:** Arabic-first services marketplace with URWAY wallet and commission payments and RTL / LTR localization.\n- **Loscop:** QR-based product tracking with Stripe subscriptions for 100K+ active subscriptions.\n- **Pridemile, ATVN, Hotspot Guest WiFi:** Search API and billing, RBAC and 2FA, and UniFi / Buddy WiFi access (private client projects).\n\nAsk about any project by name for details."
    ]
  },
  {
    name: "SMALL_TALK",
    keywords: ["how are you", "good morning", "good afternoon", "good evening", "thanks", "thank you", "cool", "awesome"],
    responses: [
      "I am operating at peak efficiency, thank you for the inquiry. I am prepared to assist you in navigating Vismay's extensive technical work.",
      "Your gratitude is noted. Is there any additional dimension of Vismay's professional projects or technical skills you would like to analyze?",
      "I am always at your service. Vismay engineered my logic to be as precise and helpful as his own backend architectures.",
      "I appreciate your engagement. It is a privilege to showcase the architectural depth of Vismay's production-grade systems."
    ]
  },
  {
    name: "PERSONAL",
    keywords: ["pm of india", "president", "weather", "news", "politics", "sports"],
    responses: [
      "I am strictly specialized in Vismay Oza's professional portfolio and technical architecture. I do not process information regarding general news, politics, or external events. However, I can provide exhaustive details on his Laravel expertise or his AI Laboratory projects.",
      "That inquiry falls outside my specialized knowledge base. My primary directive is to facilitate your exploration of Vismay's career and technical mastery. Would you like to review his production-grade projects instead?",
      "I am focused exclusively on the digital ecosystem of Vismay Oza. For insights into his architectural experience or contact protocols, please proceed with your questions."
    ]
  }
];

export function getLocalResponse(query) {
  const normalizedQuery = query.toLowerCase().replace(/[^\w\s]/gi, '');
  const words = normalizedQuery.split(' ');

  // 1. Check for "overview" or "details" of projects
  if (normalizedQuery.includes('overview') || normalizedQuery.includes('detail') || normalizedQuery.includes('tell me about')) {
    for (const project of projects) {
      if (normalizedQuery.includes(project.title.toLowerCase())) {
        let response = `**${project.title}**\n\n${project.longDescription || project.description}\n\n**Strategic Tech Stack:** ${project.techStack.join(', ')}\n**Architectural Features:**\n- ${project.features.slice(0, 5).join('\n- ')}`;
        if (project.status === 'Offline') {
          response += "\n\n*(Note: This application is currently in maintenance and is offline)*";
        }
        return response;
      }
    }
    
    if (normalizedQuery.includes('projects') || normalizedQuery.includes('each project')) {
      return "Here is a summary of Vismay's key production projects:\n\n" + 
        projects.slice(0, 5).map(p => `**${p.title}**: ${p.description}${p.status === 'Offline' ? ' (Currently Offline)' : ''}`).join('\n\n') + 
        "\n\nWould you like more granular details on a specific architecture like **PerfectStay** or **Infostay**?";
    }
  }

  // 2. Check for specific project mentions
  for (const project of projects) {
    if (normalizedQuery.includes(project.title.toLowerCase())) {
      let response = `**${project.title}**\n\n${project.longDescription || project.description}\n\n**Strategic Tech Stack:** ${project.techStack.join(', ')}`;
      if (project.status === 'Offline') {
        response += "\n\n*(Note: This application is currently in maintenance and is offline)*";
      }
      return response;
    }
  }

  // 3. Check for general intents
  let bestIntent = null;
  let maxMatches = 0;

  for (const intent of intents) {
    let matches = 0;
    for (const keyword of intent.keywords) {
      if (normalizedQuery.includes(keyword)) {
        matches++;
      }
    }
    if (matches > maxMatches) {
      maxMatches = matches;
      bestIntent = intent;
    }
  }

  if (bestIntent && maxMatches > 0) {
    // Special handling for EXPERIENCE to be more direct
    if (bestIntent.name === 'EXPERIENCE' && (normalizedQuery.includes('how long') || normalizedQuery.includes('tenure'))) {
      return `Vismay Oza has established over ${personalInfo.experience} of excellence in the IT sector. He currently serves as a ${personalInfo.role} at Devstree, where he builds Laravel backends, REST APIs and AI and payment integrations.`;
    }
    const randomIndex = Math.floor(Math.random() * bestIntent.responses.length);
    return bestIntent.responses[randomIndex];
  }

  // 4. Fallback
  return "I apologize, but I am specifically engineered to provide detailed accounts of Vismay Oza's professional odyssey. I can offer comprehensive insights into his technical skills, enterprise projects, architectural experience, or established contact protocols. Which aspect would you like to explore in depth?";
}
