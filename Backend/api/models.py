"""
Models matching the IBERO GDD database schema.
All 10 tables from schema.sql are represented here.
"""

from django.db import models


class DatosGenerales(models.Model):
    """Registro único por profesor."""
    id_profesor = models.AutoField(primary_key=True)
    nombres = models.CharField(max_length=200)
    apellido_paterno = models.CharField(max_length=200)
    apellido_materno = models.CharField(max_length=200, blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    correo_electronico = models.CharField(max_length=150, unique=True)
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


class UsuarioPortal(models.Model):
    """Login del sistema."""
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
        db_table = 'usuarios_portal'
        verbose_name = 'Usuario Portal'
        verbose_name_plural = 'Usuarios Portal'

    def __str__(self):
        return self.correo


class EstudioAcademico(models.Model):
    """Estudios académicos (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='estudios_academicos', db_column='id_profesor'
    )
    titulo_estudio = models.CharField(max_length=300)
    nivel_estudios = models.CharField(max_length=100, blank=True, null=True)
    institucion = models.CharField(max_length=300, blank=True, null=True)
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
        return f"{self.titulo_estudio} - {self.nivel_estudios}"


class ExperienciaLaboral(models.Model):
    """Experiencia laboral (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='experiencia_laboral', db_column='id_profesor'
    )
    actividad_puesto = models.CharField(max_length=300)
    organizacion_empresa = models.CharField(max_length=300, blank=True, null=True)
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
        return f"{self.actividad_puesto} - {self.organizacion_empresa}"


class Capacitacion(models.Model):
    """Capacitación (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='capacitaciones', db_column='id_profesor'
    )
    nombre_capacitacion = models.CharField(max_length=300, blank=True, null=True)
    tipo_capacitacion = models.CharField(max_length=200, blank=True, null=True)
    institucion = models.CharField(max_length=300, blank=True, null=True)
    pais = models.CharField(max_length=100, blank=True, null=True)
    anio_obtencion = models.IntegerField(blank=True, null=True)
    horas = models.IntegerField(blank=True, null=True)
    vigencia = models.CharField(max_length=100, blank=True, null=True)
    activo = models.BooleanField(default=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'capacitacion'
        verbose_name = 'Capacitación'
        verbose_name_plural = 'Capacitaciones'

    def __str__(self):
        return self.nombre_capacitacion or self.tipo_capacitacion or ''


class LogroProfesional(models.Model):
    """Logros profesionales (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='logros_profesionales', db_column='id_profesor'
    )
    desc_logro = models.TextField()
    institucion = models.CharField(max_length=300, blank=True, null=True)
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
    """Organismos (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='organismos', db_column='id_profesor'
    )
    organismo = models.CharField(max_length=300)
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
        return self.organismo


class PremioDistincion(models.Model):
    """Premios o distinciones (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='premios_distinciones', db_column='id_profesor'
    )
    desc_premio = models.TextField()
    institucion = models.CharField(max_length=300, blank=True, null=True)
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


class ProductoAcademico(models.Model):
    """Productos académicos (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='productos_academicos', db_column='id_profesor'
    )
    id_publicacion = models.CharField(max_length=100, blank=True, null=True)
    descripcion_publicacion = models.TextField(blank=True, null=True)
    anio_producto = models.IntegerField(blank=True, null=True)
    activo = models.BooleanField(default=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'productos_academicos'
        verbose_name = 'Producto Académico'
        verbose_name_plural = 'Productos Académicos'

    def __str__(self):
        return self.id_publicacion or self.descripcion_publicacion[:80] or ''


class Actualizacion(models.Model):
    """Actualización profesional (N por profesor)."""
    profesor = models.ForeignKey(
        DatosGenerales, on_delete=models.CASCADE,
        related_name='actualizaciones', db_column='id_profesor'
    )
    nombre_actualizacion = models.CharField(max_length=300)
    tipo_actualizacion = models.CharField(max_length=200, blank=True, null=True)
    institucion = models.CharField(max_length=300, blank=True, null=True)
    pais = models.CharField(max_length=100, blank=True, null=True)
    anio = models.IntegerField(blank=True, null=True)
    horas = models.IntegerField(blank=True, null=True)
    activo = models.BooleanField(default=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'actualizacion'
        verbose_name = 'Actualización'
        verbose_name_plural = 'Actualizaciones'

    def __str__(self):
        return self.nombre_actualizacion
