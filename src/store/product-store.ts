import { create } from "zustand";
import { productService } from "@/services/product.service";

interface ProductStoreState {
    products: any[];
    isLoading: boolean;
    error: string | null;
    fetchProducts: (params?: Record<string, any>, refresh?: boolean) => Promise<void>;
    addProduct: (data: any) => Promise<boolean>;
    editProduct: (id: string, data: any) => Promise<boolean>;
    removeProduct: (id: string) => Promise<boolean>;
}

export const useProductStore = create<ProductStoreState>((set, get) => ({
    products: [],
    isLoading: false,
    error: null,

    fetchProducts: async (params, refresh = false) => {
        // Only fetch if products are empty, or it's a forced refresh, or we have new params
        if (!refresh && get().products.length > 0 && !params) return;

        set({ isLoading: true, error: null });
        try {
            const res = await productService.getAllProducts(params);
            // The actual array is in res.data.data
            const products = res.data?.data || [];
            set({ products, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || "Failed to fetch products", isLoading: false });
        }
    },

    addProduct: async (data) => {
        set({ isLoading: true, error: null });
        try {
            // Formatting the data for backend
            const formattedData = {
                title: data.title,
                slug: data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                description: data.description,
                longDescription: data.longDescription,
                sku: data.sku,
                discount: data.discount,
                brand: data.brand,
                subcategory: data.subcategory,
                categoryId: data.category,
                vendorId: data.vendor,
                featured: data.featured,
                images: data.images?.filter(Boolean) || [],
                descriptionImages: data.images?.filter(Boolean) || [],
                benefits: data.benefits?.map((b: any) => b.value).filter(Boolean) || [],
                ingredients: data.ingredients?.map((i: any) => i.value).filter(Boolean) || [],
                sizes: data.sizes?.filter((s: any) => s.size).map((size: any) => ({
                    size: size.size,
                    qty: Number(size.qty),
                    price: Number(size.price),
                    image: size.image || ""
                }))
            };

            console.log("Adding Product - Formatted Data:", formattedData);
            const res = await productService.createProduct(formattedData);
            console.log("Adding Product - API Response:", res);

            if (res.ok) {
                set({ isLoading: false });
                return true;
            }
            throw new Error(res.message);
        } catch (error: any) {
            set({ error: error.message || "Failed to add product", isLoading: false });
            return false;
        }
    },

    editProduct: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            const formattedData = {
                title: data.title,
                slug: data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                description: data.description,
                longDescription: data.longDescription,
                sku: data.sku,
                discount: data.discount,
                brand: data.brand,
                subcategory: data.subcategory,
                categoryId: data.category,
                vendorId: data.vendor,
                featured: data.featured,
                images: data.images?.filter(Boolean) || [],
                descriptionImages: data.images?.filter(Boolean) || [],
                benefits: data.benefits?.map((b: any) => b.value).filter(Boolean) || [],
                ingredients: data.ingredients?.map((i: any) => i.value).filter(Boolean) || [],
                sizes: data.sizes?.filter((s: any) => s.size).map((size: any) => ({
                    size: size.size,
                    qty: Number(size.qty),
                    price: Number(size.price),
                    image: size.image || ""
                }))
            };

            console.log("Editing Product - Formatted Data:", formattedData);
            const res = await productService.updateProduct(id, formattedData);
            console.log("Editing Product - API Response:", res);

            if (res.ok) {
                set({ isLoading: false });
                return true;
            }
            throw new Error(res.message);
        } catch (error: any) {
            set({ error: error.message || "Failed to edit product", isLoading: false });
            return false;
        }
    },

    removeProduct: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const res = await productService.deleteProduct(id);
            if (res.ok) {
                set((state) => ({
                    products: state.products.filter(p => p.id !== id && p._id !== id),
                    isLoading: false
                }));
                return true;
            }
            throw new Error(res.message);
        } catch (error: any) {
            set({ error: error.message || "Failed to delete product", isLoading: false });
            return false;
        }
    }
}));
