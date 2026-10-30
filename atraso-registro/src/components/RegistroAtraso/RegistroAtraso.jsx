import seta from "../../assets/seta.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCloudArrowUp
} from "@fortawesome/free-solid-svg-icons";

import "./RegistroAtraso.css";

function RegistroAtraso() {

  const [motivo, setMotivo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [arquivo, setArquivo] = useState(null);

  function registrar(e) {
    e.preventDefault();
    alert("Atraso registrado com sucesso!");
  }

  return (
    <main className="registro-atraso">

      <div className="registro-cabecalho">

        <button
        className="voltar"
        type="button"
        onClick={() => window.history.back()}
        >
        <img src={seta} alt="Voltar" />
        </button>

        <div>
          <h1>Registrar Atraso</h1>
          <p>Preencha as informações abaixo para registrar seu atraso.</p>
        </div>

      </div>

      <form className="formulario-atraso" onSubmit={registrar}>

        <div className="titulo-etapa">
          <span className="numero-etapa">1</span>

          <div>
            <h2>Motivos do atraso</h2>
            <p>Selecione o motivo que justifica seu atraso</p>
          </div>
        </div>

        <div className="campo-atraso">
          <label>Motivo</label>

          <select
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
          >
            <option value="">Selecione o motivo do atraso</option>
            <option value="Transporte público">Transporte público</option>
            <option value="Problemas pessoais">Problemas pessoais</option>
            <option value="Problemas de saúde">Problemas de saúde</option>
            <option value="Problemas familiares">Problemas familiares</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <div className="aviso-atraso">
          <FontAwesomeIcon icon={faCircleExclamation} />

          <span>
            Caso motivo não esteja na lista, procure a AQV para melhores orientações
          </span>
        </div>

        <hr />

        <div className="titulo-etapa">
          <span className="numero-etapa">2</span>

          <div>
            <h2>Descrição</h2>
            <p>Se desejar explique melhor o que aconteceu.</p>
          </div>
        </div>

        <textarea
          placeholder="Digite aqui..."
          maxLength={500}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <div className="contador">
          {descricao.length}/500
        </div>

        <hr />

        <div className="titulo-etapa">
          <span className="numero-etapa">3</span>

          <div>
            <h2>Comprovação</h2>
            <p>
              Se tiver atestado, documento ou imagem que justifique o atraso, anexe aqui
            </p>
          </div>
        </div>

        <label className="area-upload">

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setArquivo(e.target.files[0])}
          />

          <FontAwesomeIcon
            icon={faCloudArrowUp}
            className="icone-upload"
          />

          <span>
            {arquivo
              ? arquivo.name
              : "Arraste um arquivo ou clique aqui para selecionar"}
          </span>

          <small>PDF, JPG ou PNG</small>

        </label>

        <div className="botoes-atraso">
          <button type="submit" className="botao-registrar">
            Registrar atraso
          </button>
        </div>

      </form>

    </main>
  );
}

export default RegistroAtraso;
