import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products Inventory",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
