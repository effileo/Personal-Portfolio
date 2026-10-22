export type Project = {
  id?: string;
  title: string;
  category: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl: string;
  repoUrl?: string;
  imageOrientation?: "landscape" | "portrait";
  imageFit?: "cover" | "contain";
  link?: {
    label: string;
    url: string;
  };
};

export const projects: Project[] = [
  {
    id: "lf-hotel-restaurant",
    title: "LF Hotel & Restaurant Management System",
    category: "Multi-Tenant Management Platform",
    description:
      "A multi-tenant hotel and restaurant management platform connecting luxury hospitality properties with guests. Features role-based management portals for super administrators and hotel operators to manage services, inventory, and reservation workflows. Customers can explore properties, browse categorized dining and accommodation offerings, and submit reservations in real time.",
    image: "/projects/lf-hotel-restaurant.webp",
    techStack: ["React", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS", "JWT"],
    liveUrl: "https://lf-fullstack.vercel.app",
    repoUrl: "https://github.com/effileo/LF-Fullstack",
  },
  {
    id: "beth",
    title: "Beth",
    category: "Property Auction App (Team Project)",
    description:
      "A collaborative 5-member team project building a local property auction and rental platform. The platform features competitive auction bidding, proposal submissions with document verification, proximity-based property discovery, and Fayda Digital ID authentication. I took the product from the initial Figma design through full-stack development and testing.",
    image: "/projects/bet.webp",
    imageOrientation: "portrait",
    techStack: ["Flutter", "Dart", "Riverpod", "Node.js", "Express", "PostgreSQL", "Prisma"],
    liveUrl: "",
    repoUrl: "https://github.com/olit2004/Bet",
  },
  {
    id: "healthnet",
    title: "HealthNet",
    imageFit: "cover",
    category: "Healthcare Management Platform",
    description:
      "A full-stack healthcare management platform connecting facilities, medical personnel, and patients across Ethiopia. Features role-based access for hospital administrators, doctors, and patients, with clinical diagnosis records and secure lab result distribution via Cloudinary. Patients receive tokenized emergency QR passes that allow first responders instant access to vital emergency details.",
    image: "/projects/healthnet.png",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Cloudinary",
    ],
    liveUrl: "https://health-net-ethiopia.vercel.app/",
    repoUrl: "https://github.com/effileo/HealthNet-V3",
  },

  {
    id: "qelem",
    title: "Qelem",
    imageFit: "contain",
    category: "Campus Management Platform (In Development)",
    description:
      "An integrated campus and academic management platform currently in active development under my lead. The platform provides dedicated Student, Lecturer, and Admin portals for 4-digit code attendance check-in, real-time office hours queue management, study group matching, and anonymous course evaluations. Built on Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, Prisma, and Supabase to streamline institutional operations.",
    image: "/projects/qelem.webp",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Supabase",
    ],
    liveUrl: "",
    repoUrl: "https://github.com/effileo/EduHub",
  },
  {
    id: "mini-git",
    title: "Mini-Git",
    category: "Version Control System in C++",
    description:
      "A custom version control system built from scratch in C++. It features content-addressable storage using FNV-1a hashing, commit history tracked on a Directed Acyclic Graph, and automated three-way merging using bidirectional breadth-first search to find Lowest Common Ancestors. Supports core Git workflows including staging index management, branch pointers, commit checkouts, and line-by-line diff generation.",
    image: "/projects/minigit.webp",
    techStack: ["C++", "C++17", "g++"],
    liveUrl: "",
    repoUrl: "https://github.com/lemigobena/DSA-MiniGit-Project",
  },
  {
    id: "ui-ux-beth",
    title: "Beth (UI/UX Design)",
    category: "UI/UX Design · Team Project",
    description:
      "Designed the user interface for the Beth rental and bidding app in Figma and carried the product through development and testing as part of a 5-person team. Created the landing page layout for property listings, the account sign-up workflow, and authentication screens.",
    image: "/projects/beth-uiux.webp",
    imageOrientation: "portrait",
    techStack: ["Figma"],
    liveUrl: "",
    link: {
      label: "View design in Figma",
      url: "https://www.figma.com/design/fQQLP34ULoUWZlbmOPtGCl/Beth?node-id=0-1&t=Blj4Jdznk78swNuk-1",
    },
  },
];
