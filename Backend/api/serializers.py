"""
Serializers for all IBERO GDD models.
"""

from rest_framework import serializers
from .models import (
    DatosGenerales, UsuarioPortal, EstudioAcademico,
    ExperienciaLaboral, Capacitacion, LogroProfesional,
    Organismo, PremioDistincion, ProductoAcademico, Actualizacion,
)


class DatosGeneralesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatosGenerales
        fields = '__all__'


class UsuarioPortalSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioPortal
        fields = ['id', 'correo', 'rol', 'activo', 'fecha_carga', 'fecha_actualizacion']


class EstudioAcademicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstudioAcademico
        fields = '__all__'


class ExperienciaLaboralSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienciaLaboral
        fields = '__all__'


class CapacitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capacitacion
        fields = '__all__'


class LogroProfesionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogroProfesional
        fields = '__all__'


class OrganismoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organismo
        fields = '__all__'


class PremioDistincionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PremioDistincion
        fields = '__all__'


class ProductoAcademicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoAcademico
        fields = '__all__'


class ActualizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actualizacion
        fields = '__all__'


# --- Auth serializers ---

class LoginSerializer(serializers.Serializer):
    correo = serializers.CharField()
    password = serializers.CharField()


class RegisterSerializer(serializers.Serializer):
    correo = serializers.CharField()
    password = serializers.CharField()
    rol = serializers.ChoiceField(choices=['profesor', 'admin'], default='profesor')
