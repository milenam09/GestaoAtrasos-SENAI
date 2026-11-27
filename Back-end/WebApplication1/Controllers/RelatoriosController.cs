
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/relatorios")]
public class RelatoriosController : ControllerBase
{
    private readonly GestaoAtrasoContext _context;

    public RelatoriosController(GestaoAtrasoContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<RelatoriosDto>> ObterRelatorios(
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
            .Where(a => a.DataAtraso >= inicio && a.DataAtraso <= fim)
            .ToListAsync();

        var anteriores = await _context.Atrasos
            .AsNoTracking()
            .Where(a => a.DataAtraso >= inicioAnterior &&
                        a.DataAtraso <= fimAnterior)
            .ToListAsync();

        int total = atrasos.Count;

        int recorrentes = atrasos
            .GroupBy(a => a.AlunoId)
            .Count(g => g.Count() > 1);

        int recorrentesAnteriores = anteriores
            .GroupBy(a => a.AlunoId)
            .Count(g => g.Count() > 1);

        int concluidos = atrasos.Count(a =>
            (a.Status ?? "").Contains("conclu",
                StringComparison.OrdinalIgnoreCase) ||
            (a.Status ?? "").Contains("justific",
                StringComparison.OrdinalIgnoreCase));

        int concluidosAnteriores = anteriores.Count(a =>
            (a.Status ?? "").Contains("conclu",
                StringComparison.OrdinalIgnoreCase) ||
            (a.Status ?? "").Contains("justific",
                StringComparison.OrdinalIgnoreCase));

        string status = total == 0
            ? "Sem registros"
            : concluidos == total
                ? "Concluído"
                : "Em análise";

        var resultado = new RelatoriosDto
        {
            NomeUsuario = User.Identity?.Name ?? "Usuário",
            Cargo = User.IsInRole("Gestor") ? "Gestor" : "Professor",
            Status = status,
            Total = total,

            Cards = new CardsRelatoriosDto
            {
                TempoAtendimento = new IndicadorDto
                {
                    Valor = 0,
                    Variacao = 0
                },
                AtrasosRecorrentes = new IndicadorDto
                {
                    Valor = recorrentes,
                    Variacao = CalcularVariacao(
                        recorrentes, recorrentesAnteriores)
                },
                CasosConcluidos = new IndicadorDto
                {
                    Valor = concluidos,
                    Variacao = CalcularVariacao(
                        concluidos, concluidosAnteriores)
                },
                TempoMedio = new IndicadorDto
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

            // O banco ainda não possui vínculo entre aluno e turma.
            OcorrenciasPorTurma = new List<TurmaOcorrenciasDto>()
        };

        return Ok(resultado);
    }

    [HttpPost("gerar")]
    public async Task<IActionResult> GerarRelatorio(
        [FromBody] PeriodoRequest periodo)
    {
        if (periodo.Inicio == default ||
            periodo.Fim == default ||
            periodo.Inicio > periodo.Fim)
        {
            return BadRequest(new { mensagem = "Período inválido." });
        }

        var total = await _context.Atrasos
            .CountAsync(a =>
                a.DataAtraso >= periodo.Inicio &&
                a.DataAtraso <= periodo.Fim);

        return Ok(new
        {
            mensagem = "Resumo do relatório gerado com sucesso.",
            inicio = periodo.Inicio,
            fim = periodo.Fim,
            totalAtrasos = total
        });
    }

    [HttpPut("periodo")]
    public IActionResult AtualizarPeriodo(
        [FromBody] PeriodoRequest periodo)
    {
        if (periodo.Inicio == default ||
            periodo.Fim == default ||
            periodo.Inicio > periodo.Fim)
        {
            return BadRequest(new { mensagem = "Período inválido." });
        }

        return Ok(new
        {
            mensagem = "Período recebido com sucesso.",
            inicio = periodo.Inicio,
            fim = periodo.Fim
        });
    }

    [HttpDelete("{id}")]
    public IActionResult ExcluirRelatorio(int id)
    {
        return StatusCode(501, new
        {
            mensagem = "Não existe uma tabela de relatórios salvos no banco. A exclusão ainda não está disponível."
        });
    }

    private static int CalcularVariacao(int atual, int anterior)
    {
        if (anterior == 0)
            return atual == 0 ? 0 : 100;

        return (int)Math.Round(
            (atual - anterior) * 100.0 / anterior);
    }
}
