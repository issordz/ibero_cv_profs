using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IberoBackend.Models
{
    [Table("actualizacion")]
    public class Actualizacion
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("id_profesor")]
        public int IdProfesor { get; set; }

        [ForeignKey("IdProfesor")]
        public DatosGenerales? Profesor { get; set; }

        [Required, MaxLength(300)]
        [Column("nombre_actualizacion")]
        public string NombreActualizacion { get; set; } = string.Empty;

        [MaxLength(200)]
        [Column("tipo_actualizacion")]
        public string? TipoActualizacion { get; set; }

        [MaxLength(300)]
        [Column("institucion")]
        public string? Institucion { get; set; }

        [MaxLength(100)]
        [Column("pais")]
        public string? Pais { get; set; }

        [Column("horas")]
        public int? Horas { get; set; }

        [Column("activo")]
        public bool Activo { get; set; } = true;

        [Column("fecha_carga")]
        public DateTime FechaCarga { get; set; } = DateTime.Now;

        [Column("fecha_actualizacion")]
        public DateTime FechaActualizacion { get; set; } = DateTime.Now;
    }
}
