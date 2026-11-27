
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.DTOs;

// DADOS PARA CADASTRAR UM USUARIO
public class CriarUsuarioDTO
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [EmailAddress(ErrorMessage = "Informe um e-mail válido.")]
    [MaxLength(100)]
    public string? Email { get; set; }

    [Required(ErrorMessage = "A senha é obrigatória.")]
    [MinLength(6, ErrorMessage = "A senha deve ter pelo menos 6 caracteres.")]
    public string Senha { get; set; } = string.Empty;

    [MaxLength(11)]
    public string? Cpf { get; set; }

    public DateOnly? DataNascimento { get; set; }

    public int? TipoUsuario { get; set; }
}

// DADOS PARA ATUALIZAR UM USUARIO
public class AtualizarUsuarioDTO
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [EmailAddress(ErrorMessage = "Informe um e-mail válido.")]
    [MaxLength(100)]
    public string? Email { get; set; }

    [MinLength(6, ErrorMessage = "A senha deve ter pelo menos 6 caracteres.")]
    public string? Senha { get; set; }

    [MaxLength(11)]
    public string? Cpf { get; set; }

    public DateOnly? DataNascimento { get; set; }

    public int? TipoUsuario { get; set; }
}

// DADOS DEVOLVIDOS PELA API
public class UsuarioRespostaDTO
{
    public int IdUsuario { get; set; }

    public string Nome { get; set; } = string.Empty;

    public string? Email { get; set; }

    public string? Cpf { get; set; }

    public DateOnly? DataNascimento { get; set; }

    public int? TipoUsuario { get; set; }

    public string? NomeTipo { get; set; }
}
