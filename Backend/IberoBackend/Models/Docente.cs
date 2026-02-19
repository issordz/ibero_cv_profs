using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IberoBackend.Models
{
    [Table("Docentes")]
    public class Docente
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UsuarioId { get; set; }

        [ForeignKey("UsuarioId")]
        public Usuario? Usuario { get; set; }

        [Required, MaxLength(20)]
        public string EmployeeId { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        public string Nombre { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? RolAcademico { get; set; }

        [MaxLength(10)]
        public string? Avatar { get; set; }

        [MaxLength(50)]
        public string? AvatarColor { get; set; }

        public int? DepartamentoId { get; set; }

        [ForeignKey("DepartamentoId")]
        public Departamento? Departamento { get; set; }

        [MaxLength(50)]
        public string? DepartamentoColor { get; set; }

        [MaxLength(50)]
        public string? UltimaActualizacion { get; set; }

        public int ProgresoPerfil { get; set; } = 0;

        [MaxLength(150)]
        public string? Email { get; set; }

        [MaxLength(30)]
        public string? Telefono { get; set; }

        [MaxLength(200)]
        public string? UbicacionOficina { get; set; }

        [MaxLength(50)]
        public string? OrcidId { get; set; }

        [MaxLength(200)]
        public string? Linkedin { get; set; }

        [MaxLength(200)]
        public string? HorarioOficina { get; set; }

        public string? Resumen { get; set; }

        public bool Activo { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public ICollection<GradoAcademico> GradosAcademicos { get; set; } = new List<GradoAcademico>();
        public ICollection<Publicacion> Publicaciones { get; set; } = new List<Publicacion>();
        public ICollection<Proyecto> Proyectos { get; set; } = new List<Proyecto>();
        public ICollection<Premio> Premios { get; set; } = new List<Premio>();
        public ICollection<Curso> Cursos { get; set; } = new List<Curso>();
        public ICollection<Idioma> Idiomas { get; set; } = new List<Idioma>();
        public ICollection<SeccionEstado> SeccionesEstado { get; set; } = new List<SeccionEstado>();
    }
}
