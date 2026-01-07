import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts } from "../api";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { formatPrice } from "../utils/formatPrice";
import { TOAST_CONFIG } from "../constants";
import { ProductImage, Card, ProductSkeleton } from "./common";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, TOAST_CONFIG);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.slice(90, 94));
      } catch (error) {
        console.error("Error fetching featured products:", error);
        toast.error("Failed to load featured products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-pink-500">
              Featured Products
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-pink-500">
            Featured Products
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of premium products
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="group">
            <div className="relative overflow-hidden bg-gray-100">
              <Link to={`/product/${product.id}`}>
                <ProductImage
                  src={product.images?.[0]?.src}
                  alt={product.name}
                  className="w-full h-100 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                New
              </span>
            </div>
            <div className="p-5 flex flex-col">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <span className="text-xl font-bold text-indigo-600">
                    {formatPrice(product.sale_price || product.price)}
                  </span>
                  {product.sale_price && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all hover:shadow-md"
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
        >
          View All Products
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;