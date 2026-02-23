"""
Serializers for all IBERO GDD models.
"""

from rest_framework import serializers
from .models import (
    CatalogoInstitucion, DatosGenerales, GestionUsuario,
    EstudioAcademico, CapacitacionActualizacion, ExperienciaLaboral,
    ProductoAcademico, LogroProfesional, Organismo, PremioDistincion,
)


class CatalogoInstitucionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogoInstitucion
        fields = '__all__'


class DatosGeneralesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatosGenerales
        fields = '__all__'


class GestionUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = GestionUsuario
        fields = ['id', 'profesor', 'correo', 'rol', 'activo', 'fecha_carga', 'fecha_actualizacion']


class EstudioAcademicoSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(source='institucion.nombre_institucion', read_only=True, default=None)

    class Meta:
        model = EstudioAcademico
        fields = '__all__'


class CapacitacionActualizacionSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(source='institucion.nombre_institucion', read_only=True, default=None)

    class Meta:
        model = CapacitacionActualizacion
        fields = '__all__'


class ExperienciaLaboralSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(source='institucion.nombre_institucion', read_only=True, default=None)

    class Meta:
        model = ExperienciaLaboral
        fields = '__all__'


class ProductoAcademicoSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(source='institucion.nombre_institucion', read_only=True, default=None)

    class Meta:
        model = ProductoAcademico
        fields = '__all__'


class LogroProfesionalSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(source='institucion.nombre_institucion', read_only=True, default=None)

    class Meta:
        model = LogroProfesional
        fields = '__all__'


class OrganismoSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(source='institucion.nombre_institucion', read_only=True, default=None)

    class Meta:
        model = Organismo
        fields = '__all__'


class PremioDistincionSerializer(serializers.ModelSerializer):
    institucion_nombre = serializers.CharField(source='institucion.nombre_institucion', read_only=True, default=None)

    class Meta:
        model = PremioDistincion
        fields = '__all__'


# --- Auth serializers ---

class LoginSerializer(serializers.Serializer):
    correo = serializers.CharField()
    password = serializers.CharField()


class RegisterSerializer(serializers.Serializer):
    correo = serializers.CharField()
    password = serializers.CharField()
    rol = serializers.ChoiceField(choices=['profesor', 'admin'], default='profesor')
