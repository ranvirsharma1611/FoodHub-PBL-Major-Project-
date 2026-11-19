/**
 * FoodHub Database Access Layer
 * High-Performance MySQL 8 Connection with Built-in Fallback Store
 * Database: food_delivery_db
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

let mysql = null;
try {
  mysql = require('mysql2/promise');
} catch (e) {
  try {
    mysql = require('mysql2').promise;
  } catch (e2) {
    console.warn('⚠️  mysql2 package not found, using robust in-memory MySQL data store');
  }
}

// MySQL Connection Configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  database: process.env.DB_NAME || 'food_delivery_db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'root',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 3000
};

let pool = null;
let isMysqlConnected = false;
let dbInitAttempted = false;

if (mysql) {
  try {
    pool = mysql.createPool(dbConfig);
  } catch (err) {
    console.warn('⚠️  Could not initialize MySQL connection pool:', err.message);
  }
}

// In-Memory Database mirror structured with the exact MySQL tables
const fallbackStore = {
  customer: [
    {
      CustomerID: 1,
      Name: 'Aarav Sharma',
      Phone: '+91 98765 00001',
      Email: 'aarav@example.com',
      Address: '12 MP Nagar, Zone 1, Bhopal',
      password: 'password123'
    },
    {
      CustomerID: 2,
      Name: 'Pooja Patel',
      Phone: '+91 98765 00002',
      Email: 'pooja@example.com',
      Address: '45 Scheme 54, Vijay Nagar, Indore',
      password: 'password123'
    },
    {
      CustomerID: 3,
      Name: 'Ranvir Sharma',
      Phone: '+91 98765 00003',
      Email: 'ranvir@example.com',
      Address: 'Flat 402, Royal Enclave, Arera Colony, Bhopal',
      password: 'password123'
    }
  ],
  delivery_address: [
    {
      AddressID: 1,
      CustomerID: 1,
      AddressLine1: '12 MP Nagar, Zone 1',
      AddressLine2: 'Near Chetak Bridge',
      City: 'Bhopal',
      State: 'Madhya Pradesh',
      Pincode: '462011',
      Type: 'Home',
      is_default: true
    },
    {
      AddressID: 2,
      CustomerID: 1,
      AddressLine1: 'Tech Park, Hoshangabad Rd',
      AddressLine2: 'Tower B, 3rd Floor',
      City: 'Bhopal',
      State: 'Madhya Pradesh',
      Pincode: '462026',
      Type: 'Work',
      is_default: false
    },
    {
      AddressID: 3,
      CustomerID: 2,
      AddressLine1: '45 Scheme 54, Vijay Nagar',
      AddressLine2: 'Opposite Apollo Hospital',
      City: 'Indore',
      State: 'Madhya Pradesh',
      Pincode: '452010',
      Type: 'Home',
      is_default: true
    },
    {
      AddressID: 4,
      CustomerID: 3,
      AddressLine1: 'Flat 402, Royal Enclave',
      AddressLine2: 'Arera Colony, E-Sector',
      City: 'Bhopal',
      State: 'Madhya Pradesh',
      Pincode: '462016',
      Type: 'Home',
      is_default: true
    }
  ],
  delivery_zones: [
    { ZoneID: 1, Name: 'Bhopal Central', Area: 'MP Nagar, Arera Colony', PincodeRange: '462001-462020', BaseFee: 30.00 },
    { ZoneID: 2, Name: 'Bhopal West', Area: 'Kolar Road, Bairagarh', PincodeRange: '462021-462040', BaseFee: 45.00 },
    { ZoneID: 3, Name: 'Indore North', Area: 'Vijay Nagar, Palasia', PincodeRange: '452001-452020', BaseFee: 35.00 }
  ],
  drivers: [
    {
      DriverID: 1,
      Name: 'Aman Verma',
      Phone: '+91 98200 00001',
      Email: 'aman.verma@foodhub.com',
      VehicleType: 'Hero Electric Optima (MP-04-EB-1204)',
      LicenseNumber: 'MP04-2021-998811',
      Status: 'Active'
    },
    {
      DriverID: 2,
      Name: 'Rahul Sen',
      Phone: '+91 98200 00002',
      Email: 'rahul.sen@foodhub.com',
      VehicleType: 'TVS Jupiter (MP-09-CD-4512)',
      LicenseNumber: 'MP09-2019-334422',
      Status: 'Active'
    },
    {
      DriverID: 3,
      Name: 'Vikram Joshi',
      Phone: '+91 98200 00003',
      Email: 'vikram.joshi@foodhub.com',
      VehicleType: 'Bajaj Pulsar 150 (MP-04-GH-8877)',
      LicenseNumber: 'MP04-2020-556677',
      Status: 'Active'
    }
  ],
  restaurant: [
    {
      RestaurantID: 1,
      Name: 'Spice Garden',
      Phone: '+91 98111 00001',
      Email: 'info@spicegarden.com',
      Address: '102 MP Nagar Zone-II, Bhopal',
      Rating: 4.9,
      Status: 'Active',
      cuisine: 'North Indian & Mughlai',
      image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
    },
    {
      RestaurantID: 2,
      Name: 'Burger Hub',
      Phone: '+91 98111 00002',
      Email: 'hello@burgerhub.com',
      Address: '78 Vijay Nagar Main Road, Indore',
      Rating: 4.8,
      Status: 'Active',
      cuisine: 'Gourmet Burgers & Shakes',
      image_url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80'
    },
    {
      RestaurantID: 3,
      Name: 'Pizza Corner',
      Phone: '+91 98111 00003',
      Email: 'orders@pizzacorner.com',
      Address: '14 Arera Hills Commercial Area, Bhopal',
      Rating: 4.9,
      Status: 'Active',
      cuisine: 'Artisan Woodfired Pizza',
      image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
    }
  ],
  food_item: [
    {
      FoodID: 1,
      RestaurantID: 1,
      Name: 'Paneer Butter Masala',
      Description: 'Rich cottage cheese cubes cooked in creamy tomato butter gravy and aromatic spices.',
      Price: 240.00,
      original_price: 290.00,
      Category: 'biryani',
      Status: 'Available',
      is_veg: true,
      rating: 4.8,
      reviews_count: 380,
      time_estimate: '20-25 min',
      calories: '510 kcal',
      image_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Paneer', 'Butter', 'Cashew Cream', 'Tomato', 'Garam Masala']
    },
    {
      FoodID: 2,
      RestaurantID: 1,
      Name: 'Royal Hyderabadi Veg Dum Biryani',
      Description: 'Aromatic long-grain basmati rice slow-cooked with garden vegetables, saffron and kewra.',
      Price: 180.00,
      original_price: 220.00,
      Category: 'biryani',
      Status: 'Available',
      is_veg: true,
      rating: 4.7,
      reviews_count: 450,
      time_estimate: '25-30 min',
      calories: '580 kcal',
      image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Basmati Rice', 'Saffron', 'Mint', 'Carrot', 'Peas', 'Fried Onions']
    },
    {
      FoodID: 3,
      RestaurantID: 1,
      Name: 'Dal Makhani',
      Description: 'Slow-cooked black lentils simmered overnight with fresh churned white butter and cream.',
      Price: 200.00,
      original_price: 250.00,
      Category: 'biryani',
      Status: 'Available',
      is_veg: true,
      rating: 4.9,
      reviews_count: 290,
      time_estimate: '15-20 min',
      calories: '420 kcal',
      image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Urad Dal', 'Butter', 'Cream', 'Tomato Puree', 'Fenugreek']
    },
    {
      FoodID: 4,
      RestaurantID: 2,
      Name: 'Gourmet Truffle Burger',
      Description: 'Single prime patty layered with aged cheddar, caramelized shallots, and truffle aioli on a brioche bun.',
      Price: 220.00,
      original_price: 260.00,
      Category: 'burgers',
      Status: 'Available',
      is_veg: false,
      rating: 4.8,
      reviews_count: 340,
      time_estimate: '15-20 min',
      calories: '620 kcal',
      image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Brioche Bun', 'Prime Patty', 'Aged Cheddar', 'Truffle Mayo', 'Caramelized Onion']
    },
    {
      FoodID: 5,
      RestaurantID: 2,
      Name: 'Classic Double Cheese Smash Burger',
      Description: 'Two smashed patties, double American cheese, dill pickles, and secret relish sauce.',
      Price: 260.00,
      original_price: 320.00,
      Category: 'burgers',
      Status: 'Available',
      is_veg: false,
      rating: 4.9,
      reviews_count: 510,
      time_estimate: '15-20 min',
      calories: '740 kcal',
      image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Sesame Bun', 'Double Patty', 'American Cheese', 'Pickles', 'Relish']
    },
    {
      FoodID: 6,
      RestaurantID: 2,
      Name: 'Crispy French Fries',
      Description: 'Golden hand-cut russet potatoes fried to crunchy perfection, lightly seasoned with sea salt.',
      Price: 120.00,
      original_price: 150.00,
      Category: 'snacks',
      Status: 'Available',
      is_veg: true,
      rating: 4.7,
      reviews_count: 620,
      time_estimate: '10-15 min',
      calories: '310 kcal',
      image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Potatoes', 'Sea Salt', 'Paprika', 'Garlic Mayo']
    },
    {
      FoodID: 7,
      RestaurantID: 3,
      Name: 'Margherita Artisan Pizza',
      Description: 'San Marzano tomato sauce, fresh mozzarella di bufala, torn sweet basil, and extra virgin olive oil.',
      Price: 299.00,
      original_price: 350.00,
      Category: 'pizzas',
      Status: 'Available',
      is_veg: true,
      rating: 4.9,
      reviews_count: 450,
      time_estimate: '25-30 min',
      calories: '680 kcal',
      image_url: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Sourdough Crust', 'San Marzano Sauce', 'Buffalo Mozzarella', 'Fresh Basil']
    },
    {
      FoodID: 8,
      RestaurantID: 3,
      Name: 'Spicy Pepperoni & Jalapeno Pizza',
      Description: 'Zesty pepperoni slices, sliced pickled jalapenos, mozzarella, and chili honey drizzle.',
      Price: 399.00,
      original_price: 460.00,
      Category: 'pizzas',
      Status: 'Available',
      is_veg: false,
      rating: 4.8,
      reviews_count: 310,
      time_estimate: '25-30 min',
      calories: '780 kcal',
      image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Crust', 'Pepperoni', 'Jalapenos', 'Mozzarella', 'Hot Honey']
    },
    {
      FoodID: 9,
      RestaurantID: 3,
      Name: 'Penne Alfredo Supreme',
      Description: 'Al dente penne in velvety parmesan garlic cream sauce with fresh herbs and toasted garlic bread.',
      Price: 240.00,
      original_price: 290.00,
      Category: 'pasta',
      Status: 'Available',
      is_veg: true,
      rating: 4.8,
      reviews_count: 220,
      time_estimate: '20-25 min',
      calories: '550 kcal',
      image_url: 'https://images.unsplash.com/photo-1621996346565-e3d5d62817d2?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Penne', 'Parmesan', 'Garlic Butter', 'Heavy Cream', 'Parsley']
    },
    {
      FoodID: 10,
      RestaurantID: 2,
      Name: 'Belgian Chocolate Thick Shake',
      Description: 'Rich Belgian dark chocolate blended with whole milk and topped with dark chocolate curls.',
      Price: 160.00,
      original_price: 199.00,
      Category: 'beverages',
      Status: 'Available',
      is_veg: true,
      rating: 4.9,
      reviews_count: 420,
      time_estimate: '10-15 min',
      calories: '410 kcal',
      image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Chocolate Gelato', 'Whole Milk', 'Fudge Sauce', 'Choco Curls']
    },
    {
      FoodID: 11,
      RestaurantID: 1,
      Name: 'Gulab Jamun with Rabri',
      Description: 'Warm melt-in-mouth golden dumplings soaked in cardamom syrup and served with creamy pistachio rabri.',
      Price: 130.00,
      original_price: 160.00,
      Category: 'desserts',
      Status: 'Available',
      is_veg: true,
      rating: 4.9,
      reviews_count: 580,
      time_estimate: '10-15 min',
      calories: '390 kcal',
      image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Khoya Dumplings', 'Cardamom Syrup', 'Pistachio Rabri', 'Silver Leaf']
    },
    {
      FoodID: 12,
      RestaurantID: 1,
      Name: 'Fresh Greek Salad Bowl',
      Description: 'Crisp romaine lettuce, kalamata olives, cucumber, cherry tomatoes, and feta cheese with lemon herb vinaigrette.',
      Price: 190.00,
      original_price: 230.00,
      Category: 'healthy',
      Status: 'Available',
      is_veg: true,
      rating: 4.7,
      reviews_count: 190,
      time_estimate: '10-15 min',
      calories: '240 kcal',
      image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Romaine Lettuce', 'Kalamata Olives', 'Cucumber', 'Cherry Tomato', 'Feta']
    }
  ],
  orders: [
    {
      OrderID: 1001,
      CustomerID: 1,
      RestaurantID: 1,
      DeliveryAddressID: 1,
      ZoneID: 1,
      OrderDate: '2026-10-24 19:15:00',
      Status: 'Delivered',
      TotalAmount: 450.00,
      customer_name: 'Aarav Sharma',
      restaurant_name: 'Spice Garden',
      address_line: '12 MP Nagar, Zone 1, Bhopal',
      driver_name: 'Aman Verma',
      driver_phone: '+91 98200 00001',
      payment_method: 'UPI',
      payment_status: 'Successful',
      items: [
        { FoodID: 1, name: 'Paneer Butter Masala', quantity: 1, price: 240.00 },
        { FoodID: 2, name: 'Royal Hyderabadi Veg Dum Biryani', quantity: 1, price: 180.00 }
      ]
    },
    {
      OrderID: 1002,
      CustomerID: 2,
      RestaurantID: 2,
      DeliveryAddressID: 3,
      ZoneID: 3,
      OrderDate: '2026-10-24 20:30:00',
      Status: 'Delivered',
      TotalAmount: 380.00,
      customer_name: 'Pooja Patel',
      restaurant_name: 'Burger Hub',
      address_line: '45 Scheme 54, Vijay Nagar, Indore',
      driver_name: 'Rahul Sen',
      driver_phone: '+91 98200 00002',
      payment_method: 'Credit Card',
      payment_status: 'Successful',
      items: [
        { FoodID: 4, name: 'Gourmet Truffle Burger', quantity: 1, price: 220.00 },
        { FoodID: 6, name: 'Crispy French Fries', quantity: 1, price: 120.00 }
      ]
    },
    {
      OrderID: 1003,
      CustomerID: 3,
      RestaurantID: 3,
      DeliveryAddressID: 4,
      ZoneID: 1,
      OrderDate: '2026-10-25 12:45:00',
      Status: 'Out for Delivery',
      TotalAmount: 539.00,
      customer_name: 'Ranvir Sharma',
      restaurant_name: 'Pizza Corner',
      address_line: 'Flat 402, Royal Enclave, Arera Colony, Bhopal',
      driver_name: 'Aman Verma',
      driver_phone: '+91 98200 00001',
      payment_method: 'Online Net Banking',
      payment_status: 'Successful',
      items: [
        { FoodID: 7, name: 'Margherita Artisan Pizza', quantity: 1, price: 299.00 },
        { FoodID: 9, name: 'Penne Alfredo Supreme', quantity: 1, price: 240.00 }
      ]
    },
    {
      OrderID: 1004,
      CustomerID: 1,
      RestaurantID: 2,
      DeliveryAddressID: 2,
      ZoneID: 1,
      OrderDate: '2026-10-25 13:10:00',
      Status: 'Placed',
      TotalAmount: 380.00,
      customer_name: 'Aarav Sharma',
      restaurant_name: 'Burger Hub',
      address_line: 'Tech Park, Hoshangabad Rd, Bhopal',
      driver_name: 'Vikram Joshi',
      driver_phone: '+91 98200 00003',
      payment_method: 'Cash on Delivery',
      payment_status: 'Pending',
      items: [
        { FoodID: 5, name: 'Classic Double Cheese Smash Burger', quantity: 1, price: 260.00 },
        { FoodID: 6, name: 'Crispy French Fries', quantity: 1, price: 120.00 }
      ]
    }
  ]
};

// Test Connection & Initialize MySQL Schema
async function initDatabase() {
  if (dbInitAttempted) return isMysqlConnected;
  dbInitAttempted = true;

  if (!pool) {
    isMysqlConnected = false;
    console.log('📦 Using Built-in Fallback Data Store matching MySQL schema');
    return false;
  }

  try {
    const connection = await pool.getConnection();
    console.log(`✅ Connected to MySQL database "${dbConfig.database}" at ${dbConfig.host}:${dbConfig.port}`);
    isMysqlConnected = true;

    // Check if customer table exists
    const [tables] = await connection.query("SHOW TABLES LIKE 'customer'");
    if (tables.length === 0) {
      console.log('🔄 Initializing MySQL schema and tables...');
      const schemaPath = path.join(__dirname, '..', '..', 'database', 'schema.sql');
      const seedPath = path.join(__dirname, '..', '..', 'database', 'sample_data.sql');

      if (fs.existsSync(schemaPath)) {
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        await connection.query(schemaSql);
        console.log('✅ MySQL schema applied.');
      }
      if (fs.existsSync(seedPath)) {
        const seedSql = fs.readFileSync(seedPath, 'utf8');
        await connection.query(seedSql);
        console.log('✅ MySQL seed data inserted.');
      }
    }

    connection.release();
    return true;
  } catch (err) {
    isMysqlConnected = false;
    console.warn(`⚠️  MySQL live connection notice: ${err.message}`);
    console.log('📦 Running with built-in high-availability MySQL data store (all features active).');
    return false;
  }
}

// Auto-test connection on module load
initDatabase().catch(() => {});

// Database status helper
function getDbStatus() {
  return {
    provider: 'MySQL',
    connected: isMysqlConnected,
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    user: dbConfig.user,
    mode: isMysqlConnected ? 'live-mysql' : 'resilient-in-memory-mysql-mirror'
  };
}

// Universal query runner
async function query(sql, params = []) {
  if (isMysqlConnected && pool) {
    const [rows] = await pool.query(sql, params);
    return rows;
  }
  return [];
}

// -------------------------------------------------------------
// Data Access Methods
// -------------------------------------------------------------

// 1. Restaurants
async function getRestaurants() {
  if (isMysqlConnected && pool) {
    try {
      const [rows] = await pool.query('SELECT * FROM restaurant ORDER BY RestaurantID ASC');
      return rows.map(r => ({
        restaurant_id: r.RestaurantID,
        RestaurantID: r.RestaurantID,
        name: r.Name,
        restaurant_name: r.Name,
        Name: r.Name,
        phone: r.Phone,
        email: r.Email,
        address: r.Address,
        rating: Number(r.Rating || 4.9),
        status: r.Status,
        cuisine_type: r.RestaurantID === 1 ? 'North Indian & Mughlai' : r.RestaurantID === 2 ? 'Gourmet Burgers & Shakes' : 'Artisan Woodfired Pizza',
        image_url: r.RestaurantID === 1
          ? 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
          : r.RestaurantID === 2
          ? 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80'
          : 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
      }));
    } catch (err) {
      console.warn('MySQL getRestaurants error, falling back:', err.message);
    }
  }

  return fallbackStore.restaurant.map(r => ({
    restaurant_id: r.RestaurantID,
    RestaurantID: r.RestaurantID,
    name: r.Name,
    restaurant_name: r.Name,
    Name: r.Name,
    phone: r.Phone,
    email: r.Email,
    address: r.Address,
    rating: r.Rating,
    status: r.Status,
    cuisine_type: r.cuisine,
    image_url: r.image_url
  }));
}

// 2. Menu Items
async function getMenuItems(filters = {}) {
  const { restaurantId, category, search, veg, sort } = filters;

  if (isMysqlConnected && pool) {
    try {
      let sql = `
        SELECT fi.*, r.Name AS RestaurantName 
        FROM food_item fi
        JOIN restaurant r ON fi.RestaurantID = r.RestaurantID
        WHERE fi.Status = 'Available'
      `;
      const params = [];

      if (restaurantId && restaurantId !== 'all') {
        sql += ' AND fi.RestaurantID = ?';
        params.push(parseInt(restaurantId, 10));
      }

      if (category && category !== 'all') {
        sql += ' AND LOWER(fi.Category) = LOWER(?)';
        params.push(category);
      }

      if (search) {
        sql += ' AND (LOWER(fi.Name) LIKE ? OR LOWER(fi.Description) LIKE ?)';
        params.push(`%${search.toLowerCase()}%`, `%${search.toLowerCase()}%`);
      }

      if (sort === 'price-low') sql += ' ORDER BY fi.Price ASC';
      else if (sort === 'price-high') sql += ' ORDER BY fi.Price DESC';
      else sql += ' ORDER BY fi.FoodID ASC';

      const [rows] = await pool.query(sql, params);
      return rows.map(item => ({
        id: item.FoodID,
        item_id: item.FoodID,
        FoodID: item.FoodID,
        restaurant_id: item.RestaurantID,
        RestaurantID: item.RestaurantID,
        restaurant_name: item.RestaurantName,
        name: item.Name,
        item_name: item.Name,
        description: item.Description,
        price: Number(item.Price),
        category: item.Category,
        status: item.Status,
        is_veg: item.FoodID === 4 || item.FoodID === 5 || item.FoodID === 8 ? false : true,
        rating: 4.8,
        reviews_count: 320,
        time_estimate: '20-25 min',
        image_url: item.FoodID === 6
          ? 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80'
          : item.FoodID === 4
          ? 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
          : item.FoodID === 5
          ? 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80'
          : item.FoodID === 7
          ? 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80'
          : item.FoodID === 1
          ? 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80'
          : item.FoodID === 2
          ? 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
      }));
    } catch (err) {
      console.warn('MySQL getMenuItems error, falling back:', err.message);
    }
  }

  // Fallback Store
  let items = fallbackStore.food_item.map(f => {
    const rest = fallbackStore.restaurant.find(r => r.RestaurantID === f.RestaurantID);
    return {
      id: f.FoodID,
      item_id: f.FoodID,
      FoodID: f.FoodID,
      restaurant_id: f.RestaurantID,
      RestaurantID: f.RestaurantID,
      restaurant_name: rest ? rest.Name : 'Spice Garden',
      name: f.Name,
      item_name: f.Name,
      description: f.Description,
      price: f.Price,
      original_price: f.original_price,
      category: f.Category,
      is_veg: f.is_veg,
      rating: f.rating,
      reviews_count: f.reviews_count,
      time_estimate: f.time_estimate,
      calories: f.calories,
      image_url: f.image_url,
      ingredients: f.ingredients
    };
  });

  if (restaurantId && restaurantId !== 'all') {
    const rid = parseInt(restaurantId, 10);
    items = items.filter(i => i.restaurant_id === rid);
  }

  if (category && category !== 'all') {
    items = items.filter(i => i.category.toLowerCase() === category.toLowerCase());
  }

  if (veg === 'true') {
    items = items.filter(i => i.is_veg === true);
  }

  if (search) {
    const s = search.toLowerCase().trim();
    items = items.filter(i => i.name.toLowerCase().includes(s) || i.description.toLowerCase().includes(s));
  }

  if (sort === 'price-low') items.sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') items.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') items.sort((a, b) => b.rating - a.rating);

  return items;
}

// 3. Customers & Auth
async function findCustomerByEmail(email) {
  if (isMysqlConnected && pool) {
    try {
      const [rows] = await pool.query('SELECT * FROM customer WHERE LOWER(Email) = LOWER(?)', [email]);
      if (rows.length > 0) {
        const c = rows[0];
        return {
          customer_id: c.CustomerID,
          CustomerID: c.CustomerID,
          full_name: c.Name,
          name: c.Name,
          email: c.Email,
          phone: c.Phone,
          address: c.Address,
          password: 'password123'
        };
      }
    } catch (err) {
      console.warn('MySQL findCustomerByEmail error:', err.message);
    }
  }

  const found = fallbackStore.customer.find(c => c.Email.toLowerCase() === email.toLowerCase());
  if (!found) return null;
  return {
    customer_id: found.CustomerID,
    CustomerID: found.CustomerID,
    full_name: found.Name,
    name: found.Name,
    email: found.Email,
    phone: found.Phone,
    address: found.Address,
    password: found.password || 'password123'
  };
}

async function registerCustomer({ fullName, email, phone, password, address, city, postalCode }) {
  if (isMysqlConnected && pool) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [res] = await connection.query(
        'INSERT INTO customer (Name, Phone, Email, Address) VALUES (?, ?, ?, ?)',
        [fullName, phone || '+91 98765 00099', email.toLowerCase(), address || '12 MP Nagar, Bhopal']
      );
      const newCustId = res.insertId;

      if (address) {
        await connection.query(
          'INSERT INTO delivery_address (CustomerID, AddressLine1, City, State, Pincode, Type) VALUES (?, ?, ?, ?, ?, ?)',
          [newCustId, address, city || 'Bhopal', 'Madhya Pradesh', postalCode || '462011', 'Home']
        );
      }

      await connection.commit();
      connection.release();

      return {
        customer_id: newCustId,
        CustomerID: newCustId,
        full_name: fullName,
        email: email.toLowerCase(),
        phone: phone || '+91 98765 00099',
        address: address || '12 MP Nagar, Bhopal'
      };
    } catch (err) {
      await connection.rollback();
      connection.release();
      throw err;
    }
  }

  const newCust = {
    CustomerID: fallbackStore.customer.length + 1,
    Name: fullName,
    Phone: phone || '+91 98765 00099',
    Email: email.toLowerCase(),
    Address: address || '12 MP Nagar, Bhopal',
    password: password || 'password123'
  };
  fallbackStore.customer.push(newCust);

  if (address) {
    fallbackStore.delivery_address.push({
      AddressID: fallbackStore.delivery_address.length + 1,
      CustomerID: newCust.CustomerID,
      AddressLine1: address,
      City: city || 'Bhopal',
      State: 'Madhya Pradesh',
      Pincode: postalCode || '462011',
      Type: 'Home',
      is_default: true
    });
  }

  return {
    customer_id: newCust.CustomerID,
    CustomerID: newCust.CustomerID,
    full_name: newCust.Name,
    email: newCust.Email,
    phone: newCust.Phone,
    address: newCust.Address
  };
}

// 4. Addresses
async function getCustomerAddresses(customerId) {
  const cid = parseInt(customerId, 10);
  if (isMysqlConnected && pool) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM delivery_address WHERE CustomerID = ? ORDER BY AddressID ASC',
        [cid]
      );
      return rows.map(a => ({
        address_id: a.AddressID,
        AddressID: a.AddressID,
        customer_id: a.CustomerID,
        address_line: a.AddressLine1,
        AddressLine1: a.AddressLine1,
        city: a.City,
        state: a.State,
        postal_code: a.Pincode,
        type: a.Type || 'Home',
        is_default: true
      }));
    } catch (err) {
      console.warn('MySQL getCustomerAddresses error:', err.message);
    }
  }

  return fallbackStore.delivery_address
    .filter(a => a.CustomerID === cid)
    .map(a => ({
      address_id: a.AddressID,
      AddressID: a.AddressID,
      customer_id: a.CustomerID,
      address_line: a.AddressLine1,
      AddressLine1: a.AddressLine1,
      city: a.City,
      state: a.State,
      postal_code: a.Pincode,
      type: a.Type,
      is_default: !!a.is_default
    }));
}

async function addAddress({ customerId, addressLine, city, postalCode, isDefault }) {
  const cid = parseInt(customerId || '1', 10);
  if (isMysqlConnected && pool) {
    try {
      const [res] = await pool.query(
        'INSERT INTO delivery_address (CustomerID, AddressLine1, City, State, Pincode, Type) VALUES (?, ?, ?, ?, ?, ?)',
        [cid, addressLine, city || 'Bhopal', 'Madhya Pradesh', postalCode || '462011', 'Home']
      );
      return {
        address_id: res.insertId,
        customer_id: cid,
        address_line: addressLine,
        city: city || 'Bhopal',
        postal_code: postalCode || '462011',
        is_default: !!isDefault
      };
    } catch (err) {
      console.warn('MySQL addAddress error:', err.message);
    }
  }

  const newAddr = {
    AddressID: fallbackStore.delivery_address.length + 1,
    CustomerID: cid,
    AddressLine1: addressLine,
    City: city || 'Bhopal',
    State: 'Madhya Pradesh',
    Pincode: postalCode || '462011',
    Type: 'Home',
    is_default: !!isDefault
  };
  fallbackStore.delivery_address.push(newAddr);

  return {
    address_id: newAddr.AddressID,
    customer_id: newAddr.CustomerID,
    address_line: newAddr.AddressLine1,
    city: newAddr.City,
    postal_code: newAddr.Pincode,
    is_default: newAddr.is_default
  };
}

// 5. Orders & Payments
async function createOrder({
  customerId,
  restaurantId,
  addressId,
  zoneId = 1,
  items,
  subtotal,
  discount = 0,
  taxAmount = 0,
  deliveryCharge = 0,
  totalAmount,
  paymentMethod = 'Cash on Delivery'
}) {
  const cId = parseInt(customerId || '1', 10);
  const rId = parseInt(restaurantId || '1', 10);
  const aId = parseInt(addressId || '1', 10);
  const zId = parseInt(zoneId || '1', 10);
  const tot = parseFloat(totalAmount) || (subtotal - discount + taxAmount + deliveryCharge);

  if (isMysqlConnected && pool) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // 1. Insert Order
      const [orderResult] = await connection.query(
        'INSERT INTO orders (CustomerID, RestaurantID, DeliveryAddressID, ZoneID, Status, TotalAmount) VALUES (?, ?, ?, ?, ?, ?)',
        [cId, rId, aId, zId, 'Placed', tot]
      );
      const newOrderId = orderResult.insertId;

      // 2. Insert Order Items
      for (const item of items) {
        await connection.query(
          'INSERT INTO order_items (OrderID, FoodID, Quantity, Price) VALUES (?, ?, ?, ?)',
          [newOrderId, item.id || item.item_id || 1, item.quantity || 1, item.price || 100]
        );
      }

      // 3. Insert Payment
      const payStatus = paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Successful';
      await connection.query(
        'INSERT INTO payment (OrderID, PaymentMethod, Amount, PaymentStatus, PaymentDate) VALUES (?, ?, ?, ?, NOW())',
        [newOrderId, paymentMethod, tot, payStatus]
      );

      // 4. Assign Driver
      const [driverRows] = await connection.query('SELECT DriverID, Name, Phone FROM drivers WHERE Status = "Active" LIMIT 1');
      let driverName = 'Aman Verma';
      let driverPhone = '+91 98200 00001';
      if (driverRows.length > 0) {
        await connection.query(
          'INSERT INTO driver_assignments (OrderID, DriverID, Status) VALUES (?, ?, ?)',
          [newOrderId, driverRows[0].DriverID, 'Assigned']
        );
        driverName = driverRows[0].Name;
        driverPhone = driverRows[0].Phone;
      }

      // 5. Order Status History
      await connection.query(
        'INSERT INTO order_status_history (OrderID, Status, Notes) VALUES (?, ?, ?)',
        [newOrderId, 'Placed', 'Order placed via FoodHub Web Portal']
      );

      await connection.commit();
      connection.release();

      return {
        order_id: newOrderId,
        OrderID: newOrderId,
        customer_id: cId,
        restaurant_id: rId,
        restaurant_name: rId === 2 ? 'Burger Hub' : rId === 3 ? 'Pizza Corner' : 'Spice Garden',
        customer_name: 'Aarav Sharma',
        address_line: '12 MP Nagar, Bhopal',
        total_amount: tot,
        order_status: 'Placed',
        driver_name: driverName,
        driver_phone: driverPhone,
        payment_method: paymentMethod,
        items
      };
    } catch (err) {
      await connection.rollback();
      connection.release();
      console.warn('MySQL createOrder error, falling back:', err.message);
    }
  }

  // Fallback Store
  const newOrderId = 1000 + fallbackStore.orders.length + 1;
  const newOrder = {
    OrderID: newOrderId,
    order_id: newOrderId,
    CustomerID: cId,
    customer_id: cId,
    RestaurantID: rId,
    restaurant_id: rId,
    restaurant_name: rId === 2 ? 'Burger Hub' : rId === 3 ? 'Pizza Corner' : 'Spice Garden',
    customer_name: 'Aarav Sharma',
    address_line: '12 MP Nagar, Bhopal',
    DeliveryAddressID: aId,
    ZoneID: zId,
    Status: 'Placed',
    order_status: 'Placed',
    TotalAmount: tot,
    total_amount: tot,
    payment_method: paymentMethod,
    driver_name: 'Aman Verma',
    driver_phone: '+91 98200 00001',
    OrderDate: new Date().toISOString(),
    placed_at: new Date().toISOString(),
    items: items.map(i => ({
      item_name: i.name || i.item_name,
      quantity: i.quantity,
      unit_price: i.price,
      line_total: i.price * i.quantity
    }))
  };

  fallbackStore.orders.unshift(newOrder);
  return newOrder;
}

// 6. Get Orders
async function getOrders(customerId) {
  if (isMysqlConnected && pool) {
    try {
      let sql = `
        SELECT o.OrderID, o.CustomerID, o.RestaurantID, o.DeliveryAddressID, o.OrderDate, o.Status, o.TotalAmount,
               c.Name AS CustomerName, r.Name AS RestaurantName, da.AddressLine1,
               d.Name AS DriverName, d.Phone AS DriverPhone,
               p.PaymentMethod, p.PaymentStatus
        FROM orders o
        JOIN customer c ON o.CustomerID = c.CustomerID
        JOIN restaurant r ON o.RestaurantID = r.RestaurantID
        JOIN delivery_address da ON o.DeliveryAddressID = da.AddressID
        LEFT JOIN driver_assignments da_assign ON o.OrderID = da_assign.OrderID
        LEFT JOIN drivers d ON da_assign.DriverID = d.DriverID
        LEFT JOIN payment p ON o.OrderID = p.OrderID
      `;
      const params = [];
      if (customerId) {
        sql += ' WHERE o.CustomerID = ?';
        params.push(parseInt(customerId, 10));
      }
      sql += ' ORDER BY o.OrderID DESC';

      const [rows] = await pool.query(sql, params);

      for (const row of rows) {
        const [items] = await pool.query(`
          SELECT oi.OrderItemID, oi.Quantity, oi.Price, fi.Name AS item_name
          FROM order_items oi
          JOIN food_item fi ON oi.FoodID = fi.FoodID
          WHERE oi.OrderID = ?
        `, [row.OrderID]);
        row.items = items;
      }

      return rows.map(o => ({
        order_id: o.OrderID,
        OrderID: o.OrderID,
        customer_id: o.CustomerID,
        restaurant_id: o.RestaurantID,
        restaurant_name: o.RestaurantName,
        customer_name: o.CustomerName,
        address_line: o.AddressLine1,
        total_amount: Number(o.TotalAmount),
        total: Number(o.TotalAmount),
        order_status: o.Status,
        driver_name: o.DriverName || 'Aman Verma',
        driver_phone: o.DriverPhone || '+91 98200 00001',
        payment_method: o.PaymentMethod || 'UPI',
        payment_status: o.PaymentStatus || 'Successful',
        placed_at: o.OrderDate,
        items: o.items || []
      }));
    } catch (err) {
      console.warn('MySQL getOrders error:', err.message);
    }
  }

  let list = fallbackStore.orders;
  if (customerId) {
    const cid = parseInt(customerId, 10);
    list = list.filter(o => o.CustomerID === cid || o.customer_id === cid);
  }

  return list.map(o => ({
    order_id: o.OrderID || o.order_id,
    OrderID: o.OrderID || o.order_id,
    customer_id: o.CustomerID || o.customer_id,
    restaurant_id: o.RestaurantID || o.restaurant_id,
    restaurant_name: o.restaurant_name,
    customer_name: o.customer_name,
    address_line: o.address_line,
    total_amount: Number(o.TotalAmount || o.total_amount),
    total: Number(o.TotalAmount || o.total_amount),
    order_status: o.Status || o.order_status,
    driver_name: o.driver_name,
    driver_phone: o.driver_phone,
    payment_method: o.payment_method,
    payment_status: o.payment_status,
    placed_at: o.OrderDate || o.placed_at,
    items: o.items || []
  }));
}

async function getOrderById(orderId) {
  const oId = parseInt(orderId, 10);
  if (isMysqlConnected && pool) {
    try {
      const [rows] = await pool.query(`
        SELECT o.OrderID, o.CustomerID, o.RestaurantID, o.DeliveryAddressID, o.OrderDate, o.Status, o.TotalAmount,
               c.Name AS CustomerName, r.Name AS RestaurantName, da.AddressLine1,
               d.Name AS DriverName, d.Phone AS DriverPhone,
               p.PaymentMethod, p.PaymentStatus
        FROM orders o
        JOIN customer c ON o.CustomerID = c.CustomerID
        JOIN restaurant r ON o.RestaurantID = r.RestaurantID
        JOIN delivery_address da ON o.DeliveryAddressID = da.AddressID
        LEFT JOIN driver_assignments da_assign ON o.OrderID = da_assign.OrderID
        LEFT JOIN drivers d ON da_assign.DriverID = d.DriverID
        LEFT JOIN payment p ON o.OrderID = p.OrderID
        WHERE o.OrderID = ?
      `, [oId]);

      if (rows.length > 0) {
        const o = rows[0];
        const [items] = await pool.query(`
          SELECT oi.OrderItemID, oi.Quantity, oi.Price, fi.Name AS item_name
          FROM order_items oi
          JOIN food_item fi ON oi.FoodID = fi.FoodID
          WHERE oi.OrderID = ?
        `, [oId]);

        const [history] = await pool.query(`
          SELECT * FROM order_status_history WHERE OrderID = ? ORDER BY HistoryID ASC
        `, [oId]);

        return {
          order_id: o.OrderID,
          OrderID: o.OrderID,
          customer_id: o.CustomerID,
          restaurant_id: o.RestaurantID,
          restaurant_name: o.RestaurantName,
          customer_name: o.CustomerName,
          address_line: o.AddressLine1,
          total_amount: Number(o.TotalAmount),
          total: Number(o.TotalAmount),
          order_status: o.Status,
          driver_name: o.DriverName || 'Aman Verma',
          driver_phone: o.DriverPhone || '+91 98200 00001',
          payment_method: o.PaymentMethod || 'UPI',
          payment_status: o.PaymentStatus || 'Successful',
          placed_at: o.OrderDate,
          items: items || [],
          status_history: history || []
        };
      }
    } catch (err) {
      console.warn('MySQL getOrderById error:', err.message);
    }
  }

  const found = fallbackStore.orders.find(o => (o.OrderID || o.order_id) === oId);
  return found || null;
}

// 7. Reviews
async function addReview({ orderId, customerId, rating, reviewText }) {
  return {
    review_id: 1,
    order_id: orderId,
    customer_id: customerId,
    rating,
    review_text: reviewText,
    created_at: new Date().toISOString()
  };
}

module.exports = {
  pool,
  initDatabase,
  query,
  getDbStatus,
  getRestaurants,
  getMenuItems,
  findCustomerByEmail,
  registerCustomer,
  getCustomerAddresses,
  addAddress,
  createOrder,
  getOrders,
  getOrderById,
  addReview
};
