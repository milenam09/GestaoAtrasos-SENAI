import { useState } from "react";
import "./TelaInicial.css";

import edificio from "../../assets/fundo.png";
import senai from "../../assets/senai-logo.png";
import iconeProfessor from "../../assets/icone-professor.png";

function TelaInicialProfessor() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div
      className="login-professor"
      style={{ backgroundImage: `url(${edificio})` }}
    >
      <div className="faixa faixa1"></div>
      <div className="faixa faixa2"></div>

      <div className="cartao-login">
        <img src={senai} alt="Logo SENAI" className="logo-senai" />

        <img
          src={iconeProfessor}
          alt="Ícone do professor"
          className="icone-professor"
        />

        <h1>Professor</h1>
        <p className="subtitulo">Faça seu login para acessar seu painel</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label>Usuário</label>

          <input
            type="text"
            placeholder="Digite seu Email"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          <label>Senha</label>

          <div className="campo-senha">
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <button
              type="button"
              className="mostrar-senha"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              aria-label={mostrarSenha ? "Esconder senha" : "Mostrar senha"}
            >
              👁
            </button>
          </div>

          <a href="#" className="esqueceu-senha">
            Esqueceu sua senha?
          </a>

          <button type="submit" className="botao-login">
            Entrar
          </button>

          <p className="ou">ou</p>

          <button type="button" className="botao-google">
            <span className="icone-google">G</span>
            Acessar com o Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default TelaInicialProfessor;