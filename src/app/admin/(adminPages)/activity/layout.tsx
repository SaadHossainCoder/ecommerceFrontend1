import { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Activity",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ActivityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
