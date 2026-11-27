using System;
using System.Collections.Generic;

namespace AtlasTech_api.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string Nome { get; set; } = null!;

    public string? Email { get; set; }

    public string Senha { get; set; } = null!;

    public string? Cpf { get; set; }

    public DateOnly? DataNascimento { get; set; }

    public int? TipoUsuario { get; set; }

    public int? TurmaId { get; set; }

    public virtual ICollection<AqvTratativa> AqvTratativas { get; set; } = new List<AqvTratativa>();

    public virtual ICollection<Atraso> AtrasoAlunos { get; set; } = new List<Atraso>();

    public virtual ICollection<Atraso> AtrasoProfessors { get; set; } = new List<Atraso>();

    public virtual TipoUsuario? TipoUsuarioNavigation { get; set; }

    public virtual ICollection<Turma> Turmas { get; set; } = new List<Turma>();
}
