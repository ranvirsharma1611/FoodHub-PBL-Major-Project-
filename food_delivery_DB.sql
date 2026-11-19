-- MySQL dump 10.13  Distrib 8.0.46, for macos15 (arm64)
--
-- Host: localhost    Database: food_delivery_db
-- ------------------------------------------------------
-- Server version	8.4.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `CustomerID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(120) NOT NULL,
  `Phone` varchar(25) DEFAULT NULL,
  `Email` varchar(254) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CustomerID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_address`
--

DROP TABLE IF EXISTS `delivery_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  CONSTRAINT `delivery_address_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`CustomerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_address`
--

LOCK TABLES `delivery_address` WRITE;
/*!40000 ALTER TABLE `delivery_address` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_zones`
--

DROP TABLE IF EXISTS `delivery_zones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_zones` (
  `ZoneID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(120) NOT NULL,
  `Area` varchar(150) DEFAULT NULL,
  `PincodeRange` varchar(100) DEFAULT NULL,
  `BaseFee` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`ZoneID`),
  CONSTRAINT `delivery_zones_chk_1` CHECK ((`BaseFee` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_zones`
--

LOCK TABLES `delivery_zones` WRITE;
/*!40000 ALTER TABLE `delivery_zones` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery_zones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver_assignments`
--

DROP TABLE IF EXISTS `driver_assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver_assignments`
--

LOCK TABLES `driver_assignments` WRITE;
/*!40000 ALTER TABLE `driver_assignments` DISABLE KEYS */;
/*!40000 ALTER TABLE `driver_assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivers`
--

LOCK TABLES `drivers` WRITE;
/*!40000 ALTER TABLE `drivers` DISABLE KEYS */;
/*!40000 ALTER TABLE `drivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_item`
--

DROP TABLE IF EXISTS `food_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  CONSTRAINT `food_item_ibfk_1` FOREIGN KEY (`RestaurantID`) REFERENCES `restaurant` (`RestaurantID`),
  CONSTRAINT `food_item_chk_1` CHECK ((`Price` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_item`
--

LOCK TABLES `food_item` WRITE;
/*!40000 ALTER TABLE `food_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `food_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `MenuID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `RestaurantID` bigint unsigned NOT NULL,
  `Name` varchar(150) NOT NULL,
  `Description` text,
  `Status` varchar(30) DEFAULT 'Active',
  PRIMARY KEY (`MenuID`),
  KEY `RestaurantID` (`RestaurantID`),
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`RestaurantID`) REFERENCES `restaurant` (`RestaurantID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`MenuID`) REFERENCES `menu` (`MenuID`),
  CONSTRAINT `menu_items_ibfk_2` FOREIGN KEY (`FoodID`) REFERENCES `food_item` (`FoodID`),
  CONSTRAINT `menu_items_chk_1` CHECK ((`Price` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `order_item_totals`
--

DROP TABLE IF EXISTS `order_item_totals`;
/*!50001 DROP VIEW IF EXISTS `order_item_totals`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `order_item_totals` AS SELECT 
 1 AS `OrderID`,
 1 AS `ItemsTotal`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status_history`
--

DROP TABLE IF EXISTS `order_status_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status_history`
--

LOCK TABLES `order_status_history` WRITE;
/*!40000 ALTER TABLE `order_status_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_status_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `PaymentID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `OrderID` bigint unsigned NOT NULL,
  `PaymentMethod` varchar(40) NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `PaymentStatus` varchar(30) DEFAULT 'Pending',
  `PaymentDate` datetime DEFAULT NULL,
  PRIMARY KEY (`PaymentID`),
  KEY `idx_payment_order` (`OrderID`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`),
  CONSTRAINT `payment_chk_1` CHECK ((`Amount` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refunds`
--

DROP TABLE IF EXISTS `refunds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refunds` (
  `RefundID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `OrderID` bigint unsigned NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Reason` varchar(500) DEFAULT NULL,
  `Status` varchar(30) DEFAULT 'Pending',
  `RefundDate` datetime DEFAULT NULL,
  PRIMARY KEY (`RefundID`),
  KEY `idx_refunds_order` (`OrderID`),
  CONSTRAINT `refunds_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`),
  CONSTRAINT `refunds_chk_1` CHECK ((`Amount` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refunds`
--

LOCK TABLES `refunds` WRITE;
/*!40000 ALTER TABLE `refunds` DISABLE KEYS */;
/*!40000 ALTER TABLE `refunds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `order_item_totals`
--

/*!50001 DROP VIEW IF EXISTS `order_item_totals`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `order_item_totals` AS select `order_items`.`OrderID` AS `OrderID`,sum((`order_items`.`Quantity` * `order_items`.`Price`)) AS `ItemsTotal` from `order_items` group by `order_items`.`OrderID` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-25  9:07:01
