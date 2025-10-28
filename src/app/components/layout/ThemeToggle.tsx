"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // We can't know the theme on the server, so we must render this client-side
  // We can show a placeholder or just a non-interactive icon
  if (theme === undefined) {
    return (
      <div className="w-10 h-10 p-2 rounded-full flex items-center justify-center animate-pulse bg-gray-200 dark:bg-gray-700">
         <Sun size={20} className="text-gray-400" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon className="text-blue-600" size={20} /> : <Sun size={20} />}
    </button>
  );
}