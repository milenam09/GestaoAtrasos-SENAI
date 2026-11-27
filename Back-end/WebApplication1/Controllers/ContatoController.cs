
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/contato")]
public class ContatoController : ControllerBase
{
    [HttpPost("secretaria")]
    public IActionResult ContatarSecretaria([FromBody] JsonElement dados)
    {
        if (dados.ValueKind != JsonValueKind.Object ||
            !dados.EnumerateObject().Any())
        {
            return BadRequest(new
            {
                mensagem = "Informe os dados do contato."
            });
        }

        return Ok(new
        {
            mensagem = "Dados do contato recebidos com sucesso!",
            dadosRecebidos = dados
        });
    }
}
