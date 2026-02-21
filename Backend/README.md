# IBERO - Gestor de Datos del Docente (Backend API)

API REST con **Django** + **Django REST Framework** + **SQLite/SQL Server** para el sistema de gestión de datos docentes de la Universidad Iberoamericana.

## Requisitos

- **Python 3.11+**
- **pip**

## Instalación

```bash
cd Backend
pip install -r requirements.txt
python manage.py migrate
```

## Ejecución

```bash
cd Backend
python manage.py runserver 8000
```

El servidor arranca en `http://localhost:8000`.
API browsable en `http://localhost:8000/api/`.

## Seed de datos iniciales

```bash
curl -X POST http://localhost:8000/api/auth/seed/
```

Usuarios creados (contraseña: `ibero123`):

| Rol | Correo | Contraseña |
|-----|--------|------------|
| Profesor | a.martinez@ibero.mx | ibero123 |
| Profesor | s.rodriguez@ibero.mx | ibero123 |
| Profesor | j.ramos@ibero.mx | ibero123 |
| Admin | admin@ibero.mx | ibero123 |

## Endpoints API

### Autenticación
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login/` | Iniciar sesión |
| POST | `/api/auth/register/` | Registrar usuario |
| POST | `/api/auth/seed/` | Datos iniciales de prueba |

### CRUD (todos soportan filtro `?profesor_id=N`)
| Método | Ruta | Descripción |
|--------|------|-------------|
| CRUD | `/api/datos-generales/` | Datos generales |
| CRUD | `/api/estudios-academicos/` | Estudios académicos |
| CRUD | `/api/experiencia-laboral/` | Experiencia laboral |
| CRUD | `/api/capacitacion/` | Capacitación |
| CRUD | `/api/logros-profesionales/` | Logros profesionales |
| CRUD | `/api/organismos/` | Organismos |
| CRUD | `/api/premios-distinciones/` | Premios y distinciones |
| CRUD | `/api/productos-academicos/` | Productos académicos |
| CRUD | `/api/actualizacion/` | Actualización |

## Panel de administración

```bash
python manage.py createsuperuser
# Acceder en http://localhost:8000/admin/
```

## Estructura del proyecto

```
Backend/
├── manage.py
├── requirements.txt
├── db.sqlite3
├── ibero_gdd/              # Proyecto Django
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── api/                    # App principal
│   ├── models.py           # 10 modelos del schema
│   ├── serializers.py      # Serializadores DRF
│   ├── views.py            # ViewSets CRUD + Auth
│   ├── urls.py             # Rutas API
│   ├── admin.py            # Panel admin
│   └── migrations/
└── database/
    ├── schema.sql           # Referencia SQL Server
    └── seed.sql             # Datos iniciales (referencia)
```

## Tecnologías

- **Django 4.2+** — Web framework
- **Django REST Framework** — API REST
- **django-cors-headers** — CORS para React
- **bcrypt** — Hash de contraseñas
- **PyJWT** — Autenticación por token JWT
