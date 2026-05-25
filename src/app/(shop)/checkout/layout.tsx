import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout",
  description: "Securely review and complete your purchase.",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
