// frontend/js/config.js - FoodHub Client Configuration
const CONFIG = {
  API_BASE_URL: '/api',
  DEFAULT_ADDRESS: '12 MP Nagar, Bhopal',
  DEFAULT_CUSTOMER_ID: 1,
  AUTO_TRACKER_REFRESH_INTERVAL: 4000,
  APP_NAME: 'FoodHub',
  VERSION: '2.0.0'
};

if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}
