// backend/middleware/validate.js - Request validation helpers
const { fail } = require('../utils/response');

function validateRegistration(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return fail(res, 400, 'Full name is required (minimum 2 characters).');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return fail(res, 400, 'A valid email address is required.');
  }
  next();
}

function validateLogin(req, res, next) {
  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    return fail(res, 400, 'Email address is required to log in.');
  }
  next();
}

function validateOrder(req, res, next) {
  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return fail(res, 400, 'Your order must contain at least one item.');
  }
  next();
}

module.exports = {
  validateRegistration,
  validateLogin,
  validateOrder
};
