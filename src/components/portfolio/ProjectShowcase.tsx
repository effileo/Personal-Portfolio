import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { profile } from "@/data/profile";
import { ProjectCard } from "./ProjectCard";
import { SectionLabel } from "./Sections";
import { cn } from "@/lib/utils";

const n = projects.length;
const pad = (i: number) => String(i).padStart(2, "0");

// Spacing between cards along the arc: 62vh between standard landscape cards,
// increased to 78vh when next to a taller portrait card to prevent overlapping.
function getCardStep(fromIdx: number): number {
  const p1 = projects[fromIdx]?.imageOrientation === "portrait";
  const p2 = projects[fromIdx + 1]?.imageOrientation === "portrait";
  return p1 || p2 ? 78 : 62;
}

function getYOffset(fromIdx: number, toIdx: number): number {
  if (fromIdx === toIdx) return 0;
  let sum = 0;
  if (toIdx > fromIdx) {
    for (let k = fromIdx; k < toIdx; k++) {
      sum += getCardStep(k);
    }
    return sum;
  } else {
    for (let k = toIdx; k < fromIdx; k++) {
      sum += getCardStep(k);
    }
    return -sum;
  }
}

function Details({ p, align = "left" }: { p: Project; align?: "left" | "center" }) {
  const isCenter = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col",
        isCenter ? "items-center text-center" : "items-start text-left",
      )}
    >
      <span className="inline-block rounded-full border border-border px-4 py-1.5 text-xs text-foreground">
        {p.category}
      </span>
      <h3 className="display mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl xl:text-5xl leading-tight">
        {p.title}
      </h3>
      <p
        className={cn("mt-5 max-w-lg leading-relaxed text-muted-foreground", isCenter && "mx-auto")}
      >
        {p.description}
      </p>
      <div className={cn("mt-6 flex flex-wrap gap-2", isCenter && "justify-center")}>
        {p.techStack.map((t) => (
          <span
            key={t}
            className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-foreground"
          >
            {t}
          </span>
        ))}
      </div>
      <div className={cn("mt-8 flex flex-wrap gap-3", isCenter && "justify-center")}>
        {p.liveUrl ? (
          <a href={p.liveUrl} target="_blank" rel="noreferrer" className="pill-solid">
            Visit Live Site <ArrowRight className="h-4 w-4" />
          </a>
        ) : null}
        {p.repoUrl ? (
          <a
            href={p.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="pill-ghost text-foreground"
          >
            View Code
          </a>
        ) : null}
        {p.link && (
          <a href={p.link.url} target="_blank" rel="noopener noreferrer" className="pill-solid">
            {p.link.label} <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}

const mobileCardVariants = {
  enter: (dir: number) => ({
    y: dir > 0 ? 60 : dir < 0 ? -60 : 0,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      y: { type: "spring", stiffness: 280, damping: 28 },
      opacity: { duration: 0.22 },
      scale: { duration: 0.22 },
    },
  },
  exit: (dir: number) => ({
    y: dir > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.96,
    transition: {
      y: { type: "spring", stiffness: 280, damping: 28 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  }),
};

export function ProjectShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);
  const [mobileDir, setMobileDir] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  const go = useCallback((i: number) => {
    const el = ref.current;
    if (!el) return;
    const idx = Math.max(0, Math.min(n - 1, i));
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + (span * (idx + 0.5)) / n, behavior: "smooth" });
  }, []);

  const goMobile = useCallback(
    (nextIdx: number) => {
      const bounded = Math.max(0, Math.min(n - 1, nextIdx));
      if (bounded === mobileActive) return;
      setMobileDir(bounded > mobileActive ? 1 : -1);
      setMobileActive(bounded);
    },
    [mobileActive],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top > 1 || r.bottom < window.innerHeight - 1) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        go(active + 1);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        go(active - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  return (
    <section id="work" className="border-t border-border">
      {/* Desktop sticky wheel */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: `${n * 90 + 10}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* Wheel */}
          <div className="relative h-full w-[52%]">
            <p className="label absolute left-1/2 top-10 z-10 -translate-x-1/2 whitespace-nowrap text-muted-foreground">
              Scroll down to spin through projects
            </p>
            <svg
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
              aria-hidden
            >
              <path
                d="M 10 -10 Q 70 50 10 110"
                fill="none"
                stroke="currentColor"
                className="text-border"
                strokeDasharray="1 1.5"
                strokeWidth="0.25"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {projects.map((p, i) => {
              const d = i - active;
              const ad = Math.abs(d);
              return (
                <motion.div
                  key={p.title}
                  className="absolute left-[12%] top-1/2 w-[62%] cursor-pointer flex justify-center"
                  style={{ zIndex: 10 - ad, pointerEvents: ad > 1 ? "none" : "auto" }}
                  initial={false}
                  animate={{
                    y: `calc(-50% + ${getYOffset(active, i)}vh)`,
                    x: `${-ad * ad * 8 + (ad === 0 ? 8 : 0)}%`,
                    rotate: d * 14 - (ad === 0 ? 3 : 0),
                    scale: ad === 0 ? 1 : 0.78,
                    opacity: ad === 0 ? 1 : ad === 1 ? 0.4 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 22 }}
                  onClick={() => go(i)}
                >
                  <ProjectCard project={p} active={ad === 0} />
                </motion.div>
              );
            })}
            {/* connector */}
            <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center">
              <span className="h-px w-16 bg-foreground" />
              <span className="h-3 w-3 rounded-full border-2 border-foreground bg-background" />
            </div>
          </div>

          {/* Details */}
          <div className="relative flex h-full w-[48%] flex-col justify-center pl-12 pr-16 pt-24 pb-20">
            <SectionLabel>Selected Work</SectionLabel>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <Details p={projects[active]} />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-12 right-16 flex items-center gap-4">
              <span className="text-xs text-muted-foreground">
                ✦ Scroll down to browse projects
              </span>
              <span className="text-sm font-semibold tabular-nums text-foreground">
                {pad(active + 1)} / {pad(n)}
              </span>
              <button
                aria-label="Previous project"
                onClick={() => go(active - 1)}
                disabled={active === 0}
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition hover:bg-primary hover:text-primary-foreground disabled:opacity-30"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                aria-label="Next project"
                onClick={() => go(active + 1)}
                disabled={active === n - 1}
                className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground transition hover:opacity-80 disabled:opacity-30"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile vertical showcase */}
      <div className="py-20 lg:hidden">
        <div className="px-6 text-center sm:px-12">
          <SectionLabel>Selected Work</SectionLabel>
          <h2 className="display text-4xl sm:text-5xl text-foreground">Projects.</h2>
          <p className="mt-2 text-xs text-muted-foreground">Swipe or use arrows to navigate</p>
        </div>

        <div className="mt-8 px-6 sm:px-12">
          <div className="mx-auto w-full max-w-lg">
            {/* Top peek of previous card */}
            {mobileActive > 0 ? (
              <button
                type="button"
                onClick={() => goMobile(mobileActive - 1)}
                aria-label="Previous project"
                className="group relative mb-2.5 h-7 w-full overflow-hidden rounded-2xl border border-border/40 bg-surface/50 opacity-40 transition-opacity hover:opacity-80 focus-visible:outline-none"
              >
                <div className="absolute inset-x-0 bottom-0 flex h-20 items-end justify-center pb-0.5 opacity-50">
                  <img
                    src={projects[mobileActive - 1].image}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover object-bottom"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </button>
            ) : (
              <div className="mb-2.5 h-7" aria-hidden="true" />
            )}

            {/* Currently visible centered card */}
            <div className="relative overflow-hidden py-1 w-full flex justify-center">
              <AnimatePresence mode="wait" custom={mobileDir}>
                <motion.div
                  key={mobileActive}
                  custom={mobileDir}
                  variants={mobileCardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.y < -40 || info.velocity.y < -250) {
                      goMobile(mobileActive + 1);
                    } else if (info.offset.y > 40 || info.velocity.y > 250) {
                      goMobile(mobileActive - 1);
                    }
                  }}
                  className="w-full flex justify-center cursor-grab active:cursor-grabbing"
                >
                  <ProjectCard project={projects[mobileActive]} active />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Centered project details */}
            <AnimatePresence mode="wait" custom={mobileDir}>
              <motion.div
                key={mobileActive}
                initial={{ opacity: 0, y: mobileDir > 0 ? 14 : -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: mobileDir > 0 ? -14 : 14 }}
                transition={{ duration: 0.25 }}
                className="mt-6 w-full"
              >
                <Details p={projects[mobileActive]} align="center" />
              </motion.div>
            </AnimatePresence>

            {/* Up / Down navigation arrows */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => goMobile(mobileActive - 1)}
                disabled={mobileActive === 0}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-foreground transition hover:bg-foreground hover:text-background disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <span className="text-xs font-semibold tabular-nums text-foreground/80 px-2">
                {pad(mobileActive + 1)} / {pad(n)}
              </span>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => goMobile(mobileActive + 1)}
                disabled={mobileActive === n - 1}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-foreground transition hover:bg-foreground hover:text-background disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-24 pt-8">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="pill-ghost text-foreground"
        >
          <Github className="h-4 w-4" /> View all on GitHub
        </a>
      </div>
    </section>
  );
}
