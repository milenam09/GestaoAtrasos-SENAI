using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class Atraso
{
    public int IdAtraso { get; set; }

    public int AlunoId { get; set; }

    public int ProfessorId { get; set; }

    public DateOnly DataAtraso { get; set; }

    public TimeOnly Hora { get; set; }

    public string Motivo { get; set; } = null!;

    public string? Status { get; set; }

    public int? JustificativaId { get; set; }

    public string TipoAtraso { get; set; } = null!;

    public int? Atestado { get; set; }

    public virtual Usuario Aluno { get; set; } = null!;

    public virtual ICollection<AqvTratativa> AqvTratativas { get; set; } = new List<AqvTratativa>();

    public virtual Atestado? AtestadoNavigation { get; set; }

    public virtual Justificativa? Justificativa { get; set; }

    public virtual Usuario Professor { get; set; } = null!;
}
