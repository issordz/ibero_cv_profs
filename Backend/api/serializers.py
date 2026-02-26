"""
Serializers for IBERO Portal de gestión para acreditaciones.
"""

from rest_framework import serializers
from .models import (
    Career, Country, CourseType, EducationalInstitution, Institution,
    InstitutionalPosition, Organization, StudyLevel, Training,
    WorkExperienceType, Teacher, User,
    Education, Certification, WorkExperience, Resource,
    Achievement, Affiliation, Award,
)


# --- Catálogos ---

class CareerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class CourseTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseType
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class EducationalInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationalInstitution
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class InstitutionalPositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstitutionalPosition
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class StudyLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyLevel
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Training
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class WorkExperienceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperienceType
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


# --- Tablas principales ---

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class UserSerializer(serializers.ModelSerializer):
    teacher_nombre = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'teacher', 'teacher_nombre', 'correo', 'rol', 'activo',
                  'fecha_carga', 'fecha_actualizacion']
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']

    def get_teacher_nombre(self, obj):
        if obj.teacher:
            return f"{obj.teacher.nombres} {obj.teacher.apellido_paterno}"
        return None


class EducationSerializer(serializers.ModelSerializer):
    country_nombre = serializers.CharField(
        source='country.nombre_pais', read_only=True, default=None)
    educational_institution_nombre = serializers.CharField(
        source='educational_institution.nombre_institucion', read_only=True, default=None)
    study_level_nombre = serializers.CharField(
        source='study_level.desc_nivel_estudio', read_only=True, default=None)

    class Meta:
        model = Education
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class CertificationSerializer(serializers.ModelSerializer):
    country_nombre = serializers.CharField(
        source='country.nombre_pais', read_only=True, default=None)
    course_type_nombre = serializers.CharField(
        source='course_type.desc_tipo_curso', read_only=True, default=None)
    educational_institution_nombre = serializers.CharField(
        source='educational_institution.nombre_institucion', read_only=True, default=None)
    training_nombre = serializers.CharField(
        source='training.desc_tipo_capacitacion', read_only=True, default=None)

    class Meta:
        model = Certification
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class WorkExperienceSerializer(serializers.ModelSerializer):
    institution_nombre = serializers.CharField(
        source='institution.nombre_institucion', read_only=True, default=None)
    work_experience_nombre = serializers.CharField(
        source='work_experience.desc_tipo_experiencia', read_only=True, default=None)

    class Meta:
        model = WorkExperience
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class ResourceSerializer(serializers.ModelSerializer):
    educational_institution_nombre = serializers.CharField(
        source='educational_institution.nombre_institucion', read_only=True, default=None)

    class Meta:
        model = Resource
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class AchievementSerializer(serializers.ModelSerializer):
    institution_nombre = serializers.CharField(
        source='institution.nombre_institucion', read_only=True, default=None)

    class Meta:
        model = Achievement
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class AffiliationSerializer(serializers.ModelSerializer):
    organization_nombre = serializers.CharField(
        source='organization.nombre_organismo', read_only=True, default=None)

    class Meta:
        model = Affiliation
        fields = '__all__'
        read_only_fields = ['fecha_carga', 'fecha_actualizacion']


class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
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
