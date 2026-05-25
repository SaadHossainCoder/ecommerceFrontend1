import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendors Management",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VendorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
