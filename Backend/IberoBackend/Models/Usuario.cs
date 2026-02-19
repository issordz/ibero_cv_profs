using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IberoBackend.Models
{
    [Table("Usuarios")]
    public class Usuario
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [Required, MaxLength(255)]
        public string PasswordHash { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        public string Nombre { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string Rol { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string RolDisplay { get; set; } = string.Empty;

        [MaxLength(10)]
        public string? Avatar { get; set; }

        public int? DepartamentoId { get; set; }

        [ForeignKey("DepartamentoId")]
        public Departamento? Departamento { get; set; }

        public bool Activo { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public Docente? Docente { get; set; }
    }
}
