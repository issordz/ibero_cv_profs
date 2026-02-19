using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IberoBackend.Data;
using IberoBackend.DTOs;

namespace IberoBackend.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class RecursosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RecursosController(AppDbContext context)
        {
            _context = context;
        }

        // ============ Grados Académicos ============
        [HttpGet("grados/{id}")]
        public async Task<IActionResult> GetGrado(int id)
        {
            var item = await _context.GradosAcademicos.FindAsync(id);
            if (item == null) return NotFound(new { error = "Grado académico no encontrado" });
            return Ok(item);
        }

        [HttpPut("grados/{id}")]
        public async Task<IActionResult> UpdateGrado(int id, [FromBody] GradoAcademicoDto dto)
        {
            var item = await _context.GradosAcademicos.FindAsync(id);
            if (item == null) return NotFound(new { error = "Grado académico no encontrado" });

            if (!string.IsNullOrEmpty(dto.Titulo)) item.Titulo = dto.Titulo;
            if (!string.IsNullOrEmpty(dto.Institucion)) item.Institucion = dto.Institucion;
            if (dto.Anio.HasValue) item.Anio = dto.Anio;
            if (dto.Pais != null) item.Pais = dto.Pais;
            item.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpDelete("grados/{id}")]
        public async Task<IActionResult> DeleteGrado(int id)
        {
            var item = await _context.GradosAcademicos.FindAsync(id);
            if (item == null) return NotFound(new { error = "Grado académico no encontrado" });
            _context.GradosAcademicos.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Grado académico eliminado correctamente" });
        }

        // ============ Publicaciones ============
        [HttpGet("publicaciones/{id}")]
        public async Task<IActionResult> GetPublicacion(int id)
        {
            var item = await _context.Publicaciones.FindAsync(id);
            if (item == null) return NotFound(new { error = "Publicación no encontrada" });
            return Ok(item);
        }

        [HttpPut("publicaciones/{id}")]
        public async Task<IActionResult> UpdatePublicacion(int id, [FromBody] PublicacionDto dto)
        {
            var item = await _context.Publicaciones.FindAsync(id);
            if (item == null) return NotFound(new { error = "Publicación no encontrada" });

            if (!string.IsNullOrEmpty(dto.Titulo)) item.Titulo = dto.Titulo;
            if (dto.Revista != null) item.Revista = dto.Revista;
            if (dto.Anio.HasValue) item.Anio = dto.Anio;
            if (dto.Doi != null) item.Doi = dto.Doi;
            item.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpDelete("publicaciones/{id}")]
        public async Task<IActionResult> DeletePublicacion(int id)
        {
            var item = await _context.Publicaciones.FindAsync(id);
            if (item == null) return NotFound(new { error = "Publicación no encontrada" });
            _context.Publicaciones.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Publicación eliminada correctamente" });
        }

        // ============ Proyectos ============
        [HttpGet("proyectos/{id}")]
        public async Task<IActionResult> GetProyecto(int id)
        {
            var item = await _context.Proyectos.FindAsync(id);
            if (item == null) return NotFound(new { error = "Proyecto no encontrado" });
            return Ok(item);
        }

        [HttpPut("proyectos/{id}")]
        public async Task<IActionResult> UpdateProyecto(int id, [FromBody] ProyectoDto dto)
        {
            var item = await _context.Proyectos.FindAsync(id);
            if (item == null) return NotFound(new { error = "Proyecto no encontrado" });

            if (!string.IsNullOrEmpty(dto.Titulo)) item.Titulo = dto.Titulo;
            if (dto.Rol != null) item.Rol = dto.Rol;
            if (dto.FechaInicio != null) item.FechaInicio = dto.FechaInicio;
            if (dto.FechaFin != null) item.FechaFin = dto.FechaFin;
            if (dto.Financiamiento != null) item.Financiamiento = dto.Financiamiento;
            if (dto.Estado != null) item.Estado = dto.Estado;
            item.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpDelete("proyectos/{id}")]
        public async Task<IActionResult> DeleteProyecto(int id)
        {
            var item = await _context.Proyectos.FindAsync(id);
            if (item == null) return NotFound(new { error = "Proyecto no encontrado" });
            _context.Proyectos.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Proyecto eliminado correctamente" });
        }

        // ============ Premios ============
        [HttpGet("premios/{id}")]
        public async Task<IActionResult> GetPremio(int id)
        {
            var item = await _context.Premios.FindAsync(id);
            if (item == null) return NotFound(new { error = "Premio no encontrado" });
            return Ok(item);
        }

        [HttpPut("premios/{id}")]
        public async Task<IActionResult> UpdatePremio(int id, [FromBody] PremioDto dto)
        {
            var item = await _context.Premios.FindAsync(id);
            if (item == null) return NotFound(new { error = "Premio no encontrado" });

            if (!string.IsNullOrEmpty(dto.Titulo)) item.Titulo = dto.Titulo;
            if (dto.Organizacion != null) item.Organizacion = dto.Organizacion;
            if (dto.Anio.HasValue) item.Anio = dto.Anio;
            item.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpDelete("premios/{id}")]
        public async Task<IActionResult> DeletePremio(int id)
        {
            var item = await _context.Premios.FindAsync(id);
            if (item == null) return NotFound(new { error = "Premio no encontrado" });
            _context.Premios.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Premio eliminado correctamente" });
        }

        // ============ Cursos ============
        [HttpGet("cursos/{id}")]
        public async Task<IActionResult> GetCurso(int id)
        {
            var item = await _context.Cursos.FindAsync(id);
            if (item == null) return NotFound(new { error = "Curso no encontrado" });
            return Ok(item);
        }

        [HttpPut("cursos/{id}")]
        public async Task<IActionResult> UpdateCurso(int id, [FromBody] CursoDto dto)
        {
            var item = await _context.Cursos.FindAsync(id);
            if (item == null) return NotFound(new { error = "Curso no encontrado" });

            if (!string.IsNullOrEmpty(dto.Codigo)) item.Codigo = dto.Codigo;
            if (!string.IsNullOrEmpty(dto.Nombre)) item.Nombre = dto.Nombre;
            if (dto.Semestre != null) item.Semestre = dto.Semestre;
            if (dto.Estudiantes.HasValue) item.Estudiantes = dto.Estudiantes.Value;
            item.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpDelete("cursos/{id}")]
        public async Task<IActionResult> DeleteCurso(int id)
        {
            var item = await _context.Cursos.FindAsync(id);
            if (item == null) return NotFound(new { error = "Curso no encontrado" });
            _context.Cursos.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Curso eliminado correctamente" });
        }

        // ============ Idiomas ============
        [HttpGet("idiomas/{id}")]
        public async Task<IActionResult> GetIdioma(int id)
        {
            var item = await _context.Idiomas.FindAsync(id);
            if (item == null) return NotFound(new { error = "Idioma no encontrado" });
            return Ok(item);
        }

        [HttpPut("idiomas/{id}")]
        public async Task<IActionResult> UpdateIdioma(int id, [FromBody] IdiomaDto dto)
        {
            var item = await _context.Idiomas.FindAsync(id);
            if (item == null) return NotFound(new { error = "Idioma no encontrado" });

            if (!string.IsNullOrEmpty(dto.Idioma)) item.IdiomaName = dto.Idioma;
            if (dto.Nivel != null) item.Nivel = dto.Nivel;
            item.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpDelete("idiomas/{id}")]
        public async Task<IActionResult> DeleteIdioma(int id)
        {
            var item = await _context.Idiomas.FindAsync(id);
            if (item == null) return NotFound(new { error = "Idioma no encontrado" });
            _context.Idiomas.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Idioma eliminado correctamente" });
        }
    }
}
