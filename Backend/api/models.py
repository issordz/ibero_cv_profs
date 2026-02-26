"""
Models for IBERO Portal de gestión para acreditaciones.
Schema: [acreditacion] en SQL Server.
Genera migrations compatibles con SQL Server 2019.
"""

from django.db import models


# ///////////////////////////////////////////
# MODELO BASE ABSTRACTO
# ///////////////////////////////////////////

class BaseModel(models.Model):
    """Campos comunes de auditoría para todos los modelos."""
    activo = models.BooleanField(default=True)
    fecha_carga = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# ///////////////////////////////////////////
# CATÁLOGOS
# ///////////////////////////////////////////

class Career(BaseModel):
    """Catálogo de carreras."""
    nombre_carrera = models.CharField(max_length=300)

    class Meta:
        db_table = 'acreditacion].[catalogo_carreras'
        verbose_name = 'Carrera'
        verbose_name_plural = 'Catálogo de Carreras'

    def __str__(self):
        return self.nombre_carrera


class Country(BaseModel):
    """Catálogo de países."""
    nombre_pais = models.CharField(max_length=150)

    class Meta:
        db_table = 'acreditacion].[catalogo_paises'
        verbose_name = 'País'
        verbose_name_plural = 'Catálogo de Países'

    def __str__(self):
        return self.nombre_pais


class CourseType(BaseModel):
    """Catálogo de tipo de curso."""
    desc_tipo_curso = models.CharField(max_length=200)

    class Meta:
        db_table = 'acreditacion].[catalogo_tipo_curso'
        verbose_name = 'Tipo de Curso'
        verbose_name_plural = 'Catálogo de Tipos de Curso'

    def __str__(self):
        return self.desc_tipo_curso


class EducationalInstitution(BaseModel):
    """Catálogo de instituciones educativas."""
    nombre_institucion = models.CharField(max_length=300)

    class Meta:
        db_table = 'acreditacion].[catalogo_instituciones_educativas'
        verbose_name = 'Institución Educativa'
        verbose_name_plural = 'Catálogo de Instituciones Educativas'

    def __str__(self):
        return self.nombre_institucion


class Institution(BaseModel):
    """Catálogo de instituciones (empresas, organismos generales)."""
    nombre_institucion = models.CharField(max_length=300)

    class Meta:
        db_table = 'acreditacion].[catalogo_instituciones'
        verbose_name = 'Institución'
        verbose_name_plural = 'Catálogo de Instituciones'

    def __str__(self):
        return self.nombre_institucion


class InstitutionalPosition(BaseModel):
    """Catálogo de puesto institucional."""
    desc_puesto = models.CharField(max_length=200)

    class Meta:
        db_table = 'acreditacion].[catalogo_puesto_institucional'
        verbose_name = 'Puesto Institucional'
        verbose_name_plural = 'Catálogo de Puestos Institucionales'

    def __str__(self):
        return self.desc_puesto


class Organization(BaseModel):
    """Catálogo de organismos."""
    nombre_organismo = models.CharField(max_length=300)

    class Meta:
        db_table = 'acreditacion].[catalogo_organismos'
        verbose_name = 'Organismo'
        verbose_name_plural = 'Catálogo de Organismos'

    def __str__(self):
        return self.nombre_organismo


class StudyLevel(BaseModel):
    """Catálogo de nivel de estudio."""
    desc_nivel_estudio = models.CharField(max_length=200)

    class Meta:
        db_table = 'acreditacion].[catalogo_nivel_estudio'
        verbose_name = 'Nivel de Estudio'
        verbose_name_plural = 'Catálogo de Niveles de Estudio'

    def __str__(self):
        return self.desc_nivel_estudio


class Training(BaseModel):
    """Catálogo de tipo de capacitación."""
    desc_tipo_capacitacion = models.CharField(max_length=200)

    class Meta:
        db_table = 'acreditacion].[catalogo_capacitacion'
        verbose_name = 'Tipo de Capacitación'
        verbose_name_plural = 'Catálogo de Capacitación'

    def __str__(self):
        return self.desc_tipo_capacitacion


class WorkExperienceType(BaseModel):
    """Catálogo de tipo de experiencia laboral."""
    desc_tipo_experiencia = models.CharField(max_length=200)

    class Meta:
        db_table = 'acreditacion].[catalogo_experiencia_laboral'
        verbose_name = 'Tipo de Experiencia Laboral'
        verbose_name_plural = 'Catálogo de Experiencia Laboral'

    def __str__(self):
        return self.desc_tipo_experiencia


# ///////////////////////////////////////////
# TABLAS PRINCIPALES
# ///////////////////////////////////////////

class Teacher(BaseModel):
    """Datos generales del profesor (registro único)."""
    apellido_materno = models.CharField(max_length=100, blank=True, null=True)
    apellido_paterno = models.CharField(max_length=100)
    fecha_de_nacimiento = models.DateField(blank=True, null=True)
    nombres = models.CharField(max_length=100)
    puesto_institucional = models.CharField(max_length=200, blank=True, null=True)
    resumen_profesional = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'acreditacion].[datos_generales'
        verbose_name = 'Datos Generales'
        verbose_name_plural = 'Datos Generales'

    def __str__(self):
        return f"{self.nombres} {self.apellido_paterno}"


