import { api } from "@/lib/axios";

export interface ProductImage {
    url: string;
}

export interface SubProduct {
    sku: string;
    type: string;
    qty: number;
    price: number;
    images: string[];
    size: string[];
    sold?: number;
}

export interface CreateProductData {
    title: string;
    slug?: string;
    description: string;
    longDescription?: string;
    brand: string;
    vendorId: string;
    sku: string;
    discount: number;
    categoryId: string;
    subcategory: string;
    featured: boolean;
    disableProduct?: boolean;
    disableProductDate?: string | Date | null;
    subProducts: SubProduct[];
    benefits: string[];
    ingredients: string[];
    generalImages: string[];
    descriptionImages: string[];
}

export interface Product extends Omit<CreateProductData, 'categoryId' | 'vendorId'> {
    id: string;
    _id?: string;
    category: { id: string; name: string; slug: string; parentCategory?: { id: string; name: string; slug: string } } | string;
    vendor: { id: string; name: string } | string;
    createdAt: string;
    updatedAt: string;
    // Legacy fields for transition
    sizes?: any[];
    images?: any[];
}

export const productService = {
    // GET /products — Public
    getAllProducts: async (params?: Record<string, any>): Promise<{ 
        ok: boolean; 
        message: string; 
        data: { data: Product[]; pagination: any } 
    }> => {
        const response = await api.get("products", { params });
        return response.data;
    },

    getProductById: async (id: string): Promise<{ ok: boolean; message: string; data: Product }> => {
        const response = await api.get(`products/${id}`);
        return response.data;
    },

    // GET /products/featured — Public
    getFeaturedProducts: async (categoryId?: string): Promise<{ ok: boolean; message: string; data: Product[] }> => {
        const url = categoryId ? `products/featured?categoryId=${categoryId}` : "products/featured";
        const response = await api.get(url);
        return response.data;
    },

    // GET /products/slug/:slug — Public
    getProductBySlug: async (slug: string): Promise<{ ok: boolean; message: string; data: Product }> => {
        const response = await api.get(`products/slug/${slug}`);
        // console.log("Product fetched successfully", response.data);
        return response.data;
    },

    //  /products — Admin only
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

    getProductReviews: async (id: string): Promise<{ ok: boolean; message: string; data: any[] }> => {
        const response = await api.get(`products/${id}/reviews`);
        return response.data;
    },

    addReview: async (id: string, data: { rating: number; comment: string }): Promise<{ ok: boolean; message: string; data: any }> => {
        const response = await api.post(`products/${id}/review`, data);
        return response.data;
    },

    // Admin Review endpoints
    getAllReviews: async (): Promise<{ ok: boolean; message: string; data: any[] }> => {
        const response = await api.get(`products/reviews`);
        return response.data;
    },

    updateReview: async (reviewId: string, data: { rating: number; comment: string }): Promise<{ ok: boolean; message: string; data: any }> => {
        const response = await api.put(`products/review/${reviewId}`, data);
        return response.data;
    },

    deleteReview: async (reviewId: string): Promise<{ ok: boolean; message: string; data: any }> => {
        const response = await api.delete(`products/review/${reviewId}`);
        return response.data;
    },
};
