import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/component/BottomNav";
import ThemeProvider from "@/component/ContextAPI";
import LoadingPage from "@/component/LoadingPage";

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
        className={`h-screen w-screen relative`}
      >
          <ThemeProvider>
              <BottomNav/>
              <LoadingPage/>
              {children}
          </ThemeProvider>
      </body>
    </html>
  );
}


// echo "# portfolio" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Sarangkale66/portfolio.git
// git push -u origin main