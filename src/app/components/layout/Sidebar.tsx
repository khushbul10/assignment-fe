"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Package, X } from "lucide-react"; // Import X icon
import ThemeToggle from "./ThemeToggle";

// New props to control mobile state
interface SidebarProps {
  isMobileMenuOpen: boolean;
  closeMobileMenu: () => void;
}

export default function Sidebar({
  isMobileMenuOpen,
  closeMobileMenu,
}: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Leads", href: "/leads", icon: Users },
    { name: "Products", href: "/products", icon: Package },
  ];

  return (
    <aside
      className={`
         md:block
        w-64 bg-white dark:bg-gray-800 h-screen p-4 shadow-lg flex flex-col
        fixed inset-y-0 left-0 z-50 
        transform ${
          isMobileMenuOpen ? "translateX(0)" : "-translateX(100%) hidden"
        }
        transition-transform duration-300 ease-in-out
        md:static md:translate-x-0 
      `}
      // ^ The classes above handle all the logic:
      // 1. `fixed... z-50`: Makes it a top-layer overlay on mobile.
      // 2. `transform...`: Slides it in or out based on `isMobileMenuOpen`.
      // 3. `md:static...`: Resets it to a normal, static sidebar on desktop.
    >
      {/* Header with Close Button (Mobile) */}
      <div className="flex items-center justify-between mb-10">
        <span className="font-poppins text-2xl font-bold text-blue-600 dark:text-white">Dashboard</span>
        {/* Theme Toggle (Bottom) */}
        <div className="hidden md:block ">
          <ThemeToggle />
        </div>
        {/* Close button, only visible on mobile (md:hidden) */}
        <button
          onClick={closeMobileMenu}
          className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close menu"
        >
          <X size={24} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-4">
              <Link
                href={item.href}
                onClick={closeMobileMenu} // Close menu on link click (good UX)
                className={`flex items-center p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors ${
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700 dark:bg-gray-900 dark:text-blue-300 font-semibold"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                <item.icon className="mr-3" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
