namespace IberoBackend.DTOs
{
    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponse
    {
        public string Token { get; set; } = string.Empty;
        public UsuarioResponse Usuario { get; set; } = null!;
    }

    public class UsuarioResponse
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string Rol { get; set; } = string.Empty;
        public string RolDisplay { get; set; } = string.Empty;
        public string? Avatar { get; set; }
        public string? Departamento { get; set; }
        public bool Activo { get; set; }
    }

    public class CreateUsuarioRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string Rol { get; set; } = string.Empty;
        public string RolDisplay { get; set; } = string.Empty;
        public string? Avatar { get; set; }
        public int? DepartamentoId { get; set; }
    }

    public class UpdateUsuarioRequest
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Nombre { get; set; }
        public string? Rol { get; set; }
        public string? RolDisplay { get; set; }
        public string? Avatar { get; set; }
        public int? DepartamentoId { get; set; }
        public bool? Activo { get; set; }
    }
}
