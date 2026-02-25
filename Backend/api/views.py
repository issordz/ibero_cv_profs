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
    CatalogoInstitucion, CatalogoInstitucionEducativa, CatalogoNivelEstudio,
    CatalogoCarrera, CatalogoPais, CatalogoTipoCurso, CatalogoCapacitacion,
    CatalogoExperienciaLaboral, CatalogoOrganismo, CatalogoPuestoInstitucional,
    DatosGenerales, GestionUsuario,
    EstudioAcademico, CapacitacionActualizacion, ExperienciaLaboral,
    ProductoAcademico, LogroProfesional, Organismo, PremioDistincion,
)
from .serializers import (
    CatalogoInstitucionSerializer, CatalogoInstitucionEducativaSerializer,
    CatalogoNivelEstudioSerializer, CatalogoCarreraSerializer,
    CatalogoPaisSerializer, CatalogoTipoCursoSerializer,
    CatalogoCapacitacionSerializer, CatalogoExperienciaLaboralSerializer,
    CatalogoOrganismoSerializer, CatalogoPuestoInstitucionalSerializer,
    DatosGeneralesSerializer,
    EstudioAcademicoSerializer, CapacitacionActualizacionSerializer,
    ExperienciaLaboralSerializer, ProductoAcademicoSerializer,
    LogroProfesionalSerializer, OrganismoSerializer,
    PremioDistincionSerializer, LoginSerializer, RegisterSerializer,
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
        usuario = GestionUsuario.objects.get(correo=correo, activo=True)
    except GestionUsuario.DoesNotExist:
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

    if not bcrypt.checkpw(contrasena.encode('utf-8'), usuario.contrasena.encode('utf-8')):
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

    token = _generate_token(usuario.id, usuario.correo, usuario.rol)

    # Try to find associated profesor data via FK
    profesor_data = None
    if usuario.profesor:
        profesor_data = DatosGeneralesSerializer(usuario.profesor).data

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
    contrasena = serializer.validated_data['contrasena']
    rol = serializer.validated_data.get('rol', 'profesor')

    if GestionUsuario.objects.filter(correo=correo).exists():
        return Response({'error': 'El correo ya está registrado'}, status=status.HTTP_400_BAD_REQUEST)

    hashed = bcrypt.hashpw(contrasena.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    usuario = GestionUsuario.objects.create(correo=correo, contrasena=hashed, rol=rol)

    return Response({
        'id': usuario.id,
        'correo': usuario.correo,
        'rol': usuario.rol,
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def seed_view(request):
    """Seed initial data for development."""
    if GestionUsuario.objects.exists():
        return Response({'message': 'Data already seeded'}, status=status.HTTP_200_OK)

    # Seed catálogos
    # --- Instituciones (generales) ---
    inst_generales = ['Empresa ABC', 'Gobierno Federal', 'Consultora XYZ', 'Hospital General']
    for nombre in inst_generales:
        CatalogoInstitucion.objects.create(nombre_institucion=nombre)

    # --- Instituciones Educativas ---
    inst_educativas_nombres = [
        'Universidad Iberoamericana', 'UNAM', 'MIT', 'IPN',
        'Tecnológico de Monterrey', 'Stanford University',
        'Autodesk University', 'Harvard University',
    ]
    inst_edu_map = {}
    for nombre in inst_educativas_nombres:
        inst = CatalogoInstitucionEducativa.objects.create(nombre_institucion=nombre)
        inst_edu_map[nombre] = inst

    # --- Nivel de Estudio ---
    for nivel in ['Técnico Superior', 'Licenciatura', 'Especialidad', 'Maestría', 'Doctorado', 'Postdoctorado']:
        CatalogoNivelEstudio.objects.create(desc_nivel_estudio=nivel)

    # --- Carreras ---
    for carrera in ['Ingeniería Civil', 'Administración de Empresas', 'Ingeniería en Sistemas',
                    'Derecho', 'Arquitectura', 'Psicología', 'Medicina']:
        CatalogoCarrera.objects.create(nombre_carrera=carrera)

    # --- Países ---
    for pais in ['México', 'Estados Unidos', 'España', 'Canadá', 'Reino Unido',
                 'Alemania', 'Francia', 'Brasil', 'Argentina', 'Colombia']:
        CatalogoPais.objects.create(nombre_pais=pais)

    # --- Tipo de Curso ---
    for tipo in ['Presencial', 'En línea', 'Híbrido']:
        CatalogoTipoCurso.objects.create(desc_tipo_curso=tipo)

    # --- Tipo de Capacitación ---
    for tipo in ['Curso', 'Diplomado', 'Taller', 'Seminario', 'Certificación', 'Congreso']:
        CatalogoCapacitacion.objects.create(desc_tipo_capacitacion=tipo)

    # --- Tipo de Experiencia Laboral ---
    for tipo in ['Docencia', 'Investigación', 'Industria', 'Consultoría', 'Gobierno']:
        CatalogoExperienciaLaboral.objects.create(desc_tipo_experiencia=tipo)

    # --- Organismos ---
    for org in ['PMI', 'Colegio de Ingenieros', 'IEEE', 'ACM', 'CONACYT']:
        CatalogoOrganismo.objects.create(nombre_organismo=org)

    # --- Puesto Institucional ---
    for puesto in ['Profesor de Tiempo Completo', 'Profesor de Asignatura',
                   'Coordinador Académico', 'Director de Departamento', 'Investigador']:
        CatalogoPuestoInstitucional.objects.create(desc_puesto=puesto)

    # Create professors (id_profesor = employee number)
    # Get catalog references for seed
    puesto_tc = CatalogoPuestoInstitucional.objects.get(desc_puesto='Profesor de Tiempo Completo')
    puesto_coord = CatalogoPuestoInstitucional.objects.get(desc_puesto='Coordinador Académico')
    puesto_asig = CatalogoPuestoInstitucional.objects.get(desc_puesto='Profesor de Asignatura')

    profesores_data = [
        {
            'id_profesor': 'PROF000001',
            'nombres': 'Ana', 'apellido_paterno': 'Martínez', 'apellido_materno': 'López',
            'fecha_de_nacimiento': '1980-03-15',
            'puesto_institucional': puesto_tc,
            'resumen_profesional': 'Doctora en Ingeniería con más de 15 años de experiencia en docencia e investigación.',
        },
        {
            'id_profesor': 'PROF000002',
            'nombres': 'Sergio', 'apellido_paterno': 'Rodríguez', 'apellido_materno': 'Hernández',
            'fecha_de_nacimiento': '1975-07-22',
            'puesto_institucional': puesto_coord,
            'resumen_profesional': 'Maestro en Administración con experiencia en gestión académica y proyectos de vinculación.',
        },
        {
            'id_profesor': 'PROF000003',
            'nombres': 'Juan', 'apellido_paterno': 'Ramos', 'apellido_materno': 'García',
            'fecha_de_nacimiento': '1985-11-10',
            'puesto_institucional': puesto_asig,
            'resumen_profesional': 'Ingeniero en Sistemas con especialidad en desarrollo de software y bases de datos.',
        },
    ]

    profesores = []
    for p in profesores_data:
        profesores.append(DatosGenerales.objects.create(**p))

    # Create portal users (contrasena: "ibero123" for all)
    default_pw = bcrypt.hashpw('ibero123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    GestionUsuario.objects.create(correo='a.martinez@ibero.mx', contrasena=default_pw, rol='profesor', profesor=profesores[0])
    GestionUsuario.objects.create(correo='s.rodriguez@ibero.mx', contrasena=default_pw, rol='profesor', profesor=profesores[1])
    GestionUsuario.objects.create(correo='j.ramos@ibero.mx', contrasena=default_pw, rol='profesor', profesor=profesores[2])
    GestionUsuario.objects.create(correo='admin@ibero.mx', contrasena=default_pw, rol='admin')

    return Response({'message': 'Seed data created successfully'}, status=status.HTTP_201_CREATED)


# ──────────────────────────────────────
# CRUD ViewSets – Catálogos
# ──────────────────────────────────────

class CatalogoInstitucionViewSet(viewsets.ModelViewSet):
    queryset = CatalogoInstitucion.objects.all()
    serializer_class = CatalogoInstitucionSerializer


class CatalogoInstitucionEducativaViewSet(viewsets.ModelViewSet):
    queryset = CatalogoInstitucionEducativa.objects.all()
    serializer_class = CatalogoInstitucionEducativaSerializer


class CatalogoNivelEstudioViewSet(viewsets.ModelViewSet):
    queryset = CatalogoNivelEstudio.objects.all()
    serializer_class = CatalogoNivelEstudioSerializer


class CatalogoCarreraViewSet(viewsets.ModelViewSet):
    queryset = CatalogoCarrera.objects.all()
    serializer_class = CatalogoCarreraSerializer


class CatalogoPaisViewSet(viewsets.ModelViewSet):
    queryset = CatalogoPais.objects.all()
    serializer_class = CatalogoPaisSerializer


class CatalogoTipoCursoViewSet(viewsets.ModelViewSet):
    queryset = CatalogoTipoCurso.objects.all()
    serializer_class = CatalogoTipoCursoSerializer


class CatalogoCapacitacionViewSet(viewsets.ModelViewSet):
    queryset = CatalogoCapacitacion.objects.all()
    serializer_class = CatalogoCapacitacionSerializer


class CatalogoExperienciaLaboralViewSet(viewsets.ModelViewSet):
    queryset = CatalogoExperienciaLaboral.objects.all()
    serializer_class = CatalogoExperienciaLaboralSerializer


class CatalogoOrganismoViewSet(viewsets.ModelViewSet):
    queryset = CatalogoOrganismo.objects.all()
    serializer_class = CatalogoOrganismoSerializer


class CatalogoPuestoInstitucionalViewSet(viewsets.ModelViewSet):
    queryset = CatalogoPuestoInstitucional.objects.all()
    serializer_class = CatalogoPuestoInstitucionalSerializer


# ──────────────────────────────────────
# CRUD ViewSets – Tablas principales
# ──────────────────────────────────────

class DatosGeneralesViewSet(viewsets.ModelViewSet):
    serializer_class = DatosGeneralesSerializer

    def get_queryset(self):
        return DatosGenerales.objects.filter(activo=True).select_related('puesto_institucional')


class EstudioAcademicoViewSet(viewsets.ModelViewSet):
    serializer_class = EstudioAcademicoSerializer

    def get_queryset(self):
        qs = EstudioAcademico.objects.select_related('nivel_estudio', 'institucion_educativa', 'pais')
        profesor_id = self.request.query_params.get('profesor_id')
        if profesor_id:
            qs = qs.filter(profesor_id=profesor_id)
        return qs


class CapacitacionActualizacionViewSet(viewsets.ModelViewSet):
    serializer_class = CapacitacionActualizacionSerializer

    def get_queryset(self):
        qs = CapacitacionActualizacion.objects.select_related(
            'tipo_capacitacion', 'institucion_educativa', 'tipo_curso', 'pais')
        profesor_id = self.request.query_params.get('profesor_id')
        if profesor_id:
            qs = qs.filter(profesor_id=profesor_id)
        return qs


class ExperienciaLaboralViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienciaLaboralSerializer

    def get_queryset(self):
        qs = ExperienciaLaboral.objects.select_related('institucion', 'tipo_experiencia')
        profesor_id = self.request.query_params.get('profesor_id')
        if profesor_id:
            qs = qs.filter(profesor_id=profesor_id)
        return qs


class ProductoAcademicoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoAcademicoSerializer

    def get_queryset(self):
        qs = ProductoAcademico.objects.select_related('institucion_educativa')
        profesor_id = self.request.query_params.get('profesor_id')
        if profesor_id:
            qs = qs.filter(profesor_id=profesor_id)
        return qs


class LogroProfesionalViewSet(viewsets.ModelViewSet):
    serializer_class = LogroProfesionalSerializer

    def get_queryset(self):
        qs = LogroProfesional.objects.select_related('institucion')
        profesor_id = self.request.query_params.get('profesor_id')
        if profesor_id:
            qs = qs.filter(profesor_id=profesor_id)
        return qs


class OrganismoViewSet(viewsets.ModelViewSet):
    serializer_class = OrganismoSerializer

    def get_queryset(self):
        qs = Organismo.objects.select_related('organismo')
        profesor_id = self.request.query_params.get('profesor_id')
        if profesor_id:
            qs = qs.filter(profesor_id=profesor_id)
        return qs


class PremioDistincionViewSet(viewsets.ModelViewSet):
    serializer_class = PremioDistincionSerializer

    def get_queryset(self):
        qs = PremioDistincion.objects.all()
        profesor_id = self.request.query_params.get('profesor_id')
        if profesor_id:
            qs = qs.filter(profesor_id=profesor_id)
        return qs
