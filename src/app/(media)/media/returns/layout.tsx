import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description: "Read about our simple return and exchange process.",
};

export default function ReturnsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
