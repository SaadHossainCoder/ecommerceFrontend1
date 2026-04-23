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

export type StoredUser = User;

const USER_KEY = "clint_user_data";

/**
 * Obfuscates text using Base64 with UTF-8 support.
 * Replacement for deprecated unescape/escape.
 */
const encode = (text: string): string => {
  try {
    return btoa(
      encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
  } catch (error) {
    console.error("Encoding error:", error);
    return "";
  }
};

/**
 * Decodes obfuscated text.
 */
const decode = (encoded: string): string => {
  try {
    return decodeURIComponent(
      Array.from(atob(encoded))
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch (error) {
    return "";
  }
};

export const userLocalStorageData = {
  /**
   * Store user data in sessionStorage.
   * @param user The user object to store.
   */
  setUser: (user: User) => {
    if (typeof window === "undefined") return;

    try {
      const encoded = encode(JSON.stringify(user));
      sessionStorage.setItem(USER_KEY, encoded);
    } catch (err) {
      console.error("Failed to store user:", err);
    }
  },

  /**
   * Retrieve user data from sessionStorage safely.
   * @returns The stored user object or null if not found or invalid.
   */
  getUser: (): StoredUser | null => {
    if (typeof window === "undefined") return null;

    try {
      const data = sessionStorage.getItem(USER_KEY);
      if (!data) return null;

      const decoded = decode(data);
      if (!decoded) return null;

      const parsed = JSON.parse(decoded);

      // Validate required fields
      const requiredFields = ['id', 'role', 'username', 'email'];
      const hasRequired = requiredFields.every(field => typeof parsed[field] === 'string');

      if (hasRequired) {
        // Ensure all fields from the interface are present with defaults for safety
        return {
          id: parsed.id,
          username: parsed.username,
          email: parsed.email,
          role: parsed.role,
          phoneNumber: parsed.phoneNumber || "",
          countryCode: parsed.countryCode || "",
          gender: parsed.gender || "",
          dateOfBirth: parsed.dateOfBirth || "",
          isEmailVerified: !!parsed.isEmailVerified,
          isBlocked: !!parsed.isBlocked,
          lockedUntil: parsed.lockedUntil || null,
          createdAt: parsed.createdAt || new Date().toISOString(),
          updatedAt: parsed.updatedAt || new Date().toISOString(),
        };
      }

      return null;
    } catch (err) {
      console.error("Invalid user data:", err);
      return null;
    }
  },

  /**
   * Remove user data from sessionStorage.
   */
  removeUser: () => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(USER_KEY);
  },
};