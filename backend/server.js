// backend/server.js - FoodHub Express REST API Server Entrypoint
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Database pool setup & initialization
const db = require('./config/db');

// Error handling and response helpers
const errorHandler = require('./middleware/errorHandler');
const { fail } = require('./utils/response');

// Modular Route Handlers
const authRoutes = require('./routes/auth.routes');
const restaurantsRoutes = require('./routes/restaurants.routes');
const menuRoutes = require('./routes/menu.routes');
const ordersRoutes = require('./routes/orders.routes');
const addressesRoutes = require('./routes/addresses.routes');
const reviewsRoutes = require('./routes/reviews.routes');
const reportsRoutes = require('./routes/reports.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Cross-Origin Resource Sharing (CORS)
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

// 2. Request Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 3. Static Files Serving (Serve frontend folder and root fallback)
const frontendPath = path.join(__dirname, '..', 'frontend');
const rootPath = path.join(__dirname, '..');
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
}
app.use(express.static(rootPath));

// 4. API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantsRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/addresses', addressesRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/reports', reportsRoutes);

// Database Status & Health check endpoints
app.get('/api/db/status', (req, res) => {
  res.json({
    success: true,
    status: db.getDbStatus()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'FoodHub MySQL REST API',
    database: db.getDbStatus(),
    timestamp: new Date().toISOString()
  });
});

// Categories compatibility alias
app.get('/api/categories', (req, res) => {
  const categories = [
    { id: 'all', name: 'All Foods', icon: 'fa-utensils' },
    { id: 'burgers', name: 'Burgers', icon: 'fa-burger' },
    { id: 'pizzas', name: 'Pizzas', icon: 'fa-pizza-slice' },
    { id: 'biryani', name: 'Biryani & Rice', icon: 'fa-bowl-rice' },
    { id: 'snacks', name: 'Snacks & Sides', icon: 'fa-cookie-bite' },
    { id: 'asian', name: 'Asian & Bowls', icon: 'fa-bowl-food' },
    { id: 'pasta', name: 'Pasta & Italian', icon: 'fa-plate-wheat' },
    { id: 'desserts', name: 'Desserts', icon: 'fa-ice-cream' },
    { id: 'beverages', name: 'Drinks & Shakes', icon: 'fa-mug-hot' },
    { id: 'healthy', name: 'Healthy & Salads', icon: 'fa-leaf' }
  ];
  res.json({ success: true, data: categories });
});

// 5. Fallback Route for Single Page Application
app.get('*', (req, res) => {
  const frontendIndex = path.join(frontendPath, 'index.html');
  const rootIndex = path.join(rootPath, 'index.html');
  if (fs.existsSync(frontendIndex)) {
    return res.sendFile(frontendIndex);
  }
  return res.sendFile(rootIndex);
});

// 6. Central Error Handler
app.use(errorHandler);

// 7. Server Boot
const server = app.listen(PORT, async () => {
  console.log(`=======================================================`);
  console.log(` 🍔 FoodHub REST API Server running on port ${PORT}!`);
  console.log(` 🚀 Application: http://localhost:${PORT}`);
  console.log(` 📦 Menu API:    http://localhost:${PORT}/api/menu`);
  console.log(` 🗄️  Database:   http://localhost:${PORT}/api/db/status`);
  console.log(`=======================================================`);

  // Initialize DB Connection
  if (db.initDatabase) {
    await db.initDatabase();
  }
});

module.exports = { app, server };
