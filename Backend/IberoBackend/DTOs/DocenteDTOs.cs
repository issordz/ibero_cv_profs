namespace IberoBackend.DTOs
{
    public class DocenteResponse
    {
        public int Id { get; set; }
        public string EmployeeId { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string? RolAcademico { get; set; }
        public string? Avatar { get; set; }
        public string? AvatarColor { get; set; }
        public string? Departamento { get; set; }
        public string? DepartamentoColor { get; set; }
        public string? UltimaActualizacion { get; set; }
        public int ProgresoPerfil { get; set; }
        public string? Email { get; set; }
        public string? Telefono { get; set; }
        public string? UbicacionOficina { get; set; }
        public string? OrcidId { get; set; }
        public string? Linkedin { get; set; }
        public string? HorarioOficina { get; set; }
        public string? Resumen { get; set; }
        public bool Activo { get; set; }
    }

    public class CreateDocenteRequest
    {
        public int UsuarioId { get; set; }
        public string EmployeeId { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string? RolAcademico { get; set; }
        public string? Avatar { get; set; }
        public string? AvatarColor { get; set; }
        public int? DepartamentoId { get; set; }
        public string? DepartamentoColor { get; set; }
        public string? Email { get; set; }
        public string? Telefono { get; set; }
        public string? UbicacionOficina { get; set; }
        public string? OrcidId { get; set; }
        public string? Linkedin { get; set; }
        public string? HorarioOficina { get; set; }
        public string? Resumen { get; set; }
    }

    public class UpdateDocenteRequest
    {
        public string? Nombre { get; set; }
        public string? RolAcademico { get; set; }
        public string? Avatar { get; set; }
        public string? AvatarColor { get; set; }
        public int? DepartamentoId { get; set; }
        public string? DepartamentoColor { get; set; }
        public string? Email { get; set; }
        public string? Telefono { get; set; }
        public string? UbicacionOficina { get; set; }
        public string? OrcidId { get; set; }
        public string? Linkedin { get; set; }
        public string? HorarioOficina { get; set; }
        public string? Resumen { get; set; }
        public int? ProgresoPerfil { get; set; }
    }
}
