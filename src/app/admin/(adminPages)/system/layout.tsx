import { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Settings",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SystemLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
