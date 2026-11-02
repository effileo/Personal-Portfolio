import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { navItems } from "@/data/profile";
import { useActiveSection } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { ResumeModal } from "./ResumeModal";

const ids = navItems.map((n) => n.id);

export function Navbar() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <>
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

          {/* Vertical Divider matching screenshot */}
          <div className="mx-1 h-4 w-px bg-border/80" aria-hidden="true" />

          {/* Resume Nav Button */}
          <button
            type="button"
            onClick={() => setResumeModalOpen(true)}
            className="relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="View or download resume"
            title="View or download resume (PDF)"
          >
            <span>Resume</span>
          </button>
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

                {/* Mobile Resume Button */}
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setResumeModalOpen(true);
                  }}
                  className="flex items-center justify-between rounded-full px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
                  aria-label="View or download resume"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Resume</span>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                    View PDF
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        pdfUrl="/resume.pdf"
        name="Fita Alemayehu"
      />
    </>
  );
}
