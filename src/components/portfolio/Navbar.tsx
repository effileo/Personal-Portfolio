import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/profile";
import { useActiveSection } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const ids = navItems.map((n) => n.id);

export function Navbar() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
