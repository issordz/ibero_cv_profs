using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IberoBackend.Models
{
    [Table("datos_generales")]
    public class DatosGenerales
    {
        [Key]
        [Column("id_profesor")]
        public int IdProfesor { get; set; }

        [Required, MaxLength(200)]
        [Column("nombres")]
        public string Nombres { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        [Column("apellido_paterno")]
        public string ApellidoPaterno { get; set; } = string.Empty;

        [MaxLength(200)]
        [Column("apellido_materno")]
        public string? ApellidoMaterno { get; set; }

        [Column("fecha_nacimiento")]
        public DateTime? FechaNacimiento { get; set; }

        [Column("edad")]
        public int? Edad { get; set; }

        [Required, MaxLength(150)]
        [Column("correo_electronico")]
        public string CorreoElectronico { get; set; } = string.Empty;

        [MaxLength(200)]
        [Column("puesto_institucion")]
        public string? PuestoInstitucion { get; set; }

        [Column("resumen_profesional")]
        public string? ResumenProfesional { get; set; }

        [Column("activo")]
        public bool Activo { get; set; } = true;

        [Column("fecha_carga")]
        public DateTime FechaCarga { get; set; } = DateTime.Now;

        [Column("fecha_actualizacion")]
        public DateTime FechaActualizacion { get; set; } = DateTime.Now;

        // Navegación: colecciones hijas (1:N)
        public ICollection<EstudioAcademico> EstudiosAcademicos { get; set; } = new List<EstudioAcademico>();
        public ICollection<ExperienciaLaboral> ExperienciasLaborales { get; set; } = new List<ExperienciaLaboral>();
        public ICollection<Capacitacion> Capacitaciones { get; set; } = new List<Capacitacion>();
        public ICollection<LogroProfesional> LogrosProfesionales { get; set; } = new List<LogroProfesional>();
        public ICollection<Organismo> Organismos { get; set; } = new List<Organismo>();
        public ICollection<PremioDistincion> PremiosDistinciones { get; set; } = new List<PremioDistincion>();
        public ICollection<ProductoAcademico> ProductosAcademicos { get; set; } = new List<ProductoAcademico>();
        public ICollection<Actualizacion> Actualizaciones { get; set; } = new List<Actualizacion>();
    }
}
