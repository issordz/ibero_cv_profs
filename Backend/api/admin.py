"""
Django admin registration for IBERO GDD models.
"""

from django.contrib import admin
from .models import (
    CatalogoInstitucion, DatosGenerales, GestionUsuario,
    EstudioAcademico, CapacitacionActualizacion, ExperienciaLaboral,
    ProductoAcademico, LogroProfesional, Organismo, PremioDistincion,
)


@admin.register(CatalogoInstitucion)
class CatalogoInstitucionAdmin(admin.ModelAdmin):
    list_display = ('id_institucion', 'nombre_institucion')
    search_fields = ('nombre_institucion',)


@admin.register(DatosGenerales)
class DatosGeneralesAdmin(admin.ModelAdmin):
    list_display = ('id_profesor', 'nombres', 'apellido_paterno', 'puesto_institucion', 'activo')
    search_fields = ('nombres', 'apellido_paterno')
    list_filter = ('activo',)


@admin.register(GestionUsuario)
class GestionUsuarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'correo', 'rol', 'profesor', 'activo')
    list_filter = ('rol', 'activo')


@admin.register(EstudioAcademico)
class EstudioAcademicoAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'titulo_estudio', 'nivel_estudio', 'institucion')
    list_filter = ('nivel_estudio',)


@admin.register(CapacitacionActualizacion)
class CapacitacionActualizacionAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'nombre_capacitacion', 'tipo_capacitacion', 'tip_tipo_curso', 'institucion')
    list_filter = ('tip_tipo_curso',)


@admin.register(ExperienciaLaboral)
class ExperienciaLaboralAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'actividad_puesto', 'institucion', 'tipo_experiencia')
    list_filter = ('tipo_experiencia',)


@admin.register(ProductoAcademico)
class ProductoAcademicoAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'id_publicacion', 'institucion', 'anio_producto')


@admin.register(LogroProfesional)
class LogroProfesionalAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'desc_logro', 'institucion', 'anio_obtencion')


@admin.register(Organismo)
class OrganismoAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'institucion', 'anio_inicio', 'anio_fin')


@admin.register(PremioDistincion)
class PremioDistincionAdmin(admin.ModelAdmin):
    list_display = ('id', 'profesor', 'desc_premio', 'institucion', 'anio_obtencion')
