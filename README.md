# Ghazaléa - Frontend

A modern, responsive e-commerce frontend built with React 18 and TypeScript, consuming a REST API powered by Symfony. This project demonstrates a decoupled architecture where the frontend and backend operate as independent applications communicating via HTTP.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe)

## 🎯 Project Purpose

This frontend application serves as the client-side interface for an e-commerce platform specializing in French artisanal accessories (bags, jewelry, sunglasses). It showcases:

- **Decoupled Architecture**: Complete separation between frontend (React SPA) and backend (Symfony REST API)
- **Modern React Patterns**: Functional components, hooks, context API for state management
- **Type Safety**: Full TypeScript implementation with strict typing
- **Responsive Design**: Mobile-first approach using Tailwind CSS utility classes
- **JWT Authentication**: Secure user authentication with token persistence
- **Stripe Integration**: Secure payment processing with Stripe Checkout
- **Optimized Wishlist**: Centralized state management with optimistic updates

## 🏗️ Architecture Overview
```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    React Application                       │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │   Pages     │  │ Components  │  │    Context      │   │  │
│  │  │  - Home     │  │  - Navbar   │  │  - AuthContext  │   │  │
│  │  │  - Product  │  │  - Product  │  │  - CartContext  │   │  │
│  │  │  - Cart     │  │    Card     │  │  - CheckoutCtx  │   │  │
│  │  │  - Checkout │  │  - Footer   │  │  - WishlistCtx  │   │  │
│  │  │  - Orders   │  │  - Hero     │  │                 │   │  │
│  │  │  - Favorites│  │  - Trust    │  │                 │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              │ HTTP (REST API)                   │
│                              ▼                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Symfony Backend (localhost:8080)              │  │
│  │    API Platform • JWT Auth • Stripe • MySQL Database       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              ▼                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Stripe API                              │  │
│  │              Secure Payment Processing                     │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## ✨ Implemented Features

### Product Catalog
- **Product Listing**: Responsive grid displaying all products with images, prices, and categories
- **Category Filtering**: Filter products by category via navigation menu or URL routing
- **Product Detail Page**: Full product information with description, price (including VAT), and add-to-cart functionality
- **Dynamic Pricing**: Automatic VAT calculation displayed to customers
- **Short Descriptions**: Truncated product descriptions on cards with "..." indicator

### Wishlist / Favorites System ⭐ NEW
- **Optimized Performance**: Single API call loads all favorites on login
- **Centralized State**: WishlistContext manages all wishlist operations
- **Optimistic Updates**: UI updates instantly, syncs with server in background
- **Heart Icon**: Visual feedback on product cards and detail pages
- **Badge Counter**: Navbar displays total favorites count
- **Persistent**: Favorites stored in database, available across sessions

```
Performance Comparison:
─────────────────────────────────────────────────
BEFORE: 20 products = 20 API calls (/check each)
AFTER:  20 products = 1 API call (load all IDs)
─────────────────────────────────────────────────
```

### Shopping Cart
- **Add/Remove Products**: Full cart management with quantity controls
- **Persistent Cart**: Cart data stored in localStorage, survives page refresh
- **Real-time Updates**: Cart badge in navigation shows current item count
- **Order Summary**: Subtotal, shipping, and total calculations

### Multi-Step Checkout
- **Address Management**: Create, select, and manage delivery addresses
- **Carrier Selection**: Choose shipping method with real-time price updates
- **Order Summary**: Review order details before payment
- **Stripe Integration**: Secure payment via Stripe Checkout
- **Order Confirmation**: Success page with order details

### Order Management
- **Order History**: View all past orders with status
- **Order Status Tracking**: Visual badges showing order state
  - 🟡 En attente de paiement
  - 🔵 Paiement validé
  - 🟣 En préparation
  - 🟢 Expédiée
  - 🔴 Annulée

### User Authentication
- **JWT-based Login**: Secure authentication using JSON Web Tokens
- **User Registration**: New account creation with form validation
- **Session Persistence**: Token stored in localStorage, automatically decoded on page refresh
- **Protected Routes**: Checkout, account, and favorites pages require authentication

### User Interface
- **Responsive Navigation**: Desktop menu with mobile hamburger menu (lg: breakpoint)
- **Account Dropdown**: User menu with quick access to account, favorites, orders
- **Trust Badges**: Custom SVG icons for delivery, returns, security, Made in France
- **Newsletter Section**: Email subscription form
- **Footer**: Gradient design matching brand colors, working category links, social media icons
- **Loading States**: Spinner animations during data fetching
- **Error Handling**: User-friendly error messages

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI library with concurrent features |
| TypeScript | Static typing for improved code quality |
| React Router 6 | Client-side routing and navigation |
| Tailwind CSS 3 | Utility-first CSS framework |
| jwt-decode | Client-side JWT token parsing |
| Context API | Global state management (Auth, Cart, Checkout, Wishlist) |
| Fetch API | HTTP requests to backend |
| Stripe | Payment processing |

## 📁 Project Structure
```
src/
├── components/              # Reusable UI components
│   ├── Navbar.tsx          # Navigation with auth, cart & wishlist badges
│   ├── ProductCard.tsx     # Product card with heart button
│   ├── Footer.tsx          # Site footer with links & social icons
│   ├── HeroSection.tsx     # Landing page hero banner
│   ├── TrustBadges.tsx     # Trust indicators with custom SVG icons
│   ├── Newsletter.tsx      # Email subscription component
│   ├── CheckoutSteps.tsx   # Checkout progress indicator
│   └── ProtectedRoute.tsx  # Route guard for authenticated pages
│
├── context/                 # React Context providers
│   ├── AuthContext.tsx     # Authentication state & JWT handling
│   ├── CartContext.tsx     # Shopping cart state & localStorage
│   ├── CheckoutContext.tsx # Checkout flow state management
│   └── WishlistContext.tsx # ⭐ Wishlist state with optimistic updates
│
├── pages/                   # Page components (routes)
│   ├── Home.tsx            # Product grid with category filter
│   ├── ProductDetail.tsx   # Single product view with wishlist
│   ├── CartPage.tsx        # Shopping cart management
│   ├── FavoritesPage.tsx   # ⭐ User's wishlist page
│   ├── LoginPage.tsx       # User login form
│   ├── RegisterPage.tsx    # User registration form
│   ├── AccountPage.tsx     # User profile (protected)
│   ├── OrdersPage.tsx      # Order history (protected)
│   └── checkout/           # Checkout flow pages
│       ├── AddressStep.tsx # Address selection/creation
│       ├── CarrierStep.tsx # Shipping method selection
│       ├── SummaryStep.tsx # Order review & payment
│       ├── SuccessPage.tsx # Payment confirmation
│       └── CancelPage.tsx  # Payment cancelled
│
├── services/                # API communication layer
│   └── api.ts              # Centralized API calls including wishlist
│
├── types/                   # TypeScript type definitions
│   └── index.ts            # Product, Category, Order, Address interfaces
│
├── App.tsx                  # Route configuration with WishlistProvider
└── index.tsx               # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Backend API running on `http://localhost:8080` (see [Backend Repository](https://github.com/ghazalsoltani/Ecommerce-Symfony-App))