class User(BaseModel):
    """Gestión de usuarios del portal."""
    contrasena = models.CharField(max_length=255)
    correo = models.CharField(max_length=200, unique=True)
    rol = models.CharField(max_length=50)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    class Meta:
        db_table = 'acreditacion].[gestion_usuarios'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Gestión de Usuarios'

    def __str__(self):
        return self.correo


class Education(BaseModel):
    """Estudios académicos (N por profesor)."""
    anio_obtencion = models.IntegerField(blank=True, null=True)
    cedula = models.CharField(max_length=50, blank=True, null=True)
    titulo_estudio = models.CharField(max_length=300)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, blank=True, null=True)
    educational_institution = models.ForeignKey(
        EducationalInstitution, on_delete=models.SET_NULL, blank=True, null=True)
    study_level = models.ForeignKey(StudyLevel, on_delete=models.SET_NULL, blank=True, null=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    class Meta:
        db_table = 'acreditacion].[estudios_academicos'
        verbose_name = 'Estudio Académico'
        verbose_name_plural = 'Estudios Académicos'

    def __str__(self):
        return self.titulo_estudio


class Certification(BaseModel):
    """Capacitación / Actualización Docente (N por profesor)."""
    anio_obtencion = models.IntegerField(blank=True, null=True)
    horas = models.IntegerField(blank=True, null=True)
    nombre_capacitacion = models.CharField(max_length=300)
    vigencia = models.CharField(max_length=100, blank=True, null=True)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, blank=True, null=True)
    course_type = models.ForeignKey(CourseType, on_delete=models.SET_NULL, blank=True, null=True)
    educational_institution = models.ForeignKey(
        EducationalInstitution, on_delete=models.SET_NULL, blank=True, null=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    training = models.ForeignKey(Training, on_delete=models.SET_NULL, blank=True, null=True)

    class Meta:
        db_table = 'acreditacion].[capacitacion_actualizacion'
        verbose_name = 'Capacitación / Actualización'
        verbose_name_plural = 'Capacitación / Actualización'

    def __str__(self):
        return self.nombre_capacitacion


class WorkExperience(BaseModel):
    """Experiencia laboral (N por profesor)."""
    actividad_puesto = models.CharField(max_length=300)
    fin_mes_anio = models.CharField(max_length=50, blank=True, null=True)
    inicio_mes_anio = models.CharField(max_length=50, blank=True, null=True)
    nivel_experiencia = models.CharField(max_length=100, blank=True, null=True)
    institution = models.ForeignKey(Institution, on_delete=models.SET_NULL, blank=True, null=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    work_experience = models.ForeignKey(
        WorkExperienceType, on_delete=models.SET_NULL, blank=True, null=True)

    class Meta:
        db_table = 'acreditacion].[experiencia_laboral'
        verbose_name = 'Experiencia Laboral'
        verbose_name_plural = 'Experiencia Laboral'

    def __str__(self):
        return self.actividad_puesto


class Resource(BaseModel):
    """Productos académicos (N por profesor)."""
    anio_producto = models.IntegerField(blank=True, null=True)
    descripcion_producto_academico = models.TextField(blank=True, null=True)
    educational_institution = models.ForeignKey(
        EducationalInstitution, on_delete=models.SET_NULL, blank=True, null=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    class Meta:
        db_table = 'acreditacion].[productos_academicos'
        verbose_name = 'Producto Académico'
        verbose_name_plural = 'Productos Académicos'

    def __str__(self):
        return (self.descripcion_producto_academico or '')[:80]


class Achievement(BaseModel):
    """Logros profesionales no académicos (N por profesor)."""
    anio_obtencion = models.IntegerField(blank=True, null=True)
    desc_logro = models.TextField()
    institution = models.ForeignKey(Institution, on_delete=models.SET_NULL, blank=True, null=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    class Meta:
        db_table = 'acreditacion].[logros_profesionales'
        verbose_name = 'Logro Profesional'
        verbose_name_plural = 'Logros Profesionales'

    def __str__(self):
        return self.desc_logro[:80]


class Affiliation(BaseModel):
    """Membresía / Participación en organismos (N por profesor)."""
    anio_fin = models.IntegerField(blank=True, null=True)
    anio_inicio = models.IntegerField(blank=True, null=True)
    nivel_experiencia = models.CharField(max_length=100, blank=True, null=True)
    organization = models.ForeignKey(Organization, on_delete=models.SET_NULL, blank=True, null=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    class Meta:
        db_table = 'acreditacion].[organismos'
        verbose_name = 'Organismo'
        verbose_name_plural = 'Organismos'

    def __str__(self):
        return str(self.organization) if self.organization else f"Membresía #{self.pk}"


class Award(BaseModel):
    """Premios, distinciones y becas (N por profesor)."""
    anio_obtencion = models.IntegerField(blank=True, null=True)
    desc_premio = models.TextField()
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    class Meta:
        db_table = 'acreditacion].[premios_distinciones'
        verbose_name = 'Premio / Distinción'
        verbose_name_plural = 'Premios y Distinciones'

    def __str__(self):
        return self.desc_premio[:80]
