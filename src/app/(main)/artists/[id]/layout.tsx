import { Metadata } from "next";
import { vendorService } from "@/services/vendor.service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const res = await vendorService.getVendorBySlug(id);
    if (res?.ok && res?.data) {
      return {
        title: `${res.data.name} - Artisan Profile`,
        description:
          res.data.description ||
          `Meet ${res.data.name}, master artisan at khoshil.`,
        openGraph: {
          title: res.data.name,
          description: res.data.description,
          images: res.data.images?.map((img) => ({ url: img })) || [],
        },
      };
    }
  } catch (error) {
    console.error("Error generating artist metadata:", error);
  }
  return {
    title: "Artisan Profile",
    description: "Meet the designer behind the premium collection.",
  };
}

export default function ArtistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
