import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers Directory",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CustomersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
