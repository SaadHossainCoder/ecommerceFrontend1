"use client";

import * as React from "react";
import { Search as SearchIcon, X, TrendingUp, History, ArrowRight, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/store/search-store";

const popularSearches = [
  "Handcrafted Sarees",
  "Terracotta Jewelry",
  "Kantha Stitch",
  "Leather Bags",
  "Home Decor",
];

export function Search() {
  const { isOpen, closeSearch } = useSearchStore();
  const [query, setQuery] = React.useState("");
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const stored = localStorage.getItem("recent_searches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeSearch]);

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "unset";
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const saveRecent = (value: string) => {
    const updated = [value, ...recentSearches.filter((i) => i !== value)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recent_searches", JSON.stringify(updated));
  };

  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    saveRecent(value);
    router.push(`/products?search=${encodeURIComponent(value)}`);
    closeSearch();
    setQuery("");
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

  const clearAllStorage = () => {
    localStorage.clear();
    setRecentSearches([]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeSearch}
        className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-sm transition-opacity duration-200"
      />

      {/* Panel */}
      <div className="fixed left-1/2 top-10 z-[110] w-full max-w-[600px] -translate-x-1/2 px-4">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

          {/* Top bar */}
          <div className="flex items-center justify-between px-5 pt-4 pb-0">
            <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
              Search
            </span>
            <button
              onClick={closeSearch}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Input */}
          <div className="px-5 py-3 border-b border-gray-100">
            <div className="relative flex items-center">
              <SearchIcon className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
                placeholder="Search handcrafted treasures…"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-9 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-300 focus:bg-white transition-colors"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-2 gap-5 px-5 py-4">

            {/* Recent */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  <History className="h-3 w-3 text-gray-400" />
                  <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                    Recent
                  </span>
                </div>
                {recentSearches.length > 0 && (
                  <button
                    onClick={clearAllRecent}
                    className="text-[10px] text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {recentSearches.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No recent searches yet</p>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {recentSearches.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearch(item)}
                      className="group flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <ArrowRight className="h-3 w-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {item}
                      </span>
                      <span
                        role="button"
                        onClick={(e) => removeRecentItem(item, e)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-red-400 p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Trending */}
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <TrendingUp className="h-3 w-3 text-gray-400" />
                <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                  Trending
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {popularSearches.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(item)}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Storage Controls */}
          <div className="border-t border-gray-100 px-5 py-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                Storage
              </span>
              <button
                onClick={clearAllStorage}
                className="flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-1.5 text-xs text-red-500 hover:bg-red-100 hover:border-red-200 transition-colors"
              >
                <Trash2 className="h-3 w-3" />
                Clear all storage
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-1.5 border-t border-gray-100 px-5 py-2.5">
            <span className="text-[11px] text-gray-400">Press</span>
            <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] text-gray-500">↵</kbd>
            <span className="text-[11px] text-gray-400">to search ·</span>
            <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] text-gray-500">ESC</kbd>
            <span className="text-[11px] text-gray-400">to close</span>
          </div>

        </div>
      </div>
    </>
  );
}