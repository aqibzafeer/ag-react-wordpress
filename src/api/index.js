/**
 * Unified API Module
 * Single source of truth for all API calls
 * 
 * CONSOLIDATION: This file consolidates FetchData.jsx, FetchDataHeadless.jsx, 
 * and wooCommerceAPI.js into a single, organized API layer.
 */

import axios from "axios";

// ============================================================================
// CONFIGURATION
// ============================================================================

const API_BASE_URL = import.meta.env.VITE_WOO_API_BASE_URL || "https://dp.ambalatea.com/wp-json/wc/v3";
const CUSTOMER_KEY = import.meta.env.VITE_WOO_CUSTOMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_WOO_CONSUMER_SECRET;
const WORDPRESS_BASE = "https://dp.ambalatea.com";
const JWT_AUTH_URL = import.meta.env.VITE_JWT_AUTH_URL || `${WORDPRESS_BASE}/wp-json/jwt-auth/v1`;

// ============================================================================
// AXIOS INSTANCE
// ============================================================================

const wooAPI = axios.create({
  baseURL: API_BASE_URL,
  auth: {
    username: CUSTOMER_KEY,
    password: CONSUMER_SECRET,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
wooAPI.interceptors.request.use((config) => {
  config.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
  
  // Add JWT token if available
  const token = localStorage.getItem("woo_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  
  return config;
});

// ============================================================================
// IMAGE UTILITIES
// ============================================================================

/**
 * Get valid image URL with fallback
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return "/product-images/product-9.jpg";
  
  if (imageUrl.startsWith("http")) return imageUrl;
  
  if (imageUrl.includes("/wp-content/uploads/")) {
    return `${WORDPRESS_BASE}${imageUrl}`;
  }
  
  return imageUrl;
};

/**
 * Fetch image as data URL (for CORS issues)
 */
export const fetchImageAsDataUrl = async (imageUrl) => {
  try {
    if (!imageUrl) return "/product-images/product-9.jpg";
    if (imageUrl.startsWith("/") && !imageUrl.includes("dp.ambalatea")) {
      return imageUrl;
    }

    const fullUrl = getImageUrl(imageUrl);
    const response = await axios.get(fullUrl, {
      responseType: "blob",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(response.data);
    });
  } catch (error) {
    console.warn(`Failed to fetch image: ${imageUrl}`, error);
    return "/product-images/product-9.jpg";
  }
};

// ============================================================================
// PRODUCT ENDPOINTS
// ============================================================================

/**
 * Fetch all products (auto-paginated)
 */
export const fetchProducts = async (params = {}) => {
  try {
    let allProducts = [];
    let page = 1;
    let hasMore = true;
    const perPage = Math.min(params.per_page || 100, 100); // WooCommerce max is 100

    while (hasMore) {
      const response = await wooAPI.get("/products", {
        params: { per_page: perPage, page, ...params },
      });

      allProducts = [...allProducts, ...response.data];

      const totalPages = parseInt(response.headers["x-wp-totalpages"] || 1);
      hasMore = page < totalPages;
      page++;
    }

    console.log(`Fetched ${allProducts.length} products`);
    return allProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to load products");
  }
};

/**
 * Fetch single product by ID
 */
export const fetchSingleProduct = async (id) => {
  try {
    const response = await wooAPI.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error("Failed to load product");
  }
};

/**
 * Fetch products with pagination info
 */
export const fetchProductsPaginated = async (page = 1, perPage = 12) => {
  try {
    const response = await wooAPI.get("/products", {
      params: { per_page: perPage, page },
    });
    
    return {
      products: response.data,
      totalPages: parseInt(response.headers["x-wp-totalpages"] || 1),
      totalProducts: parseInt(response.headers["x-wp-total"] || 0),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    throw error;
  }
};

/**
 * Search products
 */
export const searchProducts = async (query, limit = 20) => {
  try {
    const response = await wooAPI.get("/products", {
      params: { search: query, per_page: limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

/**
 * Create product (admin)
 */
export const createProduct = async (productData) => {
  const response = await wooAPI.post("/products", productData);
  return response.data;
};

/**
 * Update product (admin)
 */
export const updateProduct = async (id, updateData) => {
  const response = await wooAPI.put(`/products/${id}`, updateData);
  return response.data;
};

/**
 * Delete product (admin)
 */
export const deleteProduct = async (id) => {
  await wooAPI.delete(`/products/${id}`);
  return true;
};

// ============================================================================
// CATEGORY ENDPOINTS
// ============================================================================

/**
 * Fetch all categories
 */
export const fetchCategories = async () => {
  try {
    const response = await wooAPI.get("/products/categories", {
      params: { per_page: 100 },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// ============================================================================
// CUSTOMER ENDPOINTS
// ============================================================================

/**
 * Register new customer
 */
export const registerCustomer = async (data) => {
  const response = await wooAPI.post("/customers", {
    email: data.email,
    first_name: data.firstName,
    last_name: data.lastName,
    password: data.password,
    username: data.email,
    billing: {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || "",
      address_1: data.address || "",
      city: data.city || "",
      postcode: data.postcode || "",
      country: "PK",
    },
    shipping: {
      first_name: data.firstName,
      last_name: data.lastName,
      address_1: data.address || "",
      city: data.city || "",
      postcode: data.postcode || "",
      country: "PK",
    },
  });
  return response.data;
};

/**
 * Login customer (JWT)
 */
export const loginCustomer = async (email, password) => {
  const response = await axios.post(`${JWT_AUTH_URL}/token`, {
    username: email,
    password,
  });
  
  // Store auth data
  localStorage.setItem("woo_token", response.data.token);
  localStorage.setItem("woo_user_id", response.data.user_id);
  localStorage.setItem("woo_user_email", response.data.user_email);
  localStorage.setItem("woo_user_name", response.data.user_display_name);
  
  return response.data;
};

/**
 * Logout customer
 */
export const logoutCustomer = () => {
  localStorage.removeItem("woo_token");
  localStorage.removeItem("woo_user_id");
  localStorage.removeItem("woo_user_email");
  localStorage.removeItem("woo_user_name");
};

/**
 * Get customer profile
 */
export const getCustomerProfile = async () => {
  const token = localStorage.getItem("woo_token");
  if (!token) throw new Error("Not authenticated");
  
  const response = await wooAPI.get("/customers/me");
  return response.data;
};

/**
 * Get customer by ID
 */
export const getCustomerById = async (id) => {
  const response = await wooAPI.get(`/customers/${id}`);
  return response.data;
};

/**
 * Update customer profile
 */
export const updateCustomerProfile = async (id, data) => {
  const response = await wooAPI.put(`/customers/${id}`, {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    billing: {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || "",
      address_1: data.address || "",
      city: data.city || "",
      postcode: data.postcode || "",
      country: "PK",
    },
  });
  return response.data;
};

/**
 * Check if logged in
 */
export const isCustomerLoggedIn = () => !!localStorage.getItem("woo_token");

/**
 * Get logged in customer ID
 */
export const getLoggedInCustomerId = () => localStorage.getItem("woo_user_id");

// ============================================================================
// ORDER ENDPOINTS
// ============================================================================

const getPaymentMethodTitle = (method) => {
  const titles = {
    cod: "Cash on Delivery",
    card: "Credit/Debit Card",
    bacs: "Direct Bank Transfer",
    easypaisa: "Easypaisa",
  };
  return titles[method] || "Cash on Delivery";
};

/**
 * Create order
 */
export const createOrder = async (orderData) => {
  const payload = {
    payment_method: orderData.payment_method || "cod",
    payment_method_title: getPaymentMethodTitle(orderData.payment_method),
    set_paid: orderData.set_paid || false,
    status: "pending",
    customer_id: orderData.customer_id || 0,
    billing: orderData.billing,
    shipping: orderData.shipping,
    line_items: orderData.line_items,
    shipping_lines: orderData.shipping_lines || [],
    customer_note: orderData.customer_note || "",
    coupon_lines: orderData.coupon_lines || [],
  };

  const response = await wooAPI.post("/orders", payload);
  return response.data;
};

/**
 * Get customer orders
 */
export const getCustomerOrders = async (customerId) => {
  const response = await wooAPI.get("/orders", {
    params: { customer: customerId, per_page: 50, orderby: "date", order: "desc" },
  });
  return response.data;
};

/**
 * Get order details
 */
export const getOrderDetails = async (orderId) => {
  const response = await wooAPI.get(`/orders/${orderId}`);
  return response.data;
};

/**
 * Update order status (admin)
 */
export const updateOrderStatus = async (orderId, status) => {
  const response = await wooAPI.put(`/orders/${orderId}`, { status });
  return response.data;
};

/**
 * Delete order (admin)
 */
export const deleteOrder = async (orderId) => {
  await wooAPI.delete(`/orders/${orderId}`);
  return true;
};

// ============================================================================
// COUPON ENDPOINTS
// ============================================================================

/**
 * Get all coupons
 */
export const getCoupons = async () => {
  try {
    const response = await wooAPI.get("/coupons", { params: { per_page: 100 } });
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return [];
  }
};

/**
 * Get coupon by code
 */
export const getCouponByCode = async (code) => {
  const response = await wooAPI.get("/coupons", { params: { code } });
  if (response.data.length === 0) throw new Error("Coupon not found");
  return response.data[0];
};

/**
 * Validate coupon
 */
export const validateCoupon = async (code, cartTotal) => {
  const coupon = await getCouponByCode(code);
  
  if (coupon.date_expires && new Date(coupon.date_expires) < new Date()) {
    throw new Error("Coupon has expired");
  }
  
  if (coupon.minimum_amount && cartTotal < parseFloat(coupon.minimum_amount)) {
    throw new Error(`Minimum purchase: Rs ${coupon.minimum_amount}`);
  }
  
  let discount = 0;
  if (coupon.discount_type === "percent") {
    discount = (cartTotal * parseFloat(coupon.amount)) / 100;
  } else {
    discount = parseFloat(coupon.amount);
  }
  
  return { valid: true, coupon, discount };
};

// ============================================================================
// REVIEWS ENDPOINTS
// ============================================================================

/**
 * Fetch product reviews
 */
export const fetchProductReviews = async (productId) => {
  try {
    const response = await wooAPI.get("/products/reviews", {
      params: { product: productId },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews:`, error);
    return [];
  }
};

/**
 * Create product review
 */
export const createProductReview = async (reviewData) => {
  const response = await wooAPI.post("/products/reviews", reviewData);
  return response.data;
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Validate cart stock before checkout
 */
export const validateCartStock = async (cartItems) => {
  const errors = [];
  
  for (const item of cartItems) {
    try {
      const product = await fetchSingleProduct(item.id);
      
      if (!product.in_stock) {
        errors.push(`${product.name} is out of stock`);
      } else if (product.stock_quantity && item.quantity > product.stock_quantity) {
        errors.push(`Only ${product.stock_quantity} of ${product.name} available`);
      }
    } catch {
      errors.push(`Error validating ${item.name || item.id}`);
    }
  }
  
  return { valid: errors.length === 0, errors };
};

/**
 * Calculate order totals
 */
export const calculateOrderTotal = (cartItems, shipping = 0, taxRate = 0, discount = 0) => {
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  const tax = subtotal * taxRate;
  const total = subtotal + tax + shipping - discount;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    shipping: parseFloat(shipping.toFixed(2)),
    discount: parseFloat(discount.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
};

// ============================================================================
// EXPORTS
// ============================================================================

// Default export - the axios instance for custom calls
export default wooAPI;

// Named exports are above for specific functions
