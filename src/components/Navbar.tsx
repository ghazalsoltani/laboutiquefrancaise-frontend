import { useState } from "react";
import { Link } from "react-router-dom";
import { Category } from "../types";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  readonly categories?: Category[];
  readonly onCategoryClick?: (category: Category | null) => void;
}

function Navbar({ categories = [], onCategoryClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  // Safe categories array
  const safeCategories = Array.isArray(categories) ? categories : [];

  // Safe click handler
  const handleCategoryClick = (category: Category | null) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => handleCategoryClick(null)}
            className="flex items-center gap-3"
          >
            <img
              src="/images/logo.png"
              alt="Ghazaléa"
              className="h-12 w-12 object-contain"
            />
            <span className="text-2xl font-serif font-bold text-gray-900">
              Ghazaléa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              type="button"
              onClick={() => handleCategoryClick(null)}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium transition-all"
            >
              Tous les produits
            </button>

            {safeCategories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium transition-all"
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Right side - Auth + Cart */}
          <div className="flex items-center space-x-3">
            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Bonjour,{" "}
                  <span className="font-medium text-gray-900">
                    {user?.firstname}
                  </span>
                </span>
                <Link
                  to="/account"
                  className="px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-all"
                >
                  Mon compte
                </Link>
                <Link
                  to="/orders"
                  className="px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-all"
                >
                  Commandes
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-all"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-all"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all"
                >
                  Inscription
                </Link>
              </div>
            )}

            {/* Cart link */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              aria-label={`Panier avec ${totalItems} article${
                totalItems > 1 ? "s" : ""
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                handleCategoryClick(null);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
            >
              Tous les produits
            </button>

            {safeCategories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => {
                  handleCategoryClick(category);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              >
                {category.name}
              </button>
            ))}

            {/* Mobile auth links */}
            <div className="border-t border-gray-100 mt-4 pt-4">
              {isAuthenticated ? (
                <>
                  <p className="px-4 py-2 text-gray-600">
                    Bonjour,{" "}
                    <span className="font-medium">{user?.firstname}</span>
                  </p>
                  <Link
                    to="/account"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mon compte
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mes commandes
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;