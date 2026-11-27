using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class TipoUsuario
{
    public int IdTipoUsuario { get; set; }

    public string NomeTipo { get; set; } = null!;

    public string? Descricao { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
