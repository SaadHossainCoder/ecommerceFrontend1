import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store Collection",
  description: "Browse our premium, curated collections of fine products and handcrafted items.",
};

export default function ProductsListLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
