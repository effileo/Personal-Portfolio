import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { skills, skillsAllRow1, skillsAllRow2, type Skill } from "@/data/skills";
import { cn } from "@/lib/utils";

export function SkillFilter({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <LayoutGroup id="skill-filter">
      <div role="tablist" className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            role="tab"
            aria-selected={value === o}
            onClick={() => onChange(o)}
            className={cn(
              "relative rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
              value === o
                ? "border-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {value === o && (
              <motion.span
                layoutId="chip"
                className="absolute inset-0 rounded-full bg-primary shadow-glow"
              />
            )}
            <span className="relative">{o}</span>
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    };
  }, []);

  // Tapping anywhere outside flips back
  useEffect(() => {
    if (!isFlipped) return;
    const onDocPointerDown = (e: PointerEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsFlipped(false);
      }
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [isFlipped]);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsFlipped(true);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setIsFlipped(false);
    }, 150);
  };

  const handleFocus = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setIsFlipped(true);
  };

  const handleBlur = () => {
    setIsFlipped(false);
  };

  const handleClick = () => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    setIsFlipped((prev) => {
      const next = !prev;
      if (next) {
        touchTimerRef.current = setTimeout(() => {
          setIsFlipped(false);
        }, 3000);
      }
      return next;
    });
  };

  const isThemeAware = skill.color === "theme-aware";
  const brandStyle = {
    "--brand": isThemeAware ? "var(--foreground)" : skill.color,
  } as React.CSSProperties;

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="img"
      aria-label={skill.label}
      data-theme-aware={isThemeAware ? "true" : undefined}
      style={brandStyle}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      className={cn("skill-card-wrapper", isFlipped && "is-flipped")}
    >
      <div className="skill-card-inner">
        {/* Front Face: muted grayscale icon */}
        <div className="skill-card-face skill-card-front" aria-hidden="true">
          <Icon className="skill-icon-front" />
        </div>

        {/* Back Face: brand colored icon and label */}
        <div className="skill-card-face skill-card-back" aria-hidden="true">
          <Icon className="skill-icon-back" />
          <span
            className={cn("skill-card-label", skill.label.length > 20 && "skill-card-label-long")}
          >
            {skill.label}
          </span>
        </div>
      </div>
    </div>
  );
}

function fillTo(items: Skill[], min = 12): Skill[] {
  if (!items.length) return [];
  const out: Skill[] = [];
  while (out.length < min) {
    out.push(...items);
  }
  return out;
}

function Row({ items, dir }: { items: Skill[]; dir: "left" | "right" }) {
  const base = useMemo(() => fillTo(items, 12), [items]);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const updateSpeed = () => {
      // The track contains 2 copies of base. The distance moved (-50%) is exactly el.scrollWidth / 2.
      const halfWidth = el.scrollWidth / 2;
      if (halfWidth > 0) {
        const durationSec = halfWidth / 45; // 45px per second
        el.style.setProperty("--marquee-dur", `${durationSec.toFixed(2)}s`);
      }
    };

    updateSpeed();
    const ro = new ResizeObserver(updateSpeed);
    ro.observe(el);
    return () => ro.disconnect();
  }, [base]);

  return (
    <div className="marquee-pause skills-mask-x overflow-hidden py-1">
      <div
        ref={trackRef}
        className={cn(
          "skills-marquee-track",
          dir === "left" ? "skills-marquee-left" : "skills-marquee-right",
        )}
      >
        {[...base, ...base].map((s, i) => (
          <SkillCard key={`${s.name}-${dir}-${i}`} skill={s} />
        ))}
      </div>
    </div>
  );
}

