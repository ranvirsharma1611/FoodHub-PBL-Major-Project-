-- =====================================================================
-- FoodHub MySQL Relational Database Sample Seed Data
-- Compatible with MySQL 8.0+
-- Matches schema: food_delivery_db
-- =====================================================================

USE `food_delivery_db`;

SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
-- 1. Customers
-- -------------------------------------------------------------
TRUNCATE TABLE `customer`;
INSERT INTO `customer` (`CustomerID`, `Name`, `Phone`, `Email`, `Address`) VALUES
(1, 'Aarav Sharma', '+91 98765 00001', 'aarav@example.com', '12 MP Nagar, Zone 1, Bhopal'),
(2, 'Pooja Patel', '+91 98765 00002', 'pooja@example.com', '45 Scheme 54, Vijay Nagar, Indore'),
(3, 'Ranvir Sharma', '+91 98765 00003', 'ranvir@example.com', 'Flat 402, Royal Enclave, Arera Colony, Bhopal');

-- -------------------------------------------------------------
-- 2. Delivery Addresses
-- -------------------------------------------------------------
TRUNCATE TABLE `delivery_address`;
INSERT INTO `delivery_address` (`AddressID`, `CustomerID`, `AddressLine1`, `AddressLine2`, `City`, `State`, `Pincode`, `Type`) VALUES
(1, 1, '12 MP Nagar, Zone 1', 'Near Chetak Bridge', 'Bhopal', 'Madhya Pradesh', '462011', 'Home'),
(2, 1, 'Tech Park, Hoshangabad Rd', 'Tower B, 3rd Floor', 'Bhopal', 'Madhya Pradesh', '462026', 'Work'),
(3, 2, '45 Scheme 54, Vijay Nagar', 'Opposite Apollo Hospital', 'Indore', 'Madhya Pradesh', '452010', 'Home'),
(4, 3, 'Flat 402, Royal Enclave', 'Arera Colony, E-Sector', 'Bhopal', 'Madhya Pradesh', '462016', 'Home');

-- -------------------------------------------------------------
-- 3. Delivery Zones
-- -------------------------------------------------------------
TRUNCATE TABLE `delivery_zones`;
INSERT INTO `delivery_zones` (`ZoneID`, `Name`, `Area`, `PincodeRange`, `BaseFee`) VALUES
(1, 'Bhopal Central', 'MP Nagar, Arera Colony, New Market', '462001-462020', 30.00),
(2, 'Bhopal West', 'Kolar Road, Bairagarh, Airport Rd', '462021-462040', 45.00),
(3, 'Indore North', 'Vijay Nagar, Palasia, Rajwada', '452001-452020', 35.00);

-- -------------------------------------------------------------
-- 4. Drivers
-- -------------------------------------------------------------
TRUNCATE TABLE `drivers`;
INSERT INTO `drivers` (`DriverID`, `Name`, `Phone`, `Email`, `VehicleType`, `LicenseNumber`, `Status`) VALUES
(1, 'Aman Verma', '+91 98200 00001', 'aman.verma@foodhub.com', 'Hero Electric Optima (MP-04-EB-1204)', 'MP04-2021-998811', 'Active'),
(2, 'Rahul Sen', '+91 98200 00002', 'rahul.sen@foodhub.com', 'TVS Jupiter (MP-09-CD-4512)', 'MP09-2019-334422', 'Active'),
(3, 'Vikram Joshi', '+91 98200 00003', 'vikram.joshi@foodhub.com', 'Bajaj Pulsar 150 (MP-04-GH-8877)', 'MP04-2020-556677', 'Active');

-- -------------------------------------------------------------
-- 5. Restaurants
-- -------------------------------------------------------------
TRUNCATE TABLE `restaurant`;
INSERT INTO `restaurant` (`RestaurantID`, `Name`, `Phone`, `Email`, `Address`, `Rating`, `Status`) VALUES
(1, 'Spice Garden', '+91 98111 00001', 'info@spicegarden.com', '102 MP Nagar Zone-II, Bhopal', 4.9, 'Active'),
(2, 'Burger Hub', '+91 98111 00002', 'hello@burgerhub.com', '78 Vijay Nagar Main Road, Indore', 4.8, 'Active'),
(3, 'Pizza Corner', '+91 98111 00003', 'orders@pizzacorner.com', '14 Arera Hills Commercial Area, Bhopal', 4.9, 'Active');

-- -------------------------------------------------------------
-- 6. Menus
-- -------------------------------------------------------------
TRUNCATE TABLE `menu`;
INSERT INTO `menu` (`MenuID`, `RestaurantID`, `Name`, `Description`, `Status`) VALUES
(1, 1, 'Spice Garden Signature Menu', 'Authentic North Indian Curries, Dum Biryanis & Tandoor Specials', 'Active'),
(2, 2, 'Burger Hub Gourmet Collection', 'Handcrafted Smash Burgers, Loaded Sides & Thick Shakes', 'Active'),
(3, 3, 'Pizza Corner Artisan Pizzas', 'Woodfired sourdough crust pizzas with imported Italian toppings', 'Active');

