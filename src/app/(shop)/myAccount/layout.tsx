import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account",
  description: "View and update your personal details and settings.",
};

export default function MyAccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
