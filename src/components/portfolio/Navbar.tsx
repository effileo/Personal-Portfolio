import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink, Download } from "lucide-react";
import { navItems } from "@/data/profile";
import { useActiveSection } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const ids = navItems.map((n) => n.id);

export function Navbar() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setResumeOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setResumeOpen(false);
    }, 180);
  };

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setResumeOpen(false);
      }
    }

    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (resumeRef.current && !resumeRef.current.contains(e.target as Node)) {
        setResumeOpen(false);
      }
    }

    if (resumeOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resumeOpen]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Main"
        className="hidden items-center gap-1 rounded-full border border-border bg-background/70 p-1.5 shadow-soft backdrop-blur-xl lg:flex"
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active === item.id
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active === item.id && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">{item.label}</span>
          </a>
        ))}

        {/* Vertical Divider matching design screenshot */}
        <div className="mx-1 h-4 w-px bg-border/80" aria-hidden="true" />

        {/* Resume Dropdown Nav Item */}
        <div
          ref={resumeRef}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            type="button"
            onClick={() => setResumeOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={resumeOpen}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              resumeOpen
                ? "text-foreground bg-muted/60"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span>Resume</span>
          </button>

          <AnimatePresence>
            {resumeOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-border bg-background/95 p-1.5 shadow-lift backdrop-blur-xl z-50 flex flex-col gap-1"
              >
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setResumeOpen(false)}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-foreground">View in New Tab</span>
                    <span className="text-[10px] text-muted-foreground">Opens PDF in browser</span>
                  </div>
                </a>
                <a
                  href="/resume.pdf"
                  download="Fita_Alemayehu_Resume.pdf"
                  onClick={() => setResumeOpen(false)}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Download className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-foreground">Download Resume</span>
                    <span className="text-[10px] text-muted-foreground">PDF (82 KB)</span>
                  </div>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <div className="w-full max-w-sm lg:hidden">
        <div className="flex items-center justify-between rounded-full border border-border bg-background/80 py-1.5 pl-5 pr-1.5 shadow-soft backdrop-blur-xl">
          <span className="text-sm font-bold tracking-tight text-foreground">FITA.</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2 flex flex-col gap-1 rounded-3xl border border-border bg-background/95 p-2 shadow-lift backdrop-blur-xl"
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-full px-4 py-2.5 text-sm font-medium",
                    active === item.id ? "bg-primary text-primary-foreground" : "text-foreground",
                  )}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Divider */}
              <div className="my-1.5 h-px w-full bg-border/60" />

              {/* Mobile Resume Options */}
              <div className="flex flex-col gap-1 px-1 pb-1">
                <span className="px-3 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Resume
                </span>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-foreground">View in New Tab</span>
                    <span className="text-[10px] text-muted-foreground">Opens PDF viewer</span>
                  </div>
                </a>
                <a
                  href="/resume.pdf"
                  download="Fita_Alemayehu_Resume.pdf"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Download className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-foreground">Download Resume</span>
                    <span className="text-[10px] text-muted-foreground">PDF (82 KB)</span>
                  </div>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
