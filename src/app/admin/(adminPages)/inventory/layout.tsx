import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Tracking",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
