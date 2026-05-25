import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notification Bar Setup",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotificationBarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
