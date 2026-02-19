using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IberoBackend.Data;
using IberoBackend.DTOs;
using IberoBackend.Models;

namespace IberoBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DocentesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DocentesController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/docentes
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? departamento, [FromQuery] string? search)
        {
            var query = _context.Docentes
                .Include(d => d.Departamento)
                .Where(d => d.Activo)
                .AsQueryable();

            if (!string.IsNullOrEmpty(departamento))
                query = query.Where(d => d.Departamento != null && d.Departamento.Nombre == departamento);

            if (!string.IsNullOrEmpty(search))
                query = query.Where(d => d.Nombre.Contains(search) || d.EmployeeId.Contains(search) || (d.Email != null && d.Email.Contains(search)));

            var docentes = await query.OrderBy(d => d.Nombre)
                .Select(d => new DocenteResponse
                {
                    Id = d.Id,
                    EmployeeId = d.EmployeeId,
                    Nombre = d.Nombre,
                    RolAcademico = d.RolAcademico,
                    Avatar = d.Avatar,
                    AvatarColor = d.AvatarColor,
                    Departamento = d.Departamento != null ? d.Departamento.Nombre : null,
                    DepartamentoColor = d.DepartamentoColor,
                    UltimaActualizacion = d.UltimaActualizacion,
                    ProgresoPerfil = d.ProgresoPerfil,
                    Email = d.Email,
                    Telefono = d.Telefono,
                    UbicacionOficina = d.UbicacionOficina,
                    OrcidId = d.OrcidId,
                    Linkedin = d.Linkedin,
                    HorarioOficina = d.HorarioOficina,
                    Resumen = d.Resumen,
                    Activo = d.Activo
                }).ToListAsync();

            return Ok(docentes);
        }

        // GET /api/docentes/:id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var d = await _context.Docentes
                .Include(d => d.Departamento)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (d == null)
                return NotFound(new { error = "Docente no encontrado" });

            return Ok(new DocenteResponse
            {
                Id = d.Id,
                EmployeeId = d.EmployeeId,
                Nombre = d.Nombre,
                RolAcademico = d.RolAcademico,
                Avatar = d.Avatar,
                AvatarColor = d.AvatarColor,
                Departamento = d.Departamento?.Nombre,
                DepartamentoColor = d.DepartamentoColor,
                UltimaActualizacion = d.UltimaActualizacion,
                ProgresoPerfil = d.ProgresoPerfil,
                Email = d.Email,
                Telefono = d.Telefono,
                UbicacionOficina = d.UbicacionOficina,
                OrcidId = d.OrcidId,
                Linkedin = d.Linkedin,
                HorarioOficina = d.HorarioOficina,
                Resumen = d.Resumen,
                Activo = d.Activo
            });
        }

        // POST /api/docentes
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateDocenteRequest request)
        {
            if (string.IsNullOrEmpty(request.EmployeeId) || string.IsNullOrEmpty(request.Nombre))
                return BadRequest(new { error = "EmployeeId y Nombre son requeridos" });

            if (await _context.Docentes.AnyAsync(d => d.EmployeeId == request.EmployeeId))
                return Conflict(new { error = "El employee_id ya existe" });

            var docente = new Docente
            {
                UsuarioId = request.UsuarioId,
                EmployeeId = request.EmployeeId,
                Nombre = request.Nombre,
                RolAcademico = request.RolAcademico,
                Avatar = request.Avatar,
                AvatarColor = request.AvatarColor,
                DepartamentoId = request.DepartamentoId,
                DepartamentoColor = request.DepartamentoColor,
                Email = request.Email,
                Telefono = request.Telefono,
                UbicacionOficina = request.UbicacionOficina,
                OrcidId = request.OrcidId,
                Linkedin = request.Linkedin,
                HorarioOficina = request.HorarioOficina,
                Resumen = request.Resumen,
                UltimaActualizacion = DateTime.Now.ToString("dd MMM, yyyy")
            };

            _context.Docentes.Add(docente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = docente.Id }, docente);
        }

        // PUT /api/docentes/:id
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateDocenteRequest request)
        {
            var docente = await _context.Docentes.FindAsync(id);
            if (docente == null)
                return NotFound(new { error = "Docente no encontrado" });

            if (!string.IsNullOrEmpty(request.Nombre)) docente.Nombre = request.Nombre;
            if (!string.IsNullOrEmpty(request.RolAcademico)) docente.RolAcademico = request.RolAcademico;
            if (request.Avatar != null) docente.Avatar = request.Avatar;
            if (request.AvatarColor != null) docente.AvatarColor = request.AvatarColor;
            if (request.DepartamentoId.HasValue) docente.DepartamentoId = request.DepartamentoId;
            if (request.DepartamentoColor != null) docente.DepartamentoColor = request.DepartamentoColor;
            if (request.Email != null) docente.Email = request.Email;
            if (request.Telefono != null) docente.Telefono = request.Telefono;
            if (request.UbicacionOficina != null) docente.UbicacionOficina = request.UbicacionOficina;
            if (request.OrcidId != null) docente.OrcidId = request.OrcidId;
            if (request.Linkedin != null) docente.Linkedin = request.Linkedin;
            if (request.HorarioOficina != null) docente.HorarioOficina = request.HorarioOficina;
            if (request.Resumen != null) docente.Resumen = request.Resumen;
            if (request.ProgresoPerfil.HasValue) docente.ProgresoPerfil = request.ProgresoPerfil.Value;
            docente.UltimaActualizacion = DateTime.Now.ToString("dd MMM, yyyy");
            docente.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            await _context.Entry(docente).Reference(d => d.Departamento).LoadAsync();

            return Ok(new DocenteResponse
            {
                Id = docente.Id,
                EmployeeId = docente.EmployeeId,
                Nombre = docente.Nombre,
                RolAcademico = docente.RolAcademico,
                Avatar = docente.Avatar,
                AvatarColor = docente.AvatarColor,
                Departamento = docente.Departamento?.Nombre,
                DepartamentoColor = docente.DepartamentoColor,
                UltimaActualizacion = docente.UltimaActualizacion,
                ProgresoPerfil = docente.ProgresoPerfil,
                Email = docente.Email,
                Telefono = docente.Telefono,
                UbicacionOficina = docente.UbicacionOficina,
                OrcidId = docente.OrcidId,
                Linkedin = docente.Linkedin,
                HorarioOficina = docente.HorarioOficina,
                Resumen = docente.Resumen,
                Activo = docente.Activo
            });
        }

        // DELETE /api/docentes/:id (soft delete)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var docente = await _context.Docentes.FindAsync(id);
            if (docente == null)
                return NotFound(new { error = "Docente no encontrado" });

            docente.Activo = false;
            docente.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Docente desactivado correctamente" });
        }

        // ============ Grados Académicos ============
        [HttpGet("{docenteId}/grados")]
        public async Task<IActionResult> GetGrados(int docenteId)
        {
            var grados = await _context.GradosAcademicos
                .Where(g => g.DocenteId == docenteId)
                .OrderByDescending(g => g.Anio)
                .ToListAsync();
            return Ok(grados);
        }

        [HttpPost("{docenteId}/grados")]
        public async Task<IActionResult> CreateGrado(int docenteId, [FromBody] GradoAcademicoDto dto)
        {
            if (string.IsNullOrEmpty(dto.Titulo) || string.IsNullOrEmpty(dto.Institucion))
                return BadRequest(new { error = "Titulo e institución son requeridos" });

            var grado = new GradoAcademico
            {
                DocenteId = docenteId,
                Titulo = dto.Titulo,
                Institucion = dto.Institucion,
                Anio = dto.Anio,
                Pais = dto.Pais
            };
            _context.GradosAcademicos.Add(grado);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetGrados), new { docenteId }, grado);
        }

        // ============ Publicaciones ============
        [HttpGet("{docenteId}/publicaciones")]
        public async Task<IActionResult> GetPublicaciones(int docenteId)
        {
            var items = await _context.Publicaciones
                .Where(p => p.DocenteId == docenteId)
                .OrderByDescending(p => p.Anio)
                .ToListAsync();
            return Ok(items);
        }

        [HttpPost("{docenteId}/publicaciones")]
        public async Task<IActionResult> CreatePublicacion(int docenteId, [FromBody] PublicacionDto dto)
        {
            if (string.IsNullOrEmpty(dto.Titulo))
                return BadRequest(new { error = "Titulo es requerido" });

            var item = new Publicacion
            {
                DocenteId = docenteId,
                Titulo = dto.Titulo,
                Revista = dto.Revista,
                Anio = dto.Anio,
                Doi = dto.Doi
            };
            _context.Publicaciones.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPublicaciones), new { docenteId }, item);
        }

        // ============ Proyectos ============
        [HttpGet("{docenteId}/proyectos")]
        public async Task<IActionResult> GetProyectos(int docenteId)
        {
            var items = await _context.Proyectos
                .Where(p => p.DocenteId == docenteId)
                .OrderByDescending(p => p.FechaInicio)
                .ToListAsync();
            return Ok(items);
        }

        [HttpPost("{docenteId}/proyectos")]
        public async Task<IActionResult> CreateProyecto(int docenteId, [FromBody] ProyectoDto dto)
        {
            if (string.IsNullOrEmpty(dto.Titulo))
                return BadRequest(new { error = "Titulo es requerido" });

            var item = new Proyecto
            {
                DocenteId = docenteId,
                Titulo = dto.Titulo,
                Rol = dto.Rol,
                FechaInicio = dto.FechaInicio,
                FechaFin = dto.FechaFin,
                Financiamiento = dto.Financiamiento,
                Estado = dto.Estado ?? "Activo"
            };
            _context.Proyectos.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProyectos), new { docenteId }, item);
        }

        // ============ Premios ============
        [HttpGet("{docenteId}/premios")]
        public async Task<IActionResult> GetPremios(int docenteId)
        {
            var items = await _context.Premios
                .Where(p => p.DocenteId == docenteId)
                .OrderByDescending(p => p.Anio)
                .ToListAsync();
            return Ok(items);
        }

        [HttpPost("{docenteId}/premios")]
        public async Task<IActionResult> CreatePremio(int docenteId, [FromBody] PremioDto dto)
        {
            if (string.IsNullOrEmpty(dto.Titulo))
                return BadRequest(new { error = "Titulo es requerido" });

            var item = new Premio
            {
                DocenteId = docenteId,
                Titulo = dto.Titulo,
                Organizacion = dto.Organizacion,
                Anio = dto.Anio
            };
            _context.Premios.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPremios), new { docenteId }, item);
        }

        // ============ Cursos ============
        [HttpGet("{docenteId}/cursos")]
        public async Task<IActionResult> GetCursos(int docenteId)
        {
            var items = await _context.Cursos
                .Where(c => c.DocenteId == docenteId)
                .OrderByDescending(c => c.Semestre)
                .ToListAsync();
            return Ok(items);
        }

        [HttpPost("{docenteId}/cursos")]
        public async Task<IActionResult> CreateCurso(int docenteId, [FromBody] CursoDto dto)
        {
            if (string.IsNullOrEmpty(dto.Codigo) || string.IsNullOrEmpty(dto.Nombre))
                return BadRequest(new { error = "Codigo y nombre son requeridos" });

            var item = new Curso
            {
                DocenteId = docenteId,
                Codigo = dto.Codigo,
                Nombre = dto.Nombre,
                Semestre = dto.Semestre,
                Estudiantes = dto.Estudiantes ?? 0
            };
            _context.Cursos.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCursos), new { docenteId }, item);
        }

        // ============ Idiomas ============
        [HttpGet("{docenteId}/idiomas")]
        public async Task<IActionResult> GetIdiomas(int docenteId)
        {
            var items = await _context.Idiomas
                .Where(i => i.DocenteId == docenteId)
                .ToListAsync();
            return Ok(items);
        }

        [HttpPost("{docenteId}/idiomas")]
        public async Task<IActionResult> CreateIdioma(int docenteId, [FromBody] IdiomaDto dto)
        {
            if (string.IsNullOrEmpty(dto.Idioma) || string.IsNullOrEmpty(dto.Nivel))
                return BadRequest(new { error = "Idioma y nivel son requeridos" });

            var item = new Idioma
            {
                DocenteId = docenteId,
                IdiomaName = dto.Idioma,
                Nivel = dto.Nivel
            };
            _context.Idiomas.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetIdiomas), new { docenteId }, item);
        }
    }
}
