import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiMail } from "react-icons/fi";
import { FaWhatsapp, FaPhone, FaFacebook, FaInstagram } from "react-icons/fa";
import CartDrawer from "./CartDrawer";
import UserDrawer from "./UserDrawer";
import SearchBar from "./SearchBar";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Contact Bar - Improved */}
      <div className="bg-gray-800 text-white text-sm py-2 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
     
            <a
              href="tel:+923025089439"
              className="flex items-center gap-2 hover:text-blue-300 transition"
            >
              <FaPhone /> +92 302 5089439
            </a>



                   <a
              href="https://wa.me/923025089439"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-400 transition"
            >
              <FaWhatsapp /> +92 302 5089439
            </a>


          </div>
          
  
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4 px-4">
        <div className="container mx-auto">
          {/* Mobile Header */}
          <div className="flex items-center justify-between md:hidden relative">
            <button
              className="text-2xl text-gray-700 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>

            <Link
              to="/"
              className="absolute left-1/2 transform -translate-x-1/2"
            >
              <h1 className="text-2xl font-bold text-gray-800">AG</h1>
            </Link>

            <div className="flex items-center space-x-3">
              <UserDrawer />
              <CartDrawer />
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center">
            <Link to="/">
              <h1 className="text-3xl font-bold text-gray-800">AG</h1>
            </Link>

            <nav className="flex space-x-6 text-gray-700 font-medium">
              <Link 
                to="/" 
                className="hover:text-blue-600 transition py-2 border-b-2 border-transparent hover:border-blue-600"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="hover:text-blue-600 transition py-2 border-b-2 border-transparent hover:border-blue-600"
              >
                About
              </Link>
              <Link 
                to="/products" 
                className="hover:text-blue-600 transition py-2 border-b-2 border-transparent hover:border-blue-600"
              >
                Products
              </Link>
              <Link 
                to="/contact" 
                className="hover:text-blue-600 transition py-2 border-b-2 border-transparent hover:border-blue-600"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <SearchBar />
              <UserDrawer />
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