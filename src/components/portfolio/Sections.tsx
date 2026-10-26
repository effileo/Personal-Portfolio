import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
  Plus,
  X,
  Check,
} from "lucide-react";
import { about, education, profile } from "@/data/profile";
import { experienceData, type ExperienceEntry } from "@/data/experience.data";
import { educationList, certificatesList, type CertificateItem } from "@/data/education.data";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export function SectionLabel({ children }: { children: string }) {
  return <p className="label mb-6">{children}</p>;
}

type LayerKey = "interface" | "logic" | "data";

interface GalleryCard {
  name: string;
  caption: string;
  layerKey?: LayerKey;
  c1: string;
  c2: string;
  c3: string;
}

const CARDS: GalleryCard[] = [
  { name: "MOBILE", caption: "Flutter · Dart", c1: "#38BDF8", c2: "#7DD3FC", c3: "#0C4A6E" },
  {
    name: "COMMERCE",
    caption: "Shopify · Hydrogen · Remix",
    c1: "#95BF47",
    c2: "#D9F99D",
    c3: "#365314",
  },
  {
    name: "INTERFACE",
    caption: "React · Next.js · TypeScript",
    layerKey: "interface",
    c1: "#6366F1",
    c2: "#61DAFB",
    c3: "#1E1B4B",
  },
  {
    name: "LOGIC",
    caption: "Node · Express · FastAPI",
    layerKey: "logic",
    c1: "#10B981",
    c2: "#FBBF24",
    c3: "#064E3B",
  },
  {
    name: "DATA",
    caption: "PostgreSQL · Prisma · Supabase",
    layerKey: "data",
    c1: "#3B82F6",
    c2: "#5EEAD4",
    c3: "#1E3A8A",
  },
  { name: "API", caption: "REST · GraphQL", c1: "#F472B6", c2: "#A78BFA", c3: "#581C87" },
  { name: "SYSTEMS", caption: "C · C++", c1: "#FB923C", c2: "#FDE68A", c3: "#7C2D12" },
];

function solveCubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  return function (t: number): number {
    let x = t;
    for (let iter = 0; iter < 5; iter++) {
      const currentX = 3 * (1 - x) * (1 - x) * x * p1x + 3 * (1 - x) * x * x * p2x + x * x * x;
      const dx =
        3 * (1 - x) * (1 - x) * p1x + 6 * (1 - x) * x * (p2x - p1x) + 3 * x * x * (1 - p2x);
      if (Math.abs(dx) < 1e-6) break;
      x -= (currentX - t) / dx;
    }
    x = Math.max(0, Math.min(1, x));
    return 3 * (1 - x) * (1 - x) * x * p1y + 3 * (1 - x) * x * x * p2y + x * x * x;
  };
}
const easeCustom = solveCubicBezier(0.22, 1, 0.36, 1);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function ArtworkScene({ index }: { index: number }) {
  switch (index) {
    case 0: // MOBILE
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="art0-header" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--c1)" />
              <stop offset="100%" stopColor="var(--c2)" />
            </linearGradient>
            <linearGradient id="art0-screen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B0F19" />
              <stop offset="100%" stopColor="var(--c3)" />
            </linearGradient>
          </defs>

          {/* Layer 1 (Back): Wing-like swoosh shape in --c2 */}
          <path
            d="M 28,145 C 32,82 92,36 172,48 C 158,82 124,124 58,162 Z"
            fill="var(--c2)"
            opacity="0.32"
          />

          {/* Layer 1 (Back): Smaller second phone at opposite tilt */}
          <g transform="rotate(-14 75 108)">
            <rect
              x="50"
              y="52"
              width="50"
              height="92"
              rx="10"
              fill="#0F172A"
              stroke="var(--c3)"
              strokeWidth="2"
            />
            <rect x="54" y="58" width="42" height="80" rx="6" fill="var(--c3)" opacity="0.6" />
            <rect x="58" y="64" width="34" height="12" rx="3" fill="var(--c1)" opacity="0.7" />
            <rect x="58" y="82" width="14" height="14" rx="3" fill="var(--c2)" opacity="0.7" />
            <rect x="76" y="82" width="16" height="14" rx="3" fill="var(--c1)" opacity="0.7" />
            <rect x="58" y="102" width="34" height="26" rx="3" fill="#0B0F19" opacity="0.8" />
          </g>

          {/* Drop shadow under hero phone */}
          <ellipse cx="118" cy="170" rx="38" ry="7" fill="rgba(0,0,0,0.4)" />

          {/* Layer 2 (Middle/Front): Hero tilted smartphone */}
          <g className="art-hero-object" transform="rotate(12 115 110)">
            {/* Phone body */}
            <rect
              x="80"
              y="40"
              width="70"
              height="128"
              rx="14"
              fill="#0B0F19"
              stroke="var(--c1)"
              strokeWidth="2.5"
            />
            {/* Screen */}
            <rect x="84" y="46" width="62" height="116" rx="10" fill="url(#art0-screen)" />
            {/* Speaker notch */}
            <rect x="105" y="49" width="20" height="3" rx="1.5" fill="#475569" />
            {/* Gradient header bar */}
            <rect x="89" y="57" width="52" height="16" rx="4" fill="url(#art0-header)" />
            <rect x="94" y="63" width="22" height="4" rx="2" fill="#FFFFFF" opacity="0.9" />
            {/* Row of rounded tiles */}
            <rect x="89" y="79" width="14" height="14" rx="4" fill="var(--c1)" />
            <rect x="108" y="79" width="14" height="14" rx="4" fill="var(--c2)" />
            <rect
              x="127"
              y="79"
              width="14"
              height="14"
              rx="4"
              fill="var(--c3)"
              stroke="var(--c2)"
              strokeWidth="1"
            />
            {/* Small bar chart container */}
            <rect
              x="89"
              y="100"
              width="52"
              height="52"
              rx="6"
              fill="#0B0F19"
              stroke="var(--c3)"
              strokeWidth="1"
            />
            {/* Chart bars */}
            <rect x="94" y="132" width="7" height="14" rx="2" fill="var(--c2)" />
            <rect x="104" y="122" width="7" height="24" rx="2" fill="var(--c1)" />
            <rect x="114" y="112" width="7" height="34" rx="2" fill="var(--c2)" />
            <rect x="124" y="118" width="7" height="28" rx="2" fill="var(--c1)" />
            <line
              x1="92"
              y1="147"
              x2="138"
              y2="147"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* Floating accents */}
          <path
            d="M 36,46 Q 36,54 44,54 Q 36,54 36,62 Q 36,54 28,54 Q 36,54 36,46 Z"
            fill="var(--c2)"
            className="art-accent-1"
          />
          <path
            d="M 166,42 L 166,52 M 161,47 L 171,47"
            stroke="var(--c1)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="art-accent-2"
          />
          <circle cx="178" cy="98" r="3.5" fill="var(--c2)" className="art-accent-3" />
          <path
            d="M 32,118 Q 32,123 37,123 Q 32,123 32,128 Q 32,123 27,123 Q 32,123 32,118 Z"
            fill="var(--c1)"
            className="art-accent-4"
          />
          <circle
            cx="172"
            cy="148"
            r="2.5"
            fill="var(--c2)"
            className="art-accent-5 art-accent-minor"
          />
        </svg>
      );

    case 1: // COMMERCE
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="art1-bag" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--c1)" />
              <stop offset="100%" stopColor="var(--c3)" />
            </linearGradient>
          </defs>

          {/* Layer 1 (Back): Storefront building */}
          <rect
            x="36"
            y="58"
            width="128"
            height="98"
            rx="8"
            fill="#0B0F19"
            stroke="var(--c3)"
            strokeWidth="2"
          />
          <rect x="46" y="88" width="46" height="58" rx="4" fill="var(--c3)" opacity="0.45" />
          <rect x="52" y="94" width="16" height="22" rx="2" fill="var(--c1)" opacity="0.25" />
          <rect x="72" y="94" width="16" height="22" rx="2" fill="var(--c2)" opacity="0.25" />
          <rect x="108" y="88" width="46" height="68" rx="4" fill="var(--c3)" opacity="0.3" />

          {/* Striped Awning in --c1 and white */}
          <g>
            <polygon points="28,60 50,60 44,78 22,78" fill="var(--c1)" />
            <polygon points="50,60 72,60 68,78 44,78" fill="#FFFFFF" />
            <polygon points="72,60 94,60 92,78 68,78" fill="var(--c1)" />
            <polygon points="94,60 116,60 116,78 92,78" fill="#FFFFFF" />
            <polygon points="116,60 138,60 140,78 116,78" fill="var(--c1)" />
            <polygon points="138,60 160,60 164,78 140,78" fill="#FFFFFF" />
            <polygon points="160,60 172,60 178,78 164,78" fill="var(--c1)" />
            <path
              d="M 22,78 Q 33,86 44,78 Q 56,86 68,78 Q 80,86 92,78 Q 104,86 116,78 Q 128,86 140,78 Q 152,86 164,78 Q 171,86 178,78"
              fill="none"
              stroke="var(--c2)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {/* Drop shadow under shopping bag */}
          <ellipse cx="112" cy="174" rx="42" ry="7" fill="rgba(0,0,0,0.4)" />

          {/* Layer 2 (Front): Hero shopping bag */}
          <g className="art-hero-object">
            <path
              d="M 94,96 C 94,70 130,70 130,96"
              fill="none"
              stroke="var(--c2)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <rect
              x="76"
              y="94"
              width="72"
              height="76"
              rx="10"
              fill="url(#art1-bag)"
              stroke="var(--c2)"
              strokeWidth="1.5"
            />
            <path d="M 76,104 L 148,104" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <path
              d="M 112,120 C 126,122 130,136 125,146 C 114,146 106,136 112,120 Z"
              fill="var(--c2)"
            />
            <path
              d="M 112,120 Q 118,134 125,146"
              fill="none"
              stroke="var(--c3)"
              strokeWidth="1.5"
            />
          </g>

          {/* Price tag floating nearby */}
          <g transform="rotate(-18 48 116)" className="art-accent-1">
            <polygon
              points="40,110 58,110 68,122 50,122"
              fill="var(--c2)"
              stroke="var(--c3)"
              strokeWidth="1"
            />
            <circle cx="46" cy="116" r="2.5" fill="#0B0F19" />
            <line x1="43" y1="116" x2="33" y2="114" stroke="#FFFFFF" strokeWidth="1.2" />
          </g>

          {/* Three floating coins */}
          <g className="art-accent-2">
            <circle cx="162" cy="108" r="9" fill="var(--c2)" stroke="var(--c1)" strokeWidth="2" />
            <text
              x="162"
              y="112"
              textAnchor="middle"
              fill="var(--c3)"
              fontSize="10"
              fontWeight="bold"
            >
              $
            </text>
          </g>
          <g className="art-accent-3">
            <circle
              cx="174"
              cy="130"
              r="7.5"
              fill="var(--c1)"
              stroke="var(--c2)"
              strokeWidth="1.5"
            />
            <circle
              cx="174"
              cy="130"
              r="4.5"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1"
              opacity="0.8"
            />
          </g>
          <g className="art-accent-4">
            <circle
              cx="156"
              cy="150"
              r="6"
              fill="var(--c2)"
              stroke="var(--c3)"
              strokeWidth="1.5"
              opacity="0.9"
            />
          </g>

          {/* Floating accent */}
          <path
            d="M 32,44 Q 32,50 37,50 Q 32,50 32,56 Q 32,50 27,50 Q 32,50 32,44 Z"
            fill="var(--c2)"
            className="art-accent-5 art-accent-minor"
          />
        </svg>
      );

    case 2: // INTERFACE
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="art2-banner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--c1)" />
              <stop offset="100%" stopColor="var(--c2)" />
            </linearGradient>
          </defs>

          {/* Drop shadow under browser window */}
          <ellipse cx="106" cy="172" rx="56" ry="8" fill="rgba(0,0,0,0.4)" />

          {/* Hero Browser Window */}
          <g className="art-hero-object">
            <rect
              x="36"
              y="44"
              width="138"
              height="120"
              rx="12"
              fill="#0B0F19"
              stroke="var(--c1)"
              strokeWidth="2"
            />
            <path
              d="M 36,56 Q 36,44 48,44 L 162,44 Q 174,44 174,56 L 174,66 L 36,66 Z"
              fill="var(--c3)"
            />
            <circle cx="48" cy="55" r="3" fill="#EF4444" />
            <circle cx="58" cy="55" r="3" fill="#F59E0B" />
            <circle cx="68" cy="55" r="3" fill="#10B981" />
            <rect
              x="82"
              y="50"
              width="60"
              height="10"
              rx="5"
              fill="#0B0F19"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />

            {/* Gradient hero banner */}
            <rect x="46" y="74" width="118" height="38" rx="8" fill="url(#art2-banner)" />
            <rect x="54" y="82" width="40" height="4" rx="2" fill="#FFFFFF" opacity="0.95" />
            <rect x="54" y="92" width="24" height="12" rx="6" fill="#FFFFFF" />
            <rect
              x="82"
              y="92"
              width="24"
              height="12"
              rx="6"
              fill="rgba(0,0,0,0.35)"
              stroke="#FFFFFF"
              strokeWidth="1"
            />

            {/* Row of 3 mini cards */}
            <rect
              x="46"
              y="120"
              width="35"
              height="34"
              rx="6"
              fill="#1E293B"
              stroke="var(--c1)"
              strokeWidth="1"
            />
            <rect x="52" y="126" width="16" height="3" rx="1.5" fill="var(--c2)" />
            <rect x="52" y="133" width="23" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />

            <rect
              x="88"
              y="120"
              width="35"
              height="34"
              rx="6"
              fill="#1E293B"
              stroke="var(--c2)"
              strokeWidth="1"
            />
            <rect x="94" y="126" width="16" height="3" rx="1.5" fill="var(--c1)" />
            <rect x="94" y="133" width="23" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />

            <rect
              x="129"
              y="120"
              width="35"
              height="34"
              rx="6"
              fill="#1E293B"
              stroke="var(--c1)"
              strokeWidth="1"
            />
            <rect x="135" y="126" width="16" height="3" rx="1.5" fill="var(--c2)" />
            <rect x="135" y="133" width="23" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />

            {/* Cursor arrow overlapping the corner */}
            <g transform="translate(152 144)">
              <polygon
                points="0,0 0,18 5,14 11,24 14,22 8,12 14,12"
                fill="#FFFFFF"
                stroke="#0B0F19"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </g>
          </g>

          {/* Three overlapping circular color swatches floating at the side */}
          <g className="art-accent-1">
            <circle cx="24" cy="110" r="10" fill="var(--c1)" stroke="#FFFFFF" strokeWidth="2" />
          </g>
          <g className="art-accent-2">
            <circle cx="28" cy="126" r="10" fill="var(--c2)" stroke="#FFFFFF" strokeWidth="2" />
          </g>
          <g className="art-accent-3">
            <circle cx="22" cy="142" r="10" fill="var(--c3)" stroke="#FFFFFF" strokeWidth="2" />
          </g>

          {/* Floating sparkles & dots */}
          <path
            d="M 180,44 Q 180,50 185,50 Q 180,50 180,56 Q 180,50 175,50 Q 180,50 180,44 Z"
            fill="var(--c2)"
            className="art-accent-4"
          />
          <circle
            cx="184"
            cy="84"
            r="3"
            fill="var(--c1)"
            className="art-accent-5 art-accent-minor"
          />
        </svg>
      );

    case 3: // LOGIC
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
          {/* Drop shadow */}
          <ellipse cx="102" cy="172" rx="54" ry="8" fill="rgba(0,0,0,0.4)" />

          {/* Hero Interlocking Gears */}
          <g className="art-hero-object">
            {/* Gear 1 in --c1 */}
            <g>
              <rect x="73" y="48" width="14" height="72" rx="4" fill="var(--c1)" />
              <rect
                x="73"
                y="48"
                width="14"
                height="72"
                rx="4"
                fill="var(--c1)"
                transform="rotate(45 80 84)"
              />
              <rect
                x="73"
                y="48"
                width="14"
                height="72"
                rx="4"
                fill="var(--c1)"
                transform="rotate(90 80 84)"
              />
              <rect
                x="73"
                y="48"
                width="14"
                height="72"
                rx="4"
                fill="var(--c1)"
                transform="rotate(135 80 84)"
              />
              <circle cx="80" cy="84" r="28" fill="var(--c1)" />
              <circle cx="80" cy="84" r="14" fill="#0B0F19" stroke="var(--c3)" strokeWidth="3" />
              <circle cx="80" cy="84" r="5" fill="var(--c2)" />
            </g>

            {/* Gear 2 in --c2 */}
            <g>
              <rect x="124" y="42" width="12" height="52" rx="3" fill="var(--c2)" />
              <rect
                x="124"
                y="42"
                width="12"
                height="52"
                rx="3"
                fill="var(--c2)"
                transform="rotate(45 130 68)"
              />
              <rect
                x="124"
                y="42"
                width="12"
                height="52"
                rx="3"
                fill="var(--c2)"
                transform="rotate(90 130 68)"
              />
              <rect
                x="124"
                y="42"
                width="12"
                height="52"
                rx="3"
                fill="var(--c2)"
                transform="rotate(135 130 68)"
              />
              <circle cx="130" cy="68" r="20" fill="var(--c2)" />
              <circle cx="130" cy="68" r="9" fill="#0B0F19" stroke="var(--c3)" strokeWidth="2.5" />
              <circle cx="130" cy="68" r="3.5" fill="var(--c1)" />
            </g>
          </g>

          {/* Flow of three rounded nodes linked by a curved path with arrowhead */}
          <path
            d="M 40,148 C 68,130 92,168 122,148 C 136,138 148,142 160,142"
            fill="none"
            stroke="var(--c1)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <polygon points="158,136 168,142 158,148" fill="var(--c1)" />

          <circle cx="40" cy="148" r="12" fill="var(--c3)" stroke="var(--c1)" strokeWidth="2.5" />
          <circle cx="40" cy="148" r="4.5" fill="var(--c2)" />

          <circle cx="100" cy="155" r="12" fill="var(--c3)" stroke="var(--c2)" strokeWidth="2.5" />
          <circle cx="100" cy="155" r="4.5" fill="var(--c1)" />

          <circle cx="166" cy="142" r="12" fill="var(--c3)" stroke="var(--c1)" strokeWidth="2.5" />
          <circle cx="166" cy="142" r="4.5" fill="#FFFFFF" />

          {/* Lightning bolt in --c2 floating near top/right */}
          <polygon
            points="154,80 142,104 150,104 144,124 164,98 154,98"
            fill="var(--c2)"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            className="art-accent-1"
          />

          {/* Floating accents */}
          <path
            d="M 32,46 Q 32,52 37,52 Q 32,52 32,58 Q 32,52 27,52 Q 32,52 32,46 Z"
            fill="var(--c2)"
            className="art-accent-2"
          />
          <circle cx="178" cy="58" r="3" fill="var(--c1)" className="art-accent-3" />
          <path
            d="M 174,106 L 174,114 M 170,110 L 178,110"
            stroke="var(--c2)"
            strokeWidth="2"
            strokeLinecap="round"
            className="art-accent-4"
          />
          <circle
            cx="30"
            cy="108"
            r="2.5"
            fill="var(--c1)"
            className="art-accent-5 art-accent-minor"
          />
        </svg>
      );

    case 4: // DATA
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="art4-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--c2)" />
              <stop offset="100%" stopColor="var(--c1)" />
            </linearGradient>
          </defs>

          {/* Drop shadow under cylinders */}
          <ellipse cx="88" cy="172" rx="44" ry="8" fill="rgba(0,0,0,0.4)" />

          {/* Hero 3-cylinder database stack */}
          <g className="art-hero-object">
            {/* Cylinder 1 (Bottom) */}
            <path
              d="M 52,126 L 52,146 C 52,154 68,158 88,158 C 108,158 124,154 124,146 L 124,126 Z"
              fill="var(--c3)"
              stroke="var(--c1)"
              strokeWidth="2"
            />
            <ellipse
              cx="88"
              cy="126"
              rx="36"
              ry="11"
              fill="url(#art4-top)"
              stroke="var(--c2)"
              strokeWidth="1.5"
            />
            <path
              d="M 64,130 L 64,148"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Cylinder 2 (Middle) */}
            <path
              d="M 52,98 L 52,118 C 52,126 68,130 88,130 C 108,130 124,126 124,118 L 124,98 Z"
              fill="var(--c3)"
              stroke="var(--c1)"
              strokeWidth="2"
            />
            <ellipse
              cx="88"
              cy="98"
              rx="36"
              ry="11"
              fill="url(#art4-top)"
              stroke="var(--c2)"
              strokeWidth="1.5"
            />
            <path
              d="M 64,102 L 64,120"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Cylinder 3 (Top) */}
            <path
              d="M 52,70 L 52,90 C 52,98 68,102 88,102 C 108,102 124,98 124,90 L 124,70 Z"
              fill="var(--c3)"
              stroke="var(--c1)"
              strokeWidth="2"
            />
            <ellipse
              cx="88"
              cy="70"
              rx="36"
              ry="11"
              fill="url(#art4-top)"
              stroke="var(--c2)"
              strokeWidth="1.5"
            />
            <path
              d="M 64,74 L 64,92"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>

          {/* Small floating table card with rows */}
          <g transform="rotate(6 150 78)" className="art-accent-1">
            <rect
              x="124"
              y="52"
              width="56"
              height="50"
              rx="6"
              fill="#0B0F19"
              stroke="var(--c2)"
              strokeWidth="1.5"
            />
            <rect x="124" y="52" width="56" height="13" rx="6" fill="var(--c1)" />
            <rect x="128" y="57" width="18" height="3" rx="1.5" fill="#FFFFFF" />
            <rect x="154" y="57" width="18" height="3" rx="1.5" fill="#FFFFFF" />
            <rect x="128" y="70" width="20" height="3" rx="1.5" fill="var(--c2)" />
            <rect x="154" y="70" width="16" height="3" rx="1.5" fill="rgba(255,255,255,0.4)" />
            <line
              x1="124"
              y1="78"
              x2="180"
              y2="78"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
            <rect x="128" y="83" width="14" height="3" rx="1.5" fill="rgba(255,255,255,0.4)" />
            <rect x="150" y="83" width="24" height="3" rx="1.5" fill="var(--c2)" />
            <line
              x1="124"
              y1="91"
              x2="180"
              y2="91"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
          </g>

          {/* Mini bar chart */}
          <g className="art-accent-2">
            <rect
              x="130"
              y="118"
              width="50"
              height="42"
              rx="6"
              fill="#0B0F19"
              stroke="var(--c1)"
              strokeWidth="1.5"
            />
            <rect x="136" y="138" width="7" height="16" rx="2" fill="var(--c1)" />
            <rect x="147" y="128" width="7" height="26" rx="2" fill="var(--c2)" />
            <rect x="158" y="124" width="7" height="30" rx="2" fill="var(--c1)" />
            <rect x="168" y="132" width="7" height="22" rx="2" fill="var(--c2)" />
          </g>

          {/* Floating accents */}
          <path
            d="M 32,48 Q 32,54 37,54 Q 32,54 32,60 Q 32,54 27,54 Q 32,54 32,48 Z"
            fill="var(--c2)"
            className="art-accent-3"
          />
          <circle cx="28" cy="116" r="3" fill="var(--c1)" className="art-accent-4" />
          <path
            d="M 176,40 L 176,48 M 172,44 L 180,44"
            stroke="var(--c1)"
            strokeWidth="2"
            strokeLinecap="round"
            className="art-accent-5 art-accent-minor"
          />
        </svg>
      );

    case 5: // API
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
          {/* Drop shadow */}
          <ellipse cx="100" cy="172" rx="54" ry="8" fill="rgba(0,0,0,0.4)" />

          {/* Hero Plug & Socket with Glowing Link */}
          <g className="art-hero-object">
            {/* Plug (Left) */}
            <path d="M 22,116 L 50,116" stroke="var(--c3)" strokeWidth="5" strokeLinecap="round" />
            <rect
              x="50"
              y="96"
              width="30"
              height="40"
              rx="7"
              fill="var(--c1)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <rect x="80" y="103" width="14" height="7" rx="2" fill="#FFFFFF" />
            <rect x="80" y="122" width="14" height="7" rx="2" fill="#FFFFFF" />

            {/* Socket (Right) */}
            <rect
              x="120"
              y="96"
              width="30"
              height="40"
              rx="7"
              fill="var(--c2)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <rect x="117" y="103" width="5" height="7" rx="1.5" fill="#0B0F19" />
            <rect x="117" y="122" width="5" height="7" rx="1.5" fill="#0B0F19" />
            <path
              d="M 150,116 L 178,116"
              stroke="var(--c3)"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Glowing link between them */}
            <g>
              <rect x="94" y="100" width="24" height="32" rx="4" fill="var(--c2)" opacity="0.3" />
              <path
                d="M 94,106 Q 106,101 118,106"
                stroke="#FFFFFF"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 94,126 Q 106,131 118,126"
                stroke="var(--c1)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="106" cy="116" r="4.5" fill="#FFFFFF" />
            </g>
          </g>

          {/* Floating curly-brace '{ }' card */}
          <g transform="rotate(-8 54 62)" className="art-accent-1">
            <rect
              x="34"
              y="44"
              width="46"
              height="40"
              rx="7"
              fill="#0B0F19"
              stroke="var(--c1)"
              strokeWidth="2"
            />
            <text
              x="57"
              y="70"
              textAnchor="middle"
              fill="var(--c2)"
              fontSize="20"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {"{ }"}
            </text>
          </g>

          {/* Small cloud */}
          <g className="art-accent-2">
            <path
              d="M 132,68 C 124,68 120,62 122,55 C 123,48 130,45 136,47 C 140,40 150,40 154,46 C 160,45 166,50 164,57 C 169,58 171,64 167,68 Z"
              fill="var(--c3)"
              stroke="var(--c2)"
              strokeWidth="2"
            />
          </g>

          {/* Two arrow chips */}
          <g className="art-accent-3">
            <rect x="64" y="148" width="28" height="15" rx="5" fill="var(--c1)" />
            <path
              d="M 72,155 L 82,155 M 79,152 L 82,155 L 79,158"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g className="art-accent-4">
            <rect x="106" y="148" width="28" height="15" rx="5" fill="var(--c2)" />
            <path
              d="M 126,155 L 116,155 M 119,152 L 116,155 L 119,158"
              stroke="#0B0F19"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Accents */}
          <path
            d="M 180,94 Q 180,100 185,100 Q 180,100 180,106 Q 180,100 175,100 Q 180,100 180,94 Z"
            fill="var(--c1)"
            className="art-accent-5 art-accent-minor"
          />
        </svg>
      );

    case 6: // SYSTEMS
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
          {/* Drop shadow */}
          <ellipse cx="94" cy="172" rx="46" ry="8" fill="rgba(0,0,0,0.4)" />

          {/* Hero Microprocessor Chip */}
          <g className="art-hero-object">
            {/* Pins on all four sides */}
            <rect x="73" y="72" width="4" height="12" rx="1" fill="var(--c2)" />
            <rect x="83" y="72" width="4" height="12" rx="1" fill="var(--c2)" />
            <rect x="93" y="72" width="4" height="12" rx="1" fill="var(--c2)" />
            <rect x="103" y="72" width="4" height="12" rx="1" fill="var(--c2)" />

            <rect x="73" y="136" width="4" height="12" rx="1" fill="var(--c2)" />
            <rect x="83" y="136" width="4" height="12" rx="1" fill="var(--c2)" />
            <rect x="93" y="136" width="4" height="12" rx="1" fill="var(--c2)" />
            <rect x="103" y="136" width="4" height="12" rx="1" fill="var(--c2)" />

            <rect x="54" y="91" width="12" height="4" rx="1" fill="var(--c2)" />
            <rect x="54" y="101" width="12" height="4" rx="1" fill="var(--c2)" />
            <rect x="54" y="111" width="12" height="4" rx="1" fill="var(--c2)" />
            <rect x="54" y="121" width="12" height="4" rx="1" fill="var(--c2)" />

            <rect x="114" y="91" width="12" height="4" rx="1" fill="var(--c2)" />
            <rect x="114" y="101" width="12" height="4" rx="1" fill="var(--c2)" />
            <rect x="114" y="111" width="12" height="4" rx="1" fill="var(--c2)" />
            <rect x="114" y="121" width="12" height="4" rx="1" fill="var(--c2)" />

            {/* Chip Body */}
            <rect
              x="64"
              y="82"
              width="52"
              height="52"
              rx="8"
              fill="#0B0F19"
              stroke="var(--c1)"
              strokeWidth="2.5"
            />
            {/* Glowing Square Core in --c2 */}
            <rect
              x="76"
              y="94"
              width="28"
              height="28"
              rx="4"
              fill="var(--c2)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <rect x="83" y="101" width="14" height="14" rx="2" fill="var(--c1)" />
            <circle cx="90" cy="108" r="3" fill="#FFFFFF" />
          </g>

          {/* Circuit traces running out of chip */}
          <path
            d="M 54,93 L 36,93 L 36,70 L 24,70"
            fill="none"
            stroke="var(--c1)"
            strokeWidth="2"
          />
          <circle cx="22" cy="70" r="3" fill="var(--c2)" />

          <path
            d="M 54,123 L 34,123 L 34,145 L 22,145"
            fill="none"
            stroke="var(--c1)"
            strokeWidth="2"
          />
          <circle cx="20" cy="145" r="3" fill="var(--c2)" />

          <path d="M 95,72 L 95,50 L 78,50" fill="none" stroke="var(--c1)" strokeWidth="2" />
          <circle cx="76" cy="50" r="3" fill="var(--c2)" />

          <path d="M 85,148 L 85,164 L 102,164" fill="none" stroke="var(--c1)" strokeWidth="2" />
          <circle cx="104" cy="164" r="3" fill="var(--c2)" />

          {/* Small terminal window with >_ prompt */}
          <g className="art-accent-1">
            <rect
              x="124"
              y="44"
              width="60"
              height="46"
              rx="6"
              fill="#030712"
              stroke="var(--c1)"
              strokeWidth="2"
            />
            <path
              d="M 124,53 L 124,50 Q 124,44 130,44 L 178,44 Q 184,44 184,50 L 184,53 Z"
              fill="var(--c3)"
            />
            <circle cx="131" cy="48.5" r="1.5" fill="#EF4444" />
            <circle cx="136" cy="48.5" r="1.5" fill="#F59E0B" />
            <circle cx="141" cy="48.5" r="1.5" fill="#10B981" />
            <text
              x="132"
              y="73"
              fill="var(--c2)"
              fontSize="14"
              fontWeight="bold"
              fontFamily="monospace"
            >
              &gt;_
            </text>
            <rect x="154" y="62" width="6" height="12" fill="var(--c1)" />
          </g>

          {/* Accents */}
          <path
            d="M 174,116 Q 174,122 179,122 Q 174,122 174,128 Q 174,122 169,122 Q 174,122 174,116 Z"
            fill="var(--c2)"
            className="art-accent-2"
          />
          <path
            d="M 168,148 L 168,156 M 164,152 L 172,152"
            stroke="var(--c1)"
            strokeWidth="2"
            strokeLinecap="round"
            className="art-accent-3"
          />
          <circle cx="140" cy="116" r="3" fill="var(--c2)" className="art-accent-4" />
          <circle
            cx="34"
            cy="42"
            r="2.5"
            fill="var(--c1)"
            className="art-accent-5 art-accent-minor"
          />
        </svg>
      );

    default:
      return null;
  }
}

