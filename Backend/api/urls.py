"""
URL routing for the IBERO GDD API.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'catalogo-instituciones', views.CatalogoInstitucionViewSet, basename='catalogo-instituciones')
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
