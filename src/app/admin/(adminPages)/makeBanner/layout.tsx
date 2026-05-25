import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banner Creator",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MakeBannerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
