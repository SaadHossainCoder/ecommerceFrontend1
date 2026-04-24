import { create } from "zustand";
import { 
    Category, 
    CategoryStats, 
    categoryService 
} from "@/services/category.service";

interface CategoryStore {
    categories: Category[];
    categoryTree: Category[];
    stats: CategoryStats | null;
    isLoading: boolean;
    error: string | null;

    fetchCategories: (refresh?: boolean) => Promise<void>;
    fetchTree: (refresh?: boolean) => Promise<void>;
    fetchStats: (refresh?: boolean) => Promise<void>;
    addMainCategory: (data: { name: string; slug: string; icon?: string; featured?: boolean }) => Promise<boolean>;
    addSubCategory: (data: { name: string; slug: string; parentCategoryId: string; icon?: string; featured?: boolean }) => Promise<boolean>;
    editCategory: (id: string, data: Partial<{ name: string; slug: string; icon: string; featured: boolean; parentCategoryId: string | null }>) => Promise<boolean>;
    removeCategory: (id: string, hard?: boolean) => Promise<boolean>;
}

// Singleton to track in-flight requests across all store instances/renders
const pendingRequests = new Set<string>();

export const useCategoryStore = create<CategoryStore>((set, get) => ({
    categories: [],
    categoryTree: [],
    stats: null,
    isLoading: false,
    error: null,

    fetchCategories: async (refresh = false) => {
        if (!refresh && get().categories.length > 0) return;
        if (pendingRequests.has("categories")) return;

        pendingRequests.add("categories");
        set({ isLoading: true, error: null });
        try {
            const result = await categoryService.getAllCategories();
            if (result.ok) set({ categories: result.data.data || [] });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to fetch categories" });
        } finally {
            pendingRequests.delete("categories");
            set({ isLoading: false });
        }
    },

    fetchTree: async (refresh = false) => {
        if (!refresh && get().categoryTree.length > 0) return;
        if (pendingRequests.has("tree")) return;

        pendingRequests.add("tree");
        set({ isLoading: true, error: null });
        try {
            const result = await categoryService.getCategoryTree();
            if (result.ok) set({ categoryTree: result.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to fetch category tree" });
        } finally {
            pendingRequests.delete("tree");
            set({ isLoading: false });
        }
    },

    fetchStats: async (refresh = false) => {
        if (!refresh && get().stats) return;
        if (pendingRequests.has("stats")) return;

        pendingRequests.add("stats");
        set({ isLoading: true, error: null });
        try {
            const result = await categoryService.getCategoryStatistics();
            if (result.ok) set({ stats: result.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to fetch stats" });
        } finally {
            pendingRequests.delete("stats");
            set({ isLoading: false });
        }
    },

    addMainCategory: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const result = await categoryService.createMainCategory(data);
            if (result.ok) {
                await Promise.all([get().fetchTree(true), get().fetchStats(true)]);
                return true;
            }
            return false;
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to add main category" });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    addSubCategory: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const result = await categoryService.createSubCategory(data);
            if (result.ok) {
                await Promise.all([get().fetchTree(true), get().fetchStats(true)]);
                return true;
            }
            return false;
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to add sub-category" });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    editCategory: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            const result = await categoryService.updateCategory(id, data);
            if (result.ok) {
                await Promise.all([get().fetchTree(true), get().fetchStats(true)]);
                return true;
            }
            return false;
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to edit category" });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    removeCategory: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const result = await categoryService.deleteCategory(id);
            if (result.ok) {
                await Promise.all([get().fetchTree(true), get().fetchStats(true)]);
                return true;
            }
            return false;
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to remove category" });
            return false;
        } finally {
            set({ isLoading: false });
        }
    }
}));
