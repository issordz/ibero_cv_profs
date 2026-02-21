"""
Django admin registration for IBERO GDD models.
"""

from django.contrib import admin
from .models import (
    DatosGenerales, UsuarioPortal, EstudioAcademico,
    ExperienciaLaboral, Capacitacion, LogroProfesional,
    Organismo, PremioDistincion, ProductoAcademico, Actualizacion,
)


@admin.register(DatosGenerales)
class DatosGeneralesAdmin(admin.ModelAdmin):
    list_display = ('id_profesor', 'nombres', 'apellido_paterno', 'correo_electronico', 'puesto_institucion', 'activo')
    search_fields = ('nombres', 'apellido_paterno', 'correo_electronico')
    list_filter = ('activo',)


@admin.register(UsuarioPortal)
class UsuarioPortalAdmin(admin.ModelAdmin):
    list_display = ('id', 'correo', 'rol', 'activo')
    list_filter = ('rol', 'activo')


@admin.register(EstudioAcademico)
class EstudioAcademicoAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'titulo_estudio', 'nivel_estudios', 'institucion')
    list_filter = ('nivel_estudios',)


@admin.register(ExperienciaLaboral)
class ExperienciaLaboralAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'actividad_puesto', 'organizacion_empresa', 'tipo_experiencia')
    list_filter = ('tipo_experiencia',)


@admin.register(Capacitacion)
class CapacitacionAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'nombre_capacitacion', 'tipo_capacitacion', 'institucion')


@admin.register(LogroProfesional)
class LogroProfesionalAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'desc_logro', 'institucion', 'anio_obtencion')


@admin.register(Organismo)
class OrganismoAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'organismo', 'anio_inicio', 'anio_fin')


@admin.register(PremioDistincion)
class PremioDistincionAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'desc_premio', 'institucion', 'anio_obtencion')


@admin.register(ProductoAcademico)
class ProductoAcademicoAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'id_publicacion', 'anio_producto')


@admin.register(Actualizacion)
class ActualizacionAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'nombre_actualizacion', 'tipo_actualizacion', 'anio')
