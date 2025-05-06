import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import ThemeProvider from "@/components/ContextAPI";
import LoadingPage from "@/components/LoadingPage";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

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
    <html lang="en">
      <body
        className={`relative`}
      >
          <SmoothCursor/>
          <ThemeProvider>
          <LoadingPage/>
          <BottomNav/>
          {children}
          </ThemeProvider>
      </body>
    </html>
  );
}