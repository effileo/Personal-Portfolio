import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ExternalLink, Download, X } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
  name?: string;
}

export function ResumeModal({
  isOpen,
  onClose,
  pdfUrl = "/resume.pdf",
  name = "Fita Alemayehu",
}: ResumeModalProps) {
  // Prevent background scrolling when modal is open and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const downloadFilename = `${name.replace(/\s+/g, "_")}_Resume.pdf`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} - Resume`}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          {/* Backdrop with blur aligned to portfolio glassmorphism */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Modal Dialog Container using portfolio typography and design tokens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-[90vh] max-h-[860px] w-full max-w-4xl flex-col overflow-hidden rounded-2xl md:rounded-3xl border border-border bg-card shadow-lift backdrop-blur-2xl z-10 font-sans"
          >
            {/* Modal Header Bar styled strictly to portfolio monochrome design */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/70 px-4 sm:px-6 backdrop-blur-xl">
              {/* Left: Document icon + Title matching portfolio font */}
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="truncate text-sm font-semibold tracking-tight text-foreground font-sans">
                  {name} - Resume
                </span>
              </div>

              {/* Right: Actions matching portfolio pill buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 hover:bg-muted/60 px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:border-foreground/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  <span>Open</span>
                </a>

                <a
                  href={pdfUrl}
                  download={downloadFilename}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs px-4 py-1.5 shadow-soft transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                  title="Download PDF"
                >
                  <Download className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  <span>Download</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume"
                  title="Close"
                  className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ml-1 cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Modal Body: Embedded PDF viewer */}
            <div className="relative flex-1 min-h-0 w-full overflow-hidden bg-muted/40">
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                title={`${name} Resume`}
                className="h-full w-full border-0 bg-white"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
