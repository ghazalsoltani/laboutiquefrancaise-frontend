import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  readonly categories: Category[];
  readonly onCategoryClick: (category: Category | null) => void;
}

function Navbar({ categories, onCategoryClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Get totalItems from cart context - this replaces the prop we had before
  const { totalItems } = useCart();

  const handleKeyDown = (
    event: React.KeyboardEvent,
    callback: () => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900">
              🛍️ La Boutique Française
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              type="button"
              onClick={() => onCategoryClick(null)}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Tous les produits
            </button>

            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => onCategoryClick(category)}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Cart link */}
          <div className="flex items-center">
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label={`Panier avec ${totalItems} article${totalItems > 1 ? 's' : ''}`}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              
              {totalItems > 0 && (
                <span 
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  aria-hidden="true"
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-4 md:hidden p-2 text-gray-600 hover:text-gray-900"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={mobileMenuOpen 
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
          <div className="md:hidden py-4 border-t">
            <button
              type="button"
              onClick={() => {
                onCategoryClick(null);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              Tous les produits
            </button>
            
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => {
                  onCategoryClick(category);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;