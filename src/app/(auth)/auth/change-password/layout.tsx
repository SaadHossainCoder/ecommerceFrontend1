import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password",
  description: "Update your account credentials.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ChangePasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
