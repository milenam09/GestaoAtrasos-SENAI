
import { useState } from "react";
import "../css/LoginGestor.css";

import edificio from "../assets/fundo.jpg";
import senai from "../assets/logosenai.jpg";
import iconeGestor from "../assets/icone-gestor.png";

function Gestor() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function entrar(event) {
    event.preventDefault();

    if (!usuario || !senha) {
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
          src={iconeGestor}
          alt="Ícone do gestor"
          className="icone-login"
        />

        <h1>Gestor</h1>

        <p className="subtitulo">
          Faça seu login para acessar seu painel
        </p>

        <form onSubmit={entrar}>

          <label htmlFor="usuario">Usuário</label>

          <input
            id="usuario"
            type="text"
            placeholder="Digite seu CPF"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
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

          <button
            type="button"
            className="botao-google"
            onClick={() => alert("Configure o acesso com Google.")}
          >
            <span className="icone-google">G</span>
            Acessar com o Google
          </button>

        </form>
      </section>
    </main>
  );
}

export default Gestor;
