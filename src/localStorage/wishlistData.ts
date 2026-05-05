export interface WishlistItem {
    id: string;
    productId: string;
    slug?: string;
    variantType?: string;
    subSize?: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category?: string;
}

export interface Wishlist {
    items: WishlistItem[];
}

const WISHLIST_KEY = "store_wishlist_data";

// ⚠️ NOTE: This is NOT real encryption (just obfuscation)
const encode = (text: string): string => {
  return btoa(unescape(encodeURIComponent(text)));
};

const decode = (encoded: string): string => {
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch {
    return "";
  }
};

export const wishlistLocalStorageData = {
    getWishlist: (): WishlistItem[] => {
        if (typeof window === "undefined") return [];
        const data = localStorage.getItem(WISHLIST_KEY);
        if (!data) return [];
        try {
            return JSON.parse(decode(data));
        } catch {
            return [];
        }
    },
    saveWishlist: (items: WishlistItem[]) => {
        if (typeof window === "undefined") return;
        localStorage.setItem(WISHLIST_KEY, encode(JSON.stringify(items)));
        window.dispatchEvent(new Event("wishlistUpdated"));
    },
    addToWishlist: (item: WishlistItem) => {
        const wishlist = wishlistLocalStorageData.getWishlist();
        const existingIndex = wishlist.findIndex(i => i.id === item.id);
        if (existingIndex > -1) {
            wishlist[existingIndex].quantity += item.quantity;
        } else {
            wishlist.push(item);
        }
        wishlistLocalStorageData.saveWishlist(wishlist);
    },
    updateQuantity: (id: string, delta: number) => {
        let wishlist = wishlistLocalStorageData.getWishlist();
        wishlist = wishlist.map(item => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        });
        wishlistLocalStorageData.saveWishlist(wishlist);
    },
    removeItem: (id: string) => {
        let wishlist = wishlistLocalStorageData.getWishlist();
        wishlist = wishlist.filter(item => item.id !== id);
        wishlistLocalStorageData.saveWishlist(wishlist);
    },
    clearWishlist: () => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(WISHLIST_KEY);
        window.dispatchEvent(new Event("wishlistUpdated"));
    },
    getWishlistCount: (): number => {
        if (typeof window === "undefined") return 0;
        const data = localStorage.getItem(WISHLIST_KEY);
        if (!data) return 0;
        try {
            const items = JSON.parse(decode(data));
            return items.reduce((sum: number, item: WishlistItem) => sum + item.quantity, 0);
        } catch {
            return 0;
        }
    }
};