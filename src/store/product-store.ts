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
        pages: number;
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

// Singleton to track in-flight requests across all store instances/renders
const pendingRequests = new Set<string>();

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
        // 2. We already have products AND parameters haven't changed
        if (!refresh && get().products.length > 0 && paramsStr === get().lastParams) {
            return;
        }

        // 3. This exact request is already in flight (prevents double-fetching in React StrictMode/Effects)
        if (pendingRequests.has(`products-${paramsStr}`)) {
            return;
        }

        pendingRequests.add(`products-${paramsStr}`);
        set({ isLoading: true, error: null });

        try {
            console.log("Fetching products with params:", params);
            const res = await productService.getAllProducts(params);
            
            // The structure is { ok: true, message: "...", data: { data: [...], pagination: {...} } }
            const products = res.data?.data || [];
            const pagination = res.data?.pagination || null;
            
            set({ 
                products, 
                pagination, 
                lastParams: paramsStr, 
                isLoading: false 
            });
        } catch (error: any) {
            const msg = error.response?.data?.error || error.response?.data?.message || error.message || "Failed to fetch products";
            set({ error: msg, isLoading: false });
        } finally {
            pendingRequests.delete(`products-${paramsStr}`);
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
    featuredProductsByCategory: Record<string, any[]>;
    loadingStates: Record<string, boolean>;
    errors: Record<string, string | null>;
    fetchFeaturedProducts: (categoryId?: string) => Promise<void>;
    fetchFeaturedProductsBySlug: (slug: string) => Promise<void>;
    clearFeaturedProducts: () => void;
}



export const useFeaturedProducts = create<FeaturedProductStoreState>((set, get) => ({
    featuredProductsByCategory: {},
    loadingStates: {},
    errors: {},

    fetchFeaturedProducts: async (categoryId: string = "all") => {
        const state = get();
        if (state.featuredProductsByCategory[categoryId] !== undefined || pendingRequests.has(categoryId)) return;

        pendingRequests.add(categoryId);
        set((s) => ({ 
            loadingStates: { ...s.loadingStates, [categoryId]: true },
            errors: { ...s.errors, [categoryId]: null }
        }));

        try {
            const res = await productService.getFeaturedProducts(categoryId === "all" ? undefined : categoryId);
            set((s) => ({
                featuredProductsByCategory: { ...s.featuredProductsByCategory, [categoryId]: res.data || [] },
                loadingStates: { ...s.loadingStates, [categoryId]: false }
            }));
        } catch (error: any) {
            set((s) => ({
                errors: { ...s.errors, [categoryId]: error.message },
                loadingStates: { ...s.loadingStates, [categoryId]: false }
            }));
        } finally {
            pendingRequests.delete(categoryId);
        }
    },

    fetchFeaturedProductsBySlug: async (slug: string) => {
        const state = get();
        if (state.featuredProductsByCategory[slug] !== undefined || pendingRequests.has(slug)) return;

        pendingRequests.add(slug);
        set((s) => ({ 
            loadingStates: { ...s.loadingStates, [slug]: true },
            errors: { ...s.errors, [slug]: null }
        }));

        try {
            console.log(`[Store] Fetching featured products for slug: ${slug}`);
            const res = await productService.getFeaturedProductsBySlug(slug);
            set((s) => ({
                featuredProductsByCategory: { ...s.featuredProductsByCategory, [slug]: res.data || [] },
                loadingStates: { ...s.loadingStates, [slug]: false }
            }));
        } catch (error: any) {
            set((s) => ({
                errors: { ...s.errors, [slug]: error.message },
                loadingStates: { ...s.loadingStates, [slug]: false }
            }));
        } finally {
            pendingRequests.delete(slug);
        }
    },

    clearFeaturedProducts: () => {
        pendingRequests.clear();
        set({ featuredProductsByCategory: {}, loadingStates: {}, errors: {} });
    }
}));

// ====================== PRODUCT DETAIL STORE ======================
// Single API call → stores ALL data for the product detail page
// Uses getProductBySlug which returns: product, productReviews, relatedProducts

interface ProductDetailState {
    product: any | null;
    reviews: any[];
    relatedProducts: any[];
    isLoading: boolean;
    error: string | null;
    currentSlug: string | null;
    fetchBySlug: (slug: string) => Promise<void>;
    refreshBySlug: (slug: string) => Promise<void>;
    clearDetail: () => void;
}

export const useProductDetail = create<ProductDetailState>((set, get) => ({
    product: null,
    reviews: [],
    relatedProducts: [],
    isLoading: false,
    error: null,
    currentSlug: null,

    fetchBySlug: async (slug: string) => {
        // Skip if already loaded for this slug
        if (get().currentSlug === slug && get().product) return;

        set({ isLoading: true, error: null, currentSlug: slug });
        try {
            const res = await productService.getProductBySlug(slug);
            const data = res.data as any;
            set({
                product: data,
                reviews: data?.productReviews ?? [],
                relatedProducts: data?.relatedProducts ?? [],
                isLoading: false
            });
        } catch (error: any) {
            const msg = error.response?.data?.message || error.message || "Failed to load product";
            set({ error: msg, isLoading: false });
        }
    },

    // Force re-fetch (e.g. after submitting a review)
    refreshBySlug: async (slug: string) => {
        try {
            const res = await productService.getProductBySlug(slug);
            const data = res.data as any;
            set({
                product: data,
                reviews: data?.productReviews ?? [],
                relatedProducts: data?.relatedProducts ?? [],
            });
        } catch (error: any) {
            console.error("Failed to refresh product", error);
        }
    },

    clearDetail: () => set({
        product: null,
        reviews: [],
        relatedProducts: [],
        error: null,
        currentSlug: null
    })
}));

export interface ProductAdminState {
    products: any[];
    pagination: any;
    error: string | null;
    isLoading: boolean;
    fetchProducts: (filters: any) => Promise<void>;
    clearProducts: () => void;
}

export const useProductsByAdmin = create<ProductAdminState>((set) => ({
    products: [],
    pagination: null,
    error: null,
    isLoading: false,

    fetchProducts: async (filters: any) => {
        set({ isLoading: true, error: null });
        try {
            const res = await productService.getAllProductsByAdmin(filters);
            set({
                products: res.data.data,
                pagination: res.data.pagination,
                isLoading: false
            });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    clearProducts: () => set({ products: [], pagination: null, error: null })
}));