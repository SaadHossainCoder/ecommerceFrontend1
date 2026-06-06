import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
    title: "Home | Step Into a World of Mystery, Craft, and Endless Charm",
    description: "Welcome to Khoshil — a place where mystery meets mastery, and every piece holds a story waiting to be discovered. Dive into a world of exquisite craftsmanship, where playful artistry blends seamlessly with timeless elegance. Our curated collection invites you to uncover hidden treasures crafted by skilled hands, each echoing heritage, nature, and soul. Step inside, explore the unknown, and let Khoshil surprise you with creations that are as unique as you are. Are you ready to unlock the secret?",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (<div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1 pb-16 md:pb-0">
      {children}
    </main>
    <Footer />
    <MobileBottomNav />
  </div>);
}
