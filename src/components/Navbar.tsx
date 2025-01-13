import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X, ShoppingCart } from "lucide-react";
import type { RootState } from "../store/store";
// import { logout } from '../store/authSlice';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./auth0/login";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              SecureVision
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#products" className="text-gray-700 hover:text-blue-600">
              Products
            </a>
            <a href="/#solutions"
              className="text-gray-700 hover:text-blue-600"
            >
              Enterprise Solutions
            </a>
           <a href="/#about" className="text-gray-700 hover:text-blue-600">
              About
            </a>
            <button
              onClick={() => navigate("/request-demo")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Request Demo
            </button>
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {user && (
                      <div className="flex items-center">
                        <div className="ml-3 hidden md:block">
                          <p className="text-sm font-medium text-gray-700">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/#products"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Products
            </Link>
            <Link
              to="/#solutions"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Enterprise Solutions
            </Link>
            <Link
              to="/#about"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              About
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Cart ({cartItemCount})
            </Link>
            <Link
              to="/auth"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              {isAuthenticated ? "Profile" : "Sign In"}
            </Link>
            <button
              onClick={() => navigate("/request-demo")}
              className="w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Request Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
