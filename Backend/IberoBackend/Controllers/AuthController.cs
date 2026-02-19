using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using IberoBackend.Data;
using IberoBackend.DTOs;

namespace IberoBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // POST /api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                return BadRequest(new { error = "Email y contraseña son requeridos" });

            var usuario = await _context.Usuarios
                .Include(u => u.Departamento)
                .FirstOrDefaultAsync(u => u.Email == request.Email && u.Activo);

            if (usuario == null)
                return Unauthorized(new { error = "Credenciales inválidas" });

            if (!BCrypt.Net.BCrypt.Verify(request.Password, usuario.PasswordHash))
                return Unauthorized(new { error = "Credenciales inválidas" });

            var token = GenerateJwtToken(usuario);

            return Ok(new LoginResponse
            {
                Token = token,
                Usuario = new UsuarioResponse
                {
                    Id = usuario.Id,
                    Email = usuario.Email,
                    Nombre = usuario.Nombre,
                    Rol = usuario.Rol,
                    RolDisplay = usuario.RolDisplay,
                    Avatar = usuario.Avatar,
                    Departamento = usuario.Departamento?.Nombre,
                    Activo = usuario.Activo
                }
            });
        }

        // GET /api/auth/me
        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetMe()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized(new { error = "Token inválido" });

            var usuario = await _context.Usuarios
                .Include(u => u.Departamento)
                .FirstOrDefaultAsync(u => u.Id == userId);

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

        private string GenerateJwtToken(Models.Usuario usuario)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _config["Jwt:Secret"] ?? "ibero_gdd_secret_key_change_in_production_2024"));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Email, usuario.Email),
                new Claim(ClaimTypes.Role, usuario.Rol),
                new Claim(ClaimTypes.Name, usuario.Nombre)
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"] ?? "IberoBackend",
                audience: _config["Jwt:Audience"] ?? "IberoFrontend",
                claims: claims,
                expires: DateTime.UtcNow.AddHours(24),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
