CREATE DATABASE IF NOT EXISTS `food_delivery_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `food_delivery_db`;

SET FOREIGN_KEY_CHECKS = 0;

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

SET FOREIGN_KEY_CHECKS = 1;
