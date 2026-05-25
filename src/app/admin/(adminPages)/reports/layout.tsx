import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports & Audits",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
