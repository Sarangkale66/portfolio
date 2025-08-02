import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ContextAPI";
import LoadingPage from "@/components/LoadingPage";
import BottomNav from "@/components/BottomNav";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { SmoothScrolling } from "@/components/SmoothScrolling";

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
    <html lang="en" data-lenis>
      <body
        className={``}
      >
        <SmoothCursor />
        <ThemeProvider>
          {children}
          {/* <LoadingPage /> */}
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}