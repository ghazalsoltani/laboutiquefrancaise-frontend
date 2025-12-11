import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage () {
    // Gives access to all cart data and functions
    const {
        items,
        removeFromCart,
        decreaseQuantity,
        addToCart,
        clearCart,
        totalPrice
    } = useCart();
    
// If cart is empty, show empty state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continuer mes achats
            </Link>
          </div>
        </nav>

        {/* Empty cart message */}
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <svg 
            className="w-24 h-24 mx-auto text-gray-300 mb-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Votre panier est vide
          </h1>
          <p className="text-gray-500 mb-8">
            Découvrez nos produits et ajoutez-les à votre panier
          </p>
          <Link 
            to="/" 
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Voir les produits
          </Link>
        </div>
      </div>
    );
  }

  // Cart has items - show full cart page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Continuer mes achats
          </Link>
          
          {/* Clear cart button */}
          <button
            type="button"
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Vider le panier
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Mon Panier
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items list - takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => {
              // Calculate price with tax for this product
              const priceWithTax = item.product.price * (1 + item.product.tva / 100);
              
              return (
                <div 
                  key={item.product.id}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4"
                >
                  {/* Product image */}
                  <Link to={`/product/${item.product.id}`}>
                    <img
                      src={`http://localhost:8080/uploads/${item.product.illustration}`}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product info */}
                  <div className="flex-1">
                    <Link 
                      to={`/product/${item.product.id}`}
                      className="font-semibold text-gray-900 hover:text-blue-600"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {item.product.category.name}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      {priceWithTax.toFixed(2).replace('.', ',')} €
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    {/* Decrease button */}
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.product.id)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      -
                    </button>
                    
                    {/* Quantity display */}
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    
                    {/* Increase button */}
                    <button
                      type="button"
                      onClick={() => addToCart(item.product)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal for this item */}
                  <div className="text-right min-w-[100px]">
                    <p className="font-bold text-gray-900">
                      {(priceWithTax * item.quantity).toFixed(2).replace('.', ',')} €
                    </p>
                  </div>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                    aria-label="Supprimer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Order summary - takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Récapitulatif
              </h2>
              
              {/* Subtotal */}
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-semibold">
                  {totalPrice.toFixed(2).replace('.', ',')} €
                </span>
              </div>
              
              {/* Shipping */}
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Livraison</span>
                <span className="font-semibold text-green-600">Gratuite</span>
              </div>
              
              {/* Total */}
              <div className="flex justify-between py-4">
                <span className="text-lg font-bold">Total TTC</span>
                <span className="text-lg font-bold">
                  {totalPrice.toFixed(2).replace('.', ',')} €
                </span>
              </div>

              {/* Checkout button */}
              <button
                type="button"
                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-4"
              >
                Passer la commande
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Paiement sécurisé par Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;