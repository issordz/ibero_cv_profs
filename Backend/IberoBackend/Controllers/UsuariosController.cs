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
    [Authorize(Roles = "admin")]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/usuarios
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? rol, [FromQuery] string? search)
        {
            var query = _context.Usuarios
                .Include(u => u.Departamento)
                .AsQueryable();

            if (!string.IsNullOrEmpty(rol))
                query = query.Where(u => u.Rol == rol);

            if (!string.IsNullOrEmpty(search))
                query = query.Where(u => u.Nombre.Contains(search) || u.Email.Contains(search));

            var usuarios = await query.OrderBy(u => u.Nombre)
                .Select(u => new UsuarioResponse
                {
                    Id = u.Id,
                    Email = u.Email,
                    Nombre = u.Nombre,
                    Rol = u.Rol,
                    RolDisplay = u.RolDisplay,
                    Avatar = u.Avatar,
                    Departamento = u.Departamento != null ? u.Departamento.Nombre : null,
                    Activo = u.Activo
                }).ToListAsync();

            return Ok(usuarios);
        }

        // GET /api/usuarios/:id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var usuario = await _context.Usuarios
                .Include(u => u.Departamento)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (usuario == null)
                return NotFound(new { error = "Usuario no encontrado" });

            return Ok(new UsuarioResponse
            {
                Id = usuario.Id,
                Email = usuario.Email,
                Nombre = usuario.Nombre,
                Rol = usuario.Rol,
                RolDisplay = usuario.RolDisplay,
                Avatar = usuario.Avatar,
                Departamento = usuario.Departamento?.Nombre,
                Activo = usuario.Activo
            });
        }

        // POST /api/usuarios
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUsuarioRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password) || string.IsNullOrEmpty(request.Nombre))
                return BadRequest(new { error = "Email, password y nombre son requeridos" });

            if (await _context.Usuarios.AnyAsync(u => u.Email == request.Email))
                return Conflict(new { error = "El email ya está registrado" });

            var usuario = new Usuario
            {
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Nombre = request.Nombre,
                Rol = request.Rol,
                RolDisplay = request.RolDisplay,
                Avatar = request.Avatar,
                DepartamentoId = request.DepartamentoId
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            await _context.Entry(usuario).Reference(u => u.Departamento).LoadAsync();

            return CreatedAtAction(nameof(GetById), new { id = usuario.Id }, new UsuarioResponse
            {
                Id = usuario.Id,
                Email = usuario.Email,
                Nombre = usuario.Nombre,
                Rol = usuario.Rol,
                RolDisplay = usuario.RolDisplay,
                Avatar = usuario.Avatar,
                Departamento = usuario.Departamento?.Nombre,
                Activo = usuario.Activo
            });
        }

        // PUT /api/usuarios/:id
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateUsuarioRequest request)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
                return NotFound(new { error = "Usuario no encontrado" });

            if (!string.IsNullOrEmpty(request.Email)) usuario.Email = request.Email;
            if (!string.IsNullOrEmpty(request.Password)) usuario.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            if (!string.IsNullOrEmpty(request.Nombre)) usuario.Nombre = request.Nombre;
            if (!string.IsNullOrEmpty(request.Rol)) usuario.Rol = request.Rol;
            if (!string.IsNullOrEmpty(request.RolDisplay)) usuario.RolDisplay = request.RolDisplay;
            if (request.Avatar != null) usuario.Avatar = request.Avatar;
            if (request.DepartamentoId.HasValue) usuario.DepartamentoId = request.DepartamentoId;
            if (request.Activo.HasValue) usuario.Activo = request.Activo.Value;
            usuario.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            await _context.Entry(usuario).Reference(u => u.Departamento).LoadAsync();

            return Ok(new UsuarioResponse
            {
                Id = usuario.Id,
                Email = usuario.Email,
                Nombre = usuario.Nombre,
                Rol = usuario.Rol,
                RolDisplay = usuario.RolDisplay,
                Avatar = usuario.Avatar,
                Departamento = usuario.Departamento?.Nombre,
                Activo = usuario.Activo
            });
        }

        // DELETE /api/usuarios/:id
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
                return NotFound(new { error = "Usuario no encontrado" });

            usuario.Activo = false;
            usuario.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Usuario desactivado correctamente" });
        }
    }
}
