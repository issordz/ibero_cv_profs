namespace IberoBackend.DTOs
{
    // ============ Grados Académicos ============
    public class GradoAcademicoDto
    {
        public string Titulo { get; set; } = string.Empty;
        public string Institucion { get; set; } = string.Empty;
        public int? Anio { get; set; }
        public string? Pais { get; set; }
    }

    // ============ Publicaciones ============
    public class PublicacionDto
    {
        public string Titulo { get; set; } = string.Empty;
        public string? Revista { get; set; }
        public int? Anio { get; set; }
        public string? Doi { get; set; }
    }

    // ============ Proyectos ============
    public class ProyectoDto
    {
        public string Titulo { get; set; } = string.Empty;
        public string? Rol { get; set; }
        public string? FechaInicio { get; set; }
        public string? FechaFin { get; set; }
        public string? Financiamiento { get; set; }
        public string? Estado { get; set; }
    }

    // ============ Premios ============
    public class PremioDto
    {
        public string Titulo { get; set; } = string.Empty;
        public string? Organizacion { get; set; }
        public int? Anio { get; set; }
    }

    // ============ Cursos ============
    public class CursoDto
    {
        public string Codigo { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string? Semestre { get; set; }
        public int? Estudiantes { get; set; }
    }

    // ============ Idiomas ============
    public class IdiomaDto
    {
        public string Idioma { get; set; } = string.Empty;
        public string? Nivel { get; set; }
    }

    // ============ Secciones Estado ============
    public class SeccionEstadoDto
    {
        public string SeccionId { get; set; } = string.Empty;
        public string Estado { get; set; } = string.Empty;
    }

    // ============ Dashboard ============
    public class DashboardStats
    {
        public int TotalDocentes { get; set; }
        public int PerfilesCompletos { get; set; }
        public int PendientesRevision { get; set; }
        public int TasaCompletitud { get; set; }
        public List<DeptCount> DocentesPorDepartamento { get; set; } = new();
        public List<ActividadReciente> ActividadReciente { get; set; } = new();
    }

    public class DeptCount
    {
        public string Departamento { get; set; } = string.Empty;
        public int Total { get; set; }
    }

    public class ActividadReciente
    {
        public string Nombre { get; set; } = string.Empty;
        public string? RolAcademico { get; set; }
        public string? UltimaActualizacion { get; set; }
        public int ProgresoPerfil { get; set; }
    }

    // ============ Validaciones ============
    public class ValidacionesPendientesResponse
    {
        public List<DocenteResponse> Docentes { get; set; } = new();
        public ValidacionesStats Stats { get; set; } = new();
    }

    public class ValidacionesStats
    {
        public int TotalPendientes { get; set; }
        public int ProgresoPromedio { get; set; }
        public int RequierenAtencion { get; set; }
    }
}
