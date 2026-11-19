// backend/routes/reviews.routes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const { ok, fail } = require('../utils/response');

// POST /api/reviews
router.post('/', asyncHandler(async (req, res) => {
  const { orderId, customerId, rating, reviewText } = req.body;
  if (!orderId || !rating) {
    return fail(res, 400, 'Order ID and rating (1-5) are required.');
  }

  const review = await db.addReview({
    orderId: parseInt(orderId, 10),
    customerId: parseInt(customerId || '1', 10),
    rating: parseInt(rating || '5', 10),
    reviewText
  });

  return res.status(201).json({
    success: true,
    message: 'Review recorded in database!',
    data: review
  });
}));

module.exports = router;
