
import pessoa from "../assets/person2.png";
import seta from "../assets/seta.png";
import camera from "../assets/camera.png";

import "../css/PerfilAluno.css";
import Menu from "./MenuAluno.jsx";
import { useNavigate } from "react-router-dom";

export default function PerfilAluno() {
  const navigate = useNavigate();

  return (
    <div className="pagina-perfil">
      <Menu />

      <main className="conteudo-principal">

        <header className="cabecalho">
          <h1>
            <img
              src={seta}
              alt="Voltar"
              className="icone-imagem"
            />
            Meu perfil
          </h1>

          <p>
            Confira seus dados pessoais e personalize suas informações no
            sistema.
          </p>
        </header>

        <section className="cartao-perfil">

          {/* IDENTIFICAÇÃO DO ALUNO */}
          <div className="identificacao-aluno">

            <div className="avatar-circle">
              <img
                src={pessoa}
                alt="Foto do aluno"
                className="avatar-icon"
              />
            </div>

            <div className="nome-aluno">
              <h2>João Silva</h2>
              <p>Aluno</p>
            </div>

            <button
              type="button"
              className="botao-editar"
            >
              <img
                src={camera}
                alt=""
                className="icone-camera"
              />
              <span>Editar foto</span>
            </button>

          </div>

          {/* INFORMAÇÕES */}
          <div className="informacoes">

            <div className="quadro-informacao">
              <h3>Dados pessoais</h3>

              <div className="campo">
                <strong>Nome completo</strong>
                <p>João Silva</p>
              </div>

              <div className="campo">
                <strong>Data de nascimento</strong>
                <p>01/09/2008</p>
              </div>

              <div className="campo">
                <strong>Email</strong>
                <p>joao.silva@gmail.com</p>
              </div>

              <div className="campo">
                <strong>Telefone</strong>
                <p>12 99917-8195</p>
              </div>
            </div>

            <div className="quadro-informacao">
              <h3>Dados acadêmicos</h3>

              <div className="campo">
                <strong>Turma</strong>
                <p>3 A - Desenvolvimento de Sistemas</p>
              </div>

              <div className="campo">
                <strong>Turno</strong>
                <p>Integral</p>
              </div>

              <div className="campo">
                <strong>Período</strong>
                <p>Ativo</p>
              </div>

              <div className="campo">
                <strong>Modelo de ensino</strong>
                <p>Técnico</p>
              </div>
            </div>

          </div>

          {/* AVISO */}
          <div className="aviso-dados">

            <div className="icone-ajuda">?</div>

            <div className="texto-aviso">
              <strong>Precisa atualizar seus dados?</strong>
              <p>
                Entre em contato com a nossa secretaria da unidade.
              </p>
            </div>

            <button
              type="button"
              className="botao-contato"
              onClick={() => navigate("/contato")}
            >
              Ver contato
            </button>

          </div>

        </section>
      </main>
    </div>
  );
}
