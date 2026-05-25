import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Explore career opportunities and join the team at khoshil.",
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
