/**
 * Consolidated Search Context
 * Single file for SearchContext, SearchProvider, and useSearch hook
 */

import { createContext, useContext, useMemo, useState, useCallback } from "react";

// Create context
const SearchContext = createContext(null);

/**
 * Search Provider Component
 */
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const addToHistory = useCallback((term) => {
    if (term.trim()) {
      setSearchHistory((prev) => {
        const filtered = prev.filter((t) => t !== term);
        return [term, ...filtered].slice(0, 10); // Keep last 10
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      clearSearch,
      searchHistory,
      addToHistory,
    }),
    [searchTerm, searchHistory, clearSearch, addToHistory]
  );

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

/**
 * useSearch Hook
 */
export const useSearch = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return ctx;
};

// Default export
export default SearchContext;
