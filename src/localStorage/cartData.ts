export interface CartItem {
    id: string;
    productId: string;
    variantType?: string;
    subSize?: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category?: string;
}

export interface Cart {
    items: CartItem[];
}

const CART_KEY = "store_cart_data";

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

export const cartLocalStorageData = {
    getCart: (): CartItem[] => {
        if (typeof window === "undefined") return [];
        const data = localStorage.getItem(CART_KEY);
        if (!data) return [];
        try {
            return JSON.parse(decode(data));
        } catch {
            return [];
        }
    },
    saveCart: (items: CartItem[]) => {
        if (typeof window === "undefined") return;
        localStorage.setItem(CART_KEY, encode(JSON.stringify(items)));
        window.dispatchEvent(new Event("cartUpdated"));
    },
    addToCart: (item: CartItem) => {
        const cart = cartLocalStorageData.getCart();
        const existingIndex = cart.findIndex(i => i.id === item.id);
        if (existingIndex > -1) {
            cart[existingIndex].quantity += item.quantity;
        } else {
            cart.push(item);
        }
        cartLocalStorageData.saveCart(cart);
    },
    updateQuantity: (id: string, delta: number) => {
        let cart = cartLocalStorageData.getCart();
        cart = cart.map(item => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        });
        cartLocalStorageData.saveCart(cart);
    },
    removeItem: (id: string) => {
        let cart = cartLocalStorageData.getCart();
        cart = cart.filter(item => item.id !== id);
        cartLocalStorageData.saveCart(cart);
    },
    clearCart: () => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(CART_KEY);
        window.dispatchEvent(new Event("cartUpdated"));
    },
    getCartCount: (): number => {
        if (typeof window === "undefined") return 0;
        const data = localStorage.getItem(CART_KEY);
        if (!data) return 0;
        try {
            const items = JSON.parse(decode(data));
            return items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
        } catch {
            return 0;
        }
    }
};