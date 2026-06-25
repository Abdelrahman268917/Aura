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

const title = "AURA | استوديو تسريع الأعمال للمؤسسات";
const description =
  "نحوّل الشركات والمجموعات إلى منظومات تشغيل ذكية عبر التشخيص، تصميم سير العمل، الأدوات الداخلية، وكلاء الذكاء الاصطناعي، واستراتيجيات النمو.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aura-swzc.vercel.app"),
  title,
  description,
  keywords: [
    "AURA",
    "استوديو تسريع الأعمال للمؤسسات",
    "منظومات تشغيل ذكية",
    "تصميم سير العمل",
    "الأدوات الداخلية",
    "وكلاء الذكاء الاصطناعي",
    "Enterprise Business Acceleration Studio",
  ],
  authors: [{ name: "AURA Enterprise Business Acceleration Studio" }],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title,
    description,
    url: "https://aura-swzc.vercel.app",
    siteName: "AURA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AURA Enterprise Business Acceleration Studio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
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