### Installation
```bash
# Clone the repository
git clone https://github.com/ghazalsoltani/laboutiquefrancaise-frontend.git
cd laboutiquefrancaise-frontend

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://127.0.0.1:8080/api
```

### Testing Stripe Payments

Use these test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002`
- **Requires Auth**: `4000 0025 0000 3155`

Use any future expiry date and any 3-digit CVC.

## 🧩 Key Implementation Details

### State Management with Context API

The application uses React Context for global state:

- **AuthContext**: User authentication, JWT handling, login/logout
- **CartContext**: Shopping cart items, localStorage persistence
- **CheckoutContext**: Checkout flow state (address, carrier, order ID)
- **WishlistContext**: ⭐ Favorites management with optimistic updates

### Type-Safe API Communication

All API responses are typed with TypeScript interfaces:
```typescript
interface Product {
  id: number;
  name: string;
  slug: string;
  illustration: string;
  description: string;
  price: number;
  tva: number;
  category: Category;
  isHomepage: boolean;
}

interface WishlistContextType {
  wishlistIds: Set<number>;
  wishlistCount: number;
  isInWishlist: (productId: number) => boolean;
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  toggleWishlist: (productId: number) => Promise<void>;
}
```

### Protected Routes Pattern

Routes requiring authentication are wrapped with `ProtectedRoute`:
```tsx
<Route path="/favorites" element={
  <ProtectedRoute>
    <FavoritesPage />
  </ProtectedRoute>
} />
```

## 📊 API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products/{id}` | Get single product |
| GET | `/api/categories` | List categories |
| POST | `/api/login_check` | User authentication |
| POST | `/api/register` | User registration |
| GET | `/api/wishlist` | Get user's wishlist |
| POST | `/api/wishlist/add/{id}` | Add to wishlist |
| DELETE | `/api/wishlist/remove/{id}` | Remove from wishlist |
| GET | `/api/user/addresses` | Get user's addresses |
| POST | `/api/user/addresses` | Create address |
| GET | `/api/carriers` | List shipping carriers |
| POST | `/api/checkout/create-session` | Create Stripe session |
| GET | `/api/orders` | Get user's orders |

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 768px | Single column, hamburger menu |
| Tablet | 768px - 1023px | 2 columns, hamburger menu |
| Desktop | ≥ 1024px | 4 columns, full navigation |

## 🔗 Related Repository

This frontend consumes the API from the Symfony backend:

**Backend Repository**: [Ecommerce-Symfony-App](https://github.com/ghazalsoltani/Ecommerce-Symfony-App)

## 📝 Recent Updates

### v2.0.0 - Wishlist & UI Improvements
- ✅ Added WishlistContext for optimized favorites management
- ✅ Implemented optimistic updates for instant UI feedback
- ✅ Added wishlist badge counter in navbar
- ✅ Redesigned ProductCard with heart button
- ✅ Added custom SVG icons to TrustBadges
- ✅ Improved Footer with gradient and working links
- ✅ Added social media icons (Instagram, Facebook, TikTok)
- ✅ Updated branding with new logo

### v1.0.0 - Initial Release
- Product catalog with category filtering
- Shopping cart with localStorage persistence
- Multi-step checkout with Stripe integration
- JWT authentication
- Order history

## 👤 Author

**Ghazal Soltani**
- Email: ghazal.soltaninasab@gmail.com
- LinkedIn: [ghazal-soltani](https://www.linkedin.com/in/ghazal-soltani/)
