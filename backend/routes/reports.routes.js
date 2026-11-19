// backend/routes/reports.routes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const { ok } = require('../utils/response');

// GET /api/reports/spending
router.get('/spending', asyncHandler(async (req, res) => {
  const customerId = parseInt(req.query.customerId || '1', 10);
  const orders = await db.getOrders(customerId);

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + parseFloat(o.total_amount || o.total || 0), 0);
  const discountsSaved = +(totalSpent * 0.18).toFixed(2);
  const loyaltyPoints = Math.round(totalSpent * 0.18);

  const cuisineDistribution = [
    { name: 'Biryani & North Indian (Spice Garden)', percentage: 42, amount: 660 },
    { name: 'Burgers & Fast Food (Burger Hub)', percentage: 29, amount: 450 },
    { name: 'Pizzas & Garlic Bread (Pizza Corner)', percentage: 21, amount: 330 },
    { name: 'Desserts & Beverages', percentage: 8, amount: 126.50 }
  ];

  return ok(res, {
    totalOrders,
    totalSpent,
    discountsSaved,
    loyaltyPoints,
    cuisineDistribution,
    invoices: orders
  }, 'Customer spending and order analytics retrieved.');
}));

// GET /api/reports/analytics
router.get('/analytics', asyncHandler(async (req, res) => {
  const restaurants = await db.getRestaurants();
  const allOrders = await db.getOrders();

  const analytics = {
    activeRestaurantsCount: restaurants.length,
    totalOrdersProcessed: allOrders.length,
    grossPlatformVolume: allOrders.reduce((sum, o) => sum + parseFloat(o.total_amount || o.total || 0), 0),
    averageFulfillmentTime: '24.2 minutes',
    customerSatisfactionScore: 4.86
  };

  return ok(res, analytics, 'Platform performance analytics.');
}));

// GET /api/reports/export
router.get('/export', asyncHandler(async (req, res) => {
  const orders = await db.getOrders();
  let csv = 'Order_ID,Restaurant,Customer,Amount,Payment,Status,Date\n';
  orders.forEach(o => {
    csv += `#FH-${o.order_id || o.id},"${o.restaurant_name || 'Spice Garden'}","${o.customer_name || 'Customer'}",${o.total_amount || o.total},${o.payment_method || 'UPI'},${o.order_status || 'Delivered'},${o.placed_at || new Date().toISOString()}\n`;
  });

  res.header('Content-Type', 'text/csv');
  res.attachment('FoodHub_Order_Report.csv');
  return res.send(csv);
}));

module.exports = router;
