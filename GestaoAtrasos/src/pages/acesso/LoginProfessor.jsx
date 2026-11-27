
import { useState } from "react";
import "../../css/acesso/LoginGestor.css";

import edificio from "../../assets/fundo.jpg";
import senai from "../../assets/logosenai.jpg";
import iconeProfessor from "../../assets/icone-professor.png";

function TelaInicialProfessor() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function entrar(event) {
    event.preventDefault();

    if (!email || !senha) {
      alert("Preencha o usuário e a senha!");
      return;
    }

    alert("Login enviado!");
  }

  return (
    <main
      className="login-pagina"
      style={{ backgroundImage: `url(${edificio})` }}
    >
      <div className="faixa faixa1"></div>
      <div className="faixa faixa2"></div>

      <section className="cartao-login">

        <img src={senai} alt="Logo SENAI" className="logo-senai" />

        <img
          src={iconeProfessor}
          alt="Ícone do professor"
          className="icone-login"
        />

        <h1>Professor</h1>

        <p className="subtitulo">
          Faça seu login para acessar seu painel
        </p>

        <form onSubmit={entrar}>

          <label htmlFor="email">Usuário</label>

          <input
            id="email"
            type="email"
            placeholder="Digite seu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="senha">Senha</label>

          <div className="campo-senha">
            <input
              id="senha"
              type={mostrarSenha ? "text" : "password"}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <button
              type="button"
              className="mostrar-senha"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              👁
            </button>
          </div>

          <a href="#recuperar-senha" className="esqueceu-senha">
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
      </section>
    </main>
  );
}

export default TelaInicialProfessor;
