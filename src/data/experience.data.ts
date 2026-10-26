export interface ExperienceEntry {
  id: string;
  role: string;
  org: string;
  type: string;
  status: "Active" | "Completed" | string;
  branch: boolean;
  period: string;
  accent: string;
  hash: string;
  summary: string;
  points: string[];
  tech: string[];
}

export const experienceData: ExperienceEntry[] = [
  {
    id: "freelance",
    role: "Freelance Full-Stack Developer",
    org: "Upwork",
    type: "Freelance",
    status: "Active",
    branch: true,
    period: "",
    accent: "#A78BFA",
    hash: "7f3a9c2",
    summary:
      "Full-stack projects for clients, from storefronts and dashboards to APIs and deployment pipelines.",
    points: [
      "Deliver end-to-end features across interface, logic, and data.",
      "Hold a 5.0 rating across completed jobs.",
      "Own scoping, build, and handoff for each project.",
    ],
    tech: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
  },
  {
    id: "torosachi",
    role: "Shopify Developer Intern",
    org: "Torosachi Development Team",
    type: "Internship · Remote",
    status: "Completed",
    branch: false,
    period: "",
    accent: "#95BF47",
    hash: "c41e08b",
    summary: "Remote internship building on the Shopify platform.",
    points: [
      "Built storefront features with Hydrogen and Remix.",
      "Worked with the Storefront API and the Admin API.",
      "Collaborated remotely with the development team.",
    ],
    tech: ["Shopify", "Hydrogen", "Remix", "Storefront API", "Admin API"],
  },
  {
    id: "cba-simulation",
    role: "Software Engineering Virtual Experience",
    org: "Commonwealth Bank, via Forage",
    type: "Virtual Experience · Remote",
    status: "Completed",
    branch: false,
    period: "March 2026",
    accent: "#38BDF8",
    hash: "e92a4f1",
    summary:
      "Completed a job simulation modeled on real engineering work at Commonwealth Bank, covering changes to an existing .NET backend and a React and Redux frontend, handling client requests, and finishing with tests and a pull request.",
    points: [
      "Modified an existing .NET backend.",
      "Modified an existing React and Redux frontend.",
      "Handled and implemented the client's requested changes.",
      "Wrote tests to cover the code.",
      "Created a pull request for the changes.",
    ],
    tech: [".NET", "React", "Redux", "Git", "Pull Requests"],
  },
];

export const experience = experienceData;
export default experienceData;
