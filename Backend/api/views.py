"""
Views for IBERO Portal de gestión para acreditaciones API.
Includes auth endpoints and CRUD viewsets for all profile sections.
"""

import datetime
import bcrypt
import jwt
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    Career, Country, CourseType, EducationalInstitution, Institution,
    InstitutionalPosition, Organization, StudyLevel, Training,
    WorkExperienceType, Teacher, User,
    Education, Certification, WorkExperience, Resource,
    Achievement, Affiliation, Award,
)
from .serializers import (
    CareerSerializer, CountrySerializer, CourseTypeSerializer,
    EducationalInstitutionSerializer, InstitutionSerializer,
    InstitutionalPositionSerializer, OrganizationSerializer,
    StudyLevelSerializer, TrainingSerializer, WorkExperienceTypeSerializer,
    TeacherSerializer, EducationSerializer, CertificationSerializer,
    WorkExperienceSerializer, ResourceSerializer, AchievementSerializer,
    AffiliationSerializer, AwardSerializer, LoginSerializer, RegisterSerializer,
)


# ──────────────────────────────────────
# Auth views
# ──────────────────────────────────────

def _generate_token(user_id, correo, rol):
    payload = {
        'user_id': user_id,
        'correo': correo,
        'rol': rol,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=settings.JWT_EXPIRATION_HOURS),
        'iat': datetime.datetime.utcnow(),
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    correo = serializer.validated_data['correo']
    contrasena = serializer.validated_data['contrasena']

    try:
        usuario = User.objects.select_related('teacher').get(correo=correo, activo=True)
    except User.DoesNotExist:
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

    if not bcrypt.checkpw(contrasena.encode('utf-8'), usuario.contrasena.encode('utf-8')):
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

    token = _generate_token(usuario.id, usuario.correo, usuario.rol)

    teacher_data = TeacherSerializer(usuario.teacher).data if usuario.teacher else None

    return Response({
        'token': token,
        'user': {
            'id': usuario.id,
            'correo': usuario.correo,
            'rol': usuario.rol,
            'teacher': teacher_data,
        }
    })


