"""
URL routing for the IBERO Portal de gestión para acreditaciones API.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

# Catálogos
router.register(r'catalogo-instituciones', views.InstitutionViewSet, basename='catalogo-instituciones')
router.register(r'catalogo-instituciones-educativas', views.EducationalInstitutionViewSet, basename='catalogo-instituciones-educativas')
router.register(r'catalogo-nivel-estudio', views.StudyLevelViewSet, basename='catalogo-nivel-estudio')
router.register(r'catalogo-carreras', views.CareerViewSet, basename='catalogo-carreras')
router.register(r'catalogo-paises', views.CountryViewSet, basename='catalogo-paises')
router.register(r'catalogo-tipo-curso', views.CourseTypeViewSet, basename='catalogo-tipo-curso')
router.register(r'catalogo-capacitacion', views.TrainingViewSet, basename='catalogo-capacitacion')
router.register(r'catalogo-experiencia-laboral', views.WorkExperienceTypeViewSet, basename='catalogo-experiencia-laboral')
router.register(r'catalogo-organismos', views.OrganizationViewSet, basename='catalogo-organismos')
router.register(r'catalogo-puesto-institucional', views.InstitutionalPositionViewSet, basename='catalogo-puesto-institucional')

# Tablas principales
router.register(r'datos-generales', views.TeacherViewSet, basename='datos-generales')
router.register(r'estudios-academicos', views.EducationViewSet, basename='estudios-academicos')
router.register(r'capacitacion-actualizacion', views.CertificationViewSet, basename='capacitacion-actualizacion')
router.register(r'experiencia-laboral', views.WorkExperienceViewSet, basename='experiencia-laboral')
router.register(r'productos-academicos', views.ResourceViewSet, basename='productos-academicos')
router.register(r'logros-profesionales', views.AchievementViewSet, basename='logros-profesionales')
router.register(r'organismos', views.AffiliationViewSet, basename='organismos')
router.register(r'premios-distinciones', views.AwardViewSet, basename='premios-distinciones')

urlpatterns = [
    path('auth/login/', views.login_view, name='login'),
    path('auth/register/', views.register_view, name='register'),
    path('auth/seed/', views.seed_view, name='seed'),
    path('', include(router.urls)),
]
