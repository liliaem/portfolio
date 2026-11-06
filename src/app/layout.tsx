import type { Metadata } from "next";
import "@fontsource-variable/schibsted-grotesk";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/utils/theme/ThemeProvider";
import { EasterEgg } from "@/components/EasterEgg";

const SITE_URL = "https://lili-martinez.vercel.app";
const TITLE = "Lilia Martínez | Technical Support & Security Operations";
const DESCRIPTION =
  "Biomedical engineer in technical support and security operations. Wazuh and Splunk home lab, a live IP reputation checker built on the AbuseIPDB API, bilingual English/Spanish.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Lilia Martínez",
    "Technical Support",
    "Security Operations",
    "SOC Analyst",
    "Wazuh",
    "Splunk",
    "REST APIs",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Lilia Martínez",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen antialiased">
        <EasterEgg />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-1 text-ink">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
