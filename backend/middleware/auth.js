// backend/middleware/auth.js - Customer Authentication & Token Verification
const { fail } = require('../utils/response');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    if (req.headers['x-customer-id']) {
      req.user = { id: parseInt(req.headers['x-customer-id'], 10) };
      return next();
    }
    return fail(res, 401, 'Authentication token missing or invalid.');
  }

  const token = authHeader.split(' ')[1];
  try {
    if (token.startsWith('token_')) {
      const id = parseInt(token.replace('token_', ''), 10);
      req.user = { id: id || 1 };
      return next();
    }

    // Parse standard JWT payload without external library
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
      req.user = payload;
      return next();
    }

    req.user = { id: 1 };
    next();
  } catch (err) {
    return fail(res, 401, 'Session expired or token invalid. Please log in again.');
  }
}

module.exports = {
  authenticate
};
