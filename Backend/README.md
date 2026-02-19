# IBERO - Gestor de Datos del Docente (Backend API)

API REST con **ASP.NET Core 8 Web API** + **Entity Framework Core** + **SQL Server** para el sistema de gestión de datos docentes de la Universidad Iberoamericana.

## Requisitos

- **.NET 8 SDK**
- **SQL Server** (local o remoto)

## Instalación

```bash
cd Backend/IberoBackend
dotnet restore
```

## Configuración

Edita `appsettings.json` con los datos de tu servidor SQL Server:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=IBERO_GDD;User Id=sa;Password=TuPassword123!;TrustServerCertificate=True;"
}
```

## Base de datos

### 1. Crear la base de datos y tablas

Ejecuta el script SQL en SQL Server Management Studio (SSMS):

```sql
CREATE DATABASE IBERO_GDD;
GO
USE IBERO_GDD;
GO
```

Luego ejecuta el contenido de `database/schema.sql`.

### 2. Insertar datos iniciales

Ejecuta `database/seed.sql` en SSMS, o bien usa las rutas POST de la API para insertar datos.

## Ejecución

```bash
cd Backend/IberoBackend

# Desarrollo (con hot reload)
dotnet watch run

# Producción
dotnet run
```

El servidor arranca en `http://localhost:4000`.
Swagger UI disponible en `http://localhost:4000/swagger`.

## Endpoints de la API

### Health Check
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Estado del servidor |

### Autenticación
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/me` | Obtener usuario actual (requiere token) |

### Usuarios (requiere admin)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/usuarios` | Listar usuarios |
| GET | `/api/usuarios/{id}` | Obtener usuario |
| POST | `/api/usuarios` | Crear usuario |
| PUT | `/api/usuarios/{id}` | Actualizar usuario |
| DELETE | `/api/usuarios/{id}` | Eliminar usuario |

### Docentes
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/docentes` | Listar docentes |
| GET | `/api/docentes/{id}` | Obtener docente |
| POST | `/api/docentes` | Crear docente |
| PUT | `/api/docentes/{id}` | Actualizar docente |
| DELETE | `/api/docentes/{id}` | Desactivar docente |

### Recursos del docente (anidados)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/docentes/{id}/grados` | Grados académicos |
| POST | `/api/docentes/{id}/grados` | Agregar grado |
| GET | `/api/docentes/{id}/publicaciones` | Publicaciones |
| POST | `/api/docentes/{id}/publicaciones` | Agregar publicación |
| GET | `/api/docentes/{id}/proyectos` | Proyectos |
| POST | `/api/docentes/{id}/proyectos` | Agregar proyecto |
| GET | `/api/docentes/{id}/premios` | Premios |
| POST | `/api/docentes/{id}/premios` | Agregar premio |
| GET | `/api/docentes/{id}/cursos` | Cursos |
| POST | `/api/docentes/{id}/cursos` | Agregar curso |
| GET | `/api/docentes/{id}/idiomas` | Idiomas |
| POST | `/api/docentes/{id}/idiomas` | Agregar idioma |

### Recursos individuales (editar/eliminar por ID)
| Método | Ruta | Descripción |
|--------|------|-------------|
| PUT/DELETE | `/api/grados/{id}` | Editar/eliminar grado |
| PUT/DELETE | `/api/publicaciones/{id}` | Editar/eliminar publicación |
| PUT/DELETE | `/api/proyectos/{id}` | Editar/eliminar proyecto |
| PUT/DELETE | `/api/premios/{id}` | Editar/eliminar premio |
| PUT/DELETE | `/api/cursos/{id}` | Editar/eliminar curso |
| PUT/DELETE | `/api/idiomas/{id}` | Editar/eliminar idioma |

### Dashboard (requiere admin)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/dashboard/stats` | Estadísticas generales |

### Validaciones
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/validaciones/pendientes` | Docentes pendientes |
| GET | `/api/validaciones/secciones/{docenteId}` | Estado de secciones |
| PUT | `/api/validaciones/secciones/{docenteId}` | Actualizar sección |

## Autenticación

Todas las rutas (excepto `/api/auth/login` y `/api/health`) requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

## Credenciales de prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@ibero.mx | admin123 |
| Docente | a.martinez@ibero.mx | docente123 |
| Docente | s.rodriguez@ibero.mx | docente123 |
| Docente | j.ramos@ibero.mx | docente123 |

## Estructura del proyecto

```
Backend/
├── database/
│   ├── schema.sql                  # Creación de tablas
│   └── seed.sql                    # Datos iniciales (SQL)
├── IberoBackend/
│   ├── Controllers/
│   │   ├── AuthController.cs       # Login + GetMe
│   │   ├── DashboardController.cs  # Estadísticas admin
│   │   ├── DocentesController.cs   # CRUD docentes + recursos anidados
│   │   ├── RecursosController.cs   # Edit/Delete recursos por ID
│   │   ├── UsuariosController.cs   # CRUD usuarios (admin)
│   │   └── ValidacionesController.cs
│   ├── Data/
│   │   └── AppDbContext.cs         # EF Core DbContext
│   ├── DTOs/
│   │   ├── AuthDTOs.cs
│   │   ├── DocenteDTOs.cs
│   │   └── RecursosDTOs.cs
│   ├── Models/                     # 10 entidades EF Core
│   │   ├── Departamento.cs
│   │   ├── Usuario.cs
│   │   ├── Docente.cs
│   │   ├── GradoAcademico.cs
│   │   ├── Publicacion.cs
│   │   ├── Proyecto.cs
│   │   ├── Premio.cs
│   │   ├── Curso.cs
│   │   ├── Idioma.cs
│   │   └── SeccionEstado.cs
│   ├── Properties/
│   │   └── launchSettings.json
│   ├── appsettings.json            # Config (DB, JWT, CORS)
│   ├── IberoBackend.csproj         # Dependencias NuGet
│   └── Program.cs                  # Entry point
└── README.md
```

## Tecnologías

- **ASP.NET Core 8** — Web API framework
- **Entity Framework Core 8** — ORM para SQL Server
- **JWT Bearer** — Autenticación por token
- **BCrypt.Net** — Hash de contraseñas
- **Swagger / OpenAPI** — Documentación interactiva de la API
