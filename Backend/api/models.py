"""
Models matching the IBERO Portal de gestión para acreditaciones database schema.
All tables from schema.sql are represented here.
"""

from django.db import models


# ///////////////////////////////////////////
# CATÁLOGOS
# ///////////////////////////////////////////

class CatalogoInstitucion(models.Model):
    """Catálogo de instituciones (empresas, organismos generales)."""
    id_institucion = models.AutoField(primary_key=True)
    nombre_institucion = models.CharField(max_length=300)
    activo = models.PositiveSmallIntegerField(default=1)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'catalogo_instituciones'
        verbose_name = 'Institución'
        verbose_name_plural = 'Catálogo de Instituciones'

    def __str__(self):
        return self.nombre_institucion


class CatalogoInstitucionEducativa(models.Model):
    """Catálogo de instituciones educativas."""
    id_institucion_educativa = models.AutoField(primary_key=True)
    nombre_institucion = models.CharField(max_length=300)
    activo = models.PositiveSmallIntegerField(default=1)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'catalogo_instituciones_educativas'
        verbose_name = 'Institución Educativa'
        verbose_name_plural = 'Catálogo de Instituciones Educativas'

    def __str__(self):
        return self.nombre_institucion


class CatalogoNivelEstudio(models.Model):
    """Catálogo de niveles de estudio."""
    id_nivel_estudio = models.AutoField(primary_key=True)
    desc_nivel_estudio = models.CharField(max_length=200)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'catalogo_nivel_estudio'
        verbose_name = 'Nivel de Estudio'
        verbose_name_plural = 'Catálogo de Nivel de Estudio'

    def __str__(self):
        return self.desc_nivel_estudio


class CatalogoCarrera(models.Model):
    """Catálogo de carreras."""
    id_carrera = models.AutoField(primary_key=True)
    nombre_carrera = models.CharField(max_length=300)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'catalogo_carreras'
        verbose_name = 'Carrera'
        verbose_name_plural = 'Catálogo de Carreras'

    def __str__(self):
        return self.nombre_carrera


class CatalogoPais(models.Model):
    """Catálogo de países."""
    id_pais = models.AutoField(primary_key=True)
    nombre_pais = models.CharField(max_length=150)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'catalogo_paises'
        verbose_name = 'País'
        verbose_name_plural = 'Catálogo de Países'

    def __str__(self):
        return self.nombre_pais


class CatalogoTipoCurso(models.Model):
    """Catálogo de tipos de curso."""
    id_tipo_curso = models.AutoField(primary_key=True)
    desc_tipo_curso = models.CharField(max_length=200)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'catalogo_tipo_curso'
        verbose_name = 'Tipo de Curso'
        verbose_name_plural = 'Catálogo de Tipo de Curso'

    def __str__(self):
        return self.desc_tipo_curso


class CatalogoCapacitacion(models.Model):
    """Catálogo de tipos de capacitación."""
    id_tipo_capacitacion = models.AutoField(primary_key=True)
    desc_tipo_capacitacion = models.CharField(max_length=200)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'catalogo_capacitacion'
        verbose_name = 'Tipo de Capacitación'
        verbose_name_plural = 'Catálogo de Capacitación'

    def __str__(self):
        return self.desc_tipo_capacitacion


class CatalogoExperienciaLaboral(models.Model):
    """Catálogo de tipos de experiencia laboral."""
    id_tipo_experiencia = models.AutoField(primary_key=True)
    desc_tipo_experiencia = models.CharField(max_length=200)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'catalogo_experiencia_laboral'
        verbose_name = 'Tipo de Experiencia Laboral'
        verbose_name_plural = 'Catálogo de Experiencia Laboral'

    def __str__(self):
        return self.desc_tipo_experiencia


class CatalogoOrganismo(models.Model):
    """Catálogo de organismos."""
    id_organismo = models.AutoField(primary_key=True)
    nombre_organismo = models.CharField(max_length=300)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'catalogo_organismos'
        verbose_name = 'Organismo'
        verbose_name_plural = 'Catálogo de Organismos'

    def __str__(self):
        return self.nombre_organismo


class CatalogoPuestoInstitucional(models.Model):
    """Catálogo de puestos institucionales."""
    id_puesto = models.AutoField(primary_key=True)
    desc_puesto = models.CharField(max_length=200)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'catalogo_puesto_institucional'
        verbose_name = 'Puesto Institucional'
        verbose_name_plural = 'Catálogo de Puesto Institucional'

    def __str__(self):
        return self.desc_puesto


# ///////////////////////////////////////////
# TABLAS PRINCIPALES
# ///////////////////////////////////////////

class DatosGenerales(models.Model):
    """Registro único por profesor."""
    id_profesor = models.CharField(max_length=10, primary_key=True)
    nombres = models.CharField(max_length=100)
    apellido_paterno = models.CharField(max_length=100)
    apellido_materno = models.CharField(max_length=100, blank=True, null=True)
    fecha_de_nacimiento = models.DateField(blank=True, null=True)
    puesto_institucional = models.ForeignKey(
        CatalogoPuestoInstitucional, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_puesto'
    )
    resumen_profesional = models.TextField(blank=True, null=True)
    activo = models.PositiveSmallIntegerField(default=1)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'datos_generales'
        verbose_name = 'Datos Generales'
        verbose_name_plural = 'Datos Generales'

    def __str__(self):
        return f"{self.nombres} {self.apellido_paterno}"


