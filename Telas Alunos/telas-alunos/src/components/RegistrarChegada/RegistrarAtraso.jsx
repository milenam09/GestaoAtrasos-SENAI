import seta from "../../assets/seta.png";
import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./RegistrarAtraso.css";

function RegistrarAtraso() {
  const [cameraAberta, setCameraAberta] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [qrLido, setQrLido] = useState("");

  useEffect(() => {
    if (!cameraAberta) return;

    let leitor;
    let cancelado = false;

    async function iniciarCamera() {
      try {
        leitor = new Html5Qrcode("leitor-qrcode");

        await leitor.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 220, height: 220 },
          },
          (texto) => {
          if (!cancelado) {
            setQrLido(texto);
            setMensagem("QR Code identificado com sucesso!");
            setCameraAberta(false);

            window.location.href = "http://localhost:5173/";
            }
          },
          () => {}
        );
      } catch (erro) {
        if (!cancelado) {
          setMensagem(
            "Não foi possível abrir a câmera. Verifique a permissão do navegador."
          );
          setCameraAberta(false);
        }
      }
    }

    iniciarCamera();

    return () => {
      cancelado = true;

      if (leitor) {
        leitor
          .stop()
          .catch(() => {})
          .finally(() => {
            leitor.clear();
          });
      }
    };
  }, [cameraAberta]);

  return (
    <div className="registrar-atraso">
      <header className="titulo-pagina">
    <button
      className="icone-voltar"
      type="button"
      onClick={() => window.history.back()}
    >
      <img src={seta} alt="Voltar" />
    </button>

        <div className="texto-titulo">
          <h1>Registrar Chegada</h1>
          <p>
            Preencha os dados e informe o motivo do atraso para registrar a ocorrência.
          </p>
        </div>
      </header>

      <main className="conteudo-qrcode">
        <div className="icone-qrcode">
          <svg viewBox="0 0 100 100" aria-label="Ícone de QR Code">
            <path
              d="M10 35 V10 H35 M65 10 H90 V35 M10 65 V90 H35 M90 65 V90 H65"
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="square"
            />

            <rect x="25" y="25" width="18" height="18" fill="currentColor" />
            <rect x="30" y="30" width="8" height="8" fill="#f5f7fa" />

            <rect x="57" y="25" width="18" height="18" fill="currentColor" />
            <rect x="62" y="30" width="8" height="8" fill="#f5f7fa" />

            <rect x="25" y="57" width="18" height="18" fill="currentColor" />
            <rect x="30" y="62" width="8" height="8" fill="#f5f7fa" />

            <path
              d="M52 48 H62 V58 H72 V48 H80 V60 H70 V72 H60 V62 H50 V78 H43 V48 H52"
              fill="currentColor"
            />

            <rect x="75" y="75" width="8" height="8" fill="currentColor" />
          </svg>
        </div>

        <h2>Escaneie o QR Code</h2>

        <p className="instrucao-qrcode">
          Aponte a câmera do seu celular para o QR Code
          <br />
          disponibilizado na entrada da unidade.
        </p>

        <div className="imagem-camera">
          {cameraAberta ? (
            <div id="leitor-qrcode"></div>
          ) : (
            <div className="moldura-camera">
              <div className="qr-camera">
                <span>▦</span>
              </div>

              <p>
                <span className="ponto-verde"></span>
                Câmera desligada
              </p>
            </div>
          )}
        </div>

        <button
          className="botao-camera"
          onClick={() => {
            setMensagem("");
            setQrLido("");
            setCameraAberta(!cameraAberta);
          }}
        >
          {cameraAberta ? "Fechar câmera" : "Abrir câmera"}
        </button>

        {mensagem && (
          <p className="mensagem-camera">{mensagem}</p>
        )}

        {qrLido && (
          <div className="resultado-qrcode">
            <strong>Conteúdo do QR Code:</strong>
            <p>{qrLido}</p>
          </div>
        )}

        <p className="aviso-qrcode">
          <span className="icone-aviso">i</span>

          <span>
            O QR Code é atualizado periodicamente e só pode
            <br />
            ser utilizado durante o horário de entrada.
          </span>
        </p>

        <div className="aviso-importante">
          <span className="icone-info-azul">i</span>

          <div className="texto-importante">
            <strong>Importante</strong>
            <p>
              O registro da chegada só é válido dentro do horário da sua turma.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegistrarAtraso;
