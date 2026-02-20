using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IberoBackend.Models
{
    [Table("organismos")]
    public class Organismo
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
        [Column("organismo")]
        public string OrganismoNombre { get; set; } = string.Empty;

        [Column("anio_inicio")]
        public int? AnioInicio { get; set; }

        [Column("anio_fin")]
        public int? AnioFin { get; set; }

        [MaxLength(100)]
        [Column("nivel_experiencia")]
        public string? NivelExperiencia { get; set; }

        [Column("activo")]
        public bool Activo { get; set; } = true;

        [Column("fecha_carga")]
        public DateTime FechaCarga { get; set; } = DateTime.Now;

        [Column("fecha_actualizacion")]
        public DateTime FechaActualizacion { get; set; } = DateTime.Now;
    }
}
