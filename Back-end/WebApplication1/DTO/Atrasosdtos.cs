// =====================================================================
// Dtos/AtrasosDtos.cs
// "DTO" = formato dos dados que a API devolve ou recebe.
// Os nomes aqui são os MESMOS que o front-end (MeusAtrasosPage.jsx) espera.
// O ASP.NET converte automaticamente NomeAluno -> nomeAluno no JSON.
// =====================================================================

namespace WebApplication1.Dtos;

// Dados dos 4 cards da tela "Meus Atrasos"
public class MetricasAtrasosDto
{
	public string NomeAluno { get; set; } = string.Empty;
	public int TotalAtrasosMes { get; set; }
	public int AtrasosConsecutivos { get; set; }
	public int LimiteTurma { get; set; }
	public string Turma { get; set; } = string.Empty;
	public string StatusAtual { get; set; } = string.Empty;
}

// Uma linha da tabela "Histórico de atrasos"
public class AtrasoDto
{
	public int Id { get; set; }
	public string Data { get; set; } = string.Empty;            // ex.: "09/10"
	public string HorarioPrevisto { get; set; } = string.Empty; // ex.: "08:00"
	public string HorarioChegada { get; set; } = string.Empty;  // ex.: "08:07"
	public string Status { get; set; } = string.Empty;          // ex.: "Atrasado"
}

// Corpo do POST que registra um atraso manualmente
public class NovoAtrasoRequest
{
	public DateOnly Data { get; set; }
	public TimeOnly HorarioChegada { get; set; }
	public string? Motivo { get; set; }
}

// Corpo do PUT que justifica ou muda o status de um atraso
public class AtualizarAtrasoRequest
{
	public string Status { get; set; } = string.Empty;
	public string? Justificativa { get; set; }
}