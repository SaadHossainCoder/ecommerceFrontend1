import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Search } from "@/components/layout/Search";
import { WebVitals } from "@/components/layout/WebVitals";
import faviconLight from '@/assets/images/favicon/logowhite_logo.webp';
import faviconDark from '@/assets/images/favicon/khoshil_logo.webp';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL! || "http://localhost:3000"),
  title: {
    template: "%s | khoshil",
    default: "Step Into a World of Mystery, Craft, and Endless Charm",
  },
  description: "Welcome to Khoshil — a place where mystery meets mastery, and every piece holds a story waiting to be discovered. Dive into a world of exquisite craftsmanship, where playful artistry blends seamlessly with timeless elegance. Our curated collection invites you to uncover hidden treasures crafted by skilled hands, each echoing heritage, nature, and soul. Step inside, explore the unknown, and let Khoshil surprise you with creations that are as unique as you are. Are you ready to unlock the secret?",
  // description: "Khoshil invites you to explore unique handcrafted treasures where mystery, heritage, and elegance blend—discover the story behind every piece today.",
  keywords: ["e-commerce", "online shopping", "products", "sonajhuri", "khoshil", "premium", "Santiniketan", "handicrafts", "fashion", "home decor", "gifts", "Haat", "Sonajhuri Haat", "Khoai Haat", "Shanibarer Haat", "Open-air market", "Local artisans", "Traditional crafts", "Unique products", "Cultural experience", "Santhal artisans",
    "Baul folk music",
    "Handcrafted jewelry",
    "Dokra metal casting",
    "Kantha sarees",
    "Terracotta crafts",
    "Organic goods market",
    "Forest market",
    "Traditional crafts",
    "Saturday market",
    "Local artisans",
    "Cultural market",
    "Shantiniketan market",
    "Tribal art and craft",
    "Folk heritage market"],
  applicationName: "khoshil",
  creator: "MD. SAAD HOSSAIN",

  icons: {
    icon: [
      {
        url: faviconLight.src,
        media: '(prefers-color-scheme: light)',
      },
      {
        url: faviconDark.src,
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Step Into a World of Mystery, Craft, and Endless Charm',
    description: 'Welcome to Khoshil — a place where mystery meets mastery, and every piece holds a story waiting to be discovered. Dive into a world of exquisite craftsmanship, where playful artistry blends seamlessly with timeless elegance. Our curated collection invites you to uncover hidden treasures crafted by skilled hands, each echoing heritage, nature, and soul. Step inside, explore the unknown, and let Khoshil surprise you with creations that are as unique as you are. Are you ready to unlock the secret?',
    creator: '@khoshil',
    images: [
      {
        url: '/figimage.webp',
        width: 1200,
        height: 630,
        alt: 'khoshil',
      },
    ],
    site: '@khoshil',
  },
  openGraph: {
    title: 'khoshil - Step Into a World of Mystery, Craft, and Endless Charm',
    description: 'Welcome to Khoshil — a place where mystery meets mastery, and every piece holds a story waiting to be discovered. Dive into a world of exquisite craftsmanship, where playful artistry blends seamlessly with timeless elegance. Our curated collection invites you to uncover hidden treasures crafted by skilled hands, each echoing heritage, nature, and soul. Step inside, explore the unknown, and let Khoshil surprise you with creations that are as unique as you are. Are you ready to unlock the secret?',
    // description: 'Khoshil invites you to explore unique handcrafted treasures where mystery, heritage, and elegance blend—discover the story behind every piece today.',
    url: 'https://example.com',//TODO: update with actual URL
    siteName: 'khoshil',
    images: [
      {
        url: '/figimage.webp',
        width: 1920,
        height: 1080,
        alt: 'khoshil',
      },
    ],
    locale: 'in_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false
  }
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
