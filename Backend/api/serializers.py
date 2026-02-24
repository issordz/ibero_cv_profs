"""
Serializers for all IBERO Portal de gestión para acreditaciones models.
"""

from rest_framework import serializers
from .models import (
    CatalogoInstitucion, CatalogoInstitucionEducativa, CatalogoNivelEstudio,
    CatalogoCarrera, CatalogoPais, CatalogoTipoCurso, CatalogoCapacitacion,
    CatalogoExperienciaLaboral, CatalogoOrganismo, CatalogoPuestoInstitucional,
    DatosGenerales, GestionUsuario,
    EstudioAcademico, CapacitacionActualizacion, ExperienciaLaboral,
    ProductoAcademico, LogroProfesional, Organismo, PremioDistincion,
)


# --- Catálogos ---

class CatalogoInstitucionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoInstitucion
        fields = '__all__'


class CatalogoInstitucionEducativaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoInstitucionEducativa
        fields = '__all__'


class CatalogoNivelEstudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoNivelEstudio
        fields = '__all__'


class CatalogoCarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoCarrera
        fields = '__all__'


class CatalogoPaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoPais
        fields = '__all__'


class CatalogoTipoCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoTipoCurso
        fields = '__all__'


class CatalogoCapacitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoCapacitacion
        fields = '__all__'


class CatalogoExperienciaLaboralSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoExperienciaLaboral
        fields = '__all__'


class CatalogoOrganismoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoOrganismo
        fields = '__all__'


class CatalogoPuestoInstitucionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoPuestoInstitucional
        fields = '__all__'


# --- Tablas principales ---

class DatosGeneralesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatosGenerales
        fields = '__all__'


class GestionUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = GestionUsuario
        fields = ['id', 'profesor', 'correo', 'rol', 'activo', 'fecha_carga', 'fecha_actualizacion']


class EstudioAcademicoSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(
        source='institucion_educativa.nombre_institucion', read_only=True, default=None)
    nivel_estudio_nombre = serializers.CharField(
        source='nivel_estudio.desc_nivel_estudio', read_only=True, default=None)

    class Meta:
        model = EstudioAcademico
        fields = '__all__'


class CapacitacionActualizacionSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(
        source='institucion_educativa.nombre_institucion', read_only=True, default=None)
    tipo_capacitacion_nombre = serializers.CharField(
        source='tipo_capacitacion.desc_tipo_capacitacion', read_only=True, default=None)
    tipo_curso_nombre = serializers.CharField(
        source='tipo_curso.desc_tipo_curso', read_only=True, default=None)

    class Meta:
        model = CapacitacionActualizacion
        fields = '__all__'


class ExperienciaLaboralSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(
        source='institucion.nombre_institucion', read_only=True, default=None)
    tipo_experiencia_nombre = serializers.CharField(
        source='tipo_experiencia.desc_tipo_experiencia', read_only=True, default=None)

    class Meta:
        model = ExperienciaLaboral
        fields = '__all__'


class ProductoAcademicoSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(
        source='institucion_educativa.nombre_institucion', read_only=True, default=None)

    class Meta:
        model = ProductoAcademico
        fields = '__all__'


class LogroProfesionalSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(
        source='institucion.nombre_institucion', read_only=True, default=None)

    class Meta:
        model = LogroProfesional
        fields = '__all__'


class OrganismoSerializer(serializers.ModelSerializer):
    organismo_nombre = serializers.CharField(
        source='organismo.nombre_organismo', read_only=True, default=None)

    class Meta:
        model = Organismo
        fields = '__all__'


class PremioDistincionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PremioDistincion
        fields = '__all__'


# --- Auth serializers ---

class LoginSerializer(serializers.Serializer):
    correo = serializers.CharField()
    contrasena = serializers.CharField()


class RegisterSerializer(serializers.Serializer):
    correo = serializers.CharField()
    contrasena = serializers.CharField()
    rol = serializers.ChoiceField(choices=['profesor', 'admin'], default='profesor')
