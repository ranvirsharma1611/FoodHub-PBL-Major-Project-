// backend/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const { ok, fail } = require('../utils/response');
const { validateRegistration, validateLogin } = require('../middleware/validate');
const { authenticate } = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', validateRegistration, asyncHandler(async (req, res) => {
  const { name, email, password, phone, address, city, postalCode } = req.body;

  const existing = await db.findCustomerByEmail(email);
  if (existing) {
    return fail(res, 400, 'A customer with this email address already exists.');
  }

  const newCust = await db.registerCustomer({
    fullName: name,
    email,
    phone: phone || '9876500099',
    password: password || 'password123',
    address,
    city,
    postalCode
  });

  const safeUser = {
    id: newCust.customer_id,
    name: newCust.full_name,
    email: newCust.email,
    phone: newCust.phone,
    address: address || 'Your Saved Address'
  };

  return res.status(201).json({
    success: true,
    message: 'Account created and saved to MySQL database!',
    user: safeUser,
    token: `token_${newCust.customer_id}`
  });
}));

// POST /api/auth/login
router.post('/login', validateLogin, asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const customer = await db.findCustomerByEmail(email);
  if (!customer) {
    return fail(res, 401, 'No account found with this email in the database.');
  }

  if (customer.password && password && customer.password !== password) {
    return fail(res, 401, 'Incorrect password.');
  }

  const addresses = await db.getCustomerAddresses(customer.customer_id);
  const primaryAddress = addresses.length > 0
    ? `${addresses[0].address_line}, ${addresses[0].city}`
    : '12 MP Nagar, Bhopal';

  const safeUser = {
    id: customer.customer_id,
    name: customer.full_name,
    email: customer.email,
    phone: customer.phone,
    address: primaryAddress,
    addresses: addresses
  };

  return ok(res, {
    user: safeUser,
    token: `token_${customer.customer_id}`
  }, `Welcome back, ${customer.full_name}!`);
}));

// GET /api/auth/profile
router.get('/profile', authenticate, asyncHandler(async (req, res) => {
  const customerId = req.user.id || 1;
  const addresses = await db.getCustomerAddresses(customerId);
  const orders = await db.getOrders(customerId);

  return ok(res, {
    customerId,
    addresses,
    totalOrders: orders.length
  }, 'Profile loaded successfully.');
}));

module.exports = router;
