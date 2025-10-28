"use client";

import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  openMobileMenu: () => void;
}

export default function Header({ openMobileMenu }: HeaderProps) {
  return (
    // This header is hidden on medium screens and up
    <header className="flex md:hidden items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={openMobileMenu}
          className="text-gray-700 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <span className="text-xl font-bold text-blue-600 dark:text-white">Dashboard</span>
      </div>
      <ThemeToggle />
    </header>
  );
}
