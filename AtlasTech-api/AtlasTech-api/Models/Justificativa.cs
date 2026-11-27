using System;
using System.Collections.Generic;

namespace AtlasTech_api.Models;

public partial class Justificativa
{
    public int IdJustificativas { get; set; }

    public string Tipo { get; set; } = null!;

    public string Descricao { get; set; } = null!;

    public string? ArquivoUrl { get; set; }

    public DateTime? DataEnvio { get; set; }

    public virtual ICollection<Atestado> Atestados { get; set; } = new List<Atestado>();

    public virtual ICollection<Atraso> Atrasos { get; set; } = new List<Atraso>();
}
