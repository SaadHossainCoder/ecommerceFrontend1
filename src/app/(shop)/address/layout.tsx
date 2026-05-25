import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Addresses",
  description: "Manage your shipping and billing addresses.",
};

export default function AddressLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
