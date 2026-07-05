import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "dark";
    }
    return "dark";
  });

  const setTheme = (newTheme: "light" | "dark") => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      if (newTheme === "light") {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      }
      // Dispatch custom event to notify other components (like App.tsx)
      window.dispatchEvent(new CustomEvent("theme-change", { detail: newTheme }));
    }
  };

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setThemeState(customEvent.detail);
      } else {
        const currentTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        if (currentTheme) {
          setThemeState(currentTheme);
        }
      }
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  return { theme, setTheme };
}
