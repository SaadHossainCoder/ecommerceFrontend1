import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  description: "Khoshil invites you to explore unique handcrafted treasures where mystery, heritage, and elegance blend—discover the story behind every piece today.",
};

export default function ProductsListLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
