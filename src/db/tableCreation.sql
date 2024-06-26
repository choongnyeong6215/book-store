-- users
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(45) NOT NULL,
  `salt` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


-- books
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `img` int DEFAULT NULL,
  `category_id` int NOT NULL,
  `form` varchar(45) NOT NULL,
  `isbn` varchar(45) NOT NULL,
  `summary` varchar(500) DEFAULT NULL,
  `detail` longtext,
  `author` varchar(45) DEFAULT NULL,
  `pages` int NOT NULL,
  `contents` longtext,
  `price` int NOT NULL,
  `pub_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `isbn_UNIQUE` (`isbn`),
  KEY `fk_categories_books_category_id_idx` (`category_id`),
  CONSTRAINT `fk_categories_books_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


-- categories
CREATE TABLE `categories` (
  `category_id` int NOT NULL,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


-- likes
CREATE TABLE `likes` (
  `user_id` int NOT NULL,
  `liked_book_id` int NOT NULL,
  KEY `fk_users_likes_user_id_idx` (`user_id`),
  KEY `fk_books_likes_liked_book_id_idx` (`liked_book_id`),
  CONSTRAINT `fk_books_likes_liked_book_id` FOREIGN KEY (`liked_book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `fk_users_likes_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


-- cartItems
CREATE TABLE `cartItems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_users_cartItems_user_id_idx` (`user_id`),
  KEY `fk_books_cartItems_book_id_idx` (`book_id`),
  CONSTRAINT `fk_books_cartItems_book_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `fk_users_cartItems_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


-- deliveries
CREATE TABLE `deliveries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `receiver` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- orders
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_title` varchar(255) NOT NULL,
  `total_price` int NOT NULL,
  `total_quantity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `delivery_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_orders_user_id_idx` (`user_id`),
  KEY `fk_deliveries_orders_delivery_id_idx` (`delivery_id`),
  CONSTRAINT `fk_deliveries_orders_delivery_id` FOREIGN KEY (`delivery_id`) REFERENCES `deliveries` (`id`),
  CONSTRAINT `fk_users_orders_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


-- orderedBook
CREATE TABLE `orderedBook` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `book_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orders_orderedBook_order_id_idx` (`order_id`),
  KEY `fk_books_orderedBook_book_id_idx` (`book_id`),
  CONSTRAINT `fk_books_orderedBook_book_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `fk_orders_orderedBook_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci