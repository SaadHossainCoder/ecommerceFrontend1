import type { Metadata } from "next";
import AuthLayoutClient from "./AuthLayoutClient";

export const metadata: Metadata = {
  title: {
    template: "%s | Authentication | khoshil",
    default: "Access Your Account | khoshil",
  },
  description: "Secure login and registration portal for khoshil Premium E-Commerce.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayoutClient>{children}</AuthLayoutClient>;
}
