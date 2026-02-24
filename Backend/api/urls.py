"""
URL routing for the IBERO Portal de gestión para acreditaciones API.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

# Catálogos
router.register(r'catalogo-instituciones', views.CatalogoInstitucionViewSet, basename='catalogo-instituciones')
router.register(r'catalogo-instituciones-educativas', views.CatalogoInstitucionEducativaViewSet, basename='catalogo-instituciones-educativas')
router.register(r'catalogo-nivel-estudio', views.CatalogoNivelEstudioViewSet, basename='catalogo-nivel-estudio')
router.register(r'catalogo-carreras', views.CatalogoCarreraViewSet, basename='catalogo-carreras')
router.register(r'catalogo-paises', views.CatalogoPaisViewSet, basename='catalogo-paises')
router.register(r'catalogo-tipo-curso', views.CatalogoTipoCursoViewSet, basename='catalogo-tipo-curso')
router.register(r'catalogo-capacitacion', views.CatalogoCapacitacionViewSet, basename='catalogo-capacitacion')
router.register(r'catalogo-experiencia-laboral', views.CatalogoExperienciaLaboralViewSet, basename='catalogo-experiencia-laboral')
router.register(r'catalogo-organismos', views.CatalogoOrganismoViewSet, basename='catalogo-organismos')
router.register(r'catalogo-puesto-institucional', views.CatalogoPuestoInstitucionalViewSet, basename='catalogo-puesto-institucional')

# Tablas principales
router.register(r'datos-generales', views.DatosGeneralesViewSet, basename='datos-generales')
router.register(r'estudios-academicos', views.EstudioAcademicoViewSet, basename='estudios-academicos')
router.register(r'capacitacion-actualizacion', views.CapacitacionActualizacionViewSet, basename='capacitacion-actualizacion')
router.register(r'experiencia-laboral', views.ExperienciaLaboralViewSet, basename='experiencia-laboral')
router.register(r'productos-academicos', views.ProductoAcademicoViewSet, basename='productos-academicos')
router.register(r'logros-profesionales', views.LogroProfesionalViewSet, basename='logros-profesionales')
router.register(r'organismos', views.OrganismoViewSet, basename='organismos')
router.register(r'premios-distinciones', views.PremioDistincionViewSet, basename='premios-distinciones')

urlpatterns = [
    path('auth/login/', views.login_view, name='login'),
    path('auth/register/', views.register_view, name='register'),
    path('auth/seed/', views.seed_view, name='seed'),
    path('', include(router.urls)),
]
