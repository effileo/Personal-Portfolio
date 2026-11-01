import fs from "fs";
import path from "path";
import { execSync } from "child_process";

import { profile } from "../src/data/profile.ts";
import { experienceData } from "../src/data/experience.data.ts";
import { projects } from "../src/data/projects.ts";
import { skills } from "../src/data/skills.ts";
import { educationList, certificatesList } from "../src/data/education.data.ts";
import { contactData } from "../src/data/contact.data.ts";

const ROOT_DIR = path.resolve(__dirname, "..");
const CV_DIR = path.join(ROOT_DIR, "cv");
if (!fs.existsSync(CV_DIR)) {
  fs.mkdirSync(CV_DIR, { recursive: true });
}

// User-confirmed facts
const USER_PHONE = "+251933610562";
const FORMATTED_PHONE = "+251 933 610 562";
const USER_EMAIL = "fitaalemayehu12@gmail.com";
const SITE_URL = "https://fitaalemayehu.me";
const GITHUB_URL = "https://github.com/effileo";
const LINKEDIN_URL = "https://www.linkedin.com/in/fita-alemayehu-bulbulo-90bb71374/";
const UPWORK_URL = "https://www.upwork.com/freelancers/~0178ef1a3f037ee2a7";

// Dates (Strictly NO em dashes or en dashes; standard hyphens or 'to')
const DATES = {
  upwork: "2026 - Present",
  torosachi: "March 2026 - August 2026",
  cba: "March 2026",
  aau: "2024 - Present",
};

// Read photo for base64 embed
const photoPath = path.join(CV_DIR, "photo.png");
let photoBase64 = "";
if (fs.existsSync(photoPath)) {
  photoBase64 = fs.readFileSync(photoPath).toString("base64");
}

// Experience items
const experienceItems = [
  {
    role: "FREELANCE FULL-STACK DEVELOPER",
    company: "Upwork",
    period: DATES.upwork,
    bullets: [
      "Architect and ship end-to-end full-stack web applications across responsive interfaces, serverless APIs, and relational databases for international clients.",
      "Maintain a 5.0 client satisfaction rating across completed freelance contracts.",
      "Manage full project lifecycles encompassing technical scoping, database modeling, API architecture, and production cloud deployment.",
    ],
  },
  {
    role: "SHOPIFY DEVELOPER INTERN",
    company: "Torosachi Development Team",
    period: DATES.torosachi,
    bullets: [
      "Engineered headless e-commerce storefront features using Shopify Hydrogen, Remix, and Tailwind CSS.",
      "Integrated dynamic product catalogs, cart management, and checkout pipelines with Shopify Storefront API and Admin API.",
      "Collaborated remotely with the core development team using Git version control and structured pull request reviews.",
    ],
  },
  {
    role: "SOFTWARE ENGINEERING VIRTUAL EXPERIENCE",
    company: "Commonwealth Bank, via Forage",
    period: DATES.cba,
    bullets: [
      "Modified an existing .NET backend and React/Redux frontend to implement client-requested enterprise features.",
      "Authored unit test suites to validate logic changes and created structured pull requests for peer review.",
    ],
  },
];

// 5 Projects
const projectItems = [
  {
    title: "LF Hotel & Restaurant Management System",
    url: "https://lf-fullstack.vercel.app",
    desc: "Multi-tenant hospitality management platform featuring role-based portals for operators and real-time room and dining reservation workflows.",
    stack: "React | Node.js | Express | PostgreSQL | Prisma | Tailwind CSS | JWT",
  },
  {
    title: "Beth (Team Project)",
    url: "https://github.com/olit2004/Bet",
    desc: "Property auction and rental platform featuring competitive bidding, proposal verification, Fayda Digital ID verification, and Figma UI/UX design.",
    stack: "Flutter | Dart | Riverpod | Node.js | Express | PostgreSQL | Prisma | JWT",
  },
  {
    title: "HealthNet",
    url: "https://health-net-ethiopia.vercel.app/",
    desc: "Healthcare platform connecting Ethiopian facilities, physicians, and patients with clinical diagnosis records and emergency QR passes.",
    stack: "React | Node.js | Express | PostgreSQL | Prisma | Tailwind CSS | Cloudinary",
  },
  {
    title: "EduHub / Qelem",
    url: "https://github.com/effileo/EduHub",
    desc: "Integrated campus management platform delivering dedicated portals for 4-digit code attendance check-in, office hours queues, and evaluations.",
    stack: "Next.js | React | TypeScript | Tailwind CSS | PostgreSQL | Prisma | Supabase",
  },
  {
    title: "Mini-Git",
    url: "https://github.com/lemigobena/DSA-MiniGit-Project",
    desc: "Version control system in C++ implementing custom FNV-1a hashing, DAG commit history, and automated three-way merging via BFS.",
    stack: "C++ | C++17 | Custom Hashing | Linked Lists | Data Structures | g++",
  },
];

