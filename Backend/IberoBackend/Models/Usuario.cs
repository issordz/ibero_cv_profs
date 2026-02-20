using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IberoBackend.Models
{
    [Table("usuarios_portal")]
    public class UsuarioPortal
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required, MaxLength(150)]
        [Column("correo")]
        public string Correo { get; set; } = string.Empty;

        [Required, MaxLength(255)]
        [Column("password")]
        public string Password { get; set; } = string.Empty;

        [Column("activo")]
        public bool Activo { get; set; } = true;

        [Column("fecha_carga")]
        public DateTime FechaCarga { get; set; } = DateTime.Now;

        [Column("fecha_actualizacion")]
        public DateTime FechaActualizacion { get; set; } = DateTime.Now;
    }
}
