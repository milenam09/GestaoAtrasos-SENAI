using System;
using System.Collections.Generic;

namespace AtlasTech_api.Models;

public partial class AqvTratativa
{
    public int IdTratativa { get; set; }

    public int AtrasoId { get; set; }

    public int UsuarioId { get; set; }

    public DateTime? DataTratativa { get; set; }

    public string Descricao { get; set; } = null!;

    public string? StatusTratativa { get; set; }

    public string? Observacao { get; set; }

    public virtual Atraso Atraso { get; set; } = null!;

    public virtual Usuario Usuario { get; set; } = null!;
}
