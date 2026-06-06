import { create } from "zustand";

interface SearchState {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false }),
  toggleSearch: () => set((state) => ({ isOpen: !state.isOpen })),
}));

interface Product {
  _id: string;
  title: string;
  slug: string;
  sku?: string;
}

interface SearchStore {
  loading: boolean;
  results: Product[];

  setLoading: (loading: boolean) => void;
  setResults: (results: Product[]) => void;
}

export const useSearchResultsStore = create<SearchStore>((set) => ({
  loading: false,
  results: [],

  setLoading: (loading: boolean) => set({ loading }),
  setResults: (results: Product[]) => set({ results }),
}));