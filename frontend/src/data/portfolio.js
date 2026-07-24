export const projects = [
  {
    index: "01",
    title: "Guised Up",
    eyebrow: "AI social platform · Full stack",
    description:
      "A personalized Real Connections Feed combining mobile product design with semantic search, vector embeddings, and an interaction-driven recommendation pipeline.",
    tags: ["React Native", "Laravel", "Python", "pgvector"],
    tone: "violet",
    metric: "AI",
    metricLabel: "personalized ranking",
    githubUrl: "https://github.com/jivanspjivan/guised-up-assessment",
    videoId: "waNTdXYVZhI",
    videoUrl: "https://youtu.be/waNTdXYVZhI",
    image: "https://i.ytimg.com/vi/waNTdXYVZhI/maxresdefault.jpg",
    imageAlt: "Guised Up AI-powered Real Connections Feed video demonstration",
    highlights: [
      "Personalized feed ranking based on user behavior",
      "Semantic search powered by vector embeddings",
      "Dedicated Python embedding service",
      "Interaction tracking and recommendation pipeline",
    ],
  },
  {
    index: "02",
    title: "Employee Management System",
    eyebrow: "Business operations · Full stack",
    description:
      "A role-aware operations platform for managing employees and departments, with dashboard analytics and fast discovery across larger datasets.",
    tags: ["React", "Node.js", "PostgreSQL", "Redis"],
    tone: "amber",
    metric: "RBAC",
    metricLabel: "multi-role access",
    githubUrl: "https://github.com/jivanspjivan/employee-management-system",
    liveUrl: "https://employee-management-system-frontend-f4dp.onrender.com/dashboard",
    image: "/projects/employee-management-departments.png",
    imageAlt: "Employee Management System departments dashboard showing teams and assigned employees",
    highlights: [
      "Role-based authentication and authorization",
      "Employee and department management workflows",
      "Dashboard analytics and operational insights",
      "Search, filtering, pagination, and Redis caching",
    ],
    credentials: [
      {
        role: "Super Admin",
        email: "admin.playstack@gmail.com",
        password: "admin@playstack",
      },
      {
        role: "HR Manager",
        email: "arjun.patil.5@playstack.demo",
        password: "PlaystackDemo@123",
      },
    ],
  },
  {
    index: "03",
    title: "GitHub Automation Bot",
    eyebrow: "Developer tooling · Full stack",
    description:
      "A full-stack automation platform that triages GitHub issues, assigns developers, sends Slack alerts, and records every action in an authenticated dashboard.",
    tags: ["React", "Node.js", "PostgreSQL", "GitHub OAuth"],
    tone: "mint",
    metric: "GitHub + Slack",
    metricLabel: "automation",
    githubUrl: "https://github.com/jivanspjivan/Event-Driven-GitHub-Automation-Bot",
    liveUrl: "https://github-automation-bot-frontend-j9ft.onrender.com",
    image: "/projects/github-automation-bot.png",
    imageAlt: "GitHub Automation Bot dashboard showing connected services and repository selection",
    highlights: [
      "GitHub OAuth authentication and secure token storage",
      "Webhook processing for push, issue, and pull request events",
      "Rule-based automation with live activity logs",
      "Slack notifications and durable PostgreSQL job processing",
    ],
  },
];

export const capabilities = [
  {
    icon: "backend",
    number: "01",
    title: "Backend Engineering",
    text: "Scalable APIs, AI-powered services, and event-driven systems designed for reliability and growth.",
    items: [
      "Node.js & Express",
      "Python & FastAPI · PHP & Laravel",
      "Kafka & event-driven architecture",
      "PostgreSQL, pgvector & AI",
    ],
  },
  {
    icon: "frontend",
    number: "02",
    title: "Frontend systems",
    text: "Responsive product interfaces and authenticated dashboards connected to dependable APIs.",
    items: ["React, React Native & Material UI", "Modern JavaScript", "WebSockets & Socket.io"],
  },
  {
    icon: "product",
    number: "03",
    title: "Product thinking",
    text: "Operational ownership from API design and deployment through logging, debugging, and incident response.",
    items: ["Docker, AWS & Nginx", "JWT, OAuth2 & RBAC", "Production debugging"],
  },
];

export const experience = [
  {
    company: "Vymo Asia",
    companyLogo: "/companies/vymo.png",
    role: "Software Engineer",
    period: "May 2025 — Jun 2025",
    location: "Koramangala, Bangalore",
    technologies: ["Node.js", "Express", "Kafka", "PostgreSQL"],
    highlights: [
      "Moved payment processing to a Kafka event pipeline, reducing peak-load transaction failures by 40%.",
      "Built a fault-tolerant reconciliation pipeline processing more than 10,000 transactions daily.",
      "Introduced retry and dead-letter queue patterns later adopted by two other services.",
      "Designed JWT and role-protected APIs for internal tools used by more than 50 employees.",
    ],
  },
  {
    company: "MountBlue Technologies",
    companyLogo: "/companies/mountblue.png",
    role: "Software Engineer",
    period: "Jan 2025 — May 2025",
    location: "JP Nagar, Bangalore",
    technologies: ["React.js", "Node.js", "Express", "PostgreSQL"],
    highlights: [
      "Built responsive React.js interfaces connected to Node.js and Express APIs.",
      "Developed 20+ REST APIs for 500+ daily users, with JWT-based Admin, Manager, and User access.",
      "Kept average API response time below 200ms and improved slow PostgreSQL queries by up to 40%.",
    ],
  },
];
