import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories Setup",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
