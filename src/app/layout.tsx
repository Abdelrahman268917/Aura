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
  metadataBase: new URL("https://aura-swzc.vercel.app"),
  title: "AURA | Business Acceleration Studio",
  description: "Build smartly. Work faster. Turn your business into a system.",
  keywords: ["AURA", "Business Acceleration Studio", "Workflow Design", "Automation", "Business Systems"],
  authors: [{ name: "AURA Business Acceleration Studio" }],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "AURA | Business Acceleration Studio",
    description: "Build smartly. Work faster. Turn your business into a system.",
    url: "https://aura-swzc.vercel.app",
    siteName: "AURA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AURA | Business Acceleration Studio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AURA | Business Acceleration Studio",
    description: "Build smartly. Work faster. Turn your business into a system.",
    images: ["/og-image.png"],
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
