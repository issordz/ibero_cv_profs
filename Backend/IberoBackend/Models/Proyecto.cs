using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IberoBackend.Models
{
    [Table("experiencia_laboral")]
    public class ExperienciaLaboral
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
        [Column("actividad_puesto")]
        public string ActividadPuesto { get; set; } = string.Empty;

        [MaxLength(300)]
        [Column("organizacion_empresa")]
        public string? OrganizacionEmpresa { get; set; }

        [MaxLength(50)]
        [Column("inicio_mes_anio")]
        public string? InicioMesAnio { get; set; }

        [MaxLength(50)]
        [Column("fin_mes_anio")]
        public string? FinMesAnio { get; set; }

        [MaxLength(100)]
        [Column("tipo_experiencia")]
        public string? TipoExperiencia { get; set; }

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