export function About() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeLayer, setActiveLayer] = useState<LayerKey | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [count0, setCount0] = useState<string>("0");
  const [count1, setCount1] = useState<string>("0.0");
  const [count2, setCount2] = useState<string>("0");

  // Gallery state refs (single rAF loop)
  const posRef = useRef<number>(0);
  const isStageInViewRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const isInertiaRef = useRef<boolean>(false);
  const isTabHiddenRef = useRef<boolean>(false);
  const isHoveredRef = useRef<boolean>(false);
  const isFocusedRef = useRef<boolean>(false);
  const isInteractingRef = useRef<boolean>(false);

  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stepped Autoplay State: 900ms dwell, 650ms glide
  const autoplayPhaseRef = useRef<"dwell" | "glide">("dwell");
  const dwellStartTimeRef = useRef<number>(0);
  const glideStateRef = useRef<{
    startPos: number;
    endPos: number;
    startTime: number;
  } | null>(null);

  const dragStartXRef = useRef<number>(0);
  const dragStartPosRef = useRef<number>(0);
  const lastDragXRef = useRef<number>(0);
  const lastDragTimeRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);

  const animatingTargetRef = useRef<{
    startPos: number;
    endPos: number;
    startTime: number;
    duration: number;
    isCustomEase?: boolean;
  } | null>(null);

  const introStartedRef = useRef<boolean>(false);
  const introStartTimeRef = useRef<number>(0);
  const introDoneRef = useRef<boolean>(Boolean(reduce));

  // Compute horizontal spacing S in px: balanced for slightly reduced card size
  const getSPx = useCallback(() => {
    if (typeof window === "undefined") return 170;
    const w = window.innerWidth;
    if (w < 600) return (w * 32) / 100;
    if (w < 1100) return (w * 22) / 100;
    return (w * 14.5) / 100;
  }, []);

  const getMaxCutoff = useCallback(() => {
    if (typeof window === "undefined") return 3.4;
    const w = window.innerWidth;
    if (w < 600) return 1.7;
    if (w < 1100) return 2.4;
    return 3.4;
  }, []);

  // Update visual transforms for all 7 cards based on posRef
  const updateCards = useCallback(() => {
    const pos = posRef.current;
    const n = 7;
    const sPx = getSPx();
    const maxCutoff = getMaxCutoff();
    const now = performance.now();

    // Intro fan-out: 800ms (was 1100ms)
    const isIntro = !introDoneRef.current && introStartedRef.current;
    const introElapsed = isIntro ? now - introStartTimeRef.current : 0;
    if (isIntro && introElapsed >= 800) {
      introDoneRef.current = true;
      dwellStartTimeRef.current = now;
      autoplayPhaseRef.current = "dwell";
    }

    const currentCenterIdx = ((Math.round(pos) % n) + n) % n;
    setActiveCardIndex(currentCenterIdx);

    const layer = CARDS[currentCenterIdx]?.layerKey ?? null;
    setActiveLayer((prev) => (prev !== layer ? layer : prev));

    for (let i = 0; i < n; i++) {
      const card = cardRefs.current[i];
      if (!card) continue;

      // Wrap signed offset
      const o = ((((i - pos) % n) + n + n / 2) % n) - n / 2;
      const a = Math.abs(o);

      let k = 1;
      let cardOpacity = Math.max(0.12, Math.min(1, 1 - a * 0.22));

      if (isIntro) {
        // Staggered by 35ms (was 50ms) from center outward
        const delay = a * 35;
        const elapsedForCard = Math.max(0, introElapsed - delay);
        const t = Math.min(1, elapsedForCard / Math.max(80, 800 - delay));
        k = easeOutCubic(t);
        cardOpacity = cardOpacity * k;
      }

      const tx = o * sPx * k;
      const tz = a * 46;
      const ry = Math.max(-62, Math.min(62, o * -34)) * k;
      const baseScale = 1 - Math.min(a, 3) * 0.04;
      const scale = isIntro ? 0.85 + (baseScale - 0.85) * k : baseScale;

      // Color fade: widened smoothstep range clamp(1 - a * 1.3, 0, 1)
      const rawF = Math.max(0, Math.min(1, 1 - a * 1.3));
      const f = rawF * rawF * (3 - 2 * rawF);
      const zIndex = Math.round(100 - a * 10);
      const isVisible = isIntro || a <= maxCutoff;

      card.style.transform = `translate3d(${tx.toFixed(1)}px, 0, ${tz.toFixed(1)}px) rotateY(${ry.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      card.style.opacity = isVisible ? cardOpacity.toFixed(3) : "0";
      card.style.visibility = isVisible ? "visible" : "hidden";
      card.style.pointerEvents = a <= 1.5 ? "auto" : isVisible ? "auto" : "none";
      card.style.zIndex = `${zIndex}`;
      card.style.setProperty("--f", f.toFixed(3));
      card.classList.toggle("is-centered", f >= 0.88);

      // Subtle depth parallax: artwork shifts by (o * -6px)
      const artPx = (o * -6).toFixed(2);
      card.style.setProperty("--art-px", `${artPx}px`);
    }
  }, [getSPx, getMaxCutoff]);

  const resetAutoplayDwell = useCallback((now = performance.now()) => {
    autoplayPhaseRef.current = "dwell";
    glideStateRef.current = null;
    dwellStartTimeRef.current = now;
  }, []);

  const pauseAutoplay = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    isInteractingRef.current = true;
    glideStateRef.current = null;
    autoplayPhaseRef.current = "dwell";
  }, []);

  // Resume after interaction: 1500ms (was 2500ms)
  const resumeAutoplayAfterDelay = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      resumeTimerRef.current = null;
      isInteractingRef.current = false;
      const current = posRef.current;
      const rounded = Math.round(current);
      if (Math.abs(current - rounded) > 0.005) {
        animatingTargetRef.current = {
          startPos: current,
          endPos: rounded,
          startTime: performance.now(),
          duration: 380,
          isCustomEase: false,
        };
      } else {
        posRef.current = rounded;
        updateCards();
      }
      resetAutoplayDwell(performance.now());
    }, 1500);
  }, [resetAutoplayDwell, updateCards]);

  // Snap ease: 380ms (was 500ms)
  const snapToNearest = useCallback(
    (duration = 380) => {
      const current = posRef.current;
      const target = Math.round(current);
      if (reduce) {
        posRef.current = target;
        updateCards();
        return;
      }
      animatingTargetRef.current = {
        startPos: current,
        endPos: target,
        startTime: performance.now(),
        duration,
        isCustomEase: false,
      };
    },
    [reduce, updateCards],
  );

  // Manual click-to-center and word-hover: 450ms (was 600ms)
  const animateToCard = useCallback(
    (targetIndex: number) => {
      pauseAutoplay();
      if (reduce) {
        posRef.current = targetIndex;
        updateCards();
        return;
      }
      const currentPos = posRef.current;
      const n = 7;
      const diff = ((((targetIndex - currentPos) % n) + n + n / 2) % n) - n / 2;
      animatingTargetRef.current = {
        startPos: currentPos,
        endPos: currentPos + diff,
        startTime: performance.now(),
        duration: 450,
        isCustomEase: true,
      };
      resumeAutoplayAfterDelay();
    },
    [reduce, pauseAutoplay, resumeAutoplayAfterDelay, updateCards],
  );

  const handlePrev = useCallback(() => {
    pauseAutoplay();
    if (reduce) {
      posRef.current = Math.round(posRef.current) - 1;
      updateCards();
      return;
    }
    const current = posRef.current;
    animatingTargetRef.current = {
      startPos: current,
      endPos: Math.round(current) - 1,
      startTime: performance.now(),
      duration: 380,
      isCustomEase: false,
    };
    resumeAutoplayAfterDelay();
  }, [reduce, pauseAutoplay, resumeAutoplayAfterDelay, updateCards]);

  const handleNext = useCallback(() => {
    pauseAutoplay();
    if (reduce) {
      posRef.current = Math.round(posRef.current) + 1;
      updateCards();
      return;
    }
    const current = posRef.current;
    animatingTargetRef.current = {
      startPos: current,
      endPos: Math.round(current) + 1,
      startTime: performance.now(),
      duration: 380,
      isCustomEase: false,
    };
    resumeAutoplayAfterDelay();
  }, [reduce, pauseAutoplay, resumeAutoplayAfterDelay, updateCards]);

  // Tab visibility listener
  useEffect(() => {
    const onVisibilityChange = () => {
      isTabHiddenRef.current = document.hidden;
      if (!document.hidden) {
        resetAutoplayDwell(performance.now());
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [resetAutoplayDwell]);

  // IntersectionObserver for Stage
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isStageInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!introStartedRef.current && !reduce) {
            introStartedRef.current = true;
            introStartTimeRef.current = performance.now();
          }
          resetAutoplayDwell(performance.now());
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, [reduce, resetAutoplayDwell]);

  // Single rAF Loop: Handles Stepped Autoplay (900ms dwell, 650ms glide), Tweening, and Inertia
  useEffect(() => {
    let rafId: number | null = null;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(100, Math.max(1, now - lastTime));
      lastTime = now;

      const isAnimatingTarget = Boolean(animatingTargetRef.current);
      const isIntro = !introDoneRef.current && introStartedRef.current;
      const shouldRun =
        isStageInViewRef.current ||
        isAnimatingTarget ||
        isInertiaRef.current ||
        isDraggingRef.current;

      if (shouldRun) {
        if (animatingTargetRef.current) {
          const { startPos, endPos, startTime, duration, isCustomEase } =
            animatingTargetRef.current;
          const elapsed = now - startTime;
          const rawT = Math.min(1, Math.max(0, elapsed / duration));
          const t = isCustomEase ? easeCustom(rawT) : easeOutCubic(rawT);
          posRef.current = startPos + (endPos - startPos) * t;

          if (rawT >= 1) {
            posRef.current = endPos;
            animatingTargetRef.current = null;
          }
          updateCards();
        } else if (isInertiaRef.current) {
          posRef.current += velocityRef.current * dt;
          // Drag inertia decay: 0.95 (was 0.92)
          velocityRef.current *= 0.95;
          if (Math.abs(velocityRef.current) < 0.00015) {
            isInertiaRef.current = false;
            snapToNearest(380);
          }
          updateCards();
        } else if (isDraggingRef.current) {
          // Handled in pointermove
        } else if (
          !reduce &&
          introDoneRef.current &&
          isStageInViewRef.current &&
          !isTabHiddenRef.current &&
          !isHoveredRef.current &&
          !isFocusedRef.current &&
          !isInteractingRef.current &&
          resumeTimerRef.current === null
        ) {
          // Stepped Autoplay: 900ms dwell, 650ms glide
          if (autoplayPhaseRef.current === "dwell") {
            if (now - dwellStartTimeRef.current >= 900) {
              const k = Math.round(posRef.current);
              posRef.current = k;
              autoplayPhaseRef.current = "glide";
              glideStateRef.current = {
                startPos: k,
                endPos: k + 1,
                startTime: now,
              };
              updateCards();
            }
          } else if (autoplayPhaseRef.current === "glide" && glideStateRef.current) {
            const { startPos, endPos, startTime } = glideStateRef.current;
            const elapsed = now - startTime;
            const rawT = Math.min(1, Math.max(0, elapsed / 650));
            const t = easeCustom(rawT);
            posRef.current = startPos + (endPos - startPos) * t;
            updateCards();

            if (rawT >= 1) {
              posRef.current = endPos;
              glideStateRef.current = null;
              autoplayPhaseRef.current = "dwell";
              dwellStartTimeRef.current = now;
              updateCards();
            }
          }
        } else if (isIntro) {
          updateCards();
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    updateCards();
    rafId = requestAnimationFrame(loop);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [updateCards, snapToNearest, reduce]);

  // Pointer drag events on stage
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    pauseAutoplay();
    animatingTargetRef.current = null;
    isInertiaRef.current = false;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = performance.now();
    velocityRef.current = 0;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastDragTimeRef.current);
    const dx = e.clientX - lastDragXRef.current;
    const sPx = getSPx();

    const totalDx = e.clientX - dragStartXRef.current;
    posRef.current = dragStartPosRef.current - totalDx / sPx;

    velocityRef.current = -(dx / sPx) / dt;
    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = now;

    updateCards();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }

    if (Math.abs(velocityRef.current) > 0.0004) {
      isInertiaRef.current = true;
    } else {
      snapToNearest(380);
    }
    resumeAutoplayAfterDelay();
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      pauseAutoplay();
      animatingTargetRef.current = null;
      isInertiaRef.current = false;

      const sPx = getSPx();
      posRef.current += (e.deltaX / sPx) * 0.35;
      updateCards();

      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = setTimeout(() => {
        snapToNearest(380);
        resumeAutoplayAfterDelay();
      }, 120);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "Home") {
      e.preventDefault();
      animateToCard(0);
    }
  };

  const handleStageMouseEnter = () => {
    isHoveredRef.current = true;
    glideStateRef.current = null;
    autoplayPhaseRef.current = "dwell";
  };

  const handleStageMouseLeave = () => {
    isHoveredRef.current = false;
    if (!isInteractingRef.current && resumeTimerRef.current === null) {
      const current = posRef.current;
      const rounded = Math.round(current);
      if (Math.abs(current - rounded) > 0.005) {
        snapToNearest(380);
      } else {
        posRef.current = rounded;
        updateCards();
      }
      resetAutoplayDwell(performance.now());
    } else {
      resumeAutoplayAfterDelay();
    }
  };

  const handleStageFocus = () => {
    isFocusedRef.current = true;
    glideStateRef.current = null;
    autoplayPhaseRef.current = "dwell";
  };

  const handleStageBlur = () => {
    isFocusedRef.current = false;
    if (!isInteractingRef.current && resumeTimerRef.current === null) {
      const current = posRef.current;
      const rounded = Math.round(current);
      if (Math.abs(current - rounded) > 0.005) {
        snapToNearest(380);
      } else {
        posRef.current = rounded;
        updateCards();
      }
      resetAutoplayDwell(performance.now());
    } else {
      resumeAutoplayAfterDelay();
    }
  };

  // Scroll-linked progress --p for headline
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reduce) {
      section.style.setProperty("--p", "1");
      section.setAttribute("data-layers-revealed", "true");
      return;
    }

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (vh * 0.6)));
        section.style.setProperty("--p", p.toFixed(4));

        const layersActive = (p - (4 / 12) * 0.7) / 0.3 >= 1;
        if (layersActive) {
          section.setAttribute("data-layers-revealed", "true");
        } else {
          section.removeAttribute("data-layers-revealed");
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce]);

  // Stats counter with IntersectionObserver
  useEffect(() => {
    if (reduce) {
      setCount0("20+");
      setCount1("5.0");
      setCount2("1");
      setStatsVisible(true);
      return;
    }

    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();

          const duration = 1200;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const t = Math.min(1, Math.max(0, elapsed / duration));
            const easeOut = 1 - Math.pow(1 - t, 3);

            const val0 = Math.round(20 * easeOut);
            const val1 = (5.0 * easeOut).toFixed(1);
            const val2 = Math.round(1 * easeOut);

            if (t >= 1) {
              setCount0("20+");
              setCount1("5.0");
              setCount2("1");
            } else {
              setCount0(String(val0));
              setCount1(val1);
              setCount2(String(val2));
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  const headlineWords = about.heading.split(" ");

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        paddingTop: "120px",
        isolation: "isolate",
      }}
    >
      {/* Scoped About Section Styles */}
      <style>{`
        #about {
          --p: 0;
          --headline-color: #151515;
          --divider-color: rgba(0, 0, 0, 0.25);
          --layer-btn-border: rgba(0, 0, 0, 0.40);
          --nav-btn-bg: rgba(0, 0, 0, 0.05);
          --nav-btn-border: rgba(0, 0, 0, 0.15);
          position: relative;
          width: 100%;
          overflow: hidden;
          isolation: isolate;
        }

        :root.dark #about,
        html.dark #about,
        .dark #about {
          --headline-color: #FFFFFF;
          --divider-color: rgba(255, 255, 255, 0.25);
          --layer-btn-border: rgba(255, 255, 255, 0.40);
          --nav-btn-bg: rgba(255, 255, 255, 0.08);
          --nav-btn-border: rgba(255, 255, 255, 0.25);
        }

        .headline-word {
          display: inline-block;
          opacity: clamp(0.22, calc((var(--p, 0) - (var(--i) / var(--n)) * 0.7) / 0.3), 1);
          color: var(--headline-color);
          transition: opacity 100ms linear;
        }

        .word-layers {
          position: relative;
          display: inline-block;
        }

        .word-layers::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 2px;
          width: 100%;
          display: none !important;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        #about[data-layers-revealed="true"] .word-layers::after {
          transform: scaleX(1);
        }

        /* Stat lines & divider */
        .about-divider-line,
        .stat-line {
          height: 1px;
          width: 100%;
          background: var(--divider-color);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 150ms;
        }

        .about-divider-line.drawn,
        .stat-line.drawn {
          transform: scaleX(1);
        }

        .layer-btn {
          border-bottom: 1px dotted var(--layer-btn-border);
        }

        .layer-btn.is-active,
        .layer-btn:hover,
        .layer-btn:focus-visible {
          border-bottom: 1px solid currentColor !important;
          color: var(--headline-color) !important;
          opacity: 1 !important;
        }

        /* Gallery stage: clamp(390px, 38vw, 530px) */
        .gallery-stage {
          height: clamp(300px, 28vw, 410px);
          max-height: 75vh;
          position: relative;
          overflow: hidden;
          perspective: 1500px;
          perspective-origin: 50% 50%;
          touch-action: pan-y;
          user-select: none;
          -webkit-user-select: none;
        }

        /* Center gallery glow element */
        .center-gallery-glow {
          opacity: 0.22;
        }
        :root:not(.dark) #about .center-gallery-glow,
        html:not(.dark) #about .center-gallery-glow,
        body:not(.dark) #about .center-gallery-glow {
          opacity: 0.16;
        }

        /* Gallery Card Styles: 26px corner radius, reduced size, 3/4.4 aspect ratio */
        .gallery-card {
          --card-w: clamp(130px, 12.5vw, 190px);
          position: absolute;
          left: 50%;
          top: 50%;
          width: var(--card-w);
          aspect-ratio: 3 / 4.4;
          border-radius: 20px;
          transform-origin: 50% 50%;
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
          margin-left: calc(-0.5 * var(--card-w));
          margin-top: calc(-0.5 * var(--card-w) * (4.4 / 3));
          outline: none;
          overflow: visible;

          /* Visible side card surface: linear-gradient(165deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02)), 1px border */
          background: linear-gradient(165deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.02));
          background: linear-gradient(165deg,
            color-mix(in srgb, var(--c1) calc(var(--f, 0) * 22%), rgba(255, 255, 255, 0.09)),
            color-mix(in srgb, var(--c3) calc(var(--f, 0) * 40%), rgba(255, 255, 255, 0.02))
          );
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-color: color-mix(in srgb, var(--c2) calc(var(--f, 0) * 70%), rgba(255, 255, 255, 0.14));

          /* Inner top highlight inset 0 1px 0 rgba(255,255,255,0.28), soft shadow, and outer glow on center card */
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.28),
            0 24px 50px rgba(0, 0, 0, 0.5),
            0 0 calc(var(--f, 0) * 60px) calc(var(--f, 0) * -8px) var(--c1),
            0 40px 80px rgba(0, 0, 0, calc(0.3 + var(--f, 0) * 0.2));
        }

        /* Diagonal sheen layer */
        .gallery-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.10) 48%, transparent 60%);
          opacity: calc(0.35 + var(--f, 0) * 0.65);
          pointer-events: none;
          z-index: 5;
        }

        /* Center card gradient ring: 1.5px ring from --c2 through --c1 to --c3 with mask */
        .gallery-card-ring {
          position: absolute;
          inset: -1px;
          border-radius: 21px;
          padding: 1.5px;
          background: linear-gradient(135deg, var(--c2), var(--c1), var(--c3));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: var(--f, 0);
          z-index: 6;
        }

        /* Subtle spotlight inside card */
        .gallery-card-spotlight {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: radial-gradient(circle at 50% 38%, color-mix(in srgb, var(--c1) calc(var(--f, 0) * 28%), transparent) 0%, transparent 70%);
          z-index: 1;
        }

        /* Soft elliptical ground shadow under every scene */
        .card-ground-shadow {
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 72%;
          height: 14px;
          border-radius: 50%;
          filter: blur(8px);
          pointer-events: none;
          background: color-mix(in srgb, var(--c3) calc(var(--f, 0) * 100%), #000000);
          opacity: calc(0.30 + var(--f, 0) * 0.05);
          z-index: 2;
        }

        /* Light theme surface equivalents */
        :root:not(.dark) #about .gallery-card,
        html:not(.dark) #about .gallery-card,
        body:not(.dark) #about .gallery-card {
          background: linear-gradient(165deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.015));
          background: linear-gradient(165deg,
            color-mix(in srgb, var(--c1) calc(var(--f, 0) * 16%), rgba(0, 0, 0, 0.06)),
            color-mix(in srgb, var(--c3) calc(var(--f, 0) * 25%), rgba(0, 0, 0, 0.015))
          );
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-color: color-mix(in srgb, var(--c2) calc(var(--f, 0) * 60%), rgba(0, 0, 0, 0.12));
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            0 20px 40px rgba(0, 0, 0, 0.08),
            0 0 calc(var(--f, 0) * 45px) calc(var(--f, 0) * -6px) var(--c1);
        }

        :root:not(.dark) #about .gallery-card::before,
        html:not(.dark) #about .gallery-card::before,
        body:not(.dark) #about .gallery-card::before {
          background: linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.35) 48%, transparent 60%);
        }

        /* Fallback overlay when color-mix is not supported */
        @supports (color: color-mix(in srgb, red, blue)) {
          .gallery-card-fallback-overlay {
            display: none !important;
          }
        }

        /* Gray artwork layer: static filter */
        .gallery-art-gray {
          filter: grayscale(1) brightness(0.62) contrast(1.05);
        }
        :root:not(.dark) #about .gallery-art-gray,
        html:not(.dark) #about .gallery-art-gray,
        body:not(.dark) #about .gallery-art-gray {
          filter: grayscale(1) brightness(0.95) contrast(1.05);
        }

        /* Center card float and scale: scales 1.08 with translateY 0 to -8px over 3.2s */
        @keyframes center-art-float {
          0% { transform: translateY(0px) scale(1.08); }
          100% { transform: translateY(-8px) scale(1.08); }
        }

        .gallery-card.is-centered .gallery-art-float {
          animation: center-art-float 3.2s ease-in-out infinite alternate;
        }

        /* Floating accents animations on center card */
        @keyframes accent-drift-1 {
          0%, 100% { transform: translateY(0px); opacity: 0.85; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes accent-drift-2 {
          0%, 100% { transform: translateY(0px); opacity: 0.75; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes accent-drift-3 {
          0%, 100% { transform: translateY(0px); opacity: 0.9; }
          50% { transform: translateY(-4px); opacity: 0.7; }
        }
        @keyframes accent-drift-4 {
          0%, 100% { transform: translateY(0px); opacity: 0.8; }
          50% { transform: translateY(-5.5px); opacity: 1; }
        }
        @keyframes accent-drift-5 {
          0%, 100% { transform: translateY(0px); opacity: 0.7; }
          50% { transform: translateY(-4.5px); opacity: 0.95; }
        }

        .gallery-card.is-centered .gallery-art-color .art-accent-1 {
          animation: accent-drift-1 3.2s ease-in-out infinite;
        }
        .gallery-card.is-centered .gallery-art-color .art-accent-2 {
          animation: accent-drift-2 4.1s ease-in-out infinite;
        }
        .gallery-card.is-centered .gallery-art-color .art-accent-3 {
          animation: accent-drift-3 4.8s ease-in-out infinite;
        }
        .gallery-card.is-centered .gallery-art-color .art-accent-4 {
          animation: accent-drift-4 3.6s ease-in-out infinite;
        }
        .gallery-card.is-centered .gallery-art-color .art-accent-5 {
          animation: accent-drift-5 4.4s ease-in-out infinite;
        }

        /* Index underline dynamically stretches with --f */
        .gallery-index-underline {
          background: rgba(255, 255, 255, 0.25);
          background: color-mix(in srgb, var(--c2) calc(var(--f, 0) * 80%), rgba(255, 255, 255, 0.25));
          transition: width 100ms linear;
        }
        :root:not(.dark) #about .gallery-index-underline,
        html:not(.dark) #about .gallery-index-underline,
        body:not(.dark) #about .gallery-index-underline {
          background: rgba(0, 0, 0, 0.25);
          background: color-mix(in srgb, var(--c2) calc(var(--f, 0) * 70%), rgba(0, 0, 0, 0.25));
        }

        /* Caption pill */
        .gallery-card-caption-pill {
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          background: color-mix(in srgb, var(--c1) calc(var(--f, 0) * 25%), rgba(255, 255, 255, 0.06));
          opacity: calc(0.80 + var(--f, 0) * 0.20);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        :root:not(.dark) #about .gallery-card-caption-pill,
        html:not(.dark) #about .gallery-card-caption-pill,
        body:not(.dark) #about .gallery-card-caption-pill {
          background: rgba(0, 0, 0, 0.04);
          background: color-mix(in srgb, var(--c1) calc(var(--f, 0) * 18%), rgba(0, 0, 0, 0.04));
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: none;
        }

        .gallery-nav-btn {
          background: var(--nav-btn-bg);
          border: 1px solid var(--nav-btn-border);
        }

        /* Silk streak glide */
        @keyframes silk-streak-glide {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -960; }
        }
        .silk-streak-highlight {
          animation: silk-streak-glide 20s linear infinite;
        }

        /* Responsive layout */
        @media (max-width: 1099px) {
          .about-layout-grid {
            display: flex;
            flex-direction: column;
          }
          .about-left-col,
          .about-right-col {
            display: contents;
          }
          .about-label-wrap {
            order: 1;
            margin-bottom: 1.5rem;
          }
          .about-headline-wrap {
            order: 2;
            margin-bottom: 2rem;
          }
          .about-paragraphs-wrap {
            order: 3;
            margin-bottom: 2.5rem;
          }
          .about-divider-wrap {
            order: 4;
            margin-bottom: 2rem;
          }
          .about-stats-wrap {
            order: 5;
          }
          .gallery-card {
            --card-w: clamp(120px, 26vw, 170px);
          }
        }

        @media (max-width: 599px) {
          .gallery-card {
            --card-w: clamp(110px, 38vw, 145px);
          }
          .gallery-nav-btn {
            display: none !important;
          }
          .art-accent-minor {
            display: none !important;
          }
        }

        @media (min-width: 1100px) {
          .about-layout-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 4rem;
            align-items: start;
          }
          .about-left-col {
            display: flex;
            flex-direction: column;
          }
          .about-right-col {
            display: flex;
            flex-direction: column;
          }
          .about-label-wrap {
            margin-bottom: 1.5rem;
          }
          .about-headline-wrap {
            margin-bottom: 3rem;
          }
          .about-divider-wrap {
            margin-bottom: 2.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .headline-word {
            opacity: 1 !important;
          }
          .word-layers::after {
            transform: scaleX(1) !important;
            transition: none !important;
          }
          .silk-streak-highlight {
            animation: none !important;
          }
          .about-divider-line,
          .stat-line {
            transform: scaleX(1) !important;
            transition: none !important;
          }
          .gallery-card.is-centered .gallery-art-float {
            animation: none !important;
            transform: scale(1.08) !important;
          }
          .gallery-card.is-centered .gallery-art-color .art-accent-1,
          .gallery-card.is-centered .gallery-art-color .art-accent-2,
          .gallery-card.is-centered .gallery-art-color .art-accent-3,
          .gallery-card.is-centered .gallery-art-color .art-accent-4,
          .gallery-card.is-centered .gallery-art-color .art-accent-5 {
            animation: none !important;
          }
        }
      `}</style>

      {/* Row 1: Content Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-12">
        <div className="about-layout-grid">
          {/* LEFT COLUMN: Label, Headline, Divider, Stats */}
          <div className="about-left-col">
            <div className="about-label-wrap">
              <SectionLabel>About</SectionLabel>
            </div>

            {/* 1) Scroll-Linked Headline Reveal */}
            <div className="about-headline-wrap">
              <h2 className="display text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl leading-[1.2]">
                {headlineWords.map((word, i) => {
                  const isLayers = false;
                  return (
                    <span
                      key={i}
                      className="headline-word mr-[0.28em]"
                      style={
                        {
                          "--i": i,
                          "--n": headlineWords.length,
                        } as React.CSSProperties
                      }
                    >
                      {isLayers ? <>layers,</> : word}
                    </span>
                  );
                })}
              </h2>
            </div>

            {/* Divider Above Stats */}
            <div className="about-divider-wrap w-full">
              <div className={`about-divider-line ${statsVisible ? "drawn" : ""}`} />
            </div>

            {/* Stats Row */}
            <div ref={statsRef} className="about-stats-wrap w-full">
              <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch w-full">
                {profile.stats.map((s, idx) => {
                  const displayValue = idx === 0 ? count0 : idx === 1 ? count1 : count2;
                  return (
                    <div key={s.label} className="flex flex-col justify-between">
                      <div>
                        <div className="tabular-nums text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                          {displayValue}
                        </div>
                        <div className="mt-2 text-xs leading-snug text-muted-foreground min-h-[2.5rem] sm:min-h-[2.75rem] flex items-start">
                          {s.label}
                        </div>
                      </div>
                      <div className={`stat-line mt-3 ${statsVisible ? "drawn" : ""}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Three Paragraphs Vertically Aligned */}
          <div className="about-right-col">
            <div className="about-paragraphs-wrap flex flex-col gap-[40px] text-base leading-relaxed text-muted-foreground">
              <p>{about.paragraphs[0]}</p>
              <p>{about.paragraphs[1]}</p>
              <p>
                My approach is simple: multi-layered, well-structured systems with clear boundaries
                between{" "}
                <button
                  type="button"
                  onClick={() => animateToCard(2)}
                  onMouseEnter={() => animateToCard(2)}
                  onMouseLeave={resumeAutoplayAfterDelay}
                  onFocus={() => animateToCard(2)}
                  onBlur={resumeAutoplayAfterDelay}
                  className={`layer-btn cursor-pointer inline bg-transparent p-0 m-0 font-inherit outline-none transition-all duration-200 ${
                    activeLayer === "interface"
                      ? "is-active text-foreground font-medium"
                      : "text-inherit"
                  }`}
                >
                  interface
                </button>
                ,{" "}
                <button
                  type="button"
                  onClick={() => animateToCard(3)}
                  onMouseEnter={() => animateToCard(3)}
                  onMouseLeave={resumeAutoplayAfterDelay}
                  onFocus={() => animateToCard(3)}
                  onBlur={resumeAutoplayAfterDelay}
                  className={`layer-btn cursor-pointer inline bg-transparent p-0 m-0 font-inherit outline-none transition-all duration-200 ${
                    activeLayer === "logic"
                      ? "is-active text-foreground font-medium"
                      : "text-inherit"
                  }`}
                >
                  logic
                </button>
                , and{" "}
                <button
                  type="button"
                  onClick={() => animateToCard(4)}
                  onMouseEnter={() => animateToCard(4)}
                  onMouseLeave={resumeAutoplayAfterDelay}
                  onFocus={() => animateToCard(4)}
                  onBlur={resumeAutoplayAfterDelay}
                  className={`layer-btn cursor-pointer inline bg-transparent p-0 m-0 font-inherit outline-none transition-all duration-200 ${
                    activeLayer === "data"
                      ? "is-active text-foreground font-medium"
                      : "text-inherit"
                  }`}
                >
                  data
                </button>
                . That keeps code easy to change and fast where it matters.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Curved 3D Gallery (Full-bleed band 96px below Row 1, with 120px padding below) */}
      <div className="relative z-10 mt-[96px] w-full pb-[120px]">
        {/* Gallery Stage */}
        <div
          ref={stageRef}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Skills gallery"
          onMouseEnter={handleStageMouseEnter}
          onMouseLeave={handleStageMouseLeave}
          onFocus={handleStageFocus}
          onBlur={handleStageBlur}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          className="gallery-stage w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
        >
          {/* Center 36vw Glow Element behind gallery center */}
          <div
            aria-hidden="true"
            className="center-gallery-glow pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              width: "28vw",
              height: "28vw",
              minWidth: "200px",
              minHeight: "200px",
              filter: "blur(80px)",
              backgroundColor: CARDS[activeCardIndex].c1,
              transition: "background-color 700ms ease",
              zIndex: 1,
            }}
          />

          {/* Silk streak running BEHIND the cards at vertical middle of stage, opacity 0.5 with masked ends */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-[2] h-[50px] overflow-hidden"
            style={{
              opacity: 0.5,
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            }}
          >
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="h-full w-full">
              <path
                d="M -100 30 C 360 10, 800 50, 1540 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                opacity="0.2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M -100 30 C 360 10, 800 50, 1540 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="160 800"
                opacity="0.4"
                vectorEffect="non-scaling-stroke"
                className="silk-streak-highlight"
              />
            </svg>
          </div>

          {/* Center 40px glow column behind center line tinted with active card's --c2 at 10% */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-[5] h-[72%] w-[40px] -translate-x-1/2"
            style={{
              left: "50%",
              top: "14%",
              background: `linear-gradient(90deg, transparent, ${CARDS[activeCardIndex].c2}1A, transparent)`,
              transition: "background 700ms ease",
            }}
          />

          {/* Center 1px vertical line with top and bottom 10px ticks, strictly white */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-[6] h-[72%] w-[1px] -translate-x-1/2"
            style={{
              left: "50%",
              top: "14%",
              backgroundColor: "#FFFFFF",
            }}
          >
            <span
              className="absolute left-1/2 top-0 h-[1px] w-[10px] -translate-x-1/2"
              style={{ backgroundColor: "#FFFFFF" }}
            />
            <span
              className="absolute bottom-0 left-1/2 h-[1px] w-[10px] -translate-x-1/2"
              style={{ backgroundColor: "#FFFFFF" }}
            />
          </div>

          {/* 7 Curved Gallery Cards */}
          {CARDS.map((card, idx) => (
            <div
              key={card.name}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onClick={() => {
                const n = 7;
                const o = ((((idx - posRef.current) % n) + n + n / 2) % n) - n / 2;
                if (Math.abs(o) >= 0.1) {
                  animateToCard(idx);
                }
              }}
              tabIndex={0}
              role="group"
              aria-roledescription="slide"
              aria-label={`${card.name} card`}
              style={
                {
                  "--c1": card.c1,
                  "--c2": card.c2,
                  "--c3": card.c3,
                } as React.CSSProperties
              }
              className="gallery-card relative flex flex-col justify-between p-3.5 sm:p-4.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
            >
              {/* Subtle spotlight inside card */}
              <div aria-hidden="true" className="gallery-card-spotlight" />

              {/* Gradient border ring (1.5px) on center card with mask */}
              <div aria-hidden="true" className="gallery-card-ring" />

              {/* Fallback tint overlay if color-mix not supported */}
              <div
                aria-hidden="true"
                className="gallery-card-fallback-overlay pointer-events-none absolute inset-0 rounded-[20px]"
                style={{
                  backgroundColor: "var(--c1)",
                  opacity: "calc(var(--f, 0) * 0.18)",
                }}
              />

              {/* Card Header: Label 13px weight 600 tracking 0.22em, Index 12px with 1px underline */}
              <div className="relative z-10 flex items-start justify-between">
                <span className="text-[11.5px] font-mono font-semibold tracking-[0.2em] uppercase text-foreground opacity-90">
                  {card.name}
                </span>
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[11px] text-muted-foreground opacity-75">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="gallery-index-underline h-[1px] mt-1"
                    style={{
                      width: "calc(10px + var(--f, 0) * 12px)",
                    }}
                  />
                </div>
              </div>

              {/* Card Artwork: 88% width, centered vertically at 46% */}
              <div
                className="gallery-art-container absolute left-1/2 flex items-center justify-center pointer-events-none"
                style={{
                  top: "46%",
                  transform: "translate(-50%, -50%)",
                  width: "88%",
                  aspectRatio: "1",
                }}
              >
                {/* Soft elliptical ground shadow under scene */}
                <div aria-hidden="true" className="card-ground-shadow" />

                {/* Subtle depth parallax: shifts by (o * -6px) */}
                <div
                  className="gallery-art-parallax w-full h-full relative"
                  style={{ transform: "translateX(var(--art-px, 0px))" }}
                >
                  {/* Center card float and scale */}
                  <div className="gallery-art-float w-full h-full relative flex items-center justify-center">
                    {/* Gray Layer */}
                    <div
                      aria-hidden="true"
                      className="gallery-art-gray pointer-events-none absolute inset-0 flex items-center justify-center"
                    >
                      <ArtworkScene index={idx} />
                    </div>

                    {/* Color Layer with opacity driven by --f */}
                    <div
                      aria-hidden="true"
                      className="gallery-art-color pointer-events-none absolute inset-0 flex items-center justify-center"
                      style={{ opacity: "var(--f, 0)" }}
                    >
                      <ArtworkScene index={idx} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Caption Pill at Bottom */}
              <div className="relative z-10 mt-auto flex justify-center pb-1">
                <div className="gallery-card-caption-pill max-w-full truncate px-3 py-1.5 text-[11px] font-medium leading-none tracking-wide text-foreground">
                  {card.caption}
                </div>
              </div>

              {/* Mirror reflection under center card only */}
              <div
                aria-hidden="true"
                className="gallery-card-reflection pointer-events-none absolute left-0 right-0 top-[101%] h-[40%] overflow-hidden"
                style={{
                  opacity: "calc(var(--f, 0) * 0.12)",
                  transform: "scaleY(-1)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 55%)",
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 55%)",
                }}
              >
                <div
                  className="mx-auto flex w-[88%] aspect-square items-center justify-center"
                  style={{ marginTop: "-20%" }}
                >
                  <ArtworkScene index={idx} />
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrow Buttons */}
          <button
            type="button"
            aria-label="Previous"
            onClick={handlePrev}
            className="gallery-nav-btn absolute left-4 sm:left-8 top-1/2 z-20 flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground cursor-pointer shadow-soft"
          >
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={handleNext}
            className="gallery-nav-btn absolute right-4 sm:right-8 top-1/2 z-20 flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground cursor-pointer shadow-soft"
          >
            <ChevronRight className="h-4 w-4 text-foreground" />
          </button>
        </div>

        {/* Counter and Progress Dots under the stage center */}
        <div className="mt-8 flex flex-col items-center justify-center text-center gap-3">
          {/* Counter at 13px with active card name in --c2 */}
          <div className="font-mono text-[13px] font-semibold tracking-[0.2em] uppercase text-foreground">
            <span className="opacity-60">
              {String(activeCardIndex + 1).padStart(2, "0")} / 07&nbsp;&nbsp;
            </span>
            <span style={{ color: CARDS[activeCardIndex].c2, transition: "color 400ms ease" }}>
              {CARDS[activeCardIndex].name}
            </span>
          </div>

          {/* Row of 7 Progress Dots */}
          <div
            className="flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Gallery slides"
          >
            {CARDS.map((card, idx) => {
              const isActive = idx === activeCardIndex;
              return (
                <button
                  key={card.name}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to ${card.name} card`}
                  onClick={() => animateToCard(idx)}
                  className="gallery-progress-dot cursor-pointer p-0 border-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
                  style={{
                    height: "6px",
                    width: isActive ? "24px" : "6px",
                    borderRadius: "999px",
                    backgroundColor: isActive
                      ? CARDS[activeCardIndex].c1
                      : "rgba(255, 255, 255, 0.25)",
                    transition:
                      "width 400ms cubic-bezier(0.22, 1, 0.36, 1), background-color 400ms ease",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // State
  const [sectionInView, setSectionInView] = useState(false);
  const [expandedId, setExpandedId] = useState<string>(experienceData[0]?.id || "freelance");
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [litMap, setLitMap] = useState<Record<string, boolean>>({});
  const [revealedMap, setRevealedMap] = useState<Record<string, boolean>>({});

  // 1. Section in-view observer for will-change toggling on progress layers
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 3. Entry reveal observer (threshold 0.25, once)
  useEffect(() => {
    if (reduce) {
      const allRev: Record<string, boolean> = {};
      experienceData.forEach((e) => {
        allRev[e.id] = true;
      });
      setRevealedMap(allRev);
      return;
    }

    const observers: IntersectionObserver[] = [];
    experienceData.forEach((entry, idx) => {
      const el = itemRefs.current[idx];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setRevealedMap((prev) => ({ ...prev, [entry.id]: true }));
            obs.disconnect();
          }
        },
        { threshold: 0.25 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [reduce]);

  // 4. Single passive scroll listener with rAF for timeline progress --tp and node lighting
  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    if (reduce) {
      timeline.style.setProperty("--tp", "1");
      timeline.style.setProperty("--tp-visible", "1");
      const allLit: Record<string, boolean> = {};
      experienceData.forEach((e) => {
        allLit[e.id] = true;
      });
      setLitMap(allLit);
      return;
    }

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const rect = timeline.getBoundingClientRect();
        const vh = window.innerHeight;
        const targetLine = vh * 0.7; // 70% of viewport height

        // 0 when timeline top reaches 70% vh, 1 when timeline bottom reaches 70% vh
        const totalDist = rect.height;
        const current = targetLine - rect.top;
        const p = Math.max(0, Math.min(1, current / Math.max(1, totalDist)));
        timeline.style.setProperty("--tp", p.toFixed(4));
        timeline.style.setProperty("--tp-visible", p > 0.005 ? "1" : "0");

        const railHeadClientY = rect.top + p * totalDist;

        let nearestIdx = 0;
        let nearestDist = Infinity;
        const newlyLit: Record<string, boolean> = {};

        experienceData.forEach((entry, idx) => {
          const itemEl = itemRefs.current[idx];
          if (!itemEl) return;
          const itemRect = itemEl.getBoundingClientRect();
          const nodeCenterY = itemRect.top + 47; // 38px + 9px node center

          // Lit when rail head reaches or passes node center
          if (railHeadClientY >= nodeCenterY) {
            newlyLit[entry.id] = true;
          }

          // Active entry: nearest card to viewport center
          const cardCenterY = itemRect.top + itemRect.height / 2;
          const dist = Math.abs(cardCenterY - vh / 2);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearestIdx = idx;
          }
        });

        setActiveIdx((prev) => (prev !== nearestIdx ? nearestIdx : prev));
        setLitMap((prev) => {
          let changed = false;
          for (const id in newlyLit) {
            if (!prev[id]) {
              changed = true;
              break;
            }
          }
          return changed ? { ...prev, ...newlyLit } : prev;
        });
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce]);

  // 5. Delegated pointermove listener for card specular highlight
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>(".experience-card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mx = (e.clientX - rect.left).toFixed(1) + "px";
    const my = (e.clientY - rect.top).toFixed(1) + "px";
    card.style.setProperty("--mx", mx);
    card.style.setProperty("--my", my);
  };

  // Accordion toggle: only one open at a time
  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      style={{
        paddingTop: "140px",
        paddingBottom: "120px",
        scrollMarginTop: "110px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Scoped Experience Section Styles */}
      <style>{`
        #experience {
          --node-bg: #0A0A0A;
          --rail-base: rgba(255, 255, 255, 0.16);
          --node-border-unlit: rgba(255, 255, 255, 0.35);
          --blob-color: #FFFFFF;
          --streak-color: #FFFFFF;
          --gutter-w: 140px;
          --lane-a-x: 36px;
          --lane-b-x: 84px;
          --card-max-w: 820px;
          --card-padding: 28px;
          --tp: 0;
          --tp-visible: 0;
          position: relative;
          width: 100%;
          overflow: hidden;
          isolation: isolate;
          padding-top: 140px;
          padding-bottom: 120px;
          scroll-margin-top: 110px;
        }

        :root:not(.dark) #experience,
        html:not(.dark) #experience,
        body:not(.dark) #experience {
          --node-bg: #FFFFFF;
          --rail-base: rgba(0, 0, 0, 0.16);
          --node-border-unlit: rgba(0, 0, 0, 0.35);
          --blob-color: #000000;
          --streak-color: #000000;
        }

        @media (max-width: 899px) {
          #experience {
            --gutter-w: 36px;
            --lane-a-x: 14px;
            --lane-b-x: 14px;
            --card-padding: 22px;
            --card-max-w: 100%;
          }
        }

        /* 1. Header stack typography */
        .experience-headline {
          font-size: clamp(2.25rem, 4.6vw, 4rem);
          line-height: 1.05;
          max-width: 20ch;
          text-wrap: balance;
        }
        @media (max-width: 599px) {
          .experience-headline {
            font-size: clamp(1.9rem, 8vw, 2.4rem);
          }
        }

        /* 2. Strict Grid for each Timeline <li> */
        .timeline-item {
          display: grid;
          grid-template-columns: 140px minmax(0, 820px);
          column-gap: 0;
          align-items: start;
          margin-bottom: 40px;
          position: relative;
        }
        .timeline-item:last-child {
          margin-bottom: 0;
        }
        @media (max-width: 899px) {
          .timeline-item {
            grid-template-columns: 36px minmax(0, 1fr);
          }
        }

        /* 5. Gutter column in <li> */
        .timeline-gutter {
          position: relative;
          align-self: stretch;
          overflow: hidden;
        }

        /* 6. Card column in <li> */
        .timeline-card-col {
          grid-column: 2;
          width: 100%;
          min-width: 0;
          max-width: 820px;
          margin: 0;
        }

        /* 7. Glass Entry Cards */
        .experience-card {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 24px;
          padding: 28px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 24px 50px rgba(0, 0, 0, 0.3);
          transition: transform 250ms ease, border-color 250ms ease;
        }
        :root:not(.dark) #experience .experience-card,
        html:not(.dark) #experience .experience-card,
        body:not(.dark) #experience .experience-card {
          background: rgba(0, 0, 0, 0.035);
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 16px 36px rgba(0, 0, 0, 0.06);
        }
        @media (max-width: 899px) {
          .experience-card {
            padding: 22px;
          }
        }

        /* Card internal accent glow anchored top-left (60% x 60%, 10% opacity) */
        .experience-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 60%;
          height: 60%;
          background: radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        @media (hover: hover) and (pointer: fine) {
          .experience-card:hover {
            transform: translateY(-4px);
            border-color: color-mix(in srgb, var(--accent) 40%, rgba(255, 255, 255, 0.14));
          }
          :root:not(.dark) #experience .experience-card:hover,
          html:not(.dark) #experience .experience-card:hover,
          body:not(.dark) #experience .experience-card:hover {
            border-color: color-mix(in srgb, var(--accent) 40%, rgba(0, 0, 0, 0.1));
          }
        }

        /* Specular follow inside card */
        .experience-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 24px;
          background: radial-gradient(circle 160px at var(--mx, -500px) var(--my, -500px), color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%);
          opacity: 0;
          pointer-events: none;
          transition: opacity 250ms ease;
          z-index: 1;
        }
        @media (hover: hover) and (pointer: fine) {
          .experience-card:hover::after {
            opacity: 1;
          }
        }

        /* Card first row mobile stacking */
        @media (max-width: 599px) {
          .card-top-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
        }

        /* 8. Tech pills */
        .tech-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }

        .tech-pill {
          display: inline-flex;
          align-items: center;
          opacity: 1;
          visibility: visible;
          font-family: inherit;
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          line-height: 1.2;
          padding: 7px 13px;
          border-radius: 999px;
          white-space: nowrap;
          user-select: none;
          color: rgba(255, 255, 255, 0.88);
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.24);
          transition: border-color 200ms ease, background 200ms ease, color 200ms ease;
        }

        :root:not(.dark) #experience .tech-pill,
        html:not(.dark) #experience .tech-pill,
        body:not(.dark) #experience .tech-pill {
          color: rgba(0, 0, 0, 0.82);
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.22);
        }

        @media (hover: hover) and (pointer: fine) {
          .tech-pill:hover {
            border-color: var(--accent);
            background: color-mix(in srgb, var(--accent) 14%, transparent);
            color: rgba(255, 255, 255, 1);
          }
          :root:not(.dark) #experience .tech-pill:hover,
          html:not(.dark) #experience .tech-pill:hover,
          body:not(.dark) #experience .tech-pill:hover {
            border-color: var(--accent);
            background: color-mix(in srgb, var(--accent) 14%, transparent);
            color: rgba(0, 0, 1);
          }
        }

        /* 9. Accordion transition */
        .expandable-grid {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 450ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .expandable-grid.is-open {
          grid-template-rows: 1fr;
        }
        .expandable-inner {
          overflow: hidden;
          opacity: 0;
          transition: opacity 450ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .expandable-grid.is-open .expandable-inner {
          opacity: 1;
        }

        /* 10. Rails */
        .timeline-rail-a {
          position: absolute;
          top: 38px;
          bottom: 12px;
          width: 2px;
          left: 36px;
          transform: translateX(-50%);
          z-index: 0;
          pointer-events: none;
        }

        .timeline-rail-b {
          position: absolute;
          top: 38px;
          bottom: 40px;
          width: 2px;
          left: 84px;
          transform: translateX(-50%);
          z-index: 0;
          pointer-events: none;
        }

        @media (max-width: 899px) {
          .timeline-rail-a {
            left: 14px;
          }
          .timeline-rail-b {
            display: none;
          }
        }

        /* 11. Active node pulsing ring */
        @keyframes xp-node-pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .xp-node-pulsing {
          animation: xp-node-pulse 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }

        /* 12. Background blobs and streak */
        @keyframes xp-blob-drift-1 {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-5vw, 4vh, 0); }
        }
        @keyframes xp-blob-drift-2 {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(5vw, -4vh, 0); }
        }
        .xp-blob-1 {
          animation: xp-blob-drift-1 26s ease-in-out infinite alternate;
        }
        .xp-blob-2 {
          animation: xp-blob-drift-2 32s ease-in-out infinite alternate;
        }

        @keyframes xp-silk-glide {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1300; }
        }
        .xp-silk-highlight {
          animation: xp-silk-glide 22s linear infinite;
        }

        /* 13. Connector curve draw in */
        .connector-path {
          transition: stroke-dashoffset 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* 15. Reduced motion overrides */
        @media (prefers-reduced-motion: reduce) {
          .xp-blob-1,
          .xp-blob-2,
          .xp-silk-highlight,
          .xp-node-pulsing {
            animation: none !important;
          }
          .experience-card,
          .experience-card::after,
          .expandable-grid,
          .expandable-inner,
          .connector-path,
          .tech-pill {
            transition: none !important;
          }
          .experience-card:hover {
            transform: none !important;
          }
          .expandable-grid {
            transition: none !important;
          }
          .expandable-inner {
            transition: none !important;
          }
        }
      `}</style>

      {/* Ambient background decoration */}
      <div
        aria-hidden="true"
        className="xp-blob-1 pointer-events-none absolute -top-12 -right-12 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full"
        style={{
          background: "var(--blob-color)",
          filter: "blur(80px)",
          opacity: 0.05,
        }}
      />
      <div
        aria-hidden="true"
        className="xp-blob-2 pointer-events-none absolute -bottom-16 -left-16 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full"
        style={{
          background: "var(--blob-color)",
          filter: "blur(80px)",
          opacity: 0.05,
        }}
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full select-none"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
      >
        <path
          d="M -50,150 Q 500,450 1050,850"
          fill="none"
          stroke="var(--streak-color)"
          strokeWidth="1.2"
          opacity="0.18"
        />
        <path
          d="M -50,150 Q 500,450 1050,850"
          fill="none"
          stroke="var(--streak-color)"
          strokeWidth="1.2"
          strokeDasharray="100 1200"
          className="xp-silk-highlight"
        />
      </svg>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-12">
        {/* Header Stack with exact gaps: label -> 20px -> headline -> 16px -> subtitle -> 32px -> terminal -> 56px */}
        <div className="flex flex-col items-start" style={{ marginBottom: "56px" }}>
          {/* Label */}
          <div style={{ marginBottom: "20px" }}>
            <SectionLabel>EXPERIENCE</SectionLabel>
          </div>

          {/* Headline */}
          <h2
            id="experience-heading"
            className="experience-headline display font-bold tracking-tight text-foreground"
            style={{ marginBottom: "16px" }}
          >
            Experience.
          </h2>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg text-muted-foreground leading-relaxed"
            style={{ marginBottom: "0" }}
          >
            A short log of where I have built and delivered.
          </p>
        </div>

        {/* Timeline Parent: 3-column / 2-column grid on >= 1280px */}
        <div className="timeline-layout-parent max-w-5xl">
          {/* Main Column (Gutter + Cards) */}
          <div
            ref={timelineRef}
            onPointerMove={handlePointerMove}
            className="timeline-main-col relative"
          >
            {/* Timeline List of Entries */}
            <ol className="timeline-list list-none p-0 m-0 relative">
              {/* Lane A (Main Rail) absolutely positioned inside <ol> */}
              <div className="timeline-rail-a" aria-hidden="true">
                {/* Lane A Base line: 16% opacity */}
                <div className="absolute inset-0 bg-white/[0.16] dark:bg-white/[0.16] light:bg-black/[0.16]" />

                {/* Lane A Progress Layer */}
                <div
                  className="absolute inset-0 origin-top bg-gradient-to-b from-white/90 to-white/30 dark:from-white/90 dark:to-white/30 light:from-black/90 light:to-black/30"
                  style={{
                    transform: `scaleY(var(--tp, ${reduce ? 1 : 0}))`,
                    willChange: sectionInView ? "transform" : "auto",
                  }}
                />

                {/* 6px Head dot at leading edge */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-white dark:bg-white light:bg-black shadow-[0_0_8px_rgba(255,255,255,0.8)] dark:shadow-[0_0_8px_rgba(255,255,255,0.8)] light:shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-opacity duration-200"
                  style={{
                    top: `calc(var(--tp, ${reduce ? 1 : 0}) * 100%)`,
                    opacity: reduce ? 1 : "var(--tp-visible, 0)",
                  }}
                />
              </div>

              {/* Lane B (Branch Rail) absolutely positioned inside <ol> on Desktop */}
              <div className="timeline-rail-b" aria-hidden="true">
                {/* Lane B Base rail: 16% opacity */}
                <div className="absolute inset-0 bg-white/[0.16] dark:bg-white/[0.16] light:bg-black/[0.16]" />

                {/* Lane B Progress layer */}
                <div
                  className="absolute inset-0 origin-top bg-gradient-to-b from-white/90 to-white/30 dark:from-white/90 dark:to-white/30 light:from-black/90 light:to-black/30"
                  style={{
                    transform: `scaleY(var(--tp, ${reduce ? 1 : 0}))`,
                    willChange: sectionInView ? "transform" : "auto",
                  }}
                />
              </div>

              {experienceData.map((entry, idx) => {
                const isOpen = expandedId === entry.id;
                const isLit = Boolean(litMap[entry.id]);
                const isActive = activeIdx === idx;
                const isRevealed = Boolean(revealedMap[entry.id]);

                return (
                  <li
                    key={entry.id}
                    ref={(el) => {
                      itemRefs.current[idx] = el;
                    }}
                    className="timeline-item"
                    style={{ "--accent": entry.accent } as React.CSSProperties}
                  >
                    {/* First Column: Gutter (140px on desktop, 36px on mobile) */}
                    <div className="timeline-gutter">
                      {/* Branch Connector curve (Lane A down to Lane B node, 1.5px stroke, accent at 60% opacity) */}
                      {entry.branch && (
                        <svg
                          aria-hidden="true"
                          className="hidden lg:block absolute pointer-events-none"
                          style={{ top: 0, left: 0, width: "100%", height: "48px" }}
                          viewBox="0 0 140 48"
                        >
                          <path
                            d="M 36,0 C 36,22 84,22 84,47"
                            fill="none"
                            stroke="var(--accent)"
                            strokeOpacity="0.6"
                            strokeWidth="1.5"
                            strokeDasharray="100"
                            strokeDashoffset={reduce || isRevealed ? 0 : 100}
                            className="connector-path"
                          />
                        </svg>
                      )}

                      {/* Mobile Branch Hint Nub (< 900px, 20px curve) */}
                      {entry.branch && (
                        <svg
                          aria-hidden="true"
                          className="block lg:hidden absolute pointer-events-none"
                          style={{ top: "20px", left: "14px", width: "22px", height: "36px" }}
                          viewBox="0 0 22 36"
                        >
                          <path
                            d="M 0,4 C 12,4 20,10 20,18 C 20,26 12,32 0,32"
                            fill="none"
                            stroke="var(--accent)"
                            strokeOpacity="0.6"
                            strokeWidth="1.5"
                          />
                        </svg>
                      )}

                      {/* Node Circle on Lane: top 38px, centered on lane with solid page-background fill */}
                      <div
                        aria-hidden="true"
                        className={`absolute z-10 pointer-events-none top-[38px] ${
                          entry.branch ? "left-[5px] lg:left-[75px]" : "left-[5px] lg:left-[27px]"
                        }`}
                        style={
                          reduce
                            ? { transform: "scale(1)", opacity: 1 }
                            : {
                                transform: isRevealed ? "scale(1)" : "scale(0.5)",
                                opacity: isRevealed ? 1 : 0,
                                transition:
                                  "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                              }
                        }
                      >
                        {/* Outer 18px circle with solid page background */}
                        <div
                          className="relative w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors duration-300"
                          style={{
                            backgroundColor: "var(--node-bg)",
                            borderColor: isLit ? entry.accent : "var(--node-border-unlit)",
                            borderWidth: "2px",
                            borderStyle: "solid",
                          }}
                        >
                          {/* Inner 6px dot when lit */}
                          {isLit && (
                            <span
                              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                              style={{ backgroundColor: entry.accent }}
                            />
                          )}

                          {/* 34px Soft ring: scales 0.6 to 1 over 500ms when lit */}
                          <span
                            className="absolute -left-2 -top-2 w-[34px] h-[34px] rounded-full pointer-events-none transition-all duration-500"
                            style={{
                              borderWidth: "1px",
                              borderStyle: "solid",
                              borderColor: entry.accent,
                              transform: isLit ? "scale(1)" : "scale(0.6)",
                              opacity: isLit ? 0.3 : 0,
                            }}
                          />

                          {/* Active entry gentle pulsing ring */}
                          {isActive && !reduce && (
                            <span
                              className="absolute -left-2 -top-2 w-[34px] h-[34px] rounded-full pointer-events-none xp-node-pulsing"
                              style={{
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: entry.accent,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Second Column: Card ONLY (width 100%, max-w 820px, sits strictly in column 2) */}
                    <div
                      className="timeline-card-col"
                      style={
                        reduce
                          ? { transform: "none", opacity: 1 }
                          : {
                              transform: isRevealed ? "translateY(0)" : "translateY(28px)",
                              opacity: isRevealed ? 1 : 0,
                              transition:
                                "transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 120ms, opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 120ms",
                            }
                      }
                    >
                      {/* Active entry glow: behind the nearest-to-center card */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-8 left-1/4 w-[60%] h-[160px] rounded-full transition-opacity duration-600"
                        style={{
                          backgroundColor: entry.accent,
                          filter: "blur(60px)",
                          opacity: isActive ? 0.12 : 0,
                          zIndex: 0,
                        }}
                      />
                      <div className="experience-card">
                        {/* 1. First Row: Type chip on left; Hash + Tag + Period on right */}
                        <div
                          onClick={() => toggleAccordion(entry.id)}
                          className="card-top-row flex flex-wrap items-center justify-between gap-3 cursor-pointer"
                          style={{ marginBottom: "20px" }}
                        >
                          {/* Left: Type chip */}
                          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs border border-white/10 dark:border-white/10 light:border-black/10 bg-white/5 dark:bg-white/5 light:bg-black/5 text-foreground select-none">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: entry.accent }}
                              aria-hidden="true"
                            />
                            <span className="font-medium">{entry.type}</span>
                          </div>

                          {/* Right: Period */}
                          {entry.period && entry.period.trim() !== "" ? (
                            <span className="font-mono text-[12px] text-muted-foreground select-none">
                              {entry.period}
                            </span>
                          ) : null}
                        </div>

                        {/* 2. Role Heading (clamp(1.4rem, 2.2vw, 1.9rem), margin 0) */}
                        <h3
                          className="font-bold tracking-tight text-foreground leading-tight"
                          style={{
                            fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                            margin: 0,
                            marginBottom: "6px",
                          }}
                        >
                          {entry.role}
                        </h3>

                        {/* 3. Organization Line with monospace @ prefix */}
                        <p
                          className="text-sm sm:text-base text-muted-foreground leading-normal"
                          style={{ margin: 0, marginBottom: "14px" }}
                        >
                          <span className="font-mono text-xs opacity-70">@</span> {entry.org}
                        </p>

                        {/* 4. Summary Paragraph (max-width 60ch) */}
                        <p
                          className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[60ch]"
                          style={{ margin: 0 }}
                        >
                          {entry.summary}
                        </p>

                        {/* 5. Tech Pills Row */}
                        <div className="tech-pills-row">
                          {entry.tech.map((t) => (
                            <span key={t} className="tech-pill">
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* 6. Details Toggle Row (1px divider above, 16px padding) */}
                        <div className="pt-4 border-t border-white/10 dark:border-white/10 light:border-black/10 flex items-center justify-between">
                          <button
                            type="button"
                            id={`exp-btn-${entry.id}`}
                            aria-expanded={isOpen}
                            aria-controls={`exp-details-${entry.id}`}
                            onClick={() => toggleAccordion(entry.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors py-1 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground rounded"
                          >
                            <span>Details</span>
                            <svg
                              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </button>
                        </div>

                        {/* 7. Expandable Bullet List BELOW the Toggle */}
                        <div
                          id={`exp-details-${entry.id}`}
                          className={`expandable-grid ${isOpen ? "is-open" : ""}`}
                          aria-hidden={!isOpen}
                        >
                          <div className="expandable-inner">
                            <ul className="space-y-2.5 pt-3 pb-1 list-none p-0 m-0">
                              {entry.points.map((pt, pIdx) => (
                                <li
                                  key={pIdx}
                                  className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                                >
                                  <span
                                    className="font-bold select-none text-base leading-none mt-0.5"
                                    style={{ color: entry.accent }}
                                    aria-hidden="true"
                                  >
                                    -
                                  </span>
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function useCardTilt(maxAngleX = 6, maxAngleY = 8) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [glare, setGlare] = useState<{ x: number; y: number; active: boolean }>({
    x: -500,
    y: -500,
    active: false,
  });

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const isMobile = window.innerWidth < 600;
    if (isReduced || isTouch || isMobile) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovered = false;

    const lerp = 0.12;

    const tick = () => {
      currentX += (targetX - currentX) * lerp;
      currentY += (targetY - currentY) * lerp;

      if (el) {
        el.style.transform = `rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`;
      }

      if (isHovered || Math.abs(currentX) > 0.05 || Math.abs(currentY) > 0.05) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      targetY = (px - 0.5) * (maxAngleY * 2);
      targetX = -(py - 0.5) * (maxAngleX * 2);

      setGlare({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      });

      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const handlePointerEnter = () => {
      isHovered = true;
    };

    const handlePointerLeave = () => {
      isHovered = false;
      targetX = 0;
      targetY = 0;
      setGlare((prev) => ({ ...prev, active: false }));
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    el.addEventListener("pointermove", handlePointerMove, { passive: true });
    el.addEventListener("pointerenter", handlePointerEnter);
    el.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerenter", handlePointerEnter);
      el.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [maxAngleX, maxAngleY]);

  return { frameRef, glare };
}

function VerifiedSeal({
  size = 112,
  accent,
  isStamped,
  id,
  className = "",
}: {
  size?: number;
  accent: string;
  isStamped: boolean;
  id: string;
  className?: string;
}) {
  const isSmall = size <= 56;
  const pathId = `seal-path-${id}`;
  const strokeOuter = isSmall ? 1.2 : 1.5;
  const strokeInner = isSmall ? 0.9 : 1.2;
  const outerR = isSmall ? 25 : 52;
  const innerR = isSmall ? 22 : 46;
  const textR = isSmall ? 17 : 37;
  const fontSize = isSmall ? 6.5 : 11.5;
  const center = size / 2;

  return (
    <div
      aria-hidden="true"
      className={`relative select-none pointer-events-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        color: accent,
      }}
    >
      {/* Small Ring Pulse on stamp entry */}
      {isStamped && (
        <div
          className="verified-pulse-ring absolute inset-0 rounded-full"
          style={{
            border: `2px solid ${accent}`,
          }}
        />
      )}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className={`w-full h-full ${isStamped ? "verified-seal-stamped" : "opacity-0"}`}
        style={{ color: accent }}
      >
        <defs>
          <path
            id={pathId}
            d={`M ${center},${center} m -${textR},0 a ${textR},${textR} 0 1,1 ${textR * 2},0 a ${textR},${textR} 0 1,1 -${textR * 2},0`}
          />
        </defs>
        {/* Double Ring in --accent */}
        <circle
          cx={center}
          cy={center}
          r={outerR}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeOuter}
        />
        <circle
          cx={center}
          cy={center}
          r={innerR}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeInner}
        />
        {/* Text VERIFIED in monospace with 0.2em letter spacing */}
        <text
          fill="currentColor"
          fontSize={fontSize}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
          fontWeight="bold"
          letterSpacing="0.2em"
        >
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            VERIFIED
          </textPath>
        </text>
        {/* Centered Check Mark */}
        {isSmall ? (
          <path
            d={`M ${center - 5} ${center} L ${center - 1} ${center + 4} L ${center + 6} ${center - 3}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d={`M ${center - 10} ${center} L ${center - 2} ${center + 8} L ${center + 12} ${center - 6}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}

function FeaturedCertificateCard({
  cert,
  index,
  onOpenLightbox,
}: {
  cert: CertificateItem;
  index: number;
  onOpenLightbox: (index: number, e: React.MouseEvent) => void;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const { frameRef, glare } = useCardTilt(6, 8);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className="featured-cert-card relative w-full"
      style={{ "--accent": cert.accent } as React.CSSProperties}
    >
      <div className="featured-cert-grid grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-8 lg:gap-12 items-center">
        {/* Image Stage */}
        <div className="relative w-full">
          {/* Static Accent Glow behind image (14% opacity, never animated) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 rounded-[32px]"
            style={{
              background: cert.accent,
              filter: "blur(60px)",
              opacity: 0.14,
            }}
          />

          {/* Perspective Wrapper */}
          <div className="relative w-full" style={{ perspective: "1200px" }}>
            {/* Tilt Frame */}
            <div
              ref={frameRef}
              onClick={(e) => onOpenLightbox(index, e)}
              className="featured-frame group relative cursor-pointer overflow-hidden rounded-[18px] border border-foreground/16 shadow-soft transition-shadow duration-300 hover:shadow-lift"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <img
                src={cert.image}
                alt={`Certificate of completion: ${cert.title}, ${cert.platform}`}
                loading="eager"
                width={1800}
                height={1200}
                className="w-full h-auto object-cover block aspect-[3/2] rounded-[18px]"
              />

              {/* Cursor Glare Layer */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                style={{
                  opacity: glare.active ? 1 : 0,
                  background: `radial-gradient(circle 240px at ${glare.x}px ${glare.y}px, rgba(255,255,255,0.28), transparent 60%)`,
                }}
              />
            </div>
          </div>

          {/* 112px "VERIFIED" Stamp (Overlapping frame by 24px) */}
          <div className="featured-seal-container absolute -bottom-6 -right-6 z-20">
            <VerifiedSeal id={cert.id} accent={cert.accent} isStamped={isInView} size={112} />
          </div>
        </div>

        {/* Details Column */}
        <div className="flex flex-col items-start w-full">
          {/* Platform & Type Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-foreground/14 text-foreground bg-foreground/5">
              <span className="w-2 h-2 rounded-full" style={{ background: cert.accent }} />
              {cert.platform} · {cert.issuer}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-foreground/14 text-muted-foreground bg-foreground/5">
              {cert.type}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-extrabold tracking-tight text-foreground mb-2"
            style={{
              fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
              lineHeight: 1.1,
            }}
          >
            {cert.title}
          </h3>

          {/* Date */}
          <p className="font-mono text-[13px] text-muted-foreground mb-6">{cert.date}</p>

          {/* Label: WHAT I COMPLETED */}
          <p
            className="font-mono text-[11px] uppercase opacity-55 text-foreground mb-3"
            style={{ letterSpacing: "0.18em" }}
          >
            WHAT I COMPLETED
          </p>

          {/* Tasks as Numbered Lines */}
          <div className="w-full flex flex-col mb-6">
            {cert.tasks?.map((task, taskIdx) => (
              <div
                key={task}
                className="overflow-hidden border-b border-foreground/10 last:border-b-0 py-3"
              >
                <div
                  className="edu-task-item flex items-center gap-3 transition-transform duration-500 ease-out"
                  style={{
                    transform: isInView ? "translateY(0)" : "translateY(100%)",
                    transitionDelay: `${taskIdx * 90}ms`,
                  }}
                >
                  <span
                    className="font-mono text-sm font-semibold shrink-0"
                    style={{ color: cert.accent }}
                  >
                    {String(taskIdx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm sm:text-base text-foreground/88 font-normal leading-snug">
                    {task}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Chips */}
          {cert.tech && cert.tech.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {cert.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center text-[12px] font-medium px-3 py-1.5 rounded-full border border-foreground/22 text-foreground/82 select-none"
                  style={{ opacity: 1 }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Pill Button: View certificate */}
          <button
            type="button"
            onClick={(e) => onOpenLightbox(index, e)}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/20 text-foreground text-sm font-medium transition-colors hover:border-foreground/50 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <span>View certificate</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

function OtherCertificateCard({
  cert,
  index,
  onOpenLightbox,
}: {
  cert: CertificateItem;
  index: number;
  onOpenLightbox: (index: number, e: React.MouseEvent) => void;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const { frameRef, glare } = useCardTilt(5, 5);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const specItems = [cert.date, cert.hours, cert.instructor].filter(Boolean);

  return (
    <article
      ref={cardRef}
      className="other-cert-card edu-glass-card group flex flex-col justify-between rounded-[24px] p-5 transition-transform duration-250 ease-out"
      style={{ "--accent": cert.accent } as React.CSSProperties}
    >
      <div>
        {/* Thumbnail on top (4:3 aspect ratio, object-fit cover, top position) */}
        <div className="relative w-full mb-4" style={{ perspective: "1000px" }}>
          <div
            ref={frameRef}
            onClick={(e) => onOpenLightbox(index, e)}
            className="relative cursor-pointer overflow-hidden rounded-[14px] border border-foreground/14 transition-shadow hover:shadow-soft"
            style={{
              aspectRatio: "4 / 3",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <img
              src={cert.image}
              alt={`Certificate of completion: ${cert.title}, ${cert.platform}`}
              loading="lazy"
              width={1600}
              height={1190}
              className="w-full h-full object-cover object-top block rounded-[14px]"
            />

            {/* Glare Layer */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-opacity duration-200"
              style={{
                opacity: glare.active ? 1 : 0,
                background: `radial-gradient(circle 160px at ${glare.x}px ${glare.y}px, rgba(255,255,255,0.28), transparent 60%)`,
              }}
            />
          </div>

          {/* 56px Small Stamp */}
          <div className="absolute -bottom-3 -right-3 z-10 pointer-events-none">
            <VerifiedSeal id={cert.id} accent={cert.accent} isStamped={isInView} size={56} />
          </div>
        </div>

        {/* Platform Chip & Type Chip Row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border border-foreground/14 text-foreground bg-foreground/5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: cert.accent }} />
            {cert.platform}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono border border-foreground/14 text-muted-foreground bg-foreground/5">
            {cert.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-foreground leading-snug mb-3">
          {cert.title}
        </h3>

        {/* Spec Line: only non-empty values separated by 1px vertical dividers in monospace 12px */}
        {specItems.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground mb-5">
            {specItems.map((val, i) => (
              <div key={i} className="inline-flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="inline-block w-px h-3 bg-foreground/20" />
                )}
                <span>{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Certificate Pill Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={(e) => onOpenLightbox(index, e)}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20 text-foreground text-xs font-medium transition-colors hover:border-foreground/50 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <span>View certificate</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </article>
  );
}

export function Education() {
  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPan, setZoomPan] = useState({ x: 0, y: 0 });
  const [timelineInView, setTimelineInView] = useState(false);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Compute zero-padded counter from lists
  const degreeCount = educationList.length.toString().padStart(2, "0");
  const certCount = certificatesList.length.toString().padStart(2, "0");
  const counterText = `${degreeCount} DEGREE IN PROGRESS  ·  ${certCount} CERTIFICATES`;

  // Education Timeline Intersection Observer
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimelineInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Lightbox Open & Close
  const handleOpenLightbox = (index: number, e?: React.MouseEvent) => {
    openerRef.current =
      (e?.currentTarget as HTMLElement) || (document.activeElement as HTMLElement);
    setActiveCertIndex(index);
    setIsZoomed(false);
    setZoomPan({ x: 0, y: 0 });
  };

  const handleCloseLightbox = useCallback(() => {
    setActiveCertIndex(null);
    setIsZoomed(false);
    setZoomPan({ x: 0, y: 0 });
    setTimeout(() => {
      openerRef.current?.focus();
    }, 50);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveCertIndex((prev) =>
      prev !== null ? (prev - 1 + certificatesList.length) % certificatesList.length : 0,
    );
    setIsZoomed(false);
    setZoomPan({ x: 0, y: 0 });
  }, []);

  const handleNext = useCallback(() => {
    setActiveCertIndex((prev) => (prev !== null ? (prev + 1) % certificatesList.length : 0));
    setIsZoomed(false);
    setZoomPan({ x: 0, y: 0 });
  }, []);

  // Lightbox Keyboard, Focus Trap & Scroll Lock
  useEffect(() => {
    if (activeCertIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCertIndex, handleCloseLightbox, handlePrev, handleNext]);

  // Handle Zoom Pan
  const handleZoomMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isZoomed || e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setZoomPan({
      x: (0.5 - px) * 45,
      y: (0.5 - py) * 45,
    });
  };

  const featuredCertificate = certificatesList.find((c) => c.featured) || certificatesList[0];
  const otherCertificates = certificatesList.filter((c) => !c.featured);
  const activeCertificate = activeCertIndex !== null ? certificatesList[activeCertIndex] : null;

  return (
    <section
      id="education"
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: "140px",
        paddingBottom: "120px",
        scrollMarginTop: "110px",
      }}
    >
      <style>{`
        #education {
          --blob-color: #000000;
          --streak-color: #000000;
        }
        :root.dark #education,
        html.dark #education,
        .dark #education {
          --blob-color: #FFFFFF;
          --streak-color: #FFFFFF;
        }

        /* Ambient Blobs & Silk Streak */
        @keyframes edu-blob-drift-1 {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-5vw, 4vh, 0); }
        }
        @keyframes edu-blob-drift-2 {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(5vw, -4vh, 0); }
        }
        .edu-blob-1 {
          animation: edu-blob-drift-1 26s ease-in-out infinite alternate;
        }
        .edu-blob-2 {
          animation: edu-blob-drift-2 32s ease-in-out infinite alternate;
        }

        @keyframes edu-silk-glide {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1300; }
        }
        .edu-silk-highlight {
          animation: edu-silk-glide 22s linear infinite;
        }

        /* Glass Recipe for Education Strip & Cards */
        .edu-glass-row,
        .edu-glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        :root:not(.dark) #education .edu-glass-row,
        html:not(.dark) #education .edu-glass-row,
        body:not(.dark) #education .edu-glass-row,
        :root:not(.dark) #education .edu-glass-card,
        html:not(.dark) #education .edu-glass-card,
        body:not(.dark) #education .edu-glass-card {
          background: rgba(0, 0, 0, 0.035);
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        /* Monogram Stroke */
        .edu-monogram {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.45);
        }
        :root:not(.dark) #education .edu-monogram,
        html:not(.dark) #education .edu-monogram,
        body:not(.dark) #education .edu-monogram {
          -webkit-text-stroke: 1.5px rgba(0, 0, 0, 0.45);
        }

        /* Card Hover */
        @media (hover: hover) and (pointer: fine) {
          .other-cert-card:hover {
            transform: translateY(-4px);
            border-color: color-mix(in srgb, var(--accent) 40%, rgba(255, 255, 255, 0.14));
          }
          :root:not(.dark) #education .other-cert-card:hover,
          html:not(.dark) #education .other-cert-card:hover,
          body:not(.dark) #education .other-cert-card:hover {
            border-color: color-mix(in srgb, var(--accent) 40%, rgba(0, 0, 0, 0.1));
          }
        }

        /* Stamp Animation: scale 1.7 to 1, rotate -18 to -8 over 520ms */
        @keyframes verified-stamp-drop {
          0% {
            opacity: 0;
            transform: scale(1.7) rotate(-18deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(-8deg);
          }
        }
        @keyframes verified-ring-pulse {
          0% {
            transform: scale(1);
            opacity: 0.9;
          }
          100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }
        .verified-seal-stamped {
          animation: verified-stamp-drop 520ms cubic-bezier(0.2, 1.4, 0.4, 1) forwards;
        }
        .verified-pulse-ring {
          animation: verified-ring-pulse 600ms cubic-bezier(0.2, 1.4, 0.4, 1) 500ms forwards;
        }

        /* Modal Opening Animation */
        @keyframes modal-scale-in {
          0% {
            opacity: 0;
            transform: scale(0.96);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal-content-animated {
          animation: modal-scale-in 250ms ease-out forwards;
        }

        /* Responsive Overrides */
        @media (max-width: 599px) {
          .featured-seal-container {
            width: 84px !important;
            height: 84px !important;
            bottom: -16px !important;
            right: -16px !important;
          }
          .featured-seal-container > div {
            width: 84px !important;
            height: 84px !important;
          }
          .featured-seal-container svg {
            width: 84px !important;
            height: 84px !important;
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .edu-blob-1,
          .edu-blob-2,
          .edu-silk-highlight {
            animation: none !important;
          }
          .verified-seal-stamped {
            animation: none !important;
            opacity: 1 !important;
            transform: scale(1) rotate(-8deg) !important;
          }
          .verified-pulse-ring {
            display: none !important;
          }
          .edu-task-item {
            transform: none !important;
            transition: none !important;
          }
          .modal-content-animated {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .timeline-progress-bar {
            transition: none !important;
            transform: scaleX(1) !important;
          }
          .other-cert-card:hover {
            transform: none !important;
          }
        }
      `}</style>

      {/* Ambient background decoration */}
      <div
        aria-hidden="true"
        className="edu-blob-1 pointer-events-none absolute -top-12 -right-12 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full"
        style={{
          background: "var(--blob-color)",
          filter: "blur(80px)",
          opacity: 0.05,
        }}
      />
      <div
        aria-hidden="true"
        className="edu-blob-2 pointer-events-none absolute -bottom-16 -left-16 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full"
        style={{
          background: "var(--blob-color)",
          filter: "blur(80px)",
          opacity: 0.05,
        }}
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full select-none"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
      >
        <path
          d="M -50,150 Q 500,450 1050,850"
          fill="none"
          stroke="var(--streak-color)"
          strokeWidth="1.2"
          opacity="0.18"
        />
        <path
          d="M -50,150 Q 500,450 1050,850"
          fill="none"
          stroke="var(--streak-color)"
          strokeWidth="1.2"
          strokeDasharray="100 1200"
          className="edu-silk-highlight"
        />
      </svg>

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-12">
        {/* Header Stack with exact gaps: label -> 20px -> headline -> 16px -> subtitle -> 28px -> counter -> 56px */}
        <div className="flex flex-col items-start" style={{ marginBottom: "56px" }}>
          {/* Label */}
          <div style={{ marginBottom: "20px" }}>
            <p className="label">EDUCATION & CERTIFICATIONS</p>
          </div>

          {/* Headline */}
          <h2
            className="font-extrabold tracking-tight text-foreground"
            style={{
              fontSize: "clamp(2.25rem, 4.6vw, 4rem)",
              lineHeight: 1.05,
              maxWidth: "20ch",
              textWrap: "balance",
              marginBottom: "16px",
            }}
          >
            Learning, backed by proof.
          </h2>

          {/* Subtitle */}
          <p
            className="text-muted-foreground text-base sm:text-lg"
            style={{ marginBottom: "28px" }}
          >
            A degree in progress and the certificates I have completed.
          </p>

          {/* Computed Monospace Counter Line */}
          <p
            className="font-mono text-[12px] uppercase text-foreground"
            style={{
              letterSpacing: "0.18em",
              opacity: 0.55,
            }}
          >
            {counterText}
          </p>
        </div>

        {/* Content Container: Stacks three blocks with 40px gaps */}
        <div className="flex flex-col gap-10">
          {/* BLOCK A: EDUCATION STRIP */}
          {educationList.map((edu) => (
            <div key={edu.id} className="edu-glass-row relative w-full rounded-[28px] p-7">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_280px] gap-6 md:gap-8 items-center">
                {/* Monogram */}
                <div
                  className="edu-monogram font-extrabold leading-none select-none tracking-[-0.05em]"
                  style={{
                    fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                  }}
                >
                  {edu.monogram}
                </div>

                {/* Details */}
                <div className="flex flex-col items-start min-w-0">
                  <h3
                    className="font-extrabold tracking-tight text-foreground leading-tight"
                    style={{
                      fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
                    }}
                  >
                    {edu.degree}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base mt-1">
                    <span className="font-mono">@</span> {edu.school}
                  </p>
                  <p className="text-[13px] text-muted-foreground mt-0.5">{edu.location}</p>

                  {/* Status Chip with pulsing white dot */}
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-foreground/14 text-foreground bg-foreground/5">
                    {edu.status === "In progress" && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
                      </span>
                    )}
                    <span>{edu.status}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="w-full flex flex-col justify-center pt-4 md:pt-0">
                  <div className="flex items-center justify-between font-mono text-xs text-muted-foreground mb-2">
                    <span>{edu.start}</span>
                    <span className="font-bold text-foreground">{edu.end ? edu.end : "NOW"}</span>
                  </div>

                  {/* Horizontal 2px Line */}
                  <div className="relative w-full h-[2px] bg-foreground/16 rounded-full overflow-visible">
                    {/* Progress Layer: draws left to right over 1.4s */}
                    <div
                      className="timeline-progress-bar absolute inset-y-0 left-0 bg-foreground rounded-full"
                      style={{
                        width: "100%",
                        transformOrigin: "left center",
                        transform: timelineInView ? "scaleX(1)" : "scaleX(0)",
                        transition: "transform 1.4s cubic-bezier(0, 0, 0.2, 1)",
                      }}
                    >
                      {/* Pulsing 8px dot at the end when end is empty */}
                      {(!edu.end || edu.end === "") && (
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 flex h-2 w-2 -mr-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* BLOCK B: FEATURED CERTIFICATE */}
          {featuredCertificate && (
            <FeaturedCertificateCard
              cert={featuredCertificate}
              index={certificatesList.findIndex((c) => c.id === featuredCertificate.id)}
              onOpenLightbox={handleOpenLightbox}
            />
          )}

          {/* BLOCK C: OTHER CERTIFICATES */}
          {otherCertificates.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {otherCertificates.map((cert) => (
                <OtherCertificateCard
                  key={cert.id}
                  cert={cert}
                  index={certificatesList.findIndex((c) => c.id === cert.id)}
                  onOpenLightbox={handleOpenLightbox}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* LIGHTBOX VIEWER MODAL */}
      {activeCertificate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Certificate viewer"
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(0, 0, 0, 0.82)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseLightbox();
            }
          }}
        >
          {/* Controls: Close Button (top right) */}
          <button
            type="button"
            aria-label="Close certificate viewer"
            onClick={handleCloseLightbox}
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Controls: Previous Button (side) */}
          <button
            type="button"
            aria-label="Previous certificate"
            onClick={handlePrev}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Controls: Next Button (side) */}
          <button
            type="button"
            aria-label="Next certificate"
            onClick={handleNext}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="modal-content-animated relative flex flex-col items-center max-w-[92vw] max-h-[84vh]">
            {/* Certificate Image Frame with 2x Zoom */}
            <div
              className={`relative overflow-hidden rounded-[14px] select-none ${
                isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onPointerMove={handleZoomMove}
              onClick={() => setIsZoomed((prev) => !prev)}
            >
              <img
                src={activeCertificate.image}
                alt={`Certificate of completion: ${activeCertificate.title}, ${activeCertificate.platform}`}
                className="max-w-[92vw] max-h-[74vh] object-contain rounded-[14px] block"
                style={{
                  transform: isZoomed
                    ? `scale(2) translate(${zoomPan.x}%, ${zoomPan.y}%)`
                    : "scale(1) translate(0, 0)",
                  transition: isZoomed ? "transform 100ms ease-out" : "transform 250ms ease-out",
                  transformOrigin: "center center",
                }}
              />
            </div>

            {/* Footer Stack: Title & Date, Counter, and Open Original */}
            <div className="w-full mt-3 flex flex-wrap items-center justify-between gap-3 text-[13px] text-white/80 px-1">
              <div className="flex flex-col">
                <span className="font-semibold text-white">{activeCertificate.title}</span>
                <span className="font-mono text-xs text-white/60">
                  {activeCertificate.issuer} · {activeCertificate.date}
                </span>
              </div>

              <div className="flex items-center gap-4">
                {activeCertificate.credentialUrl && (
                  <a
                    href={activeCertificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>Open original</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {/* Counter */}
                <span className="font-mono text-xs text-white/60">
                  {(activeCertIndex ?? 0) + 1} / {certificatesList.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
