import { Metadata } from "next";
import MyAccountLayoutClient from "../../../hooks/MyAccountLayoutClient";

export const metadata: Metadata = {
  title: "My Account",
  description: "View and update your personal details and settings.",
};

export default function MyAccountLayout({ children }: { children: React.ReactNode }) {
  return <MyAccountLayoutClient>{children}</MyAccountLayoutClient>;
}
