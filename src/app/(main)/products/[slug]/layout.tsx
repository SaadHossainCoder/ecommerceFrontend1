import { Metadata } from "next";
import { productService } from "@/services/product.service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const res = await productService.getProductBySlug(slug);
    if (res?.ok && res?.data) {
      return {
        title: res.data.title,
        description:
          res.data.description || `Buy ${res.data.title} online at khoshil.`,
        openGraph: {
          title: res.data.title,
          description: res.data.description,
          images: res.data.generalImages?.map((img) => ({ url: img })) || [],
        },
      };
    }
  } catch (error) {
    console.error("Error generating product metadata:", error);
  }
  return {
    title: "Product Details",
    description: "View and purchase this premium product.",
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
