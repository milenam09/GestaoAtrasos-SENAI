using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class Atestado
{
    public int IdAtestados { get; set; }

    public int JustificativasId { get; set; }

    public string ArquivoUrl { get; set; } = null!;

    public DateOnly? DataEmissao { get; set; }

    public string TipoAtestado { get; set; } = null!;

    public virtual ICollection<Atraso> Atrasos { get; set; } = new List<Atraso>();

    public virtual Justificativa Justificativas { get; set; } = null!;
}
