# La Boutique Française - React Frontend

A modern, responsive e-commerce frontend built with React 18 and TypeScript, consuming a REST API powered by Symfony. This project demonstrates a decoupled architecture where the frontend and backend operate as independent applications communicating via HTTP.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe)

## 🎯 Project Purpose

This frontend application serves as the client-side interface for an e-commerce platform specializing in French leather goods. It showcases:

- **Decoupled Architecture**: Complete separation between frontend (React SPA) and backend (Symfony REST API)
- **Modern React Patterns**: Functional components, hooks, context API for state management
- **Type Safety**: Full TypeScript implementation with strict typing
- **Responsive Design**: Mobile-first approach using Tailwind CSS utility classes
- **JWT Authentication**: Secure user authentication with token persistence
- **Stripe Integration**: Secure payment processing with Stripe Checkout

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
│  │  │  - Checkout │  │  - Checkout │  │                 │   │  │
│  │  │  - Orders   │  │    Steps    │  │                 │   │  │
│  │  │  - Account  │  │  - Protected│  │                 │   │  │
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
- **Category Filtering**: Filter products by category via navigation menu
- **Product Detail Page**: Full product information with description, price (including VAT), and add-to-cart functionality
- **Dynamic Pricing**: Automatic VAT calculation displayed to customers

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
- **Protected Routes**: Checkout and account pages require authentication

### User Interface
- **Responsive Navigation**: Desktop menu with mobile hamburger menu
- **Loading States**: Spinner animations during data fetching
- **Error Handling**: User-friendly error messages
- **Checkout Progress**: Visual step indicator during checkout

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI library with concurrent features |
| TypeScript | Static typing for improved code quality |
| React Router 6 | Client-side routing and navigation |
| Tailwind CSS 3 | Utility-first CSS framework |
| jwt-decode | Client-side JWT token parsing |
| Context API | Global state management (Auth, Cart, Checkout) |
| Fetch API | HTTP requests to backend |
| Stripe | Payment processing |

## 📁 Project Structure
```
src/
├── components/              # Reusable UI components
│   ├── Navbar.tsx          # Navigation with auth state & cart badge
│   ├── ProductCard.tsx     # Product display card
│   ├── CheckoutSteps.tsx   # Checkout progress indicator
│   └── ProtectedRoute.tsx  # Route guard for authenticated pages
│
├── context/                 # React Context providers
│   ├── AuthContext.tsx     # Authentication state & JWT handling
│   ├── CartContext.tsx     # Shopping cart state & localStorage
│   └── CheckoutContext.tsx # Checkout flow state management
│
├── pages/                   # Page components (routes)
│   ├── Home.tsx            # Product grid with category filter
│   ├── ProductDetail.tsx   # Single product view
│   ├── CartPage.tsx        # Shopping cart management
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
│   └── api.ts              # Centralized API calls
│
├── types/                   # TypeScript type definitions
│   └── index.ts            # Product, Category, Order, Address interfaces
│
├── App.tsx                  # Route configuration
└── index.tsx               # Application entry point
```

## 💳 Checkout & Payment Flow
```
┌──────────────────────────────────────────────────────────────┐
│                     Checkout Flow                             │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  1. CART                                                      │
│     └─→ Review items, click "Passer la commande"              │
│                                                               │
│  2. ADDRESS SELECTION                                         │
│     └─→ Select existing or create new delivery address        │
│                                                               │
│  3. CARRIER SELECTION                                         │
│     └─→ Choose shipping method (Colissimo, Chronopost, etc.)  │
│                                                               │
│  4. ORDER SUMMARY                                             │
│     └─→ Review order, click "Payer XX €"                      │
│                                                               │
│  5. STRIPE CHECKOUT (External)                                │
│     └─→ Enter card details on secure Stripe page              │
│     └─→ Test card: 4242 4242 4242 4242                        │
│                                                               │
│  6. CONFIRMATION                                              │
│     └─→ Payment verified, order status updated                │
│     └─→ Cart cleared, confirmation displayed                  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Flow
```
┌──────────────────────────────────────────────────────────────┐
│                    Authentication Flow                        │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  LOGIN:                                                       │
│  1. User submits email/password                               │
│  2. POST /api/login_check → Symfony validates credentials     │
│  3. Symfony returns JWT token containing user data            │
│  4. Token stored in localStorage                              │
│  5. Token decoded to extract user info (firstname, etc.)      │
│  6. User state updated, UI reflects logged-in status          │
│                                                               │
│  PAGE REFRESH:                                                │
│  1. App loads, checks localStorage for token                  │
│  2. If token exists, validate expiration                      │
│  3. Decode token to restore user state                        │
│  4. User remains authenticated (no server request needed)     │
│                                                               │
│  LOGOUT:                                                      │
│  1. Clear token from localStorage                             │
│  2. Reset user state to null                                  │
│  3. Redirect to public page                                   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
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

### Type-Safe API Communication

All API responses are typed with TypeScript interfaces:
```typescript
interface Order {
  id: number;
  createdAt: string;
  state: number;
  carrierName: string;
  carrierPrice: number;
  delivery: string;
  orderDetails: OrderDetail[];
  total: number;
}

interface Address {
  id: number;
  firstname: string;
  lastname: string;
  address: string;
  postal: string;
  city: string;
  country: string;
  phone: string;
}
```

### Protected Routes Pattern

Routes requiring authentication are wrapped with `ProtectedRoute`:
```tsx
<Route path="/checkout/address" element={
  <ProtectedRoute>
    <AddressStep />
  </ProtectedRoute>
} />
```

## 🔗 Related Repository

This frontend consumes the API from the Symfony backend:

**Backend Repository**: [Ecommerce-Symfony-App](https://github.com/ghazalsoltani/Ecommerce-Symfony-App)

## 📝 Development Approach

This project was developed following these principles:

1. **Component-Based Architecture**: Each UI element is a reusable, self-contained component
2. **Separation of Concerns**: Clear separation between UI (components), state (context), and data fetching (services)
3. **Type Safety First**: TypeScript interfaces defined before implementation
4. **Mobile-First Design**: Responsive design starting from mobile breakpoints
5. **Secure Payments**: Payment processing delegated to Stripe (PCI compliant)

## 👤 Author

**Ghazal Soltani**
- GitHub: [@ghazalsoltani](https://github.com/ghazalsoltani)
- LinkedIn: [ghazal-soltani](https://www.linkedin.com/in/ghazal-soltani/)

## 📄 License

This project is licensed under the MIT License.
