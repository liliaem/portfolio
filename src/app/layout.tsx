import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/utils/theme/ThemeProvider";

export const metadata: Metadata = {
  title: "Lilia Martinez - Portfolio",
  description:
    "This is the portfolio of Lilia Martinez, a SOC Security Analyst.",
  keywords: [
    "Lilia Martinez",
    "SOC Security Analyst Portfolio",
    "SOC Engineer Portfolio",
    "SOC Analyst Portfolio",
    "SOC",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-1 z-0 pt-22 dark:text-white text-black">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
