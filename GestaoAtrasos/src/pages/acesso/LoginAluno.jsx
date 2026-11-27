
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/acesso/LoginAluno.css";

import edificio from "../../assets/fundo.jpg";
import senai from "../../assets/logosenai.jpg";
import iconeAluno from "../../assets/icone-aluno.png";

function TelaInicialAluno() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();

  function entrar(event) {
    event.preventDefault();

    const usuario = cpf.trim();
    const senhaDigitada = senha.trim();

    if (!usuario || !senhaDigitada) {
      alert("Preencha o usuário e a senha!");
      return;
    }

    // Direciona para o painel inicial do aluno
    navigate("/aluno/inicio");
  }

  return (
    <main
      className="login-pagina"
      style={{ backgroundImage: `url(${edificio})` }}
    >
      <div className="faixa faixa1"></div>
      <div className="faixa faixa2"></div>

      <section className="cartao-login">

        <img
          src={senai}
          alt="Logo SENAI"
          className="logo-senai"
        />

        <img
          src={iconeAluno}
          alt="Ícone do aluno"
          className="icone-login"
        />

        <h1>Aluno</h1>

        <p className="subtitulo">
          Demonstração: use qualquer usuário e senha fictícios.
        </p>

        <form onSubmit={entrar}>

          <label htmlFor="cpf">Usuário</label>

          <input
            id="cpf"
            type="text"
            placeholder="Digite seu CPF ou Matrícula"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="senha">Senha</label>

          <div className="campo-senha">

            <input
              id="senha"
              type={mostrarSenha ? "text" : "password"}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="mostrar-senha"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              aria-label={mostrarSenha ? "Esconder senha" : "Mostrar senha"}
            >
              {mostrarSenha ? "🙈" : "👁"}
            </button>

          </div>

          <a
            href="/aluno/contato"
            className="esqueceu-senha"
          >
            Precisa de ajuda? Contato da unidade
          </a>

          <button
            type="submit"
            className="botao-login"
          >
            Entrar
          </button>

          <p className="ou">ou</p>

          <button
            type="button"
            className="botao-google"
            onClick={() => navigate("/aluno/inicio")}
          >
            Entrar na demonstração
          </button>

        </form>
      </section>
    </main>
  );
}

export default TelaInicialAluno;
