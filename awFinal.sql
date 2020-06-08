-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.19 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para aw_pfinal
CREATE DATABASE IF NOT EXISTS `aw_pfinal` /*!40100 DEFAULT CHARACTER SET utf8mb4 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aw_pfinal`;

-- Volcando estructura para tabla aw_pfinal.libros
CREATE TABLE IF NOT EXISTS `libros` (
  `idLibro` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `resumen` varchar(255) DEFAULT NULL,
  `genero` varchar(255) DEFAULT NULL,
  `idioma` varchar(255) NOT NULL,
  `linkDescarga` varchar(255) DEFAULT 'dirección de descarga',
  `linkImagen` varchar(255) DEFAULT NULL,
  `unidades` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`idLibro`),
  UNIQUE KEY `compositeIndex` (`titulo`,`autor`,`idioma`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla aw_pfinal.libros: ~30 rows (aproximadamente)
DELETE FROM `libros`;
/*!40000 ALTER TABLE `libros` DISABLE KEYS */;
INSERT INTO `libros` (`idLibro`, `titulo`, `autor`, `resumen`, `genero`, `idioma`, `linkDescarga`, `linkImagen`, `unidades`) VALUES
	(1, 'El señor de los anillos: La comunidad del anillo', 'J.R.R Tolkien', '', 'Novela, Fantasia', 'Español', '', NULL, 2),
	(2, 'El señor de los anillos: Las dos torres', 'J.R.R Tolkien', '', 'Novela, Fantasia', 'Español', '', NULL, 1),
	(3, 'El señor de los anillos: El retorno del rey', 'J.R.R Tolkien', '', 'Novela, Fantasia', 'Español', '', NULL, 1),
	(4, 'El Cid Campeador', 'anonimo', '', 'Novela epica, fantasia', 'Español', '', '', 0),
	(6, 'El Cid Campeador', 'anonimo', '', 'Novela epica, fantasia', 'ingles', '', '', 0),
	(9, 'Cien años de soledad', 'Gabriel Garcia Márquez', '', 'Novela', 'Español', '', NULL, 0),
	(10, 'Luces de bohemia', 'Ramon del Valle-Inclían', '', 'Novela', 'Español', '', NULL, 0),
	(11, 'La casa de los espíritus', 'Isabel Allende', '', 'Novela', 'Español', '', NULL, 0),
	(12, 'Preludio a la fundación', 'Isaac Asimov', '', 'Ciencia Ficción', 'Español', '', NULL, 0),
	(13, 'Cumbres borrascosas', 'Emily Brontë', '', 'Novela', 'Español', '', NULL, 0),
	(14, 'El Buscón', 'Francisco de Quevedo', '', 'Sátira, Picaresca', 'Español', '', NULL, 0),
	(15, 'Drácula', 'Bram Stoker', '', 'Novela, Horror', 'Español', '', NULL, 0),
	(16, '1984', 'George Orwell', '', 'Ciencia Ficción', 'Español', '', NULL, 0),
	(17, 'El hobbit', 'J.R.R Tolkien', '', 'Fantasía', 'Español', '', NULL, 0),
	(18, 'La divina comedia', 'Dante Alighieri', '', 'Epopeya', 'Español', '', NULL, 0),
	(19, 'La colmena', 'Camilo Jose Cela', '', 'Novela', 'Español', '', NULL, 0),
	(20, 'Don Quijote de la mancha', 'Miguel de Cervantes', '', 'Novela, Cavallería', 'Español', '', NULL, 0),
	(21, 'Yo, Claudio', 'Robert Graves', '', 'Novela Historica', 'Español', '', NULL, 0),
	(22, 'El Guardán entre el centeno', 'J.D Stalinger', '', 'Novela, Juvenil', 'Español', '', NULL, 0),
	(23, 'La metamorfosis', 'Frank Kafka', '', 'Cuento', 'Español', '', NULL, 0),
	(24, 'Poesías completas', 'Antonio Machado', '', 'Poesía', 'Español', '', NULL, 0),
	(25, 'Fuenteovejuna', 'Lope de Vega', '', 'Teatro', 'Español', '', NULL, 0),
	(26, 'Madame Bovary', 'Flaubert', '', 'Novela, Ficción', 'Español', '', NULL, 0),
	(27, 'Fankenstein', 'Mary Shelley', '', 'Horror, Ciencia Ficción', 'Español', '', NULL, 0),
	(28, 'La Eneida', 'Virgilio', '', 'Epopeya, Épica', 'Español', '', NULL, 0),
	(29, 'La Iliada', 'Homero', '', 'Epopeya, Épica', 'Español', '', NULL, 0),
	(30, 'Hamlet', 'William Shakespeare', '', 'Tragedia, Darma', 'Español', '', NULL, 0),
	(31, 'El retrato de Dorian Gray', 'Óscar Wilde', '', 'Novela, Ficción', 'Español', '', NULL, 0),
	(32, 'Las mil y una noches', 'anonimo', '', 'Cuento', 'Español', '', NULL, 0),
	(33, 'La Odisea', 'Homero', '', 'Epica, Epopeya', '', '', NULL, 0);
/*!40000 ALTER TABLE `libros` ENABLE KEYS */;

