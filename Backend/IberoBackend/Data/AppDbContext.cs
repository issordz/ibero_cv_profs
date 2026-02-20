using Microsoft.EntityFrameworkCore;
using IberoBackend.Models;

namespace IberoBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<DatosGenerales> DatosGenerales => Set<DatosGenerales>();
        public DbSet<UsuarioPortal> UsuariosPortal => Set<UsuarioPortal>();
        public DbSet<EstudioAcademico> EstudiosAcademicos => Set<EstudioAcademico>();
        public DbSet<ExperienciaLaboral> ExperienciasLaborales => Set<ExperienciaLaboral>();
        public DbSet<Capacitacion> Capacitaciones => Set<Capacitacion>();
        public DbSet<LogroProfesional> LogrosProfesionales => Set<LogroProfesional>();
        public DbSet<Organismo> Organismos => Set<Organismo>();
        public DbSet<PremioDistincion> PremiosDistinciones => Set<PremioDistincion>();
        public DbSet<ProductoAcademico> ProductosAcademicos => Set<ProductoAcademico>();
        public DbSet<Actualizacion> Actualizaciones => Set<Actualizacion>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Unique constraints
            modelBuilder.Entity<DatosGenerales>()
                .HasIndex(d => d.CorreoElectronico).IsUnique();

            modelBuilder.Entity<UsuarioPortal>()
                .HasIndex(u => u.Correo).IsUnique();

            // Relaciones 1:N — DatosGenerales (1) -> Tablas hijas (N)
            modelBuilder.Entity<EstudioAcademico>()
                .HasOne(e => e.Profesor).WithMany(d => d.EstudiosAcademicos)
                .HasForeignKey(e => e.IdProfesor).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ExperienciaLaboral>()
                .HasOne(e => e.Profesor).WithMany(d => d.ExperienciasLaborales)
                .HasForeignKey(e => e.IdProfesor).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Capacitacion>()
                .HasOne(c => c.Profesor).WithMany(d => d.Capacitaciones)
                .HasForeignKey(c => c.IdProfesor).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<LogroProfesional>()
                .HasOne(l => l.Profesor).WithMany(d => d.LogrosProfesionales)
                .HasForeignKey(l => l.IdProfesor).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Organismo>()
                .HasOne(o => o.Profesor).WithMany(d => d.Organismos)
                .HasForeignKey(o => o.IdProfesor).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PremioDistincion>()
                .HasOne(p => p.Profesor).WithMany(d => d.PremiosDistinciones)
                .HasForeignKey(p => p.IdProfesor).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ProductoAcademico>()
                .HasOne(p => p.Profesor).WithMany(d => d.ProductosAcademicos)
                .HasForeignKey(p => p.IdProfesor).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Actualizacion>()
                .HasOne(a => a.Profesor).WithMany(d => d.Actualizaciones)
                .HasForeignKey(a => a.IdProfesor).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
