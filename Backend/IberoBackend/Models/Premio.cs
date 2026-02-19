using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IberoBackend.Models
{
    [Table("Premios")]
    public class Premio
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int DocenteId { get; set; }

        [ForeignKey("DocenteId")]
        public Docente? Docente { get; set; }

        [Required, MaxLength(300)]
        public string Titulo { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? Organizacion { get; set; }

        public int? Anio { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
