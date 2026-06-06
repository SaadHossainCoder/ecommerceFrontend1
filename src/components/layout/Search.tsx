"use client";

import * as React from "react";
import {
  Search as SearchIcon,
  X,
  TrendingUp,
  History,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/store/search-store";

import debounce from "lodash.debounce";
import { productService } from "@/services/product.service";
import { useSearchResultsStore } from "@/store/search-store";

const popularSearches = [
  "Handcrafted Sarees",
  "Terracotta Jewelry",
  "Kantha Stitch",
  "Leather Bags",
  "Home Decor",
  "Sustainable Fashion",
  "Handloom Cotton",
  "Wooden Artifacts",
];

export function Search() {
  const { isOpen, closeSearch } = useSearchStore();
  const [query, setQuery] = React.useState("");
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);
  const [isClosing, setIsClosing] = React.useState(false);
  const [searchError, setSearchError] = React.useState<string | null>(null);
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  const {
    loading,
    results,
    setLoading,
    setResults,
  } = useSearchResultsStore();

  const debouncedSearch = React.useMemo(
    () =>
      debounce(async (value: string) => {
        try {
          if (value.trim().length < 3) {
            setResults([]);
            setSearchError(null);
            return;
          }

          setLoading(true);
          setSearchError(null);

          const response = await productService.searchproducts(value.trim(), 10);
          setResults(response.data);
        } catch (error: any) {
          console.error(error);
          setResults([]);
          if (error.response?.status === 429) {
            setSearchError("Too many searches. Please wait a moment.");
          } else if (error.response?.status >= 500) {
            setSearchError("Search unavailable. Please try again.");
          }
        } finally {
          setLoading(false);
        }
      }, 1000),
    [setLoading, setResults]
  );

  // Load recent searches from localStorage
  React.useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("recent_searches") : null;
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  const handleClose = React.useCallback(() => {
    setIsClosing(true);
    debouncedSearch.cancel();
    setTimeout(() => {
      closeSearch();
      setQuery("");
      setResults([]);
      setSearchError(null);
      setIsClosing(false);
    }, 1000);
  }, [closeSearch, debouncedSearch, setResults]);

  // Cancel debounce on unmount
  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleProductClick = (slug: string, title: string) => {
    saveRecent(title);
    router.push(`/products/${slug}`);
    handleClose();
  };

  // Handle escape key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  // Body scroll lock and focus
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
      setIsClosing(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest(".search-backdrop")
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClose]);

  const saveRecent = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const updated = [
      trimmed,
      ...recentSearches.filter((i) => i !== trimmed),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recent_searches", JSON.stringify(updated));
  };

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    saveRecent(trimmed);
    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
    handleClose();
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("recent_searches");
  };

  const removeRecentItem = (item: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentSearches.filter((i) => i !== item);
    setRecentSearches(updated);
    localStorage.setItem("recent_searches", JSON.stringify(updated));
  };

  if (!isOpen && !isClosing) return null;

  return (
    <>
      {/* Simple backdrop with fade */}
      <div
        className={`
          search-backdrop fixed inset-0 z-[100] 
          bg-black/40
          transition-all duration-200 ease-out
          ${isClosing ? "opacity-0" : "opacity-100"}
        `}
        onClick={handleClose}
      />

      {/* Modern white panel with clean shadow */}
      <div
        ref={panelRef}
        className={`
          fixed left-1/2 top-1/2 z-[110] w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 px-4
          transition-all duration-200 ease-out
          ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}
        `}
      >
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
          {/* Header with close button */}
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
              Search
            </span>
            <button
              onClick={handleClose}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search input */}
          <div className="px-5 pb-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  const value = e.target.value;
                  setQuery(value);
                  setSearchError(null);
                  if (value.trim().length < 3) {
                    setResults([]);
                    debouncedSearch.cancel();
                  } else {
                    debouncedSearch(value);
                  }
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
                placeholder="Search handcrafted treasures..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-9 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setResults([]);
                    setSearchError(null);
                    debouncedSearch.cancel();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Results or Two-column layout */}
          <div className="px-5 py-3">
            {query.trim().length >= 3 ? (
              <div>
                <div className="mb-3 flex items-center gap-1.5">
                  <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                    Search Results
                  </span>
                </div>
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500 font-medium animate-pulse">Searching for treasures...</p>
                  </div>
                ) : searchError ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-red-50 p-3 mb-3 border border-red-100">
                      <SearchIcon className="h-6 w-6 text-red-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">Search Error</p>
                    <p className="mt-1 text-xs text-gray-400 max-w-[240px]">{searchError}</p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="max-h-[300px] overflow-y-auto pr-1 space-y-1.5 scrollbar-thin">
                    {results.map((product) => (
                      <div
                        key={product._id}
                        onClick={() => handleProductClick(product.slug, product.title)}
                        className="flex items-center gap-3 rounded-xl p-2 hover:bg-gray-50 transition-all cursor-pointer group border border-transparent hover:border-gray-100"
                      >
                        {/* Product Image */}
                        {/* <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                          {product.thumbnail ? (
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-gray-400 bg-gray-50">
                              <SearchIcon className="h-4 w-4" />
                            </div>
                          )}
                        </div> */}

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-gray-800 transition-colors">
                            {product.title}
                          </h4>
                          {product.sku && (
                            <p className="text-xs text-gray-400 truncate">
                              SKU: {product.sku}
                            </p>
                          )}
                        </div>

                        {/* Action Icon */}
                        <div className="flex-shrink-0 text-gray-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0">
                          <ArrowRight className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-gray-50 p-3 mb-3 border border-gray-100">
                      <SearchIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">No results found</p>
                    <p className="mt-1 text-xs text-gray-400 max-w-[240px]">
                      We couldn't find any products matching "{query}". Try another term.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Recent searches */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <History className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                        Recent
                      </span>
                    </div>
                    {recentSearches.length > 0 && (
                      <button
                        onClick={clearAllRecent}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {recentSearches.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">No recent searches</p>
                  ) : (
                    <div className="space-y-0.5">
                      {recentSearches.map((item, idx) => (
                        <div
                          key={idx}
                          className="group flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <span className="flex flex-1 items-center gap-2" onClick={() => handleSearch(item)}>
                            <ArrowRight className="h-3 w-3 text-gray-300 group-hover:text-gray-500" />
                            {item}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => removeRecentItem(item, e)}
                            className="text-gray-300 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Trending */}
                <div>
                  <div className="mb-3 flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                      Trending
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearch(item)}
                        className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer shortcuts */}
          <div className="mt-2 border-t border-gray-100 px-5 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">Shortcuts:</span>
                <div className="flex items-center gap-1">
                  <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] text-gray-500">↵</kbd>
                  <span className="text-xs text-gray-400">search</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] text-gray-500">ESC</kbd>
                  <span className="text-xs text-gray-400">close</span>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {recentSearches.length}/5
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}