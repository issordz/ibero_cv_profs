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
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class CatalogoInstitucionEducativaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoInstitucionEducativa
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class CatalogoNivelEstudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoNivelEstudio
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class CatalogoCarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoCarrera
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class CatalogoPaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoPais
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class CatalogoTipoCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoTipoCurso
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class CatalogoCapacitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoCapacitacion
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class CatalogoExperienciaLaboralSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoExperienciaLaboral
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class CatalogoOrganismoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoOrganismo
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class CatalogoPuestoInstitucionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoPuestoInstitucional
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


# --- Tablas principales ---

class DatosGeneralesSerializer(serializers.ModelSerializer):
    puesto_institucional_nombre = serializers.CharField(
        source='puesto_institucional.desc_puesto', read_only=True, default=None)

    class Meta:
        model = DatosGenerales
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class GestionUsuarioSerializer(serializers.ModelSerializer):
    profesor_nombre = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = GestionUsuario
        fields = ['id', 'profesor', 'profesor_nombre', 'correo', 'rol', 'activo', 'fecha_carga', 'fecha_actualizacion']
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']

    def get_profesor_nombre(self, obj):
        if obj.profesor:
            return f"{obj.profesor.nombres} {obj.profesor.apellido_paterno}"
        return None


class EstudioAcademicoSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(
        source='institucion_educativa.nombre_institucion', read_only=True, default=None)
    nivel_estudio_nombre = serializers.CharField(
        source='nivel_estudio.desc_nivel_estudio', read_only=True, default=None)
    pais_nombre = serializers.CharField(
        source='pais.nombre_pais', read_only=True, default=None)

    class Meta:
        model = EstudioAcademico
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class CapacitacionActualizacionSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(
        source='institucion_educativa.nombre_institucion', read_only=True, default=None)
    tipo_capacitacion_nombre = serializers.CharField(
        source='tipo_capacitacion.desc_tipo_capacitacion', read_only=True, default=None)
    tipo_curso_nombre = serializers.CharField(
        source='tipo_curso.desc_tipo_curso', read_only=True, default=None)
    pais_nombre = serializers.CharField(
        source='pais.nombre_pais', read_only=True, default=None)

    class Meta:
        model = CapacitacionActualizacion
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class ExperienciaLaboralSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(
        source='institucion.nombre_institucion', read_only=True, default=None)
    tipo_experiencia_nombre = serializers.CharField(
        source='tipo_experiencia.desc_tipo_experiencia', read_only=True, default=None)

    class Meta:
        model = ExperienciaLaboral
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class ProductoAcademicoSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(
        source='institucion_educativa.nombre_institucion', read_only=True, default=None)

    class Meta:
        model = ProductoAcademico
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class LogroProfesionalSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(
        source='institucion.nombre_institucion', read_only=True, default=None)

    class Meta:
        model = LogroProfesional
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class OrganismoSerializer(serializers.ModelSerializer):
    organismo_nombre = serializers.CharField(
        source='organismo.nombre_organismo', read_only=True, default=None)

    class Meta:
        model = Organismo
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class PremioDistincionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PremioDistincion
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


# --- Auth serializers ---

class LoginSerializer(serializers.Serializer):
    correo = serializers.CharField()
    contrasena = serializers.CharField()


class RegisterSerializer(serializers.Serializer):
    correo = serializers.CharField()
    contrasena = serializers.CharField()
    rol = serializers.ChoiceField(choices=['profesor', 'admin'], default='profesor')
