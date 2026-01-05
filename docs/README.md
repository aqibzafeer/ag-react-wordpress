# 📚 AG - Complete Project Documentation

**Version:** 1.0  
**Last Updated:** January 6, 2026  
**Project Name:** AG (A-Garments)  
**Type:** E-commerce Fashion Store  
**Stack:** React + Vite + Tailwind CSS + WooCommerce  

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Installation & Setup](#installation--setup)
5. [Environment Configuration](#environment-configuration)
6. [Features](#features)
7. [Architecture](#architecture)
8. [API Integration](#api-integration)
9. [Component Documentation](#component-documentation)
10. [Routing](#routing)
11. [State Management](#state-management)
12. [Styling](#styling)
13. [SEO Optimization](#seo-optimization)
14. [Deployment](#deployment)
15. [Troubleshooting](#troubleshooting)
16. [Best Practices](#best-practices)
17. [Contributing](#contributing)

---

## 🎯 Project Overview

**AG** is a modern, responsive e-commerce web application built for an online clothing store. It provides a complete shopping experience from browsing products to checkout with WhatsApp integration.

### Key Features:
- 🛍️ Product browsing and filtering
- 🔍 Advanced search functionality
- 🛒 Shopping cart management
- 💳 Secure checkout process
- 📱 WhatsApp order integration
- 👤 User authentication
- 📊 Admin dashboard
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🎨 Beautiful UI with Tailwind CSS

### Business Information:
- **Brand:** AG (A-Garments)
- **Contact:** +92 302 5089439
- **Location:** Main Bazar, Kallar Syedan, Rawalpindi
- **Email:** azlangarment@gmail.com

---

## 💻 Technology Stack

### Frontend
- **Framework:** React 19.1.0
- **Build Tool:** Vite 6.3.5
- **Routing:** React Router DOM 7.6.1
- **Styling:** Tailwind CSS 4.1.7
- **Animations:** Framer Motion 12.23.0
- **Icons:** React Icons 5.5.0, Lucide React
- **HTTP Client:** Axios 1.9.0
- **Notifications:** React Toastify 11.0.5

### Backend Integration
- **E-commerce Platform:** WooCommerce REST API
- **Mock Server:** JSON Server 0.17.4
- **Authentication:** JWT (JSON Web Tokens)

### Development Tools
- **Linting:** ESLint 9.25.0
- **CSS Processing:** PostCSS, Autoprefixer
- **Task Runner:** Concurrently 9.2.1

---

## 📁 Project Structure

```
Azlan-Garments/
├── public/                      # Static assets
│   ├── product-images/         # Product image files
│   ├── robots.txt              # SEO crawler instructions
│   ├── sitemap.xml             # Site structure for SEO
│   ├── manifest.json           # PWA configuration
│   └── *.svg, *.png            # Icons and images
│
├── src/                        # Source code
│   ├── api/                    # API integration layer
│   │   ├── FetchData.jsx       # WooCommerce API calls
│   │   └── FetchDataHeadless.jsx # Headless API functions
│   │
│   ├── assets/                 # React assets
│   │   └── product-images/     # Imported images
│   │
│   ├── components/             # Reusable components
│   │   ├── header/             # Header components
│   │   │   ├── Header.jsx
│   │   │   ├── CartDrawer.jsx
│   │   │   ├── UserDrawer.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── SmartProductSearch/ # Search functionality
│   │   ├── BuySection.jsx
│   │   ├── CategoryGrid.jsx
│   │   ├── CategoryTShirts.jsx
│   │   ├── FeaturedProducts.jsx
│   │   ├── FeatureSection.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── OurValues.jsx
│   │   ├── Pagination.jsx
│   │   ├── ProductFilters.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductList.jsx
│   │   └── ProductSkeleton.jsx
│   │
│   ├── context/                # React Context
│   │   ├── CartContext.js      # Cart state management
│   │   ├── CartProvider.jsx
│   │   ├── SearchContext.jsx
│   │   ├── SearchProvider.jsx
│   │   └── useSearch.js
│   │
│   ├── data/                   # Static data
│   │   ├── dp.js               # Fallback data
│   │   └── mockProducts.js     # Mock product data
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useCart.js          # Cart management hook
│   │
│   ├── layouts/                # Layout components
│   │   ├── MainLayout.jsx      # Main site layout
│   │   └── DashboardLayout.jsx # Admin dashboard layout
│   │
│   ├── pages/                  # Page components
│   │   ├── Home.jsx            # Homepage
│   │   ├── About.jsx           # About page
│   │   ├── Contact.jsx         # Contact page
│   │   ├── Products.jsx        # Products listing
│   │   ├── SingleProduct.jsx   # Product details
│   │   ├── Checkout.jsx        # Checkout page
│   │   ├── ThankYou.jsx        # Order confirmation
│   │   ├── Login.jsx           # User login
│   │   ├── Register.jsx        # User registration
│   │   ├── Dashboard.jsx       # Admin dashboard
│   │   ├── ManageProducts.jsx  # Product management
│   │   ├── Orders.jsx          # Order management
│   │   ├── AddProductForm.jsx  # Add new product
│   │   └── PageNotFound.jsx    # 404 page
│   │
│   ├── services/               # Service layer
│   │   ├── AuthService.js      # Authentication service
│   │   └── wooCommerceAPI.js   # WooCommerce API service
│   │
│   ├── utils/                  # Utility functions
│   │   └── stripHtml.js        # HTML sanitization
│   │
│   ├── App.jsx                 # Main App component
│   ├── main.jsx                # App entry point
│   ├── routes.jsx              # Route configuration
│   └── index.css               # Global styles
│
├── docs/                       # Documentation
│   └── COMPLETE_PROJECT_DOCUMENTATION.md
│
├── db.json                     # Mock database
├── server.cjs                  # JSON Server config
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── eslint.config.js            # ESLint configuration
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/aqibzafeer/Azlan-Garments.git
cd Azlan-Garments
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory:

```env
# WooCommerce API Configuration
VITE_WOO_API_BASE_URL=https://dp.ambalatea.com/wp-json/wc/v3
VITE_WOO_CUSTOMER_KEY=ck_9960d62ecca2160e9c8f915989a8df458b8f8ded
VITE_WOO_CONSUMER_SECRET=cs_c47c841174df5a33369e9ef46333f0f69e3bf08e

# JWT Authentication
VITE_JWT_AUTH_URL=https://dp.ambalatea.com/wp-json/jwt-auth/v1

# WordPress Base URL
VITE_WORDPRESS_BASE=https://dp.ambalatea.com
```

### Step 4: Start Development Server
```bash
# Start both JSON server and Vite dev server
npm run dev

# Or start individually
npm run start:server  # JSON Server only
vite                  # Vite dev server only
```

### Step 5: Build for Production
```bash
npm run build
```

### Step 6: Preview Production Build
```bash
npm run preview
```

---

## ⚙️ Environment Configuration

### Environment Variables Explained

| Variable                      | Description                       | Required |
|---------- -------------  -----|                                   |          |
| `VITE_WOO_API_BASE_URL`       | WooCommerce REST API endpoint     | Yes      |
| `VITE_WOO_CUSTOMER_KEY`       | WooCommerce consumer key          | Yes      |
| `VITE_WOO_CONSUMER_SECRET`    | WooCommerce consumer secret       | Yes      |
| `VITE_JWT_AUTH_URL`           | JWT authentication endpoint       | Yes      |
| `VITE_WORDPRESS_BASE`         | WordPress installation URL        | Yes      |

### Getting WooCommerce API Credentials

1. Login to WordPress admin panel
2. Navigate to **WooCommerce → Settings**
3. Click **Advanced** tab → **REST API**
4. Click **Add Key**
5. Set permissions to **Read/Write**
6. Copy Consumer Key and Consumer Secret

---

## ✨ Features

### 1. Product Management
- **Product Catalog**: Browse all available products
- **Categories**: Filter by Men, Women, Boys, Girls, Kids, Accessories
- **Search**: Smart search with real-time results
- **Filtering**: Filter by price, category, availability
- **Sorting**: Sort by price, name, newest

### 2. Shopping Cart
- **Add to Cart**: Add products with quantity selection
- **Update Quantity**: Increase/decrease product quantities
- **Remove Items**: Remove products from cart
- **Cart Persistence**: Cart saved in localStorage
- **Real-time Totals**: Automatic price calculation

### 3. Checkout Process
- **Guest Checkout**: No account required
- **Shipping Information**: Collect delivery details
- **Payment Methods**:
  - Cash on Delivery (COD)
  - Credit/Debit Card
  - Easypaisa
- **Order Summary**: Review before placing order
- **Order Confirmation**: Thank you page with order details

### 4. User Authentication
- **Registration**: Create new account
- **Login**: Email/password authentication
- **JWT Tokens**: Secure session management
- **User Profile**: View and edit profile
- **Guest Checkout**: Shop without account

### 5. Product Display
- **Grid View**: Modern card layout
- **List View**: Detailed list layout
- **Product Details**: Full product information
- **Image Gallery**: Multiple product images
- **Zoom Feature**: Click to enlarge images
- **Stock Status**: Real-time availability
- **Sale Badges**: Discount percentage display

### 6. Search & Filter
- **Smart Search**: Search by name, description
- **Category Filter**: Filter by product category
- **Price Range**: Set min/max price
- **Stock Filter**: Show in-stock only
- **Sort Options**: Multiple sorting criteria

### 7. Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablets
- **Desktop**: Full-featured desktop experience
- **Touch-Friendly**: Large tap targets
- **Fast Loading**: Optimized performance

### 8. SEO Optimization
- **Meta Tags**: Complete meta information
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Crawler instructions
- **Open Graph**: Social media preview
- **Schema Markup**: Structured data ready
- **Fast Loading**: Performance optimized

### 9. Admin Dashboard
- **Product Management**: Add, edit, delete products
- **Order Management**: View and manage orders
- **Analytics**: Sales and order statistics
- **Inventory**: Stock management

---

## 🏗️ Architecture

### Frontend Architecture

```
┌─────────────────────────────────────────────────┐
│                   Browser                       │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│              React Application                  │
│  ┌────────────────────────────────────────┐     │
│  │         Routes (React Router)          │     │
│  └────────────┬───────────────────────────┘     │
│               │                                 │
│  ┌────────────▼───────────────────────────┐     │
│  │          Pages/Components              │     │
│  │  - Home, Products, Checkout, etc.      │     │
│  └────────────┬───────────────────────────┘     │
│               │                                 │
│  ┌────────────▼───────────────────────────┐     │
│  │      Context (State Management)        │     │
│  │  - Cart, Search, Auth                  │     │
│  └────────────┬───────────────────────────┘     │
│               │                                 │
│  ┌────────────▼───────────────────────────┐     │
│  │         Services Layer                 │     │
│  │  - API calls, Auth, etc.               │     │
│  └────────────┬───────────────────────────┘     │
└───────────────┼─────────────────────────────────┘
                │
┌───────────────▼─────────────────────────────────┐
│          WooCommerce REST API                   │
│        (WordPress Backend)                      │
└─────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → Component → Context/Hook → Service → API
                ↓                                    ↓
            UI Update ← State Update ← Response ← Backend
```

---

## 🔌 API Integration

### WooCommerce REST API

#### Base Configuration
```javascript
const API_BASE_URL = "https://dp.ambalatea.com/wp-json/wc/v3";
const CUSTOMER_KEY = "ck_xxxxx";
const CONSUMER_SECRET = "cs_xxxxx";
```

#### Available Endpoints

##### Products
```javascript
// Get all products
GET /wp-json/wc/v3/products

// Get single product
GET /wp-json/wc/v3/products/{id}

// Search products
GET /wp-json/wc/v3/products?search={query}

// Filter by category
GET /wp-json/wc/v3/products?category={id}
```

##### Categories
```javascript
// Get all categories
GET /wp-json/wc/v3/products/categories

// Get single category
GET /wp-json/wc/v3/products/categories/{id}
```

##### Orders
```javascript
// Create order
POST /wp-json/wc/v3/orders

// Get orders
GET /wp-json/wc/v3/orders

// Get single order
GET /wp-json/wc/v3/orders/{id}
```

##### Customers
```javascript
// Register customer
POST /wp-json/wc/v3/customers

// Get customer
GET /wp-json/wc/v3/customers/{id}

// Update customer
PUT /wp-json/wc/v3/customers/{id}
```

#### Authentication
```javascript
// JWT Login
POST /wp-json/jwt-auth/v1/token
Body: { username, password }

// Validate Token
POST /wp-json/jwt-auth/v1/token/validate
Headers: { Authorization: "Bearer {token}" }
```

### API Service Functions

#### Product Functions (`src/api/FetchData.jsx`)
```javascript
fetchProducts()           // Get all products
fetchSingleProduct(id)    // Get product by ID
searchProducts(query)     // Search products
fetchCategories()         // Get categories
createProduct(data)       // Create new product
updateProduct(id, data)   // Update product
deleteProduct(id)         // Delete product
```

#### Customer Functions (`src/api/FetchDataHeadless.jsx`)
```javascript
loginCustomer(email, password)    // Login
registerCustomer(data)            // Register
logoutCustomer()                  // Logout
getCustomerProfile()              // Get profile
createOrder(orderData)            // Create order
validateCoupon(code)              // Validate coupon
```

---

## 🧩 Component Documentation

### Core Components

#### Header (`src/components/header/Header.jsx`)
**Purpose:** Main navigation and branding

**Props:** None

**Features:**
- Logo/Brand name (AG)
- Navigation menu (Home, About, Products, Contact)
- Search bar
- User account drawer
- Shopping cart drawer
- Contact information bar
- Responsive mobile menu

**Usage:**
```jsx
<Header />
```

---

#### Footer (`src/components/Footer.jsx`)
**Purpose:** Site footer with links and information

**Props:** None

**Features:**
- Company information
- Navigation links
- Language selector
- Copyright information

---

#### ProductGrid (`src/components/ProductGrid.jsx`)
**Purpose:** Display products in grid layout

**Props:**
- `products` (Array): Product data
- `handleAddToCart` (Function): Add to cart handler
- `isLoading` (Boolean): Loading state

**Features:**
- Responsive grid layout
- Product cards with images
- Price display with sale pricing
- Add to cart button
- Hover effects
- Image error handling

**Usage:**
```jsx
<ProductGrid 
  products={products}
  handleAddToCart={addToCart}
  isLoading={loading}
/>
```

---

#### ProductList (`src/components/ProductList.jsx`)
**Purpose:** Display products in list layout

**Props:**
- `products` (Array): Product data
- `handleAddToCart` (Function): Add to cart handler

**Features:**
- List view layout
- Product thumbnails
- Detailed product info
- Category badges
- Stock status
- Discount badges

---

#### FeaturedProducts (`src/components/FeaturedProducts.jsx`)
**Purpose:** Showcase featured products

**Props:** None

**Features:**
- Auto-fetch featured products
- Carousel/slider layout
- Image loading states
- Error handling
- Responsive design

---

#### CartDrawer (`src/components/header/CartDrawer.jsx`)
**Purpose:** Shopping cart sidebar

**Props:** None

**Features:**
- Cart item list
- Quantity controls
- Remove items
- Cart totals
- Checkout button
- Empty cart state

---

#### SearchBar (`src/components/header/SearchBar.jsx`)
**Purpose:** Product search functionality

**Props:** None

**Features:**
- Real-time search
- Search suggestions
- Debounced input
- Keyboard navigation
- Click outside to close

---

#### ProductSkeleton (`src/components/ProductSkeleton.jsx`)
**Purpose:** Loading placeholder for products

**Props:**
- `count` (Number): Number of skeletons

**Features:**
- Animated loading effect
- Matches product card layout
- Responsive design

---

### Page Components

#### Home (`src/pages/Home.jsx`)
**Purpose:** Homepage

**Sections:**
- Hero banner
- Featured products
- Category grid
- Feature highlights
- Call to action

---

#### Products (`src/pages/Products.jsx`)
**Purpose:** Product listing page

**Features:**
- Product grid/list toggle
- Filters and sorting
- Pagination
- Search integration
- Category filtering

---

#### SingleProduct (`src/pages/SingleProduct.jsx`)
**Purpose:** Product detail page

**Features:**
- Product image gallery
- Image zoom
- Product information
- Add to cart
- Related products
- Quantity selector

---

#### Checkout (`src/pages/Checkout.jsx`)
**Purpose:** Checkout process

**Features:**
- Billing form
- Shipping form
- Payment method selection
- Order summary
- Form validation
- Order creation

---

#### ThankYou (`src/pages/ThankYou.jsx`)
**Purpose:** Order confirmation

**Features:**
- Order number display
- Success message
- Next steps information
- Continue shopping button
- Contact information

---

## 🛣️ Routing

### Route Structure (`src/routes.jsx`)

```javascript
// Main Layout Routes
/ → Home
/about → About
/contact → Contact
/products → Products Listing
/categories → Categories
/product/:id → Single Product
/checkout → Checkout
/thank-you → Order Confirmation

// Dashboard Layout Routes
/dashboard → Dashboard Home
/dashboard/orders → Orders Management
/dashboard/manageproducts → Product Management
/dashboard/addproduct → Add New Product
/dashboard/productsettings → Product Settings

// Other Routes
* → 404 Page Not Found
```

### Route Guards
Currently, routes are open. To add authentication:

```javascript
// Protected route wrapper
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```

---

## 🔄 State Management

### Context API

#### CartContext (`src/context/CartContext.js`)
**Purpose:** Manage shopping cart state

**State:**
```javascript
{
  cart: [],           // Cart items
  cartTotal: 0,       // Total price
  itemCount: 0        // Total items
}
```

**Methods:**
```javascript
addToCart(product, quantity)  // Add item
removeFromCart(productId)     // Remove item
updateQuantity(productId, qty)// Update quantity
clearCart()                   // Clear all items
```

**Usage:**
```javascript
import { useContext } from 'react';
import CartContext from '../context/CartContext';

const { cart, addToCart, cartTotal } = useContext(CartContext);
```

---

#### SearchContext (`src/context/SearchContext.jsx`)
**Purpose:** Manage search state

**State:**
```javascript
{
  searchQuery: '',    // Current search
  searchResults: [],  // Search results
  isSearching: false  // Loading state
}
```

**Methods:**
```javascript
setSearchQuery(query)    // Set search term
clearSearch()            // Clear search
```

---

### Custom Hooks

#### useCart (`src/hooks/useCart.js`)
**Purpose:** Simplified cart access

**Returns:**
```javascript
{
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  cartTotal,
  itemCount
}
```

**Usage:**
```javascript
import { useCart } from '../hooks/useCart';

const { addToCart, cart } = useCart();
```

---

## 🎨 Styling

### Tailwind CSS Configuration

#### Custom Colors
```javascript
theme: {
  extend: {
    colors: {
      primary: '#4F46E5',    // Indigo
      secondary: '#10B981',   // Green
      accent: '#F59E0B',      // Amber
    }
  }
}
```

#### Custom Utilities
```css
/* Custom gradient */
.bg-linear-to-r { 
  background: linear-gradient(to right, ...);
}

/* Custom animations */
.animate-bounce { ... }
```

### Global Styles (`src/index.css`)
```css
/* Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
@layer components {
  .btn-primary { ... }
  .card { ... }
}
```

---

## 🔍 SEO Optimization

### Meta Tags (`index.html`)
```html
<!-- Primary Meta Tags -->
<title>AG - Premium Fashion & Clothing</title>
<meta name="description" content="..." />
<meta name="keywords" content="..." />

<!-- Open Graph -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />

<!-- Twitter -->
<meta property="twitter:card" content="..." />
```

### Sitemap (`public/sitemap.xml`)
- Homepage
- Products page
- About page
- Contact page
- Categories page

### Robots.txt (`public/robots.txt`)
```
User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /checkout/
Sitemap: https://yourdomain.com/sitemap.xml
```

### Performance Optimization
- Lazy loading images
- Code splitting
- Asset optimization
- Gzip compression
- CDN for static assets

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Output: `dist/` directory

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Deploy to Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

### Environment Variables
Set in hosting platform:
- `VITE_WOO_API_BASE_URL`
- `VITE_WOO_CUSTOMER_KEY`
- `VITE_WOO_CONSUMER_SECRET`
- `VITE_JWT_AUTH_URL`

---

## 🐛 Troubleshooting

### Common Issues

#### 1. API Connection Errors
**Problem:** Cannot connect to WooCommerce API

**Solutions:**
- Check API credentials in `.env`
- Verify WordPress site is accessible
- Check CORS settings
- Enable WooCommerce REST API

---

#### 2. CORS Errors
**Problem:** CORS policy blocking requests

**Solutions:**
Add to WordPress `wp-config.php`:
```php
define('JWT_AUTH_CORS_ENABLE', true);
```

Add to `.htaccess`:
```apache
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header set Access-Control-Allow-Headers "Content-Type, Authorization"
```

---

#### 3. Images Not Loading
**Problem:** Product images show fallback

**Solutions:**
- Check image URLs in WooCommerce
- Verify image permissions
- Check CORS for images
- Use fallback image: `/product-images/product-9.jpg`

---

#### 4. Cart Not Persisting
**Problem:** Cart clears on refresh

**Solutions:**
- Check localStorage availability
- Verify CartProvider wraps app
- Clear browser cache
- Check for errors in console

---

#### 5. Build Errors
**Problem:** Build fails

**Solutions:**
```bash
# Clear cache
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install

# Rebuild
npm run build
```

---

## 📋 Best Practices

### Code Quality
- Use ESLint for code linting
- Follow React best practices
- Use PropTypes or TypeScript
- Write clean, readable code
- Comment complex logic

### Performance
- Lazy load components
- Optimize images
- Minimize bundle size
- Use React.memo for expensive components
- Debounce search inputs

### Security
- Validate user inputs
- Sanitize HTML content
- Use HTTPS only
- Protect API keys
- Implement rate limiting

### Accessibility
- Use semantic HTML
- Add ARIA labels
- Ensure keyboard navigation
- Maintain color contrast
- Test with screen readers

---

## 🤝 Contributing

### Development Workflow
1. Fork repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

### Code Standards
- Use ES6+ syntax
- Follow React conventions
- Write meaningful commit messages
- Update documentation
- Add tests for new features

---

## 📞 Support & Contact

**Developer:** Aqib Zafeer  
**Portfolio:** https://aqibzafeer.vercel.app/  
**Business Contact:** +92 302 5089439  
**Email:** azlangarment@gmail.com  

---

## 📄 License

Copyright © 2026 AG. All rights reserved.

---

## 🎉 Acknowledgments

- React team for amazing framework
- Tailwind CSS for utility-first CSS
- WooCommerce for e-commerce platform
- Vite for blazing fast build tool
- Community contributors

---

**Document Version:** 1.0  
**Last Updated:** January 6, 2026  
**Status:** ✅ Complete

---

