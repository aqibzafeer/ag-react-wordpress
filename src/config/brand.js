/**
 * Brand & SEO Configuration
 * Centralized branding, SEO meta, and site configuration
 * 
 * WEBSITE: Azlan Garments
 * LOGO: AG
 */

// ============================================================================
// BRAND IDENTITY
// ============================================================================

export const BRAND = {
  // Primary
  NAME: "Azlan Garments",
  SHORT_NAME: "AG",
  TAGLINE: "Style That Defines You",
  DESCRIPTION: "Your trusted destination for premium fashion. Shop stylish, comfortable, and high-quality clothing.",
  
  // Legal
  COMPANY: "Azlan Garments",
  FOUNDED: "2015",
  
  // Colors (Tailwind classes)
  COLORS: {
    PRIMARY: "indigo-600",
    SECONDARY: "purple-600", 
    ACCENT: "pink-500",
  },
  
  // Contact
  CONTACT: {
    PHONE: "+92 302 5089439",
    PHONE_DISPLAY: "0302-5089439",
    EMAIL: "azlangarment@gmail.com",
    ADDRESS: "Main Bazar, Kallar Syedan, Rawalpindi, Pakistan",
    CITY: "Rawalpindi",
    COUNTRY: "Pakistan",
    COUNTRY_CODE: "PK",
  },
  
  // Social Media
  SOCIAL: {
    FACEBOOK: "https://facebook.com/azlangarments",
    INSTAGRAM: "https://instagram.com/azlangarments",
    TWITTER: "https://twitter.com/azlangarments",
    YOUTUBE: "https://youtube.com/@azlangarments",
    TIKTOK: "https://tiktok.com/@azlangarments",
    LINKEDIN: "https://linkedin.com/company/azlangarments",
  },
};

// ============================================================================
// SEO CONFIGURATION
// ============================================================================

export const SEO = {
  // Default meta tags
  DEFAULT: {
    TITLE: `${BRAND.SHORT_NAME} - Premium Fashion & Clothing`,
    DESCRIPTION: BRAND.DESCRIPTION,
    KEYWORDS: "Azlan Garments, AG, fashion, clothing, garments, online shopping, men's wear, women's wear, kids clothing, accessories, Pakistan fashion, Rawalpindi",
    AUTHOR: BRAND.NAME,
    LANGUAGE: "en",
    ROBOTS: "index, follow",
  },
  
  // Page-specific titles (append brand name)
  PAGES: {
    HOME: `${BRAND.SHORT_NAME} - Premium Fashion & Clothing`,
    PRODUCTS: `Shop All Products | ${BRAND.SHORT_NAME}`,
    ABOUT: `About Us | ${BRAND.SHORT_NAME}`,
    CONTACT: `Contact Us | ${BRAND.SHORT_NAME}`,
    CART: `Shopping Cart | ${BRAND.SHORT_NAME}`,
    CHECKOUT: `Checkout | ${BRAND.SHORT_NAME}`,
    NEW_ARRIVALS: `New Arrivals | ${BRAND.SHORT_NAME}`,
    CATEGORIES: `Shop by Category | ${BRAND.SHORT_NAME}`,
  },
  
  // Open Graph
  OG: {
    TYPE: "website",
    SITE_NAME: BRAND.NAME,
    LOCALE: "en_US",
    IMAGE: "/og-image.jpg", // Create this image (1200x630px recommended)
  },
  
  // Twitter Card
  TWITTER: {
    CARD: "summary_large_image",
    SITE: "@azlangarments",
  },
  
  // Schema.org structured data
  SCHEMA: {
    TYPE: "ClothingStore",
    PRICE_RANGE: "$$",
    CURRENCY: "PKR",
  },
};

// ============================================================================
// SITE CONFIGURATION
// ============================================================================

export const SITE_CONFIG = {
  // Currency & Locale
  CURRENCY: {
    CODE: "PKR",
    SYMBOL: "Rs.",
    LOCALE: "en-PK",
  },
  
  // Shipping
  SHIPPING: {
    FREE_THRESHOLD: 5000, // Free shipping over Rs. 5000
    STANDARD_RATE: 250,
    EXPRESS_RATE: 500,
    FREE_LABEL: "Free Shipping",
  },
  
  // Features/Promises
  FEATURES: [
    {
      icon: "/box.svg",
      title: "Free Shipping",
      description: "Free shipping on orders over Rs. 5,000",
    },
    {
      icon: "/moneyback.svg",
      title: "Money Back",
      description: "30 days money back guarantee",
    },
    {
      icon: "/secure.svg",
      title: "Secure Payment",
      description: "100% Payment Secure",
    },
    {
      icon: "/support.svg",
      title: "Support 24/7",
      description: "24/7 Online support",
    },
  ],
  
  // Categories
  CATEGORIES: [
    { name: "Men", slug: "men", image: "/product-images/category-men.jpg" },
    { name: "Women", slug: "women", image: "/product-images/category-women.png" },
    { name: "Boys", slug: "boys", image: "/product-images/category-boys.jpg" },
    { name: "Girls", slug: "girls", image: "/product-images/category-girls.jpg" },
    { name: "Kids", slug: "kids", image: "/product-images/category-kids.jpg" },
  ],
  
  // Navigation
  NAV_ITEMS: [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Products", to: "/products" },
    { label: "New Arrivals", to: "/new-arrivals", badge: "NEW" },
    { label: "Contact", to: "/contact" },
  ],
};

// ============================================================================
// PWA CONFIGURATION (for manifest.json)
// ============================================================================

export const PWA_CONFIG = {
  NAME: BRAND.NAME,
  SHORT_NAME: BRAND.SHORT_NAME,
  DESCRIPTION: BRAND.DESCRIPTION,
  THEME_COLOR: "#4F46E5", // Indigo-600
  BACKGROUND_COLOR: "#FFFFFF",
  DISPLAY: "standalone",
  ORIENTATION: "portrait-primary",
  START_URL: "/",
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate page title with brand
 */
export const getPageTitle = (pageTitle) => {
  if (!pageTitle) return SEO.DEFAULT.TITLE;
  return `${pageTitle} | ${BRAND.SHORT_NAME}`;
};

/**
 * Generate product page title
 */
export const getProductTitle = (productName) => {
  return `${productName} | ${BRAND.SHORT_NAME}`;
};

/**
 * Get full brand name with tagline
 */
export const getBrandWithTagline = () => {
  return `${BRAND.NAME} - ${BRAND.TAGLINE}`;
};
