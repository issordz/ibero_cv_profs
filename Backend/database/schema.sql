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

-- ///////////////////////////////////////////
-- TABLAS CATÁLOGO
-- ///////////////////////////////////////////

-- ===========================================
-- CATÁLOGO: Instituciones (empresas, organismos generales)
-- ===========================================
CREATE TABLE catalogo_instituciones (
    id_institucion          INT IDENTITY(1,1) PRIMARY KEY,
    nombre_institucion      NVARCHAR(300) NOT NULL,
    activo                  TINYINT DEFAULT 1,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- CATÁLOGO: Instituciones Educativas
-- ===========================================
CREATE TABLE catalogo_instituciones_educativas (
    id_institucion_educativa INT IDENTITY(1,1) PRIMARY KEY,
    nombre_institucion      NVARCHAR(300) NOT NULL,
    activo                  TINYINT DEFAULT 1,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- CATÁLOGO: Nivel de Estudio
-- ===========================================
CREATE TABLE catalogo_nivel_estudio (
    id_nivel_estudio        INT IDENTITY(1,1) PRIMARY KEY,
    desc_nivel_estudio      NVARCHAR(200) NOT NULL,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- CATÁLOGO: Carreras
-- ===========================================
CREATE TABLE catalogo_carreras (
    id_carrera              INT IDENTITY(1,1) PRIMARY KEY,
    nombre_carrera          NVARCHAR(300) NOT NULL,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- CATÁLOGO: Países
-- ===========================================
CREATE TABLE catalogo_paises (
    id_pais                 INT IDENTITY(1,1) PRIMARY KEY,
    nombre_pais             NVARCHAR(150) NOT NULL,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- CATÁLOGO: Tipo de Curso
-- ===========================================
CREATE TABLE catalogo_tipo_curso (
    id_tipo_curso           INT IDENTITY(1,1) PRIMARY KEY,
    desc_tipo_curso         NVARCHAR(200) NOT NULL,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- CATÁLOGO: Tipo de Capacitación
-- ===========================================
CREATE TABLE catalogo_capacitacion (
    id_tipo_capacitacion    INT IDENTITY(1,1) PRIMARY KEY,
    desc_tipo_capacitacion  NVARCHAR(200) NOT NULL,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- CATÁLOGO: Tipo de Experiencia Laboral
-- ===========================================
CREATE TABLE catalogo_experiencia_laboral (
    id_tipo_experiencia     INT IDENTITY(1,1) PRIMARY KEY,
    desc_tipo_experiencia   NVARCHAR(200) NOT NULL,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- CATÁLOGO: Organismos
-- ===========================================
CREATE TABLE catalogo_organismos (
    id_organismo            INT IDENTITY(1,1) PRIMARY KEY,
    nombre_organismo        NVARCHAR(300) NOT NULL,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- CATÁLOGO: Puesto Institucional
-- ===========================================
CREATE TABLE catalogo_puesto_institucional (
    id_puesto               INT IDENTITY(1,1) PRIMARY KEY,
    desc_puesto             NVARCHAR(200) NOT NULL,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ///////////////////////////////////////////
-- TABLAS PRINCIPALES
-- ///////////////////////////////////////////

-- ===========================================
-- TABLA: Datos Generales (registro único por profesor)
-- ===========================================
CREATE TABLE datos_generales (
    id_profesor             VARCHAR(10) NOT NULL PRIMARY KEY,
    nombres                 NVARCHAR(100) NOT NULL,
    apellido_paterno        NVARCHAR(100) NOT NULL,
    apellido_materno        NVARCHAR(100),
    fecha_de_nacimiento     DATE,
    id_puesto              INT REFERENCES catalogo_puesto_institucional(id_puesto),
    resumen_profesional     NVARCHAR(MAX),
    activo                  TINYINT DEFAULT 1,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Gestión de Usuarios (login del sistema)
-- ===========================================
CREATE TABLE gestion_usuarios (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             VARCHAR(10) REFERENCES datos_generales(id_profesor),
    correo                  NVARCHAR(200) NOT NULL UNIQUE,
    contrasena              NVARCHAR(255) NOT NULL,
    rol                     NVARCHAR(50) NOT NULL DEFAULT 'professor',
    activo                  TINYINT DEFAULT 1,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Estudios Académicos (N por profesor)
-- ===========================================
CREATE TABLE estudios_academicos (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             VARCHAR(10) NOT NULL REFERENCES datos_generales(id_profesor) ON DELETE CASCADE,
    id_nivel_estudio        INT REFERENCES catalogo_nivel_estudio(id_nivel_estudio),
    titulo_estudio          NVARCHAR(300) NOT NULL,
    id_institucion_educativa INT REFERENCES catalogo_instituciones_educativas(id_institucion_educativa),
    id_pais                 INT REFERENCES catalogo_paises(id_pais),
    anio_obtencion          INT,
    cedula                  NVARCHAR(50),
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Capacitación / Actualización Docente (N por profesor)
-- ===========================================
CREATE TABLE capacitacion_actualizacion (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             VARCHAR(10) NOT NULL REFERENCES datos_generales(id_profesor) ON DELETE CASCADE,
    nombre_capacitacion     NVARCHAR(300) NOT NULL,
    id_tipo_capacitacion    INT REFERENCES catalogo_capacitacion(id_tipo_capacitacion),
    id_institucion_educativa INT REFERENCES catalogo_instituciones_educativas(id_institucion_educativa),
    id_tipo_curso           INT REFERENCES catalogo_tipo_curso(id_tipo_curso),
    id_pais                 INT REFERENCES catalogo_paises(id_pais),
    anio_obtencion          INT,
    horas                   INT,
    vigencia                NVARCHAR(100),
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Experiencia Laboral (N por profesor)
-- ===========================================
CREATE TABLE experiencia_laboral (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             VARCHAR(10) NOT NULL REFERENCES datos_generales(id_profesor) ON DELETE CASCADE,
    actividad_puesto        NVARCHAR(300) NOT NULL,
    id_institucion          INT REFERENCES catalogo_instituciones(id_institucion),
    inicio_mes_anio         NVARCHAR(50),
    fin_mes_anio            NVARCHAR(50),
    id_tipo_experiencia     INT REFERENCES catalogo_experiencia_laboral(id_tipo_experiencia),
    nivel_experiencia       NVARCHAR(100),
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Productos Académicos (N por profesor)
-- ===========================================
CREATE TABLE productos_academicos (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             VARCHAR(10) NOT NULL REFERENCES datos_generales(id_profesor) ON DELETE CASCADE,
    descripcion_producto_academico NVARCHAR(MAX),
    id_institucion_educativa INT REFERENCES catalogo_instituciones_educativas(id_institucion_educativa),
    anio_producto           INT,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Logros Profesionales - No Académicos (N por profesor)
-- ===========================================
CREATE TABLE logros_profesionales (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             VARCHAR(10) NOT NULL REFERENCES datos_generales(id_profesor) ON DELETE CASCADE,
    desc_logro              NVARCHAR(MAX) NOT NULL,
    id_institucion          INT REFERENCES catalogo_instituciones(id_institucion),
    anio_obtencion          INT,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Membresía / Participación en Organismos, Colegios,
--        Academias, Tribunales, Comités u otro tipo de
--        experiencia académica, profesional o técnica
--        (N por profesor)
-- ===========================================
CREATE TABLE organismos (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             VARCHAR(10) NOT NULL REFERENCES datos_generales(id_profesor) ON DELETE CASCADE,
    id_organismo            INT REFERENCES catalogo_organismos(id_organismo),
    anio_inicio             INT,
    anio_fin                INT,
    nivel_experiencia       NVARCHAR(100),
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Premios, Distinciones y Becas o Comisión Académica
--        (N por profesor)
-- ===========================================
CREATE TABLE premios_distinciones (
    id                      INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor             VARCHAR(10) NOT NULL REFERENCES datos_generales(id_profesor) ON DELETE CASCADE,
    desc_premio             NVARCHAR(MAX) NOT NULL,
    anio_obtencion          INT,
    fecha_carga             DATETIME2 DEFAULT GETDATE(),
    fecha_actualizacion     DATETIME2 DEFAULT GETDATE()
);

-- ///////////////////////////////////////////
-- ÍNDICES
-- ///////////////////////////////////////////
CREATE INDEX IX_EstudiosAcademicos_IdProfesor ON estudios_academicos(id_profesor);
CREATE INDEX IX_CapacitacionActualizacion_IdProfesor ON capacitacion_actualizacion(id_profesor);
CREATE INDEX IX_ExperienciaLaboral_IdProfesor ON experiencia_laboral(id_profesor);
CREATE INDEX IX_ProductosAcademicos_IdProfesor ON productos_academicos(id_profesor);
CREATE INDEX IX_LogrosProfesionales_IdProfesor ON logros_profesionales(id_profesor);
CREATE INDEX IX_Organismos_IdProfesor ON organismos(id_profesor);
CREATE INDEX IX_PremiosDistinciones_IdProfesor ON premios_distinciones(id_profesor);

-- Índices en FKs de catálogos
CREATE INDEX IX_EstudiosAcademicos_NivelEstudio ON estudios_academicos(id_nivel_estudio);
CREATE INDEX IX_EstudiosAcademicos_InstEducativa ON estudios_academicos(id_institucion_educativa);
CREATE INDEX IX_EstudiosAcademicos_Pais ON estudios_academicos(id_pais);
CREATE INDEX IX_Capacitacion_TipoCapacitacion ON capacitacion_actualizacion(id_tipo_capacitacion);
CREATE INDEX IX_Capacitacion_InstEducativa ON capacitacion_actualizacion(id_institucion_educativa);
CREATE INDEX IX_Capacitacion_TipoCurso ON capacitacion_actualizacion(id_tipo_curso);
CREATE INDEX IX_Capacitacion_Pais ON capacitacion_actualizacion(id_pais);
CREATE INDEX IX_DatosGenerales_Puesto ON datos_generales(id_puesto);
CREATE INDEX IX_ExperienciaLaboral_Institucion ON experiencia_laboral(id_institucion);
CREATE INDEX IX_ExperienciaLaboral_TipoExp ON experiencia_laboral(id_tipo_experiencia);
CREATE INDEX IX_ProductosAcademicos_InstEducativa ON productos_academicos(id_institucion_educativa);
CREATE INDEX IX_LogrosProfesionales_Institucion ON logros_profesionales(id_institucion);
CREATE INDEX IX_Organismos_Organismo ON organismos(id_organismo);
