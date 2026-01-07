/**
 * Image Optimization Utilities
 * Provides functions for responsive images, srcset generation, and image format optimization
 */

/**
 * Generate responsive image srcset for Shopify CDN images
 * @param {string} imageUrl - The original image URL
 * @returns {string|null} - Srcset string with multiple width variants
 */
export const getShopifyImageSrcSet = (imageUrl) => {
  if (!imageUrl) return null;
  
  if (imageUrl.includes('cdn.shopify.com')) {
    const baseUrl = imageUrl.split('?')[0];
    // Generate srcset for common viewport widths
    return `${baseUrl}?width=300 300w, ${baseUrl}?width=600 600w, ${baseUrl}?width=800 800w, ${baseUrl}?width=1000 1000w`;
  }
  return null;
};

/**
 * Generate responsive image srcset for local images
 * @param {string} imagePath - The local image path
 * @returns {string|null} - Srcset string with multiple width variants
 */
export const getLocalImageSrcSet = (imagePath) => {
  if (!imagePath) return null;
  
  // For local images, assuming they exist in multiple sizes
  const baseUrl = imagePath.split('.')[0];
  const extension = imagePath.split('.').pop();
  
  return `${baseUrl}.${extension} 1x, ${baseUrl}@2x.${extension} 2x`;
};

/**
 * Get WebP fallback srcset for modern image format support
 * @param {string} imageUrl - The original image URL
 * @returns {object} - Object with srcSet and type for picture element
 */
export const getModernImageFormats = (imageUrl) => {
  if (!imageUrl) return null;
  
  if (imageUrl.includes('cdn.shopify.com')) {
    const baseUrl = imageUrl.split('?')[0];
    return {
      webp: `${baseUrl}?width=300&format=webp 300w, ${baseUrl}?width=600&format=webp 600w, ${baseUrl}?width=800&format=webp 800w`,
      avif: `${baseUrl}?width=300&format=avif 300w, ${baseUrl}?width=600&format=avif 600w, ${baseUrl}?width=800&format=avif 800w`,
      original: getShopifyImageSrcSet(imageUrl)
    };
  }
  return null;
};

/**
 * Calculate sizes attribute for responsive images
 * @returns {string} - Sizes attribute value
 */
export const getResponsiveImageSizes = () => {
  return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw";
};

/**
 * Optimize image URL for performance
 * @param {string} imageUrl - The original image URL
 * @param {object} options - Optimization options
 * @returns {string} - Optimized image URL
 */
export const optimizeImageUrl = (imageUrl, options = {}) => {
  if (!imageUrl) return null;
  
  const {
    width = 800,
    format = 'auto', // 'auto', 'webp', 'avif'
    quality = 80,
  } = options;
  
  if (imageUrl.includes('cdn.shopify.com')) {
    let optimizedUrl = `${imageUrl.split('?')[0]}?width=${width}`;
    
    if (format !== 'auto') {
      optimizedUrl += `&format=${format}`;
    }
    
    if (quality) {
      optimizedUrl += `&quality=${quality}`;
    }
    
    return optimizedUrl;
  }
  
  return imageUrl;
};

/**
 * Preload critical images for LCP optimization
 * @param {string} imageUrl - The image URL to preload
 * @param {string} as - The resource type ('image')
 */
export const preloadImage = (imageUrl, as = 'image') => {
  if (!imageUrl) return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = imageUrl;
  link.type = 'image/jpeg';
  
  document.head.appendChild(link);
};

export default {
  getShopifyImageSrcSet,
  getLocalImageSrcSet,
  getModernImageFormats,
  getResponsiveImageSizes,
  optimizeImageUrl,
  preloadImage,
};
