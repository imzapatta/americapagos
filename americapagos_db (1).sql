-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 16-11-2017 a las 15:46:25
-- Versión del servidor: 5.7.19
-- Versión de PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `americapagos_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_movimientos`
--

DROP TABLE IF EXISTS `tbl_movimientos`;
CREATE TABLE IF NOT EXISTS `tbl_movimientos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_movimiento` int(11) NOT NULL,
  `usuario_emisor` int(11) NOT NULL,
  `usuario_receptor` int(11) NOT NULL,
  `monto` int(11) NOT NULL,
  `referencia` varchar(350) NOT NULL,
  `fecha` datetime NOT NULL,
  `mensaje` varchar(240) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_movimientos_id_uindex` (`id`),
  UNIQUE KEY `tbl_movimientos_usuario_emisor_uindex` (`usuario_emisor`),
  UNIQUE KEY `tbl_movimientos_usuario_receptor_uindex` (`usuario_receptor`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_movimientos`
--

INSERT INTO `tbl_movimientos` (`id`, `tipo_movimiento`, `usuario_emisor`, `usuario_receptor`, `monto`, `referencia`, `fecha`, `mensaje`) VALUES
(1, 1, 30, 30, 500, 'hjhghjhjghg', '2017-11-17 09:06:28', 'Hola');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tipo_movimiento`
--

DROP TABLE IF EXISTS `tbl_tipo_movimiento`;
CREATE TABLE IF NOT EXISTS `tbl_tipo_movimiento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_tipo_movimiento_id_uindex` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_tipo_movimiento`
--

INSERT INTO `tbl_tipo_movimiento` (`id`, `nombre`) VALUES
(1, 'Pago de Servicio'),
(2, 'Envio de Dinero'),
(3, 'Compra de Producto'),
(4, 'Otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuarios`
--

DROP TABLE IF EXISTS `tbl_usuarios`;
CREATE TABLE IF NOT EXISTS `tbl_usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(350) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `fecha_nacimiento` datetime DEFAULT NULL,
  `monto` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_usuarios_id_uindex` (`id`),
  UNIQUE KEY `tbl_usuarios_email_uindex` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_usuarios`
--

INSERT INTO `tbl_usuarios` (`id`, `nombre`, `email`, `username`, `password`, `foto`, `fecha_nacimiento`, `monto`) VALUES
(30, 'Roberto Arturo Zapata Calidonio', 'imzapatta@gmail.com', 'imzapatta', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '/img/profile/goku.jpg', '1995-10-28 02:12:18', 1500);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
