import { Metadata } from "next";
import MyAccountLayoutClient from "../../../hooks/MyAccountLayoutClient";

export const metadata: Metadata = {
  title: "track Order",
  description: "View and manage your saved products in the track order.",
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <MyAccountLayoutClient>{children}</MyAccountLayoutClient>;
}
