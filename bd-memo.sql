-- --------------------------------------------------------
-- Host:                         172.16.20.30
-- Versión del servidor:         10.11.6-MariaDB-0+deb12u1 - Debian 12
-- SO del servidor:              debian-linux-gnu
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para GestionMemo
CREATE DATABASE IF NOT EXISTS `GestionMemo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `GestionMemo`;

-- Volcando estructura para tabla GestionMemo.funciones
CREATE TABLE IF NOT EXISTS `funciones` (
  `idFuncion` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) DEFAULT '0',
  PRIMARY KEY (`idFuncion`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla GestionMemo.gruposfunciones
CREATE TABLE IF NOT EXISTS `gruposfunciones` (
  `idGruposFunciones` int(11) NOT NULL AUTO_INCREMENT,
  `idGrupo` int(11) DEFAULT NULL,
  `idFunciones` int(11) DEFAULT NULL,
  `ver` varchar(50) NOT NULL DEFAULT '',
  `insertar` varchar(50) NOT NULL DEFAULT '',
  `modificar` varchar(50) NOT NULL DEFAULT '',
  `borrar` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`idGruposFunciones`) USING BTREE,
  KEY `IdGrupo` (`idGrupo`) USING BTREE,
  KEY `FK_GruposFunciones_Funciones` (`idFunciones`) USING BTREE,
  CONSTRAINT `FK_GruposFunciones_Funciones` FOREIGN KEY (`idFunciones`) REFERENCES `funciones` (`idFuncion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_GruposFunciones_GrupoUsuario` FOREIGN KEY (`idGrupo`) REFERENCES `gruposusuarios` (`idGrupo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla GestionMemo.gruposusuarios
CREATE TABLE IF NOT EXISTS `gruposusuarios` (
  `idGrupo` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`idGrupo`) USING BTREE,
  KEY `Descripcion` (`descripcion`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla GestionMemo.mensajes
CREATE TABLE IF NOT EXISTS `mensajes` (
  `idMensajes` int(11) NOT NULL AUTO_INCREMENT,
  `emisor` int(11) DEFAULT NULL,
  `receptor` int(11) DEFAULT NULL,
  `mensaje` varchar(500) NOT NULL,
  `estadoLeido` tinyint(4) NOT NULL DEFAULT 0,
  `estadoFavorito` tinyint(4) NOT NULL DEFAULT 0,
  `estadoPapelera` tinyint(4) NOT NULL DEFAULT 0,
  `estadoEnviado` varchar(50) DEFAULT NULL,
  `estadoRecibido` varchar(50) DEFAULT NULL,
  `papeleraEmisor` tinyint(4) NOT NULL DEFAULT 0,
  `favoritoEmisor` tinyint(4) NOT NULL DEFAULT 0,
  `favoritoReceptor` tinyint(4) NOT NULL DEFAULT 0,
  `papeleraReceptor` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idMensajes`),
  KEY `FK_mensajes_usuarios` (`receptor`),
  KEY `FK_mensajes_usuarios_2` (`emisor`),
  CONSTRAINT `FK_mensajes_usuarios` FOREIGN KEY (`receptor`) REFERENCES `usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_mensajes_usuarios_2` FOREIGN KEY (`emisor`) REFERENCES `usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla GestionMemo.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuarios` int(11) NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `clave` varchar(50) NOT NULL,
  `idGrupo` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUsuarios`) USING BTREE,
  KEY `Fk` (`idGrupo`) USING BTREE,
  CONSTRAINT `Fk` FOREIGN KEY (`idGrupo`) REFERENCES `gruposusuarios` (`idGrupo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
