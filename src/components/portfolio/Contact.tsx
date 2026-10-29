import { useState, useEffect, useRef, useCallback, type FormEvent } from "react";
import { Mail, Copy, Check, ArrowUpRight, Loader2 } from "lucide-react";
import { SiGithub, SiUpwork } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { contactData } from "@/data/contact.data";

const HEADLINE_LINE_1 = "Let's build";
const HEADLINE_LINE_2 = "something.";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  github: SiGithub,
  linkedin: FaLinkedin,
  upwork: SiUpwork,
};

export function Contact() {
  // --- Live Clock State ---
  const [timeString, setTimeString] = useState<string>("--:--");

  useEffect(() => {
    try {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: contactData.timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const updateClock = () => {
        const time = formatter.format(new Date());
        setTimeString(`ADDIS ABABA · ${time} EAT`);
      };

      updateClock();
      const timer = setInterval(updateClock, 30000);
      return () => clearInterval(timer);
    } catch {
      setTimeString("ADDIS ABABA · 14:32 EAT");
    }
  }, []);

  // --- Copy Email State ---
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(contactData.email);
      } else {
        const ta = document.createElement("textarea");
        ta.value = contactData.email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback
    }
  };

  // --- Headline Wave & Entrance ---
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const letterTransforms = useRef<
    { targetY: number; targetScale: number; currY: number; currScale: number }[]
  >([]);

  const socialBtnsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const socialTransforms = useRef<
    { targetX: number; targetY: number; currX: number; currY: number }[]
  >([]);

  // Entrance observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Single shared pointermove on section for wave & magnetic buttons
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isReduced || isTouch) return;

    const totalLetters = HEADLINE_LINE_1.length + HEADLINE_LINE_2.length;
    while (letterTransforms.current.length < totalLetters) {
      letterTransforms.current.push({ targetY: 0, targetScale: 1, currY: 0, currScale: 1 });
    }

    const totalSocials = contactData.socials.length;
    while (socialTransforms.current.length < totalSocials) {
      socialTransforms.current.push({ targetX: 0, targetY: 0, currX: 0, currY: 0 });
    }

    let rafId: number | null = null;
    let isMoving = false;

    const updatePhysics = () => {
      let stillMoving = false;
      const lerp = 0.15;

      // Letters wave
      lettersRef.current.forEach((span, idx) => {
        if (!span) return;
        const state = letterTransforms.current[idx];
        if (!state) return;

        state.currY += (state.targetY - state.currY) * lerp;
        state.currScale += (state.targetScale - state.currScale) * lerp;

        if (
          Math.abs(state.targetY - state.currY) > 0.05 ||
          Math.abs(state.targetScale - state.currScale) > 0.005
        ) {
          stillMoving = true;
        }

        span.style.transform = `translateY(${state.currY.toFixed(2)}px) scale(${state.currScale.toFixed(3)})`;
      });

      // Magnetic socials
      socialBtnsRef.current.forEach((btn, idx) => {
        if (!btn) return;
        const state = socialTransforms.current[idx];
        if (!state) return;

        state.currX += (state.targetX - state.currX) * lerp;
        state.currY += (state.targetY - state.currY) * lerp;

        if (
          Math.abs(state.targetX - state.currX) > 0.05 ||
          Math.abs(state.targetY - state.currY) > 0.05
        ) {
          stillMoving = true;
        }

        btn.style.transform = `translate(${state.currX.toFixed(2)}px, ${state.currY.toFixed(2)}px)`;
      });

      if (isMoving || stillMoving) {
        rafId = requestAnimationFrame(updatePhysics);
      } else {
        rafId = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      isMoving = true;

      // 1) Headline Letters distance
      lettersRef.current.forEach((span, idx) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        const state = letterTransforms.current[idx];
        if (!state) return;

        if (dist < 150) {
          const factor = Math.cos((dist / 150) * (Math.PI / 2));
          state.targetY = -12 * factor;
          state.targetScale = 1 + 0.05 * factor;
        } else {
          state.targetY = 0;
          state.targetScale = 1;
        }
      });

      // 2) Social Buttons magnetic pull
      socialBtnsRef.current.forEach((btn, idx) => {
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.hypot(dx, dy);

        const state = socialTransforms.current[idx];
        if (!state) return;

        if (dist < 60) {
          const pull = (1 - dist / 60) * 8;
          state.targetX = (dx / (dist || 1)) * pull;
          state.targetY = (dy / (dist || 1)) * pull;
        } else {
          state.targetX = 0;
          state.targetY = 0;
        }
      });

      if (!rafId) {
        rafId = requestAnimationFrame(updatePhysics);
      }
    };

    const handlePointerLeave = () => {
      isMoving = false;
      letterTransforms.current.forEach((state) => {
        state.targetY = 0;
        state.targetScale = 1;
      });
      socialTransforms.current.forEach((state) => {
        state.targetX = 0;
        state.targetY = 0;
      });
      if (!rafId) {
        rafId = requestAnimationFrame(updatePhysics);
      }
    };

    el.addEventListener("pointermove", handlePointerMove, { passive: true });
    el.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  // --- Form State ---
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedIntent, setSelectedIntent] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; message?: boolean }>(
    {},
  );
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverErrorMsg, setServerErrorMsg] = useState("");

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
  const successHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const formMountedAt = useRef<number>(Date.now());
  const lastSubmitTimeRef = useRef<number>(0);

  // Auto-grow textarea
  const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setMessage(val);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(320, Math.max(140, e.target.scrollHeight))}px`;
    if (touched.message) {
      validateField("message", val);
    }
  };

  // Validation helper
  const validateField = (field: "name" | "email" | "message", val: string): boolean => {
    let err = "";
    if (field === "name") {
      if (val.trim().length < 2) {
        err = "Name must be at least 2 characters.";
      } else if (val.trim().length > 80) {
        err = "Name cannot exceed 80 characters.";
      }
    } else if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val.trim())) {
        err = "Please enter a valid email address.";
      }
    } else if (field === "message") {
      if (val.trim().length < 10) {
        err = "Message must be at least 10 characters.";
      } else if (val.trim().length > 2000) {
        err = "Message cannot exceed 2000 characters.";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: err || undefined }));
    return !err;
  };

  // Toggle topics
  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

  // Radio arrow navigation for intents
  const handleIntentKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % contactData.intents.length;
      setSelectedIntent(contactData.intents[next]);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + contactData.intents.length) % contactData.intents.length;
      setSelectedIntent(contactData.intents[prev]);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isNameValid = validateField("name", name);
    const isEmailValid = validateField("email", email);
    const isMessageValid = validateField("message", message);
    setTouched({ name: true, email: true, message: true });

    if (!isNameValid) {
      nameInputRef.current?.focus();
      return;
    }
    if (!isEmailValid) {
      emailInputRef.current?.focus();
      return;
    }
    if (!isMessageValid) {
      messageInputRef.current?.focus();
      return;
    }

    // Spam Protection: Honeypot & Minimum Fill Time
    if (honeypot || Date.now() - formMountedAt.current < 3000) {
      setFormStatus("success");
      return;
    }

    // Rate Limit: 30 seconds
    const now = Date.now();
    if (lastSubmitTimeRef.current && now - lastSubmitTimeRef.current < 30000) {
      setServerErrorMsg("Please wait at least 30 seconds before sending another message.");
      setFormStatus("error");
      return;
    }

    setFormStatus("sending");
    setServerErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          topics: selectedTopics,
          intent: selectedIntent,
        }),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      lastSubmitTimeRef.current = Date.now();
      setFormStatus("success");
      setTimeout(() => {
        successHeadingRef.current?.focus();
      }, 50);
    } catch {
      setServerErrorMsg(
        `Something went wrong. Please try again, or email me directly at ${contactData.email}.`,
      );
      setFormStatus("error");
    }
  };

  // Reset Form
  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSelectedTopics([]);
    setSelectedIntent("");
    setErrors({});
    setTouched({});
    setFormStatus("idle");
    setServerErrorMsg("");
  };

  // Liquid Hover Handler for Submit Button
  const handleButtonPointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--rx", `${x}px`);
    e.currentTarget.style.setProperty("--ry", `${y}px`);
  };

  // Filter out any social link with an empty URL
  const visibleSocials = contactData.socials.filter((s) => Boolean(s.url && s.url.trim()));

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: "140px",
        paddingBottom: "120px",
        scrollMarginTop: "110px",
      }}
    >
      <style>{`
        #contact {
          --blob-color: #000000;
          --streak-color: #000000;
        }
        :root.dark #contact,
        html.dark #contact,
        .dark #contact {
          --blob-color: #FFFFFF;
          --streak-color: #FFFFFF;
        }

        /* Ambient Blobs & Silk Streak */
        @keyframes contact-blob-drift-1 {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-5vw, 4vh, 0); }
        }
        @keyframes contact-blob-drift-2 {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(5vw, -4vh, 0); }
        }
        .contact-blob-1 {
          animation: contact-blob-drift-1 26s ease-in-out infinite alternate;
        }
        .contact-blob-2 {
          animation: contact-blob-drift-2 32s ease-in-out infinite alternate;
        }

        @keyframes contact-silk-glide {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1300; }
        }
        .contact-silk-highlight {
          animation: contact-silk-glide 22s linear infinite;
        }

        /* Shake animation on invalid field */
        @keyframes input-shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .field-shake {
          animation: input-shake 300ms ease-in-out;
        }

        /* Liquid hover expanding circle */
        .liquid-pill {
          position: relative;
          overflow: hidden;
        }
        .liquid-pill::before {
          content: "";
          position: absolute;
          top: var(--ry, 50%);
          left: var(--rx, 50%);
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.24);
          transform: translate(-50%, -50%);
          transition: width 450ms ease-out, height 450ms ease-out;
          pointer-events: none;
        }
        :root:not(.dark) .liquid-pill::before,
        html:not(.dark) .liquid-pill::before {
          background: rgba(0, 0, 0, 0.2);
        }
        @media (hover: hover) and (pointer: fine) {
          .liquid-pill:hover::before {
            width: 380px;
            height: 380px;
          }
        }

        /* Success Checkmark Draw */
        @keyframes checkmark-stroke-draw {
          to { stroke-dashoffset: 0; }
        }
        .checkmark-stroke {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: checkmark-stroke-draw 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Glass Recipe */
        .contact-glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        :root:not(.dark) #contact .contact-glass-card,
        html:not(.dark) #contact .contact-glass-card {
          background: rgba(0, 0, 0, 0.035);
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .availability-pill {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }
        :root:not(.dark) #contact .availability-pill,
        html:not(.dark) #contact .availability-pill {
          background: rgba(0, 0, 0, 0.035);
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        /* Reduced Motion Overrides */
        @media (prefers-reduced-motion: reduce) {
          .contact-blob-1,
          .contact-blob-2,
          .contact-silk-highlight {
            animation: none !important;
          }
          .headline-letter {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .liquid-pill::before {
            display: none !important;
          }
          .checkmark-stroke {
            stroke-dashoffset: 0 !important;
            animation: none !important;
          }
          .field-shake {
            animation: none !important;
          }
        }
      `}</style>

      {/* Ambient background decoration */}
      <div
        aria-hidden="true"
        className="contact-blob-1 pointer-events-none absolute -top-12 -right-12 w-85 sm:w-120 h-85 sm:h-120 rounded-full"
        style={{
          background: "var(--blob-color)",
          filter: "blur(80px)",
          opacity: 0.05,
        }}
      />
      <div
        aria-hidden="true"
        className="contact-blob-2 pointer-events-none absolute -bottom-16 -left-16 w-85 sm:w-120 h-85 sm:h-120 rounded-full"
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
          opacity="0.05"
        />
        <path
          d="M -50,150 Q 500,450 1050,850"
          fill="none"
          stroke="var(--streak-color)"
          strokeWidth="1.2"
          strokeDasharray="100 1200"
          className="contact-silk-highlight"
          opacity="0.12"
        />
      </svg>

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* ================= LEFT COLUMN ================= */}
          <div className="flex flex-col items-start w-full">
            {/* 1. Label */}
            <div style={{ marginBottom: "20px" }}>
              <p className="label">CONTACT</p>
            </div>

            {/* 2. Signature Headline: Let's build something. */}
            <h2
              aria-label="Let's build something."
              className="font-extrabold tracking-[-0.035em] text-foreground leading-[1.05] select-none w-full"
              style={{
                fontSize: "clamp(2.1rem, 3.6vw, 3.5rem)",
              }}
            >
              {/* Line 1 */}
              <span className="block whitespace-nowrap">
                {HEADLINE_LINE_1.split("").map((char, i) => {
                  const globalIdx = i;
                  return (
                    <span
                      key={globalIdx}
                      ref={(el) => (lettersRef.current[globalIdx] = el)}
                      aria-hidden="true"
                      className="headline-letter inline-block will-change-transform"
                      style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0)" : "translateY(40px)",
                        transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${globalIdx * 28}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${globalIdx * 28}ms`,
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  );
                })}
              </span>

              {/* Line 2 */}
              <span className="block whitespace-nowrap">
                {HEADLINE_LINE_2.split("").map((char, i) => {
                  const globalIdx = HEADLINE_LINE_1.length + i;
                  return (
                    <span
                      key={globalIdx}
                      ref={(el) => (lettersRef.current[globalIdx] = el)}
                      aria-hidden="true"
                      className="headline-letter inline-block will-change-transform"
                      style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0)" : "translateY(40px)",
                        transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${globalIdx * 28}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${globalIdx * 28}ms`,
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            </h2>

            {/* 3. Availability Card (32px below) */}
            <div className="availability-pill mt-8 w-full max-w-md rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                {/* Green Pulsing Dot (only color in section) */}
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-status" />
                </span>

                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span
                    className="font-mono text-[11px] uppercase opacity-60 text-foreground"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    AVAILABLE FOR
                  </span>
                  <span className="text-[15px] font-semibold text-foreground">
                    {contactData.availability}
                  </span>
                </div>
              </div>

              {/* Live Clock Row */}
              <div className="font-mono text-xs text-muted-foreground pl-5 select-none">
                {timeString}
              </div>

              {/* Optional Response Time Note */}
              {contactData.responseNote && (
                <p className="text-[13px] text-muted-foreground pl-5 mt-0.5">
                  {contactData.responseNote}
                </p>
              )}
            </div>

            {/* 4. Email Button (32px below) */}
            <div className="mt-8 flex flex-col items-start gap-1 w-full">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="group relative inline-flex items-center gap-3 px-5 py-3 rounded-full border border-foreground/20 bg-foreground/5 text-foreground transition-colors hover:border-foreground/50 hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                  aria-label={`Copy email address ${contactData.email}`}
                >
                  <Mail className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                  <span
                    className="relative font-semibold tracking-tight"
                    style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)" }}
                  >
                    {contactData.email}
                    {/* Hover Underline scaleX from left */}
                    <span className="pointer-events-none absolute left-0 bottom-0 w-full h-[1.5px] bg-foreground opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 origin-left" />
                  </span>

                  {/* Copy Icon Swap */}
                  <span className="ml-1 p-1 rounded-full text-muted-foreground group-hover:text-foreground">
                    {copied ? (
                      <Check className="w-4 h-4 text-foreground" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </span>
                </button>

                {/* Secondary mailto link */}
                <a
                  href={`mailto:${contactData.email}`}
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  Open in mail app
                </a>
              </div>

              {/* Aria Live Announcement */}
              <div aria-live="polite" className="sr-only">
                {copied && "Email copied to clipboard"}
              </div>
            </div>

            {/* 5. Social Buttons (28px below) */}
            {visibleSocials.length > 0 && (
              <div className="mt-7 flex items-center gap-3">
                {visibleSocials.map((social, idx) => {
                  const Icon = SOCIAL_ICONS[social.id] || ArrowUpRight;
                  return (
                    <div key={social.id} className="relative group flex flex-col items-center">
                      <a
                        ref={(el) => (socialBtnsRef.current[idx] = el)}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="grid h-14 w-14 place-items-center rounded-full border border-foreground/22 bg-foreground/5 text-foreground transition-all duration-200 hover:-translate-y-1 hover:border-foreground/60 hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                      >
                        <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                      </a>

                      {/* Tooltip Label under button */}
                      <span className="pointer-events-none absolute -bottom-6 font-mono text-[11px] text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 whitespace-nowrap">
                        {social.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ================= RIGHT COLUMN: PROJECT BRIEF FORM ================= */}
          <div className="w-full">
            <div
              className="contact-glass-card relative w-full rounded-[28px] overflow-hidden"
              style={{
                padding: "clamp(24px, 3vw, 36px)",
              }}
            >
              {formStatus === "success" ? (
                /* Success Confirmation State */
                <div
                  tabIndex={-1}
                  className="flex flex-col items-center justify-center text-center py-10 outline-none"
                >
                  {/* 64px Circle with Animated Checkmark */}
                  <div className="w-16 h-16 rounded-full border border-foreground/30 flex items-center justify-center mb-6 text-foreground">
                    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none" aria-hidden="true">
                      <path
                        d="M18 33L27 42L46 22"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="checkmark-stroke"
                      />
                    </svg>
                  </div>

                  <h3
                    ref={successHeadingRef}
                    tabIndex={-1}
                    className="text-[1.75rem] font-extrabold text-foreground tracking-tight outline-none mb-2"
                  >
                    Message sent.
                  </h3>

                  <p className="text-muted-foreground text-sm max-w-sm mb-8">
                    Thank you for reaching out. I will get back to you soon.
                  </p>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-foreground/20 text-foreground text-sm font-medium transition-colors hover:border-foreground/50 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                  >
                    <span>Send another message</span>
                  </button>

                  <div aria-live="polite" className="sr-only">
                    Message sent successfully. Thank you for reaching out.
                  </div>
                </div>
              ) : (
                /* Normal Form State */
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                  {/* GROUP 1: WHAT DO YOU NEED? */}
                  {contactData.topics && contactData.topics.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <p
                        className="font-mono text-[11px] uppercase opacity-55 text-foreground select-none"
                        style={{ letterSpacing: "0.18em" }}
                      >
                        WHAT DO YOU NEED?
                      </p>
                      <div
                        role="group"
                        aria-label="What do you need?"
                        className="flex flex-wrap gap-2"
                      >
                        {contactData.topics.map((topic) => {
                          const isSelected = selectedTopics.includes(topic);
                          return (
                            <button
                              key={topic}
                              type="button"
                              aria-pressed={isSelected}
                              onClick={() => toggleTopic(topic)}
                              className={`inline-flex items-center gap-1.5 text-[13px] px-4 py-2 rounded-full border transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                                isSelected
                                  ? "bg-foreground text-background border-foreground font-semibold"
                                  : "bg-foreground/5 text-foreground border-foreground/22 hover:border-foreground/50"
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                              <span>{topic}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* GROUP 2: I AM HERE FOR */}
                  {contactData.intents && contactData.intents.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <p
                        className="font-mono text-[11px] uppercase opacity-55 text-foreground select-none"
                        style={{ letterSpacing: "0.18em" }}
                      >
                        I AM HERE FOR
                      </p>
                      <div
                        role="radiogroup"
                        aria-label="I am here for"
                        className="flex flex-wrap gap-2"
                      >
                        {contactData.intents.map((intent, idx) => {
                          const isChecked = selectedIntent === intent;
                          return (
                            <button
                              key={intent}
                              type="button"
                              role="radio"
                              aria-checked={isChecked}
                              tabIndex={isChecked || (!selectedIntent && idx === 0) ? 0 : -1}
                              onClick={() => setSelectedIntent(intent)}
                              onKeyDown={(e) => handleIntentKeyDown(e, idx)}
                              className={`inline-flex items-center gap-1.5 text-[13px] px-4 py-2 rounded-full border transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                                isChecked
                                  ? "bg-foreground text-background border-foreground font-semibold"
                                  : "bg-foreground/5 text-foreground border-foreground/22 hover:border-foreground/50"
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5" />}
                              <span>{intent}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Hidden Honeypot Field */}
                  <input
                    type="text"
                    name="contact_honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="sr-only"
                    style={{ display: "none" }}
                  />

                  {/* Fields Stack with 20px gaps */}
                  <div className="flex flex-col gap-5 mt-1">
                    {/* Name Field */}
                    <div className="relative w-full">
                      <input
                        id="contact-name"
                        ref={nameInputRef}
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (touched.name) validateField("name", e.target.value);
                        }}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => {
                          setFocusedField(null);
                          setTouched((prev) => ({ ...prev, name: true }));
                          validateField("name", name);
                        }}
                        autoComplete="name"
                        aria-invalid={!!(touched.name && errors.name)}
                        aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                        className={`w-full h-14 rounded-[18px] border bg-foreground/4 px-4 pt-4 pb-1 text-sm text-foreground outline-none transition-colors ${
                          touched.name && errors.name
                            ? "border-foreground/60 field-shake"
                            : "border-foreground/22 focus:border-foreground/70 focus:ring-4 focus:ring-foreground/12"
                        }`}
                      />
                      <label
                        htmlFor="contact-name"
                        className="pointer-events-none absolute left-4 top-4 text-sm text-muted-foreground origin-top-left transition-[transform,opacity] duration-200"
                        style={{
                          transform:
                            focusedField === "name" || name
                              ? "translateY(-10px) scale(0.78)"
                              : "translateY(0) scale(1)",
                          opacity: focusedField === "name" || name ? 0.8 : 0.6,
                        }}
                      >
                        Name
                      </label>
                      {touched.name && errors.name && (
                        <p id="name-error" className="mt-1.5 text-xs text-foreground/75 font-mono">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="relative w-full">
                      <input
                        id="contact-email"
                        ref={emailInputRef}
                        type="email"
                        inputMode="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (touched.email) validateField("email", e.target.value);
                        }}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => {
                          setFocusedField(null);
                          setTouched((prev) => ({ ...prev, email: true }));
                          validateField("email", email);
                        }}
                        autoComplete="email"
                        aria-invalid={!!(touched.email && errors.email)}
                        aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                        className={`w-full h-14 rounded-[18px] border bg-foreground/4 px-4 pt-4 pb-1 text-sm text-foreground outline-none transition-colors ${
                          touched.email && errors.email
                            ? "border-foreground/60 field-shake"
                            : "border-foreground/22 focus:border-foreground/70 focus:ring-4 focus:ring-foreground/12"
                        }`}
                      />
                      <label
                        htmlFor="contact-email"
                        className="pointer-events-none absolute left-4 top-4 text-sm text-muted-foreground origin-top-left transition-[transform,opacity] duration-200"
                        style={{
                          transform:
                            focusedField === "email" || email
                              ? "translateY(-10px) scale(0.78)"
                              : "translateY(0) scale(1)",
                          opacity: focusedField === "email" || email ? 0.8 : 0.6,
                        }}
                      >
                        Email
                      </label>
                      {touched.email && errors.email && (
                        <p id="email-error" className="mt-1.5 text-xs text-foreground/75 font-mono">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Message Textarea */}
                    <div className="relative w-full">
                      <textarea
                        id="contact-message"
                        ref={messageInputRef}
                        value={message}
                        onChange={handleMessageInput}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => {
                          setFocusedField(null);
                          setTouched((prev) => ({ ...prev, message: true }));
                          validateField("message", message);
                        }}
                        maxLength={2000}
                        rows={4}
                        aria-invalid={!!(touched.message && errors.message)}
                        aria-describedby={
                          touched.message && errors.message ? "message-error" : undefined
                        }
                        className={`w-full min-h-35 max-h-80 rounded-[18px] border bg-foreground/4 px-4 pt-6 pb-6 text-sm text-foreground outline-none resize-none transition-colors ${
                          touched.message && errors.message
                            ? "border-foreground/60 field-shake"
                            : "border-foreground/22 focus:border-foreground/70 focus:ring-4 focus:ring-foreground/12"
                        }`}
                      />
                      <label
                        htmlFor="contact-message"
                        className="pointer-events-none absolute left-4 top-4 text-sm text-muted-foreground origin-top-left transition-[transform,opacity] duration-200"
                        style={{
                          transform:
                            focusedField === "message" || message
                              ? "translateY(-10px) scale(0.78)"
                              : "translateY(0) scale(1)",
                          opacity: focusedField === "message" || message ? 0.8 : 0.6,
                        }}
                      >
                        Message
                      </label>

                      {/* Live Character Counter */}
                      <div className="absolute right-4 bottom-2 font-mono text-[11px] text-muted-foreground opacity-60 pointer-events-none select-none">
                        {message.length} / 2000
                      </div>

                      {touched.message && errors.message && (
                        <p
                          id="message-error"
                          className="mt-1.5 text-xs text-foreground/75 font-mono"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Error State Banner */}
                  {formStatus === "error" && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl border border-foreground/30 bg-foreground/4 text-sm text-foreground flex flex-col gap-2"
                    >
                      <p>
                        {serverErrorMsg || (
                          <>
                            Something went wrong. Please try again, or email me directly at{" "}
                            <a
                              href={`mailto:${contactData.email}`}
                              className="underline font-medium text-foreground hover:opacity-80"
                            >
                              {contactData.email}
                            </a>
                            .
                          </>
                        )}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          type="submit"
                          className="text-xs font-semibold underline underline-offset-4 text-foreground hover:opacity-80"
                        >
                          Retry submission
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      onPointerEnter={handleButtonPointerEnter}
                      className="liquid-pill group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-foreground text-background text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                    >
                      {formStatus === "sending" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send message</span>
                          <span className="text-base leading-none">↗</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= PAGE FOOTER ================= */}
      <footer className="mt-24 border-t border-foreground/14 w-full">
        <div className="mx-auto max-w-6xl px-6 sm:px-12 pt-8 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-foreground/60">
          {/* Left: Dynamic Current Year */}
          <div>© {new Date().getFullYear()} Fita Alemayehu</div>

          {/* Center: Location */}
          <div>{contactData.location}</div>

          {/* Right: Back to top ghost button */}
          <div>
            <button
              type="button"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-foreground/14 text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <span>Back to top</span>
              <span className="transition-transform duration-200 group-hover:-translate-y-0.5">
                ↑
              </span>
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
}
