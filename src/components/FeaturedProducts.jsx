import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts, getImageUrl } from "../api/FetchData";
import { useCart } from "../hooks/useCart";
import { toast } from "react-toastify";
import ProductSkeleton from "./ProductSkeleton";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const { addToCart } = useCart();

  const handleImageError = (productId) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: "colored",
      className: "bg-green-100 text-green-800"
    });
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
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="relative overflow-hidden bg-gray-100">
              <Link to={`/product/${product.id}`}>
                <div className="aspect-w-1 aspect-h-1 w-full">
                 <img
                  src={
                    imageErrors[product.id]
                      ? "/product-images/product-9.jpg"
                      : getImageUrl(product.images?.[0]?.src)
                  }
                  alt={product.name}
                  onError={() => handleImageError(product.id)}
                  className="w-full h-100 object-cover transition-transform duration-300 group-hover:scale-105"
                  crossOrigin="anonymous"
                />
                </div>
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
                    Rs. {product.sale_price || product.price}
                  </span>
                  {product.sale_price && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      Rs. {product.price}
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
          </div>
        ))}
      </div>

      <div className="text-center mt-12">


            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:-translate-y-1"
            >
          View All Products
                     {/* <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg> */}
            </button>


      </div>
    </section>
  );
};

export default FeaturedProducts;