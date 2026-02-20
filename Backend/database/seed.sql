-- ===========================================
-- IBERO - Gestor de Datos del Docente
-- Script de datos iniciales (Seed)
-- SQL Server
-- ===========================================

-- USE IBERO_GDD;
-- GO

-- ===========================================
-- Usuarios Portal
-- Las contraseñas deben ser hasheadas con bcrypt antes de insertar
-- ===========================================
-- NOTA: Los hashes se generan al ejecutar el endpoint POST /api/auth/seed
-- Reemplazar '$HASH_PLACEHOLDER' con hashes bcrypt reales

-- ===========================================
-- Datos Generales (ejemplo)
-- ===========================================
INSERT INTO datos_generales (nombres, apellido_paterno, apellido_materno, fecha_nacimiento, edad, correo_electronico, puesto_institucion, resumen_profesional) VALUES
('Ana', 'Martínez', 'López', '1980-03-15', 45, 'a.martinez@ibero.mx', 'Profesora de Tiempo Completo', 'Doctora en Ingeniería con más de 15 años de experiencia en docencia e investigación.'),
('Sergio', 'Rodríguez', 'Hernández', '1975-07-22', 50, 's.rodriguez@ibero.mx', 'Coordinador Académico', 'Maestro en Administración con experiencia en gestión académica y proyectos de vinculación.'),
('Juan', 'Ramos', 'García', '1985-11-10', 40, 'j.ramos@ibero.mx', 'Profesor de Asignatura', 'Ingeniero en Sistemas con especialidad en desarrollo de software y bases de datos.');
