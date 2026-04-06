import { create } from "zustand";
import { productService } from "@/services/product-service";

interface ProductStoreState {
    products: any[];
    isLoading: boolean;
    error: string | null;
    fetchProducts: (params?: Record<string, any>) => Promise<void>;
    addProduct: (data: any) => Promise<boolean>;
    editProduct: (id: string, data: any) => Promise<boolean>;
    removeProduct: (id: string) => Promise<boolean>;
}

export const useProductStore = create<ProductStoreState>((set) => ({
    products: [],
    isLoading: false,
    error: null,

    fetchProducts: async (params) => {
        set({ isLoading: true, error: null });
        try {
            const data = await productService.getAllProducts(params);
            set({ products: data.data || data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || "Failed to fetch products", isLoading: false });
        }
    },

    addProduct: async (data) => {
        set({ isLoading: true, error: null });
        try {
            // Formatting the data for backend
            const formattedData = {
                ...data,
                images: data.images?.filter(Boolean).map((url: string) => ({ url })),
                descriptionImages: data.images?.filter(Boolean).map((url: string) => ({ url })), 
                sizes: data.sizes?.filter((s: any) => s.name).map((size: any) => ({
                    size: size.name,
                    qty: Number(size.stock),
                    price: Number(size.price)
                }))
            };
            
            const res = await productService.createProduct(formattedData);
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
                ...data,
                images: data.images?.filter(Boolean).map((url: string) => ({ url })),
                descriptionImages: data.images?.filter(Boolean).map((url: string) => ({ url })),
                sizes: data.sizes?.filter((s: any) => s.name || s.size).map((size: any) => ({
                    size: size.name || size.size,
                    qty: Number(size.stock ?? size.qty),
                    price: Number(size.price)
                }))
            };
            const res = await productService.updateProduct(id, formattedData);
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
