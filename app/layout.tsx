
import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ContextAPI";
// import LoadingPage from "@/components/LoadingPage";
import { BottomNav } from "@/components/BottomNav";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { ThemeProvider1 } from "@/components/ui/theme-provider"

// import { SmoothScrolling } from "@/components/SmoothScrolling";

export const metadata: Metadata = {
  title: "Sarang Kale",
  description: "Software Development Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`overflow-x-hidden`}
      >
        <ThemeProvider1
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <ThemeProvider>
            <SmoothCursor />
            <BottomNav />
            {children}
            {/* <LoadingPage /> */}
          </ThemeProvider>
        </ThemeProvider1>
      </body>
    </html>
  );
}