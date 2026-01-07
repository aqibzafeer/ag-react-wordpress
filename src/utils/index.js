/**
 * Utilities Barrel Export
 * Clean imports for all utility functions
 */

export { default as stripHtml } from "./stripHtml";
export { extractKeywords } from "./extractKeywords";
export {
  formatPrice,
  formatPriceSimple,
  getDiscountPercentage,
  isOnSale,
  getEffectivePrice,
  calculateSubtotal,
} from "./formatPrice";
