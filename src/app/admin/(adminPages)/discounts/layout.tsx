import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discounts & Promos",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DiscountsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