// Skills for right column
const skillsList = [
  {
    label: "Languages",
    val: "TypeScript, JavaScript, Python, Dart, C, C++, SQL",
  },
  {
    label: "Frontend",
    val: "React, Next.js, Remix, Tailwind CSS, Flutter, Figma",
  },
  {
    label: "Backend",
    val: "Node.js, Express, FastAPI, GraphQL, PostgreSQL, Prisma, Supabase",
  },
  {
    label: "E-Commerce",
    val: "Shopify Hydrogen, Storefront API, Admin API",
  },
  {
    label: "DevOps & Tools",
    val: "Git, GitHub, Docker, Linux, Nginx, Vercel, Hetzner, Postman",
  },
];

// Certifications
const certList = [
  {
    title: "Software Engineering Simulation",
    issuer: "Commonwealth Bank (via Forage)",
    date: "March 2026",
  },
  {
    title: "HTML 5 & Python 3 Complete Course",
    issuer: "Udemy",
    date: "Feb. 2026",
  },
  {
    title: "HTML & CSS Web Development",
    issuer: "Udemy",
    date: "Feb. 2026",
  },
];

// Generate HTML exactly matching the ResumeMayor Modern 2-Column Template
function generateHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Fita Alemayehu - Resume</title>
  <meta name="author" content="Fita Alemayehu">
  <meta name="description" content="Resume of Fita Alemayehu, Software Engineer">
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 10mm 12mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    body {
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 8.7pt;
      line-height: 1.30;
      color: #1a1a1a;
      background: #ffffff;
    }
    a {
      color: #111111;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }

    @media screen {
      body {
        background-color: #f1f5f9;
        padding: 24px 0;
        display: flex;
        justify-content: center;
      }
      .resume-container {
        width: 210mm;
        min-height: 297mm;
        max-height: 297mm;
        padding: 10mm 12mm;
        background: #ffffff;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.08);
        border: 1px solid #e2e8f0;
        overflow: hidden;
      }
    }
    @media print {
      body {
        background: #ffffff;
      }
      .resume-container {
        width: 100%;
        padding: 0;
        box-shadow: none;
        border: none;
      }
    }

    /* 2-COLUMN MAIN LAYOUT */
    .resume-grid {
      display: grid;
      grid-template-columns: 63% 34%;
      column-gap: 3%;
    }

    /* LEFT COLUMN HEADER */
    .left-header {
      display: flex;
      align-items: stretch;
      gap: 12pt;
      margin-bottom: 12pt;
    }
    .accent-bar {
      width: 13pt;
      background: #000000;
      flex-shrink: 0;
    }
    .name-block {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .first-name {
      font-size: 19pt;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #111111;
      line-height: 1.1;
    }
    .last-name {
      font-size: 22pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #000000;
      line-height: 1.1;
    }
    .job-title {
      font-size: 8.5pt;
      font-weight: 600;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: #222222;
      margin-top: 4pt;
    }

    /* RIGHT COLUMN CONTACT BLOCK */
    .contact-table {
      margin-bottom: 6pt;
    }
    .contact-row {
      display: flex;
      align-items: center;
      gap: 7pt;
      padding: 2.8pt 0;
      border-bottom: 0.75pt solid #e2e8f0;
      font-size: 8pt;
      color: #333333;
    }
    .contact-row:last-child {
      border-bottom: none;
    }
    .contact-badge {
      width: 14pt;
      height: 14pt;
      border-radius: 50%;
      background: #f1f5f9;
      color: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 7pt;
      font-weight: 700;
      flex-shrink: 0;
      border: 0.6pt solid #cbd5e1;
    }
    .contact-badge svg {
      width: 8pt;
      height: 8pt;
    }
    .contact-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .contact-text a {
      color: #222222;
    }

    /* RIGHT COLUMN PHOTO */
    .photo-wrapper {
      width: 100%;
      height: 148pt;
      overflow: hidden;
      margin-bottom: 9pt;
      background: #f8fafc;
      border-radius: 2pt;
    }
    .photo-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 12%;
      filter: grayscale(100%) contrast(1.04);
      display: block;
    }

    /* SECTION HEADERS (LEFT COLUMN) */
    .section-title-left {
      font-size: 10.2pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #000000;
      border-bottom: 1.2pt solid #000000;
      padding-bottom: 2pt;
      margin-top: 9pt;
      margin-bottom: 5pt;
    }
    .section-title-left:first-of-type {
      margin-top: 0;
    }

    /* SECTION HEADERS (RIGHT COLUMN) */
    .section-header-right {
      display: flex;
      align-items: center;
      gap: 6pt;
      margin-top: 9pt;
      margin-bottom: 5pt;
    }
    .section-title-right {
      font-size: 9.8pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #000000;
      white-space: nowrap;
    }
    .section-line-right {
      flex: 1;
      height: 1.2pt;
      background: #000000;
    }

    /* SUMMARY TEXT */
    .summary-p {
      font-size: 8.5pt;
      line-height: 1.32;
      color: #262626;
      text-align: justify;
    }

    /* EXPERIENCE ENTRIES */
    .exp-entry {
      margin-bottom: 5.5pt;
    }
    .exp-entry:last-child {
      margin-bottom: 0;
    }
    .exp-role {
      font-size: 9pt;
      font-weight: 800;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: #000000;
    }
    .exp-meta {
      font-size: 8.2pt;
      font-weight: 500;
      color: #4b5563;
      margin-bottom: 2pt;
    }
    ul.exp-bullets {
      list-style-type: none;
      padding-left: 0;
    }
    ul.exp-bullets li {
      position: relative;
      padding-left: 9pt;
      font-size: 8.2pt;
      line-height: 1.26;
      margin-bottom: 1.2pt;
      color: #1f2937;
      text-align: justify;
    }
    ul.exp-bullets li::before {
      content: "\\2022";
      position: absolute;
      left: 1pt;
      color: #000000;
      font-size: 8.5pt;
    }

    /* PROJECTS ENTRIES */
    .proj-entry {
      margin-bottom: 4pt;
    }
    .proj-entry:last-child {
      margin-bottom: 0;
    }
    .proj-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .proj-title {
      font-size: 8.7pt;
      font-weight: 700;
      color: #000000;
    }
    .proj-link {
      font-size: 7.6pt;
      color: #2563eb;
      font-weight: 500;
      margin-left: 4pt;
    }
    .proj-desc {
      font-size: 8pt;
      line-height: 1.22;
      color: #374151;
      margin-top: 0.5pt;
      text-align: justify;
    }
    .proj-stack {
      font-size: 7.7pt;
      color: #4b5563;
      margin-top: 0.5pt;
    }
    .proj-stack strong {
      color: #111111;
      font-weight: 600;
    }

    /* RIGHT COLUMN: EDUCATION */
    .edu-degree {
      font-size: 8.7pt;
      font-weight: 700;
      color: #000000;
      line-height: 1.2;
    }
    .edu-school {
      font-size: 8.2pt;
      font-weight: 500;
      color: #374151;
      margin-top: 1pt;
    }
    .edu-date {
      font-size: 7.8pt;
      font-style: italic;
      color: #6b7280;
      margin-top: 1pt;
    }

    /* RIGHT COLUMN: SKILLS */
    .skills-block {
      margin-bottom: 4pt;
    }
    .skills-subtitle {
      font-size: 8.4pt;
      font-weight: 700;
      color: #000000;
      margin-bottom: 2pt;
    }
    ul.skills-list {
      list-style-type: none;
      padding-left: 0;
    }
    ul.skills-list li {
      position: relative;
      padding-left: 8pt;
      font-size: 7.9pt;
      line-height: 1.24;
      margin-bottom: 1.5pt;
      color: #1f2937;
    }
    ul.skills-list li::before {
      content: "\\2022";
      position: absolute;
      left: 0;
      color: #000000;
      font-size: 8pt;
    }
    ul.skills-list strong {
      color: #000000;
      font-weight: 600;
    }

    /* RIGHT COLUMN: CERTIFICATIONS */
    .cert-item {
      margin-bottom: 3pt;
      font-size: 7.9pt;
      line-height: 1.22;
    }
    .cert-title {
      font-weight: 700;
      color: #000000;
    }
    .cert-issuer {
      color: #4b5563;
      font-size: 7.5pt;
    }
  </style>
</head>
<body>
<div class="resume-container">
  <div class="resume-grid">
    <!-- LEFT COLUMN -->
    <div class="left-col">
      <!-- HEADER NAME BLOCK WITH ACCENT BAR -->
      <div class="left-header">
        <div class="accent-bar"></div>
        <div class="name-block">
          <div class="first-name">FITA</div>
          <div class="last-name">ALEMAYEHU</div>
          <div class="job-title">S O F T W A R E &nbsp; E N G I N E E R</div>
        </div>
      </div>

      <!-- SUMMARY -->
      <div class="section-title-left">SUMMARY</div>
      <p class="summary-p">
        Full-stack software engineer and Software Engineering student at Addis Ababa University with a 5.0 Upwork client rating, a remote Shopify developer internship, and 20+ production repositories on GitHub. Proficient across the full stack from crafting responsive React and Flutter frontends to architecting scalable Node.js backends with PostgreSQL. Experienced in headless e-commerce development with Shopify Hydrogen and GraphQL, with an enduring focus on clean architecture, real-world problem solving, and dependable systems.
      </p>

      <!-- WORK EXPERIENCE -->
      <div class="section-title-left">WORK EXPERIENCE</div>
      ${experienceItems
        .map(
          (exp) => `
      <div class="exp-entry">
        <div class="exp-role">${exp.role}</div>
        <div class="exp-meta">${exp.company} | ${exp.period}</div>
        <ul class="exp-bullets">
          ${exp.bullets.map((b) => `<li>${b}</li>`).join("")}
        </ul>
      </div>`,
        )
        .join("")}

      <!-- PROJECTS -->
      <div class="section-title-left">PROJECTS</div>
      ${projectItems
        .map(
          (proj) => `
      <div class="proj-entry">
        <div class="proj-title-row">
          <span class="proj-title">${proj.title}</span>
          <a class="proj-link" href="${proj.url}">[link]</a>
        </div>
        <div class="proj-desc">${proj.desc}</div>
        <div class="proj-stack"><strong>Stack:</strong> ${proj.stack}</div>
      </div>`,
        )
        .join("")}
    </div>

    <!-- RIGHT COLUMN -->
    <div class="right-col">
      <!-- CONTACT TABLE -->
      <div class="contact-table">
        <div class="contact-row">
          <div class="contact-badge">M</div>
          <div class="contact-text"><a href="tel:${USER_PHONE}">${FORMATTED_PHONE}</a></div>
        </div>
        <div class="contact-row">
          <div class="contact-badge">@</div>
          <div class="contact-text"><a href="mailto:${USER_EMAIL}">${USER_EMAIL}</a></div>
        </div>
        <div class="contact-row">
          <div class="contact-badge">W</div>
          <div class="contact-text"><a href="${SITE_URL}">fitaalemayehu.me</a></div>
        </div>
        <div class="contact-row">
          <div class="contact-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div class="contact-text">Addis Ababa, Ethiopia</div>
        </div>
        <div class="contact-row">
          <div class="contact-badge">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </div>
          <div class="contact-text"><a href="${GITHUB_URL}">github.com/effileo</a></div>
        </div>
        <div class="contact-row">
          <div class="contact-badge">in</div>
          <div class="contact-text"><a href="${LINKEDIN_URL}">LinkedIn</a> | <a href="${UPWORK_URL}">Upwork</a></div>
        </div>
      </div>

      <!-- PHOTO SECTION -->
      <div class="photo-wrapper">
        <img class="photo-img" src="data:image/png;base64,${photoBase64}" alt="Fita Alemayehu">
      </div>

      <!-- EDUCATION -->
      <div class="section-header-right">
        <div class="section-title-right">EDUCATION</div>
        <div class="section-line-right"></div>
      </div>
      <div class="edu-degree">Bachelor of Science in Software Engineering</div>
      <div class="edu-school">Addis Ababa University</div>
      <div class="edu-date">2024 - Present | Addis Ababa, Ethiopia</div>

      <!-- SKILLS -->
      <div class="section-header-right">
        <div class="section-title-right">SKILLS</div>
        <div class="section-line-right"></div>
      </div>
      <div class="skills-block">
        <div class="skills-subtitle">Technical</div>
        <ul class="skills-list">
          ${skillsList.map((s) => `<li><strong>${s.label}:</strong> ${s.val}</li>`).join("")}
        </ul>
      </div>

      <!-- CERTIFICATIONS -->
      <div class="section-header-right">
        <div class="section-title-right">CERTIFICATIONS</div>
        <div class="section-line-right"></div>
      </div>
      ${certList
        .map(
          (c) => `
      <div class="cert-item">
        <div class="cert-title">• ${c.title}</div>
        <div class="cert-issuer">${c.issuer} (${c.date})</div>
      </div>`,
        )
        .join("")}
    </div>
  </div>
</div>
</body>
</html>`;
}

// Generate Word .docx Document with 2-Column Table structure
function generateDocx(outputPath) {
  const tmpDir = path.join(CV_DIR, ".docx_tmp");
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
  fs.mkdirSync(path.join(tmpDir, "_rels"), { recursive: true });
  fs.mkdirSync(path.join(tmpDir, "word", "_rels"), { recursive: true });
  fs.mkdirSync(path.join(tmpDir, "docProps"), { recursive: true });

  fs.writeFileSync(
    path.join(tmpDir, "[Content_Types].xml"),
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`
  );

  fs.writeFileSync(
    path.join(tmpDir, "_rels", ".rels"),
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`
  );

  fs.writeFileSync(
    path.join(tmpDir, "docProps", "core.xml"),
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/">
  <dc:title>Fita Alemayehu - Resume</dc:title>
  <dc:creator>Fita Alemayehu</dc:creator>
</cp:coreProperties>`
  );

  fs.writeFileSync(
    path.join(tmpDir, "docProps", "app.xml"),
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Microsoft Word</Application>
  <Pages>1</Pages>
</Properties>`
  );

  fs.writeFileSync(
    path.join(tmpDir, "word", "_rels", "document.xml.rels"),
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rIdPhone" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="tel:${USER_PHONE}" TargetMode="External"/>
  <Relationship Id="rIdEmail" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="mailto:${USER_EMAIL}" TargetMode="External"/>
  <Relationship Id="rIdSite" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${SITE_URL}" TargetMode="External"/>
  <Relationship Id="rIdGithub" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${GITHUB_URL}" TargetMode="External"/>
  <Relationship Id="rIdLinkedin" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${LINKEDIN_URL}" TargetMode="External"/>
  <Relationship Id="rIdUpwork" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${UPWORK_URL}" TargetMode="External"/>
</Relationships>`
  );

  let docXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    <!-- 2 Column Table for Modern Layout -->
    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="0" w:type="auto"/>
        <w:tblBorders>
          <w:top w:val="none"/>
          <w:left w:val="none"/>
          <w:bottom w:val="none"/>
          <w:right w:val="none"/>
          <w:insideH w:val="none"/>
          <w:insideV w:val="none"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tblGrid>
        <w:gridCol w:w="6400"/>
        <w:gridCol w:w="3700"/>
      </w:tblGrid>
      <w:tr>
        <!-- LEFT COLUMN CELL -->
        <w:tc>
          <w:tcPr>
            <w:tcW w:w="6400" w:type="dxa"/>
            <w:tcMar><w:right w:w="300"/></w:tcMar>
          </w:tcPr>
          
          <!-- Name Header -->
          <w:p>
            <w:pPr><w:spacing w:after="20"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:sz w:val="38"/><w:szCs w:val="38"/></w:rPr><w:t>FITA</w:t></w:r>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:after="30"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="44"/><w:szCs w:val="44"/></w:rPr><w:t>ALEMAYEHU</w:t></w:r>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:after="140"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="17"/><w:color w:val="333333"/></w:rPr><w:t>S O F T W A R E   E N G I N E E R</w:t></w:r>
          </w:p>

          <!-- SUMMARY -->
          <w:p>
            <w:pPr>
              <w:pBdr><w:bottom w:val="single" w:sz="10" w:space="1" w:color="000000"/></w:pBdr>
              <w:spacing w:before="60" w:after="40"/>
            </w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="20"/><w:caps/></w:rPr><w:t>SUMMARY</w:t></w:r>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:after="60"/><w:jc w:val="both"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:sz w:val="17"/></w:rPr><w:t>Full-stack software engineer and Software Engineering student at Addis Ababa University with a 5.0 Upwork client rating, a remote Shopify developer internship, and 20+ production repositories on GitHub. Proficient across the full stack from crafting responsive React and Flutter frontends to architecting scalable Node.js backends with PostgreSQL. Experienced in headless e-commerce development with Shopify Hydrogen and GraphQL, with an enduring focus on clean architecture, real-world problem solving, and dependable systems.</w:t></w:r>
          </w:p>

          <!-- WORK EXPERIENCE -->
          <w:p>
            <w:pPr>
              <w:pBdr><w:bottom w:val="single" w:sz="10" w:space="1" w:color="000000"/></w:pBdr>
              <w:spacing w:before="80" w:after="40"/>
            </w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="20"/><w:caps/></w:rPr><w:t>WORK EXPERIENCE</w:t></w:r>
          </w:p>`;

  for (const exp of experienceItems) {
    docXml += `
          <w:p>
            <w:pPr><w:spacing w:before="40" w:after="10"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="18"/></w:rPr><w:t>${exp.role}</w:t></w:r>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:after="20"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:sz w:val="16"/><w:color w:val="555555"/></w:rPr><w:t>${exp.company} | ${exp.period}</w:t></w:r>
          </w:p>`;
    for (const b of exp.bullets) {
      docXml += `
          <w:p>
            <w:pPr><w:ind w:left="220"/><w:spacing w:after="10"/><w:jc w:val="both"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:sz w:val="16"/></w:rPr><w:t>•  ${b}</w:t></w:r>
          </w:p>`;
    }
  }

  docXml += `
          <!-- PROJECTS -->
          <w:p>
            <w:pPr>
              <w:pBdr><w:bottom w:val="single" w:sz="10" w:space="1" w:color="000000"/></w:pBdr>
              <w:spacing w:before="80" w:after="40"/>
            </w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="20"/><w:caps/></w:rPr><w:t>PROJECTS</w:t></w:r>
          </w:p>`;

  for (const proj of projectItems) {
    docXml += `
          <w:p>
            <w:pPr><w:spacing w:before="35" w:after="10"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="17"/></w:rPr><w:t>${proj.title}</w:t></w:r>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:after="10"/><w:jc w:val="both"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:sz w:val="16"/></w:rPr><w:t>${proj.desc}</w:t></w:r>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:after="25"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="15"/></w:rPr><w:t>Stack: </w:t></w:r>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:sz w:val="15"/><w:color w:val="555555"/></w:rPr><w:t>${proj.stack}</w:t></w:r>
          </w:p>`;
  }

  docXml += `
        </w:tc>

        <!-- RIGHT COLUMN CELL -->
        <w:tc>
          <w:tcPr>
            <w:tcW w:w="3700" w:type="dxa"/>
            <w:tcMar><w:left w:w="250"/></w:tcMar>
          </w:tcPr>

          <!-- Contact Info -->
          <w:p>
            <w:pPr><w:spacing w:after="30"/></w:pPr>
            <w:hyperlink r:id="rIdPhone"><w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="16"/></w:rPr><w:t>M  </w:t></w:r><w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:sz w:val="16"/></w:rPr><w:t>${FORMATTED_PHONE}</w:t></w:r></w:hyperlink>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:after="30"/></w:pPr>
            <w:hyperlink r:id="rIdEmail"><w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="16"/></w:rPr><w:t>@  </w:t></w:r><w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:sz w:val="16"/></w:rPr><w:t>${USER_EMAIL}</w:t></w:r></w:hyperlink>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:after="30"/></w:pPr>
            <w:hyperlink r:id="rIdSite"><w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="16"/></w:rPr><w:t>W  </w:t></w:r><w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:sz w:val="16"/></w:rPr><w:t>fitaalemayehu.me</w:t></w:r></w:hyperlink>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:after="30"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="16"/></w:rPr><w:t>L  </w:t></w:r>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:sz w:val="16"/></w:rPr><w:t>Addis Ababa, Ethiopia</w:t></w:r>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:after="80"/></w:pPr>
            <w:hyperlink r:id="rIdGithub"><w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:sz w:val="16"/></w:rPr><w:t>github.com/effileo</w:t></w:r></w:hyperlink>
          </w:p>

          <!-- EDUCATION -->
          <w:p>
            <w:pPr>
              <w:pBdr><w:bottom w:val="single" w:sz="10" w:space="1" w:color="000000"/></w:pBdr>
              <w:spacing w:before="60" w:after="30"/>
            </w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="19"/><w:caps/></w:rPr><w:t>EDUCATION</w:t></w:r>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:after="10"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="17"/></w:rPr><w:t>B.Sc. in Software Engineering</w:t></w:r>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:after="10"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:sz w:val="16"/><w:color w:val="333333"/></w:rPr><w:t>Addis Ababa University</w:t></w:r>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:after="60"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:i/><w:sz w:val="15"/><w:color w:val="666666"/></w:rPr><w:t>2024 - Present</w:t></w:r>
          </w:p>

          <!-- SKILLS -->
          <w:p>
            <w:pPr>
              <w:pBdr><w:bottom w:val="single" w:sz="10" w:space="1" w:color="000000"/></w:pBdr>
              <w:spacing w:before="60" w:after="30"/>
            </w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="19"/><w:caps/></w:rPr><w:t>SKILLS</w:t></w:r>
          </w:p>`;

  for (const sk of skillsList) {
    docXml += `
          <w:p>
            <w:pPr><w:spacing w:after="15"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="16"/></w:rPr><w:t>• ${sk.label}: </w:t></w:r>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:sz w:val="15"/></w:rPr><w:t>${sk.val}</w:t></w:r>
          </w:p>`;
  }

  docXml += `
          <!-- CERTIFICATIONS -->
          <w:p>
            <w:pPr>
              <w:pBdr><w:bottom w:val="single" w:sz="10" w:space="1" w:color="000000"/></w:pBdr>
              <w:spacing w:before="60" w:after="30"/>
            </w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="19"/><w:caps/></w:rPr><w:t>CERTIFICATIONS</w:t></w:r>
          </w:p>`;

  for (const c of certList) {
    docXml += `
          <w:p>
            <w:pPr><w:spacing w:after="10"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:b/><w:sz w:val="16"/></w:rPr><w:t>• ${c.title}</w:t></w:r>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:after="25"/></w:pPr>
            <w:r><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter"/><w:sz w:val="15"/><w:color w:val="555555"/></w:rPr><w:t>${c.issuer} (${c.date})</w:t></w:r>
          </w:p>`;
  }

  docXml += `
        </w:tc>
      </w:tr>
    </w:tbl>
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="567" w:right="680" w:bottom="567" w:left="680"/>
    </w:sectPr>
  </w:body>
