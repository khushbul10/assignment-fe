import type { Metadata } from "next";
import "./globals.css";
import { AppThemeProvider } from "./components/ThemeProvider";
import { LinkProvider } from "./context/LinkContext";
import AppLayout from "./components/layout/AppLayout"; // Import the new layout
import { QueryProvider } from "./components/provider/QueryProvider";
import { Poppins } from 'next/font/google';


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // You can choose what you need
  variable: "--font-poppins", // Optional: for Tailwind integration
});

export const metadata: Metadata = {
  title: "CRM Dashboard",
  description: "Frontend Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      {/* The `flex` class is removed from body, as AppLayout now handles it */}
      <body
        className={`${poppins.className} bg-gray-100 dark:bg-gray-900 transition-colors duration-200`}
      >
        <AppThemeProvider>
          <QueryProvider>
            <LinkProvider>
              {/* AppLayout now contains the Sidebar, Header, and main content area */}
              <AppLayout>{children}</AppLayout>
            </LinkProvider>
          </QueryProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
