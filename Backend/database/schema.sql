-- ===========================================
-- IBERO - Gestor de Datos del Docente
-- Script compatible con SQL Server 2019
-- Schema: [acreditacion]
-- Generado a partir de Django migrations (mssql-django)
-- ===========================================

-- Crear base de datos y schema (ejecutar por separado si es necesario)
-- CREATE DATABASE IBERO_GDD;
-- GO
-- USE IBERO_GDD;
-- GO
-- CREATE SCHEMA acreditacion;
-- GO

BEGIN TRANSACTION;

-- ///////////////////////////////////////////
-- TABLAS CATÁLOGO
-- ///////////////////////////////////////////

CREATE TABLE [acreditacion].[catalogo_carreras] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [nombre_carrera]        NVARCHAR(300) NOT NULL
);

CREATE TABLE [acreditacion].[catalogo_paises] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [nombre_pais]           NVARCHAR(150) NOT NULL
);

CREATE TABLE [acreditacion].[catalogo_tipo_curso] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [desc_tipo_curso]       NVARCHAR(200) NOT NULL
);

CREATE TABLE [acreditacion].[catalogo_instituciones_educativas] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [nombre_institucion]    NVARCHAR(300) NOT NULL
);

CREATE TABLE [acreditacion].[catalogo_instituciones] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [nombre_institucion]    NVARCHAR(300) NOT NULL
);

CREATE TABLE [acreditacion].[catalogo_puesto_institucional] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [desc_puesto]           NVARCHAR(200) NOT NULL
);

CREATE TABLE [acreditacion].[catalogo_organismos] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [nombre_organismo]      NVARCHAR(300) NOT NULL
);

CREATE TABLE [acreditacion].[catalogo_nivel_estudio] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [desc_nivel_estudio]    NVARCHAR(200) NOT NULL
);

CREATE TABLE [acreditacion].[catalogo_capacitacion] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [desc_tipo_capacitacion] NVARCHAR(200) NOT NULL
);

CREATE TABLE [acreditacion].[catalogo_experiencia_laboral] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [desc_tipo_experiencia] NVARCHAR(200) NOT NULL
);

-- ///////////////////////////////////////////
-- TABLAS PRINCIPALES
-- ///////////////////////////////////////////

CREATE TABLE [acreditacion].[datos_generales] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [apellido_materno]      NVARCHAR(100) NULL,
    [apellido_paterno]      NVARCHAR(100) NOT NULL,
    [fecha_de_nacimiento]   DATE NULL,
    [nombres]               NVARCHAR(100) NOT NULL,
    [puesto_institucional]  NVARCHAR(200) NULL,
    [resumen_profesional]   NVARCHAR(MAX) NULL
);

CREATE TABLE [acreditacion].[gestion_usuarios] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [contrasena]            NVARCHAR(255) NOT NULL,
    [correo]                NVARCHAR(200) NOT NULL UNIQUE,
    [rol]                   NVARCHAR(50) NOT NULL,
    [teacher_id]            BIGINT NOT NULL
);

CREATE TABLE [acreditacion].[estudios_academicos] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [anio_obtencion]        INT NULL,
    [cedula]                NVARCHAR(50) NULL,
    [titulo_estudio]        NVARCHAR(300) NOT NULL,
    [country_id]            BIGINT NULL,
    [educational_institution_id] BIGINT NULL,
    [study_level_id]        BIGINT NULL,
    [teacher_id]            BIGINT NOT NULL
);

CREATE TABLE [acreditacion].[capacitacion_actualizacion] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [anio_obtencion]        INT NULL,
    [horas]                 INT NULL,
    [nombre_capacitacion]   NVARCHAR(300) NOT NULL,
    [vigencia]              NVARCHAR(100) NULL,
    [country_id]            BIGINT NULL,
    [course_type_id]        BIGINT NULL,
    [educational_institution_id] BIGINT NULL,
    [teacher_id]            BIGINT NOT NULL,
    [training_id]           BIGINT NULL
);

CREATE TABLE [acreditacion].[experiencia_laboral] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [actividad_puesto]      NVARCHAR(300) NOT NULL,
    [fin_mes_anio]          NVARCHAR(50) NULL,
    [inicio_mes_anio]       NVARCHAR(50) NULL,
    [nivel_experiencia]     NVARCHAR(100) NULL,
    [institution_id]        BIGINT NULL,
    [teacher_id]            BIGINT NOT NULL,
    [work_experience_id]    BIGINT NULL
);

