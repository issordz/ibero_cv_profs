"""
Django admin registration for IBERO Portal de gestión para acreditaciones models.
"""

from django.contrib import admin
from .models import (
    CatalogoInstitucion, CatalogoInstitucionEducativa, CatalogoNivelEstudio,
    CatalogoCarrera, CatalogoPais, CatalogoTipoCurso, CatalogoCapacitacion,
    CatalogoExperienciaLaboral, CatalogoOrganismo, CatalogoPuestoInstitucional,
    DatosGenerales, GestionUsuario,
    EstudioAcademico, CapacitacionActualizacion, ExperienciaLaboral,
    ProductoAcademico, LogroProfesional, Organismo, PremioDistincion,
)


# --- Catálogos ---

@admin.register(CatalogoInstitucion)
class CatalogoInstitucionAdmin(admin.ModelAdmin):
    list_display = ('id_institucion', 'nombre_institucion', 'activo')
    search_fields = ('nombre_institucion',)


@admin.register(CatalogoInstitucionEducativa)
class CatalogoInstitucionEducativaAdmin(admin.ModelAdmin):
    list_display = ('id_institucion_educativa', 'nombre_institucion', 'activo')
    search_fields = ('nombre_institucion',)


@admin.register(CatalogoNivelEstudio)
class CatalogoNivelEstudioAdmin(admin.ModelAdmin):
    list_display = ('id_nivel_estudio', 'desc_nivel_estudio')


@admin.register(CatalogoCarrera)
class CatalogoCarreraAdmin(admin.ModelAdmin):
    list_display = ('id_carrera', 'nombre_carrera')
    search_fields = ('nombre_carrera',)


@admin.register(CatalogoPais)
class CatalogoPaisAdmin(admin.ModelAdmin):
    list_display = ('id_pais', 'nombre_pais')
    search_fields = ('nombre_pais',)


@admin.register(CatalogoTipoCurso)
class CatalogoTipoCursoAdmin(admin.ModelAdmin):
    list_display = ('id_tipo_curso', 'desc_tipo_curso')


@admin.register(CatalogoCapacitacion)
class CatalogoCapacitacionAdmin(admin.ModelAdmin):
    list_display = ('id_tipo_capacitacion', 'desc_tipo_capacitacion')


@admin.register(CatalogoExperienciaLaboral)
class CatalogoExperienciaLaboralAdmin(admin.ModelAdmin):
    list_display = ('id_tipo_experiencia', 'desc_tipo_experiencia')


@admin.register(CatalogoOrganismo)
class CatalogoOrganismoAdmin(admin.ModelAdmin):
    list_display = ('id_organismo', 'nombre_organismo')
    search_fields = ('nombre_organismo',)


@admin.register(CatalogoPuestoInstitucional)
class CatalogoPuestoInstitucionalAdmin(admin.ModelAdmin):
    list_display = ('id_puesto', 'desc_puesto')


# --- Tablas principales ---

@admin.register(DatosGenerales)
class DatosGeneralesAdmin(admin.ModelAdmin):
    list_display = ('id_profesor', 'nombres', 'apellido_paterno', 'puesto_institucional', 'activo')
    search_fields = ('nombres', 'apellido_paterno', 'id_profesor')
    list_filter = ('activo',)


@admin.register(GestionUsuario)
class GestionUsuarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'correo', 'rol', 'profesor', 'activo')
    list_filter = ('rol', 'activo')


@admin.register(EstudioAcademico)
class EstudioAcademicoAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'titulo_estudio', 'nivel_estudio', 'institucion_educativa')


@admin.register(CapacitacionActualizacion)
class CapacitacionActualizacionAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'nombre_capacitacion', 'tipo_capacitacion', 'tipo_curso', 'institucion_educativa')


@admin.register(ExperienciaLaboral)
class ExperienciaLaboralAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'actividad_puesto', 'institucion', 'tipo_experiencia')


@admin.register(ProductoAcademico)
class ProductoAcademicoAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'institucion_educativa', 'anio_producto')


@admin.register(LogroProfesional)
class LogroProfesionalAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'desc_logro', 'institucion', 'anio_obtencion')


@admin.register(Organismo)
class OrganismoAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'organismo', 'anio_inicio', 'anio_fin')


@admin.register(PremioDistincion)
class PremioDistincionAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'desc_premio', 'anio_obtencion')
