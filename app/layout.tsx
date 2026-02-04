import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Convert JPG to PNG Instantly | Jify",
  description:
    "Convert JPG to PNG online for free. Resize, strip metadata, and download crisp PNGs instantly in your browser.",
  keywords:
    "jpg to png, convert jpg to png, jpeg to png converter, image converter online",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Convert JPG to PNG Instantly | Jify",
    description:
      "Free JPG to PNG converter with resize controls. Process images and download fast.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert JPG to PNG Instantly | Jify",
    description:
      "Convert JPG files to PNG and download fast — no signup needed.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Toaster richColors />
        {children}
      </body>
    </html>
  );
}
