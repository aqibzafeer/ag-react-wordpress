import { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { formatPrice } from "../utils/formatPrice";
import { TOAST_CONFIG } from "../constants";
import { ProductImage, Card } from "./common";

/**
 * FeaturedProducts Component
 * Fetches products at runtime (avoids missing build-time static data file).
 */
const FeaturedProducts = memo(function FeaturedProducts() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://cocobee.com.pk/products.json");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        const all = data?.products || [];

        // Heuristic: use products tagged as Featured, otherwise just take newest 8.
        const featured = all.filter((p) => p?.tags?.includes("Featured"));
        const list = (featured.length ? featured : all)
          .slice()
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 8)
          .map((p) => ({
            id: p.id,
            name: p.title,
            price: parseFloat(p.variants?.[0]?.price) || 0,
            regular_price: parseFloat(p.variants?.[0]?.compare_at_price) || null,
            sale_price: parseFloat(p.variants?.[0]?.price) || 0,
            on_sale:
              p.variants?.[0]?.compare_at_price &&
              parseFloat(p.variants?.[0]?.compare_at_price) >
                parseFloat(p.variants?.[0]?.price),
            images: [{ src: p.images?.[0]?.src, alt: p.title }],
            handle: p.handle,
          }));

        if (mounted) setProducts(list);
      } catch {
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchFeatured();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, TOAST_CONFIG);
  };

  return (
    <section 
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="featured-products-title"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="text-center mb-12">
        <h2 
          id="featured-products-title"
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
        >
          <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-pink-500">
            Featured Products
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of premium products
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <Card 
            key={product.id} 
            className="group"
            itemScope
            itemType="https://schema.org/Product"
            itemProp="itemListElement"
          >
            <meta itemProp="position" content={String(index + 1)} />
            <div className="relative overflow-hidden bg-gray-100">
              <Link to={`/product/${product.id}`} itemProp="url">
                <ProductImage
                  src={product.images?.[0]?.src}
                  alt={product.images?.[0]?.alt || product.name}
                  className="w-full h-100 object-cover transition-transform duration-300 group-hover:scale-105"
                  itemProp="image"
                />
              </Link>
              {product.on_sale && (
                <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  Sale
                </span>
              )}
            </div>
            <div className="p-5 flex flex-col">
              <Link to={`/product/${product.id}`}>
                <h3 
                  className="text-lg font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors"
                  itemProp="name"
                >
                  {product.name}
                </h3>
              </Link>
              <meta itemProp="description" content={product.short_description} />
              <div 
                className="flex items-center justify-between mt-auto"
                itemProp="offers"
                itemScope
                itemType="https://schema.org/Offer"
              >
                <div>
                  <meta itemProp="priceCurrency" content="PKR" />
                  <span className="text-xl font-bold text-indigo-600" itemProp="price">
                    {formatPrice(product.sale_price || product.price)}
                  </span>
                  {product.sale_price && product.regular_price && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {formatPrice(product.regular_price)}
                    </span>
                  )}
                  <link itemProp="availability" href="https://schema.org/InStock" />
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all hover:shadow-md"
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/products")}
          className="px-8 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:-translate-y-1"
          aria-label="View all products in our collection"
        >
          View All Products
        </button>
      </div>
    </section>
  );
});

export default FeaturedProducts;