CREATE TABLE [acreditacion].[productos_academicos] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [anio_producto]         INT NULL,
    [descripcion_producto_academico] NVARCHAR(MAX) NULL,
    [educational_institution_id] BIGINT NULL,
    [teacher_id]            BIGINT NOT NULL
);

CREATE TABLE [acreditacion].[logros_profesionales] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [anio_obtencion]        INT NULL,
    [desc_logro]            NVARCHAR(MAX) NOT NULL,
    [institution_id]        BIGINT NULL,
    [teacher_id]            BIGINT NOT NULL
);

CREATE TABLE [acreditacion].[organismos] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [anio_fin]              INT NULL,
    [anio_inicio]           INT NULL,
    [nivel_experiencia]     NVARCHAR(100) NULL,
    [organization_id]       BIGINT NULL,
    [teacher_id]            BIGINT NOT NULL
);

CREATE TABLE [acreditacion].[premios_distinciones] (
    [id]                    BIGINT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    [activo]                BIT NOT NULL,
    [fecha_carga]           DATETIMEOFFSET NOT NULL,
    [fecha_actualizacion]   DATETIMEOFFSET NOT NULL,
    [anio_obtencion]        INT NULL,
    [desc_premio]           NVARCHAR(MAX) NOT NULL,
    [teacher_id]            BIGINT NOT NULL
);

-- ///////////////////////////////////////////
-- FOREIGN KEYS
-- ///////////////////////////////////////////

ALTER TABLE [acreditacion].[gestion_usuarios] ADD CONSTRAINT [FK_gestion_usuarios_teacher]
    FOREIGN KEY ([teacher_id]) REFERENCES [acreditacion].[datos_generales] ([id]);

ALTER TABLE [acreditacion].[estudios_academicos] ADD CONSTRAINT [FK_estudios_teacher]
    FOREIGN KEY ([teacher_id]) REFERENCES [acreditacion].[datos_generales] ([id]);
ALTER TABLE [acreditacion].[estudios_academicos] ADD CONSTRAINT [FK_estudios_country]
    FOREIGN KEY ([country_id]) REFERENCES [acreditacion].[catalogo_paises] ([id]);
ALTER TABLE [acreditacion].[estudios_academicos] ADD CONSTRAINT [FK_estudios_edu_inst]
    FOREIGN KEY ([educational_institution_id]) REFERENCES [acreditacion].[catalogo_instituciones_educativas] ([id]);
ALTER TABLE [acreditacion].[estudios_academicos] ADD CONSTRAINT [FK_estudios_study_level]
    FOREIGN KEY ([study_level_id]) REFERENCES [acreditacion].[catalogo_nivel_estudio] ([id]);

ALTER TABLE [acreditacion].[capacitacion_actualizacion] ADD CONSTRAINT [FK_capacitacion_teacher]
    FOREIGN KEY ([teacher_id]) REFERENCES [acreditacion].[datos_generales] ([id]);
ALTER TABLE [acreditacion].[capacitacion_actualizacion] ADD CONSTRAINT [FK_capacitacion_country]
    FOREIGN KEY ([country_id]) REFERENCES [acreditacion].[catalogo_paises] ([id]);
ALTER TABLE [acreditacion].[capacitacion_actualizacion] ADD CONSTRAINT [FK_capacitacion_edu_inst]
    FOREIGN KEY ([educational_institution_id]) REFERENCES [acreditacion].[catalogo_instituciones_educativas] ([id]);
ALTER TABLE [acreditacion].[capacitacion_actualizacion] ADD CONSTRAINT [FK_capacitacion_course_type]
    FOREIGN KEY ([course_type_id]) REFERENCES [acreditacion].[catalogo_tipo_curso] ([id]);
ALTER TABLE [acreditacion].[capacitacion_actualizacion] ADD CONSTRAINT [FK_capacitacion_training]
    FOREIGN KEY ([training_id]) REFERENCES [acreditacion].[catalogo_capacitacion] ([id]);

ALTER TABLE [acreditacion].[experiencia_laboral] ADD CONSTRAINT [FK_experiencia_teacher]
    FOREIGN KEY ([teacher_id]) REFERENCES [acreditacion].[datos_generales] ([id]);
ALTER TABLE [acreditacion].[experiencia_laboral] ADD CONSTRAINT [FK_experiencia_institution]
    FOREIGN KEY ([institution_id]) REFERENCES [acreditacion].[catalogo_instituciones] ([id]);
