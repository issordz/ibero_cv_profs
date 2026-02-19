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
    public class ValidacionesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ValidacionesController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/validaciones/pendientes
        [HttpGet("pendientes")]
        public async Task<IActionResult> GetPendientes([FromQuery] string? search)
        {
            var query = _context.Docentes
                .Include(d => d.Departamento)
                .Where(d => d.Activo && d.ProgresoPerfil < 100)
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
                query = query.Where(d =>
                    d.Nombre.Contains(search) ||
                    d.EmployeeId.Contains(search) ||
                    (d.Departamento != null && d.Departamento.Nombre.Contains(search)));

            var docentes = await query
                .OrderBy(d => d.ProgresoPerfil)
                .Select(d => new DocenteResponse
                {
                    Id = d.Id,
                    EmployeeId = d.EmployeeId,
                    Nombre = d.Nombre,
                    RolAcademico = d.RolAcademico,
                    Avatar = d.Avatar,
                    AvatarColor = d.AvatarColor,
                    Departamento = d.Departamento != null ? d.Departamento.Nombre : null,
                    ProgresoPerfil = d.ProgresoPerfil,
                    Email = d.Email,
                    UltimaActualizacion = d.UltimaActualizacion
                })
                .ToListAsync();

            var allPending = _context.Docentes.Where(d => d.Activo && d.ProgresoPerfil < 100);
            var totalPendientes = await allPending.CountAsync();
            var progresoPromedio = totalPendientes > 0
                ? (int)await allPending.AverageAsync(d => (double)d.ProgresoPerfil)
                : 0;
            var requierenAtencion = await allPending.CountAsync(d => d.ProgresoPerfil < 50);

            return Ok(new ValidacionesPendientesResponse
            {
                Docentes = docentes,
                Stats = new ValidacionesStats
                {
                    TotalPendientes = totalPendientes,
                    ProgresoPromedio = progresoPromedio,
                    RequierenAtencion = requierenAtencion
                }
            });
        }

        // GET /api/validaciones/secciones/:docenteId
        [HttpGet("secciones/{docenteId}")]
        public async Task<IActionResult> GetSeccionesEstado(int docenteId)
        {
            var secciones = await _context.SeccionesEstado
                .Where(s => s.DocenteId == docenteId)
                .ToDictionaryAsync(s => s.SeccionId, s => s.Estado);

            return Ok(secciones);
        }

        // PUT /api/validaciones/secciones/:docenteId
        [HttpPut("secciones/{docenteId}")]
        public async Task<IActionResult> UpdateSeccionEstado(int docenteId, [FromBody] SeccionEstadoDto dto)
        {
            if (string.IsNullOrEmpty(dto.SeccionId) || string.IsNullOrEmpty(dto.Estado))
                return BadRequest(new { error = "SeccionId y estado son requeridos" });

            var existing = await _context.SeccionesEstado
                .FirstOrDefaultAsync(s => s.DocenteId == docenteId && s.SeccionId == dto.SeccionId);

            if (existing != null)
            {
                existing.Estado = dto.Estado;
                existing.UpdatedAt = DateTime.Now;
            }
            else
            {
                _context.SeccionesEstado.Add(new SeccionEstado
                {
                    DocenteId = docenteId,
                    SeccionId = dto.SeccionId,
                    Estado = dto.Estado
                });
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Estado de sección actualizado", dto.SeccionId, dto.Estado });
        }
    }
}
