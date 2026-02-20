using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IberoBackend.Models
{
    [Table("productos_academicos")]
    public class ProductoAcademico
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("id_profesor")]
        public int IdProfesor { get; set; }

        [ForeignKey("IdProfesor")]
        public DatosGenerales? Profesor { get; set; }

        [MaxLength(100)]
        [Column("id_publicacion")]
        public string? IdPublicacion { get; set; }

        [Column("descripcion_publicacion")]
        public string? DescripcionPublicacion { get; set; }

        [Column("activo")]
        public bool Activo { get; set; } = true;

        [Column("fecha_carga")]
        public DateTime FechaCarga { get; set; } = DateTime.Now;

        [Column("fecha_actualizacion")]
        public DateTime FechaActualizacion { get; set; } = DateTime.Now;
    }
}
