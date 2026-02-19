using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using IberoBackend.Data;

var builder = WebApplication.CreateBuilder(args);

// ===========================================
// Servicios
// ===========================================

// Entity Framework Core + SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// JWT Authentication
var jwtSecret = builder.Configuration["Jwt:Secret"] ?? "ibero_gdd_secret_key_change_in_production_2024_min32chars!!";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "IberoBackend",
            ValidAudience = builder.Configuration["Jwt:Audience"] ?? "IberoFrontend",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret))
        };
    });

builder.Services.AddAuthorization();

// CORS
var corsOrigin = builder.Configuration["Cors:Origin"] ?? "http://localhost:5173";
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(corsOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Controllers + JSON options
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "IBERO GDD API",
        Version = "v1",
        Description = "API para el Gestor de Datos del Docente - Universidad Iberoamericana"
    });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Ingresa tu token JWT. Ejemplo: eyJhbGciOi..."
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// ===========================================
// Middleware Pipeline
// ===========================================

// Swagger (solo en desarrollo)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS
app.UseCors("AllowFrontend");

// Health check
app.MapGet("/api/health", () => Results.Ok(new
{
    status = "OK",
    message = "IBERO GDD Backend API (.NET) funcionando correctamente",
    timestamp = DateTime.UtcNow.ToString("o"),
    environment = app.Environment.EnvironmentName
}));

// Auth middleware
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// ===========================================
// Iniciar servidor
// ===========================================
Console.WriteLine();
Console.WriteLine("===========================================");
Console.WriteLine("  IBERO - Gestor de Datos del Docente");
Console.WriteLine("  Backend API (.NET 8)");
Console.WriteLine("===========================================");
Console.WriteLine($"  Swagger:     http://localhost:{builder.Configuration["ASPNETCORE_URLS"]?.Split(':').Last() ?? "5000"}/swagger");
Console.WriteLine($"  CORS origin: {corsOrigin}");
Console.WriteLine($"  Entorno:     {app.Environment.EnvironmentName}");
Console.WriteLine("===========================================");
Console.WriteLine();

app.Run();
