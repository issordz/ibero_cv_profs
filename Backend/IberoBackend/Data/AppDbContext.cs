using Microsoft.EntityFrameworkCore;
using IberoBackend.Models;

namespace IberoBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Departamento> Departamentos => Set<Departamento>();
        public DbSet<Usuario> Usuarios => Set<Usuario>();
        public DbSet<Docente> Docentes => Set<Docente>();
        public DbSet<GradoAcademico> GradosAcademicos => Set<GradoAcademico>();
        public DbSet<Publicacion> Publicaciones => Set<Publicacion>();
        public DbSet<Proyecto> Proyectos => Set<Proyecto>();
        public DbSet<Premio> Premios => Set<Premio>();
        public DbSet<Curso> Cursos => Set<Curso>();
        public DbSet<Idioma> Idiomas => Set<Idioma>();
        public DbSet<SeccionEstado> SeccionesEstado => Set<SeccionEstado>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Unique constraints
            modelBuilder.Entity<Departamento>()
                .HasIndex(d => d.Nombre).IsUnique();

            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Email).IsUnique();

            modelBuilder.Entity<Docente>()
                .HasIndex(d => d.UsuarioId).IsUnique();

            modelBuilder.Entity<Docente>()
                .HasIndex(d => d.EmployeeId).IsUnique();

            // Column mappings for names that differ from C# conventions
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.Property(e => e.PasswordHash).HasColumnName("password_hash");
                entity.Property(e => e.RolDisplay).HasColumnName("rol_display");
                entity.Property(e => e.DepartamentoId).HasColumnName("departamento_id");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
            });

            modelBuilder.Entity<Departamento>(entity =>
            {
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
            });

            modelBuilder.Entity<Docente>(entity =>
            {
                entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");
                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
                entity.Property(e => e.RolAcademico).HasColumnName("rol_academico");
                entity.Property(e => e.AvatarColor).HasColumnName("avatar_color");
                entity.Property(e => e.DepartamentoId).HasColumnName("departamento_id");
                entity.Property(e => e.DepartamentoColor).HasColumnName("departamento_color");
                entity.Property(e => e.UltimaActualizacion).HasColumnName("ultima_actualizacion");
                entity.Property(e => e.ProgresoPerfil).HasColumnName("progreso_perfil");
                entity.Property(e => e.UbicacionOficina).HasColumnName("ubicacion_oficina");
                entity.Property(e => e.OrcidId).HasColumnName("orcid_id");
                entity.Property(e => e.HorarioOficina).HasColumnName("horario_oficina");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
            });

            modelBuilder.Entity<GradoAcademico>(entity =>
            {
                entity.Property(e => e.DocenteId).HasColumnName("docente_id");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
            });

            modelBuilder.Entity<Publicacion>(entity =>
            {
                entity.Property(e => e.DocenteId).HasColumnName("docente_id");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
            });

            modelBuilder.Entity<Proyecto>(entity =>
            {
                entity.Property(e => e.DocenteId).HasColumnName("docente_id");
                entity.Property(e => e.FechaInicio).HasColumnName("fecha_inicio");
                entity.Property(e => e.FechaFin).HasColumnName("fecha_fin");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
            });

            modelBuilder.Entity<Premio>(entity =>
            {
                entity.Property(e => e.DocenteId).HasColumnName("docente_id");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
            });

            modelBuilder.Entity<Curso>(entity =>
            {
                entity.Property(e => e.DocenteId).HasColumnName("docente_id");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
            });

            modelBuilder.Entity<Idioma>(entity =>
            {
                entity.Property(e => e.DocenteId).HasColumnName("docente_id");
                entity.Property(e => e.IdiomaName).HasColumnName("idioma");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
            });

            modelBuilder.Entity<SeccionEstado>(entity =>
            {
                entity.Property(e => e.DocenteId).HasColumnName("docente_id");
                entity.Property(e => e.SeccionId).HasColumnName("seccion_id");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
            });

            // Check constraints
            modelBuilder.Entity<Usuario>()
                .ToTable(t => t.HasCheckConstraint("CK_Usuarios_Rol", "rol IN ('admin', 'professor')"));

            modelBuilder.Entity<Docente>()
                .ToTable(t => t.HasCheckConstraint("CK_Docentes_Progreso", "progreso_perfil BETWEEN 0 AND 100"));

            modelBuilder.Entity<SeccionEstado>()
                .ToTable(t => t.HasCheckConstraint("CK_SeccionesEstado_Estado", "estado IN ('complete', 'pending', 'in_progress')"));

            // Delete behavior
            modelBuilder.Entity<GradoAcademico>()
                .HasOne(g => g.Docente).WithMany(d => d.GradosAcademicos)
                .HasForeignKey(g => g.DocenteId).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Publicacion>()
                .HasOne(p => p.Docente).WithMany(d => d.Publicaciones)
                .HasForeignKey(p => p.DocenteId).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Proyecto>()
                .HasOne(p => p.Docente).WithMany(d => d.Proyectos)
                .HasForeignKey(p => p.DocenteId).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Premio>()
                .HasOne(p => p.Docente).WithMany(d => d.Premios)
                .HasForeignKey(p => p.DocenteId).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Curso>()
                .HasOne(c => c.Docente).WithMany(d => d.Cursos)
                .HasForeignKey(c => c.DocenteId).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Idioma>()
                .HasOne(i => i.Docente).WithMany(d => d.Idiomas)
                .HasForeignKey(i => i.DocenteId).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SeccionEstado>()
                .HasOne(s => s.Docente).WithMany(d => d.SeccionesEstado)
                .HasForeignKey(s => s.DocenteId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
