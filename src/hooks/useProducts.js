import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { fetchWooProducts } from "../services/wooCommerceAPI";
import { toast } from "react-toastify";
import useSearch from "../context/useSearch";
import useDebounce from "./useDebounce";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const useProducts = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const query = useQuery();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [priceSort, setPriceSort] = useState("");
  const [alphaSort, setAlphaSort] = useState("");
  const [categorySort, setCategorySort] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const categoryFromQuery = query.get("category");
    if (categoryFromQuery) {
      setCategorySort(categoryFromQuery);
    }
  }, [query]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchWooProducts({ per_page: 100 });
        const normalized = (Array.isArray(data) ? data : []).map((p) => ({
          ...p,
          name: String(p?.name ?? ""),
          price: Number(p?.price ?? 0),
          sale_price:
            p?.sale_price === null || p?.sale_price === undefined
              ? null
              : Number(p.sale_price),
          stock_status: String(p?.stock_status ?? ""),
          categories: Array.isArray(p?.categories) ? p.categories : [],
          images: Array.isArray(p?.images) ? p.images : [],
        }));
        setProducts(normalized);
        const cats = new Set(["Kids", "Boys", "Girls", "Men", "Women"]);
        normalized.forEach((product) => {
          product.categories?.forEach((cat) => {
            if (cat?.name) cats.add(cat.name);
          });
        });
        setCategories(Array.from(cats));
      } catch (error) {
        console.error("Error loading products:", error);
        toast.error("Failed to load products from WooCommerce");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const clearAllFilters = useCallback(() => {
    setSearchTerm("");
    setPriceSort("");
    setAlphaSort("");
    setCategorySort("all");
    setStockFilter("all");
    setPriceRange({ min: "", max: "" });
    setCurrentPage(1);
  }, [setSearchTerm]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (debouncedSearchTerm) count++;
    if (priceSort) count++;
    if (alphaSort) count++;
    if (categorySort !== "all") count++;
    if (stockFilter !== "all") count++;
    if (priceRange.min || priceRange.max) count++;
    return count;
  }, [debouncedSearchTerm, priceSort, alphaSort, categorySort, stockFilter, priceRange]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) =>
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    if (categorySort !== "all") {
      result = result.filter((product) =>
        product.categories?.some(
          (cat) => cat.name && cat.name.toLowerCase() === categorySort.toLowerCase()
        )
      );
    }

    if (stockFilter === "instock") {
      result = result.filter((p) => p.stock_status === "instock");
    } else if (stockFilter === "onsale") {
      result = result.filter((p) => p.sale_price && p.sale_price < p.price);
    }

    if (priceRange.min) {
      result = result.filter((p) => (p.sale_price || p.price) >= Number(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter((p) => (p.sale_price || p.price) <= Number(priceRange.max));
    }

    if (priceSort === "low-high") {
      result = [...result].sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price));
    } else if (priceSort === "high-low") {
      result = [...result].sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price));
    }

    if (alphaSort === "a-z") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (alphaSort === "z-a") {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [products, debouncedSearchTerm, categorySort, stockFilter, priceRange, priceSort, alphaSort]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const goToPage = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const priceStats = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map((p) => p.sale_price || p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  return {
    // State
    products,
    loading,
    categories,
    priceSort,
    alphaSort,
    categorySort,
    stockFilter,
    priceRange,
    currentPage,
    searchTerm,
    // Setters
    setPriceSort,
    setAlphaSort,
    setCategorySort,
    setStockFilter,
    setPriceRange,
    setCurrentPage,
    setSearchTerm,
    // Derived state
    filteredProducts,
    currentProducts,
    totalPages,
    activeFiltersCount,
    priceStats,
    // Functions
    clearAllFilters,
    goToPage,
    indexOfFirstProduct,
    indexOfLastProduct,
  };
};
