// backend/routes/menu.routes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const { ok, fail } = require('../utils/response');

// GET /api/menu/categories
router.get('/categories', (req, res) => {
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
  return ok(res, categories, 'Categories retrieved.');
});

// GET /api/menu
router.get('/', asyncHandler(async (req, res) => {
  const { restaurantId, category, search, veg, sort } = req.query;
  const items = await db.getMenuItems({ restaurantId, category, search, veg, sort });

  // Normalize properties for client compatibility
  const normalized = items.map(item => ({
    id: item.item_id || item.id,
    restaurantId: item.restaurant_id,
    restaurantName: item.restaurant_name || (item.restaurant_id === 1 ? 'Spice Garden' : item.restaurant_id === 2 ? 'Burger Hub' : 'Pizza Corner'),
    name: item.item_name || item.name,
    category: item.category || 'burgers',
    price: Number(item.price),
    originalPrice: Number(item.original_price || item.originalPrice || Math.round(Number(item.price) * 1.25)),
    rating: Number(item.rating || 4.8),
    reviewsCount: item.reviews_count || item.reviewsCount || 250,
    time: item.time_estimate || item.time || '20-25 min',
    isVeg: item.is_veg !== undefined ? item.is_veg : item.isVeg,
    isBestseller: item.isBestseller || (item.rating >= 4.8),
    discount: item.discount || '15% OFF',
    calories: item.calories || '480 kcal',
    image: item.image_url || item.image,
    description: item.description,
    ingredients: item.ingredients || ['Fresh Ingredients', 'Herbs', 'Chef Special Sauce']
  }));

  return res.json({
    success: true,
    count: normalized.length,
    data: normalized
  });
}));

// GET /api/menu/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const items = await db.getMenuItems();
  const targetId = parseInt(req.params.id, 10);
  const item = items.find(m => (m.item_id || m.id) === targetId);

  if (!item) {
    return fail(res, 404, 'Dish not found in menu.');
  }

  return ok(res, item, 'Dish retrieved.');
}));

module.exports = router;
