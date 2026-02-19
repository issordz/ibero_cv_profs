using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IberoBackend.Data;
using IberoBackend.DTOs;

namespace IberoBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "admin")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/dashboard/stats
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var docentesActivos = _context.Docentes.Where(d => d.Activo);

            var total = await docentesActivos.CountAsync();
            var completos = await docentesActivos.CountAsync(d => d.ProgresoPerfil == 100);
            var pendientes = await docentesActivos.CountAsync(d => d.ProgresoPerfil < 100);
            var promedio = total > 0 ? (int)await docentesActivos.AverageAsync(d => (double)d.ProgresoPerfil) : 0;

            var porDepartamento = await docentesActivos
                .Where(d => d.Departamento != null)
                .GroupBy(d => d.Departamento!.Nombre)
                .Select(g => new DeptCount
                {
                    Departamento = g.Key,
                    Total = g.Count()
                })
                .OrderByDescending(x => x.Total)
                .ToListAsync();

            var recientes = await docentesActivos
                .OrderByDescending(d => d.UpdatedAt)
                .Take(5)
                .Select(d => new ActividadReciente
                {
                    Nombre = d.Nombre,
                    RolAcademico = d.RolAcademico,
                    UltimaActualizacion = d.UltimaActualizacion,
                    ProgresoPerfil = d.ProgresoPerfil
                })
                .ToListAsync();

            return Ok(new DashboardStats
            {
                TotalDocentes = total,
                PerfilesCompletos = completos,
                PendientesRevision = pendientes,
                TasaCompletitud = promedio,
                DocentesPorDepartamento = porDepartamento,
                ActividadReciente = recientes
            });
        }
    }
}
