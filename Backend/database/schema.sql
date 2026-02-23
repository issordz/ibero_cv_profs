-- ===========================================
-- IBERO - Gestor de Datos del Docente
-- Script de creación de Base de Datos
-- SQL Server
-- ===========================================

-- Crear base de datos (ejecutar por separado si es necesario)
-- CREATE DATABASE IBERO_GDD;
-- GO
-- USE IBERO_GDD;
-- GO

-- ===========================================
-- TABLA: Catálogo de Instituciones
-- ===========================================
CREATE TABLE catalogo_instituciones (
    id_institucion          INT IDENTITY(1,1) PRIMARY KEY,
    nombre_institucion      NVARCHAR(300) NOT NULL,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Datos Generales (registro único por profesor)
-- ===========================================
CREATE TABLE datos_generales (
    id_profesor             INT IDENTITY(1,1) PRIMARY KEY,
    nombres                 NVARCHAR(200) NOT NULL,
    apellido_paterno        NVARCHAR(200) NOT NULL,
    apellido_materno        NVARCHAR(200),
    fecha_nacimiento        DATE,
    puesto_institucion      NVARCHAR(200),
    resumen_profesional     NVARCHAR(MAX),
    activo                  BIT DEFAULT 1,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Gestión de Usuarios (login del sistema)
-- ===========================================
CREATE TABLE gestion_usuarios (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             INT REFERENCES datos_generales(id_profesor),
    correo                  NVARCHAR(150) NOT NULL UNIQUE,
    password                NVARCHAR(255) NOT NULL,
    activo                  BIT DEFAULT 1,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Estudios Académicos (N por profesor)
-- ===========================================
CREATE TABLE estudios_academicos (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             INT NOT NULL REFERENCES datos_generales(id_profesor) ON DELETE CASCADE,
    nivel_estudio           NVARCHAR(100),
    titulo_estudio          NVARCHAR(300) NOT NULL,
    id_institucion          INT REFERENCES catalogo_instituciones(id_institucion),
    pais                    NVARCHAR(100),
    anio_obtencion          INT,
    cedula                  NVARCHAR(100),
    activo                  BIT DEFAULT 1,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Capacitación / Actualización Docente (N por profesor)
-- ===========================================
CREATE TABLE capacitacion_actualizacion (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             INT NOT NULL REFERENCES datos_generales(id_profesor) ON DELETE CASCADE,
    nombre_capacitacion     NVARCHAR(300),
    tipo_capacitacion       NVARCHAR(200),
    id_institucion          INT REFERENCES catalogo_instituciones(id_institucion),
    pais                    NVARCHAR(100),
    anio_obtencion          INT,
    horas                   INT,
    tip_tipo_curso          NVARCHAR(100),
    vigencia                NVARCHAR(100),
    activo                  BIT DEFAULT 1,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Experiencia Laboral (N por profesor)
-- ===========================================
CREATE TABLE experiencia_laboral (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             INT NOT NULL REFERENCES datos_generales(id_profesor) ON DELETE CASCADE,
    actividad_puesto        NVARCHAR(300) NOT NULL,
    id_institucion          INT REFERENCES catalogo_instituciones(id_institucion),
    inicio_mes_anio         NVARCHAR(50),
    fin_mes_anio            NVARCHAR(50),
    tipo_experiencia        NVARCHAR(100),
    nivel_experiencia       NVARCHAR(100),
    activo                  BIT DEFAULT 1,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Productos Académicos (N por profesor)
-- ===========================================
CREATE TABLE productos_academicos (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             INT NOT NULL REFERENCES datos_generales(id_profesor) ON DELETE CASCADE,
    id_publicacion          NVARCHAR(100),
    descripcion_publicacion NVARCHAR(MAX),
    id_institucion          INT REFERENCES catalogo_instituciones(id_institucion),
    anio_producto           INT,
    activo                  BIT DEFAULT 1,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Logros Profesionales - No Académicos (N por profesor)
-- ===========================================
CREATE TABLE logros_profesionales (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             INT NOT NULL REFERENCES datos_generales(id_profesor) ON DELETE CASCADE,
    desc_logro              NVARCHAR(MAX) NOT NULL,
    id_institucion          INT REFERENCES catalogo_instituciones(id_institucion),
    anio_obtencion          INT,
    activo                  BIT DEFAULT 1,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Membresía / Organismos profesionales (N por profesor)
-- ===========================================
CREATE TABLE organismos (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             INT NOT NULL REFERENCES datos_generales(id_profesor) ON DELETE CASCADE,
    id_institucion          INT REFERENCES catalogo_instituciones(id_institucion),
    anio_inicio             INT,
    anio_fin                INT,
    nivel_experiencia       NVARCHAR(100),
    activo                  BIT DEFAULT 1,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Premios, Distinciones o Reconocimientos (N por profesor)
-- ===========================================
CREATE TABLE premios_distinciones (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             INT NOT NULL REFERENCES datos_generales(id_profesor) ON DELETE CASCADE,
    desc_premio             NVARCHAR(MAX) NOT NULL,
    id_institucion          INT REFERENCES catalogo_instituciones(id_institucion),
    anio_obtencion          INT,
    activo                  BIT DEFAULT 1,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- ÍNDICES
-- ===========================================
CREATE INDEX IX_EstudiosAcademicos_IdProfesor ON estudios_academicos(id_profesor);
CREATE INDEX IX_CapacitacionActualizacion_IdProfesor ON capacitacion_actualizacion(id_profesor);
CREATE INDEX IX_ExperienciaLaboral_IdProfesor ON experiencia_laboral(id_profesor);
CREATE INDEX IX_ProductosAcademicos_IdProfesor ON productos_academicos(id_profesor);
CREATE INDEX IX_LogrosProfesionales_IdProfesor ON logros_profesionales(id_profesor);
CREATE INDEX IX_Organismos_IdProfesor ON organismos(id_profesor);
CREATE INDEX IX_PremiosDistinciones_IdProfesor ON premios_distinciones(id_profesor);
