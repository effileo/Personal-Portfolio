// All editable copy for the site lives in src/data/*.ts
export const profile = {
  name: "Fita Alemayehu",
  fullName: "Fita Alemayehu",
  role: "Full-Stack Software Engineer",
  location: "Addis Ababa, Ethiopia",
  email: "hello@fitabulbulo.dev",
  github: "https://github.com/effileo",
  linkedin: "https://www.linkedin.com/",
  upwork: "https://www.upwork.com/",
  tagline: "Full-stack engineer building production Shopify apps and APIs.",
  intro:
    "Software Engineering student at Addis Ababa University with a 5.0 Upwork rating, a remote Shopify developer internship, and 20+ projects built on GitHub. I work across the stack, from responsive interfaces and backend APIs to production deployment.",
  degreeLine: "B.Sc. Software Engineering · AAU",
  degreeSub: "Remote Shopify internship · CommBank job simulation certificate",
  availability: { label: "Available for", value: "Freelance & Full-Time Roles" },
  quote: "Architecture first. Clean code always. I build software that is designed to last.",
  sideLabel: "Full-stack developer",
  year: "2026",
  stats: [
    { value: "20+", label: "Projects on GitHub" },
    { value: "5.0", label: "Upwork rating" },
    { value: "1", label: "Shopify developer internship completed" },
  ],
};

export const about = {
  heading: "I build software in layers, so each part stays clear and dependable.",
  paragraphs: [
    "I am a Software Engineering student at Addis Ababa University, studying there since 2024. Alongside my coursework I ship production work for real clients.",
    "Through Upwork I take on freelance full-stack projects, from storefronts and dashboards to APIs and deployment pipelines, and I hold a 5.0 rating across completed jobs.",
    "My approach is simple: multi-layered, well-structured systems with clear boundaries between interface, logic, and data. That keeps code easy to change and fast where it matters.",
  ],
};

export interface ExperienceMetric {
  value: string;
  label: string;
}

export interface ExperienceCredential {
  label: string;
  href: string;
}

export interface ExperienceItem {
  role: string;
  title?: string;
  org: string;
  company?: string;
  orgUrl?: string;
  period: string;
  location: string;
  type: string;
  pillText?: string;
  verifiedBadge?: string;
  current?: boolean;
  meta: string;
  description: string;
  tags: string[];
  highlights: string[];
  metrics: ExperienceMetric[];
  credential?: ExperienceCredential;
}

export const experience: ExperienceItem[] = [
  {
    role: "Shopify Developer Intern",
    title: "Shopify Developer Intern",
    org: "Torosachi Development Team",
    company: "Torosachi Development Team",
    period: "TODO: add dates",
    location: "Remote",
    type: "Internship",
    current: true,
    meta: "Remote",
    description:
      "Built and maintained headless Shopify storefronts, working with Hydrogen, the Storefront API, the Admin API, and Remix.",
    tags: ["Hydrogen", "Storefront API", "Admin API", "Remix"],
    highlights: [
      "TODO: add key contribution or project feature",
      "TODO: add architecture or performance improvement",
      "TODO: add tooling or workflow enhancement",
    ],
    metrics: [
      { value: "TODO", label: "TODO: add metric 1" },
      { value: "TODO", label: "TODO: add metric 2" },
      { value: "TODO", label: "TODO: add metric 3" },
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    title: "Freelance Full-Stack Developer",
    org: "Upwork",
    company: "Upwork",
    orgUrl: "https://www.upwork.com",
    period: "2024 to Present",
    location: "Global",
    type: "Freelance",
    current: false,
    meta: "5.0 rated jobs",
    description:
      "Delivering full-stack web and backend projects for international clients, from scoping to deployment.",
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
    highlights: [
      "TODO: add international client milestone",
      "TODO: add full-stack system architecture deliverable",
      "TODO: add production deployment outcome",
    ],
    metrics: [
      { value: "20+", label: "Completed projects" },
      { value: "5.0", label: "Client rating" },
      { value: "100%", label: "Job success" },
    ],
  },
  {
    role: "Software Engineering Virtual Experience",
    title: "Software Engineering Virtual Experience",
    org: "Commonwealth Bank, via Forage",
    company: "Commonwealth Bank, via Forage",
    period: "March 2026",
    location: "Remote",
    type: "Virtual Job Simulation",
    pillText: "Virtual Experience",
    verifiedBadge: "Verified by Forage",
    current: false,
    meta: "Virtual Experience",
    description:
      "Completed a job simulation modeled on real engineering work at Commonwealth Bank, covering changes to an existing .NET backend and a React and Redux frontend, handling client requests, and finishing with tests and a pull request.",
    tags: [".NET", "React", "Redux", "Git", "Pull Requests"],
    highlights: [
      "Modified an existing .NET backend",
      "Modified an existing React and Redux frontend",
      "Handled and implemented the client's requested changes",
      "Wrote tests to cover the code",
      "Created a pull request for the changes",
    ],
    metrics: [
      { value: "5", label: "Practical tasks" },
      { value: "Mar 2026", label: "Completed" },
      { value: "Verified", label: "Forage certificate" },
    ],
    credential: {
      label: "View certificate",
      href: "TODO: add certificate URL or PDF path",
    },
  },
];

export const education = {
  degree: "B.Sc. Software Engineering",
  school: "Addis Ababa University",
  period: "2024 to present",
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
