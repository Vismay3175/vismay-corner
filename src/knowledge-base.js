
import { projects } from './projects-data.js';

const personalInfo = {
  name: "Vismay Oza",
  role: "Software Developer",
  location: "India",
  experience: "over 3 years",
  industryTenure: "3+ years",
  education: "Pursuing B.Tech in IT at Silver Oak University",
  achievements: {
    projectsCount: "15+",
    latencyReduction: "40%",
    uptime: "99.3%",
    monthlyUsers: "50K+"
  },
  contact: {
    email: "vismy3175@gmail.com",
    linkedin: "https://www.linkedin.com/in/vismay-oza/",
    instagram: "https://www.instagram.com/vismay_.3175",
    github: "https://github.com/Vismay3175"
  },
  skills: {
    backend: ["Laravel", "PHP", "MySQL", "API Architecture", "Redis Caching", "Infrastructure Optimization"],
    data: ["Python", "SQL for Analytics", "BI / Analysis", "System Metrics"],
    tools: ["Docker", "Git", "Linux / CLI", "CI/CD", "Queues"],
    soft: ["Mentorship", "Agile / Lead", "Problem Solving"]
  }
};

const intents = [
  {
    name: "GREETING",
    keywords: ["hi", "hello", "hey", "greetings", "who are you", "good morning", "good afternoon", "good evening"],
    responses: [
      "Welcome. I am the high-performance digital assistant for Vismay Oza. I am engineered to provide sophisticated and comprehensive insights into his technical mastery, professional odyssey, and architectural impact. How may I facilitate your inquiry today?",
      "Greetings. I serve as the intelligent interface for Vismay Oza's professional portfolio. I can provide detailed, authoritative information regarding his full-stack expertise, system optimization achievements, and strategic technical vision. Please specify the area you wish to explore."
    ]
  },
  {
    name: "WHO_IS_VISMAY",
    keywords: ["who is", "tell me about", "profile", "vismay oza"],
    responses: [
      "Vismay Oza is an elite Software Developer with over 3 years of hands-on mastery in building scalable, production-grade web systems. He specializes in transforming complex business requirements into high-performance architectures, with a proven track record in backend system design and infrastructure optimization.\n\nCurrently, he is spearheading architectural initiatives at Devstree IT Services while pursuing his B.Tech in IT at Silver Oak University. His professional philosophy is centered on deep systems knowledge and data-driven technical decision-making."
    ]
  },
  {
    name: "SKILLS",
    keywords: ["summarize", "key skills", "tech expertise", "skills", "tech stack", "technology", "what can you do", "programming", "languages", "expertise", "excellence", "mastery"],
    responses: [
      "Vismay possesses a multi-faceted technical arsenal designed for enterprise-level performance and data intelligence:\n\n- **Core Backend Systems:** Mastering Laravel, PHP, and MySQL with a focus on API Architecture and high-concurrency systems.\n- **Performance & Infrastructure:** Expert in Redis Caching and System Optimization, achieving up to 40% latency reduction in production environments.\n- **Data & Analytics:** Proficient in Python, SQL for Analytics, and Business Intelligence to drive technical strategy through measurable system metrics.\n- **Modern Engineering Tools:** Highly skilled in Docker, Git, Linux/CLI, and CI/CD pipelines for seamless deployment and orchestration.",
      "His technical expertise is categorized into four strategic domains to ensure holistic system excellence:\n\n1. **High-Performance Backend:** Delivering secure, scalable, and robust server-side logic using the Laravel ecosystem.\n2. **System Hyper-Optimization:** Tuning databases and infrastructure to sustain mission-critical uptime and extreme user loads.\n3. **Intelligent Data Analysis:** Transforming raw system data into actionable technical insights using analytical tools.\n4. **Leadership & Agile Mastery:** Guiding junior talent and orchestrating complex projects within agile frameworks."
    ]
  },
  {
    name: "INTRO_EMAIL",
    keywords: ["write an intro email", "intro email", "draft email", "email template"],
    responses: [
      "Subject: Strategic Software Developer Introduction: Vismay Oza\n\nDear [Hiring Manager Name],\n\nI am introducing Vismay Oza, a Software Developer with 3+ years of mastery in architecting high-availability, production-grade systems. Vismay specializes in transforming enterprise-level business requirements into high-performance architectures, having successfully orchestrated 12+ enterprise applications with a consistent 99.3% production uptime record.\n\nHis unique blend of backend architectural thinking and data system strategy makes him a formidable asset for performance-critical projects. You may explore his full technical odyssey and production projects at " + window.location.origin + " or initiate direct professional dialogue at " + personalInfo.contact.email + ".\n\nSincerely,\n[Your Name]"
    ]
  },
  {
    name: "CONTACT",
    keywords: ["get in touch", "contact", "email", "hire", "reach", "linkedin", "github", "social", "touch", "connect"],
    responses: [
      "Vismay Oza maintains a responsive professional presence across several strategic channels. For detailed technical inquiries or professional opportunities, he recommends the following:\n\n- **Direct Email:** " + personalInfo.contact.email + "\n- **Professional Network:** [LinkedIn Profile](" + personalInfo.contact.linkedin + ")\n- **Technical Repository:** [GitHub Portfolio](" + personalInfo.contact.github + ")\n\nHe is currently open to strategic opportunities that leverage his expertise in scalable backend architectures and data systems.",
      "To initiate a professional collaboration or technical discussion, you may connect with Vismay through these authenticated platforms:\n\n- **Primary Email:** " + personalInfo.contact.email + "\n- **LinkedIn Mastery:** " + personalInfo.contact.linkedin + "\n- **Open Source Contributions:** " + personalInfo.contact.github
    ]
  },
  {
    name: "EXPERIENCE",
    keywords: ["experience", "years", "background", "work history", "career", "how long", "tenure", "education"],
    responses: [
      "Vismay has spent over 3 years excelling in the architecting of scalable, enterprise-level web systems. His career is marked by high-impact leadership at Devstree IT Services, where he has successfully orchestrated over 12 complex enterprise applications. He currently balances his professional leadership with academic advancement, pursuing a B.Tech in IT at Silver Oak University (Grad 2026).",
      "With a career spanning 3+ years, Vismay has solidified his position as a specialist in backend systems and infrastructure optimization. His tenure at Devstree has been defined by his ability to maintain 99.3% production uptime while driving mission-critical system accelerations."
    ]
  },
  {
    name: "PROJECTS",
    keywords: ["notable projects", "projects", "work", "portfolio", "built", "apps", "websites", "high-impact", "architectures"],
    responses: [
      "Vismay's portfolio is a testament to technical rigor and architectural excellence. Notable production projects include:\n\n- **Infostay:** A sophisticated Hospitality CRM with real-time architectures.\n- **Pridemile:** High-traffic Backend API Service (currently Offline).\n- **PerfectStay:** A high-performance, AI-integrated Property Ecosystem.\n- **Hotspot Guest WiFi:** Networking hardware API integration (currently Offline).\n- **ATVN Car Repairing:** Secure RBAC & 2FA platform enhancement (currently Offline).\n\nHe has orchestrated 15+ high-impact applications, maintaining 99.3%+ uptime and meticulously optimized system performance.",
      "He has spearheaded the development of 15+ complex applications, focusing on architectural scalability and user-centric performance. His portfolio includes high-impact backend services like **Pridemile** and **Hotspot Guest WiFi** (now offline for maintenance) alongside live systems like **CIY.CLUB** and **PerfectStay**."
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
      return "Vismay has orchestrated several high-impact enterprise applications. Here is an executive summary of his key production projects:\n\n" + 
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
      return `Vismay Oza has established over ${personalInfo.experience} of excellence in the IT sector. He currently serves as a ${personalInfo.role} at Devstree, where he spearheads scalable backend architectures and system-wide optimizations.`;
    }
    const randomIndex = Math.floor(Math.random() * bestIntent.responses.length);
    return bestIntent.responses[randomIndex];
  }

  // 4. Fallback
  return "I apologize, but I am specifically engineered to provide detailed accounts of Vismay Oza's professional odyssey. I can offer comprehensive insights into his technical skills, enterprise projects, architectural experience, or established contact protocols. Which aspect would you like to explore in depth?";
}
