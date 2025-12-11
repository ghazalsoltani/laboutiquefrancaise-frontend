
import { createContext, ReactNode, useEffect, useState, useContext } from "react";
import { Product } from "../types";


interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (Product: Product) => void;
    removeFromCart: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
interface CartProviderProps {
    children: ReactNode;
}

//Component that wraps the app and provides cart data to all children
export function CartProvider({ children }: CartProviderProps) {
    // This loads the cart from localstorage if it exists
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window === 'undefined') return [];

        const savedCart = localStorage.getItem('cart');

        return savedCart ? JSON.parse(savedCart) : [];
    });

        // Add product to cart
          useEffect(() => {
    // Convert cart array to JSON string and save to localStorage
    // This persists the cart even when user closes/refreshes the page
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // FUNCTION: Add product to cart
  const addToCart = (product: Product) => {
    setItems(currentItems => {
      // Check if product already exists in cart
      const existingItem = currentItems.find(
        item => item.product.id === product.id
      );

      if (existingItem) {
        // Product exists: map through items and increase quantity for this product
        return currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }  // Spread operator: copy item and update quantity
            : item  // Keep other items unchanged
        );
      } else {
        // Product doesn't exist: add new item with quantity 1
        return [...currentItems, { product, quantity: 1 }];
      }
    });
  };

  // FUNCTION: Remove product completely from cart
  const removeFromCart = (productId: number) => {
    setItems(currentItems =>
      // filter creates new array excluding the product with this id
      currentItems.filter(item => item.product.id !== productId)
    );
  };

  // FUNCTION: Decrease quantity by 1
  const decreaseQuantity = (productId: number) => {
    setItems(currentItems => {
      // Find the item we want to decrease
      const existingItem = currentItems.find(
        item => item.product.id === productId
      );

      // If quantity is 1, remove the item completely
      if (existingItem && existingItem.quantity === 1) {
        return currentItems.filter(item => item.product.id !== productId);
      }

      // Otherwise, decrease quantity by 1
      return currentItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  // FUNCTION: Clear entire cart
  const clearCart = () => {
    setItems([]);  // Set to empty array
  };

  // COMPUTED VALUE: Total number of items
  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0  // Initial value
  );

  // COMPUTED VALUE: Total price with tax
  const totalPrice = items.reduce((total, item) => {
    // Calculate price with tax for this product
    const priceWithTax = item.product.price * (1 + item.product.tva / 100);
    // Add to total: price × quantity
    return total + (priceWithTax * item.quantity);
  }, 0);

  // RENDER: Provide context value to all children
  // The value prop contains everything we want to share
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// custom hook to easily access cart context from any component
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');

    }
    return context;
}
