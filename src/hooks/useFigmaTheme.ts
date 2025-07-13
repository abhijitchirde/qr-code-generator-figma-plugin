import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export function useFigmaTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  const isDark = theme === "dark";

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    // Save to localStorage if available
    try {
      localStorage.setItem("figma-qr-theme", newTheme);
    } catch (error) {
      // Ignore localStorage errors in Figma plugin environment
    }
  };

  useEffect(() => {
    // Load theme from localStorage on mount
    try {
      const savedTheme = localStorage.getItem("figma-qr-theme") as Theme;
      if (savedTheme && ["light", "dark"].includes(savedTheme)) {
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      }
    } catch (error) {
      // Ignore localStorage errors in Figma plugin environment
    }
  }, []);

  return {
    theme,
    isDark,
    toggleTheme,
  };
}
