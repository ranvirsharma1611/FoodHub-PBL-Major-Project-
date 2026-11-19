# FoodHub - Full-Stack Food Delivery Platform

> **DBMS & Full-Stack Web Development Project**  
> A full-stack, enterprise-grade food delivery application featuring interactive category discovery, dietary filters (Pure Veg / Non-Veg / Snacks / Desserts / Drinks), live order tracking with geospatial simulation, customer order analytics reports, 24/7 customer support desk, and a MySQL relational database backend.

---

## 📌 Table of Contents
1. [Overview](#-overview)
2. [System Architecture](#-system-architecture)
3. [Key Features](#-key-features)
4. [DBMS & Database Highlights](#-dbms--database-highlights)
5. [Directory Structure](#-directory-structure)
6. [Step-by-Step Installation & Setup](#-step-by-step-installation--setup)
7. [Running the Application](#-running-the-application)
8. [REST API Endpoint Reference](#-rest-api-endpoint-reference)
9. [Automated Testing](#-automated-testing)
10. [Demo Credentials](#-demo-credentials)

---

## 🚀 Overview

**FoodHub** is an interactive food delivery application designed and engineered to mirror modern food aggregators like Swiggy and Zomato. Built for Database Management Systems (DBMS) and full-stack software development, it demonstrates:
- **Clean 3-Tier Architecture**: Modular separation into `frontend/`, `backend/`, and `database/`.
- **Database Engineering**: 15 normalized relational tables and views in MySQL with foreign key constraints, indexes, and audit trails.
- **Modern Responsive Frontend**: Vanilla HTML5, CSS3 with custom properties, Web Audio API synthesizer feedback, and dynamic component rendering.

---

## 🏗 System Architecture

```text
┌────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                          │
│     Vanilla HTML5 • Modern CSS3 • JavaScript (ES6 Modules)     │
│   Interactive Mega Menu • Cart Drawer • Tracker • Analytics    │
└───────────────────────────────┬────────────────────────────────┘
                                │ HTTP / JSON (REST)
                                ▼
┌────────────────────────────────────────────────────────────────┐
│                    BACKEND API LAYER (Node.js)                 │
│      Express 4 • CORS • JWT Authentication • Error Handlers    │
│            Modular Route Controllers • Smoke Testing           │
└───────────────────────────────┬────────────────────────────────┘
                                │ MySQL 8 Pool (Port 3306)
                                ▼
┌────────────────────────────────────────────────────────────────┐
│                     DATABASE LAYER (MySQL 8.0+)                │
│    14 Relational Tables • Analytical Views • Audit Logging     │
│     Foreign Key Cascades • Transactions • Query Optimization   │
└────────────────────────────────────────────────────────────────┘
```

---

## 📁 Directory Structure

The project follows the standard MVC / modular full-stack architecture:

```
final FD/
├── backend/
│   ├── config/
│   │   └── db.js            # MySQL connection pool & resilient data layer
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication and user token verification
│   │   ├── errorHandler.js  # Central error handler with MySQL error code mapping
│   │   └── validate.js      # Validation middleware for requests
│   ├── routes/
│   │   ├── auth.routes.js        # POST /api/auth/register, /login, /profile
│   │   ├── restaurants.routes.js # GET /api/restaurants
│   │   ├── menu.routes.js        # GET /api/menu, /api/menu/categories
│   │   ├── orders.routes.js      # POST /api/orders, GET /api/orders, /track/:id
│   │   ├── addresses.routes.js   # GET /api/addresses, POST /api/addresses
│   │   ├── reviews.routes.js     # POST /api/reviews
│   │   └── reports.routes.js     # GET /api/reports/spending, /analytics, /export
│   ├── utils/
│   │   ├── asyncHandler.js  # Async route exception handler
│   │   └── response.js      # Standardized JSON response envelope (ok, fail)
│   ├── test/
│   │   └── smoke-test.js    # Automated endpoint health verification test suite
│   ├── server.js            # Express application bootstrapper
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   └── README.md
├── database/
│   ├── schema.sql           # Complete DDL tables, constraints, indexes & views
│   ├── sample_data.sql      # Seed data (restaurants, food items, drivers, orders)
│   └── queries.sql          # Operational and analytical MySQL queries
├── frontend/
│   ├── css/
│   │   ├── base.css         # Theme root variables, reset, typography & animations
│   │   ├── components.css   # Badges, buttons, cards, steppers, modals, dropdowns
│   │   ├── layout.css       # Header navbar, categories bar, food grid, footer
│   │   └── style.css        # Consolidated master stylesheet
│   ├── js/
│   │   ├── config.js        # Client configuration & API base URLs
│   │   ├── api.js           # REST API client services
│   │   ├── ui.js            # UI helper functions (toasts, modals, audio fx)
│   │   └── app.js           # Core state management, cart operations & filtering
│   ├── assets/              # Local images and icons
│   ├── index.html           # Main single-page application
│   └── README.md
├── .gitignore
├── database.sql             # Consolidated MySQL database script
├── food_delivery_DB.sql     # Authentic MySQL database dump
├── package.json
├── README.md
├── setup_database.sql       # 1-click MySQL initialization script
└── server.js                # Root runner bridging commands to backend
```

---

## ⚡ Key Features

1. **Interactive Mega Menu Dropdown**:
   - **My Orders**: Quick access to past order records and live tracking.
   - **Reports & Analytics**: Spending statistics, cuisine breakdown bars, and downloadable invoices.
   - **Customer Services 24/7**: Helpline, live chat simulation, support ticket submission, and FAQ accordion.
   - **Dietary & Category Filters**: Veg Only, Non-Veg Specials, Crispy Snacks & Sides (Crispy French Fries), Desserts, and Drinks & Shakes.
2. **Cart & Stepper Controls**: Real-time quantity adjustments, promotional coupon codes (`FOODHUB50`), address selector, and itemized receipt calculation.
3. **Live Order Tracker**: Real-time driver status simulation with assigned driver contact details.
4. **Resilient Data Layer**: Connects to MySQL database when active, with automatic in-memory fallback to prevent downtime.

---

## 🛠 Step-by-Step Installation & Setup

### 1. Prerequisites
- **Node.js** v16 or higher (`node -v`)
- **MySQL** v8.0 or higher (optional, app automatically runs in fallback mode if MySQL is stopped)

### 2. Install Dependencies
```bash
# In the project root directory:
npm install
```

### 3. Database Setup (MySQL)
```sql
-- Connect to MySQL command line:
mysql -u root -p

-- Run the setup script:
SOURCE setup_database.sql;
```

Or using MySQL command line tool directly:
```bash
mysql -u root -p < setup_database.sql
```

### 4. Running the Application
```bash
# Start server from root:
npm start

# Or start from backend directory:
cd backend
npm start
```

Open your browser and navigate to:
```
http://localhost:5000
```

---

## 🧪 Automated Testing

To run the automated endpoint smoke tests:
```bash
npm test
```

---

## 👤 Demo Credentials

| Role | Email | Password |
|---|---|---|
| Customer (Default) | `aarav@example.com` | `password123` |
| Customer 2 | `pooja@example.com` | `password123` |
| Customer 3 | `ranvir@example.com` | `password123` |

---

## 📡 REST API Endpoint Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server health and operational status |
| `GET` | `/api/db/status` | MySQL connection pool status |
| `GET` | `/api/restaurants` | List all active restaurants |
| `GET` | `/api/menu` | List dishes with filters (`veg`, `category`, `search`) |
| `GET` | `/api/menu/categories`| List food categories |
| `POST` | `/api/auth/register` | Register new customer account |
| `POST` | `/api/auth/login` | Log in customer |
| `GET` | `/api/addresses` | Fetch customer delivery addresses |
| `POST` | `/api/addresses` | Add new delivery address |
| `POST` | `/api/orders` | Place new food order |
| `GET` | `/api/orders` | Fetch customer order history |
| `GET` | `/api/orders/track/:id`| Live driver delivery tracking info |
| `GET` | `/api/reports/spending`| Customer order spending and analytics |
| `GET` | `/api/reports/export` | Download orders report as CSV |
