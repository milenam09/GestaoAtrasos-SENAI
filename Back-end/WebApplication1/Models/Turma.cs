using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class Turma
{
    public int IdTurma { get; set; }

    public string Curso { get; set; } = null!;

    public string Periodo { get; set; } = null!;

    public string Turno { get; set; } = null!;

    public int? Professor { get; set; }

    public virtual Usuario? ProfessorNavigation { get; set; }
}
