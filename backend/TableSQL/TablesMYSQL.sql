/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(250) COLLATE utf8_bin NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PostId` (`PostId`),
  KEY `UserId` (`UserId`),
<<<<<<< HEAD:backend/TableSQL/TablesSQL.sql
<<<<<<< HEAD:backend/TableSQL/TableSQL.sql
<<<<<<< HEAD
  CONSTRAINT `comments_ibfk_10` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_9` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

=======
  CONSTRAINT `comments_ibfk_27` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_28` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
=======
  CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
=======
  CONSTRAINT `comments_ibfk_7` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_8` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
>>>>>>> Messagerie:backend/TableSQL/TablesMYSQL.sql
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
>>>>>>> Messagerie:backend/TableSQL/TablesSQL.sql

DROP TABLE IF EXISTS `messagerie`;
CREATE TABLE `messagerie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contenu` varchar(250) COLLATE utf8_bin NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `expediteurId` int DEFAULT NULL,
  `destinataireId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `expediteurId` (`expediteurId`),
  KEY `destinataireId` (`destinataireId`),
  CONSTRAINT `messagerie_ibfk_1` FOREIGN KEY (`expediteurId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `messagerie_ibfk_2` FOREIGN KEY (`destinataireId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

<<<<<<< HEAD:backend/TableSQL/TableSQL.sql
>>>>>>> Messagerie
=======
DROP TABLE IF EXISTS `posts`;
>>>>>>> Messagerie:backend/TableSQL/TablesSQL.sql
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post` varchar(500) COLLATE utf8_bin NOT NULL DEFAULT '',
  `imagePath` varchar(250) COLLATE utf8_bin NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
<<<<<<< HEAD:backend/TableSQL/TableSQL.sql
<<<<<<< HEAD
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
=======
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
>>>>>>> Messagerie
=======
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
>>>>>>> Messagerie:backend/TableSQL/TablesSQL.sql

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(30) COLLATE utf8_bin NOT NULL DEFAULT '',
  `lastName` varchar(30) COLLATE utf8_bin NOT NULL DEFAULT '',
<<<<<<< HEAD
  `email` varchar(124) COLLATE utf8_bin NOT NULL DEFAULT '',
=======
  `email` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
>>>>>>> Messagerie
  `password` varchar(124) COLLATE utf8_bin NOT NULL DEFAULT '',
  `description` varchar(124) COLLATE utf8_bin DEFAULT '',
  `imagePath` varchar(250) COLLATE utf8_bin NOT NULL DEFAULT '',
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
<<<<<<< HEAD:backend/TableSQL/TablesSQL.sql
<<<<<<< HEAD:backend/TableSQL/TableSQL.sql
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
<<<<<<< HEAD
  UNIQUE KEY `email_5` (`email`)
=======
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`)
>>>>>>> Messagerie
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
=======
  UNIQUE KEY `email_2` (`email`)
=======
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`)
>>>>>>> Messagerie:backend/TableSQL/TablesMYSQL.sql
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
>>>>>>> Messagerie:backend/TableSQL/TablesSQL.sql

INSERT INTO `comments` (`id`, `comment`, `createdAt`, `updatedAt`, `PostId`, `UserId`) VALUES
(2, 'Génial ! :)', '2021-08-03 10:14:16', '2021-08-03 10:14:22', 2, 2);


<<<<<<< HEAD
=======


>>>>>>> Messagerie
INSERT INTO `posts` (`id`, `post`, `imagePath`, `createdAt`, `updatedAt`, `UserId`) VALUES
(2, 'Super mes vacanses à la mer !', '', '2021-08-03 10:13:34', '2021-08-03 10:13:34', 1);
INSERT INTO `posts` (`id`, `post`, `imagePath`, `createdAt`, `updatedAt`, `UserId`) VALUES
(3, 'Et tout le monde, qui à vu la Prison Break ? :)', '', '2021-08-03 10:14:44', '2021-08-03 10:14:44', 2);


INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `description`, `imagePath`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'Fernando', 'Sucre', 'fernando@groupomania.com', '$2b$10$yJkmLCQSgRBoW.r4fo7lNevu9XKBlA2izUn8z7aJ0xfNV3.EuNYDK', '', '', 0, '2021-08-03 10:12:40', '2021-08-03 10:12:40');
INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `description`, `imagePath`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(2, 'Scofield', 'Michael', 'michael@groupomania.com', '$2b$10$cht5yYbGyaYNhpBLVKOH3uUJmE3A8rUg4UaHoTUFsFCQJ.5G79xYS', '', '', 0, '2021-08-03 10:14:04', '2021-08-03 10:15:05');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;