import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Quote, Target } from "lucide-react";
import { SiC, SiPython, SiTypescript } from "react-icons/si";
import { profile } from "@/data/profile";

const heroIcons = [SiTypescript, SiPython, SiC];

// SVG SMIL S-Curve path variants (A -> B -> C -> A)
const PATH_A = "M 50 0 C 54 18, 46 34, 51 50 S 47 82, 50 100 L 100 100 L 100 0 Z";
const PATH_B = "M 51 0 C 47 20, 54 36, 49 52 S 53 80, 50 100 L 100 100 L 100 0 Z";
const PATH_C = "M 49 0 C 53 16, 47 38, 52 48 S 46 84, 51 100 L 100 100 L 100 0 Z";
const PATH_VALUES = `${PATH_A}; ${PATH_B}; ${PATH_C}; ${PATH_A}`;

const STROKE_A = "M 50 0 C 54 18, 46 34, 51 50 S 47 82, 50 100";
const STROKE_B = "M 51 0 C 47 20, 54 36, 49 52 S 53 80, 50 100";
const STROKE_C = "M 49 0 C 53 16, 47 38, 52 48 S 46 84, 51 100";
const STROKE_VALUES = `${STROKE_A}; ${STROKE_B}; ${STROKE_C}; ${STROKE_A}`;

export function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const flowSvgDesktopRef = useRef<SVGSVGElement>(null);
  const flowSvgMobileRef = useRef<SVGSVGElement>(null);

  // 1) PERFORMANCE: IntersectionObserver toggles "hero-paused" & SMIL pauseAnimations
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        if (isVisible) {
          hero.classList.remove("hero-paused");
          [flowSvgDesktopRef.current, flowSvgMobileRef.current].forEach((svg) => {
            if (svg && typeof svg.unpauseAnimations === "function") {
              try {
                svg.unpauseAnimations();
              } catch {
                /* ignore */
              }
            }
          });
        } else {
          hero.classList.add("hero-paused");
          [flowSvgDesktopRef.current, flowSvgMobileRef.current].forEach((svg) => {
            if (svg && typeof svg.pauseAnimations === "function") {
              try {
                svg.pauseAnimations();
              } catch {
                /* ignore */
              }
            }
          });
        }
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // 2) SCROLL FLOW: Light parallax for ribbons and blobs
  useEffect(() => {
    if (reduce) return;
    const isTouch = window.matchMedia("(pointer: coarse), (hover: none)").matches;
    if (isTouch) return;

    const hero = heroRef.current;
    if (!hero) return;

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const heroH = hero.offsetHeight || window.innerHeight;
        const scrollY = window.scrollY;
        const progress = Math.min(1, Math.max(0, scrollY / heroH));

        hero.style.setProperty("--ribbon-parallax", `${(-40 * progress).toFixed(1)}px`);
        hero.style.setProperty("--blob-parallax", `${(-70 * progress).toFixed(1)}px`);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce]);

  // 3) SPECULAR FOLLOW: Delegated pointermove listener on the hero
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const target = (e.target as HTMLElement).closest(".glass, .glass-light");
    if (target instanceof HTMLElement) {
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${(e.clientX - rect.left).toFixed(1)}px`);
      target.style.setProperty("--my", `${(e.clientY - rect.top).toFixed(1)}px`);
    }
  };

  // 4) LIQUID BUTTON: Set enter & leave coordinates
  const handleLiquidButtonCoords = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--bx", `${(e.clientX - rect.left).toFixed(1)}px`);
    e.currentTarget.style.setProperty("--by", `${(e.clientY - rect.top).toFixed(1)}px`);
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      className="relative w-full overflow-hidden bg-[#F5F5F5]"
      style={{ isolation: "isolate" }}
    >
      {/* Scoped Liquid Glass Design System Styles */}
      <style>{`
        #home {
          --pw: min(78vw, 400px);
          --ribbon-parallax: 0px;
          --blob-parallax: 0px;
          position: relative;
          width: 100%;
          overflow: hidden;
          isolation: isolate;
        }
        @media (min-width: 768px) {
          #home {
            --pw: min(70vw, 460px);
          }
        }
        @media (min-width: 1100px) {
          #home {
            --pw: clamp(320px, min(34vw, 48vh), 600px);
            height: 100svh;
            min-height: 700px;
          }
        }

        .hero-desktop-wrapper {
          display: none;
        }
        .hero-stacked-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        @media (min-width: 1100px) {
          .hero-desktop-wrapper {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
          }
          .hero-stacked-wrapper {
            display: none;
          }
        }

        @media (min-width: 1920px) {
          .hero-desktop-container {
            max-width: 1600px;
            margin-left: auto;
            margin-right: auto;
          }
        }

        /* 5) LIQUID GLASS RECIPES */
        .glass {
          background: linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.05));
          backdrop-filter: blur(22px) saturate(150%);
          -webkit-backdrop-filter: blur(22px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.28);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(255,255,255,0.08), 0 18px 40px rgba(0,0,0,0.22);
          position: relative;
          overflow: hidden;
        }

        .glass-light {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(22px) saturate(150%);
          -webkit-backdrop-filter: blur(22px) saturate(150%);
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 30px rgba(0,0,0,0.08);
          position: relative;
          overflow: hidden;
        }

        @supports not (backdrop-filter: blur(1px)) {
          .glass {
            background: rgba(26,26,26,0.85);
          }
          .glass-light {
            background: rgba(255,255,255,0.9);
          }
        }

        /* Specular follow on hover */
        .glass::after,
        .glass-light::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle 120px at var(--mx, -200px) var(--my, -200px), rgba(255,255,255,0.28), transparent 70%);
          opacity: 0;
          transition: opacity 250ms ease;
          border-radius: inherit;
        }

        @media (hover: hover) and (pointer: fine) {
          .glass:hover::after,
          .glass-light:hover::after {
            opacity: 1;
          }
        }

        /* Floating Cards */
        @keyframes float-badge {
          0% { transform: translateY(0); }
          100% { transform: translateY(-8px); }
        }
        @keyframes float-quote {
          0% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
        .float-badge {
          animation: float-badge 7s ease-in-out infinite alternate;
        }
        .float-quote {
          animation: float-quote 9s ease-in-out infinite alternate;
        }

        /* 2) LIGHT BLOBS KEYFRAMES */
        @keyframes blob-drift-1 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(8vw, 6vw, 0) scale(1.12); }
        }
        @keyframes blob-drift-2 {
          0% { transform: translate3d(0, 0, 0) scale(1.08); }
          100% { transform: translate3d(-7vw, 8vw, 0) scale(0.92); }
        }
        @keyframes blob-drift-3 {
          0% { transform: translate3d(0, 0, 0) scale(0.95); }
          100% { transform: translate3d(6vw, -7vw, 0) scale(1.15); }
        }
        @keyframes blob-drift-4 {
          0% { transform: translate3d(0, 0, 0) scale(1.1); }
          100% { transform: translate3d(-8vw, -5vw, 0) scale(0.9); }
        }

        .blob-1 { animation: blob-drift-1 18s ease-in-out infinite alternate; will-change: transform; }
        .blob-2 { animation: blob-drift-2 22s ease-in-out infinite alternate; will-change: transform; }
        .blob-3 { animation: blob-drift-3 26s ease-in-out infinite alternate; will-change: transform; }
        .blob-4 { animation: blob-drift-4 30s ease-in-out infinite alternate; will-change: transform; }

        /* 3) SILK RIBBONS KEYFRAMES */
        @keyframes dash-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1480; }
        }
        .ribbon-1 { animation: dash-flow 18s linear infinite; }
        .ribbon-2 { animation: dash-flow 22s linear infinite; }
        .ribbon-3 { animation: dash-flow 26s linear infinite; }

        @keyframes ribbon-drift {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(14px, 0, 0); }
        }
        .ribbons-svg {
          animation: ribbon-drift 20s ease-in-out infinite alternate;
          will-change: transform;
        }


        /* 6) LIQUID BUTTON HOVER */
        .liquid-btn {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          background: #151515;
          color: #FFFFFF;
          border: 1px solid #151515;
          transition: border-color 300ms ease, color 300ms ease, box-shadow 250ms ease, transform 200ms ease;
        }
        .liquid-btn::before {
          content: "";
          position: absolute;
          left: var(--bx, 50%);
          top: var(--by, 50%);
          width: 140px;
          height: 140px;
          margin-left: -70px;
          margin-top: -70px;
          border-radius: 50%;
          background: #FFFFFF;
          transform: scale(0);
          transition: transform 450ms cubic-bezier(0.65, 0, 0.35, 1);
          pointer-events: none;
          z-index: 1;
        }
        .liquid-btn:hover::before {
          transform: scale(3.2);
        }
        .liquid-btn:hover {
          color: #000000;
          border-color: #000000;
          transform: translateY(-2px);
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.25);
        }
        .liquid-btn > * {
          position: relative;
          z-index: 2;
          transition: color 300ms ease;
        }
        .liquid-btn:hover > * {
          color: #000000;
        }

        /* PERFORMANCE: Paused state when off-screen */
        .hero-paused *,
        .hero-paused *::before,
        .hero-paused *::after {
          animation-play-state: paused !important;
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* ========================================================
          DESKTOP LAYOUT (1100px and wider)
          ======================================================== */}
      <div className="hero-desktop-wrapper">
        {/* Layer 1: Base background is #F5F5F5 on #home container */}

        {/* Layer 2: Flowing Dark Shape SVG (S-curve around x = 50) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-1 h-full w-full"
          style={{ filter: "drop-shadow(-18px 0 36px rgba(0,0,0,0.14))" }}
        >
          <svg
            ref={flowSvgDesktopRef}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            {/* Flowing dark near-black (#1A1A1A) shape */}
            <path d={PATH_A} fill="#1A1A1A">
              {!reduce && (
                <animate
                  attributeName="d"
                  dur="16s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.33;0.66;1"
                  keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
                  values={PATH_VALUES}
                />
              )}
            </path>
            {/* 1px White highlight along seam */}
            <path
              d={STROKE_A}
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              vectorEffect="non-scaling-stroke"
            >
              {!reduce && (
                <animate
                  attributeName="d"
                  dur="16s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.33;0.66;1"
                  keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
                  values={STROKE_VALUES}
                />
              )}
            </path>
          </svg>
        </div>

        {/* Layer 3: Light Blobs (mix-blend-mode: difference) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-2 overflow-hidden"
          style={{
            mixBlendMode: "difference",
            transform: "translateY(var(--blob-parallax, 0px))",
            transition: "transform 100ms linear",
          }}
        >
          {/* Blob 1: 38vw */}
          <div
            className="blob-1 absolute rounded-full bg-[#FFFFFF]"
            style={{
              width: "38vw",
              height: "38vw",
              top: "-12vw",
              left: "-8vw",
              filter: "blur(70px)",
              opacity: 0.09,
            }}
          />
          {/* Blob 2: 30vw */}
          <div
            className="blob-2 absolute rounded-full bg-[#FFFFFF]"
            style={{
              width: "30vw",
              height: "30vw",
              top: "-4vw",
              right: "-6vw",
              filter: "blur(70px)",
              opacity: 0.09,
            }}
          />
          {/* Blob 3: 26vw */}
          <div
            className="blob-3 absolute rounded-full bg-[#FFFFFF]"
            style={{
              width: "26vw",
              height: "26vw",
              bottom: "-8vw",
              left: "14vw",
              filter: "blur(70px)",
              opacity: 0.09,
            }}
          />
          {/* Blob 4: 20vw */}
          <div
            className="blob-4 absolute rounded-full bg-[#FFFFFF]"
            style={{
              width: "20vw",
              height: "20vw",
              bottom: "-2vw",
              right: "8vw",
              filter: "blur(70px)",
              opacity: 0.09,
            }}
          />
        </div>

        {/* Layer 4: Silk Ribbons (mix-blend-mode: difference) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-3 overflow-hidden"
          style={{
            mixBlendMode: "difference",
            transform: "translateY(var(--ribbon-parallax, 0px))",
            transition: "transform 100ms linear",
          }}
        >
          <svg
            viewBox="0 0 1440 800"
            preserveAspectRatio="xMidYMid slice"
            className="ribbons-svg h-full w-full"
          >
            <path
              d="M -100 620 C 280 420, 520 760, 860 520 S 1300 220, 1560 340"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeDasharray="380 1100"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              opacity="0.35"
              className="ribbon-1"
            />
            <path
              d="M -100 700 C 300 520, 560 820, 900 600 S 1320 320, 1560 430"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeDasharray="380 1100"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              opacity="0.35"
              className="ribbon-2"
            />
            <path
              d="M -100 540 C 260 340, 500 700, 820 440 S 1280 140, 1560 260"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeDasharray="380 1100"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              opacity="0.35"
              className="ribbon-3"
            />
          </svg>
        </div>

        {/* Content container (capped to 1600px centered on screens > 1920px) */}
        <div className="hero-desktop-container relative z-10 h-full w-full">
          {/* Layer 5: Portrait Wrapper: exactly centered on split line at z-10 */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "-4%",
              width: "var(--pw)",
              zIndex: 10,
            }}
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "relative",
                width: "100%",
                filter: "drop-shadow(-20px 0 40px rgba(0,0,0,0.15))",
              }}
            >
              <img
                src="/assets/portrait_no_background.png"
                alt="Fita Alemayehu, full-stack software engineer"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width={933}
                height={1685}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  maxWidth: "none",
                  border: "none",
                  background: "transparent",
                }}
              />
            </motion.div>
          </div>

          {/* Layer 6: Left Text Column (z-20) */}
          <div
            style={{
              paddingLeft: "6vw",
              paddingTop: "96px",
              maxWidth: "min(520px, calc(50vw - 6vw - (var(--pw) * 0.42) - 24px))",
              zIndex: 20,
            }}
            className="relative flex h-full flex-col justify-center"
          >
            {/* 1. Target icon + Name on ONE single line */}
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(2rem, 2.9vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
              }}
              className="flex items-center gap-3 uppercase text-[#151515] leading-none"
            >
              <Target className="h-7 w-7 shrink-0 text-[#151515]" strokeWidth={2.5} aria-hidden />
              <span>FITA ALEMAYEHU</span>
            </motion.h1>

            {/* 2. Tagline */}
            <p className="mt-3 text-[1.3rem] font-bold leading-snug tracking-tight text-[#151515] line-clamp-2">
              {profile.tagline}
            </p>

            {/* 3. Gray paragraph */}
            <p className="mt-3.5 max-w-90 text-[1rem] leading-[1.7] text-[#555555]">
              {profile.intro}
            </p>

            {/* 4. Two buttons: Liquid solid button + Glass-light button */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                onMouseEnter={handleLiquidButtonCoords}
                onMouseLeave={handleLiquidButtonCoords}
                className="liquid-btn inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[0.85rem] font-semibold shadow-soft"
              >
                <span>SEE MY WORK</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="glass-light inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[0.85rem] font-medium text-[#151515] transition duration-200 hover:-translate-y-0.5"
              >
                <span>Get in touch</span>
              </a>
            </div>

            {/* 5. Divider line + glass-light tech chips + degree label */}
            <div className="mt-6 border-t border-black/10 pt-5">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex -space-x-2">
                  {heroIcons.map((Icon, i) => (
                    <span
                      key={i}
                      className="glass-light grid h-9 w-9 place-items-center rounded-full text-[#151515]"
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                  ))}
                  <span className="glass-light grid h-9 w-9 place-items-center rounded-full text-[10px] font-semibold text-[#151515]">
                    +5
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#151515]">{profile.degreeLine}</div>
                  <div className="text-xs text-[#666666]">{profile.degreeSub}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 7: Right Floating Badge ("AVAILABLE FOR") */}
          <div
            style={{
              position: "absolute",
              top: "22%",
              right: "6.5vw",
              maxWidth: "min(320px, calc(50vw - 6.5vw - (var(--pw) * 0.42) - 24px))",
              zIndex: 20,
            }}
            className="flex flex-col items-end gap-3"
          >
            <div className="glass float-badge w-fit rounded-full px-5 py-3 text-white">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white/70">
                <span className="h-2 w-2 rounded-full bg-[#22c55e]" /> {profile.availability.label}
              </div>
              <div className="mt-0.5 text-sm font-semibold text-white">
                {profile.availability.value}
              </div>
            </div>
          </div>

          {/* Layer 7: Right Floating Quote Card (Glass, white text, 60% divider/icon) */}
          <figure
            className="glass float-quote text-white"
            style={{
              position: "absolute",
              top: "55%",
              right: "6.5vw",
              width: "100%",
              maxWidth: "min(320px, calc(50vw - 6.5vw - (var(--pw) * 0.42) - 24px))",
              padding: "24px",
              borderRadius: "24px",
              zIndex: 20,
            }}
          >
            <Quote className="h-5 w-5 text-white/60" />
            <blockquote className="mt-3 text-sm font-medium leading-relaxed text-white">
              {profile.quote}
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3 border-t border-white/60 pt-4">
              <img
                src="/assets/portrait_no_background.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-full bg-white/10 object-cover object-top ring-1 ring-white"
              />
              <div>
                <div className="text-sm font-semibold text-white">{profile.name}</div>
                <div className="text-xs text-white/70">{profile.role}</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* ========================================================
          TABLET AND MOBILE LAYOUT (below 1100px)
          ======================================================== */}
      <div className="hero-stacked-wrapper">
        {/* 1. TEXT BLOCK on light background (#F5F5F5) with two soft blobs visible */}
        <div className="relative w-full overflow-hidden bg-[#F5F5F5] px-6 md:px-8 pt-24 pb-12">
          {/* Two subtle blobs behind text */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ mixBlendMode: "difference" }}
          >
            <div
              className="blob-1 absolute rounded-full bg-[#FFFFFF]"
              style={{
                width: "50vw",
                height: "50vw",
                top: "-10vw",
                left: "-15vw",
                filter: "blur(60px)",
                opacity: 0.08,
              }}
            />
            <div
              className="blob-2 absolute rounded-full bg-[#FFFFFF]"
              style={{
                width: "45vw",
                height: "45vw",
                bottom: "-10vw",
                right: "-10vw",
                filter: "blur(60px)",
                opacity: 0.08,
              }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-140">
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(1.75rem, 8vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
              className="flex items-center gap-2.5 uppercase text-[#151515] leading-tight whitespace-normal md:whitespace-nowrap"
            >
              <Target className="h-6 w-6 shrink-0 text-[#151515]" strokeWidth={2.5} aria-hidden />
              <span>FITA ALEMAYEHU</span>
            </motion.h1>

            <p className="mt-3 text-[1.25rem] md:text-[1.3rem] font-bold leading-snug tracking-tight text-[#151515]">
              {profile.tagline}
            </p>

            <p className="mt-3.5 max-w-140 text-[1rem] leading-[1.7] text-[#555555]">
              {profile.intro}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                onMouseEnter={handleLiquidButtonCoords}
                onMouseLeave={handleLiquidButtonCoords}
                className="liquid-btn inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[0.85rem] font-semibold shadow-soft"
              >
                <span>SEE MY WORK</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="glass-light inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[0.85rem] font-medium text-[#151515] transition duration-200 hover:-translate-y-0.5"
              >
                <span>Get in touch</span>
              </a>
            </div>

            <div className="mt-6 border-t border-black/10 pt-5">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex -space-x-2">
                  {heroIcons.map((Icon, i) => (
                    <span
                      key={i}
                      className="glass-light grid h-8 w-8 md:h-9 md:w-9 place-items-center rounded-full text-[#151515]"
                    >
                      <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </span>
                  ))}
                  <span className="glass-light grid h-8 w-8 md:h-9 md:w-9 place-items-center rounded-full text-[10px] font-semibold text-[#151515]">
                    +5
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="text-xs md:text-sm font-semibold text-[#151515]">
                    {profile.degreeLine}
                  </div>
                  <div className="text-[11px] md:text-xs text-[#666666]">{profile.degreeSub}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PORTRAIT STAGE: full width, overflow hidden, flowing dark shape & highlight */}
        <div
          style={{
            height: "calc(var(--pw) * 1.65)",
          }}
          className="relative w-full overflow-hidden bg-[#F5F5F5]"
        >
          {/* Flowing Dark Shape SVG inside portrait stage */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-1 h-full w-full"
            style={{ filter: "drop-shadow(-18px 0 36px rgba(0,0,0,0.14))" }}
          >
            <svg
              ref={flowSvgMobileRef}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <path d={PATH_A} fill="#1A1A1A">
                {!reduce && (
                  <animate
                    attributeName="d"
                    dur="16s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes="0;0.33;0.66;1"
                    keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
                    values={PATH_VALUES}
                  />
                )}
              </path>
              <path
                d={STROKE_A}
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                vectorEffect="non-scaling-stroke"
              >
                {!reduce && (
                  <animate
                    attributeName="d"
                    dur="16s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes="0;0.33;0.66;1"
                    keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
                    values={STROKE_VALUES}
                  />
                )}
              </path>
            </svg>
          </div>

          {/* One Silk Ribbon across stage */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-2 overflow-hidden"
            style={{ mixBlendMode: "difference" }}
          >
            <svg
              viewBox="0 0 1440 800"
              preserveAspectRatio="xMidYMid slice"
              className="ribbons-svg h-full w-full"
            >
              <path
                d="M -100 620 C 280 420, 520 760, 860 520 S 1300 220, 1560 340"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeDasharray="380 1100"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                opacity="0.35"
                className="ribbon-1"
              />
            </svg>
          </div>

          {/* Portrait Wrapper: left 50%, translateX(-50%), top: calc(var(--pw) * 0.05), width: var(--pw) */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: "calc(var(--pw) * 0.05)",
              width: "var(--pw)",
              zIndex: 10,
            }}
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "relative",
                width: "100%",
                filter: "drop-shadow(-20px 0 40px rgba(0,0,0,0.15))",
              }}
            >
              <img
                src="/assets/portrait_no_background.png"
                alt="Fita Alemayehu, full-stack software engineer"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width={933}
                height={1685}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  maxWidth: "none",
                  border: "none",
                  background: "transparent",
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* 3. CARDS BLOCK on near-black background (#1A1A1A) with one blob behind glass cards */}
        <div className="relative w-full overflow-hidden bg-[#1A1A1A] px-6 py-8">
          {/* Subtle light blob behind cards for backdrop blur */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          >
            <div
              className="h-65 w-65 rounded-full bg-[#FFFFFF]"
              style={{ filter: "blur(60px)", opacity: 0.12 }}
            />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col md:flex-row items-center justify-center gap-4">
            {/* AVAILABLE FOR badge (glass, backdrop blur 16px) */}
            <div
              className="glass float-badge w-full max-w-90 rounded-full px-5 py-3 text-white"
              style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
            >
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white/70">
                <span className="h-2 w-2 rounded-full bg-[#22c55e]" /> {profile.availability.label}
              </div>
              <div className="mt-0.5 text-sm font-semibold text-white">
                {profile.availability.value}
              </div>
            </div>

            {/* Quote Card (glass, backdrop blur 16px) */}
            <figure
              className="glass float-quote w-full max-w-90 rounded-[24px] p-6 text-white shadow-lift"
              style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
            >
              <Quote className="h-5 w-5 text-white/60" />
              <blockquote className="mt-3 text-sm font-medium leading-relaxed text-white">
                {profile.quote}
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-white/60 pt-4">
                <img
                  src="/assets/portrait_no_background.png"
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full bg-white/10 object-cover object-top ring-1 ring-white"
                />
                <div>
                  <div className="text-sm font-semibold text-white">{profile.name}</div>
                  <div className="text-xs text-white/70">{profile.role}</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
