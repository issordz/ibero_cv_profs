using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IberoBackend.Models
{
    [Table("Idiomas")]
    public class Idioma
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int DocenteId { get; set; }

        [ForeignKey("DocenteId")]
        public Docente? Docente { get; set; }

        [Required, MaxLength(100)]
        public string IdiomaName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? Nivel { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
