// backend/routes/orders.routes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const { ok, fail } = require('../utils/response');
const { validateOrder } = require('../middleware/validate');

// POST /api/orders
router.post('/', validateOrder, asyncHandler(async (req, res) => {
  const {
    customerId,
    restaurantId,
    addressId,
    zoneId,
    items,
    subtotal,
    discount,
    deliveryFee,
    tax,
    paymentMethod
  } = req.body;

  const sub = Number(subtotal) || 0;
  const disc = Number(discount) || 0;
  const del = Number(deliveryFee) || 0;
  const tx = Number(tax) || 0;
  const tot = Math.max(0, sub - disc + tx + del);

  // Save to MySQL orders table with transaction
  const order = await db.createOrder({
    customerId: parseInt(customerId || '1', 10),
    restaurantId: parseInt(restaurantId || '1', 10),
    addressId: parseInt(addressId || '1', 10),
    zoneId: parseInt(zoneId || '1', 10),
    items,
    subtotal: sub,
    discount: disc,
    taxAmount: tx,
    deliveryCharge: del,
    totalAmount: tot,
    paymentMethod: paymentMethod || 'Cash on Delivery'
  });

  return res.status(201).json({
    success: true,
    message: 'Order placed and recorded in MySQL database!',
    order: {
      id: `FH-${order.order_id}`,
      dbOrderId: order.order_id,
      restaurantName: order.restaurant_name || 'Spice Garden',
      customerName: order.customer_name || 'Aarav Sharma',
      address: order.address_line || '12 MP Nagar, Bhopal',
      total: tot,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      status: order.order_status || 'Placed',
      driverName: order.driver_name || 'Aman Verma',
      driverPhone: order.driver_phone || '9820000001',
      items
    }
  });
}));

// GET /api/orders
router.get('/', asyncHandler(async (req, res) => {
  const customerId = req.query.customerId ? parseInt(req.query.customerId, 10) : null;
  const orders = await db.getOrders(customerId);
  return res.json({
    success: true,
    count: orders.length,
    data: orders
  });
}));

// GET /api/orders/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const rawId = req.params.id.replace('FH-', '');
  const order = await db.getOrderById(rawId);
  if (!order) {
    return fail(res, 404, 'Order not found in database.');
  }
  return ok(res, order, 'Order retrieved.');
}));

// GET /api/orders/track/:id
router.get('/track/:id', asyncHandler(async (req, res) => {
  const rawId = req.params.id.replace('FH-', '');
  const order = await db.getOrderById(rawId);
  if (!order) {
    return fail(res, 404, 'Order tracker unavailable for this order.');
  }

  const tracker = {
    orderId: `FH-${order.order_id || rawId}`,
    status: order.order_status || 'Out for Delivery',
    estimatedDeliveryTime: '22 minutes',
    driver: {
      name: order.driver_name || 'Aman Verma',
      phone: order.driver_phone || '+91 98200 00001',
      vehicle: 'Hero Electric Optima (MP-04-EB-1204)'
    },
    currentCoordinates: { lat: 23.2332, lng: 77.4343 },
    deliveryAddress: order.address_line || '12 MP Nagar, Bhopal'
  };

  return ok(res, tracker, 'Live delivery tracking data.');
}));

module.exports = router;
