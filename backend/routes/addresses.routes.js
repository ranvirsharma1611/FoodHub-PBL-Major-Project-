// backend/routes/addresses.routes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const { ok, fail } = require('../utils/response');

// GET /api/addresses
router.get('/', asyncHandler(async (req, res) => {
  const customerId = parseInt(req.query.customerId || '1', 10);
  const addresses = await db.getCustomerAddresses(customerId);
  return ok(res, addresses, 'Addresses retrieved.');
}));

// POST /api/addresses
router.post('/', asyncHandler(async (req, res) => {
  const { customerId, addressLine, city, postalCode, isDefault } = req.body;
  if (!addressLine || !city) {
    return fail(res, 400, 'Street address line and city are required.');
  }

  const newAddr = await db.addAddress({
    customerId: parseInt(customerId || '1', 10),
    addressLine,
    city: city || 'Bhopal',
    postalCode: postalCode || '462011',
    isDefault: !!isDefault
  });

  return res.status(201).json({
    success: true,
    message: 'Address saved to database!',
    data: newAddr
  });
}));

module.exports = router;
