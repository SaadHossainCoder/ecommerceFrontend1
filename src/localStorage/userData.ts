export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  gender: string;
  dateOfBirth: string;
  role: string;
  isEmailVerified: boolean;
  isBlocked: boolean;
  lockedUntil: string | null;
  createdAt: string;
  updatedAt: string;
}

type StoredUser = {
  id: string;
  role: string;
  username: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  gender: string;
  dateOfBirth: string;
  isEmailVerified: boolean;
  isBlocked: boolean;
  lockedUntil: string | null;
  createdAt: string;
  updatedAt: string;
};

const USER_KEY = "clint";

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
  // ✅ Store user id, role, username, and email
  setUser: (user: User) => {
    if (typeof window === "undefined") return;

    try {
      const encoded = encode(JSON.stringify({ 
        id: user.id, 
        role: user.role,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber || "",
        countryCode: user.countryCode || "",
        gender: user.gender || "",
        dateOfBirth: user.dateOfBirth || "",
        isEmailVerified: user.isEmailVerified,
        isBlocked: user.isBlocked,
        lockedUntil: user.lockedUntil,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }));
      sessionStorage.setItem(USER_KEY, encoded);
    } catch (err) {
      console.error("Failed to store user:", err);
    }
  },

  // ✅ Get user safely
  getUser: (): StoredUser | null => {
    if (typeof window === "undefined") return null;

    try {
      const data = sessionStorage.getItem(USER_KEY);
      if (!data) return null;

      const decoded = decode(data);
      if (!decoded) return null;

      const parsed = JSON.parse(decoded);

      return parsed;
    } catch (err) {
      console.error("Invalid user data:", err);
      return null;
    }
  },

  // ✅ Remove user
  removeUser: () => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(USER_KEY);
  },
};