@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    correo = serializer.validated_data['correo']
    contrasena = serializer.validated_data['contrasena']
    rol = serializer.validated_data.get('rol', 'profesor')

    if User.objects.filter(correo=correo).exists():
        return Response({'error': 'El correo ya está registrado'}, status=status.HTTP_400_BAD_REQUEST)

    # Create a Teacher record for the new user
    teacher = Teacher.objects.create(nombres='', apellido_paterno='')
    hashed = bcrypt.hashpw(contrasena.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    usuario = User.objects.create(correo=correo, contrasena=hashed, rol=rol, teacher=teacher)

    return Response({
        'id': usuario.id,
        'correo': usuario.correo,
        'rol': usuario.rol,
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def seed_view(request):
    """Seed initial data for development."""
    if User.objects.exists():
        return Response({'message': 'Data already seeded'}, status=status.HTTP_200_OK)

    # Seed catálogos
    for nombre in ['Empresa ABC', 'Gobierno Federal', 'Consultora XYZ', 'Hospital General']:
        Institution.objects.create(nombre_institucion=nombre)

    for nombre in ['Universidad Iberoamericana', 'UNAM', 'MIT', 'IPN',
                   'Tecnológico de Monterrey', 'Stanford University',
                   'Autodesk University', 'Harvard University']:
        EducationalInstitution.objects.create(nombre_institucion=nombre)

    for nivel in ['Técnico Superior', 'Licenciatura', 'Especialidad', 'Maestría', 'Doctorado', 'Postdoctorado']:
        StudyLevel.objects.create(desc_nivel_estudio=nivel)

    for carrera in ['Ingeniería Civil', 'Administración de Empresas', 'Ingeniería en Sistemas',
                    'Derecho', 'Arquitectura', 'Psicología', 'Medicina']:
        Career.objects.create(nombre_carrera=carrera)

    for pais in ['México', 'Estados Unidos', 'España', 'Canadá', 'Reino Unido',
                 'Alemania', 'Francia', 'Brasil', 'Argentina', 'Colombia']:
        Country.objects.create(nombre_pais=pais)

    for tipo in ['Presencial', 'En línea', 'Híbrido']:
        CourseType.objects.create(desc_tipo_curso=tipo)

    for tipo in ['Curso', 'Diplomado', 'Taller', 'Seminario', 'Certificación', 'Congreso']:
        Training.objects.create(desc_tipo_capacitacion=tipo)

    for tipo in ['Docencia', 'Investigación', 'Industria', 'Consultoría', 'Gobierno']:
        WorkExperienceType.objects.create(desc_tipo_experiencia=tipo)

    for org in ['PMI', 'Colegio de Ingenieros', 'IEEE', 'ACM', 'CONACYT']:
        Organization.objects.create(nombre_organismo=org)

    for puesto in ['Profesor de Tiempo Completo', 'Profesor de Asignatura',
                   'Coordinador Académico', 'Director de Departamento', 'Investigador']:
        InstitutionalPosition.objects.create(desc_puesto=puesto)

    # Create teachers (auto-increment id)
    teachers = [
        Teacher.objects.create(
            nombres='Ana', apellido_paterno='Martínez', apellido_materno='López',
            fecha_de_nacimiento='1980-03-15',
            puesto_institucional='Profesora de Tiempo Completo',
            resumen_profesional='Doctora en Ingeniería con más de 15 años de experiencia en docencia e investigación.',
        ),
        Teacher.objects.create(
            nombres='Sergio', apellido_paterno='Rodríguez', apellido_materno='Hernández',
            fecha_de_nacimiento='1975-07-22',
            puesto_institucional='Coordinador Académico',
            resumen_profesional='Maestro en Administración con experiencia en gestión académica y proyectos de vinculación.',
        ),
        Teacher.objects.create(
            nombres='Juan', apellido_paterno='Ramos', apellido_materno='García',
            fecha_de_nacimiento='1985-11-10',
            puesto_institucional='Profesor de Asignatura',
            resumen_profesional='Ingeniero en Sistemas con especialidad en desarrollo de software y bases de datos.',
        ),
    ]

    # Create portal users (contrasena: "ibero123" for all)
    default_pw = bcrypt.hashpw('ibero123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    # Teacher for admin
    admin_teacher = Teacher.objects.create(nombres='Admin', apellido_paterno='Sistema')

    User.objects.create(correo='a.martinez@ibero.mx', contrasena=default_pw, rol='profesor', teacher=teachers[0])
    User.objects.create(correo='s.rodriguez@ibero.mx', contrasena=default_pw, rol='profesor', teacher=teachers[1])
    User.objects.create(correo='j.ramos@ibero.mx', contrasena=default_pw, rol='profesor', teacher=teachers[2])
    User.objects.create(correo='admin@ibero.mx', contrasena=default_pw, rol='admin', teacher=admin_teacher)

    return Response({'message': 'Seed data created successfully'}, status=status.HTTP_201_CREATED)


# ──────────────────────────────────────
# CRUD ViewSets – Catálogos
# ──────────────────────────────────────

class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer


class EducationalInstitutionViewSet(viewsets.ModelViewSet):
    queryset = EducationalInstitution.objects.all()
    serializer_class = EducationalInstitutionSerializer


class StudyLevelViewSet(viewsets.ModelViewSet):
    queryset = StudyLevel.objects.all()
    serializer_class = StudyLevelSerializer


class CareerViewSet(viewsets.ModelViewSet):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class CourseTypeViewSet(viewsets.ModelViewSet):
    queryset = CourseType.objects.all()
    serializer_class = CourseTypeSerializer


class TrainingViewSet(viewsets.ModelViewSet):
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer


class WorkExperienceTypeViewSet(viewsets.ModelViewSet):
    queryset = WorkExperienceType.objects.all()
    serializer_class = WorkExperienceTypeSerializer


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer


class InstitutionalPositionViewSet(viewsets.ModelViewSet):
    queryset = InstitutionalPosition.objects.all()
    serializer_class = InstitutionalPositionSerializer


# ──────────────────────────────────────
# CRUD ViewSets – Tablas principales
# ──────────────────────────────────────

class TeacherViewSet(viewsets.ModelViewSet):
    serializer_class = TeacherSerializer

    def get_queryset(self):
        return Teacher.objects.filter(activo=True)


class EducationViewSet(viewsets.ModelViewSet):
    serializer_class = EducationSerializer

    def get_queryset(self):
        qs = Education.objects.select_related('study_level', 'educational_institution', 'country')
        teacher_id = self.request.query_params.get('teacher_id')
        if teacher_id:
            qs = qs.filter(teacher_id=teacher_id)
        return qs


class CertificationViewSet(viewsets.ModelViewSet):
    serializer_class = CertificationSerializer

    def get_queryset(self):
        qs = Certification.objects.select_related(
            'training', 'educational_institution', 'course_type', 'country')
        teacher_id = self.request.query_params.get('teacher_id')
        if teacher_id:
            qs = qs.filter(teacher_id=teacher_id)
        return qs


class WorkExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = WorkExperienceSerializer

    def get_queryset(self):
        qs = WorkExperience.objects.select_related('institution', 'work_experience')
        teacher_id = self.request.query_params.get('teacher_id')
        if teacher_id:
            qs = qs.filter(teacher_id=teacher_id)
        return qs


class ResourceViewSet(viewsets.ModelViewSet):
    serializer_class = ResourceSerializer

    def get_queryset(self):
        qs = Resource.objects.select_related('educational_institution')
        teacher_id = self.request.query_params.get('teacher_id')
        if teacher_id:
            qs = qs.filter(teacher_id=teacher_id)
        return qs


class AchievementViewSet(viewsets.ModelViewSet):
    serializer_class = AchievementSerializer

    def get_queryset(self):
        qs = Achievement.objects.select_related('institution')
        teacher_id = self.request.query_params.get('teacher_id')
        if teacher_id:
            qs = qs.filter(teacher_id=teacher_id)
        return qs


class AffiliationViewSet(viewsets.ModelViewSet):
    serializer_class = AffiliationSerializer

    def get_queryset(self):
        qs = Affiliation.objects.select_related('organization')
        teacher_id = self.request.query_params.get('teacher_id')
        if teacher_id:
            qs = qs.filter(teacher_id=teacher_id)
        return qs


class AwardViewSet(viewsets.ModelViewSet):
    serializer_class = AwardSerializer

    def get_queryset(self):
        qs = Award.objects.all()
        teacher_id = self.request.query_params.get('teacher_id')
        if teacher_id:
            qs = qs.filter(teacher_id=teacher_id)
        return qs
