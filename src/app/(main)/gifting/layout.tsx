import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gifting Solutions",
  description: "Explore premium, custom, and hand-wrapped corporate and personal gift services.",
};

export default function GiftingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
