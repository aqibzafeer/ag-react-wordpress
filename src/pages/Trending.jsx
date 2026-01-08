import { useEffect, useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import Pagination from "../components/Pagination";

// Unified "Trending" page = Most Popular + New Arrivals
// Uses the same source used by the existing pages.

const SOURCE_URL = "https://cocobee.com.pk/products.json?limit=5000";

function Trending() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(SOURCE_URL);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(Array.isArray(data?.products) ? data.products : []);
      } catch (e) {
        setError(e?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const { newArrivals, mostPopular, merged } = useMemo(() => {
    const list = [...products];

    // New Arrivals: tag includes "New Arrivals"; fallback newest
    const newArrivalsList = list
      .filter((p) => p?.tags && String(p.tags).includes("New Arrivals"))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Most Popular heuristic: tags include common strings; fallback newest
    const hasPopularTag = (p) => {
      const tags = Array.isArray(p?.tags) ? p.tags : [];
      const t = tags.map((x) => String(x).toLowerCase());
      return (
        t.includes("best seller") ||
        t.includes("bestseller") ||
        t.includes("most popular") ||
        t.includes("popular")
      );
    };

    const mostPopularList = list
      .filter(hasPopularTag)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Merge: de-dupe by product id, keep order: New Arrivals first, then Popular
    const byId = new Map();
    for (const p of [...newArrivalsList, ...mostPopularList]) {
      if (!byId.has(p.id)) byId.set(p.id, p);
    }

    const mergedList = Array.from(byId.values());

    return {
      newArrivals: newArrivalsList,
      mostPopular: mostPopularList,
      merged: mergedList,
    };
  }, [products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [merged.length]);

  const totalPages = Math.ceil(merged.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const currentProducts = useMemo(() => {
    return merged.slice(indexOfFirst, indexOfLast);
  }, [merged, indexOfFirst, indexOfLast]);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);

  const getDiscountPercentage = (price, compareAtPrice) => {
    if (!compareAtPrice || parseFloat(compareAtPrice) <= parseFloat(price)) return 0;
    return Math.round((1 - parseFloat(price) / parseFloat(compareAtPrice)) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading Trending...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Trending"
        subtitle="New Arrivals and Most Popular products in one place."
        eyebrow="TRENDING"
        image="/banner-img.jpeg"
        height="md"
        align="center"
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium text-white">
            {merged.length} Total
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium text-white">
            {newArrivals.length} New Arrivals
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium text-white">
            {mostPopular.length} Most Popular
          </span>
        </div>
      </PageHero>

      <div className="container mx-auto px-4 py-8">
        {merged.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {currentProducts.map((product) => {
                const firstVariant = product.variants?.[0];
                const discount = getDiscountPercentage(firstVariant?.price, firstVariant?.compare_at_price);

                const isNew = String(product?.tags || "").includes("New Arrivals");
                const isPopular = (() => {
                  const tags = Array.isArray(product?.tags) ? product.tags : [];
                  const t = tags.map((x) => String(x).toLowerCase());
                  return (
                    t.includes("best seller") ||
                    t.includes("bestseller") ||
                    t.includes("most popular") ||
                    t.includes("popular")
                  );
                })();

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.images?.[0]?.src || "/placeholder.jpg"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />

                      {discount > 0 && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{discount}%
                        </span>
                      )}

                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        {isNew && (
                          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                        {isPopular && (
                          <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            POPULAR
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-indigo-600 font-medium mb-1 uppercase tracking-wide">
                        {product.vendor}
                      </p>
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm sm:text-base group-hover:text-indigo-600 transition-colors">
                        {product.title}
                      </h3>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg font-bold text-indigo-600">
                          {formatPrice(firstVariant?.price)}
                        </span>
                        {firstVariant?.compare_at_price &&
                          parseFloat(firstVariant.compare_at_price) > parseFloat(firstVariant.price) && (
                            <span className="text-sm text-gray-600 line-through">
                              {formatPrice(firstVariant.compare_at_price)}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
          </>
        )}
      </div>
    </div>
  );
}

export default Trending;
