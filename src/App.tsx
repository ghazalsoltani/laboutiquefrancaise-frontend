import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';

function App() {
 return (
  <CartProvider>
  <BrowserRouter>
    <Routes>
      {/* Home page _ Shows all products */}
      <Route path="/" element={<Home />} />

      {/* Product detail page - :id is a URL parameter */}
      <Route path="/product/:id" element={<ProductDetail />} />

                {/* Shopping cart page */}
          <Route path="/cart" element={<CartPage />} />

    </Routes>
  </BrowserRouter>
  </CartProvider>
 );
}

export default App;