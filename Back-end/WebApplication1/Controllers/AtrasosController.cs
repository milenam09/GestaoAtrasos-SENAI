
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Security.Claims;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api")]
[Authorize]
public class AtrasosController : ControllerBase
{
    private readonly GestaoAtrasoContext _context;

    public AtrasosController(GestaoAtrasoContext context)
    {
        _context = context;
    }

    private int? ObterAlunoId()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);

        return int.TryParse(id, out var alunoId)
            ? alunoId
            : null;
    }

    [HttpGet("aluno/{alunoId}/atrasos")]
    public async Task<IActionResult> ListarHistorico(
        int alunoId,
        [FromQuery] int limit = 10)
    {
        var usuarioId = ObterAlunoId();

        if (usuarioId == null)
            return Unauthorized(new { mensagem = "Token inválido." });

        if (usuarioId != alunoId)
            return Forbid();

        if (limit < 1 || limit > 100)
            return BadRequest(new { mensagem = "O limite deve estar entre 1 e 100." });

        var atrasos = await _context.Atrasos
            .AsNoTracking()
            .Where(a => a.AlunoId == alunoId)
            .OrderByDescending(a => a.DataAtraso)
            .ThenByDescending(a => a.Hora)
            .Take(limit)
            .Select(a => new AtrasoDto
            {
                Id = a.IdAtraso,
                Data = a.DataAtraso.ToString("dd/MM"),
                HorarioPrevisto = "--:--",
                HorarioChegada = a.Hora.ToString("HH:mm"),
                Status = a.Status ?? "Pendente"
            })
            .ToListAsync();

        return Ok(atrasos);
    }

    [HttpGet("aluno/{alunoId}/atrasos/metricas")]
    public async Task<IActionResult> ObterMetricas(int alunoId)
    {
        var usuarioId = ObterAlunoId();

        if (usuarioId == null)
            return Unauthorized(new { mensagem = "Token inválido." });

        if (usuarioId != alunoId)
            return Forbid();

        var inicioMes = new DateOnly(DateTime.Today.Year, DateTime.Today.Month, 1);
        var proximoMes = inicioMes.AddMonths(1);

        var atrasos = await _context.Atrasos
            .AsNoTracking()
            .Where(a => a.AlunoId == alunoId)
            .OrderByDescending(a => a.DataAtraso)
            .ThenByDescending(a => a.Hora)
            .ToListAsync();

        var aluno = await _context.Usuarios
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.IdUsuario == alunoId);

        if (aluno == null)
            return NotFound(new { mensagem = "Aluno não encontrado." });

        var totalMes = atrasos.Count(a =>
            a.DataAtraso >= inicioMes &&
            a.DataAtraso < proximoMes);

        var metricas = new MetricasAtrasosDto
        {
            NomeAluno = aluno.Nome,
            TotalAtrasosMes = totalMes,
            AtrasosConsecutivos = 0,
            LimiteTurma = 0,
            Turma = "Não vinculada",
            StatusAtual = atrasos.FirstOrDefault()?.Status ?? "Sem registros"
        };

        return Ok(metricas);
    }

    [HttpPost("aluno/{alunoId}/atrasos")]
    public IActionResult RegistrarAtraso(
        int alunoId,
        [FromBody] NovoAtrasoRequest dados)
    {
        var usuarioId = ObterAlunoId();

        if (usuarioId == null)
            return Unauthorized(new { mensagem = "Token inválido." });

        if (usuarioId != alunoId)
            return Forbid();

        return Conflict(new
        {
            mensagem = "O registro ainda depende do vínculo do aluno com a turma e da identificação do coordenador responsável."
        });
    }
}
