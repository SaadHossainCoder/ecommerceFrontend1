import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews Moderation",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
