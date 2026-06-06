import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gifting ",
  description: "Khoshil invites you to explore unique handcrafted treasures where mystery, heritage, and elegance blend—discover the story behind every piece today.",
};

export default function GiftingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
