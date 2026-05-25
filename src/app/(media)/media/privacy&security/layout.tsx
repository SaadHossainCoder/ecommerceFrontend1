import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Security",
  description: "Learn how we protect and manage your private customer information.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
