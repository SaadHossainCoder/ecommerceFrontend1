import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
    title: {
        template: "%s ",
        default: "khoshil Premium E-CommerceKhoshil invites you to explore unique handcrafted treasures where mystery, heritage, and elegance blend—discover the story behind every piece today.",
    },
};

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pb-16 md:pb-0">{children}</main>
            <Footer />
            <MobileBottomNav />
        </div>
    );
}
