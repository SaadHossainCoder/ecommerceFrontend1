import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Search } from "@/components/layout/Search";
import { WebVitals } from "@/components/layout/WebVitals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopHub - Premium E-Commerce",
  description: "Your one-stop destination for premium products. Quality, style, and convenience delivered to your doorstep.",
  keywords: ["e-commerce", "online shopping", "products", "deals"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen font-sans`}
      >
        {children}
        <Search />
        <Toaster />
        <WebVitals />
      </body>
    </html>
  );
}
