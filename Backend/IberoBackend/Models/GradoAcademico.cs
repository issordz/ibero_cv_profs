using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IberoBackend.Models
{
    [Table("estudios_academicos")]
    public class EstudioAcademico
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
        [Column("titulo_estudio")]
        public string TituloEstudio { get; set; } = string.Empty;

        [MaxLength(100)]
        [Column("nivel_estudios")]
        public string? NivelEstudios { get; set; }

        [MaxLength(300)]
        [Column("institucion")]
        public string? Institucion { get; set; }

        [MaxLength(100)]
        [Column("pais")]
        public string? Pais { get; set; }

        [Column("anio_obtencion")]
        public int? AnioObtencion { get; set; }

        [MaxLength(100)]
        [Column("cedula")]
        public string? Cedula { get; set; }

        [Column("activo")]
        public bool Activo { get; set; } = true;

        [Column("fecha_carga")]
        public DateTime FechaCarga { get; set; } = DateTime.Now;

        [Column("fecha_actualizacion")]
        public DateTime FechaActualizacion { get; set; } = DateTime.Now;
    }
}
