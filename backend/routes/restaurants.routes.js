// backend/routes/restaurants.routes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const { ok, fail } = require('../utils/response');

// GET /api/restaurants
router.get('/', asyncHandler(async (req, res) => {
  const restaurants = await db.getRestaurants();
  return ok(res, restaurants, `${restaurants.length} restaurants retrieved.`);
}));

// GET /api/restaurants/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const restId = parseInt(req.params.id, 10);
  const restaurants = await db.getRestaurants();
  const found = restaurants.find(r => r.restaurant_id === restId);
  if (!found) {
    return fail(res, 404, 'Restaurant not found.');
  }
  return ok(res, found, 'Restaurant retrieved.');
}));

module.exports = router;
