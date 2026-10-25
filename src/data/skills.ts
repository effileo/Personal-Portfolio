import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiDart,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiRemix,
  SiFlutter,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiGraphql,
  SiPostgresql,
  SiPrisma,
  SiSupabase,
  SiShopify,
  SiTailwindcss,
  SiFigma,
  SiGit,
  SiGithub,
  SiVercel,
  SiDocker,
  SiNginx,
  SiLinux,
  SiHetzner,
  SiPostman,
} from "react-icons/si";
import { TbBinaryTree } from "react-icons/tb";

export type SkillCategory = "Languages" | "Backend" | "Frontend" | "DevOps" | "Fundamentals";
export const skillFilters = [
  "All",
  "Languages",
  "Backend",
  "Frontend",
  "DevOps",
  "Fundamentals",
] as const;

export type Skill = {
  name: string;
  label: string;
  icon: IconType;
  color: string;
  brand: string;
  category: SkillCategory;
};

export const skills: Skill[] = [
  // Languages
  {
    name: "TypeScript",
    label: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    brand: "#3178C6",
    category: "Languages",
  },
  {
    name: "JavaScript",
    label: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
    brand: "#F7DF1E",
    category: "Languages",
  },
  {
    name: "Python",
    label: "Python",
    icon: SiPython,
    color: "#3776AB",
    brand: "#3776AB",
    category: "Languages",
  },
  {
    name: "Dart",
    label: "Dart",
    icon: SiDart,
    color: "#0175C2",
    brand: "#0175C2",
    category: "Languages",
  },
  {
    name: "C/C++",
    label: "C / C++",
    icon: SiCplusplus,
    color: "#00599C",
    brand: "#00599C",
    category: "Languages",
  },

  // Frontend
  {
    name: "React",
    label: "React",
    icon: SiReact,
    color: "#61DAFB",
    brand: "#61DAFB",
    category: "Frontend",
  },
  {
    name: "Next.js",
    label: "Next.js",
    icon: SiNextdotjs,
    color: "theme-aware",
    brand: "theme-aware",
    category: "Frontend",
  },
  {
    name: "Remix",
    label: "Remix",
    icon: SiRemix,
    color: "theme-aware",
    brand: "theme-aware",
    category: "Frontend",
  },
  {
    name: "Flutter",
    label: "Flutter",
    icon: SiFlutter,
    color: "#54C5F8",
    brand: "#54C5F8",
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    label: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
    brand: "#06B6D4",
    category: "Frontend",
  },
  {
    name: "Figma",
    label: "Figma",
    icon: SiFigma,
    color: "#F24E1E",
    brand: "#F24E1E",
    category: "Frontend",
  },
  {
    name: "Shopify",
    label: "Shopify",
    icon: SiShopify,
    color: "#95BF47",
    brand: "#95BF47",
    category: "Frontend",
  },

  // Backend
  {
    name: "Node.js",
    label: "Node.js",
    icon: SiNodedotjs,
    color: "#5FA04E",
    brand: "#5FA04E",
    category: "Backend",
  },
  {
    name: "Express",
    label: "Express",
    icon: SiExpress,
    color: "theme-aware",
    brand: "theme-aware",
    category: "Backend",
  },
  {
    name: "FastAPI",
    label: "FastAPI",
    icon: SiFastapi,
    color: "#009688",
    brand: "#009688",
    category: "Backend",
  },
  {
    name: "GraphQL",
    label: "GraphQL",
    icon: SiGraphql,
    color: "#E10098",
    brand: "#E10098",
    category: "Backend",
  },
  {
    name: "PostgreSQL",
    label: "PostgreSQL",
    icon: SiPostgresql,
    color: "#4169E1",
    brand: "#4169E1",
    category: "Backend",
  },
  {
    name: "Prisma",
    label: "Prisma",
    icon: SiPrisma,
    color: "#5A67D8",
    brand: "#5A67D8",
    category: "Backend",
  },
  {
    name: "Supabase",
    label: "Supabase",
    icon: SiSupabase,
    color: "#3ECF8E",
    brand: "#3ECF8E",
    category: "Backend",
  },
  {
    name: "Postman",
    label: "Postman",
    icon: SiPostman,
    color: "#FF6C37",
    brand: "#FF6C37",
    category: "Backend",
  },

  // DevOps
  {
    name: "Git",
    label: "Git",
    icon: SiGit,
    color: "#F05032",
    brand: "#F05032",
    category: "DevOps",
  },
  {
    name: "GitHub",
    label: "GitHub",
    icon: SiGithub,
    color: "theme-aware",
    brand: "theme-aware",
    category: "DevOps",
  },
  {
    name: "Vercel",
    label: "Vercel",
    icon: SiVercel,
    color: "theme-aware",
    brand: "theme-aware",
    category: "DevOps",
  },
  {
    name: "Docker",
    label: "Docker",
    icon: SiDocker,
    color: "#2496ED",
    brand: "#2496ED",
    category: "DevOps",
  },
  {
    name: "Nginx",
    label: "Nginx",
    icon: SiNginx,
    color: "#009639",
    brand: "#009639",
    category: "DevOps",
  },
  {
    name: "Linux",
    label: "Linux",
    icon: SiLinux,
    color: "#FCC624",
    brand: "#FCC624",
    category: "DevOps",
  },
  {
    name: "Hetzner",
    label: "Hetzner",
    icon: SiHetzner,
    color: "#D50C2D",
    brand: "#D50C2D",
    category: "DevOps",
  },

  // Fundamentals
  {
    name: "Data Structures & Algorithms",
    label: "Data Structures & Algorithms",
    icon: TbBinaryTree,
    color: "#A78BFA",
    brand: "#A78BFA",
    category: "Fundamentals",
  },
];

// Balanced two-row split for the "All" view with mixed categories
export const skillsAllRow1: Skill[] = [
  skills.find((s) => s.name === "TypeScript")!,
  skills.find((s) => s.name === "React")!,
  skills.find((s) => s.name === "Node.js")!,
  skills.find((s) => s.name === "Docker")!,
  skills.find((s) => s.name === "Python")!,
  skills.find((s) => s.name === "Tailwind CSS")!,
  skills.find((s) => s.name === "PostgreSQL")!,
  skills.find((s) => s.name === "Git")!,
  skills.find((s) => s.name === "Next.js")!,
  skills.find((s) => s.name === "FastAPI")!,
  skills.find((s) => s.name === "Linux")!,
  skills.find((s) => s.name === "Dart")!,
  skills.find((s) => s.name === "Supabase")!,
  skills.find((s) => s.name === "Data Structures & Algorithms")!,
];

export const skillsAllRow2: Skill[] = [
  skills.find((s) => s.name === "JavaScript")!,
  skills.find((s) => s.name === "Flutter")!,
  skills.find((s) => s.name === "Express")!,
  skills.find((s) => s.name === "GitHub")!,
  skills.find((s) => s.name === "C/C++")!,
  skills.find((s) => s.name === "Figma")!,
  skills.find((s) => s.name === "Prisma")!,
  skills.find((s) => s.name === "Vercel")!,
  skills.find((s) => s.name === "Remix")!,
  skills.find((s) => s.name === "GraphQL")!,
  skills.find((s) => s.name === "Nginx")!,
  skills.find((s) => s.name === "Shopify")!,
  skills.find((s) => s.name === "Hetzner")!,
  skills.find((s) => s.name === "Postman")!,
];
