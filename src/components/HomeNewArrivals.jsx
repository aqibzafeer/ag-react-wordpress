import { useState, useEffect, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "../constants";
import { ProductImage, Card } from "./common";
import { FiShoppingCart, FiArrowRight } from "react-icons/fi";
import { getShopifyImageSrcSet } from "../utils/imageOptimization";

const HomeNewArrivals = memo(function HomeNewArrivals() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://cocobee.com.pk/products.json");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        // Filter products with "New Arrivals" tag
        const newArrivals = (data?.products || []).filter(
          (product) => product?.tags && product.tags.includes("New Arrivals")
        );

        // Sort by created_at date (newest first) and take only 4
        newArrivals.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        // Format products and take only 4
        const formattedProducts = newArrivals.slice(0, 4).map((product) => ({
          id: product.id,
          name: product.title,
          price: parseFloat(product.variants?.[0]?.price) || 0,
          regular_price: parseFloat(product.variants?.[0]?.compare_at_price) || null,
          sale_price: parseFloat(product.variants?.[0]?.price) || 0,
          on_sale: product.variants?.[0]?.compare_at_price && 
                   parseFloat(product.variants?.[0]?.compare_at_price) > parseFloat(product.variants?.[0]?.price),
          images: [{ src: product.images?.[0]?.src, alt: product.title }],
          handle: product.handle,
        }));

        setProducts(formattedProducts);
        setLoading(false);
      } catch (err) {
        setError(err?.message || "Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, TOAST_CONFIG);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Generate responsive image srcset for product images
  const getImageSrcSet = (imageUrl) => {
    return getShopifyImageSrcSet(imageUrl);
  };

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full mb-4">
              ✨ Just Dropped
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              New Arrivals
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Check out our latest collection
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-72"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded-full mb-3 w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-100">
            <div className="text-red-500 text-5xl mb-4">😔</div>
            <p className="text-red-600 font-medium">Failed to load new arrivals.</p>
            <p className="text-red-400 text-sm mt-1">Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="new-arrivals-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full mb-4 animate-pulse">
            ✨ Just Dropped
          </span>
          <h2 
            id="new-arrivals-title"
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            New Arrivals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our freshest styles and trending pieces
          </p>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <Link to="/new-arrivals">
                  <ProductImage
                    src={product.images?.[0]?.src}
                    alt={product.images?.[0]?.alt || product.name}
                    className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110"
                    fetchPriority={index === 0 ? "high" : "auto"}
                    srcSet={getImageSrcSet(product.images?.[0]?.src)}
                    lazy={index > 0}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </Link>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                    NEW
                  </span>
                  {product.on_sale && (
                    <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                      SALE
                    </span>
                  )}
                </div>

                {/* Quick Add Button - Shows on Hover */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-16 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-6 py-2.5 rounded-full font-semibold text-sm shadow-xl transition-all duration-300 hover:bg-indigo-600 hover:text-white flex items-center gap-2"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <FiShoppingCart className="w-4 h-4" />
                  Quick Add
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <Link to="/new-arrivals">
                  <h3 className="text-base font-semibold text-gray-900 mb-3 hover:text-indigo-600 transition-colors line-clamp-2 min-h-12">
                    {product.name}
                  </h3>
                </Link>
                
                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-indigo-600">
                    {formatPrice(product.sale_price || product.price)}
                  </span>
                  {product.on_sale && product.regular_price && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.regular_price)}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-14">
          <button
            onClick={() => navigate("/new-arrivals")}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full shadow-xl hover:bg-indigo-600 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/25"
            aria-label="View all new arrivals"
          >
            View All New Arrivals
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
});

export default HomeNewArrivals;