class GestionUsuario(models.Model):
    """Gestión de usuarios (login del sistema)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.SET_NULL,
        blank=True, null=True, related_name='usuario',
        db_column='id_profesor'
    )
    correo = models.CharField(max_length=200, unique=True)
    contrasena = models.CharField(max_length=255)
    rol = models.CharField(max_length=50, default='profesor', choices=[
        ('profesor', 'Profesor'),
        ('admin', 'Administrador'),
    ])
    activo = models.PositiveSmallIntegerField(default=1)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'gestion_usuarios'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Gestión de Usuarios'

    def __str__(self):
        return self.correo


class EstudioAcademico(models.Model):
    """Estudios académicos (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='estudios_academicos', db_column='id_profesor'
    )
    nivel_estudio = models.ForeignKey(
        CatalogoNivelEstudio, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_nivel_estudio'
    )
    titulo_estudio = models.CharField(max_length=300)
    institucion_educativa = models.ForeignKey(
        CatalogoInstitucionEducativa, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_institucion_educativa'
    )
    pais = models.ForeignKey(
        CatalogoPais, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_pais'
    )
    anio_obtencion = models.IntegerField(blank=True, null=True)
    cedula = models.CharField(max_length=50, blank=True, null=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'estudios_academicos'
        verbose_name = 'Estudio Académico'
        verbose_name_plural = 'Estudios Académicos'

    def __str__(self):
        return self.titulo_estudio


class CapacitacionActualizacion(models.Model):
    """Capacitación / Actualización Docente (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='capacitacion_actualizacion', db_column='id_profesor'
    )
    nombre_capacitacion = models.CharField(max_length=300)
    tipo_capacitacion = models.ForeignKey(
        CatalogoCapacitacion, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_tipo_capacitacion'
    )
    institucion_educativa = models.ForeignKey(
        CatalogoInstitucionEducativa, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_institucion_educativa'
    )
    tipo_curso = models.ForeignKey(
        CatalogoTipoCurso, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_tipo_curso'
    )
    pais = models.ForeignKey(
        CatalogoPais, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_pais'
    )
    anio_obtencion = models.IntegerField(blank=True, null=True)
    horas = models.IntegerField(blank=True, null=True)
    vigencia = models.CharField(max_length=100, blank=True, null=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'capacitacion_actualizacion'
        verbose_name = 'Capacitación / Actualización'
        verbose_name_plural = 'Capacitación / Actualización'

    def __str__(self):
        return self.nombre_capacitacion


class ExperienciaLaboral(models.Model):
    """Experiencia laboral (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='experiencia_laboral', db_column='id_profesor'
    )
    actividad_puesto = models.CharField(max_length=300)
    institucion = models.ForeignKey(
        CatalogoInstitucion, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_institucion'
    )
    inicio_mes_anio = models.CharField(max_length=50, blank=True, null=True)
    fin_mes_anio = models.CharField(max_length=50, blank=True, null=True)
    tipo_experiencia = models.ForeignKey(
        CatalogoExperienciaLaboral, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_tipo_experiencia'
    )
    nivel_experiencia = models.CharField(max_length=100, blank=True, null=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'experiencia_laboral'
        verbose_name = 'Experiencia Laboral'
        verbose_name_plural = 'Experiencia Laboral'

    def __str__(self):
        return self.actividad_puesto


class ProductoAcademico(models.Model):
    """Productos académicos (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='productos_academicos', db_column='id_profesor'
    )
    descripcion_producto_academico = models.TextField(blank=True, null=True)
    institucion_educativa = models.ForeignKey(
        CatalogoInstitucionEducativa, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_institucion_educativa'
    )
    anio_producto = models.IntegerField(blank=True, null=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'productos_academicos'
        verbose_name = 'Producto Académico'
        verbose_name_plural = 'Productos Académicos'

    def __str__(self):
        return (self.descripcion_producto_academico or '')[:80]


class LogroProfesional(models.Model):
    """Logros profesionales - no académicos (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='logros_profesionales', db_column='id_profesor'
    )
    desc_logro = models.TextField()
    institucion = models.ForeignKey(
        CatalogoInstitucion, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_institucion'
    )
    anio_obtencion = models.IntegerField(blank=True, null=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'logros_profesionales'
        verbose_name = 'Logro Profesional'
        verbose_name_plural = 'Logros Profesionales'

    def __str__(self):
        return self.desc_logro[:80]


class Organismo(models.Model):
    """Membresía / Participación en Organismos."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='organismos', db_column='id_profesor'
    )
    organismo = models.ForeignKey(
        CatalogoOrganismo, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_organismo'
    )
    anio_inicio = models.IntegerField(blank=True, null=True)
    anio_fin = models.IntegerField(blank=True, null=True)
    nivel_experiencia = models.CharField(max_length=100, blank=True, null=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'organismos'
        verbose_name = 'Organismo'
        verbose_name_plural = 'Organismos'

    def __str__(self):
        return str(self.organismo) if self.organismo else f"Organismo #{self.pk}"


class PremioDistincion(models.Model):
    """Premios, distinciones y becas o comisión académica (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='premios_distinciones', db_column='id_profesor'
    )
    desc_premio = models.TextField()
    anio_obtencion = models.IntegerField(blank=True, null=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'premios_distinciones'
        verbose_name = 'Premio o Distinción'
        verbose_name_plural = 'Premios y Distinciones'

    def __str__(self):
        return self.desc_premio[:80]
