import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify OTP",
  description: "Verify your email or phone number with a one-time password.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OtpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
  