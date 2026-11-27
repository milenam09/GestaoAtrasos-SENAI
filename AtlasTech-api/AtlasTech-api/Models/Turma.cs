using System;
using System.Collections.Generic;

namespace AtlasTech_api.Models;

public partial class Turma
{
    public int IdTurma { get; set; }

    public string Curso { get; set; } = null!;

    public string Periodo { get; set; } = null!;

    public string Turno { get; set; } = null!;

    public int? Professor { get; set; }

    public string? Sigla { get; set; }

    public TimeOnly HorarioEntrada { get; set; }

    public int LimiteAtrasosConsecutivos { get; set; }

    public virtual Usuario? ProfessorNavigation { get; set; }
}
