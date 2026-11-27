
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly GestaoAtrasoContext _context;
    private readonly IConfiguration _configuration;

    public LoginController(
        GestaoAtrasoContext context,
        IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<IActionResult> Entrar([FromBody] LoginDTO dados)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var usuario = await _context.Usuarios
            .Include(u => u.TipoUsuarioNavigation)
            .FirstOrDefaultAsync(u => u.Email == dados.Email);

        if (usuario == null)
            return Unauthorized("E-mail ou senha inválidos.");

        bool senhaValida = SenhaService.VerificarSenha(
            dados.Senha,
            usuario.Senha
        );

        if (!senhaValida)
            return Unauthorized("E-mail ou senha inválidos.");

        var chave = _configuration["Jwt:Key"];
        var emissor = _configuration["Jwt:Issuer"];
        var publico = _configuration["Jwt:Audience"];

        if (string.IsNullOrWhiteSpace(chave) ||
            string.IsNullOrWhiteSpace(emissor) ||
            string.IsNullOrWhiteSpace(publico))
        {
            return StatusCode(500, "Configuração JWT incompleta.");
        }

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString()),
            new Claim(ClaimTypes.Name, usuario.Nome),
            new Claim(ClaimTypes.Role,
                usuario.TipoUsuarioNavigation?.NomeTipo ?? "Sem tipo")
        };

        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(chave)
        );

        var credentials = new SigningCredentials(
            securityKey,
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            issuer: emissor,
            audience: publico,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                _configuration.GetValue<int>("Jwt:ExpirationMinutes")
            ),
            signingCredentials: credentials
        );

        return Ok(new
        {
            mensagem = "Login realizado com sucesso!",
            token = new JwtSecurityTokenHandler().WriteToken(token),
            usuario = new
            {
                usuario.IdUsuario,
                usuario.Nome,
                usuario.Email,
                tipoUsuario = usuario.TipoUsuarioNavigation?.NomeTipo
            }
        });
    }
}

public class LoginDTO
{
    [System.ComponentModel.DataAnnotations.Required]
    [System.ComponentModel.DataAnnotations.EmailAddress]
    public string Email { get; set; } = string.Empty;

    [System.ComponentModel.DataAnnotations.Required]
    public string Senha { get; set; } = string.Empty;
}
