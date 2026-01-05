import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiSearch, FiShoppingBag } from "react-icons/fi";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import CartDrawer from "./CartDrawer";
import SearchBar from "./SearchBar";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      {/* Top Contact Bar - Modern Design */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
            <div className="flex items-center gap-6 text-sm">
              <a
                href="tel:+923025089439"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-200 group"
              >
                <FaPhone className="text-xs group-hover:scale-110 transition-transform" /> 
                <span className="font-medium">+92 302 5089439</span>
              </a>
              <a
                href="https://wa.me/923025089439"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-400 transition-colors duration-200 group"
              >
                <FaWhatsapp className="text-base group-hover:scale-110 transition-transform" /> 
                <span className="font-medium">WhatsApp</span>
              </a>
            </div>
            <div className="text-xs md:text-sm text-gray-300">
              <span className="hidden md:inline">Free Shipping on Orders Over Rs. 2000</span>
              <span className="md:hidden">Free Shipping Over Rs. 2000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Modern & Clean */}
      <div className="py-5 px-4">
        <div className="container mx-auto">
          {/* Mobile Header */}
          <div className="flex items-center justify-between md:hidden">
            <button
              className="text-2xl text-gray-800 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>

            <Link to="/" className="flex-shrink-0">
              <img 
                src="/logo.jpg" 
                alt="AG Logo" 
                className="h-14 w-auto object-contain"
              />
            </Link>

            <div className="flex items-center gap-2">
              <CartDrawer />
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center gap-8">
            <Link to="/" className="flex-shrink-0 hover:opacity-90 transition-opacity">
              <img 
                src="/logo.jpg" 
                alt="AG Logo" 
                className="h-16 w-auto object-contain"
              />
            </Link>

            <nav className="flex items-center gap-8 flex-1 justify-center">
              <Link 
                to="/" 
                className="text-gray-700 font-semibold text-base hover:text-blue-600 transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 font-semibold text-base hover:text-blue-600 transition-colors duration-200 relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 font-semibold text-base hover:text-blue-600 transition-colors duration-200 relative group"
              >
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 font-semibold text-base hover:text-blue-600 transition-colors duration-200 relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <SearchBar />
              <CartDrawer />
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div className="md:hidden bg-white shadow-lg rounded-b-lg mt-2">
              <nav className="flex flex-col space-y-3 px-6 py-4 text-gray-700">
                <Link 
                  to="/" 
                  onClick={() => setMenuOpen(false)}
                  className="py-2 border-b border-gray-100 hover:text-blue-600"
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  onClick={() => setMenuOpen(false)}
                  className="py-2 border-b border-gray-100 hover:text-blue-600"
                >
                  About
                </Link>
                <Link 
                  to="/products" 
                  onClick={() => setMenuOpen(false)}
                  className="py-2 border-b border-gray-100 hover:text-blue-600"
                >
                  Products
                </Link>
                <Link 
                  to="/contact" 
                  onClick={() => setMenuOpen(false)}
                  className="py-2 hover:text-blue-600"
                >
                  Contact
                </Link>
                <div className="pt-3">
                  <SearchBar />
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;