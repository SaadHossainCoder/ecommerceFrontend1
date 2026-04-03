export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

type StoredUser = {
  id: string;
};

const USER_KEY = "shophub_user";

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

export const userLocalStorageData = {
  // ✅ Store only user id
  setUser: (user: User) => {
    if (typeof window === "undefined") return;

    try {
      const minimalUser: StoredUser = { id: user.id };
      const encoded = encode(JSON.stringify(minimalUser));
      localStorage.setItem(USER_KEY, encoded);
    } catch (err) {
      console.error("Failed to store user:", err);
    }
  },

  // ✅ Get only id safely
  getUser: (): StoredUser | null => {
    if (typeof window === "undefined") return null;

    try {
      const data = localStorage.getItem(USER_KEY);
      if (!data) return null;

      const decoded = decode(data);
      if (!decoded) return null;

      const parsed = JSON.parse(decoded);

      // ✅ validate shape
      if (parsed && typeof parsed.id === "string") {
        return parsed;
      }

      return null;
    } catch (err) {
      console.error("Invalid user data:", err);
      return null;
    }
  },

  // ✅ Remove user
  removeUser: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(USER_KEY);
  },
};