export function SkillsMarquee({ filter }: { filter: string }) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { rowA, rowB } = useMemo(() => {
    if (filter === "All") {
      return {
        rowA: skillsAllRow1,
        rowB: skillsAllRow2,
      };
    }
    const filtered = skills.filter((s) => s.category === filter);
    const alt = filtered.length > 1 ? [...filtered.slice(1), ...filtered.slice(0, 1)] : filtered;
    return {
      rowA: filtered,
      rowB: alt,
    };
  }, [filter]);

  const allFilteredList = useMemo(() => {
    return filter === "All" ? skills : skills.filter((s) => s.category === filter);
  }, [filter]);

  // Edge zone detection loop (runs at ~8 checks per second when in view and tab active)
  useEffect(() => {
    if (reduce) return;
    const container = containerRef.current;
    if (!container) return;

    let inView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    const checkEdges = () => {
      if (!inView || document.hidden) return;
      const trackRect = container.getBoundingClientRect();
      if (trackRect.width <= 0) return;

      const cards = container.querySelectorAll<HTMLElement>(".skill-card-wrapper");
      if (!cards.length) return;

      const firstCard = cards[0].getBoundingClientRect();
      const cardWidth = firstCard.width || 172;
      const edgeZoneWidth = Math.max(trackRect.width * 0.12, cardWidth * 1.2);

      const leftEnd = trackRect.left + edgeZoneWidth;
      const rightStart = trackRect.right - edgeZoneWidth;

      // 1. Batch read all card centers
      const count = cards.length;
      const inEdgeStates = new Array<boolean>(count);
      for (let i = 0; i < count; i++) {
        const rect = cards[i].getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        inEdgeStates[i] =
          (center >= trackRect.left && center <= leftEnd) ||
          (center >= rightStart && center <= trackRect.right);
      }

      // 2. Batch write classes
      for (let i = 0; i < count; i++) {
        const card = cards[i];
        const hasClass = card.classList.contains("is-edge");
        if (inEdgeStates[i] && !hasClass) {
          card.classList.add("is-edge");
        } else if (!inEdgeStates[i] && hasClass) {
          card.classList.remove("is-edge");
        }
      }
    };

    const intervalId = setInterval(checkEdges, 120);

    return () => {
      clearInterval(intervalId);
      observer.disconnect();
    };
  }, [reduce]);

  if (reduce) {
    return (
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        <div className="flex flex-wrap justify-center gap-3.5">
          {allFilteredList.map((s) => (
            <SkillCard key={s.name} skill={s} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="skills-marquee-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-4"
        >
          <Row items={rowA} dir="left" />
          <Row items={rowB} dir="right" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function Skills() {
  const [filter, setFilter] = useState("All");

  return (
    <section
      id="skills"
      className="border-t border-border pb-28 md:pb-36"
      style={{
        paddingTop: "120px",
        scrollMarginTop: "110px",
      }}
    >
      <style>{`
        /* Skills section styles */
        .skills-marquee-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .skills-mask-x {
          mask-image: linear-gradient(to right, transparent 0, black 56px, black calc(100% - 56px), transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0, black 56px, black calc(100% - 56px), transparent 100%);
        }

        .skills-marquee-track {
          display: flex;
          width: max-content;
          gap: 14px;
          will-change: transform;
        }
        @media (max-width: 599px) {
          .skills-marquee-track {
            gap: 12px;
          }
        }

        .skills-marquee-left {
          animation: marquee-left var(--marquee-dur, 45s) linear infinite;
        }
        .skills-marquee-right {
          animation: marquee-right var(--marquee-dur, 45s) linear infinite;
        }

        /* 1) Smaller Cards: 172x112 desktop, 150x100 tablet, 128x88 mobile */
        .skill-card-wrapper {
          perspective: 800px;
          position: relative;
          flex-shrink: 0;
          width: 172px;
          height: 112px;
          cursor: pointer;
          user-select: none;
          outline: none;
        }
        .skill-card-wrapper:focus-visible {
          outline: 2px solid var(--foreground);
          outline-offset: 3px;
          border-radius: 22px;
        }
        @media (max-width: 1099px) {
          .skill-card-wrapper {
            width: 150px;
            height: 100px;
          }
        }
        @media (max-width: 599px) {
          .skill-card-wrapper {
            width: 128px;
            height: 88px;
          }
        }

        /* 4) Flip inner & faces */
        .skill-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 650ms cubic-bezier(0.4, 0.2, 0.2, 1);
          border-radius: 22px;
        }
        .skill-card-wrapper.is-flipped .skill-card-inner,
        .skill-card-wrapper.is-edge .skill-card-inner {
          transform: rotateY(180deg);
        }

        .skill-card-face {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 22px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* FRONT face */
        .skill-card-front {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--foreground);
        }
        .skill-icon-front {
          width: 44px;
          height: 44px;
          filter: grayscale(100%);
          opacity: 0.48;
        }
        @media (max-width: 1099px) {
          .skill-icon-front {
            width: 38px;
            height: 38px;
          }
        }
        @media (max-width: 599px) {
          .skill-icon-front {
            width: 32px;
            height: 32px;
          }
        }

        /* BACK face */
        .skill-card-back {
          transform: rotateY(180deg);
          background: color-mix(in srgb, var(--brand) 16%, var(--surface));
          border: 1px solid color-mix(in srgb, var(--brand) 55%, transparent);
          box-shadow: 0 0 28px color-mix(in srgb, var(--brand) 35%, transparent);
          padding: 8px 12px;
          gap: 6px;
          text-align: center;
        }
        .skill-icon-back {
          width: 30px;
          height: 30px;
          color: var(--brand);
          flex-shrink: 0;
        }
        .skill-card-label {
          color: var(--brand);
          font-size: 13px;
          font-weight: 600;
          line-height: 1.15;
          text-align: center;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .skill-card-label-long {
          font-size: 11.5px;
        }

        /* Theme-aware brand colors */
        .skill-card-wrapper[data-theme-aware="true"] {
          --brand: #ffffff;
        }

        /* Reduced motion overrides */
        @media (prefers-reduced-motion: reduce) {
          .skill-card-inner {
            transform: none !important;
            transition: none !important;
          }
          .skill-card-face {
            transition: opacity 200ms ease;
          }
          .skill-card-front {
            opacity: 1;
          }
          .skill-card-back {
            transform: none !important;
            opacity: 0;
            pointer-events: none;
          }
          .skill-card-wrapper:hover .skill-card-front,
          .skill-card-wrapper:focus .skill-card-front,
          .skill-card-wrapper.is-flipped .skill-card-front {
            opacity: 0;
          }
          .skill-card-wrapper:hover .skill-card-back,
          .skill-card-wrapper:focus .skill-card-back,
          .skill-card-wrapper.is-flipped .skill-card-back {
            opacity: 1;
            pointer-events: auto;
          }
          .skills-marquee-left,
          .skills-marquee-right {
            animation: none !important;
          }
        }
      `}</style>

      <div className="mx-auto mb-14 flex max-w-6xl flex-col gap-8 px-6 sm:px-12 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="display text-5xl text-foreground sm:text-6xl">Skills & Technologies</h2>
          <p className="mt-4 text-muted-foreground">
            Languages, frameworks, and tools used across client applications and backend services.
          </p>
        </div>
        <SkillFilter
          value={filter}
          onChange={setFilter}
          options={["All", "Languages", "Backend", "Frontend", "DevOps", "Fundamentals"]}
        />
      </div>
      <SkillsMarquee filter={filter} />
      <div className="mx-auto mt-24 h-px max-w-6xl bg-border" />
    </section>
  );
}
