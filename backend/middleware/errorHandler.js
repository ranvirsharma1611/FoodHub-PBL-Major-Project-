// backend/middleware/errorHandler.js - Central error handler with MySQL error mapping
const { fail } = require('../utils/response');

/**
 * Global Express error handling middleware
 */
function errorHandler(err, req, res, next) {
  // Always log the full error server-side
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message || err);

  // 1. MySQL Custom Signal / Trigger Exception (SQLSTATE '45000' or 'P0001')
  if (err.sqlState === '45000' || err.code === 'P0001') {
    return fail(res, 400, err.message || 'Business rule constraint violation');
  }

  // 2. MySQL Unique Violation (ER_DUP_ENTRY / 1062)
  if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062 || err.code === '23505') {
    let message = 'A record with this information already exists.';
    const detail = (err.sqlMessage || err.message || err.detail || '').toLowerCase();
    if (detail.includes('email')) {
      message = 'An account with this email address is already registered.';
    } else if (detail.includes('phone') || detail.includes('licensenumber')) {
      message = 'A user or driver with this phone/license number is already registered.';
    } else if (detail.includes('transaction')) {
      message = 'This payment transaction reference has already been processed.';
    }
    return fail(res, 409, message);
  }

  // 3. MySQL Foreign Key Constraint Violation (ER_NO_REFERENCED_ROW / 1452)
  if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452 || err.code === '23503') {
    return fail(res, 400, 'Referenced resource does not exist (restaurant, address, or customer).');
  }

  // 4. MySQL Check Constraint Violation (ER_CHECK_CONSTRAINT_VIOLATED / 3819)
  if (err.code === 'ER_CHECK_CONSTRAINT_VIOLATED' || err.errno === 3819 || err.code === '23514') {
    return fail(res, 400, err.sqlMessage || err.message || 'Data check constraint validation failed.');
  }

  // 5. Default Internal Server Error
  const statusCode = err.statusCode || err.status || 500;
  const message = process.env.NODE_ENV === 'production' && statusCode === 500
    ? 'An unexpected internal server error occurred.'
    : err.message || 'Internal Server Error';

  return fail(res, statusCode, message);
}

module.exports = errorHandler;
