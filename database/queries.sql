-- =====================================================================
-- FoodHub MySQL Production Analytical & Operational Queries
-- Designed for MySQL 8.0+
-- Database: food_delivery_db
-- =====================================================================

USE `food_delivery_db`;

-- -------------------------------------------------------------
-- 1. Using the View: Order Item Totals
-- -------------------------------------------------------------
SELECT 
    o.OrderID,
    c.Name AS CustomerName,
    r.Name AS RestaurantName,
    o.Status AS OrderStatus,
    v.ItemsTotal,
    o.TotalAmount
FROM orders o
JOIN customer c ON o.CustomerID = c.CustomerID
JOIN restaurant r ON o.RestaurantID = r.RestaurantID
JOIN order_item_totals v ON o.OrderID = v.OrderID
ORDER BY o.OrderID DESC;

-- -------------------------------------------------------------
-- 2. Customer Order History with Delivery Address Details
-- -------------------------------------------------------------
SELECT 
    o.OrderID,
    o.OrderDate,
    o.Status,
    o.TotalAmount,
    r.Name AS RestaurantName,
    da.AddressLine1,
    da.City,
    da.Pincode,
    p.PaymentMethod,
    p.PaymentStatus
FROM orders o
JOIN restaurant r ON o.RestaurantID = r.RestaurantID
JOIN delivery_address da ON o.DeliveryAddressID = da.AddressID
LEFT JOIN payment p ON o.OrderID = p.OrderID
WHERE o.CustomerID = 1
ORDER BY o.OrderDate DESC;

-- -------------------------------------------------------------
-- 3. Top-Selling Food Items by Restaurant
-- -------------------------------------------------------------
SELECT 
    r.Name AS RestaurantName,
    f.Name AS FoodName,
    f.Category,
    SUM(oi.Quantity) AS TotalSold,
    SUM(oi.Quantity * oi.Price) AS TotalRevenue
FROM order_items oi
JOIN food_item f ON oi.FoodID = f.FoodID
JOIN restaurant r ON f.RestaurantID = r.RestaurantID
GROUP BY r.RestaurantID, r.Name, f.FoodID, f.Name, f.Category
ORDER BY TotalSold DESC;

-- -------------------------------------------------------------
-- 4. Active Delivery Driver Assignments and Live Status
-- -------------------------------------------------------------
SELECT 
    da.AssignmentID,
    d.Name AS DriverName,
    d.Phone AS DriverPhone,
    d.VehicleType,
    o.OrderID,
    o.Status AS OrderStatus,
    c.Name AS CustomerName,
    c.Phone AS CustomerPhone,
    addr.AddressLine1 AS DeliveryAddress,
    dz.Name AS ZoneName,
    da.AssignedAt
FROM driver_assignments da
JOIN drivers d ON da.DriverID = d.DriverID
JOIN orders o ON da.OrderID = o.OrderID
JOIN customer c ON o.CustomerID = c.CustomerID
JOIN delivery_address addr ON o.DeliveryAddressID = addr.AddressID
LEFT JOIN delivery_zones dz ON o.ZoneID = dz.ZoneID
WHERE da.Status IN ('Assigned', 'In Transit')
ORDER BY da.AssignedAt DESC;

-- -------------------------------------------------------------
-- 5. Restaurant Sales and Performance Report
-- -------------------------------------------------------------
SELECT 
    r.RestaurantID,
    r.Name AS RestaurantName,
    r.Rating,
    COUNT(DISTINCT o.OrderID) AS TotalOrdersPlaced,
    COALESCE(SUM(o.TotalAmount), 0.00) AS GrossSalesRevenue,
    ROUND(AVG(o.TotalAmount), 2) AS AverageOrderValue
FROM restaurant r
LEFT JOIN orders o ON r.RestaurantID = o.RestaurantID AND o.Status != 'Cancelled'
GROUP BY r.RestaurantID, r.Name, r.Rating
ORDER BY GrossSalesRevenue DESC;

-- -------------------------------------------------------------
-- 6. Payment Status Summary & Reconciliations
-- -------------------------------------------------------------
SELECT 
    PaymentStatus,
    PaymentMethod,
    COUNT(*) AS TransactionCount,
    SUM(Amount) AS TotalCollected
FROM payment
GROUP BY PaymentStatus, PaymentMethod;

-- -------------------------------------------------------------
-- 7. Full Itemized Bill for Order Breakdown (e.g. Order #1001)
-- -------------------------------------------------------------
SELECT 
    o.OrderID,
    o.OrderDate,
    f.Name AS ItemName,
    oi.Price AS UnitPrice,
    oi.Quantity,
    (oi.Quantity * oi.Price) AS Subtotal
FROM orders o
JOIN order_items oi ON o.OrderID = oi.OrderID
JOIN food_item f ON oi.FoodID = f.FoodID
WHERE o.OrderID = 1001;