</w:document>`;

  fs.writeFileSync(path.join(tmpDir, "word", "document.xml"), docXml);

  const zipPath = path.join(CV_DIR, "temp.zip");
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

  execSync(`powershell -Command "Compress-Archive -Path '${tmpDir}\\*' -DestinationPath '${zipPath}' -Force"`);
  fs.renameSync(zipPath, outputPath);
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

function main() {
  console.log("Generating HTML template with modern template & portrait...");
  const htmlContent = generateHtml();
  const htmlPath = path.join(CV_DIR, "index.html");
  fs.writeFileSync(htmlPath, htmlContent);

  const pdfPath = path.join(CV_DIR, "Fita_Alemayehu_CV.pdf");
  const previewPath = path.join(CV_DIR, "preview.png");
  const docxPath = path.join(CV_DIR, "Fita_Alemayehu_CV.docx");

  console.log("Rendering PDF with headless Chrome...");
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

  execSync(
    `powershell -Command "Start-Process -FilePath '${chromePath}' -ArgumentList @('--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--print-to-pdf=${pdfPath}', '${htmlPath}') -Wait -NoNewWindow"`,
    { stdio: "inherit" }
  );

  console.log("Generating visual preview image for verification...");
  execSync(
    `powershell -Command "Start-Process -FilePath '${chromePath}' -ArgumentList @('--headless=new', '--disable-gpu', '--screenshot=${previewPath}', '--window-size=1050,1485', '${htmlPath}') -Wait -NoNewWindow"`,
    { stdio: "inherit" }
  );

  console.log("Generating Word .docx file...");
  generateDocx(docxPath);

  console.log("CV generation completed successfully:");
  console.log("  - HTML: " + htmlPath);
  console.log("  - PDF:  " + pdfPath);
  console.log("  - DOCX: " + docxPath);
  console.log("  - IMG:  " + previewPath);
}

main();
