# FoodHub Backend Service

Modular Node.js and Express REST API backend connected to MySQL database for the FoodHub food delivery platform.

## Directory Structure
```
backend/
├── config/
│   └── db.js            # MySQL connection pool & resilient fallback data layer
├── middleware/
│   ├── auth.js          # JWT authentication and user context
│   ├── errorHandler.js  # Global error handling & MySQL error code mapping
│   └── validate.js      # Request body validators
├── routes/
│   ├── auth.routes.js        # /api/auth (register, login, profile)
│   ├── restaurants.routes.js # /api/restaurants (listing & detail)
│   ├── menu.routes.js        # /api/menu (dishes, categories, dietary filters)
│   ├── orders.routes.js      # /api/orders (creation, tracking, history)
│   ├── addresses.routes.js   # /api/addresses (customer address management)
│   ├── reviews.routes.js     # /api/reviews (ratings & reviews)
│   └── reports.routes.js     # /api/reports (spending, analytics, CSV export)
├── utils/
│   ├── asyncHandler.js  # Async route wrapper
│   └── response.js      # Standard JSON envelope helpers (ok, fail)
├── test/
│   └── smoke-test.js    # Automated endpoint health verification test suite
├── server.js            # Express application bootstrapper
├── package.json
└── .env
```

## Running the Backend
```bash
# Install dependencies
npm install

# Start server in production mode
npm start

# Run automated smoke test
npm test
```
