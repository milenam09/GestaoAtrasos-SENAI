
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api")]
public class DashboardController : ControllerBase
{
    private readonly GestaoAtrasoContext _context;

    public DashboardController(GestaoAtrasoContext context)
    {
        _context = context;
    }

    [HttpGet("dashboard")]
    public async Task<ActionResult<DashboardDto>> ObterDashboard(
        [FromQuery] DateOnly inicio,
        [FromQuery] DateOnly fim)
    {
        if (inicio == default || fim == default || inicio > fim)
            return BadRequest(new { mensagem = "Informe um período válido." });

        int dias = fim.DayNumber - inicio.DayNumber + 1;
        DateOnly inicioAnterior = inicio.AddDays(-dias);
        DateOnly fimAnterior = inicio.AddDays(-1);

        var atrasos = await _context.Atrasos
            .AsNoTracking()
            .Include(a => a.Aluno)
            .Where(a => a.DataAtraso >= inicio && a.DataAtraso <= fim)
            .ToListAsync();

        var atrasosAnteriores = await _context.Atrasos
            .AsNoTracking()
            .Where(a => a.DataAtraso >= inicioAnterior &&
                        a.DataAtraso <= fimAnterior)
            .ToListAsync();

        int total = atrasos.Count;

        int recorrentes = atrasos
            .GroupBy(a => a.AlunoId)
            .Count(g => g.Count() > 1);

        int recorrentesAnteriores = atrasosAnteriores
            .GroupBy(a => a.AlunoId)
            .Count(g => g.Count() > 1);

        int concluidos = atrasos.Count(a =>
            (a.Status ?? "").Contains("conclu", StringComparison.OrdinalIgnoreCase) ||
            (a.Status ?? "").Contains("justific", StringComparison.OrdinalIgnoreCase));

        int concluidosAnteriores = atrasosAnteriores.Count(a =>
            (a.Status ?? "").Contains("conclu", StringComparison.OrdinalIgnoreCase) ||
            (a.Status ?? "").Contains("justific", StringComparison.OrdinalIgnoreCase));

        var dashboard = new DashboardDto
        {
            NomeUsuario = User.Identity?.Name ?? "Usuário",
            Cargo = User.FindFirstValue(ClaimTypes.Role) ?? "Não informado",
            Total = total,

            Cards = new CardsDashboardDto
            {
                TotalOcorrencias = new IndicadorDto
                {
                    Valor = total,
                    Variacao = CalcularVariacao(total, atrasosAnteriores.Count)
                },
                AtrasosRecorrentes = new IndicadorDto
                {
                    Valor = recorrentes,
                    Variacao = CalcularVariacao(recorrentes, recorrentesAnteriores)
                },
                CasosConcluidos = new IndicadorDto
                {
                    Valor = concluidos,
                    Variacao = CalcularVariacao(concluidos, concluidosAnteriores)
                },
                TempoMedioDias = new IndicadorDto
                {
                    Valor = 0,
                    Variacao = 0
                }
            },

            Motivos = atrasos
                .GroupBy(a => string.IsNullOrWhiteSpace(a.Motivo)
                    ? "Não informado"
                    : a.Motivo)
                .Select(g => new MotivoDto
                {
                    Nome = g.Key,
                    Percentual = total == 0
                        ? 0
                        : (int)Math.Round(g.Count() * 100.0 / total)
                })
                .OrderByDescending(m => m.Percentual)
                .ToList(),

            Alunos = atrasos
                .GroupBy(a => new { a.AlunoId, Nome = a.Aluno.Nome })
                .Select(g => new AlunoRankingDto
                {
                    Id = g.Key.AlunoId,
                    Nome = g.Key.Nome,
                    Total = g.Count(),
                    Turma = "Não vinculada"
                })
                .OrderByDescending(a => a.Total)
                .Take(10)
                .Select((a, index) =>
                {
                    a.Posicao = index + 1;
                    return a;
                })
                .ToList(),

            // O banco ainda não possui vínculo entre aluno e turma.
            OcorrenciasPorTurma = new List<TurmaOcorrenciasDto>()
        };

        return Ok(dashboard);
    }

    [HttpPut("dashboard/periodo")]
    public IActionResult FiltrarPorPeriodo([FromBody] PeriodoRequest periodo)
    {
        if (periodo.Inicio == default ||
            periodo.Fim == default ||
            periodo.Inicio > periodo.Fim)
        {
            return BadRequest(new { mensagem = "Período inválido." });
        }

        return Ok(new
        {
            mensagem = "Período recebido. Consulte o Dashboard usando as datas informadas.",
            inicio = periodo.Inicio,
            fim = periodo.Fim
        });
    }

    [HttpPost("ocorrencias")]
    public IActionResult AdicionarOcorrencia([FromBody] NovaOcorrenciaRequest dados)
    {
        return StatusCode(501, new
        {
            mensagem = "O cadastro de ocorrências ainda precisa ser integrado ao responsável pelo registro no banco."
        });
    }

    [HttpDelete("ocorrencias/{id}")]
    public IActionResult ExcluirOcorrencia(int id)
    {
        return StatusCode(501, new
        {
            mensagem = "A exclusão ainda não foi implementada."
        });
    }

    private static int CalcularVariacao(int atual, int anterior)
    {
        if (anterior == 0)
            return atual == 0 ? 0 : 100;

        return (int)Math.Round((atual - anterior) * 100.0 / anterior);
    }
}