-- -------------------------------------------------------------
-- 7. Food Items (Including Crispy French Fries and Popular Dishes)
-- -------------------------------------------------------------
TRUNCATE TABLE `food_item`;
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

-- -------------------------------------------------------------
-- 8. Menu Items
-- -------------------------------------------------------------
TRUNCATE TABLE `menu_items`;
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

-- -------------------------------------------------------------
-- 9. Orders
-- -------------------------------------------------------------
TRUNCATE TABLE `orders`;
INSERT INTO `orders` (`OrderID`, `CustomerID`, `RestaurantID`, `DeliveryAddressID`, `ZoneID`, `OrderDate`, `Status`, `TotalAmount`) VALUES
(1001, 1, 1, 1, 1, '2026-10-24 19:15:00', 'Delivered', 450.00),
(1002, 2, 2, 3, 3, '2026-10-24 20:30:00', 'Delivered', 380.00),
(1003, 3, 3, 4, 1, '2026-10-25 12:45:00', 'Out for Delivery', 539.00),
(1004, 1, 2, 2, 1, '2026-10-25 13:10:00', 'Placed', 380.00);

-- -------------------------------------------------------------
-- 10. Order Items
-- -------------------------------------------------------------
TRUNCATE TABLE `order_items`;
INSERT INTO `order_items` (`OrderItemID`, `OrderID`, `FoodID`, `Quantity`, `Price`) VALUES
(1, 1001, 1, 1, 240.00),
(2, 1001, 2, 1, 180.00),
(3, 1002, 4, 1, 220.00),
(4, 1002, 6, 1, 120.00),
(5, 1003, 7, 1, 299.00),
(6, 1003, 9, 1, 240.00),
(7, 1004, 5, 1, 260.00),
(8, 1004, 6, 1, 120.00);

-- -------------------------------------------------------------
-- 11. Order Status History
-- -------------------------------------------------------------
TRUNCATE TABLE `order_status_history`;
INSERT INTO `order_status_history` (`HistoryID`, `OrderID`, `Status`, `ChangedAt`, `Notes`) VALUES
(1, 1001, 'Placed', '2026-10-24 19:15:00', 'Order placed by customer via web portal'),
(2, 1001, 'Accepted', '2026-10-24 19:17:00', 'Restaurant accepted order'),
(3, 1001, 'Prepared', '2026-10-24 19:35:00', 'Food freshly prepared and packed'),
(4, 1001, 'Picked Up', '2026-10-24 19:40:00', 'Driver Aman Verma picked up the order'),
(5, 1001, 'Delivered', '2026-10-24 20:02:00', 'Order delivered at doorstep'),
(6, 1003, 'Placed', '2026-10-25 12:45:00', 'Order received and confirmed'),
(7, 1003, 'Picked Up', '2026-10-25 13:05:00', 'Driver Aman Verma en route to destination'),
(8, 1003, 'Out for Delivery', '2026-10-25 13:12:00', 'Arriving within 15 minutes');

-- -------------------------------------------------------------
-- 12. Driver Assignments
-- -------------------------------------------------------------
TRUNCATE TABLE `driver_assignments`;
INSERT INTO `driver_assignments` (`AssignmentID`, `OrderID`, `DriverID`, `AssignedAt`, `Status`) VALUES
(1, 1001, 1, '2026-10-24 19:20:00', 'Completed'),
(2, 1002, 2, '2026-10-24 20:35:00', 'Completed'),
(3, 1003, 1, '2026-10-25 12:50:00', 'In Transit'),
(4, 1004, 3, '2026-10-25 13:12:00', 'Assigned');

-- -------------------------------------------------------------
-- 13. Payments
-- -------------------------------------------------------------
TRUNCATE TABLE `payment`;
INSERT INTO `payment` (`PaymentID`, `OrderID`, `PaymentMethod`, `Amount`, `PaymentStatus`, `PaymentDate`) VALUES
(1, 1001, 'UPI', 450.00, 'Successful', '2026-10-24 19:15:30'),
(2, 1002, 'Credit Card', 380.00, 'Successful', '2026-10-24 20:30:45'),
(3, 1003, 'Online Net Banking', 539.00, 'Successful', '2026-10-25 12:45:20'),
(4, 1004, 'Cash on Delivery', 380.00, 'Pending', NULL);

-- -------------------------------------------------------------
-- 14. Refunds
-- -------------------------------------------------------------
TRUNCATE TABLE `refunds`;
INSERT INTO `refunds` (`RefundID`, `OrderID`, `Amount`, `Reason`, `Status`, `RefundDate`) VALUES
(1, 1001, 50.00, 'Promo discount adjustment requested by customer', 'Processed', '2026-10-24 20:10:00');

SET FOREIGN_KEY_CHECKS = 1;
