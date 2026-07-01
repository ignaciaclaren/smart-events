-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 01-07-2026 a las 05:10:31
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `web`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Evento`
--

CREATE TABLE `Evento` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `valor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Evento`
--

INSERT INTO `Evento` (`id`, `titulo`, `fecha`, `lugar`, `imagen`, `valor`) VALUES
(28, 'NEGOCIACIONES DE PAZ', '2026-07-25', 'NABOO', '/uploads/1782870831558_naboo.jpg', 28000),
(29, 'REUNIÓN DEL CONSEJO JEDI', '2026-11-12', 'TEMPLO JEDI, CORUSCANT', '/uploads/1782870910509_consejoJeid.webp', 50000),
(31, 'CARRERA DE PODS', '2026-07-17', 'MOS ESPA, TATOOINE', '/uploads/1782871135084_Mos_Espa_Grand_Arena.webp', 3500),
(32, 'CEREMONIA DE ASCENSO A CABALLERO JEDI', '2026-08-18', 'TEMPLO JEDI, CORUSCANT', '/uploads/1782871373060_JediTemple-Deceived.webp', 2500),
(33, 'FESTIVAL DE LA VICTORIA DE NABOO', '2026-07-23', 'THEED, NABOO', '/uploads/1782871673078_Theed.webp', 3000),
(34, 'SESIÓN DEL SENADO GALÁCTICO', '2026-12-30', 'SENADO GALÁCTICO, CORUSCANT', '/uploads/1782871737816_consejoGalactico.avif', 1000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Inscrito`
--

CREATE TABLE `Inscrito` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `eventoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Inscrito`
--

INSERT INTO `Inscrito` (`id`, `email`, `nombre`, `apellido`, `eventoId`) VALUES
(31, 'elElegido@gmail.com', 'Anakin', 'Skywalker', 32),
(32, 'elElegido@gmail.com', 'Anakin', 'Skywalker', 31),
(33, 'elElegido@gmail.com', 'Anakin', 'Skywalker', 33),
(34, 'thequeen@gmail.com', 'Padmé', 'Amidala', 28),
(35, 'thequeen@gmail.com', 'Padmé', 'Amidala', 33),
(36, 'lafuerzaconmigo@gmailcom', 'Maestro', 'Yoda', 29),
(37, 'lafuerzaconmigo@gmailcom', 'Maestro', 'Yoda', 32),
(38, 'lafuerzaconmigo@gmailcom', 'Maestro', 'Yoda', 33),
(39, 'oro@gmail.com', 'C-3PO', 'Droid', 33),
(40, 'snips@gmail.com', 'Ahsoka', 'Tano', 32),
(41, 'Organa@gmail.com', 'Bail', 'Organa', 28),
(42, 'elcansiller@gmail.com', 'Palpatine', 'Palpatine', 34),
(43, 'thequeen@gmail.com', 'Padmé', 'Amidala', 34),
(44, 'thequeen@gmail.com', 'Padmé', 'Amidala', 31),
(45, 'Organa@gmail.com', 'Bail', 'Organa', 34),
(46, 'obi@gmail.com', 'Obi-wan', 'Kenobi', 29),
(47, 'joaquin.claren@gmail.com', 'joaquin', 'claren', 29),
(48, 'masnknsa', 'joaquin', 'claren', 34);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Usuario` (
  `email` varchar(100) NOT NULL,
  `password` varchar(64) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `rol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Usuario`
--

INSERT INTO `Usuario` (`email`, `password`, `nombre`, `apellido`, `rol`) VALUES
('ELMORADO@GMAIL.COM', '$2b$12$Yr9VFd7kk/a4bsXn.7DRLe5Bfcl4X3meMYcNWhz85ALt3cjVaAVM2', 'MACE', 'WINDU', 'staff'),
('LAFUERZACONMIGO@GMAIL.COM', '$2b$12$djr/kPCR.67uSL1HmoYhZu4qwGUILU3fmtpl6SZt7if/y9.PIBghu', 'MAESTRO', 'YODA', 'staff'),
('OBI@GMAIL.COM', '$2b$12$TsLW/IYzs15lKv0ihO8zr.rMAcNEJGV56hJf2mq2OPOPgHSeIXAKy', 'OBI-WAN', 'KENOBI', 'staff');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Evento`
--
ALTER TABLE `Evento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Inscrito`
--
ALTER TABLE `Inscrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Inscrito_email_fkey` (`email`),
  ADD KEY `Inscrito_eventoId_fkey` (`eventoId`);

--
-- Indices de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Evento`
--
ALTER TABLE `Evento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `Inscrito`
--
ALTER TABLE `Inscrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Inscrito`
--
ALTER TABLE `Inscrito`
  ADD CONSTRAINT `Inscrito_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
