/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

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
  CONSTRAINT `comments_ibfk_10` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_9` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(30) COLLATE utf8_bin NOT NULL DEFAULT '',
  `lastName` varchar(30) COLLATE utf8_bin NOT NULL DEFAULT '',
  `email` varchar(124) COLLATE utf8_bin NOT NULL DEFAULT '',
  `password` varchar(124) COLLATE utf8_bin NOT NULL DEFAULT '',
  `description` varchar(124) COLLATE utf8_bin DEFAULT '',
  `imagePath` varchar(250) COLLATE utf8_bin NOT NULL DEFAULT '',
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

INSERT INTO `comments` (`id`, `comment`, `createdAt`, `updatedAt`, `PostId`, `UserId`) VALUES
(1, 'Génial ! :)', '2021-08-02 16:10:12', '2021-08-02 16:10:12', 1, 2);


INSERT INTO `posts` (`id`, `post`, `imagePath`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 'De super vacanses à la mer !', '', '2021-08-02 16:09:47', '2021-08-02 16:09:47', 1);
INSERT INTO `posts` (`id`, `post`, `imagePath`, `createdAt`, `updatedAt`, `UserId`) VALUES
(2, 'Et tout le monde, vous avez vu Prison Break ?', '', '2021-08-02 16:11:47', '2021-08-02 16:11:47', 2);


INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `description`, `imagePath`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'Fernando', 'Sucre', 'fernando@groupomania.com', '$2b$10$hokOqGCO9O3ubNAF7bWjQOd/XRlHRd34r8D/h7/WFnfWlz/dMMmgS', '', '', 0, '2021-08-02 16:07:32', '2021-08-02 16:07:32');
INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `description`, `imagePath`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(2, 'Scofield', 'Michael', 'michael@groupomania.com', '$2b$10$9Ztkk9QyoPxr4ZzVpmddkuejp00fdxk1B2uRjEGj76RZjR.1QOO9C', '', '', 0, '2021-08-02 16:08:29', '2021-08-02 16:12:22');
INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `description`, `imagePath`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(3, 'Lincoln', 'Burrows', 'superburrows@groupomania.com', '$2b$10$AZyB7XGeoc2lvrMfZNBsY.8h6GmmFMoxfghPb77GRkO9rb2Eb37SW', '', '', 0, '2021-08-02 16:09:08', '2021-08-02 16:09:08');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;