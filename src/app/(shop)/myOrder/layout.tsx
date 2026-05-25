import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders",
  description: "Track and review your past orders.",
};

export default function MyOrdersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
