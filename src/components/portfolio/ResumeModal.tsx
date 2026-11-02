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
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Dialog Container matching screenshot design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-[90vh] max-h-[860px] w-full max-w-4xl flex-col overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-[#0f172a] shadow-2xl z-10"
          >
            {/* Modal Header Bar */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-[#0f172a] px-4 sm:px-6">
              {/* Left: Document icon + Title */}
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="h-4 w-4 shrink-0 text-sky-400" aria-hidden="true" />
                <span className="truncate text-sm font-semibold tracking-tight text-white">
                  {name} - Resume
                </span>
              </div>

              {/* Right: Open in new tab + Download + Close buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Open</span>
                </a>

                <a
                  href={pdfUrl}
                  download={downloadFilename}
                  className="inline-flex items-center gap-1.5 rounded-full bg-sky-400 hover:bg-sky-300 text-slate-950 font-semibold text-xs px-4 py-1.5 shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all hover:translate-y-[-1px] active:translate-y-0"
                  title="Download PDF"
                >
                  <Download className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                  <span>Download</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume"
                  title="Close"
                  className="grid h-8 w-8 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ml-1 cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Modal Body: Embedded PDF viewer */}
            <div className="relative flex-1 min-h-0 w-full overflow-hidden bg-[#525659]">
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