ALTER TABLE [acreditacion].[experiencia_laboral] ADD CONSTRAINT [FK_experiencia_work_exp]
    FOREIGN KEY ([work_experience_id]) REFERENCES [acreditacion].[catalogo_experiencia_laboral] ([id]);

ALTER TABLE [acreditacion].[productos_academicos] ADD CONSTRAINT [FK_productos_teacher]
    FOREIGN KEY ([teacher_id]) REFERENCES [acreditacion].[datos_generales] ([id]);
ALTER TABLE [acreditacion].[productos_academicos] ADD CONSTRAINT [FK_productos_edu_inst]
    FOREIGN KEY ([educational_institution_id]) REFERENCES [acreditacion].[catalogo_instituciones_educativas] ([id]);

ALTER TABLE [acreditacion].[logros_profesionales] ADD CONSTRAINT [FK_logros_teacher]
    FOREIGN KEY ([teacher_id]) REFERENCES [acreditacion].[datos_generales] ([id]);
ALTER TABLE [acreditacion].[logros_profesionales] ADD CONSTRAINT [FK_logros_institution]
    FOREIGN KEY ([institution_id]) REFERENCES [acreditacion].[catalogo_instituciones] ([id]);

ALTER TABLE [acreditacion].[organismos] ADD CONSTRAINT [FK_organismos_teacher]
    FOREIGN KEY ([teacher_id]) REFERENCES [acreditacion].[datos_generales] ([id]);
ALTER TABLE [acreditacion].[organismos] ADD CONSTRAINT [FK_organismos_organization]
    FOREIGN KEY ([organization_id]) REFERENCES [acreditacion].[catalogo_organismos] ([id]);

ALTER TABLE [acreditacion].[premios_distinciones] ADD CONSTRAINT [FK_premios_teacher]
    FOREIGN KEY ([teacher_id]) REFERENCES [acreditacion].[datos_generales] ([id]);

-- ///////////////////////////////////////////
-- ÍNDICES
-- ///////////////////////////////////////////

CREATE INDEX [IX_gestion_usuarios_teacher] ON [acreditacion].[gestion_usuarios] ([teacher_id]);
CREATE INDEX [IX_estudios_teacher] ON [acreditacion].[estudios_academicos] ([teacher_id]);
CREATE INDEX [IX_estudios_country] ON [acreditacion].[estudios_academicos] ([country_id]);
CREATE INDEX [IX_estudios_edu_inst] ON [acreditacion].[estudios_academicos] ([educational_institution_id]);
CREATE INDEX [IX_estudios_study_level] ON [acreditacion].[estudios_academicos] ([study_level_id]);
CREATE INDEX [IX_capacitacion_teacher] ON [acreditacion].[capacitacion_actualizacion] ([teacher_id]);
CREATE INDEX [IX_capacitacion_country] ON [acreditacion].[capacitacion_actualizacion] ([country_id]);
CREATE INDEX [IX_capacitacion_edu_inst] ON [acreditacion].[capacitacion_actualizacion] ([educational_institution_id]);
CREATE INDEX [IX_capacitacion_course_type] ON [acreditacion].[capacitacion_actualizacion] ([course_type_id]);
CREATE INDEX [IX_capacitacion_training] ON [acreditacion].[capacitacion_actualizacion] ([training_id]);
CREATE INDEX [IX_experiencia_teacher] ON [acreditacion].[experiencia_laboral] ([teacher_id]);
CREATE INDEX [IX_experiencia_institution] ON [acreditacion].[experiencia_laboral] ([institution_id]);
CREATE INDEX [IX_experiencia_work_exp] ON [acreditacion].[experiencia_laboral] ([work_experience_id]);
CREATE INDEX [IX_productos_teacher] ON [acreditacion].[productos_academicos] ([teacher_id]);
CREATE INDEX [IX_productos_edu_inst] ON [acreditacion].[productos_academicos] ([educational_institution_id]);
CREATE INDEX [IX_logros_teacher] ON [acreditacion].[logros_profesionales] ([teacher_id]);
CREATE INDEX [IX_logros_institution] ON [acreditacion].[logros_profesionales] ([institution_id]);
CREATE INDEX [IX_organismos_teacher] ON [acreditacion].[organismos] ([teacher_id]);
CREATE INDEX [IX_organismos_organization] ON [acreditacion].[organismos] ([organization_id]);
CREATE INDEX [IX_premios_teacher] ON [acreditacion].[premios_distinciones] ([teacher_id]);

COMMIT;
