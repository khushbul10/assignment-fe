import { BiFontFamily } from "react-icons/bi";
import type { Config } from "tailwindcss";

const config: Config = {
  // Add 'dark' mode configuration
  darkMode: 'class', // This is the key
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      BiFontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;