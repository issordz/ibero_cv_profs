using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IberoBackend.Models
{
    [Table("capacitacion")]
    public class Capacitacion
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("id_profesor")]
        public int IdProfesor { get; set; }

        [ForeignKey("IdProfesor")]
        public DatosGenerales? Profesor { get; set; }

        [MaxLength(200)]
        [Column("tipo_capacitacion")]
        public string? TipoCapacitacion { get; set; }

        [MaxLength(300)]
        [Column("institucion")]
        public string? Institucion { get; set; }

        [MaxLength(100)]
        [Column("pais")]
        public string? Pais { get; set; }

        [Column("anio_obtencion")]
        public int? AnioObtencion { get; set; }

        [Column("horas")]
        public int? Horas { get; set; }

        [MaxLength(100)]
        [Column("vigencia")]
        public string? Vigencia { get; set; }

        [Column("activo")]
        public bool Activo { get; set; } = true;

        [Column("fecha_carga")]
        public DateTime FechaCarga { get; set; } = DateTime.Now;

        [Column("fecha_actualizacion")]
        public DateTime FechaActualizacion { get; set; } = DateTime.Now;
    }
}
