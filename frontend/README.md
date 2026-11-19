# FoodHub Frontend

Modern, interactive single-page application for the FoodHub food delivery platform.

## Directory Structure
```
frontend/
├── css/
│   ├── base.css        # Base variables, reset, typography & animations
│   ├── components.css  # Buttons, modals, cards, badges, steppers, dropdowns
│   ├── layout.css      # Top header navbar, category pills bar, food grid, footer
│   └── style.css       # Complete consolidated application stylesheet
├── js/
│   ├── config.js       # Client configuration & API base URLs
│   ├── api.js          # REST API client services
│   ├── ui.js           # UI helper functions (toasts, modals, audio fx)
│   └── app.js          # Core application controller & state machine
├── assets/             # Local images, banners, icons
└── index.html          # Main HTML5 entrypoint
```

## Features
- **Interactive Mega Dropdown (8 options)**: My Orders, Reports, Customer Services 24/7, Pure Veg, Non-Veg, Snacks & Sides, Desserts, and Drinks & Shakes.
- **Cart & Checkout Drawer**: Dynamic quantity stepper, coupon applicator (`FOODHUB50`), address selector, and live order placement.
- **Order Tracker Modal**: Real-time simulated driver status and location progress.
- **Order Reports & Analytics Modal**: Spending metrics, cuisine distribution charts, and PDF/CSV invoice downloads.
- **Customer Services Desk Modal**: 24/7 Helpline, email support, support ticket submission form, and FAQ accordion.
