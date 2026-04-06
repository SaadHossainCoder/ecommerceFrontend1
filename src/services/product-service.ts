import { api } from "@/lib/axios";

export interface ProductImage {
    url: string;
}

export interface ProductVariant {
    size: string;
    qty: number;
    price: number;
}

export interface CreateProductData {
    title: string;
    shortDescription: string;
    longDescription: string;
    brand: string;
    vendor: string;
    sku: string;
    discount: number;
    category: string;
    subcategory: string;
    isFeatured: boolean;
    sizes: ProductVariant[];
    benefits: string[];
    ingredients: string[];
    images: ProductImage[];
    descriptionImages: ProductImage[];
}

export interface Product extends CreateProductData {
    id: string;
    _id?: string;
    createdAt: string;
    updatedAt: string;
}

export const productService = {
    // GET /products — Public
    getAllProducts: async (params?: Record<string, any>): Promise<{ ok: boolean; message: string; data: Product[] }> => {
        const response = await api.get("products", { params });
        return response.data;
    },

    // GET /products/:id — Public
    getProductById: async (id: string): Promise<{ ok: boolean; message: string; data: Product }> => {
        const response = await api.get(`products/${id}`);
        return response.data;
    },

    // POST /products — Admin only
    createProduct: async (data: CreateProductData): Promise<{ ok: boolean; message: string; data: Product }> => {
        const response = await api.post("products", data);
        return response.data;
    },

    // PUT /products/:id — Admin only
    updateProduct: async (id: string, data: Partial<CreateProductData>): Promise<{ ok: boolean; message: string; data: Product }> => {
        const response = await api.put(`products/${id}`, data);
        return response.data;
    },

    // DELETE /products/:id — Admin only
    deleteProduct: async (id: string): Promise<{ ok: boolean; message: string; data: Product }> => {
        const response = await api.delete(`products/${id}`);
        return response.data;
    },
};
