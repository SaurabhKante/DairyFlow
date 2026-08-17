-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: milkmistdb
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `customer_payments`
--

DROP TABLE IF EXISTS `customer_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_payments` (
  `paymentId` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `paymentDate` date NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `paymentMode` enum('CASH','UPI') DEFAULT 'CASH',
  `remarks` varchar(255) DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`paymentId`),
  KEY `fk_customer_payment_customer` (`customerId`),
  KEY `fk_customer_payment_user` (`createdBy`),
  CONSTRAINT `fk_customer_payment_customer` FOREIGN KEY (`customerId`) REFERENCES `customers` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_customer_payment_user` FOREIGN KEY (`createdBy`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_payments`
--

LOCK TABLES `customer_payments` WRITE;
/*!40000 ALTER TABLE `customer_payments` DISABLE KEYS */;
INSERT INTO `customer_payments` VALUES (2,3,'2026-06-01','2026-07-09','2026-07-10',93.00,'CASH',NULL,2,1,'2026-07-10 19:48:41','2026-07-10 19:48:41'),(3,2,'2026-07-03','2026-07-09','2026-07-11',310.00,'CASH',NULL,1,1,'2026-07-11 00:11:22','2026-07-11 00:11:22'),(4,2,'2026-07-03','2026-07-09','2026-07-11',341.00,'UPI',NULL,1,1,'2026-07-11 00:12:24','2026-07-11 00:12:24'),(5,3,'2026-07-10','2026-07-10','2026-07-11',434.00,'CASH',NULL,1,1,'2026-07-11 00:12:45','2026-07-11 00:12:45'),(6,1,'2026-06-01','2026-07-11','2026-07-11',124.00,'CASH',NULL,2,1,'2026-07-11 09:49:56','2026-07-11 09:49:56');
/*!40000 ALTER TABLE `customer_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customerId` int NOT NULL AUTO_INCREMENT,
  `customerName` varchar(150) NOT NULL,
  `mobileNo` varchar(15) DEFAULT NULL,
  `address` text,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`customerId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Aaryan','9993999990','HinganGhat, Maharashtra',1,'2026-07-10 18:54:30','2026-07-15 20:25:44'),(2,'Rohit Sharma','9876543780','Mumbai, Maharashtra',1,'2026-07-10 18:54:51','2026-07-10 18:54:51'),(3,'M.S. Dhoni','7777777777','Chennai, Maharashtra',1,'2026-07-10 18:55:11','2026-07-10 18:55:11'),(4,'Virat Kohli','7878787878',NULL,1,'2026-07-10 18:55:34','2026-07-10 19:13:05'),(5,'Mahesh Mote','9878766787','',1,'2026-07-10 23:25:04','2026-07-10 23:25:04');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farmer_payments`
--

DROP TABLE IF EXISTS `farmer_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farmer_payments` (
  `paymentId` int NOT NULL AUTO_INCREMENT,
  `farmerId` int NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `paymentDate` date NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `paymentMode` enum('CASH','UPI') DEFAULT 'CASH',
  `remarks` varchar(255) DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`paymentId`),
  KEY `fk_farmer_payment_farmer` (`farmerId`),
  KEY `fk_farmer_payment_user` (`createdBy`),
  CONSTRAINT `fk_farmer_payment_farmer` FOREIGN KEY (`farmerId`) REFERENCES `farmers` (`farmerId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_farmer_payment_user` FOREIGN KEY (`createdBy`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farmer_payments`
--

LOCK TABLES `farmer_payments` WRITE;
/*!40000 ALTER TABLE `farmer_payments` DISABLE KEYS */;
INSERT INTO `farmer_payments` VALUES (1,2,'2026-07-01','2026-07-15','2026-07-16',22.75,'UPI','Payment till 15 July',2,1,'2026-07-05 22:14:03','2026-07-05 22:14:03'),(2,1,'2026-06-01','2026-06-15','2026-07-16',466.38,'UPI','Payment till 15 July',2,1,'2026-07-05 22:15:09','2026-07-05 22:15:09'),(3,1,'2026-06-01','2026-07-15','2026-07-05',546.00,'UPI','Payment till 15 July',2,1,'2026-07-05 22:32:40','2026-07-05 22:32:40'),(4,4,'2026-07-01','2026-07-10','2026-07-10',500.50,'UPI',NULL,1,1,'2026-07-10 16:36:46','2026-07-10 16:36:46'),(5,1,'2026-06-01','2026-07-15','2026-07-11',68.25,'UPI',NULL,2,1,'2026-07-11 09:48:39','2026-07-11 09:48:39');
/*!40000 ALTER TABLE `farmer_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farmers`
--

DROP TABLE IF EXISTS `farmers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farmers` (
  `farmerId` int NOT NULL AUTO_INCREMENT,
  `farmerName` varchar(150) NOT NULL,
  `mobileNo` varchar(15) DEFAULT NULL,
  `address` text,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`farmerId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farmers`
--

LOCK TABLES `farmers` WRITE;
/*!40000 ALTER TABLE `farmers` DISABLE KEYS */;
INSERT INTO `farmers` VALUES (1,'Atharavya','8989898989','Saffron TCS',1,'2026-07-01 22:22:38','2026-07-10 12:47:06'),(2,'Nikhil','9999999989',NULL,1,'2026-07-01 22:23:04','2026-07-01 22:23:04'),(4,'Aaryan3','9993933989','sunbeam',1,'2026-07-01 22:35:03','2026-07-02 18:52:59'),(5,'Aaryan','9993999989',NULL,1,'2026-07-06 19:24:18','2026-07-11 22:13:22'),(6,'Nitin Patidar','7531594568','',1,'2026-07-10 12:32:46','2026-07-10 12:32:46'),(7,'Deep','4545454545','Deep Niwas',1,'2026-07-10 12:34:30','2026-07-10 12:34:30');
/*!40000 ALTER TABLE `farmers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milk_purchase`
--

DROP TABLE IF EXISTS `milk_purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milk_purchase` (
  `purchaseId` int NOT NULL AUTO_INCREMENT,
  `farmerId` int NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `rateId` int NOT NULL,
  `totalAmount` decimal(12,2) NOT NULL,
  `paymentId` int DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`purchaseId`),
  KEY `fk_purchase_farmer` (`farmerId`),
  KEY `fk_purchase_rate` (`rateId`),
  KEY `fk_purchase_user` (`createdBy`),
  KEY `fk_purchase_payment` (`paymentId`),
  CONSTRAINT `fk_purchase_farmer` FOREIGN KEY (`farmerId`) REFERENCES `farmers` (`farmerId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_purchase_payment` FOREIGN KEY (`paymentId`) REFERENCES `farmer_payments` (`paymentId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_purchase_rate` FOREIGN KEY (`rateId`) REFERENCES `milk_rates` (`rateId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_purchase_user` FOREIGN KEY (`createdBy`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milk_purchase`
--

LOCK TABLES `milk_purchase` WRITE;
/*!40000 ALTER TABLE `milk_purchase` DISABLE KEYS */;
INSERT INTO `milk_purchase` VALUES (1,1,10.25,1,466.38,2,'Evening milk',5,1,'2026-06-05 15:15:55','2026-07-05 22:15:09'),(2,1,12.00,1,546.00,3,'Morning milk',5,1,'2026-07-05 15:16:38','2026-07-05 22:32:40'),(3,2,0.50,1,22.75,1,'Morning milk',5,1,'2026-07-05 15:17:12','2026-07-05 22:14:03'),(4,4,5.50,1,250.25,4,'Morning milk',5,1,'2026-07-05 15:17:22','2026-07-10 16:36:46'),(5,4,5.50,1,250.25,4,'Morning milk',5,1,'2026-07-09 22:56:17','2026-07-10 16:36:46'),(6,1,1.50,1,68.25,5,'Morning Milk',1,1,'2026-07-10 13:18:59','2026-07-11 09:48:39'),(7,7,10.00,1,455.00,NULL,NULL,1,1,'2026-07-10 13:20:27','2026-07-10 13:20:27'),(8,4,5.50,1,250.25,NULL,'Morning milk',5,1,'2026-07-11 09:50:36','2026-07-11 09:50:36'),(9,1,2.00,1,91.00,NULL,NULL,1,1,'2026-07-15 20:24:04','2026-07-15 20:24:04');
/*!40000 ALTER TABLE `milk_purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milk_rates`
--

DROP TABLE IF EXISTS `milk_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milk_rates` (
  `rateId` int NOT NULL AUTO_INCREMENT,
  `farmerRate` decimal(10,2) NOT NULL,
  `customerRate` decimal(10,2) NOT NULL,
  `effectiveFrom` date NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rateId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milk_rates`
--

LOCK TABLES `milk_rates` WRITE;
/*!40000 ALTER TABLE `milk_rates` DISABLE KEYS */;
INSERT INTO `milk_rates` VALUES (1,45.50,62.00,'2026-07-02','New milk rate from today',1,'2026-07-02 19:46:52','2026-07-02 19:49:53');
/*!40000 ALTER TABLE `milk_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milk_sells`
--

DROP TABLE IF EXISTS `milk_sells`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milk_sells` (
  `sellId` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `rateId` int NOT NULL,
  `totalAmount` decimal(12,2) NOT NULL,
  `paymentId` int DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`sellId`),
  KEY `fk_sales_customer` (`customerId`),
  KEY `fk_sales_rate` (`rateId`),
  KEY `fk_sales_user` (`createdBy`),
  KEY `fk_sales_payment` (`paymentId`),
  CONSTRAINT `fk_sales_customer` FOREIGN KEY (`customerId`) REFERENCES `customers` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_sales_payment` FOREIGN KEY (`paymentId`) REFERENCES `customer_payments` (`paymentId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_sales_rate` FOREIGN KEY (`rateId`) REFERENCES `milk_rates` (`rateId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_sales_user` FOREIGN KEY (`createdBy`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milk_sells`
--

LOCK TABLES `milk_sells` WRITE;
/*!40000 ALTER TABLE `milk_sells` DISABLE KEYS */;
INSERT INTO `milk_sells` VALUES (1,1,0.50,1,31.00,6,'Evening milk',5,1,'2026-07-10 19:06:39','2026-07-11 09:49:56'),(2,2,5.50,1,341.00,NULL,'Evening milk',5,1,'2026-07-10 19:07:49','2026-07-10 19:07:49'),(3,2,5.50,1,341.00,4,'Evening milk',5,1,'2026-07-09 19:07:53','2026-07-11 00:12:24'),(4,3,2.00,1,124.00,5,'Evening milk',5,1,'2026-07-10 19:08:02','2026-07-11 00:12:45'),(5,3,3.00,1,186.00,5,'Evening milk',5,1,'2026-07-10 19:08:09','2026-07-11 00:12:45'),(6,3,1.50,1,93.00,2,'Evening milk',5,1,'2026-07-09 19:08:19','2026-07-10 19:48:41'),(7,4,1.50,1,93.00,NULL,'Evening milk',5,1,'2026-07-10 19:08:23','2026-07-10 19:08:23'),(8,1,1.50,1,93.00,6,'Evening milk',5,1,'2026-07-10 19:12:50','2026-07-11 09:49:56'),(9,2,5.00,1,310.00,3,NULL,1,1,'2026-07-09 23:10:00','2026-07-11 00:11:22'),(10,3,2.00,1,124.00,5,NULL,1,1,'2026-07-10 23:10:05','2026-07-11 00:12:45'),(11,4,7.50,1,465.00,NULL,NULL,1,1,'2026-07-10 23:10:11','2026-07-10 23:10:11'),(12,1,1.50,1,93.00,NULL,'Evening milk',5,1,'2026-07-11 09:51:47','2026-07-11 09:51:47');
/*!40000 ALTER TABLE `milk_sells` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(150) NOT NULL,
  `mobileNo` varchar(15) DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'USER',
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Saurabh Kante','7878787878','saurabh@gmail.com','$2b$10$S0irEcltwfKSbDu/Evo3a.BKgWdCiVrA/cm66CDrA0olgG8.cgRH2','ADMIN',1,'2026-05-31 21:33:01','2026-07-09 15:08:32'),(2,'Sudhanshu D','8989898989','sudhanshu@gmail.com','$2b$10$2whbHdWKX.rv0rEZAop0b.Kn75RAtmz4kttJzlGtUIUaQmTHSQZj6','ADMIN',1,'2026-06-02 18:01:24','2026-06-03 18:52:48'),(5,'Pratik D','8989568989','pratik@gmail.com','$2b$10$WtvMXvxGvXf89fxDnWfLv.OPfcRB2eqYSJ94Fd.NsXQWGGKTKaA.i','USER',1,'2026-06-03 18:50:56','2026-07-09 23:56:16'),(9,'Mahadev Kante','7058642723','mahadev@gmail.com','$2b$10$e1mr6etPXcB4SFihCR/eb.ti6uzgvrkq9L7Ie2m.jn2uarvyLTv6m','USER',1,'2026-07-09 13:26:37','2026-07-09 13:26:37');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-17  9:52:26
