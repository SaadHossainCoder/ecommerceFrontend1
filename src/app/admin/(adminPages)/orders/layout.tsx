import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders Management",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
