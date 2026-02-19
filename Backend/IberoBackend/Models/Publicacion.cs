using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IberoBackend.Models
{
    [Table("Publicaciones")]
    public class Publicacion
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int DocenteId { get; set; }

        [ForeignKey("DocenteId")]
        public Docente? Docente { get; set; }

        [Required, MaxLength(500)]
        public string Titulo { get; set; } = string.Empty;

        [MaxLength(300)]
        public string? Revista { get; set; }

        public int? Anio { get; set; }

        [MaxLength(100)]
        public string? Doi { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
