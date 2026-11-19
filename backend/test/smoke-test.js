// backend/test/smoke-test.js - Automated API endpoint smoke test
const http = require('http');

const PORT = process.env.PORT || 5000;
const BASE_URL = `http://localhost:${PORT}`;

const endpoints = [
  { path: '/api/health', method: 'GET', expectedStatus: 200 },
  { path: '/api/db/status', method: 'GET', expectedStatus: 200 },
  { path: '/api/restaurants', method: 'GET', expectedStatus: 200 },
  { path: '/api/menu', method: 'GET', expectedStatus: 200 },
  { path: '/api/menu/categories', method: 'GET', expectedStatus: 200 },
  { path: '/api/addresses', method: 'GET', expectedStatus: 200 },
  { path: '/api/orders', method: 'GET', expectedStatus: 200 },
  { path: '/api/reports/spending', method: 'GET', expectedStatus: 200 }
];

async function runSmokeTests() {
  console.log('====================================================');
  console.log(`🧪 Running FoodHub Backend Smoke Tests on ${BASE_URL}`);
  console.log('====================================================');

  let passed = 0;
  let failed = 0;

  for (const ep of endpoints) {
    try {
      const res = await new Promise((resolve, reject) => {
        const req = http.get(`${BASE_URL}${ep.path}`, (response) => {
          let data = '';
          response.on('data', chunk => data += chunk);
          response.on('end', () => resolve({ statusCode: response.statusCode, data }));
        });
        req.on('error', reject);
        req.setTimeout(4000, () => {
          req.destroy();
          reject(new Error('Timeout'));
        });
      });

      if (res.statusCode === ep.expectedStatus) {
        console.log(`✅ [PASS] ${ep.method} ${ep.path} -> Status ${res.statusCode}`);
        passed++;
      } else {
        console.error(`❌ [FAIL] ${ep.method} ${ep.path} -> Expected ${ep.expectedStatus}, got ${res.statusCode}`);
        failed++;
      }
    } catch (err) {
      console.error(`❌ [ERROR] ${ep.method} ${ep.path} -> ${err.message}`);
      failed++;
    }
  }

  console.log('====================================================');
  console.log(`Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runSmokeTests();
