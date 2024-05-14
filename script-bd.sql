-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS finanzas_app;

-- Usar la base de datos
USE finanzas_app;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    nombre_usuario VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    contrasena VARCHAR(100) NOT NULL
);

-- Tabla de ingresos
CREATE TABLE IF NOT EXISTS ingresos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    concepto VARCHAR(100) NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de gastos fijos
CREATE TABLE IF NOT EXISTS gastos_fijos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    concepto VARCHAR(100) NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de gastos variables
CREATE TABLE IF NOT EXISTS gastos_variables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    concepto VARCHAR(100) NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

Insert into usuarios (nombre,apellido,nombre_usuario,correo,contrasena) values ('Felix','Alanis','felix','felix@gmail.com','12');
