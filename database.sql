-- =====================================================================
-- FoodHub Complete MySQL Database Setup Script
-- Compatible with MySQL 8.0+
-- Database: food_delivery_db
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `food_delivery_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `food_delivery_db`;

SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
-- 1. Table structure for table `customer`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `CustomerID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(120) NOT NULL,
  `Phone` varchar(25) DEFAULT NULL,
  `Email` varchar(254) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CustomerID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- 2. Table structure for table `delivery_address`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `delivery_address`;
CREATE TABLE `delivery_address` (
  `AddressID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `CustomerID` bigint unsigned NOT NULL,
  `AddressLine1` varchar(255) NOT NULL,
  `AddressLine2` varchar(255) DEFAULT NULL,
  `City` varchar(100) NOT NULL,
  `State` varchar(100) NOT NULL,
  `Pincode` varchar(15) NOT NULL,
  `Type` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`AddressID`),
  KEY `CustomerID` (`CustomerID`),
  CONSTRAINT `delivery_address_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`CustomerID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- 3. Table structure for table `delivery_zones`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `delivery_zones`;
CREATE TABLE `delivery_zones` (
  `ZoneID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(120) NOT NULL,
  `Area` varchar(150) DEFAULT NULL,
  `PincodeRange` varchar(100) DEFAULT NULL,
  `BaseFee` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`ZoneID`),
  CONSTRAINT `delivery_zones_chk_1` CHECK ((`BaseFee` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- 4. Table structure for table `drivers`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `drivers`;
CREATE TABLE `drivers` (
  `DriverID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(120) NOT NULL,
  `Phone` varchar(25) DEFAULT NULL,
  `Email` varchar(254) DEFAULT NULL,
  `VehicleType` varchar(60) DEFAULT NULL,
  `LicenseNumber` varchar(80) DEFAULT NULL,
  `Status` varchar(30) DEFAULT 'Active',
  PRIMARY KEY (`DriverID`),
  UNIQUE KEY `LicenseNumber` (`LicenseNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- 5. Table structure for table `restaurant`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `restaurant`;
CREATE TABLE `restaurant` (
  `RestaurantID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(150) NOT NULL,
  `Phone` varchar(25) DEFAULT NULL,
  `Email` varchar(254) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Rating` decimal(2,1) DEFAULT NULL,
  `Status` varchar(30) DEFAULT 'Active',
  PRIMARY KEY (`RestaurantID`),
  CONSTRAINT `restaurant_chk_1` CHECK (((`Rating` is null) or (`Rating` between 0 and 5)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- 6. Table structure for table `menu`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `MenuID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `RestaurantID` bigint unsigned NOT NULL,
  `Name` varchar(150) NOT NULL,
  `Description` text,
  `Status` varchar(30) DEFAULT 'Active',
  PRIMARY KEY (`MenuID`),
  KEY `RestaurantID` (`RestaurantID`),
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`RestaurantID`) REFERENCES `restaurant` (`RestaurantID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- 7. Table structure for table `food_item`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `food_item`;
CREATE TABLE `food_item` (
  `FoodID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `RestaurantID` bigint unsigned NOT NULL,
  `Name` varchar(150) NOT NULL,
  `Description` text,
  `Price` decimal(10,2) NOT NULL,
  `Category` varchar(80) DEFAULT NULL,
  `Status` varchar(30) DEFAULT 'Available',
  PRIMARY KEY (`FoodID`),
  KEY `RestaurantID` (`RestaurantID`),
  CONSTRAINT `food_item_ibfk_1` FOREIGN KEY (`RestaurantID`) REFERENCES `restaurant` (`RestaurantID`) ON DELETE CASCADE,
  CONSTRAINT `food_item_chk_1` CHECK ((`Price` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- 8. Table structure for table `menu_items`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `menu_items`;
CREATE TABLE `menu_items` (
  `MenuItemID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `MenuID` bigint unsigned NOT NULL,
  `FoodID` bigint unsigned NOT NULL,
  `Name` varchar(150) NOT NULL,
  `Description` text,
  `Price` decimal(10,2) NOT NULL,
  `Availability` varchar(30) DEFAULT 'Available',
  PRIMARY KEY (`MenuItemID`),
  UNIQUE KEY `MenuID` (`MenuID`,`FoodID`),
  KEY `FoodID` (`FoodID`),
  CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`MenuID`) REFERENCES `menu` (`MenuID`) ON DELETE CASCADE,
  CONSTRAINT `menu_items_ibfk_2` FOREIGN KEY (`FoodID`) REFERENCES `food_item` (`FoodID`) ON DELETE CASCADE,
  CONSTRAINT `menu_items_chk_1` CHECK ((`Price` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- 9. Table structure for table `orders`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `OrderID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `CustomerID` bigint unsigned NOT NULL,
  `RestaurantID` bigint unsigned NOT NULL,
  `DeliveryAddressID` bigint unsigned NOT NULL,
  `ZoneID` bigint unsigned DEFAULT NULL,
  `OrderDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `Status` varchar(30) DEFAULT 'Placed',
  `TotalAmount` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`OrderID`),
  KEY `RestaurantID` (`RestaurantID`),
  KEY `DeliveryAddressID` (`DeliveryAddressID`),
  KEY `ZoneID` (`ZoneID`),
  KEY `idx_orders_customer_date` (`CustomerID`,`OrderDate`),
  KEY `idx_orders_status` (`Status`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`CustomerID`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`RestaurantID`) REFERENCES `restaurant` (`RestaurantID`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`DeliveryAddressID`) REFERENCES `delivery_address` (`AddressID`),
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`ZoneID`) REFERENCES `delivery_zones` (`ZoneID`) ON DELETE SET NULL,
  CONSTRAINT `orders_chk_1` CHECK ((`TotalAmount` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- 10. Table structure for table `order_items`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `OrderItemID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `OrderID` bigint unsigned NOT NULL,
  `FoodID` bigint unsigned NOT NULL,
  `Quantity` int unsigned NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`OrderItemID`),
  KEY `OrderID` (`OrderID`),
  KEY `FoodID` (`FoodID`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`FoodID`) REFERENCES `food_item` (`FoodID`),
  CONSTRAINT `order_items_chk_1` CHECK ((`Quantity` > 0)),
  CONSTRAINT `order_items_chk_2` CHECK ((`Price` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- 11. Table structure for table `order_status_history`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `order_status_history`;
CREATE TABLE `order_status_history` (
  `HistoryID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `OrderID` bigint unsigned NOT NULL,
  `Status` varchar(30) NOT NULL,
  `ChangedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `Notes` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`HistoryID`),
  KEY `idx_history_order_time` (`OrderID`,`ChangedAt`),
  CONSTRAINT `order_status_history_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- 12. Table structure for table `driver_assignments`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `driver_assignments`;
CREATE TABLE `driver_assignments` (
  `AssignmentID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `OrderID` bigint unsigned NOT NULL,
  `DriverID` bigint unsigned NOT NULL,
  `AssignedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `Status` varchar(30) DEFAULT 'Assigned',
  PRIMARY KEY (`AssignmentID`),
  KEY `idx_assignment_order` (`OrderID`),
  KEY `idx_assignment_driver` (`DriverID`),
  CONSTRAINT `driver_assignments_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`) ON DELETE CASCADE,
  CONSTRAINT `driver_assignments_ibfk_2` FOREIGN KEY (`DriverID`) REFERENCES `drivers` (`DriverID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- 13. Table structure for table `payment`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment` (
  `PaymentID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `OrderID` bigint unsigned NOT NULL,
  `PaymentMethod` varchar(40) NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `PaymentStatus` varchar(30) DEFAULT 'Pending',
  `PaymentDate` datetime DEFAULT NULL,
  PRIMARY KEY (`PaymentID`),
  KEY `idx_payment_order` (`OrderID`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`) ON DELETE CASCADE,
  CONSTRAINT `payment_chk_1` CHECK ((`Amount` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- 14. Table structure for table `refunds`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `refunds`;
CREATE TABLE `refunds` (
  `RefundID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `OrderID` bigint unsigned NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Reason` varchar(500) DEFAULT NULL,
  `Status` varchar(30) DEFAULT 'Pending',
  `RefundDate` datetime DEFAULT NULL,
  PRIMARY KEY (`RefundID`),
  KEY `idx_refunds_order` (`OrderID`),
  CONSTRAINT `refunds_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`) ON DELETE CASCADE,
  CONSTRAINT `refunds_chk_1` CHECK ((`Amount` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- 15. View structure for view `order_item_totals`
-- -------------------------------------------------------------
DROP VIEW IF EXISTS `order_item_totals`;
CREATE VIEW `order_item_totals` AS 
SELECT 
  `order_items`.`OrderID` AS `OrderID`,
  SUM((`order_items`.`Quantity` * `order_items`.`Price`)) AS `ItemsTotal`
FROM `order_items` 
GROUP BY `order_items`.`OrderID`;

-- -------------------------------------------------------------
-- SEED DATA INSERTION
-- -------------------------------------------------------------

-- 1. Customers
INSERT INTO `customer` (`CustomerID`, `Name`, `Phone`, `Email`, `Address`) VALUES
(1, 'Aarav Sharma', '+91 98765 00001', 'aarav@example.com', '12 MP Nagar, Zone 1, Bhopal'),
(2, 'Pooja Patel', '+91 98765 00002', 'pooja@example.com', '45 Scheme 54, Vijay Nagar, Indore'),
(3, 'Ranvir Sharma', '+91 98765 00003', 'ranvir@example.com', 'Flat 402, Royal Enclave, Arera Colony, Bhopal');

-- 2. Delivery Addresses
INSERT INTO `delivery_address` (`AddressID`, `CustomerID`, `AddressLine1`, `AddressLine2`, `City`, `State`, `Pincode`, `Type`) VALUES
(1, 1, '12 MP Nagar, Zone 1', 'Near Chetak Bridge', 'Bhopal', 'Madhya Pradesh', '462011', 'Home'),
(2, 1, 'Tech Park, Hoshangabad Rd', 'Tower B, 3rd Floor', 'Bhopal', 'Madhya Pradesh', '462026', 'Work'),
(3, 2, '45 Scheme 54, Vijay Nagar', 'Opposite Apollo Hospital', 'Indore', 'Madhya Pradesh', '452010', 'Home'),
(4, 3, 'Flat 402, Royal Enclave', 'Arera Colony, E-Sector', 'Bhopal', 'Madhya Pradesh', '462016', 'Home');

-- 3. Delivery Zones
INSERT INTO `delivery_zones` (`ZoneID`, `Name`, `Area`, `PincodeRange`, `BaseFee`) VALUES
(1, 'Bhopal Central', 'MP Nagar, Arera Colony, New Market', '462001-462020', 30.00),
(2, 'Bhopal West', 'Kolar Road, Bairagarh, Airport Rd', '462021-462040', 45.00),
(3, 'Indore North', 'Vijay Nagar, Palasia, Rajwada', '452001-452020', 35.00);

-- 4. Drivers
INSERT INTO `drivers` (`DriverID`, `Name`, `Phone`, `Email`, `VehicleType`, `LicenseNumber`, `Status`) VALUES
(1, 'Aman Verma', '+91 98200 00001', 'aman.verma@foodhub.com', 'Hero Electric Optima (MP-04-EB-1204)', 'MP04-2021-998811', 'Active'),
(2, 'Rahul Sen', '+91 98200 00002', 'rahul.sen@foodhub.com', 'TVS Jupiter (MP-09-CD-4512)', 'MP09-2019-334422', 'Active'),
(3, 'Vikram Joshi', '+91 98200 00003', 'vikram.joshi@foodhub.com', 'Bajaj Pulsar 150 (MP-04-GH-8877)', 'MP04-2020-556677', 'Active');

-- 5. Restaurants
INSERT INTO `restaurant` (`RestaurantID`, `Name`, `Phone`, `Email`, `Address`, `Rating`, `Status`) VALUES
(1, 'Spice Garden', '+91 98111 00001', 'info@spicegarden.com', '102 MP Nagar Zone-II, Bhopal', 4.9, 'Active'),
(2, 'Burger Hub', '+91 98111 00002', 'hello@burgerhub.com', '78 Vijay Nagar Main Road, Indore', 4.8, 'Active'),
(3, 'Pizza Corner', '+91 98111 00003', 'orders@pizzacorner.com', '14 Arera Hills Commercial Area, Bhopal', 4.9, 'Active');

-- 6. Menus
INSERT INTO `menu` (`MenuID`, `RestaurantID`, `Name`, `Description`, `Status`) VALUES
(1, 1, 'Spice Garden Signature Menu', 'Authentic North Indian Curries, Dum Biryanis & Tandoor Specials', 'Active'),
(2, 2, 'Burger Hub Gourmet Collection', 'Handcrafted Smash Burgers, Loaded Sides & Thick Shakes', 'Active'),
(3, 3, 'Pizza Corner Artisan Pizzas', 'Woodfired sourdough crust pizzas with imported Italian toppings', 'Active');

-- 7. Food Items (Including Crispy French Fries)
INSERT INTO `food_item` (`FoodID`, `RestaurantID`, `Name`, `Description`, `Price`, `Category`, `Status`) VALUES
(1, 1, 'Paneer Butter Masala', 'Rich cottage cheese cubes cooked in creamy tomato butter gravy and aromatic spices.', 240.00, 'biryani', 'Available'),
(2, 1, 'Royal Hyderabadi Veg Dum Biryani', 'Aromatic long-grain basmati rice slow-cooked with garden vegetables, saffron and kewra.', 180.00, 'biryani', 'Available'),
(3, 1, 'Dal Makhani', 'Slow-cooked black lentils simmered overnight with fresh churned white butter and cream.', 200.00, 'biryani', 'Available'),
(4, 2, 'Gourmet Truffle Burger', 'Single prime patty layered with aged cheddar, caramelized shallots, and truffle aioli on a brioche bun.', 220.00, 'burgers', 'Available'),
(5, 2, 'Classic Double Cheese Smash Burger', 'Two smashed patties, double American cheese, dill pickles, and secret relish sauce.', 260.00, 'burgers', 'Available'),
(6, 2, 'Crispy French Fries', 'Golden hand-cut russet potatoes fried to crunchy perfection, lightly seasoned with sea salt.', 120.00, 'snacks', 'Available'),
(7, 3, 'Margherita Artisan Pizza', 'San Marzano tomato sauce, fresh mozzarella di bufala, torn sweet basil, and extra virgin olive oil.', 299.00, 'pizzas', 'Available'),
(8, 3, 'Spicy Pepperoni & Jalapeno Pizza', 'Zesty pepperoni slices, sliced pickled jalapenos, mozzarella, and chili honey drizzle.', 399.00, 'pizzas', 'Available'),
(9, 3, 'Penne Alfredo Supreme', 'Al dente penne in velvety parmesan garlic cream sauce with fresh herbs and toasted garlic bread.', 240.00, 'pasta', 'Available'),
(10, 2, 'Belgian Chocolate Thick Shake', 'Rich Belgian dark chocolate blended with whole milk and topped with dark chocolate curls.', 160.00, 'beverages', 'Available'),
(11, 1, 'Gulab Jamun with Rabri', 'Warm melt-in-mouth golden dumplings soaked in cardamom syrup and served with creamy pistachio rabri.', 130.00, 'desserts', 'Available'),
(12, 1, 'Fresh Greek Salad Bowl', 'Crisp romaine lettuce, kalamata olives, cucumber, cherry tomatoes, and feta cheese with lemon herb vinaigrette.', 190.00, 'healthy', 'Available');

-- 8. Menu Items
INSERT INTO `menu_items` (`MenuItemID`, `MenuID`, `FoodID`, `Name`, `Description`, `Price`, `Availability`) VALUES
(1, 1, 1, 'Paneer Butter Masala', 'Rich cottage cheese cubes cooked in creamy tomato butter gravy and aromatic spices.', 240.00, 'Available'),
(2, 1, 2, 'Royal Hyderabadi Veg Dum Biryani', 'Aromatic long-grain basmati rice slow-cooked with garden vegetables, saffron and kewra.', 180.00, 'Available'),
(3, 1, 3, 'Dal Makhani', 'Slow-cooked black lentils simmered overnight with fresh churned white butter and cream.', 200.00, 'Available'),
(4, 2, 4, 'Gourmet Truffle Burger', 'Single prime patty layered with aged cheddar, caramelized shallots, and truffle aioli on a brioche bun.', 220.00, 'Available'),
(5, 2, 5, 'Classic Double Cheese Smash Burger', 'Two smashed patties, double American cheese, dill pickles, and secret relish sauce.', 260.00, 'Available'),
(6, 2, 6, 'Crispy French Fries', 'Golden hand-cut russet potatoes fried to crunchy perfection, lightly seasoned with sea salt.', 120.00, 'Available'),
(7, 3, 7, 'Margherita Artisan Pizza', 'San Marzano tomato sauce, fresh mozzarella di bufala, torn sweet basil, and extra virgin olive oil.', 299.00, 'Available'),
(8, 3, 8, 'Spicy Pepperoni & Jalapeno Pizza', 'Zesty pepperoni slices, sliced pickled jalapenos, mozzarella, and chili honey drizzle.', 399.00, 'Available'),
(9, 3, 9, 'Penne Alfredo Supreme', 'Al dente penne in velvety parmesan garlic cream sauce with fresh herbs and toasted garlic bread.', 240.00, 'Available'),
(10, 2, 10, 'Belgian Chocolate Thick Shake', 'Rich Belgian dark chocolate blended with whole milk and topped with dark chocolate curls.', 160.00, 'Available'),
(11, 1, 11, 'Gulab Jamun with Rabri', 'Warm melt-in-mouth golden dumplings soaked in cardamom syrup and served with creamy pistachio rabri.', 130.00, 'Available'),
(12, 1, 12, 'Fresh Greek Salad Bowl', 'Crisp romaine lettuce, kalamata olives, cucumber, cherry tomatoes, and feta cheese with lemon herb vinaigrette.', 190.00, 'Available');

-- 9. Orders
INSERT INTO `orders` (`OrderID`, `CustomerID`, `RestaurantID`, `DeliveryAddressID`, `ZoneID`, `OrderDate`, `Status`, `TotalAmount`) VALUES
(1001, 1, 1, 1, 1, '2026-10-24 19:15:00', 'Delivered', 450.00),
(1002, 2, 2, 3, 3, '2026-10-24 20:30:00', 'Delivered', 380.00),
(1003, 3, 3, 4, 1, '2026-10-25 12:45:00', 'Out for Delivery', 539.00),
(1004, 1, 2, 2, 1, '2026-10-25 13:10:00', 'Placed', 380.00);

-- 10. Order Items
INSERT INTO `order_items` (`OrderItemID`, `OrderID`, `FoodID`, `Quantity`, `Price`) VALUES
(1, 1001, 1, 1, 240.00),
(2, 1001, 2, 1, 180.00),
(3, 1002, 4, 1, 220.00),
(4, 1002, 6, 1, 120.00),
(5, 1003, 7, 1, 299.00),
(6, 1003, 9, 1, 240.00),
(7, 1004, 5, 1, 260.00),
(8, 1004, 6, 1, 120.00);

-- 11. Order Status History
INSERT INTO `order_status_history` (`HistoryID`, `OrderID`, `Status`, `ChangedAt`, `Notes`) VALUES
(1, 1001, 'Placed', '2026-10-24 19:15:00', 'Order placed by customer via web portal'),
(2, 1001, 'Accepted', '2026-10-24 19:17:00', 'Restaurant accepted order'),
(3, 1001, 'Prepared', '2026-10-24 19:35:00', 'Food freshly prepared and packed'),
(4, 1001, 'Picked Up', '2026-10-24 19:40:00', 'Driver Aman Verma picked up the order'),
(5, 1001, 'Delivered', '2026-10-24 20:02:00', 'Order delivered at doorstep'),
(6, 1003, 'Placed', '2026-10-25 12:45:00', 'Order received and confirmed'),
(7, 1003, 'Picked Up', '2026-10-25 13:05:00', 'Driver Aman Verma en route to destination'),
(8, 1003, 'Out for Delivery', '2026-10-25 13:12:00', 'Arriving within 15 minutes');

-- 12. Driver Assignments
INSERT INTO `driver_assignments` (`AssignmentID`, `OrderID`, `DriverID`, `AssignedAt`, `Status`) VALUES
(1, 1001, 1, '2026-10-24 19:20:00', 'Completed'),
(2, 1002, 2, '2026-10-24 20:35:00', 'Completed'),
(3, 1003, 1, '2026-10-25 12:50:00', 'In Transit'),
(4, 1004, 3, '2026-10-25 13:12:00', 'Assigned');

-- 13. Payments
INSERT INTO `payment` (`PaymentID`, `OrderID`, `PaymentMethod`, `Amount`, `PaymentStatus`, `PaymentDate`) VALUES
(1, 1001, 'UPI', 450.00, 'Successful', '2026-10-24 19:15:30'),
(2, 1002, 'Credit Card', 380.00, 'Successful', '2026-10-24 20:30:45'),
(3, 1003, 'Online Net Banking', 539.00, 'Successful', '2026-10-25 12:45:20'),
(4, 1004, 'Cash on Delivery', 380.00, 'Pending', NULL);

-- 14. Refunds
INSERT INTO `refunds` (`RefundID`, `OrderID`, `Amount`, `Reason`, `Status`, `RefundDate`) VALUES
(1, 1001, 50.00, 'Promo discount adjustment requested by customer', 'Processed', '2026-10-24 20:10:00');

SET FOREIGN_KEY_CHECKS = 1;
