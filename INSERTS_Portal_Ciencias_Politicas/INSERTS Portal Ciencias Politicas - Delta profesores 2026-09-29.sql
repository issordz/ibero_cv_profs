-- DELTA profesores CP — alta 2026-09-29
-- Origen: listado cve_profesor / profesor / nomina / cve_depto=4700
-- Ya existente (omitido): 23873 HERNANDEZ VERAZTICA
-- Nuevos: 9 cuentas
-- NOTA: fecha_de_nacimiento e id_puesto en NULL (sin cruce SIP/DatosNomina).
--       Nombres parseados como APELLIDO_PATERNO APELLIDO_MATERNO NOMBRE(S).

------------------------------------------------------------
-- 1) control_acreditacion
------------------------------------------------------------
INSERT INTO acreditacion.control_acreditacion
    (cve_profesor, id_acreditacion, nombre_acreditacion, cve_carrera_acreditacion,
     carrera_acreditacion, organismo_acreditador, tipo_acreditacion, nivel_acreditacion,
     anio, vigencia_inicio, vigencia_fin)
SELECT v.cve_profesor, v.id_acreditacion, v.nombre_acreditacion, v.cve_carrera_acreditacion,
       v.carrera_acreditacion, v.organismo_acreditador, v.tipo_acreditacion, v.nivel_acreditacion,
       v.anio, v.vigencia_inicio, v.vigencia_fin
FROM (VALUES
    (4156, 2, N'Reacreditación Nacional CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA 2026', 4711, N'CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA', N'ACCECISO', N'Reacreditación', N'Nacional', 2026, CAST(NULL AS datetime), CAST(NULL AS datetime)),
    (11092, 2, N'Reacreditación Nacional CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA 2026', 4711, N'CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA', N'ACCECISO', N'Reacreditación', N'Nacional', 2026, CAST(NULL AS datetime), CAST(NULL AS datetime)),
    (26035, 2, N'Reacreditación Nacional CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA 2026', 4711, N'CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA', N'ACCECISO', N'Reacreditación', N'Nacional', 2026, CAST(NULL AS datetime), CAST(NULL AS datetime)),
    (29183, 2, N'Reacreditación Nacional CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA 2026', 4711, N'CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA', N'ACCECISO', N'Reacreditación', N'Nacional', 2026, CAST(NULL AS datetime), CAST(NULL AS datetime)),
    (29811, 2, N'Reacreditación Nacional CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA 2026', 4711, N'CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA', N'ACCECISO', N'Reacreditación', N'Nacional', 2026, CAST(NULL AS datetime), CAST(NULL AS datetime)),
    (31249, 2, N'Reacreditación Nacional CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA 2026', 4711, N'CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA', N'ACCECISO', N'Reacreditación', N'Nacional', 2026, CAST(NULL AS datetime), CAST(NULL AS datetime)),
    (31629, 2, N'Reacreditación Nacional CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA 2026', 4711, N'CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA', N'ACCECISO', N'Reacreditación', N'Nacional', 2026, CAST(NULL AS datetime), CAST(NULL AS datetime)),
    (35888, 2, N'Reacreditación Nacional CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA 2026', 4711, N'CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA', N'ACCECISO', N'Reacreditación', N'Nacional', 2026, CAST(NULL AS datetime), CAST(NULL AS datetime)),
    (39309, 2, N'Reacreditación Nacional CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA 2026', 4711, N'CIENCIAS POLÍTICAS Y ADMINISTRACIÓN PÚBLICA', N'ACCECISO', N'Reacreditación', N'Nacional', 2026, CAST(NULL AS datetime), CAST(NULL AS datetime))
) AS v (cve_profesor, id_acreditacion, nombre_acreditacion, cve_carrera_acreditacion,
        carrera_acreditacion, organismo_acreditador, tipo_acreditacion, nivel_acreditacion,
        anio, vigencia_inicio, vigencia_fin)
WHERE NOT EXISTS (
    SELECT 1
    FROM acreditacion.control_acreditacion c
    WHERE c.cve_profesor = v.cve_profesor
      AND c.id_acreditacion = v.id_acreditacion
);

------------------------------------------------------------
-- 2) datos_generales
-- Referencia nómina (solo metadato): TIEMPO / ASIGNATURA — no mapeada a id_puesto aquí.
------------------------------------------------------------
INSERT INTO acreditacion.datos_generales
    (cuenta, activo, fecha_carga, fecha_actualizacion,
     apellido_materno, apellido_paterno, fecha_de_nacimiento,
     nombres, resumen_profesional, id_puesto)
SELECT v.cuenta, v.activo, GETDATE(), GETDATE(),
       v.apellido_materno, v.apellido_paterno, v.fecha_de_nacimiento,
       v.nombres, v.resumen_profesional, v.id_puesto
FROM (VALUES
    -- MAGAZINE NEMHAUSER ROGER | TIEMPO
    (4156, 1, N'NEMHAUSER', N'MAGAZINE', CAST(NULL AS date), N'ROGER', CAST(NULL AS nvarchar(max)), CAST(NULL AS char(7))),
    -- SIMAN DRUKER YAEL SANDRA | TIEMPO
    (11092, 1, N'DRUKER', N'SIMAN', CAST(NULL AS date), N'YAEL SANDRA', CAST(NULL AS nvarchar(max)), CAST(NULL AS char(7))),
    -- VAZQUEZ GUTIERREZ JUAN PABLO | TIEMPO
    (26035, 1, N'GUTIERREZ', N'VAZQUEZ', CAST(NULL AS date), N'JUAN PABLO', CAST(NULL AS nvarchar(max)), CAST(NULL AS char(7))),
    -- CASTRO NEIRA ARMANDO YERKO | TIEMPO
    (29183, 1, N'NEIRA', N'CASTRO', CAST(NULL AS date), N'ARMANDO YERKO', CAST(NULL AS nvarchar(max)), CAST(NULL AS char(7))),
    -- TORRES RUIZ RENE | TIEMPO
    (29811, 1, N'RUIZ', N'TORRES', CAST(NULL AS date), N'RENE', CAST(NULL AS nvarchar(max)), CAST(NULL AS char(7))),
    -- GUTIERREZ MARQUEZ ENRIQUE | TIEMPO
    (31249, 1, N'MARQUEZ', N'GUTIERREZ', CAST(NULL AS date), N'ENRIQUE', CAST(NULL AS nvarchar(max)), CAST(NULL AS char(7))),
    -- VELA CASTANEDA MANOLO ESTUARDO | TIEMPO
    (31629, 1, N'CASTANEDA', N'VELA', CAST(NULL AS date), N'MANOLO ESTUARDO', CAST(NULL AS nvarchar(max)), CAST(NULL AS char(7))),
    -- JOHNSON ANNE WARREN | TIEMPO
    (35888, 1, N'ANNE', N'JOHNSON', CAST(NULL AS date), N'WARREN', CAST(NULL AS nvarchar(max)), CAST(NULL AS char(7))),
    -- AGUILAR RODRIGUEZ BERNARDO | ASIGNATURA
    (39309, 1, N'RODRIGUEZ', N'AGUILAR', CAST(NULL AS date), N'BERNARDO', CAST(NULL AS nvarchar(max)), CAST(NULL AS char(7)))
) AS v (cuenta, activo, apellido_materno, apellido_paterno, fecha_de_nacimiento,
        nombres, resumen_profesional, id_puesto)
WHERE NOT EXISTS (
    SELECT 1 FROM acreditacion.datos_generales d WHERE d.cuenta = v.cuenta
);
