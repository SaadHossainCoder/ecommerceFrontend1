import { Metadata } from "next";
import MyAccountLayoutClient from "../../../hooks/MyAccountLayoutClient";

export const metadata: Metadata = {
  title: "My Orders",
  description: "Track and review your past orders.",
};

export default function MyOrdersLayout({ children }: { children: React.ReactNode }) {
  return <MyAccountLayoutClient>{children}</MyAccountLayoutClient>;
}
