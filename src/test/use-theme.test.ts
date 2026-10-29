import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useTheme } from "@/hooks/use-theme";

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
    vi.restoreAllMocks();
  });

  it("always initializes with dark mode and applies dark class", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.dark).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("persists dark theme to localStorage", () => {
    renderHook(() => useTheme());

    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("maintains dark mode even if toggle is called", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.dark).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.dark).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
