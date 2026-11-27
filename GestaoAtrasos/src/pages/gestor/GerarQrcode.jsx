
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

import "../../css/gestor/GerarQrcode.css";

function GerarQRCode() {

  const [tempo, setTempo] = useState(900);
  const [codigo, setCodigo] = useState("");

  function gerarQRCode() {
    const novoCodigo = crypto.randomUUID();

    setCodigo(novoCodigo);
    setTempo(900);
  }

  useEffect(() => {

    if (codigo === "") return;

    const intervalo = setInterval(() => {

      setTempo((valor) => {
        if (valor <= 1) {
          return 0;
        }

        return valor - 1;
      });

    }, 1000);

    return () => clearInterval(intervalo);

  }, [codigo]);

  const minutos = Math.floor(tempo / 60);
  const segundos = tempo % 60;

  function formatarTempo(valor) {
    return String(valor).padStart(2, "0");
  }

  return (
    <div className="pagina-qr">

      <main className="conteudo-qr">

        <section className="informacoes-qr">

          <div className="info-texto">
            <span className="linha-vermelha"></span>

            <h2>Registro de presença</h2>

            <p>
              Gere um QR Code geral para que todos os alunos
              possam registrar sua presença.
            </p>
          </div>

          <div className="info-card">
            <div className="info-icone">01</div>

            <div>
              <h3>Um código para todos</h3>

              <p>
                O mesmo QR Code pode ser utilizado por todos
                os alunos da escola.
              </p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icone">02</div>

            <div>
              <h3>Validade de 15 minutos</h3>

              <p>
                Após esse período, será necessário gerar
                um novo código.
              </p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icone">03</div>

            <div>
              <h3>Registro individual</h3>

              <p>
                Cada aluno deve se identificar para registrar
                sua própria presença.
              </p>
            </div>
          </div>

        </section>

        <section className="card-qr">

          <div className="card-qr-cabecalho">

            <div>
              <h2>QR Code geral</h2>
              <p>Disponível para todos os alunos</p>
            </div>

            <span className={codigo && tempo > 0 ? "status-ativo" : "status-inativo"}>
              {codigo && tempo > 0
                ? "Ativo"
                : codigo && tempo === 0
                  ? "Expirado"
                  : "Aguardando"}
            </span>

          </div>

          <div className="area-codigo">

            {codigo && tempo > 0 ? (

              <>
                <div className="codigo-qr">
                  <QRCodeCanvas
                    value={codigo}
                    size={230}
                    level="H"
                  />
                </div>

                <h3>QR Code gerado!</h3>

                <p className="identificacao-qr">
                  Código: {codigo.slice(0, 8)}
                </p>
              </>

            ) : codigo && tempo === 0 ? (

              <div className="mensagem-qr">
                <div className="qr-placeholder expirado">!</div>

                <h3>QR Code expirado</h3>

                <p>
                  Gere um novo código para continuar.
                </p>
              </div>

            ) : (

              <div className="mensagem-qr">
                <div className="qr-placeholder">QR</div>

                <h3>Nenhum código gerado</h3>

                <p>
                  Clique no botão abaixo para disponibilizar
                  o QR Code de presença.
                </p>
              </div>

            )}

          </div>

          <div className="validade-qr">

            <p>Tempo restante</p>

            <strong className={tempo <= 60 && codigo ? "tempo-alerta" : ""}>
              {codigo
                ? `${formatarTempo(minutos)}:${formatarTempo(segundos)}`
                : "15:00"}
            </strong>

            <span>Validade de 15 minutos</span>

          </div>

          <button
            className="botao-novo-qr"
            onClick={gerarQRCode}
          >
            {codigo ? "Gerar novo QR Code" : "Gerar QR Code"}
          </button>

        </section>

      </main>

      <footer className="rodape-qr">
        <p>
          Sistema de Gestão de Atrasos e Registro de Presença
        </p>
      </footer>

    </div>
  );
}

export default GerarQRCode;
