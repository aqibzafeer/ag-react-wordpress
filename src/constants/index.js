/**
 * Application Constants
 * Centralized configuration values
 */

// API Configuration
export const API_CONFIG = {
  WOO_BASE_URL: import.meta.env.VITE_WOO_API_BASE_URL || "https://dp.ambalatea.com/wp-json/wc/v3",
  WORDPRESS_BASE: "https://dp.ambalatea.com",
  JWT_AUTH_URL: import.meta.env.VITE_JWT_AUTH_URL || "https://dp.ambalatea.com/wp-json/jwt-auth/v1",
};

// Pagination
export const PAGINATION = {
  PRODUCTS_PER_PAGE: 12,
  MAX_PER_PAGE: 100, // WooCommerce limit
  CACHE_TTL_MS: 5 * 60 * 1000, // 5 minutes
};

// Default Categories
export const DEFAULT_CATEGORIES = ["Kids", "Boys", "Girls", "Men", "Women"];

// Storage Keys
export const STORAGE_KEYS = {
  CART: "cart",
  PRODUCTS_CACHE: "ag_products_cache_v1",
  AUTH_TOKEN: "woo_token",
  USER_ID: "woo_user_id",
  USER_EMAIL: "woo_user_email",
  USER_NAME: "woo_user_name",
};

// Fallback Images
export const FALLBACK_IMAGES = {
  PRODUCT: "/product-images/product-9.jpg",
  BANNER: "/banner-img.jpeg",
};

// Toast Configuration
export const TOAST_CONFIG = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: "colored",
};

// Sort Options
export const SORT_OPTIONS = {
  PRICE_LOW_HIGH: "low-high",
  PRICE_HIGH_LOW: "high-low",
  NAME_A_Z: "a-z",
  NAME_Z_A: "z-a",
};

// Stock Filters
export const STOCK_FILTERS = {
  ALL: "all",
  IN_STOCK: "instock",
  ON_SALE: "onsale",
};

// Payment Methods
export const PAYMENT_METHODS = {
  COD: "cod",
  CARD: "card",
  BACS: "bacs",
  EASYPAISA: "easypaisa",
};
