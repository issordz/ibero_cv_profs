"""
Models matching the IBERO GDD database schema.
All tables from schema.sql are represented here.
"""

from django.db import models


class CatalogoInstitucion(models.Model):
    """Catálogo de instituciones."""
    id_institucion = models.AutoField(primary_key=True)
    nombre_institucion = models.CharField(max_length=300)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'catalogo_instituciones'
        verbose_name = 'Institución'
        verbose_name_plural = 'Catálogo de Instituciones'

    def __str__(self):
        return self.nombre_institucion


class DatosGenerales(models.Model):
    """Registro único por profesor."""
    id_profesor = models.AutoField(primary_key=True)
    nombres = models.CharField(max_length=200)
    apellido_paterno = models.CharField(max_length=200)
    apellido_materno = models.CharField(max_length=200, blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    puesto_institucion = models.CharField(max_length=200, blank=True, null=True)
    resumen_profesional = models.TextField(blank=True, null=True)
    activo = models.BooleanField(default=True)
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
    correo = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=255)
    rol = models.CharField(max_length=20, default='profesor', choices=[
        ('profesor', 'Profesor'),
        ('admin', 'Administrador'),
    ])
    activo = models.BooleanField(default=True)
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
    nivel_estudio = models.CharField(max_length=100, blank=True, null=True)
    titulo_estudio = models.CharField(max_length=300)
    institucion = models.ForeignKey(
        CatalogoInstitucion, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_institucion'
    )
    pais = models.CharField(max_length=100, blank=True, null=True)
    anio_obtencion = models.IntegerField(blank=True, null=True)
    cedula = models.CharField(max_length=100, blank=True, null=True)
    activo = models.BooleanField(default=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'estudios_academicos'
        verbose_name = 'Estudio Académico'
        verbose_name_plural = 'Estudios Académicos'

    def __str__(self):
        return f"{self.titulo_estudio} - {self.nivel_estudio}"


class CapacitacionActualizacion(models.Model):
    """Capacitación / Actualización Docente (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='capacitacion_actualizacion', db_column='id_profesor'
    )
    nombre_capacitacion = models.CharField(max_length=300, blank=True, null=True)
    tipo_capacitacion = models.CharField(max_length=200, blank=True, null=True)
    institucion = models.ForeignKey(
        CatalogoInstitucion, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_institucion'
    )
    pais = models.CharField(max_length=100, blank=True, null=True)
    anio_obtencion = models.IntegerField(blank=True, null=True)
    horas = models.IntegerField(blank=True, null=True)
    tip_tipo_curso = models.CharField(max_length=100, blank=True, null=True)
    vigencia = models.CharField(max_length=100, blank=True, null=True)
    activo = models.BooleanField(default=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'capacitacion_actualizacion'
        verbose_name = 'Capacitación / Actualización'
        verbose_name_plural = 'Capacitación / Actualización'

    def __str__(self):
        return self.nombre_capacitacion or self.tipo_capacitacion or ''


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
    tipo_experiencia = models.CharField(max_length=100, blank=True, null=True)
    nivel_experiencia = models.CharField(max_length=100, blank=True, null=True)
    activo = models.BooleanField(default=True)
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
    id_publicacion = models.CharField(max_length=100, blank=True, null=True)
    descripcion_publicacion = models.TextField(blank=True, null=True)
    institucion = models.ForeignKey(
        CatalogoInstitucion, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_institucion'
    )
    anio_producto = models.IntegerField(blank=True, null=True)
    activo = models.BooleanField(default=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'productos_academicos'
        verbose_name = 'Producto Académico'
        verbose_name_plural = 'Productos Académicos'

    def __str__(self):
        return self.id_publicacion or (self.descripcion_publicacion or '')[:80]


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
    activo = models.BooleanField(default=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'logros_profesionales'
        verbose_name = 'Logro Profesional'
        verbose_name_plural = 'Logros Profesionales'

    def __str__(self):
        return self.desc_logro[:80]


class Organismo(models.Model):
    """Membresía / Organismos profesionales (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='organismos', db_column='id_profesor'
    )
    institucion = models.ForeignKey(
        CatalogoInstitucion, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_institucion'
    )
    anio_inicio = models.IntegerField(blank=True, null=True)
    anio_fin = models.IntegerField(blank=True, null=True)
    nivel_experiencia = models.CharField(max_length=100, blank=True, null=True)
    activo = models.BooleanField(default=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'organismos'
        verbose_name = 'Organismo'
        verbose_name_plural = 'Organismos'

    def __str__(self):
        return str(self.institucion) if self.institucion else f"Organismo #{self.pk}"


class PremioDistincion(models.Model):
    """Premios, distinciones o reconocimientos (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='premios_distinciones', db_column='id_profesor'
    )
    desc_premio = models.TextField()
    institucion = models.ForeignKey(
        CatalogoInstitucion, on_delete=models.SET_NULL,
        blank=True, null=True, db_column='id_institucion'
    )
    anio_obtencion = models.IntegerField(blank=True, null=True)
    activo = models.BooleanField(default=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'premios_distinciones'
        verbose_name = 'Premio o Distinción'
        verbose_name_plural = 'Premios y Distinciones'

    def __str__(self):
        return self.desc_premio[:80]
