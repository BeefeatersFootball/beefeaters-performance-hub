import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Beefeaters Performance Hub",
    template: "%s | Beefeaters Performance Hub",
  },
  description:
    "A performance resource hub for the London Beefeaters covering sleep, nutrition, recovery, concussion, injury prevention, and transition supports.",
  applicationName: "Beefeaters Performance Hub",
  authors: [{ name: "London Beefeaters Football Club" }],
  keywords: [
    "football performance",
    "athlete recovery",
    "concussion education",
    "sports nutrition",
    "injury prevention",
    "transition out of sport",
  ],
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0B1F4B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
