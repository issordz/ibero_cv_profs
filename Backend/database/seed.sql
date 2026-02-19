-- ===========================================
-- IBERO - Gestor de Datos del Docente
-- Script de datos iniciales (Seed)
-- SQL Server
-- ===========================================

-- USE IBERO_GDD;
-- GO

-- ===========================================
-- Departamentos
-- ===========================================
INSERT INTO Departamentos (nombre) VALUES
('Administración'),
('Ingeniería'),
('Artes y Humanidades'),
('Negocios'),
('Ciencias de la Salud'),
('Derecho'),
('Ciencias'),
('Psicología'),
('Arquitectura');

-- ===========================================
-- Usuarios
-- Las contraseñas están hasheadas con bcrypt (valor original: admin123 / docente123)
-- Reemplazar con hashes reales al ejecutar
-- ===========================================
-- NOTA: Los hashes se generan al ejecutar el endpoint POST /api/auth/seed
-- Por ahora insertamos placeholders que el seed programático reemplazará

-- ===========================================
-- Docentes (se insertan vía seed programático)
-- ===========================================
-- Ver archivo src/seed.js para la inserción programática completa
