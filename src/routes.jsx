import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoadingSpinner from "./components/LoadingSpinner";
import Home from "./pages/Home";
import Products from "./pages/Products";
import WordPressAdmin from "./pages/WordPressAdmin";

// Lazy load other pages for better performance
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Checkout = lazy(() => import("./pages/Checkout"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Main Layout Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Route>

        {/* WordPress Admin Route */}
        <Route path="/admin" element={<WordPressAdmin />} />

        {/* 404 Page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;