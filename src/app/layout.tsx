import type { Metadata } from "next";
import { Outfit, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AURA — Business Acceleration Studio",
  description: "Build smartly · Work faster · Turn your business into a system",
  keywords: ["Aura", "Business Acceleration", "Automation", "AI", "Systems", "Growth"],
  authors: [{ name: "Aura Studio" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AURA — Business Acceleration Studio",
    description: "Build smartly · Work faster · Turn your business into a system",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${cairo.variable} antialiased`}
        style={{ fontFamily: "var(--font-outfit), var(--font-cairo), sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

