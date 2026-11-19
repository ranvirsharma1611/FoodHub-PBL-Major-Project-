// frontend/js/api.js - FoodHub Frontend API Client Service
const API = {
  baseUrl: (typeof window !== 'undefined' && window.CONFIG) ? window.CONFIG.API_BASE_URL : '/api',

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    const token = localStorage.getItem('foodhub_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, { ...options, headers });
      const data = await response.json();
      return data;
    } catch (err) {
      console.warn(`[API] Failed to fetch ${endpoint}:`, err);
      throw err;
    }
  },

  // Menu Endpoints
  getMenu(params = {}) {
    const q = new URLSearchParams(params).toString();
    return this.request(`/menu${q ? `?${q}` : ''}`);
  },

  getCategories() {
    return this.request('/categories');
  },

  getRestaurants() {
    return this.request('/restaurants');
  },

  // Auth Endpoints
  login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // Order Endpoints
  createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  getOrders(customerId) {
    return this.request(`/orders${customerId ? `?customerId=${customerId}` : ''}`);
  },

  getOrderTracker(orderId) {
    return this.request(`/orders/track/${orderId}`);
  },

  // Address Endpoints
  getAddresses(customerId) {
    return this.request(`/addresses?customerId=${customerId || 1}`);
  },

  saveAddress(addressData) {
    return this.request('/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData)
    });
  },

  // Reports Endpoints
  getSpendingReport(customerId) {
    return this.request(`/reports/spending?customerId=${customerId || 1}`);
  }
};

if (typeof window !== 'undefined') {
  window.API = API;
}
