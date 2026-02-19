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
-- TABLA: Departamentos (Catálogo)
-- ===========================================
CREATE TABLE Departamentos (
    id          INT IDENTITY(1,1) PRIMARY KEY,
    nombre      NVARCHAR(100) NOT NULL UNIQUE,
    activo      BIT DEFAULT 1,
    created_at  DATETIME2 DEFAULT GETDATE(),
    updated_at  DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Usuarios (Login del sistema)
-- ===========================================
CREATE TABLE Usuarios (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    email           NVARCHAR(150) NOT NULL UNIQUE,
    password_hash   NVARCHAR(255) NOT NULL,
    nombre          NVARCHAR(200) NOT NULL,
    rol             NVARCHAR(20) NOT NULL CHECK (rol IN ('admin', 'professor')),
    rol_display     NVARCHAR(100) NOT NULL,
    avatar          NVARCHAR(10),
    departamento_id INT NULL REFERENCES Departamentos(id),
    activo          BIT DEFAULT 1,
    created_at      DATETIME2 DEFAULT GETDATE(),
    updated_at      DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Docentes (Perfil completo del profesor)
-- ===========================================
CREATE TABLE Docentes (
    id                  INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id          INT NOT NULL UNIQUE REFERENCES Usuarios(id),
    employee_id         NVARCHAR(20) NOT NULL UNIQUE,
    nombre              NVARCHAR(200) NOT NULL,
    rol_academico       NVARCHAR(100),
    avatar              NVARCHAR(10),
    avatar_color        NVARCHAR(50),
    departamento_id     INT REFERENCES Departamentos(id),
    departamento_color  NVARCHAR(50),
    ultima_actualizacion NVARCHAR(50),
    progreso_perfil     INT DEFAULT 0 CHECK (progreso_perfil BETWEEN 0 AND 100),
    email               NVARCHAR(150),
    telefono            NVARCHAR(30),
    ubicacion_oficina   NVARCHAR(200),
    orcid_id            NVARCHAR(50),
    linkedin            NVARCHAR(200),
    horario_oficina     NVARCHAR(200),
    resumen             NVARCHAR(MAX),
    activo              BIT DEFAULT 1,
    created_at          DATETIME2 DEFAULT GETDATE(),
    updated_at          DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Grados Académicos
-- ===========================================
CREATE TABLE GradosAcademicos (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    docente_id      INT NOT NULL REFERENCES Docentes(id) ON DELETE CASCADE,
    titulo          NVARCHAR(200) NOT NULL,
    institucion     NVARCHAR(200) NOT NULL,
    anio            INT,
    pais            NVARCHAR(100),
    created_at      DATETIME2 DEFAULT GETDATE(),
    updated_at      DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Publicaciones
-- ===========================================
CREATE TABLE Publicaciones (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    docente_id      INT NOT NULL REFERENCES Docentes(id) ON DELETE CASCADE,
    titulo          NVARCHAR(500) NOT NULL,
    revista         NVARCHAR(300),
    anio            INT,
    doi             NVARCHAR(100),
    created_at      DATETIME2 DEFAULT GETDATE(),
    updated_at      DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Proyectos
-- ===========================================
CREATE TABLE Proyectos (
    id                  INT IDENTITY(1,1) PRIMARY KEY,
    docente_id          INT NOT NULL REFERENCES Docentes(id) ON DELETE CASCADE,
    titulo              NVARCHAR(300) NOT NULL,
    rol                 NVARCHAR(100),
    fecha_inicio        NVARCHAR(20),
    fecha_fin           NVARCHAR(20),
    financiamiento      NVARCHAR(100),
    estado              NVARCHAR(50) DEFAULT 'Activo',
    created_at          DATETIME2 DEFAULT GETDATE(),
    updated_at          DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Premios y Distinciones
-- ===========================================
CREATE TABLE Premios (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    docente_id      INT NOT NULL REFERENCES Docentes(id) ON DELETE CASCADE,
    titulo          NVARCHAR(300) NOT NULL,
    organizacion    NVARCHAR(200),
    anio            INT,
    created_at      DATETIME2 DEFAULT GETDATE(),
    updated_at      DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Cursos (Docencia)
-- ===========================================
CREATE TABLE Cursos (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    docente_id      INT NOT NULL REFERENCES Docentes(id) ON DELETE CASCADE,
    codigo          NVARCHAR(20) NOT NULL,
    nombre          NVARCHAR(200) NOT NULL,
    semestre        NVARCHAR(50),
    estudiantes     INT DEFAULT 0,
    created_at      DATETIME2 DEFAULT GETDATE(),
    updated_at      DATETIME2 DEFAULT GETDATE()
);

-- ===========================================
-- TABLA: Idiomas
-- ===========================================
CREATE TABLE Idiomas (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    docente_id      INT NOT NULL REFERENCES Docentes(id) ON DELETE CASCADE,
    idioma          NVARCHAR(100) NOT NULL,
    nivel           NVARCHAR(50),
    created_at      DATETIME2 DEFAULT GETDATE(),
    updated_at      DATETIME2 DEFAULT GETDATE()
);

-- =========================================== 
-- TABLA: Estado de Secciones del Formulario
-- ===========================================
CREATE TABLE SeccionesEstado (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    docente_id      INT NOT NULL REFERENCES Docentes(id) ON DELETE CASCADE,
    seccion_id      NVARCHAR(50) NOT NULL,
    estado          NVARCHAR(20) DEFAULT 'pending' CHECK (estado IN ('complete', 'pending', 'in_progress')),
    created_at      DATETIME2 DEFAULT GETDATE(),
    updated_at      DATETIME2 DEFAULT GETDATE(),
    UNIQUE(docente_id, seccion_id)
);

-- ===========================================
-- ÍNDICES
-- ===========================================
CREATE INDEX IX_Docentes_DepartamentoId ON Docentes(departamento_id);
CREATE INDEX IX_Docentes_UsuarioId ON Docentes(usuario_id);
CREATE INDEX IX_GradosAcademicos_DocenteId ON GradosAcademicos(docente_id);
CREATE INDEX IX_Publicaciones_DocenteId ON Publicaciones(docente_id);
CREATE INDEX IX_Proyectos_DocenteId ON Proyectos(docente_id);
CREATE INDEX IX_Premios_DocenteId ON Premios(docente_id);
CREATE INDEX IX_Cursos_DocenteId ON Cursos(docente_id);
CREATE INDEX IX_Idiomas_DocenteId ON Idiomas(docente_id);
CREATE INDEX IX_SeccionesEstado_DocenteId ON SeccionesEstado(docente_id);
