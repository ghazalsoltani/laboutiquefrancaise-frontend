import { useEffect, useState } from 'react';
import { Product, Category } from '../types';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';

function Home() {
  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  // Get addToCart from context instead of managing cart state here
  const { addToCart } = useCart();
  
  // Loading and error states
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories()
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Impossible de charger les données');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle category filter
  const handleCategoryClick = (category: Category | null) => {
    setSelectedCategory(category);
    
    if (category === null) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category.id === category.id
      );
      setFilteredProducts(filtered);
    }
  };

  // Handle add to cart - now uses context
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-red-600">{error}</p>
          <button 
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar - removed cartItemsCount prop, now uses context */}
      <Navbar 
        categories={categories}
        onCategoryClick={handleCategoryClick}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {selectedCategory ? selectedCategory.name : 'Bienvenue'}
          </h1>
          <p className="text-xl text-gray-300">
            {selectedCategory 
              ? `Découvrez notre collection de ${selectedCategory.name.toLowerCase()}`
              : 'Découvrez notre collection de maroquinerie française'
            }
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory ? selectedCategory.name : 'Tous nos produits'}
          </h2>
          <span className="text-gray-500">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
          </span>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              Aucun produit dans cette catégorie pour le moment.
            </p>
            <button
              type="button"
              onClick={() => handleCategoryClick(null)}
              className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Voir tous les produits
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 La Boutique Française - Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;