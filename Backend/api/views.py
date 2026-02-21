"""
Views for IBERO GDD API.
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
    DatosGenerales, UsuarioPortal, EstudioAcademico,
    ExperienciaLaboral, Capacitacion, LogroProfesional,
    Organismo, PremioDistincion, ProductoAcademico, Actualizacion,
)
from .serializers import (
    DatosGeneralesSerializer, EstudioAcademicoSerializer,
    ExperienciaLaboralSerializer, CapacitacionSerializer,
    LogroProfesionalSerializer, OrganismoSerializer,
    PremioDistincionSerializer, ProductoAcademicoSerializer,
    ActualizacionSerializer, LoginSerializer, RegisterSerializer,
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
    password = serializer.validated_data['password']

    try:
        usuario = UsuarioPortal.objects.get(correo=correo, activo=True)
    except UsuarioPortal.DoesNotExist:
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

    if not bcrypt.checkpw(password.encode('utf-8'), usuario.password.encode('utf-8')):
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

    token = _generate_token(usuario.id, usuario.correo, usuario.rol)

    # Try to find associated profesor data
    profesor_data = None
    try:
        profesor = DatosGenerales.objects.get(correo_electronico=correo)
        profesor_data = DatosGeneralesSerializer(profesor).data
    except DatosGenerales.DoesNotExist:
        pass

    return Response({
        'token': token,
        'user': {
            'id': usuario.id,
            'correo': usuario.correo,
            'rol': usuario.rol,
            'profesor': profesor_data,
        }
    })


@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    correo = serializer.validated_data['correo']
    password = serializer.validated_data['password']
    rol = serializer.validated_data.get('rol', 'profesor')

    if UsuarioPortal.objects.filter(correo=correo).exists():
        return Response({'error': 'El correo ya está registrado'}, status=status.HTTP_400_BAD_REQUEST)

    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    usuario = UsuarioPortal.objects.create(correo=correo, password=hashed, rol=rol)

    return Response({
        'id': usuario.id,
        'correo': usuario.correo,
        'rol': usuario.rol,
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def seed_view(request):
    """Seed initial data for development."""
    if UsuarioPortal.objects.exists():
        return Response({'message': 'Data already seeded'}, status=status.HTTP_200_OK)

    # Create professors
    profesores_data = [
        {
            'nombres': 'Ana', 'apellido_paterno': 'Martínez', 'apellido_materno': 'López',
            'fecha_nacimiento': '1980-03-15', 'correo_electronico': 'a.martinez@ibero.mx',
            'puesto_institucion': 'Profesora de Tiempo Completo',
            'resumen_profesional': 'Doctora en Ingeniería con más de 15 años de experiencia en docencia e investigación.',
        },
        {
            'nombres': 'Sergio', 'apellido_paterno': 'Rodríguez', 'apellido_materno': 'Hernández',
            'fecha_nacimiento': '1975-07-22', 'correo_electronico': 's.rodriguez@ibero.mx',
            'puesto_institucion': 'Coordinador Académico',
            'resumen_profesional': 'Maestro en Administración con experiencia en gestión académica y proyectos de vinculación.',
        },
        {
            'nombres': 'Juan', 'apellido_paterno': 'Ramos', 'apellido_materno': 'García',
            'fecha_nacimiento': '1985-11-10', 'correo_electronico': 'j.ramos@ibero.mx',
            'puesto_institucion': 'Profesor de Asignatura',
            'resumen_profesional': 'Ingeniero en Sistemas con especialidad en desarrollo de software y bases de datos.',
        },
    ]

    for p in profesores_data:
        DatosGenerales.objects.create(**p)

    # Create portal users (password: "ibero123" for all)
    default_pw = bcrypt.hashpw('ibero123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    UsuarioPortal.objects.create(correo='a.martinez@ibero.mx', password=default_pw, rol='profesor')
    UsuarioPortal.objects.create(correo='s.rodriguez@ibero.mx', password=default_pw, rol='profesor')
    UsuarioPortal.objects.create(correo='j.ramos@ibero.mx', password=default_pw, rol='profesor')
    UsuarioPortal.objects.create(correo='admin@ibero.mx', password=default_pw, rol='admin')

    return Response({'message': 'Seed data created successfully'}, status=status.HTTP_201_CREATED)


# ──────────────────────────────────────
# CRUD ViewSets
# ──────────────────────────────────────

class DatosGeneralesViewSet(viewsets.ModelViewSet):
    queryset = DatosGenerales.objects.filter(activo=True)
    serializer_class = DatosGeneralesSerializer


class EstudioAcademicoViewSet(viewsets.ModelViewSet):
    serializer_class = EstudioAcademicoSerializer

    def get_queryset(self):
        qs = EstudioAcademico.objects.filter(activo=True)
        profesor_id = self.request.query_params.get('profesor_id')
        if profesor_id:
            qs = qs.filter(profesor_id=profesor_id)
        return qs


class ExperienciaLaboralViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienciaLaboralSerializer

    def get_queryset(self):
        qs = ExperienciaLaboral.objects.filter(activo=True)
        profesor_id = self.request.query_params.get('profesor_id')
        if profesor_id:
            qs = qs.filter(profesor_id=profesor_id)
        return qs


class CapacitacionViewSet(viewsets.ModelViewSet):
    serializer_class = CapacitacionSerializer

    def get_queryset(self):
        qs = Capacitacion.objects.filter(activo=True)
        profesor_id = self.request.query_params.get('profesor_id')
        if profesor_id:
            qs = qs.filter(profesor_id=profesor_id)
        return qs


class LogroProfesionalViewSet(viewsets.ModelViewSet):
    serializer_class = LogroProfesionalSerializer

    def get_queryset(self):
        qs = LogroProfesional.objects.filter(activo=True)
        profesor_id = self.request.query_params.get('profesor_id')
        if profesor_id:
            qs = qs.filter(profesor_id=profesor_id)
        return qs


class OrganismoViewSet(viewsets.ModelViewSet):
    serializer_class = OrganismoSerializer

    def get_queryset(self):
        qs = Organismo.objects.filter(activo=True)
        profesor_id = self.request.query_params.get('profesor_id')
        if profesor_id:
            qs = qs.filter(profesor_id=profesor_id)
        return qs


class PremioDistincionViewSet(viewsets.ModelViewSet):
    serializer_class = PremioDistincionSerializer

    def get_queryset(self):
        qs = PremioDistincion.objects.filter(activo=True)
        profesor_id = self.request.query_params.get('profesor_id')
        if profesor_id:
            qs = qs.filter(profesor_id=profesor_id)
        return qs


class ProductoAcademicoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoAcademicoSerializer

    def get_queryset(self):
        qs = ProductoAcademico.objects.filter(activo=True)
        profesor_id = self.request.query_params.get('profesor_id')
        if profesor_id:
            qs = qs.filter(profesor_id=profesor_id)
        return qs


class ActualizacionViewSet(viewsets.ModelViewSet):
    serializer_class = ActualizacionSerializer

    def get_queryset(self):
        qs = Actualizacion.objects.filter(activo=True)
        profesor_id = self.request.query_params.get('profesor_id')
        if profesor_id:
            qs = qs.filter(profesor_id=profesor_id)
        return qs
