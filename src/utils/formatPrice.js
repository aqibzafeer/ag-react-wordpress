/**
 * Price Formatting Utilities
 * Centralized price formatting to eliminate duplication
 */

/**
 * Format price in PKR currency
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (default: PKR)
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = "PKR") => {
  if (price === null || price === undefined) return "Rs. 0";
  
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Format price with "Rs." prefix (simpler format)
 * @param {number} price 
 * @returns {string}
 */
export const formatPriceSimple = (price) => {
  if (price === null || price === undefined) return "Rs. 0";
  return `Rs. ${Number(price).toLocaleString()}`;
};

/**
 * Calculate discount percentage
 * @param {number} currentPrice - Current/sale price
 * @param {number} originalPrice - Original/compare at price
 * @returns {number} Discount percentage (0-100)
 */
export const getDiscountPercentage = (currentPrice, originalPrice) => {
  if (!originalPrice || parseFloat(originalPrice) <= parseFloat(currentPrice)) {
    return 0;
  }
  return Math.round((1 - parseFloat(currentPrice) / parseFloat(originalPrice)) * 100);
};

/**
 * Check if product is on sale
 * @param {Object} product - Product object
 * @returns {boolean}
 */
export const isOnSale = (product) => {
  return product.sale_price && 
         parseFloat(product.sale_price) < parseFloat(product.price);
};

/**
 * Get effective price (sale price if available, otherwise regular)
 * @param {Object} product - Product object
 * @returns {number}
 */
export const getEffectivePrice = (product) => {
  if (product.sale_price && parseFloat(product.sale_price) > 0) {
    return parseFloat(product.sale_price);
  }
  return parseFloat(product.price) || 0;
};

/**
 * Calculate cart subtotal
 * @param {Array} cartItems - Array of cart items
 * @returns {number}
 */
export const calculateSubtotal = (cartItems) => {
  return cartItems.reduce((sum, item) => {
    const price = getEffectivePrice(item);
    return sum + (price * item.quantity);
  }, 0);
};
