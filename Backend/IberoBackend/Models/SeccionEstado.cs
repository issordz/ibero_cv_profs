using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IberoBackend.Models
{
    [Table("SeccionesEstado")]
    [Index(nameof(DocenteId), nameof(SeccionId), IsUnique = true)]
    public class SeccionEstado
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int DocenteId { get; set; }

        [ForeignKey("DocenteId")]
        public Docente? Docente { get; set; }

        [Required, MaxLength(50)]
        public string SeccionId { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Estado { get; set; } = "pending";

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
