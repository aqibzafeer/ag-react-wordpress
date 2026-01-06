import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiHeart,
} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import CartDrawer from "./CartDrawer";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/20' 
          : 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
      }`}>
        {/* Top promotional bar */}
        <div className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-center py-2 sm:py-2.5 text-xs sm:text-sm font-medium">
          <span className="hidden sm:inline">✨ Stay Warm, Stay Stylish - Winter Edit Out Now. </span>
          <span className="sm:hidden">✨ Winter Edit Out Now! </span>
          <Link to="/products" className="underline hover:text-blue-300 transition-colors ml-1">
            Shop Now!
          </Link>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center py-3 sm:py-4 relative">
            <div className="flex items-center gap-2 sm:gap-4 min-w-20 sm:min-w-30">
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 rounded-full transition-all duration-200"
                aria-label="Open menu"
              >
                <FiMenu size={22} />
              </button>
              <div className="hidden lg:flex items-center gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                >
                  <FaFacebookF size={16} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 text-gray-500 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-all duration-200"
                >
                  <FaInstagram size={16} />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                >
                  <FaYoutube size={16} />
                </a>
              </div>
            </div>

            {/* Center section: Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link to="/" className="block">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 tracking-tight">AG</h1>
              </Link>
            </div>

            {/* Right section: Icons */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 min-w-20 sm:min-w-30 justify-end">
              <button 
                onClick={() => setSearchOpen(true)} 
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-full transition-all duration-200"
                aria-label="Search"
              >
                <FiSearch className="text-lg sm:text-xl" />
              </button>
              <button className="hidden sm:flex relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-full transition-all duration-200">
              <FiHeart className="text-lg sm:text-xl" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-linear-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  0
                </span>
              </button>
              <CartDrawer />
            </div>
          </div>
        </div>

        {/* Bottom Navigation - Desktop */}
        <nav className="hidden lg:flex justify-center items-center gap-6 xl:gap-10 py-3 border-t border-gray-200/50 bg-white/30 backdrop-blur-sm">
          <Link 
            to="/" 
            className="relative text-gray-700 font-semibold text-sm tracking-wide hover:text-blue-600 transition-colors group"
          >
            HOME
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            to="/about" 
            className="relative text-gray-700 font-semibold text-sm tracking-wide hover:text-blue-600 transition-colors group"
          >
            ABOUT
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            to="/products" 
            className="relative text-gray-700 font-semibold text-sm tracking-wide hover:text-blue-600 transition-colors group"
          >
            PRODUCTS
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            to="/contact" 
            className="relative text-gray-700 font-semibold text-sm tracking-wide hover:text-blue-600 transition-colors group"
          >
            CONTACT
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all duration-300 lg:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`} 
        onClick={() => setMenuOpen(false)}
      >
        {/* Mobile Menu Drawer */}
        <div 
          className={`fixed top-0 left-0 h-full w-70 sm:w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-60 transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`} 
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Header */}
          <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
            <h2 className="font-bold text-lg text-gray-800">Menu</h2>
            <button 
              onClick={() => setMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX size={22} />
            </button>
          </div>
          
          {/* Menu Navigation */}
          <nav className="flex flex-col p-4 sm:p-5">
            <Link 
              to="/" 
              onClick={() => setMenuOpen(false)} 
              className="py-3.5 px-3 font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              HOME
            </Link>
            <Link 
              to="/about" 
              onClick={() => setMenuOpen(false)} 
              className="py-3.5 px-3 font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              ABOUT
            </Link>
            <Link 
              to="/products" 
              onClick={() => setMenuOpen(false)} 
              className="py-3.5 px-3 font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              PRODUCTS
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setMenuOpen(false)} 
              className="py-3.5 px-3 font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              CONTACT
            </Link>
          </nav>
          
          {/* Social Links */}
          <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-100 bg-linear-to-r from-gray-50 to-white">
            <p className="text-xs text-gray-500 mb-3 font-medium">Follow Us</p>
            <div className="flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
              >
                <FaFacebookF size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-pink-50 text-pink-500 rounded-full hover:bg-pink-100 transition-colors"
              >
                <FaInstagram size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-all duration-300 ${
          searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setSearchOpen(false)}
      >
        <div className="flex flex-col items-center pt-20 sm:pt-24 px-4">
          <div 
            className={`w-full max-w-xl transform transition-all duration-300 ${
              searchOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-5 py-4 pr-12 text-lg bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border-0 focus:outline-none focus:ring-4 focus:ring-blue-500/20 placeholder-gray-400"
                autoFocus
              />
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            </div>
            <p className="text-white/60 text-center mt-4 text-sm">Press ESC to close</p>
          </div>
          <button 
            onClick={() => setSearchOpen(false)} 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            <FiX size={28} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
