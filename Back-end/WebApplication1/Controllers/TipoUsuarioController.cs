
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TipoUsuarioController : ControllerBase
{
    private readonly GestaoAtrasoContext _context;

    public TipoUsuarioController(GestaoAtrasoContext context)
    {
        _context = context;
    }

    // LISTAR TIPOS DE USUARIO
    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var tipos = await _context.TipoUsuarios
            .AsNoTracking()
            .Select(t => new
            {
                t.IdTipoUsuario,
                t.NomeTipo,
                t.Descricao
            })
            .ToListAsync();

        return Ok(tipos);
    }

    // BUSCAR TIPO PELO ID
    [HttpGet("{id}")]
    public async Task<IActionResult> BuscarPorId(int id)
    {
        var tipo = await _context.TipoUsuarios
            .AsNoTracking()
            .Where(t => t.IdTipoUsuario == id)
            .Select(t => new
            {
                t.IdTipoUsuario,
                t.NomeTipo,
                t.Descricao
            })
            .FirstOrDefaultAsync();

        if (tipo == null)
            return NotFound("Tipo de usuário não encontrado.");

        return Ok(tipo);
    }
}
