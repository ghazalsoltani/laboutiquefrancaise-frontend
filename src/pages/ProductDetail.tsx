import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, Category } from '../types';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get addToCart from context
  const { addToCart } = useCart();

  // Fetch product and categories
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Fetch both product and categories
        const [productData, categoriesData] = await Promise.all([
          api.getProduct(parseInt(id)),
          api.getCategories()
        ]);
        
        setProduct(productData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Produit non trouvé');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Calculate price with tax
  const priceWithTax = product 
    ? product.price * (1 + product.tva / 100) 
    : 0;

  // Handle category click - navigate to home with filter
  // For now, just navigate to home (we'll improve this later)
  const handleCategoryClick = () => {
    // This will be handled by navigation
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar categories={[]} onCategoryClick={handleCategoryClick} />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Produit non trouvé
            </h1>
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-800"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full Navbar with cart icon */}
      <Navbar categories={categories} onCategoryClick={handleCategoryClick} />

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Link 
          to="/" 
          className="text-gray-600 hover:text-gray-900 flex items-center text-sm"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux produits
        </Link>
      </div>

      {/* Product detail */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left column - Product image */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`http://localhost:8080/uploads/${product.illustration}`}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right column - Product info */}
          <div>
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-4">
              <Link to="/" className="hover:text-gray-700">Accueil</Link>
              <span className="mx-2">›</span>
              <span className="text-blue-600">{product.category.name}</span>
              <span className="mx-2">›</span>
              <span>{product.name}</span>
            </nav>

            {/* Product name */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-3xl font-bold text-gray-900 mb-6">
              {priceWithTax.toFixed(2).replace('.', ',')} €
            </p>

            {/* Tax info */}
            <p className="text-sm text-gray-500 mb-6">
              TVA incluse ({product.tva}%)
            </p>

            {/* Description */}
            <div 
              className="prose text-gray-600 mb-8"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            {/* Add to cart button */}
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="w-full bg-green-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Ajouter au panier
            </button>

            {/* Category badge */}
            <div className="mt-8 pt-8 border-t">
              <p className="text-sm text-gray-500">
                Catégorie: 
                <span className="ml-2 inline-block bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                  {product.category.name}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;