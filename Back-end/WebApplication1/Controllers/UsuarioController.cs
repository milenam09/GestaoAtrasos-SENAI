
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.DTOs;
using WebApplication1.Models;
using WebApplication1.Services;


namespace WebApplication1.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsuarioController : ControllerBase
{
    private readonly GestaoAtrasoContext _context;

    public UsuarioController(GestaoAtrasoContext context)
    {
        _context = context;
    }

    // LISTAR TODOS OS USUARIOS
    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var usuarios = await _context.Usuarios
            .AsNoTracking()
            .Include(u => u.TipoUsuarioNavigation)
            .Select(u => new UsuarioRespostaDTO
            {
                IdUsuario = u.IdUsuario,
                Nome = u.Nome,
                Email = u.Email,
                Cpf = u.Cpf,
                DataNascimento = u.DataNascimento,
                TipoUsuario = u.TipoUsuario,
                NomeTipo = u.TipoUsuarioNavigation != null
                    ? u.TipoUsuarioNavigation.NomeTipo
                    : null
            })
            .ToListAsync();

        return Ok(usuarios);
    }

    // BUSCAR USUARIO PELO ID
    [HttpGet("{id}")]
    public async Task<IActionResult> BuscarPorId(int id)
    {
        var usuario = await _context.Usuarios
            .AsNoTracking()
            .Include(u => u.TipoUsuarioNavigation)
            .Where(u => u.IdUsuario == id)
            .Select(u => new UsuarioRespostaDTO
            {
                IdUsuario = u.IdUsuario,
                Nome = u.Nome,
                Email = u.Email,
                Cpf = u.Cpf,
                DataNascimento = u.DataNascimento,
                TipoUsuario = u.TipoUsuario,
                NomeTipo = u.TipoUsuarioNavigation != null
                    ? u.TipoUsuarioNavigation.NomeTipo
                    : null
            })
            .FirstOrDefaultAsync();

        if (usuario == null)
            return NotFound("Usuário não encontrado.");

        return Ok(usuario);
    }

    // CADASTRAR USUARIO
    [HttpPost]
    public async Task<IActionResult> Cadastrar(CriarUsuarioDTO dados)
    {
        if (dados.TipoUsuario.HasValue)
        {
            bool tipoExiste = await _context.TipoUsuarios
                .AnyAsync(t => t.IdTipoUsuario == dados.TipoUsuario.Value);

            if (!tipoExiste)
                return BadRequest("Tipo de usuário não encontrado.");
        }

        var usuario = new Usuario
        {
            Nome = dados.Nome,
            Email = dados.Email,
            Senha = SenhaService.GerarHash(dados.Senha),
            Cpf = dados.Cpf,
            DataNascimento = dados.DataNascimento,
            TipoUsuario = dados.TipoUsuario
        };

        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(BuscarPorId),
            new { id = usuario.IdUsuario },
            new
            {
                mensagem = "Usuário cadastrado com sucesso!",
                id = usuario.IdUsuario
            }
        );
    }

    // ATUALIZAR USUARIO
    [HttpPut("{id}")]
    public async Task<IActionResult> Atualizar(
        int id,
        AtualizarUsuarioDTO dados)
    {
        var usuario = await _context.Usuarios.FindAsync(id);

        if (usuario == null)
            return NotFound("Usuário não encontrado.");

        if (dados.TipoUsuario.HasValue)
        {
            bool tipoExiste = await _context.TipoUsuarios
                .AnyAsync(t => t.IdTipoUsuario == dados.TipoUsuario.Value);

            if (!tipoExiste)
                return BadRequest("Tipo de usuário não encontrado.");
        }

        usuario.Nome = dados.Nome;
        usuario.Email = dados.Email;
        usuario.Cpf = dados.Cpf;
        usuario.DataNascimento = dados.DataNascimento;
        usuario.TipoUsuario = dados.TipoUsuario;

        if (!string.IsNullOrWhiteSpace(dados.Senha))
        {
            usuario.Senha = SenhaService.GerarHash(dados.Senha);
        }

        await _context.SaveChangesAsync();

        return Ok("Usuário atualizado com sucesso!");
    }

    // EXCLUIR USUARIO
    [HttpDelete("{id}")]
    public async Task<IActionResult> Excluir(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);

        if (usuario == null)
            return NotFound("Usuário não encontrado.");

        _context.Usuarios.Remove(usuario);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            return Conflict(
                "Não foi possível excluir este usuário porque existem registros relacionados a ele."
            );
        }

        return Ok("Usuário excluído com sucesso!");
    }
}
