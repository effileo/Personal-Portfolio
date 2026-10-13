import { useEffect, useState } from "react";

export function useTheme() {
  const [dark] = useState<boolean>(true);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.add("dark");
    }
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("theme", "dark");
      } catch {
        /* ignore */
      }
    }
  }, []);

  const toggle = () => {
    // Only dark mode is supported
    if (typeof document !== "undefined") {
      document.documentElement.classList.add("dark");
    }
  };

  return { dark, toggle };
}

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.4;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}
