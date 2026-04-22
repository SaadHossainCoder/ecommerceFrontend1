import { create } from "zustand";
import { productService } from "@/services/product.service";

export interface SubProduct {
    sku: string;
    type: string;
    qty: number;
    price: number;
    images: string[];
    size: string[];
    sold?: number;
}

interface ProductStoreState {
    products: any[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    } | null;
    isLoading: boolean;
    error: string | null;
    lastParams: string | null;
    fetchProducts: (params?: Record<string, any>, refresh?: boolean) => Promise<void>;
    addProduct: (data: any) => Promise<boolean>;
    editProduct: (id: string, data: any) => Promise<boolean>;
    removeProduct: (id: string) => Promise<boolean>;
    clearProducts: () => void;
}

export const useProductStore = create<ProductStoreState>((set, get) => ({
    products: [],
    pagination: null,
    isLoading: false,
    error: null,
    lastParams: null,

    fetchProducts: async (params, refresh = false) => {
        const paramsStr = JSON.stringify(params || {});
        
        // Skip fetch if:
        // 1. Not a forced refresh
        // 2. We already have products
        // 3. The parameters (filters/page) haven't changed since last fetch
        if (!refresh && get().products.length > 0 && paramsStr === get().lastParams) {
            return;
        }

        set({ isLoading: true, error: null });
        try {
            console.log("Fetching products with params:", params);
            const res = await productService.getAllProducts(params);
            // The structure is { ok: true, message: "...", data: { data: [...], pagination: {...} } }
            const products = res.data?.data || [];
            const pagination = res.data?.pagination || null;
            set({ products, pagination, lastParams: paramsStr, isLoading: false });
        } catch (error: any) {
            const msg = error.response?.data?.error || error.response?.data?.message || error.message || "Failed to fetch products";
            set({ error: msg, isLoading: false });
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
                disableProduct: data.disableProduct || false,
                disableProductDate: data.disableProduct ? (data.disableProductDate ? new Date(data.disableProductDate).toISOString() : new Date().toISOString()) : null,
                generalImages: data.generalImages?.filter((img: string) => img && img.trim() !== "")?.length > 0
                    ? data.generalImages.filter((img: string) => img && img.trim() !== "")
                    : ["https://placehold.co/600x400/png?text=Product"],
                descriptionImages: data.generalImages?.filter((img: string) => img && img.trim() !== "") || [],
                benefits: data.benefits?.map((b: any) => b.value).filter(Boolean) || [],
                ingredients: data.ingredients?.map((i: any) => i.value).filter(Boolean) || [],
                subProducts: data.subProducts?.filter((s: any) => s.type).map((subProduct: any) => ({
                    sku: subProduct.sku || `${data.sku}-${subProduct.type?.toUpperCase()}`,
                    type: subProduct.type,
                    qty: Number(subProduct.qty),
                    price: Number(subProduct.price),
                    images: subProduct.images || (subProduct.image ? [subProduct.image] : []),
                    size: subProduct.size || []
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
            const msg = error.response?.data?.error || error.response?.data?.message || error.message || "Failed to add product";
            set({ error: msg, isLoading: false });
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
                disableProduct: data.disableProduct ?? false,
                disableProductDate: data.disableProduct ? (data.disableProductDate ? new Date(data.disableProductDate).toISOString() : new Date().toISOString()) : null,
                generalImages: data.generalImages?.filter((img: string) => img && img.trim() !== "")?.length > 0
                    ? data.generalImages.filter((img: string) => img && img.trim() !== "")
                    : ["https://placehold.co/600x400/png?text=Product"],
                descriptionImages: data.generalImages?.filter((img: string) => img && img.trim() !== "") || [],
                benefits: data.benefits?.map((b: any) => b.value).filter(Boolean) || [],
                ingredients: data.ingredients?.map((i: any) => i.value).filter(Boolean) || [],
                subProducts: data.subProducts?.filter((s: any) => s.type).map((subProduct: any) => ({
                    sku: subProduct.sku || `${data.sku}-${subProduct.type?.toUpperCase()}`,
                    type: subProduct.type,
                    qty: Number(subProduct.qty),
                    price: Number(subProduct.price),
                    images: subProduct.images || (subProduct.image ? [subProduct.image] : []),
                    size: subProduct.size || []
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
            const msg = error.response?.data?.error || error.response?.data?.message || error.message || "Failed to edit product";
            set({ error: msg, isLoading: false });
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
            const msg = error.response?.data?.error || error.response?.data?.message || error.message || "Failed to delete product";
            set({ error: msg, isLoading: false });
            return false;
        }
    },
    clearProducts: () => set({ products: [], pagination: null, error: null })
}));

interface FeaturedProductStoreState {
    featuredProducts: any[];
    isLoading: boolean;
    error: string | null;
    fetchFeaturedProducts: (categoryId?: string) => Promise<void>;
    clearFeaturedProducts: () => void;
}

export const useFeaturedProducts = create<FeaturedProductStoreState>((set) => ({
    featuredProducts: [],
    isLoading: false,
    error: null,
    fetchFeaturedProducts: async (categoryId?: string) => {
        set({ isLoading: true, error: null });
        try {
            const res = await productService.getFeaturedProducts(categoryId);
            set({ featuredProducts: res.data, isLoading: false });
        } catch (error: any) {
            const msg = error.response?.data?.error || error.response?.data?.message || error.message || "Failed to fetch featured products";
            set({ error: msg, isLoading: false });
        }
    },
    clearFeaturedProducts: () => set({ featuredProducts: [], isLoading: false, error: null })
}));