-- Volcando estructura para tabla aw_pfinal.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `nombreUsuario` (`nombreUsuario`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `nombreUsuario_2` (`nombreUsuario`),
  UNIQUE KEY `email_2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla aw_pfinal.usuarios: ~10 rows (aproximadamente)
DELETE FROM `usuarios`;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`idUsuario`, `nombreUsuario`, `email`, `contrasena`) VALUES
	(1, 'DavidGlez', 'dgonzg09@estudiantes.unileon.es', '12345'),
	(2, 'DiegoGlez', 'diegoGonzalez@gmail.com', '1234'),
	(9, 'asdasdasd', 'adsasd@asdas.com', '12345'),
	(10, 'DavidGlez2', 'davidggleon2@gmail.com', '123456'),
	(12, 'DavidGlez22', 'davidggleon23@gmail.com', '12345'),
	(13, 'Diegoglexasd', 'diegoalsd@gmail.com', '12345'),
	(15, 'Diegoglexasd123', 'davidggleon123123@gmail.com', '12345'),
	(16, 'asdasdasdasd', '12354234@gmail.com', '12345'),
	(17, 'DavidGlez09', 'dgonzg0992@gmail.com', '12345'),
	(18, 'DavidGlez02', 'davidggleon02@gmail.com', '12345');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

-- Volcando estructura para tabla aw_pfinal.favoritos
CREATE TABLE IF NOT EXISTS `favoritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idLibro` int NOT NULL,
  `fecha` date NOT NULL,
  `comentario` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `compositeIndex` (`idUsuario`,`idLibro`),
  KEY `idLibro` (`idLibro`),
  CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`idLibro`) REFERENCES `libros` (`idLibro`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla aw_pfinal.favoritos: ~5 rows (aproximadamente)
DELETE FROM `favoritos`;
/*!40000 ALTER TABLE `favoritos` DISABLE KEYS */;
INSERT INTO `favoritos` (`id`, `idUsuario`, `idLibro`, `fecha`, `comentario`) VALUES
	(15, 2, 4, '2020-06-04', 'Hola amigos'),
	(31, 1, 1, '2020-06-05', 'Muy malo'),
	(33, 1, 2, '2020-06-05', NULL),
	(34, 1, 6, '2020-06-05', NULL),
	(35, 18, 6, '2020-06-07', NULL);
/*!40000 ALTER TABLE `favoritos` ENABLE KEYS */;

-- Volcando estructura para tabla aw_pfinal.leidos
CREATE TABLE IF NOT EXISTS `leidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idLibro` int NOT NULL,
  `fecha` date NOT NULL,
  `comentario` varchar(255) DEFAULT NULL,
  `nota` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `compositeIndex` (`idUsuario`,`idLibro`),
  KEY `idLibro` (`idLibro`),
  CONSTRAINT `leidos_ibfk_3` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `leidos_ibfk_4` FOREIGN KEY (`idLibro`) REFERENCES `libros` (`idLibro`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla aw_pfinal.leidos: ~12 rows (aproximadamente)
DELETE FROM `leidos`;
/*!40000 ALTER TABLE `leidos` DISABLE KEYS */;
INSERT INTO `leidos` (`id`, `idUsuario`, `idLibro`, `fecha`, `comentario`, `nota`) VALUES
	(70, 1, 1, '2020-06-05', NULL, 0),
	(79, 18, 1, '2020-06-07', 'Hola', 0),
	(80, 18, 2, '2020-06-07', NULL, 0),
	(81, 18, 3, '2020-06-07', NULL, 0),
	(82, 18, 4, '2020-06-07', NULL, 0),
	(83, 18, 10, '2020-06-07', NULL, 0),
	(84, 18, 12, '2020-06-07', NULL, 0),
	(85, 18, 13, '2020-06-07', NULL, 0),
	(87, 1, 2, '2020-06-08', NULL, 0),
	(88, 1, 3, '2020-06-08', NULL, 0),
	(89, 1, 4, '2020-06-08', NULL, 0),
	(90, 1, 9, '2020-06-08', NULL, 0);
/*!40000 ALTER TABLE `leidos` ENABLE KEYS */;



-- Volcando estructura para tabla aw_pfinal.lista
CREATE TABLE IF NOT EXISTS `lista` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idLibro` int NOT NULL,
  `fecha` date NOT NULL,
  `comentario` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `compositeIndex` (`idUsuario`,`idLibro`),
  KEY `idLibro` (`idLibro`),
  CONSTRAINT `lista_ibfk_3` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lista_ibfk_4` FOREIGN KEY (`idLibro`) REFERENCES `libros` (`idLibro`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla aw_pfinal.lista: ~4 rows (aproximadamente)
DELETE FROM `lista`;
/*!40000 ALTER TABLE `lista` DISABLE KEYS */;
INSERT INTO `lista` (`id`, `idUsuario`, `idLibro`, `fecha`, `comentario`) VALUES
	(3, 2, 3, '2020-05-29', NULL),
	(44, 1, 6, '2020-06-05', NULL),
	(45, 18, 6, '2020-06-07', NULL),
	(47, 1, 11, '2020-06-08', NULL);
/*!40000 ALTER TABLE `lista` ENABLE KEYS */;



/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
