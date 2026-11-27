// =====================================================================
// Dtos/RelatoriosDtos.cs
// Formatos usados pelas telas "Relatórios" (professor) e
// "Relatórios (Visão do Gestor)".
// =====================================================================

namespace WebApplication1.Dtos;

// ---- Partes que as duas telas usam ----

// Período escolhido nas datas. O front envia "2026-03-01" (ano-mês-dia).
public class PeriodoRequest
{
	public DateOnly Inicio { get; set; }
	public DateOnly Fim { get; set; }
}

// Um número com a variação em % (ex.: 68 e 12 = "68 ↑ 12%")
public class IndicadorDto
{
	public decimal Valor { get; set; }
	public int Variacao { get; set; }
}

// Uma barra do gráfico "Ocorrências por turma(s)"
public class TurmaOcorrenciasDto
{
	public string Turma { get; set; } = string.Empty;
	public int Total { get; set; }
}

// Uma fatia do gráfico de rosca "Motivos das ocorrências"
public class MotivoDto
{
	public string Nome { get; set; } = string.Empty;
	public int Percentual { get; set; }
}

// ---- Tela "Relatórios" (professor) ----

public class CardsRelatoriosDto
{
	public IndicadorDto TempoAtendimento { get; set; } = new();
	public IndicadorDto AtrasosRecorrentes { get; set; } = new();
	public IndicadorDto CasosConcluidos { get; set; } = new();
	public IndicadorDto TempoMedio { get; set; } = new();
}

public class RelatoriosDto
{
	public string NomeUsuario { get; set; } = string.Empty;
	public string Cargo { get; set; } = string.Empty;
	public string Status { get; set; } = string.Empty; // ex.: "Em Análise"
	public int Total { get; set; }
	public CardsRelatoriosDto Cards { get; set; } = new();
	public List<TurmaOcorrenciasDto> OcorrenciasPorTurma { get; set; } = new();
	public List<MotivoDto> Motivos { get; set; } = new();
}

// ---- Tela "Relatórios (Visão do Gestor)" ----

public class CardsDashboardDto
{
	public IndicadorDto TotalOcorrencias { get; set; } = new();
	public IndicadorDto AtrasosRecorrentes { get; set; } = new();
	public IndicadorDto CasosConcluidos { get; set; } = new();
	public IndicadorDto TempoMedioDias { get; set; } = new();
}

// Uma linha da tabela "Alunos com mais Ocorrências"
public class AlunoRankingDto
{
	public int Id { get; set; }
	public int Posicao { get; set; }
	public string Nome { get; set; } = string.Empty;
	public string Turma { get; set; } = string.Empty;
	public int Total { get; set; }
}

public class DashboardDto
{
	public string NomeUsuario { get; set; } = string.Empty;
	public string Cargo { get; set; } = string.Empty;
	public int Total { get; set; }
	public CardsDashboardDto Cards { get; set; } = new();
	public List<TurmaOcorrenciasDto> OcorrenciasPorTurma { get; set; } = new();
	public List<MotivoDto> Motivos { get; set; } = new();
	public List<AlunoRankingDto> Alunos { get; set; } = new();
}

// ---- Outros pedidos ----

// Corpo do POST "Ver contato" (secretaria)
public class ContatoRequest
{
	public string Assunto { get; set; } = string.Empty;
}

// Corpo do POST que adiciona uma ocorrência
public class NovaOcorrenciaRequest
{
	public int AlunoId { get; set; }
	public string Motivo { get; set; } = string.Empty;
	public DateOnly Data { get; set; }
}