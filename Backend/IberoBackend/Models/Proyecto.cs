using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IberoBackend.Models
{
    [Table("Proyectos")]
    public class Proyecto
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int DocenteId { get; set; }

        [ForeignKey("DocenteId")]
        public Docente? Docente { get; set; }

        [Required, MaxLength(300)]
        public string Titulo { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Rol { get; set; }

        [MaxLength(20)]
        public string? FechaInicio { get; set; }

        [MaxLength(20)]
        public string? FechaFin { get; set; }

        [MaxLength(100)]
        public string? Financiamiento { get; set; }

        [MaxLength(50)]
        public string Estado { get; set; } = "Activo";

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
